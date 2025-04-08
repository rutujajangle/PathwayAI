import openai
import time
import os
from dotenv import load_dotenv # type: ignore

load_dotenv()
# API key here
openai.api_key = os.getenv("OPENAI_API_KEY")

# 🧠 Assistant ID here
ASSISTANT_ID = "ID1" # Fully Functional Chatbot
ASSISTANT_ID ='ID2' # Course List bot for the UI

def wait_for_run_completion(thread_id, run_id):
    while True:
        run_status = openai.beta.threads.runs.retrieve(
            thread_id=thread_id,
            run_id=run_id
        )
        if run_status.status == "completed":
            return
        elif run_status.status == "failed":
            raise Exception("Run failed")
        time.sleep(1)

def get_latest_response(thread_id):
    messages = openai.beta.threads.messages.list(thread_id=thread_id)
    for message in messages.data:
        if message.role == "assistant":
            return message.content[0].text.value
    return "[No response from assistant]"

def main():
    print("🎓 Smart Course Selector Agent")
    print("Type 'exit' to quit\n")

    # Create a persistent thread for the conversation
    thread = openai.beta.threads.create()

    while True:
        user_input = input("You: ")
        if user_input.lower() in ["exit", "quit"]:
            print("👋 Exiting...")
            break

        # Send user message to the thread
        openai.beta.threads.messages.create(
            thread_id=thread.id,
            role="user",
            content=user_input
        )

        # Run the assistant
        run = openai.beta.threads.runs.create(
            thread_id=thread.id,
            assistant_id=ASSISTANT_ID
        )

        # Wait for assistant response
        wait_for_run_completion(thread.id, run.id)

        # Get and print assistant response
        response = get_latest_response(thread.id)
        print(f"Agent: {response}\n")

if __name__ == "__main__":
    main()
