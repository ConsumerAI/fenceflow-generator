
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-20">
        <div className="text-center max-w-xl px-4">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">404</h1>
          <p className="text-2xl text-gray-600 mb-8">
            The page you're looking for cannot be found
          </p>
          <p className="text-gray-500 mb-8">
            The requested URL <span className="font-mono bg-gray-100 px-2 py-1 rounded">{location.pathname}</span> was not found on this server.
          </p>
          <Button asChild className="bg-texas-terracotta hover:bg-texas-earth text-white">
            <Link to="/">Return to Homepage</Link>
          </Button>
          
          <div className="mt-8 text-sm text-gray-400">
            If you believe this is an error, please contact our support team.
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
