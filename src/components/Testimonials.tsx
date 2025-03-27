
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Botalk has transformed our customer support. We've seen a 40% reduction in response time and our team can focus on more complex issues.",
    author: "Sarah Johnson",
    position: "Customer Support Manager",
    company: "TechCorp Inc."
  },
  {
    quote: "Setting up was incredibly easy. Within days, our knowledge base was conversational and helping our customers 24/7.",
    author: "Michael Chen",
    position: "CTO",
    company: "StartUp Ventures"
  },
  {
    quote: "The ability to train the AI with our specific knowledge base has made a huge difference in the accuracy of responses.",
    author: "Emma Rodriguez",
    position: "Head of Operations",
    company: "Global Solutions"
  },
  {
    quote: "Our users love the natural conversational flow. It doesn't feel like talking to a bot at all.",
    author: "David Kim",
    position: "Product Manager",
    company: "InnovateTech"
  }
];

const Testimonials = () => {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  
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
    
    const elements = testimonialsRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={testimonialsRef} className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="animate-on-scroll opacity-0 text-3xl md:text-4xl font-bold tracking-tight">
            What Our <span className="text-gradient">Customers</span> Say
          </h2>
          <p className="animate-on-scroll opacity-0 text-lg text-gray-600 animation-delay-200">
            Discover how Botalk is helping businesses transform their customer interactions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={cn(
                "animate-on-scroll opacity-0 bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-card relative",
                index % 2 === 0 ? "animation-delay-200" : "animation-delay-500"
              )}
            >
              <Quote className="absolute top-6 left-6 w-8 h-8 text-gray-200 opacity-50" />
              <blockquote className="pt-6 pl-6">
                <p className="text-lg text-gray-700 mb-6 relative z-10">"{testimonial.quote}"</p>
                <footer>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-chatbot-primary font-medium">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <cite className="font-medium text-gray-900 not-italic">
                        {testimonial.author}
                      </cite>
                      <div className="text-sm text-gray-500">
                        {testimonial.position}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </footer>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
