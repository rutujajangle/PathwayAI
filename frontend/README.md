# PathwayAI
### Smart Course Selector AI Agent
**Contributors: Rishikesh Kakde, Gayatri Gattani, Rutuja Jangle, Muskan Dhingra**

Welcome to **PathwayAI**, an intelligent AI agent that simplifies the course selection journey for students through a clean, modern UI powered by OpenAI's Agent SDK.

---

## Project Overview

### **Objective**

Develop an intelligent, student-centric platform that transforms the often overwhelming course selection process into a smooth, personalized experience. This system empowers students to:

- **Explore degree programs and professional pathways** aligned with their long-term career goals (e.g., Data Scientist, Product Manager, UX Designer).
- **Receive goal-driven course recommendations** tailored to their academic background and credit load preferences (full-time/part-time).
- Gain clarity on prerequisites by conversing with the agent to understand which foundational courses are required for a desired major or advanced course.
- **Navigate real-world limitations** like limited seat availability and high-demand course slots with intelligent alternatives and dynamic planning.
- **Engage in meaningful conversation** with a chatbot assistant to resolve doubts, clarify academic rules, and make informed choices in real-time.

---

#### System Architecture & Methodology

- **Dual-Agent Design**:
  - **Chatbot Assistant (GPT-4o-mini)**: Engages students in free-form conversation to answer questions about course selection, credits, prerequisites, etc.
  - **Recommendation Assistant (GPT-4)**: Accepts structured student inputs (e.g., desired profession, major) and responds with tailored course recommendations considering prerequisites, availability, and credit load. The recommendations are shown in the format of a Visual roadmap of course progression vs career goal.

- **OpenAI Assistant SDK**:
  - Integrated using Python scripts (`Agents_Chat.py`) and Jupyter Notebooks (`CourseSelectorAgent.ipynb`, `UIListCoursesAgent.ipynb`).
  - Threads and runs are managed via the OpenAI Assistants API, supporting persistent, contextual conversations.

- **Model Choice**:
  - `GPT-4o-mini` for lightweight, fast responses in chatbot interactions.
  - `GPT-4` for high-quality, goal-aligned, and reasoning-heavy course recommendations.

---

#### Frontend (UI)

- **Built with**: `TypeScript`, using modern component-based architecture.
- **Hosted on**: [Vercel]([https://vercel.com](https://pathway-ai-rgmr.vercel.app)) for fast deployment and seamless CI/CD.
- **Features**:
  - Clean layout to host and switch between the two AI agents.
  - Input forms for structured career/course queries.
  - Live chat interface for interacting with the assistant.
 
- **Key Pages**:
  - Landing Page
    - Modern, animated hero section
    - Featured degree programs
    - How it works section
    - Quick access to course exploration
  - Explore Page
    - Course catalog with filtering
    - Real-time seat availability
    - Course details and prerequisites
    - Interactive selection system
  - Degree Planning
    - Visual roadmap of courses
    - Semester-by-semester planning
    - Progress tracking
    - Prerequisite visualization
  - Interactive Elements:
    -  AI Chatbot
    - Course recommendations
    - Career guidance
    - Prerequisite checking
    - Real-time assistance
  - Course Selection
    - Seat availability indicators
    - Prerequisites validation
    - Interactive cards with detailed info
    - Progress tracking
  - Smart Features:
    - Availability Tracking
    - Real-time seat numbers
    - Filling rate visualization
    - Automatic status updates (Open/Limited/Full)
    - Career Alignment
    - AI-powered course suggestions
    - Career path optimization
    - Skill gap analysis
---

#### Knowledge Base

- Located in the `Knowledge Base/` directory.
- Contains university course PDFs for all programs offered by Luddy School to ground the agents with accurate prerequisite and curriculum knowledge.
- Serves as embedded context for better reasoning and recommendations.

---


## Getting Started

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/smart-course-selector.git
   cd smart-course-selector
   ```

2. Install backend dependencies:
   ```bash
   pip install openai python-dotenv
   ```

3. Add your `.env` file with the API key.

4. Run backend logic or test notebooks as needed:
   ```bash
   python Agents_Chat.py
   ```

5. Launch your frontend :
   ```bash
   cd frontend
   npm install
   npm start
   ```

---

## Future Enhancements

- Course review aggregator - Integrate anonymized course reviews and ratings to help students make informed choices.
- Timetable conflict detection - Detect overlapping course times and recommend conflict-free alternatives automatically.
- Integration with university enrollment APIs - Integrate with institutional APIs to show real-time course availability, registration deadlines, and syllabus links.
- Learning Style-based Recommendations - Recommend courses based on preferred learning methods (e.g., project-based, lecture-heavy, hands-on labs).
