
import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, MoreHorizontal, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

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
          setMessages([...messages, presetConversation[1]]);
          
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
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const newMessage = { role: 'user' as const, content: input };
    setMessages([...messages, newMessage]);
    setInput('');
    
    // Simulate bot response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = {
        role: 'bot' as const,
        content: "Our chatbot can be trained on various data types including:\n\n- Documentation\n- FAQ pages\n- Knowledge base articles\n- Product information\n- PDF documents\n- CSV files\n- API responses\n\nWe automatically process and index your content to make it conversational.",
      };
      setMessages(prev => [...prev, botResponse]);
    }, 2000);
  };
  
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat header */}
      <div className="px-4 py-3 border-b flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <Bot size={16} className="text-chatbot-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium">Botalk Assistant</h3>
            <p className="text-xs text-green-600">Online</p>
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <MoreHorizontal size={20} />
        </button>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex gap-3 animate-slide-up",
              message.role === 'user' ? "justify-end" : "justify-start"
            )}
          >
            {message.role === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-chatbot-primary" />
              </div>
            )}
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
                message.role === 'user'
                  ? "bg-chatbot-primary text-white rounded-tr-none"
                  : "bg-white text-gray-800 rounded-tl-none border border-gray-100 shadow-sm"
              )}
            >
              <p className="whitespace-pre-line">{message.content}</p>
            </div>
            {message.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                <User size={16} className="text-gray-600" />
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-3 justify-start animate-slide-up">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Bot size={16} className="text-chatbot-primary" />
            </div>
            <div className="bg-white text-gray-800 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm px-4 py-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse animation-delay-200"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse animation-delay-500"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat input */}
      <div className="px-4 py-3 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-chatbot-primary/30 transition-all"
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
              input.trim()
                ? "bg-chatbot-primary text-white hover:bg-chatbot-secondary"
                : "bg-gray-100 text-gray-400"
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
