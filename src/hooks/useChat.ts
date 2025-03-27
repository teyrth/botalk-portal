
import { useState } from 'react';
import { searchKnowledge } from '@/data/companyKnowledge';

export function useChat() {
  const [isLoading, setIsLoading] = useState(false);
  
  const generateResponse = async (message: string): Promise<string> => {
    setIsLoading(true);
    
    try {
      // Use local knowledge base
      const response = searchKnowledge(message);
      setIsLoading(false);
      return response;
    } catch (error) {
      console.error("Error generating response:", error);
      setIsLoading(false);
      return "I'm sorry, I couldn't process your request. Please try again.";
    }
  };
  
  return {
    generateResponse,
    isLoading
  };
}
