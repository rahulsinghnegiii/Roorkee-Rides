import React from 'react';
import { Phone, Star } from 'lucide-react';
import { Driver } from '../context/AppContext';

interface DriverCardProps {
  driver: Driver;
  showCallButton?: boolean;
  showRating?: boolean;
}

export default function DriverCard({ 
  driver, 
  showCallButton = true,
  showRating = true 
}: DriverCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center">
        <div className="h-16 w-16 rounded-full bg-royal-100 flex items-center justify-center text-3xl">
          {driver.photo}
        </div>
        
        <div className="ml-4 flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900">{driver.name}</h3>
              <p className="text-sm text-gray-500">{driver.vehicleType.charAt(0).toUpperCase() + driver.vehicleType.slice(1)} • {driver.vehicleNumber}</p>
            </div>
            
            {showRating && (
              <div className="flex items-center bg-green-50 px-2 py-1 rounded-md">
                <Star className="w-3 h-3 text-yellow-500 mr-1" fill="#EAB308" />
                <span className="text-sm font-medium text-gray-900">{driver.rating}</span>
              </div>
            )}
          </div>
          
          <div className="mt-2 flex justify-between items-center">
            <div className="text-xs text-gray-500">
              <span>{driver.totalRides}+ rides</span>
              <span className="mx-1">•</span>
              <span>{driver.experience}</span>
            </div>
            
            {showCallButton && (
              <button className="flex items-center justify-center bg-royal-600 text-white rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-royal-700 transition-colors">
                <Phone className="w-3 h-3 mr-1" />
                Call
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}