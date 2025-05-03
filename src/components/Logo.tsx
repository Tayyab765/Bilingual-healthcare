
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  const isMobile = useIsMobile();
  
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-healthcare-primary to-healthcare-secondary rounded-full flex items-center justify-center text-white font-bold">
          <span className="text-sm md:text-base">BH</span>
        </div>
      </div>
      <div>
        <h1 className={`font-semibold text-healthcare-text ${isMobile ? "text-base" : "text-lg"}`}>Bilingual Healthcare</h1>
        <p className="text-[10px] text-healthcare-muted -mt-1">Professional Care Services</p>
      </div>
    </Link>
  );
};

export default Logo;
