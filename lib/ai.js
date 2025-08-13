import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";

// AI helper function
export async function aiHelper(query) {
  try {
    // Initialize LLM model
    const llm = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",
      apiKey: process.env.GOOGLE_API_KEY,
    });

    // Create prompt template (simplified without vector search for now)
    const prompt = PromptTemplate.fromTemplate(`
      You are a helpful assistant that can answer questions and concerns about Google Cloud Certifications. 
      You can help users with questions about the certification process, exam details, and project ideas. 
      You can also provide information about the different certification paths and the benefits of getting certified.
      
      Please answer this question about Google Cloud Certifications: {question}
      
      Provide detailed, helpful information based on your knowledge of Google Cloud Platform certifications.
    `);

    // Create and invoke the chain
    const chain = prompt.pipe(llm);
    const response = await chain.invoke({
      question: query,
    });

    return response.content;
  } catch (error) {
    console.error("Error in aiHelper:", error);
    throw new Error("Failed to get AI response");
  }
}
