
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
    <div className="min-h-screen flex items-center justify-center bg-healthcare-bg p-4">
      <div className="text-center max-w-md w-full bg-white p-8 rounded-2xl shadow-card animate-fade-in">
        <div className="w-16 h-16 bg-healthcare-light rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#35C389" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold mb-2 text-healthcare-text">404</h1>
        <p className="text-lg text-healthcare-muted mb-6">Oops! Page not found</p>
        
        <a 
          href="/" 
          className="inline-flex items-center gap-2 bg-healthcare-primary text-white px-6 py-3 rounded-lg transition-all duration-200 hover:bg-healthcare-secondary"
        >
          <ArrowLeft size={16} />
          Return Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
