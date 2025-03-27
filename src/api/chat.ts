
// This is a server-side function that would be used in a Node.js environment
// For a pure frontend solution, we'll proxy through this in development

import { companyKnowledge, searchKnowledge } from '../data/companyKnowledge';

export async function generateChatResponse(message: string, apiKey: string) {
  try {
    // First check company knowledge
    const knowledgeResponse = searchKnowledge(message);
    if (knowledgeResponse !== "I don't have specific information about that. Please try asking about our company, products, pricing, or check our FAQ.") {
      return knowledgeResponse;
    }
    
    // If no matching knowledge, use Gemini API
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `You are Botalk Assistant, an AI chatbot for a company called Botalk AI that provides AI-powered chatbot solutions. Here's information about the company:\n\n${JSON.stringify(companyKnowledge, null, 2)}\n\nKeep your answers helpful, concise and conversational. The user's question is: ${message}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error("Gemini API error:", data.error);
      return searchKnowledge(message); // Fallback to knowledge base
    }
    
    // Extract the text response from Gemini API response
    const result = data.candidates[0].content.parts[0].text;
    return result;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Fallback to knowledge base if API call fails
    return searchKnowledge(message);
  }
}
