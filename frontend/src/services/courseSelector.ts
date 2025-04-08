import OpenAI from 'openai';

// Debug environment variables
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const assistantId = import.meta.env.VITE_ASSISTANT_ID;
const courseListAssistantId = import.meta.env.VITE_COURSE_LIST_ASSISTANT_ID;

console.log('Environment Variables Check:');
console.log('API Key length:', apiKey?.length || 'Missing');
console.log('Assistant ID:', assistantId || 'Missing');
console.log('Course List Assistant ID:', courseListAssistantId || 'Missing');

if (!apiKey) {
  console.error('OpenAI API Key is missing!');
  throw new Error('OpenAI API Key is required');
}

if (!assistantId && !courseListAssistantId) {
  console.error('At least one Assistant ID is required!');
  throw new Error('Assistant ID is required');
}

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true
});

const ASSISTANT_ID = assistantId;
const COURSE_LIST_ASSISTANT_ID = courseListAssistantId;

export interface CourseRecommendation {
  courseId: string;
  courseName: string;
  description: string;
  credits: number;
  prerequisites: string[];
  fillingRate?: number;
}

export interface ChatResponse {
  message: string;
  threadId: string;
  recommendations?: CourseRecommendation[];
}

// Helper function to wait for run completion
async function waitForRunCompletion(threadId: string, runId: string) {
  while (true) {
    try {
      const runStatus = await openai.beta.threads.runs.retrieve(
        threadId,
        runId
      );
      if (runStatus.status === "completed") {
        return;
      } else if (runStatus.status === "failed") {
        console.error('Run failed:', runStatus);
        throw new Error("Run failed");
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error in waitForRunCompletion:', error);
      throw error;
    }
  }
}

// Helper function to get latest response
async function getLatestResponse(threadId: string) {
  try {
    const messages = await openai.beta.threads.messages.list(threadId);
    console.log('Messages received:', messages);
    
    // Find the assistant's message
    const assistantMessage = messages.data.find(
      (msg) => msg.role === "assistant" && 
      msg.content[0].type === "text" && 
      'text' in msg.content[0]
    );
    
    if (assistantMessage && 'text' in assistantMessage.content[0]) {
      console.log('Assistant message found:', assistantMessage);
      return assistantMessage.content[0].text.value;
    }
    
    console.log('No assistant message found');
    return "[No response from assistant]";
  } catch (error) {
    console.error('Error in getLatestResponse:', error);
    throw error;
  }
}

export const courseSelectorService = {
  async sendMessage(message: string, threadId?: string): Promise<ChatResponse> {
    try {
      console.log('Starting sendMessage with:', { message, threadId });
      
      // Create new thread if none exists
      if (!threadId) {
        console.log('Creating new thread...');
        const newThread = await openai.beta.threads.create();
        threadId = newThread.id;
        console.log('New thread created:', threadId);
      }
      
      // Send user message
      console.log('Sending user message...');
      const messageResponse = await openai.beta.threads.messages.create(
        threadId,
        {
          role: "user",
          content: message
        }
      );
      console.log('Message sent:', messageResponse);
      
      // Run the assistant
      console.log('Creating run with assistant...');
      const run = await openai.beta.threads.runs.create(
        threadId,
        {
          assistant_id: ASSISTANT_ID
        }
      );
      console.log('Run created:', run);
      
      // Wait for completion
      console.log('Waiting for run completion...');
      await waitForRunCompletion(threadId, run.id);
      
      // Get response
      console.log('Getting response...');
      const response = await getLatestResponse(threadId);
      console.log('Response received:', response);
      
      return {
        message: response,
        threadId: threadId
      };
    } catch (error) {
      console.error('Error in sendMessage:', error);
      if (error instanceof Error) {
        console.error('Error details:', {
          message: error.message,
          stack: error.stack
        });
      }
      throw error;
    }
  },

  async getRecommendations(studentInfo: {
    studentId: string;
    name: string;
    degreeProgram?: string;
    careerGoals: string;
  }): Promise<CourseRecommendation[]> {
    try {
      console.log('Getting recommendations for:', studentInfo);
      
      // Create a new thread for recommendations
      const thread = await openai.beta.threads.create();
      console.log('Recommendation thread created:', thread.id);
      
      // Send student information
      const messageResponse = await openai.beta.threads.messages.create(
        thread.id,
        {
          role: "user",
          content: `Student Information:
            ID: ${studentInfo.studentId}
            Name: ${studentInfo.name}
            ${studentInfo.degreeProgram ? `Degree Program: ${studentInfo.degreeProgram}` : ''}
            Career Goals: ${studentInfo.careerGoals}
            
            Please provide course recommendations based on this information.`
        }
      );
      console.log('Student info message sent:', messageResponse);
      
      // Try both assistants and combine results
      const recommendations: CourseRecommendation[] = [];
      
      // Try first assistant if available
      if (ASSISTANT_ID) {
        try {
          const run = await openai.beta.threads.runs.create(
            thread.id,
            { assistant_id: ASSISTANT_ID }
          );
          await waitForRunCompletion(thread.id, run.id);
          const response = await getLatestResponse(thread.id);
          const parsed = parseRecommendations(response);
          recommendations.push(...parsed);
        } catch (error) {
          console.error('Error with first assistant:', error);
        }
      }
      
      // Try course list assistant if available
      if (COURSE_LIST_ASSISTANT_ID) {
        try {
          const run = await openai.beta.threads.runs.create(
            thread.id,
            { assistant_id: COURSE_LIST_ASSISTANT_ID }
          );
          await waitForRunCompletion(thread.id, run.id);
          const response = await getLatestResponse(thread.id);
          const parsed = parseCourseListRecommendations(response);
          recommendations.push(...parsed);
        } catch (error) {
          console.error('Error with course list assistant:', error);
        }
      }
      
      return recommendations;
    } catch (error) {
      console.error('Error in getRecommendations:', error);
      if (error instanceof Error) {
        console.error('Error details:', {
          message: error.message,
          stack: error.stack
        });
      }
      throw error;
    }
  }
};

// Original parser for the first format
function parseRecommendations(response: string): CourseRecommendation[] {
  console.log('Parsing recommendations from response:', response);
  
  const recommendations: CourseRecommendation[] = [];
  const lines = response.split('\n');
  let currentSection = '';
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Skip empty lines and other text
    if (!trimmedLine || 
        trimmedLine.startsWith('Based on') ||
        trimmedLine.includes('These courses')) {
      continue;
    }
    
    // Check for section headers
    if (trimmedLine.startsWith('**') && trimmedLine.endsWith(':**')) {
      currentSection = trimmedLine.replace(/\*\*/g, '').replace(':', '').trim();
      continue;
    }
    
    // Look for course entries (starting with -)
    if (trimmedLine.startsWith('-')) {
      // Match course code and name pattern
      const courseMatch = trimmedLine.match(/^-\s+([A-Z]+-[A-Z]\s+\d+)\s+(.*?)(?:【.*?】)?$/);
      if (courseMatch) {
        const [_, courseId, courseName] = courseMatch;
        
        recommendations.push({
          courseId: courseId.trim(),
          courseName: courseName.trim(),
          description: `Part of ${currentSection}`,
          credits: 3,
          prerequisites: [],
          fillingRate: 100
        });
      }
    }
  }
  
  console.log('Parsed recommendations:', recommendations);
  return recommendations;
}

