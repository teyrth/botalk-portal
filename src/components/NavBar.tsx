
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <span className="relative z-10 bg-chatbot-primary p-1.5 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-white"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </span>
          <span className="text-xl font-semibold tracking-tight">Botalk</span>
        </a>

        <nav
          className={cn(
            "fixed md:relative top-0 left-0 right-0 bottom-0 md:top-auto md:left-auto md:right-auto md:bottom-auto h-screen md:h-auto flex flex-col md:flex-row items-center justify-center md:justify-end gap-8 md:gap-6 bg-white md:bg-transparent z-40 transition-all duration-300 ease-in-out",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          )}
        >
          <a
            href="#features"
            className="text-sm font-medium text-gray-700 hover:text-chatbot-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-gray-700 hover:text-chatbot-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            How it Works
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium text-gray-700 hover:text-chatbot-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Pricing
          </a>
          <a
            href="#about"
            className="text-sm font-medium text-gray-700 hover:text-chatbot-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </a>
          <div className="flex gap-2 mt-8 md:mt-0">
            <Button variant="outline" className="hidden md:block">
              Log in
            </Button>
            <Button className="bg-chatbot-primary hover:bg-chatbot-secondary transition-colors">
              Get Started
            </Button>
          </div>
        </nav>

        <button
          className="md:hidden text-gray-700 z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default NavBar;
