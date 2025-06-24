import React, { useState } from 'react'
import { Clock } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Header from '../components/Header'
import BottomNavigation from '../components/BottomNavigation'
import RideHistoryItem from '../components/RideHistoryItem'
import { pastRides, upcomingRides, RideData } from '../data/rides'

export default function MyRidesScreen() {
  const { state } = useApp()
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('completed')

  // Convert context rides to RideData format
  const convertContextRideToRideData = (ride: any): RideData => {
    return {
      id: ride.id,
      pickup: ride.pickup,
      drop: ride.drop,
      vehicleType: ride.vehicle?.type || 'car',
      driverName: ride.driver?.name || 'Driver',
      driverPhoto: ride.driver?.photo || '👨',
      status: ride.status,
      fare: ride.fare,
      date: ride.date,
      time: ride.time,
      driverRating: 0
    }
  }

  // Combine rides from context and dummy data
  const contextCompletedRides = state.rides
    .filter(ride => ride.status === 'completed')
    .map(convertContextRideToRideData)
  
  const contextUpcomingRides = state.rides
    .filter(ride => ride.status === 'upcoming')
    .map(convertContextRideToRideData)

  const completedRides = [...contextCompletedRides, ...pastRides]
  const upcoming = [...contextUpcomingRides, ...upcomingRides]
  
  const filteredRides = activeTab === 'completed' ? completedRides : upcoming

  return (
    <div className="min-h-screen bg-white flex flex-col pb-20">
      <Header title="My Rides" />

      {/* Tabs */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex bg-gray-100 rounded-lg p-1 shadow-sm">
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'completed'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'upcoming'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Upcoming
          </button>
        </div>
      </div>

      {/* Rides List */}
      <div className="flex-1 px-4 py-4">
        {filteredRides.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No rides yet</h3>
            <p className="text-gray-500">
              {activeTab === 'upcoming' 
                ? "You don't have any upcoming rides"
                : "Your completed rides will appear here"
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRides.map((ride) => (
              <RideHistoryItem key={ride.id} ride={ride} />
            ))}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  )
}