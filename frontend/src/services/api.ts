import { courseSelectorService, CourseRecommendation } from './courseSelector';

// API service to interact with the Python backend

const API_BASE_URL = 'http://localhost:3000/api';

interface FormData {
  profession: string;
}

interface ChatResponse {
  threadId: string;
  runId: string;
}

interface ChatStatusResponse {
  status: string;
  messages?: Array<any>;
}

export const submitUserData = async (data: FormData) => {
  try {
    console.log("Getting recommendations for profession:", data.profession);
    
    // Call the OpenAI-based course selector service
    const recommendations = await courseSelectorService.getRecommendations({
      studentId: "12345", // You might want to get this from user data
      name: "Student", // You might want to get this from user data
      careerGoals: data.profession || "Software Engineer" // Get from form data
    });
    
    console.log("Recommendations received:", recommendations);
    
    return {
      success: true,
      message: "Recommendations generated successfully",
      recommendations: recommendations
    };
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to get recommendations");
  }
};

export const createChatMessage = async (message: string, threadId?: string): Promise<ChatResponse> => {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, threadId }),
  });

  if (!response.ok) {
    throw new Error('Failed to create chat message');
  }

  return response.json();
};

export const getChatStatus = async (threadId: string, runId: string): Promise<ChatStatusResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/chat/status?threadId=${threadId}&runId=${runId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to get chat status');
  }

  return response.json();
};
