
import { useState } from 'react';
import { searchKnowledge } from '@/data/companyKnowledge';
import { toast } from '@/hooks/use-toast';

interface UseChatOptions {
  apiKey?: string;
}

export function useChat({ apiKey }: UseChatOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  
  const generateResponse = async (message: string): Promise<string> => {
    setIsLoading(true);
    
    try {
      if (!apiKey) {
        // If no API key, use local knowledge base
        setIsLoading(false);
        return searchKnowledge(message);
      }
      
      // First check if we have an answer in our knowledge base
      const knowledgeResponse = searchKnowledge(message);
      if (knowledgeResponse !== "I don't have specific information about that. Please try asking about our company, products, pricing, or check our FAQ.") {
        setIsLoading(false);
        return knowledgeResponse;
      }
      
      // Call Gemini API directly from frontend (in a real app, this would go through a backend)
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
                  text: `You are Botalk Assistant, an AI chatbot helper for a company that makes AI chatbots. You should be helpful, concise, and conversational. If you don't know the answer, you can say so. The user asks: ${message}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 800,
          }
        })
      });
      
      const data = await response.json();
      
      if (data.error) {
        console.error("Gemini API error:", data.error);
        toast({
          title: "API Error",
          description: "Could not get a response from Gemini API. Using local knowledge base instead.",
          variant: "destructive"
        });
        setIsLoading(false);
        return searchKnowledge(message);
      }
      
      // Extract the text response from Gemini API response
      const result = data.candidates[0].content.parts[0].text;
      setIsLoading(false);
      return result;
    } catch (error) {
      console.error("Error generating response:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Using local knowledge base instead.",
        variant: "destructive"
      });
      setIsLoading(false);
      return searchKnowledge(message);
    }
  };
  
  return {
    generateResponse,
    isLoading
  };
}
