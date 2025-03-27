
import React, { useEffect, useRef } from 'react';
import { CircleIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  {
    number: '01',
    title: 'Import Your Knowledge',
    description: 'Upload documents, connect to your website, or integrate with your existing knowledge base. Our AI automatically processes and indexes your content.',
    image: 'knowledge-base'
  },
  {
    number: '02',
    title: 'Train Your Chatbot',
    description: 'Fine-tune your AI assistant with custom training data and example conversations to match your brand voice and handle specific use cases.',
    image: 'training'
  },
  {
    number: '03',
    title: 'Deploy and Integrate',
    description: 'Easily embed the chatbot on your website, integrate with popular platforms, or deploy it as a standalone application.',
    image: 'deploy'
  },
  {
    number: '04',
    title: 'Continuously Improve',
    description: 'Use analytics to monitor performance, identify knowledge gaps, and optimize your chatbot for better user experiences.',
    image: 'analytics'
  }
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
    
    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="animate-on-scroll opacity-0 text-3xl md:text-4xl font-bold tracking-tight">
            How <span className="text-gradient">Botalk</span> Works
          </h2>
          <p className="animate-on-scroll opacity-0 text-lg text-gray-600 animation-delay-200">
            Our streamlined process gets you from setup to success in four simple steps.
          </p>
        </div>
        
        <div className="space-y-24 md:space-y-32">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={cn(
                "animate-on-scroll opacity-0 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center",
                index % 2 !== 0 ? "md:flex-row-reverse" : "",
                index % 2 !== 0 ? "md:[grid-template-areas:_'b_a']" : ""
              )}
            >
              <div className={cn("space-y-6", index % 2 !== 0 ? "md:pl-12" : "md:pr-12")}>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 text-chatbot-primary font-bold px-3 py-1 rounded-full text-sm">
                    {step.number}
                  </div>
                  <div className="h-px flex-grow bg-gray-200"></div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">{step.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
              </div>
              
              <div className={cn(
                "aspect-video rounded-xl overflow-hidden shadow-strong border border-gray-100 bg-gray-50 flex items-center justify-center",
                index % 2 !== 0 ? "md:order-first" : ""
              )}>
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-chatbot-primary animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
