require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 5000;

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Middleware
app.use(cors());
app.use(express.json());

// Store conversation threads
const threads = new Map();

// Helper function to wait for run completion
async function waitForRunCompletion(threadId, runId) {
  while (true) {
    const runStatus = await openai.beta.threads.runs.retrieve(
      thread_id=threadId,
      run_id=runId
    );
    if (runStatus.status === "completed") {
      return;
    } else if (runStatus.status === "failed") {
      throw new Error("Run failed");
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

// Helper function to get latest response
async function getLatestResponse(threadId) {
  const messages = await openai.beta.threads.messages.list(threadId);
  for (const message of messages.data) {
    if (message.role === "assistant") {
      return message.content[0].text.value;
    }
  }
  return "[No response from assistant]";
}

// Chat endpoint
app.post('/chat', async (req, res) => {
  try {
    const { message, threadId } = req.body;
    
    // Create new thread if none exists
    if (!threadId || !threads.has(threadId)) {
      const newThread = await openai.beta.threads.create();
      threads.set(newThread.id, newThread);
    }
    
    const currentThreadId = threadId || Array.from(threads.keys())[0];
    
    // Send user message
    await openai.beta.threads.messages.create({
      thread_id: currentThreadId,
      role: "user",
      content: message
    });
    
    // Run the assistant
    const run = await openai.beta.threads.runs.create({
      thread_id: currentThreadId,
      assistant_id: process.env.ASSISTANT_ID
    });
    
    // Wait for completion
    await waitForRunCompletion(currentThreadId, run.id);
    
    // Get response
    const response = await getLatestResponse(currentThreadId);
    
    res.json({
      message: response,
      threadId: currentThreadId
    });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Recommendations endpoint
app.post('/recommendations', async (req, res) => {
  try {
    const { studentId, name, degreeProgram, careerGoals } = req.body;
    
    // Create a new thread for recommendations
    const thread = await openai.beta.threads.create();
    
    // Send student information
    await openai.beta.threads.messages.create({
      thread_id: thread.id,
      role: "user",
      content: `Student Information:
        ID: ${studentId}
        Name: ${name}
        Degree Program: ${degreeProgram}
        Career Goals: ${careerGoals}
        
        Please provide course recommendations based on this information.`
    });
    
    // Run the assistant
    const run = await openai.beta.threads.runs.create({
      thread_id: thread.id,
      assistant_id: process.env.ASSISTANT_ID
    });
    
    // Wait for completion
    await waitForRunCompletion(thread.id, run.id);
    
    // Get response
    const response = await getLatestResponse(thread.id);
    
    // Parse the response to extract course recommendations
    // This will depend on how your assistant formats the response
    const recommendations = parseRecommendations(response);
    
    res.json(recommendations);
  } catch (error) {
    console.error('Error in recommendations endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Helper function to parse recommendations from the assistant's response
function parseRecommendations(response) {
  // Implement your parsing logic here
  // This is a placeholder - adjust based on your assistant's response format
  return [];
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 