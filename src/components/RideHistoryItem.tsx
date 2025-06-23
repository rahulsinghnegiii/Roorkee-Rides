import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Ride } from '../context/AppContext';

interface RideHistoryItemProps {
  ride: Ride | any; // Allow both old and new ride formats during transition
}

export default function RideHistoryItem({ ride }: RideHistoryItemProps) {
  const navigate = useNavigate();
  
  // Handle both old and new ride formats
  const vehicleType = ride.vehicle?.type || ride.vehicleType || 'car';
  const vehicleName = ride.vehicle?.name || `${vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1)}`;
  const driverName = ride.driver?.name || ride.driverName || 'Unknown Driver';
  const driverPhoto = ride.driver?.photo || ride.driverPhoto || '👤';
  
  const getStatusColor = () => {
    switch (ride.status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleClick = () => {
    if (ride.status === 'completed') {
      navigate('/rate-driver', { state: { ride } });
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor()}`}>
              {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
            </span>
            <h3 className="text-lg font-semibold mt-1">{vehicleName}</h3>
          </div>
          <div className="text-right">
            <p className="font-semibold text-lg">₹{ride.fare}</p>
            <p className="text-xs text-gray-500">{ride.date}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-lg">
            {driverPhoto}
          </div>
          <span className="text-sm text-gray-700">{driverName}</span>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-start space-x-2">
            <MapPin className="w-4 h-4 text-green-600 mt-0.5" />
            <div>
              <p className="text-gray-700 font-medium">From: {ride.pickup.name}</p>
              <p className="text-xs text-gray-500">{ride.pickup.address}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <MapPin className="w-4 h-4 text-red-600 mt-0.5" />
            <div>
              <p className="text-gray-700 font-medium">To: {ride.drop.name}</p>
              <p className="text-xs text-gray-500">{ride.drop.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 