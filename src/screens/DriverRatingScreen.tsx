import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, Send } from 'lucide-react';
import Header from '../components/Header';
import RatingStars from '../components/RatingStars';
import { useApp } from '../context/AppContext';
import { drivers } from '../data/drivers';

export default function DriverRatingScreen() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // In a real app, we would get the driver from the ride details
  // For now, we'll just use the first driver from our dummy data
  const driver = drivers[0];
  
  const handleSubmit = () => {
    if (rating > 0) {
      // Here we would submit the rating to an API
      // For now, we'll just show a success message
      setIsSubmitted(true);
      
      // Navigate back to rides after a delay
      setTimeout(() => {
        navigate('/rides');
      }, 2000);
    }
  };
  
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header title="Thank You!" showBack={false} />
        
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Rating Submitted!
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Thank you for your feedback. It helps us improve our service.
          </p>
          
          <p className="text-sm text-gray-500">
            Redirecting to your rides...
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header title="Rate Your Ride" showBack={true} />
      
      <div className="flex-1 px-6 py-8">
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-8">
            <div className="h-20 w-20 rounded-full bg-royal-100 flex items-center justify-center mx-auto mb-4 text-4xl">
              {driver.photo}
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              How was your ride with {driver.name}?
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Your feedback helps improve our service
            </p>
          </div>
          
          <div className="mb-8">
            <RatingStars rating={rating} setRating={setRating} />
          </div>
          
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Comments (Optional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-royal-500 focus:border-royal-500 h-32 resize-none"
            />
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className={`w-full py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all duration-200 flex items-center justify-center ${
              rating > 0
                ? 'bg-royal-600 hover:bg-royal-700 active:bg-royal-800'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5 mr-2" />
            Submit Rating
          </button>
        </div>
      </div>
    </div>
  );
} 