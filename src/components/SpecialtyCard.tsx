
import React from 'react';
import { Heart } from 'lucide-react';

interface SpecialtyCardProps {
  title: string;
  description: string;
  price: number;
  rating: number;
  icon: React.ReactNode;
  delay?: number;
}

const SpecialtyCard: React.FC<SpecialtyCardProps> = ({ 
  title, 
  description, 
  price, 
  rating, 
  icon,
  delay = 0 
}) => {
  return (
    <div 
      className="specialty-card relative p-4 sm:p-6 bg-white rounded-xl shadow-card hover:shadow-hover transition-all duration-300"
      style={{ 
        animation: `slide-up 0.5s ease-out ${delay}s both`
      }}
    >
      <button className="favorite-button absolute top-3 right-3">
        <Heart size={16} className="text-gray-400 hover:text-red-500 transition-colors duration-200" />
      </button>
      
      <div className="mb-4 sm:mb-6 flex justify-center">{icon}</div>
      
      <h3 className="text-lg sm:text-xl font-semibold text-healthcare-text mb-2">{title}</h3>
      <p className="text-xs sm:text-sm text-healthcare-muted mb-4 flex-grow">{description}</p>
      
      <div className="flex items-center justify-between mt-2">
        <p className="price-tag text-base sm:text-lg font-semibold text-healthcare-primary">
          <span className="text-xs sm:text-sm text-healthcare-muted mr-1">$</span>
          {price.toFixed(2)}
        </p>
        
        <div className="rating flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-yellow-500">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
          </svg>
          <span className="text-xs sm:text-sm text-healthcare-text">{rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default SpecialtyCard;
