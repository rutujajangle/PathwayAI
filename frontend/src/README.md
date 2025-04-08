
# PathwayAI - Course Selection Application

## Running the Application with Python Backend

To fully utilize the recommendation capabilities of PathwayAI, you need to run both the frontend React application and the Python backend service.

### Python Backend Setup

1. Make sure you have Python 3.7+ installed
2. Install the required packages:
   ```
   pip install openai time
   ```
3. Set your OpenAI API key in the `AgentFinal.py` file
4. Run the Python agent:
   ```
   python AgentFinal.py
   ```

### Frontend Setup

1. Install dependencies:
   ```
   npm install
   ```
2. Start the development server:
   ```
   npm run dev
   ```

### Connecting Frontend to Python Backend

In a production environment, you would need to create a proper API bridge between the frontend and the Python backend. Options include:

1. **Flask/FastAPI server**: Convert the Python script into a web server that exposes API endpoints
2. **WebSockets**: For real-time communication between the frontend and Python
3. **Serverless Function**: Deploy the Python code as a serverless function (AWS Lambda, Vercel Functions, etc.)

For now, the frontend simulates the API call, but in a real deployment you would replace the code in `src/services/api.ts` with actual API calls to your Python backend.
