
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, MessageSquare, Sparkles, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import ChatDemo from './ChatDemo';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
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
    
    const elements = heroRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={heroRef} className="pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            <div className="animate-on-scroll opacity-0">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6">
                <Sparkles size={14} className="mr-1.5" />
                <span>AI-Powered Knowledge Assistant</span>
              </div>
            </div>
            
            <h1 className="animate-on-scroll opacity-0 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-pretty">
              Build Intelligent <span className="text-gradient">Chatbots</span> With Your Knowledge Base
            </h1>
            
            <p className="animate-on-scroll opacity-0 text-lg text-gray-600 md:text-xl max-w-xl mx-auto lg:mx-0 animation-delay-200">
              Transform your data into conversational AI that answers questions, solves problems, and engages your customers 24/7.
            </p>
            
            <div className="animate-on-scroll opacity-0 animation-delay-500 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-chatbot-primary hover:bg-chatbot-secondary text-white font-medium rounded-lg group">
                Start Building Free
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="font-medium rounded-lg border-gray-300">
                Schedule Demo
              </Button>
            </div>
            
            <div className="animate-on-scroll opacity-0 animation-delay-700 pt-6">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-y-2 sm:gap-x-8">
                {[
                  'No credit card required',
                  'Free starter plan',
                  'Cancel anytime',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    <span className="text-sm text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="animate-on-scroll opacity-0 animation-delay-200 relative lg:ml-auto">
            <div className="absolute inset-0 bg-gradient-radial from-blue-50 to-transparent opacity-70 blur-3xl -z-10"></div>
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-full">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-white shadow-strong border border-gray-100">
                <ChatDemo />
              </div>
            </div>
          </div>
        </div>
        
        {/* Trusted By Section */}
        <div className="animate-on-scroll opacity-0 animation-delay-500 mt-20 text-center">
          <p className="text-sm font-medium text-gray-500 mb-8">TRUSTED BY INNOVATIVE COMPANIES</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
            {Array.from({ length: 5 }).map((_, index) => (
              <div 
                key={index} 
                className={cn(
                  "h-8 w-24 bg-gray-200 rounded opacity-70 flex items-center justify-center",
                  index % 2 === 0 ? "animate-pulse" : ""
                )}
              >
                <div className="w-16 h-4 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
