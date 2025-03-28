
import { useLocation, Link } from "react-router-dom";
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 px-4 text-center">
      <div className="space-y-6 max-w-md mx-auto">
        <div className="relative">
          <div className="text-9xl font-bold text-chatbot-primary opacity-10 dark:text-blue-500 dark:opacity-20">404</div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Page Not Found
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/">
          <Button className="mt-4 bg-chatbot-primary hover:bg-chatbot-secondary dark:bg-blue-600 dark:hover:bg-blue-700 text-white" size="lg">
            <ArrowLeft size={16} className="mr-2" />
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
