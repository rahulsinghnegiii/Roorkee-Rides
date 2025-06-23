import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, Clock, User, Menu } from 'lucide-react'
import { useApp } from '../context/AppContext'
import BottomNavigation from '../components/BottomNavigation'
import { popularLocations } from '../data/locations'

export default function HomeScreen() {
  const navigate = useNavigate()
  const { state } = useApp()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-royal-600 px-4 py-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold">Hello, {state.user?.name || 'User'}!</h1>
            <p className="text-royal-100 text-sm">Where would you like to go?</p>
          </div>
          <button 
            onClick={() => navigate('/profile')}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md"
          >
            <span className="text-royal-600 font-semibold text-sm">
              {state.user?.name?.charAt(0) || 'U'}
            </span>
          </button>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-gray-100">
        {/* Mock Map */}
        <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center relative overflow-hidden">
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
          
          {/* Current location marker */}
          <div className="relative z-10 text-center">
            <div className="w-12 h-12 bg-royal-600 rounded-full flex items-center justify-center mx-auto mb-2 border-4 border-white shadow-lg">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <p className="text-gray-800 font-medium bg-white px-3 py-1 rounded-full shadow-md">
              Your location
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="absolute top-4 left-4 right-4">
          <button
            onClick={() => navigate('/booking')}
            className="w-full bg-white rounded-xl shadow-lg p-4 flex items-center space-x-3 hover:shadow-xl transition-shadow"
          >
            <Search className="w-5 h-5 text-gray-400" />
            <span className="text-gray-500 flex-1 text-left">Where to?</span>
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-6 bg-white shadow-inner">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Locations</h3>
        <div className="space-y-3">
          {popularLocations.slice(0, 3).map((location) => (
            <button
              key={location.id}
              onClick={() => navigate('/booking', { state: { selectedLocation: location } })}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
            >
              <div className="w-10 h-10 bg-royal-50 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-royal-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-900">{location.name}</p>
                <p className="text-sm text-gray-500">{location.address}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}