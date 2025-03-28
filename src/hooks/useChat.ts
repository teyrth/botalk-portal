
import { useState } from 'react';
import { searchKnowledge } from '@/data/companyKnowledge';

export function useChat() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(true); // Start in demo mode
  
  const generateResponse = async (message: string, isUserInput: boolean = false): Promise<string> => {
    setIsLoading(true);
    
    // If this is a user input and we're in demo mode, return the contact message
    if (isUserInput && isDemoMode) {
      setIsDemoMode(false); // Exit demo mode
      setIsLoading(false);
      return "For a trial demo, contact us at +918069578364 or get your bot within 7 hours. For now, we do not provide a direct trial or demo for your own data. To try, check our chatbot and ask about us.";
    }
    
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
    isLoading,
    isDemoMode,
    setIsDemoMode
  };
}
