import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, Users, ChevronDown, ChevronUp } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Header from '../components/Header'
import VehicleSelector from '../components/VehicleSelector'
import { vehicles } from '../data/vehicles'
import { drivers } from '../data/drivers'

export default function VehicleSelectionScreen() {
  const navigate = useNavigate()
  const { state, dispatch } = useApp()
  const [showFareDetails, setShowFareDetails] = useState(false)
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | undefined>(undefined)

  const handleSelectVehicle = (vehicle: typeof vehicles[0]) => {
    setSelectedVehicleId(vehicle.id)
    dispatch({ type: 'SELECT_VEHICLE', payload: vehicle })
  }
  
  const handleConfirmRide = () => {
    if (!selectedVehicleId) return;
    
    // Find the selected vehicle
    const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId);
    if (!selectedVehicle) return;
    
    // Find a driver with matching vehicle type
    const matchingDrivers = drivers.filter(d => d.vehicleType === selectedVehicle.type);
    const randomDriver = matchingDrivers[Math.floor(Math.random() * matchingDrivers.length)];
    
    dispatch({ type: 'ASSIGN_DRIVER', payload: randomDriver })
    navigate('/confirmation')
  }

  // Calculate distance between pickup and drop (mock calculation)
  const distance = 3.2; // km
  const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId);
  
  // Calculate fare
  const baseFare = selectedVehicle?.basePrice || 0;
  const distanceFare = selectedVehicle ? Math.round(distance * selectedVehicle.pricePerKm) : 0;
  const totalFare = baseFare + distanceFare;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header title="Choose Vehicle" showBack />

      {/* Trip Info */}
      <div className="px-4 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mb-2"></div>
            <div className="w-0.5 h-6 bg-gray-300"></div>
            <div className="w-3 h-3 bg-red-500 rounded-full mt-2"></div>
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">{state.currentBooking.pickup?.name}</p>
            <p className="text-sm text-gray-500 mt-3">{state.currentBooking.drop?.name}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">{distance} km</p>
            <p className="text-xs text-gray-400">~15 min</p>
          </div>
        </div>
      </div>

      {/* Vehicle Options */}
      <div className="flex-1 px-4 py-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Vehicles</h3>
        
        <VehicleSelector 
          vehicles={vehicles}
          onSelectVehicle={handleSelectVehicle}
          selectedVehicleId={selectedVehicleId}
        />

        {/* Fare Breakdown */}
        <div className="mt-8 bg-gray-50 rounded-xl border border-gray-200">
            <button
            className="w-full p-4 flex justify-between items-center"
            onClick={() => setShowFareDetails(!showFareDetails)}
          >
            <h4 className="font-semibold text-gray-900">Fare Details</h4>
            <div className="flex items-center">
              <span className="mr-2 font-semibold text-gray-900">
                ₹{totalFare}
              </span>
              {showFareDetails ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
              </div>
            </button>
          
          {showFareDetails && (
            <div className="px-4 pb-4 space-y-2 text-sm border-t border-gray-200 pt-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Base fare</span>
                <span className="text-gray-900">₹{baseFare}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-600">Distance ({distance} km)</span>
                <span className="text-gray-900">₹{distanceFare}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-2 font-semibold">
              <span className="text-gray-900">Total</span>
                <span className="text-gray-900">₹{totalFare}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom Action */}
      <div className="p-4 border-t border-gray-200 bg-white shadow-inner">
        <button
          onClick={handleConfirmRide}
          disabled={!selectedVehicleId}
          className={`w-full py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all duration-200 ${
            selectedVehicleId
              ? 'bg-royal-600 hover:bg-royal-700 active:bg-royal-800 shadow-md'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Confirm {selectedVehicle?.name || 'Ride'}
        </button>
      </div>
    </div>
  )
}