import React from 'react';
import { useApp } from '../context/AppContext';
import { Vehicle } from '../data/vehicles';

interface VehicleSelectorProps {
  vehicles: Vehicle[];
  onSelectVehicle: (vehicle: Vehicle) => void;
  selectedVehicleId?: string;
}

export default function VehicleSelector({ 
  vehicles, 
  onSelectVehicle, 
  selectedVehicleId 
}: VehicleSelectorProps) {
  return (
    <div className="space-y-3 py-2">
      {vehicles.map((vehicle) => {
        const isSelected = selectedVehicleId === vehicle.id;
        
        return (
          <div
            key={vehicle.id}
            onClick={() => onSelectVehicle(vehicle)}
            className={`p-4 rounded-xl border transition-all ${
              isSelected 
                ? 'border-royal-600 bg-royal-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-royal-100 flex items-center justify-center text-2xl">
                {vehicle.icon}
              </div>
              
              <div className="ml-4 flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{vehicle.name}</h3>
                    <p className="text-sm text-gray-500">{vehicle.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹{vehicle.price}</p>
                    <p className="text-xs text-gray-500">{vehicle.eta} min</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-2 flex justify-between text-sm">
              <div className="text-gray-500">
                <span>Base fare: ₹{vehicle.basePrice}</span>
                <span className="mx-2">•</span>
                <span>₹{vehicle.pricePerKm}/km</span>
              </div>
              <div className="text-gray-500">
                <span>Up to {vehicle.capacity} {vehicle.capacity > 1 ? 'persons' : 'person'}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
} 