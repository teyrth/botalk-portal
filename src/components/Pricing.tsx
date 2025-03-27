
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for small businesses and personal websites.',
    price: {
      monthly: 0,
      annually: 0,
    },
    cta: 'Get Started',
    popular: false,
    features: [
      '1,000 messages per month',
      'Basic knowledge base (5MB)',
      'Website chat widget',
      'Standard response time',
      'Basic analytics',
      'Community support',
    ],
  },
  {
    name: 'Pro',
    description: 'For growing teams with advanced needs.',
    price: {
      monthly: 49,
      annually: 39,
    },
    cta: 'Start Free Trial',
    popular: true,
    features: [
      '10,000 messages per month',
      'Advanced knowledge base (100MB)',
      'Website & mobile integration',
      'Custom branding',
      'Advanced analytics',
      'API access',
      'Priority support',
    ],
  },
  {
    name: 'Enterprise',
    description: 'For large organizations requiring full customization.',
    price: {
      monthly: 'Custom',
      annually: 'Custom',
    },
    cta: 'Contact Sales',
    popular: false,
    features: [
      'Unlimited messages',
      'Unlimited knowledge base',
      'Multi-platform integration',
      'Custom AI model training',
      'Advanced security features',
      'Dedicated account manager',
      'SLA guarantees',
      'White labeling',
    ],
  },
];

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');
  const pricingRef = useRef<HTMLDivElement>(null);
  
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
    
    const elements = pricingRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="pricing" ref={pricingRef} className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="animate-on-scroll opacity-0 text-3xl md:text-4xl font-bold tracking-tight text-white">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h2>
          <p className="animate-on-scroll opacity-0 text-lg text-gray-300 animation-delay-200">
            Choose the plan that best fits your needs. Start free, upgrade as you grow.
          </p>
          
          <div className="animate-on-scroll opacity-0 animation-delay-500 flex items-center justify-center mt-8">
            <div className="bg-gray-800 border border-gray-700 p-1 rounded-full inline-flex">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-colors",
                  billingCycle === 'monthly'
                    ? "bg-chatbot-primary text-white"
                    : "bg-transparent text-gray-300 hover:text-white"
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annually')}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-colors",
                  billingCycle === 'annually'
                    ? "bg-chatbot-primary text-white"
                    : "bg-transparent text-gray-300 hover:text-white"
                )}
              >
                Annually <span className="text-green-400 font-medium">Save 20%</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "animate-on-scroll opacity-0 bg-gray-800 rounded-xl overflow-hidden border transition-all",
                plan.popular
                  ? "border-blue-500 shadow-strong relative md:-mt-4 md:mb-4 scale-[1.02]"
                  : "border-gray-700 shadow-card",
                index === 0 ? "animation-delay-200" : index === 1 ? "animation-delay-500" : "animation-delay-700"
              )}
            >
              {plan.popular && (
                <div className="bg-blue-600 text-white text-xs font-bold uppercase tracking-wider py-1.5 text-center">
                  Most Popular
                </div>
              )}
              
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="text-gray-300 mt-2 h-12">{plan.description}</p>
                
                <div className="mt-6 mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-white">
                      {typeof plan.price[billingCycle] === 'number' 
                        ? (plan.price[billingCycle] === 0 
                          ? 'Free' 
                          : `$${plan.price[billingCycle]}`) 
                        : plan.price[billingCycle]}
                    </span>
                    {typeof plan.price[billingCycle] === 'number' && plan.price[billingCycle] > 0 && (
                      <span className="text-gray-400 ml-2">/{billingCycle === 'monthly' ? 'mo' : 'mo, billed annually'}</span>
                    )}
                  </div>
                </div>
                
                <Button
                  className={cn(
                    "w-full",
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-700 text-blue-400 border border-blue-500 hover:bg-gray-600"
                  )}
                >
                  {plan.cta}
                </Button>
                
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <Check size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        {/* Enterprise CTA */}
        <div className="animate-on-scroll opacity-0 animation-delay-700 mt-16 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-xl p-8 md:p-12 text-white shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Need a custom solution?</h3>
              <p className="text-blue-200 text-lg">
                Our enterprise plan offers advanced customization, dedicated support, and enhanced security features for large organizations.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
