import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { MapPin, Navigation, Clock, ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Header from '../components/Header'
import LocationInput from '../components/LocationInput'
import { popularLocations } from '../data/locations'

export default function BookingScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const { state, dispatch } = useApp()
  const [pickup, setPickup] = useState(state.currentBooking.pickup)
  const [drop, setDrop] = useState(state.currentBooking.drop)

  const selectedLocation = location.state?.selectedLocation

  React.useEffect(() => {
    if (selectedLocation) {
      setDrop(selectedLocation)
    }
  }, [selectedLocation])

  const handleContinue = () => {
    if (pickup && drop) {
      dispatch({ type: 'SET_PICKUP', payload: pickup })
      dispatch({ type: 'SET_DROP', payload: drop })
      navigate('/vehicles')
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header title="Book a Ride" showBack />

      {/* Map Area */}
      <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center relative overflow-hidden">
        {/* Simulated map elements */}
        <div className="absolute inset-0">
          <div className="absolute top-[20%] left-[30%] w-16 h-1 bg-gray-300 rounded-full transform rotate-45"></div>
          <div className="absolute top-[30%] left-[50%] w-20 h-1 bg-gray-300 rounded-full"></div>
          <div className="absolute top-[40%] left-[20%] w-12 h-1 bg-gray-300 rounded-full transform -rotate-20"></div>
          <div className="absolute top-[60%] left-[40%] w-24 h-1 bg-gray-300 rounded-full transform rotate-12"></div>
          <div className="absolute top-[70%] left-[70%] w-16 h-1 bg-gray-300 rounded-full transform -rotate-45"></div>
          
          {/* Simulated landmarks */}
          <div className="absolute top-[25%] left-[25%] w-6 h-6 bg-blue-100 rounded-sm border border-gray-300"></div>
          <div className="absolute top-[35%] left-[65%] w-5 h-5 bg-green-100 rounded-sm border border-gray-300"></div>
          <div className="absolute top-[65%] left-[35%] w-6 h-6 bg-yellow-100 rounded-sm border border-gray-300"></div>
        </div>

        {/* Route indicator */}
        {pickup && drop && (
          <div className="relative z-10 flex items-center">
            <div className="w-3 h-3 bg-royal-600 rounded-full"></div>
            <div className="w-24 h-0.5 bg-royal-600"></div>
            <ArrowRight className="w-4 h-4 text-royal-600" />
            <div className="w-24 h-0.5 bg-royal-600"></div>
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
        )}
        
        {!pickup && !drop && (
          <div className="text-center relative z-10">
            <Navigation className="w-8 h-8 text-royal-600 mx-auto mb-2" />
            <p className="text-gray-600 text-sm bg-white px-3 py-1 rounded-full shadow-sm">Select locations</p>
          </div>
        )}
      </div>

      {/* Location Inputs */}
      <div className="flex-1 px-4 py-6">
        <div className="space-y-4 mb-6">
          <LocationInput
            label="PICKUP"
            placeholder="Select pickup location"
            value={pickup}
            onClick={() => {
              if (!pickup) {
                // Set current location as pickup
                const currentLocation = {
                  id: 'current',
                  name: 'Current Location',
                  address: 'Your current location',
                  coordinates: { lat: 29.8543, lng: 77.8880 }
                };
                setPickup(currentLocation);
              }
            }}
            icon={<div className="w-3 h-3 bg-green-500 rounded-full"></div>}
          />

          <LocationInput
            label="DROP"
            placeholder="Where to?"
            value={drop}
            onClick={() => {
              // In a real app, this would open a location search screen
              // For now, we'll just toggle between null and a default location
              if (drop) {
                setDrop(null);
              } else {
                setDrop(popularLocations[0]);
              }
            }}
            icon={<div className="w-3 h-3 bg-red-500 rounded-full"></div>}
          />
        </div>

        {/* Popular Locations */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Locations</h3>
          <div className="space-y-2">
            {popularLocations.slice(0, 5).map((location) => (
              <button
                key={location.id}
                onClick={() => setDrop(location)}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
              >
                <div className="w-8 h-8 bg-royal-50 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-royal-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">{location.name}</p>
                  <p className="text-sm text-gray-500">{location.address}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="p-4 border-t border-gray-100 shadow-inner">
        <button
          onClick={handleContinue}
          disabled={!pickup || !drop}
          className={`w-full py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all duration-200 shadow-md ${
            pickup && drop
              ? 'bg-royal-600 hover:bg-royal-700 active:bg-royal-800 transform active:scale-95'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  )
}