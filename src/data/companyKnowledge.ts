
// Company knowledge base for the chatbot to reference

export const companyKnowledge = {
  company: {
    name: "Botalk AI",
    founded: "2022",
    mission: "To make AI conversations accessible to everyone through intuitive chatbot interfaces",
    vision: "Creating a world where human-AI interaction is seamless, intuitive, and beneficial for all",
    description: "Botalk AI is a leading provider of AI-powered conversational interfaces that help businesses engage with their customers more effectively."
  },
  
  products: [
    {
      name: "Botalk Assistant",
      description: "Our flagship AI chatbot solution that seamlessly integrates with your website or application",
      features: [
        "Natural language understanding",
        "Knowledge base integration",
        "Multi-language support",
        "Customizable responses",
        "Analytics dashboard"
      ],
      useCases: [
        "Customer support automation",
        "Lead generation",
        "Product recommendations",
        "Technical troubleshooting",
        "FAQ automation"
      ]
    },
    {
      name: "Botalk Enterprise",
      description: "Advanced AI solution for large businesses with complex needs",
      features: [
        "Custom training on proprietary data",
        "Advanced analytics and reporting",
        "SSO and role-based access control",
        "SLA-backed support",
        "White-label solutions"
      ]
    }
  ],
  
  pricing: [
    {
      plan: "Free",
      price: "$0/month",
      features: [
        "1 chatbot",
        "100 conversations/month",
        "Basic analytics",
        "Standard support"
      ]
    },
    {
      plan: "Starter",
      price: "$29/month",
      features: [
        "3 chatbots",
        "1,000 conversations/month",
        "Enhanced analytics",
        "Priority support",
        "Custom branding"
      ]
    },
    {
      plan: "Professional",
      price: "$99/month",
      features: [
        "10 chatbots",
        "10,000 conversations/month",
        "Advanced analytics",
        "24/7 support",
        "API access",
        "Custom integrations"
      ]
    },
    {
      plan: "Enterprise",
      price: "Custom pricing",
      features: [
        "Unlimited chatbots",
        "Unlimited conversations",
        "Enterprise-grade security",
        "Dedicated account manager",
        "Custom AI model training",
        "SLA guarantees"
      ]
    }
  ],
  
  faq: [
    {
      question: "How does Botalk AI work?",
      answer: "Botalk AI uses natural language processing to understand and respond to user queries. It can be trained on your knowledge base to provide accurate and helpful responses specific to your business."
    },
    {
      question: "Can I customize the appearance of the chatbot?",
      answer: "Yes, you can fully customize the appearance of your Botalk chatbot to match your brand's colors, logo, and style."
    },
    {
      question: "What languages does Botalk support?",
      answer: "Botalk currently supports over 20 languages including English, Spanish, French, German, Chinese, Japanese, and more."
    },
    {
      question: "How secure is my data with Botalk?",
      answer: "We take data security very seriously. All data is encrypted in transit and at rest, and we comply with GDPR, CCPA, and other privacy regulations."
    },
    {
      question: "Can Botalk integrate with my existing systems?",
      answer: "Yes, Botalk can integrate with your CRM, helpdesk, and other business systems through our API and pre-built integrations."
    },
    {
      question: "How long does it take to set up a chatbot?",
      answer: "Basic setup can be completed in minutes. For more customized solutions with specific knowledge training, it typically takes a few days."
    }
  ],
  
  contact: {
    email: "support@botalk.ai",
    phone: "+1 (555) 123-4567",
    headquarters: "123 AI Boulevard, San Francisco, CA 94103, USA",
    socialMedia: {
      twitter: "@botalkAI",
      linkedin: "company/botalk-ai",
      facebook: "BotalkAI"
    }
  }
};

// Helper function to search through knowledge base
export const searchKnowledge = (query: string): string => {
  const normalizedQuery = query.toLowerCase();
  
  // Search in company info
  if (normalizedQuery.includes("company") || normalizedQuery.includes("about")) {
    return `${companyKnowledge.company.name} is ${companyKnowledge.company.description} Founded in ${companyKnowledge.company.founded}, our mission is ${companyKnowledge.company.mission}.`;
  }
  
  // Search in products
  if (normalizedQuery.includes("product") || normalizedQuery.includes("service")) {
    const products = companyKnowledge.products.map(product => 
      `${product.name}: ${product.description}`
    ).join("\n\n");
    return `Our products include:\n\n${products}`;
  }
  
  // Search in pricing
  if (normalizedQuery.includes("price") || normalizedQuery.includes("plan") || normalizedQuery.includes("cost")) {
    const pricing = companyKnowledge.pricing.map(plan => 
      `${plan.plan} - ${plan.price}: ${plan.features.join(", ")}`
    ).join("\n\n");
    return `Here are our pricing plans:\n\n${pricing}`;
  }
  
  // Search in FAQ
  const faqMatches = companyKnowledge.faq.filter(item => 
    item.question.toLowerCase().includes(normalizedQuery) || 
    item.answer.toLowerCase().includes(normalizedQuery)
  );
  
  if (faqMatches.length > 0) {
    return faqMatches.map(faq => `Q: ${faq.question}\nA: ${faq.answer}`).join("\n\n");
  }
  
  // Search in contact
  if (normalizedQuery.includes("contact") || normalizedQuery.includes("email") || normalizedQuery.includes("phone")) {
    return `You can contact us at:\nEmail: ${companyKnowledge.contact.email}\nPhone: ${companyKnowledge.contact.phone}\nAddress: ${companyKnowledge.contact.headquarters}`;
  }
  
  // Default response if no matches
  return "I don't have specific information about that. Please try asking about our company, products, pricing, or check our FAQ.";
};
