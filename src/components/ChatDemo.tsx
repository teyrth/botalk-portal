
import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, MoreHorizontal, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChat } from '@/hooks/useChat';

type Message = {
  role: 'user' | 'bot';
  content: string;
  status?: 'typing' | 'complete';
};

// Demo questions that will be automatically asked in a loop
const demoQuestions = [
  "How do I integrate your chatbot with my website?",
  "What types of data can I use to train the chatbot?",
  "What pricing plans do you offer?",
  "How secure is my data with Botalk?",
  "Can Botalk integrate with my existing systems?"
];

const ChatDemo = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [autoDemo, setAutoDemo] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { generateResponse, isLoading } = useChat();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Handle scrolling to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);
  
  // Auto-demo functionality
  useEffect(() => {
    if (!autoDemo || userInteracted) return;
    
    const askNextQuestion = () => {
      const question = demoQuestions[currentQuestionIndex];
      
      // Add user question
      setMessages(prev => [...prev, { role: 'user', content: question }]);
      
      // Show typing indicator
      setTimeout(() => {
        setIsTyping(true);
        
        // Generate response after delay
        setTimeout(async () => {
          setIsTyping(false);
          const response = await generateResponse(question);
          
          setMessages(prev => [...prev, { role: 'bot', content: response }]);
          
          // Move to next question after a delay
          setTimeout(() => {
            const nextIndex = (currentQuestionIndex + 1) % demoQuestions.length;
            setCurrentQuestionIndex(nextIndex);
          }, 5000);
        }, 2000);
      }, 1500);
    };
    
    // Start with an initial delay
    const timeout = setTimeout(() => {
      if (messages.length === 0 && !userInteracted) {
        askNextQuestion();
      }
    }, 2000);
    
    return () => clearTimeout(timeout);
  }, [messages, currentQuestionIndex, autoDemo, userInteracted, generateResponse]);
  
  // Handle user sending a message
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Stop auto demo when user interacts
    setAutoDemo(false);
    setUserInteracted(true);
    
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Show typing indicator
    setIsTyping(true);
    
    // Fixed response for any user input
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = {
        role: 'bot' as const,
        content: "For a trial demo, contact us at +918069578364 or get your bot within 7 hours. For now, we do not provide a direct trial or demo for your own data. To try, check our chatbot and ask about us."
      };
      
      setMessages(prev => [...prev, botResponse]);
    }, 1500);
  };
  
  // Track input field focus to stop auto demo
  const handleInputFocus = () => {
    setAutoDemo(false);
    setUserInteracted(true);
  };
  
  return (
    <div 
      ref={chatContainerRef}
      className="flex flex-col h-[500px] bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-lg"
    >
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
      
      {/* Chat messages */}
      <ScrollArea className="flex-1 p-4 bg-gray-900">
        <div className="space-y-4">
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
            onFocus={handleInputFocus}
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
