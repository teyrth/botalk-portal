
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  const ctaRef = useRef<HTMLDivElement>(null);
  
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
    
    const elements = ctaRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ctaRef} className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="animate-on-scroll opacity-0 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Ready to Build Your Intelligent Chatbot?
          </h2>
          <p className="animate-on-scroll opacity-0 text-xl text-blue-100 animation-delay-200 max-w-2xl mx-auto">
            Start creating conversational experiences that engage users and provide instant answers 24/7.
          </p>
          <div className="animate-on-scroll opacity-0 animation-delay-500 flex flex-col sm:flex-row gap-4 pt-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-medium">
              Start Building Free
              <ArrowRight size={16} className="ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-500/20 font-medium">
              Schedule Demo
            </Button>
          </div>
          <p className="animate-on-scroll opacity-0 animation-delay-700 text-sm text-blue-100 pt-4">
            No credit card required. Free plan available. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
