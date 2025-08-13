import os

from langchain.prompts import PromptTemplate
from google.cloud import aiplatform
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_google_vertexai import VertexAIEmbeddings
from langchain_google_community import BigQueryVectorStore

from dotenv import load_dotenv
load_dotenv()

#Embedding model
embedding = VertexAIEmbeddings(model_name="text-embedding-005")

#Vector store
vector_store = BigQueryVectorStore(
    project_id=os.getenv("PROJECT"),
    dataset_name=os.getenv("DATASET"),
    table_name=os.getenv("TABLE"),
    location=os.getenv("REGION"),
    embedding=embedding,
)

#AI helper function
def ai_helper(query, chat_history=None):
    #LLM model
    llm = ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
    )
    # Create enhanced search query for better context
    search_query = query
    if chat_history:
        # Look for the main topic/certification in recent conversation
        recent_messages = [msg.get('content', '') if isinstance(msg, dict) else getattr(msg, 'content', '') 
                          for msg in chat_history[-4:] if msg]  # Last 4 messages
        recent_context = " ".join(recent_messages)
        
        # If the current query is short/vague, enhance it with recent context
        if len(query.split()) <= 5:  # Short queries like "What career paths?"
            search_query = f"{query} {recent_context}"
    
    #Retrieve similar documents
    docs = vector_store.similarity_search(search_query)
    docs = " ".join([d.page_content for d in docs])

    # Format chat history for context
    history_context = ""
    if chat_history:
        history_items = []
        for msg in chat_history:
            if hasattr(msg, 'type') and hasattr(msg, 'content'):
                role = "User" if msg.type == "user" else "Assistant"
                history_items.append(f"{role}: {msg.content}")
            elif isinstance(msg, dict):
                role = "User" if msg.get('type') == "user" else "Assistant"
                history_items.append(f"{role}: {msg.get('content', '')}")
        
        if history_items:
            history_context = "\n\nPrevious conversation context:\n" + "\n".join(history_items[-6:])  # Last 6 messages for context

    #Prompt
    prompt=PromptTemplate(
        input_variables = ["question","docs","history"],
        template = """
        You are a helpful assistant that can answer questions and concerns about Google Cloud Certifications. You can help users with questions about the certification process, exam details, and project ideas. You can also provide information about the different certification paths and the benefits of getting certified. 
        
        Answer the user's {question} based on the information provided here {docs}
        
        {history}
        
        IMPORTANT: If this is a follow-up question (like "What about this?" or "What career paths?"), focus your answer specifically on the certification or topic mentioned in the previous conversation. Only mention other certifications if they are directly relevant to the specific question being asked. Stay focused on the context of the ongoing conversation.
        
        Please provide a helpful and detailed response that stays on topic."""
    )

    #Create and Invoke the chain
    chain = prompt | llm
    response = chain.invoke({"question":query,"docs":docs,"history":history_context})
    return response
