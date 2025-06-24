import React from 'react';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { RideData } from '../data/rides';
import { useNavigate } from 'react-router-dom';

interface RideHistoryItemProps {
  ride: RideData;
}

export default function RideHistoryItem({ ride }: RideHistoryItemProps) {
  const navigate = useNavigate();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getVehicleEmoji = (type: string) => {
    switch (type) {
      case 'bike':
        return '🏍️';
      case 'auto':
        return '🛺';
      case 'car':
        return '🚗';
      default:
        return '🚗';
    }
  };

  const handleClick = () => {
    if (ride.status === 'upcoming') {
      navigate('/confirmation', { state: { rideId: ride.id } });
    }
  };

  return (
    <div 
      className={`bg-white rounded-xl border border-gray-200 p-4 ${
        ride.status === 'upcoming' ? 'cursor-pointer hover:border-royal-300' : ''
      }`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <span className="text-xl mr-2">{getVehicleEmoji(ride.vehicleType)}</span>
          <span className="font-medium text-gray-900">
            {ride.vehicleType.charAt(0).toUpperCase() + ride.vehicleType.slice(1)}
          </span>
        </div>
        <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(ride.status)}`}>
          {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
        </div>
      </div>

      <div className="flex items-center text-sm mb-3">
        <div className="w-2 h-2 rounded-full bg-royal-600"></div>
        <p className="ml-2 text-gray-900 flex-1 truncate">{ride.pickup.name}</p>
      </div>
      
      <div className="flex items-center text-sm mb-4">
        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
        <p className="ml-2 text-gray-900 flex-1 truncate">{ride.drop.name}</p>
      </div>
      
      <div className="flex justify-between items-center text-xs text-gray-500 border-t border-gray-100 pt-3">
        <div className="flex items-center">
          <Calendar className="w-3 h-3 mr-1" />
          <span>{ride.date}</span>
          <span className="mx-1">•</span>
          <Clock className="w-3 h-3 mr-1" />
          <span>{ride.time}</span>
        </div>
        
        <div className="font-medium text-gray-900">
          {ride.fare > 0 ? `₹${ride.fare}` : 'Cancelled'}
        </div>
      </div>
    </div>
  );
} 