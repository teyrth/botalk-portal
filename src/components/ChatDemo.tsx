
import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, MoreHorizontal, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useChat } from '@/hooks/useChat';
import { ScrollArea } from '@/components/ui/scroll-area';

type Message = {
  role: 'user' | 'bot';
  content: string;
  status?: 'typing' | 'complete';
};

// Demo questions and answers for the auto loop
const demoQuestions = [
  "What is Botalk?",
  "How does the knowledge base work?",
  "What industries can use this solution?",
  "How quickly can I set up a chatbot?",
  "What makes Botalk different from other chatbots?",
  "Can I customize the chat interface?"
];

const ChatDemo = () => {
  const { generateResponse, isLoading, isDemoMode, setIsDemoMode } = useChat();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const demoTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [currentDemoQuestion, setCurrentDemoQuestion] = useState(0);
  
  // Auto demo loop effect
  useEffect(() => {
    if (isDemoMode) {
      startDemoLoop();
    }
    
    return () => {
      if (demoTimeoutRef.current) {
        clearTimeout(demoTimeoutRef.current);
      }
    };
  }, [isDemoMode, messages]);
  
  // Function to start the demo loop
  const startDemoLoop = () => {
    if (!isDemoMode) return;
    
    // Clear any existing timeout
    if (demoTimeoutRef.current) {
      clearTimeout(demoTimeoutRef.current);
    }
    
    // If there's typing activity, wait for it to complete
    if (isTyping) return;
    
    // Schedule the next demo question
    demoTimeoutRef.current = setTimeout(() => {
      if (!isDemoMode) return;
      
      const nextQuestion = demoQuestions[currentDemoQuestion % demoQuestions.length];
      
      // Add user message
      setMessages(prev => [...prev, { role: 'user', content: nextQuestion }]);
      
      // Show bot typing indicator
      setIsTyping(true);
      
      // Generate bot response
      setTimeout(async () => {
        setIsTyping(false);
        const response = await generateResponse(nextQuestion);
        
        setMessages(prev => [...prev, { role: 'bot', content: response }]);
        setCurrentDemoQuestion(current => current + 1);
      }, 1500);
      
    }, 5000); // Wait 5 seconds between demo messages
  };
  
  // Scroll to bottom of chat container when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);
  
  // Handle manual user input
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Clear any scheduled demo messages
    if (demoTimeoutRef.current) {
      clearTimeout(demoTimeoutRef.current);
    }
    
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Show typing indicator
    setIsTyping(true);
    
    // Generate response with isUserInput flag
    const response = await generateResponse(input, true);
    setIsTyping(false);
    
    const botResponse = {
      role: 'bot' as const,
      content: response,
    };
    
    setMessages(prev => [...prev, botResponse]);
  };
  
  return (
    <div className="flex flex-col h-[500px] bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-lg">
      {/* Chat header */}
      <div className="px-4 py-3 border-b border-gray-700 flex justify-between items-center bg-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center">
            <Bot size={16} className="text-blue-400" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-white">Botalk Assistant</h3>
            <p className="text-xs text-green-400">Online</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-300">
          <MoreHorizontal size={20} />
        </button>
      </div>
      
      {/* Chat messages - using ScrollArea to contain scrolling */}
      <ScrollArea className="flex-1 h-full">
        <div className="p-4 space-y-4 bg-gray-900">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex gap-3 animate-slide-up",
                message.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              {message.role === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center flex-shrink-0">
                  <Bot size={16} className="text-blue-400" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
                  message.role === 'user'
                    ? "bg-blue-600 text-white rounded-tr-none"
                    : "bg-gray-800 text-gray-200 rounded-tl-none border border-gray-700 shadow-sm"
                )}
              >
                <p className="whitespace-pre-line">{message.content}</p>
              </div>
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <User size={16} className="text-gray-400" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3 justify-start animate-slide-up">
              <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-blue-400" />
              </div>
              <div className="bg-gray-800 text-gray-200 rounded-2xl rounded-tl-none border border-gray-700 shadow-sm px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-gray-600 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-600 animate-pulse animation-delay-200"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-600 animate-pulse animation-delay-500"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {/* Chat input */}
      <div className="px-4 py-3 border-t border-gray-700 bg-gray-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything..."
            className="flex-1 bg-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all text-white placeholder-gray-400"
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
              input.trim()
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-700 text-gray-500"
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
