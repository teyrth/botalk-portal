
import React, { useEffect, useRef } from 'react';
import { 
  Brain, 
  BarChart, 
  Globe, 
  Shield, 
  Zap, 
  MessageSquare, 
  FileText, 
  Layers 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const featuresList = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'AI Knowledge Engine',
    description: 'Our advanced AI understands context and nuance, providing accurate answers to complex questions.',
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Multi-format Support',
    description: 'Upload documents, connect to websites, or integrate with your existing knowledge base.',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Multi-language Support',
    description: 'Communicate with customers in over 100 languages with automatic detection and translation.',
  },
  {
    icon: <BarChart className="w-6 h-6" />,
    title: 'Analytics Dashboard',
    description: 'Track performance, user satisfaction, and identify knowledge gaps with detailed insights.',
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'Conversational Interface',
    description: 'Natural, human-like conversations that maintain context throughout the interaction.',
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: 'Seamless Integration',
    description: 'Easily embed on your website or integrate with popular platforms like Slack, Teams, and more.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Enterprise Security',
    description: 'SOC 2 compliant with end-to-end encryption and data privacy controls.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Lightning Fast Setup',
    description: 'Get up and running in minutes with our intuitive onboarding and setup process.',
  },
];

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = featuresRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" ref={featuresRef} className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="animate-on-scroll opacity-0 text-3xl md:text-4xl font-bold tracking-tight">
            Powerful Features for Intelligent <span className="text-gradient">Conversations</span>
          </h2>
          <p className="animate-on-scroll opacity-0 text-lg text-gray-600 animation-delay-200">
            Everything you need to create, deploy and optimize AI-powered knowledge assistants.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuresList.map((feature, index) => (
            <div 
              key={index}
              className={cn(
                "animate-on-scroll opacity-0 bg-white rounded-xl p-6 border border-gray-100 shadow-card hover:shadow-strong transition-all",
                index % 2 === 0 ? "animation-delay-200" : "animation-delay-500"
              )}
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4 text-chatbot-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
