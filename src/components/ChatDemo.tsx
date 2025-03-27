
import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, MoreHorizontal, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { searchKnowledge } from '@/data/companyKnowledge';
import { toast } from '@/hooks/use-toast';

type Message = {
  role: 'user' | 'bot';
  content: string;
  status?: 'typing' | 'complete';
};

const presetConversation: Message[] = [
  {
    role: 'user',
    content: 'How do I integrate your chatbot with my website?',
  },
  {
    role: 'bot',
    content: 'You can integrate our chatbot in 3 simple steps:\n\n1. Set up your knowledge base\n2. Customize the chat interface\n3. Copy and paste our embed code to your website\n\nWould you like me to walk you through each step?',
  },
  {
    role: 'user',
    content: 'What types of data can I use to train the chatbot?',
  },
];

interface ChatDemoProps {
  apiKey?: string;
}

const ChatDemo = ({ apiKey: propApiKey }: ChatDemoProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState(propApiKey || '');
  const [showApiInput, setShowApiInput] = useState(!propApiKey);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Simulate initial loading of messages
    const timeout = setTimeout(() => {
      setMessages([presetConversation[0]]);
      
      setTimeout(() => {
        setIsTyping(true);
        
        setTimeout(() => {
          setIsTyping(false);
          setMessages([presetConversation[0], presetConversation[1]]);
          
          setTimeout(() => {
            setMessages([...presetConversation.slice(0, 2), presetConversation[2]]);
            
            setTimeout(() => {
              setIsTyping(true);
              
              setTimeout(() => {
                setIsTyping(false);
                setMessages([...presetConversation]);
              }, 2000);
            }, 1000);
          }, 2000);
        }, 2000);
      }, 1000);
    }, 1000);
    
    return () => clearTimeout(timeout);
  }, []);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);
  
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Show typing indicator
    setIsTyping(true);
    
    try {
      if (apiKey) {
        // Try to use Gemini API first
        const response = await generateGeminiResponse(input, apiKey);
        setIsTyping(false);
        
        const botResponse = {
          role: 'bot' as const,
          content: response,
        };
        
        setMessages(prev => [...prev, botResponse]);
      } else {
        // Fallback to local knowledge base if no API key
        setTimeout(() => {
          setIsTyping(false);
          const localResponse = searchKnowledge(input);
          
          const botResponse = {
            role: 'bot' as const,
            content: localResponse,
          };
          
          setMessages(prev => [...prev, botResponse]);
        }, 1500);
      }
    } catch (error) {
      console.error("Error generating response:", error);
      setIsTyping(false);
      
      toast({
        title: "Error generating response",
        description: "Could not connect to AI service. Using local knowledge base instead.",
        variant: "destructive"
      });
      
      // Fallback to local knowledge
      const localResponse = searchKnowledge(input);
      
      const botResponse = {
        role: 'bot' as const,
        content: localResponse,
      };
      
      setMessages(prev => [...prev, botResponse]);
    }
  };
  
  const generateGeminiResponse = async (message: string, key: string): Promise<string> => {
    try {
      // First check if we can answer from our knowledge base
      const knowledgeResponse = searchKnowledge(message);
      if (knowledgeResponse !== "I don't have specific information about that. Please try asking about our company, products, pricing, or check our FAQ.") {
        return knowledgeResponse;
      }
      
      // If no specific knowledge, use Gemini API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message,
          apiKey: key
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch from API');
      }
      
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  };
  
  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setShowApiInput(false);
      toast({
        title: "API Key Set",
        description: "Your Gemini API key has been set for this session",
      });
    }
  };
  
  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
      {/* Chat header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-white dark:bg-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <Bot size={16} className="text-chatbot-primary dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-sm font-medium dark:text-white">Botalk Assistant</h3>
            <p className="text-xs text-green-600 dark:text-green-400">Online</p>
          </div>
        </div>
        <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
          <MoreHorizontal size={20} />
        </button>
      </div>
      
      {/* API Key Input if needed */}
      {showApiInput && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800">
          <form onSubmit={handleApiKeySubmit} className="flex gap-2">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Gemini API key"
              className="flex-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Set Key
            </button>
          </form>
          <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">
            Your API key will only be stored in this browser session.
          </p>
        </div>
      )}
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex gap-3 animate-slide-up",
              message.role === 'user' ? "justify-end" : "justify-start"
            )}
          >
            {message.role === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-chatbot-primary dark:text-blue-400" />
              </div>
            )}
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
                message.role === 'user'
                  ? "bg-chatbot-primary dark:bg-blue-600 text-white rounded-tr-none"
                  : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-100 dark:border-gray-700 shadow-sm"
              )}
            >
              <p className="whitespace-pre-line">{message.content}</p>
            </div>
            {message.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                <User size={16} className="text-gray-600 dark:text-gray-400" />
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-3 justify-start animate-slide-up">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
              <Bot size={16} className="text-chatbot-primary dark:text-blue-400" />
            </div>
            <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-2xl rounded-tl-none border border-gray-100 dark:border-gray-700 shadow-sm px-4 py-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse animation-delay-200"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse animation-delay-500"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat input */}
      <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything..."
            className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-chatbot-primary/30 dark:focus:ring-blue-500/30 transition-all dark:text-white dark:placeholder-gray-400"
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
              input.trim()
                ? "bg-chatbot-primary dark:bg-blue-600 text-white hover:bg-chatbot-secondary dark:hover:bg-blue-700"
                : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
            )}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatDemo;
