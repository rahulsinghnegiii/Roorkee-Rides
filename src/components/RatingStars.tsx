import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  setRating: (rating: number) => void;
  maxRating?: number;
}

export default function RatingStars({ 
  rating, 
  setRating, 
  maxRating = 5 
}: RatingStarsProps) {
  return (
    <div className="flex justify-center space-x-2">
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            key={index}
            onClick={() => setRating(starValue)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <Star
              className={`w-8 h-8 ${
                starValue <= rating 
                  ? 'text-yellow-400' 
                  : 'text-gray-300'
              }`}
              fill={starValue <= rating ? '#FACC15' : 'none'}
            />
          </button>
        );
      })}
    </div>
  );
} 