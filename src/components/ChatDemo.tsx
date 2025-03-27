
import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, MoreHorizontal, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { searchKnowledge } from '@/data/companyKnowledge';

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

const ChatDemo = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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
    
    // Use local knowledge base with simulated delay
    setTimeout(() => {
      setIsTyping(false);
      const localResponse = searchKnowledge(input);
      
      const botResponse = {
        role: 'bot' as const,
        content: localResponse,
      };
      
      setMessages(prev => [...prev, botResponse]);
    }, 1500);
  };
  
  return (
    <div className="flex flex-col h-full bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-lg">
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
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
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