// New parser for the course list format
function parseCourseListRecommendations(response: string): CourseRecommendation[] {
  console.log('Parsing course list recommendations from response:', response);
  
  const recommendations: CourseRecommendation[] = [];
  const lines = response.split('\n');
  let courseNumber = 1;
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Skip empty lines and other text
    if (!trimmedLine || 
        trimmedLine.startsWith('Here is') ||
        trimmedLine.includes('These courses') ||
        trimmedLine.startsWith('If you have')) {
      continue;
    }
    
    // Look for course entries (starting with -)
    if (trimmedLine.startsWith('-')) {
      // Try to match course code and name pattern first
      const courseMatch = trimmedLine.match(/^-\s+([A-Z]+-[A-Z]\s+\d+)\s+(.*?)(?:【.*?】)?$/);
      if (courseMatch) {
        const [_, courseId, courseName] = courseMatch;
        
        recommendations.push({
          courseId: courseId.trim(),
          courseName: courseName.trim(),
          description: courseName.trim(),
          credits: 3,
          prerequisites: [],
          fillingRate: 100
        });
      } else {
        // If no course code found, use the entire text as course name
        const courseName = trimmedLine
          .replace(/^-\s*/, '') // Remove bullet point
          .replace(/【.*?】/g, '') // Remove citations
          .trim();
        
        if (courseName) {
          recommendations.push({
            courseId: `COURSE-${courseNumber}`,
            courseName: courseName,
            description: courseName,
            credits: 3,
            prerequisites: [],
            fillingRate: 100
          });
          courseNumber++;
        }
      }
    }
  }
  
  return recommendations;
}