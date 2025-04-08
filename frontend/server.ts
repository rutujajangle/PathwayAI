import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Enable CORS for your frontend domain
app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Proxy endpoint for OpenAI requests
app.post('/api/chat', async (req, res) => {
  try {
    const { threadId, message } = req.body;

    // Create a new thread if not provided
    const thread = threadId ? 
      { id: threadId } : 
      await openai.beta.threads.create();

    // Add the user's message to the thread
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: message,
    });

    // Run the assistant
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: process.env.OPENAI_ASSISTANT_ID!,
    });

    res.json({
      threadId: thread.id,
      runId: run.id,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to check run status
app.get('/api/chat/status', async (req, res) => {
  try {
    const { threadId, runId } = req.query;
    
    if (!threadId || !runId) {
      return res.status(400).json({ error: 'Missing threadId or runId' });
    }

    const run = await openai.beta.threads.runs.retrieve(
      threadId as string,
      runId as string
    );

    if (run.status === 'completed') {
      const messages = await openai.beta.threads.messages.list(threadId as string);
      res.json({
        status: run.status,
        messages: messages.data,
      });
    } else {
      res.json({ status: run.status });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 