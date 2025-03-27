
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4 text-center">
      <div className="space-y-6 max-w-md mx-auto">
        <div className="relative">
          <div className="text-9xl font-bold text-chatbot-primary opacity-10">404</div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl md:text-4xl font-bold text-gray-900">
            Page Not Found
          </div>
        </div>
        
        <p className="text-gray-600 text-lg">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Button className="mt-4 bg-chatbot-primary hover:bg-chatbot-secondary text-white" size="lg">
          <ArrowLeft size={16} className="mr-2" />
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
