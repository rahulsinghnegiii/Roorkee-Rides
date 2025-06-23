import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Phone, Star, MapPin, Clock, X, Navigation } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Header from '../components/Header'
import DriverCard from '../components/DriverCard'
import { drivers } from '../data/drivers'

export default function RideConfirmationScreen() {
  const navigate = useNavigate()
  const { state, dispatch } = useApp()
  const [rideStatus, setRideStatus] = useState<'searching' | 'confirmed' | 'arriving' | 'started'>('searching')
  const [eta, setEta] = useState(5)
  const [progress, setProgress] = useState(0)

  const { currentBooking } = state
  const { pickup, drop, selectedVehicle } = currentBooking

  // For demo purposes, we'll use the driver from the state or the first driver from our data
  const driver = currentBooking.driver || drivers.find(d => d.vehicleType === selectedVehicle?.type) || drivers[0]

  useEffect(() => {
    // Simulate ride flow
    const timer1 = setTimeout(() => setRideStatus('confirmed'), 2000)
    const timer2 = setTimeout(() => setRideStatus('arriving'), 5000)
    const timer3 = setTimeout(() => setRideStatus('started'), 10000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  useEffect(() => {
    if (rideStatus === 'arriving' || rideStatus === 'started') {
      const interval = setInterval(() => {
        setEta(prev => Math.max(0, prev - 1))
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [rideStatus])

  useEffect(() => {
    if (rideStatus === 'started') {
      const interval = setInterval(() => {
        setProgress(prev => Math.min(100, prev + 2))
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [rideStatus])

  const handleCancelRide = () => {
    dispatch({ type: 'CLEAR_BOOKING' })
    navigate('/home')
  }

  const handleCompleteRide = () => {
    if (pickup && drop && selectedVehicle && driver) {
      const newRide = {
        id: Date.now().toString(),
        pickup,
        drop,
        vehicleType: selectedVehicle.type,
        driverName: driver.name,
        driverPhoto: driver.photo,
        status: 'completed' as const,
        fare: selectedVehicle.price,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
      }
      
      dispatch({ type: 'ADD_RIDE', payload: newRide })
      dispatch({ type: 'CLEAR_BOOKING' })
      navigate('/rate-driver')
    }
  }

  const getStatusMessage = () => {
    switch (rideStatus) {
      case 'searching':
        return 'Finding your driver...'
      case 'confirmed':
        return 'Driver confirmed!'
      case 'arriving':
        return `Driver arriving in ${eta} min`
      case 'started':
        return 'Ride in progress'
      default:
        return ''
    }
  }

  if (!selectedVehicle) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-royal-500 border-t-transparent rounded-full mb-4"></div>
        <p className="text-gray-600">Loading ride details...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header title="Your Ride" showBack />

      {/* Status */}
      <div className="px-4 py-6 bg-royal-50 border-b border-royal-100">
        <div className="text-center">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
            rideStatus === 'searching' ? 'bg-yellow-100' : 'bg-green-100'
          }`}>
            {rideStatus === 'searching' ? (
              <div className="animate-spin w-8 h-8 border-3 border-yellow-500 border-t-transparent rounded-full"></div>
            ) : (
              <div className="text-3xl">{selectedVehicle.icon}</div>
            )}
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">{getStatusMessage()}</h2>
          <p className="text-gray-600">
            {selectedVehicle.name} • ₹{selectedVehicle.price}
          </p>
        </div>
      </div>

      {/* Driver Info */}
      {rideStatus !== 'searching' && (
        <div className="px-4 py-6 border-b border-gray-100">
          <DriverCard driver={driver} />
        </div>
      )}

      {/* Trip Details */}
      <div className="flex-1 px-4 py-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Details</h3>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="mt-2 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div>
              <p className="font-medium text-gray-900">Pickup</p>
              <p className="text-sm text-gray-600">{pickup?.name}</p>
              <p className="text-xs text-gray-500">{pickup?.address}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="mt-2 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
            <div>
              <p className="font-medium text-gray-900">Drop</p>
              <p className="text-sm text-gray-600">{drop?.name}</p>
              <p className="text-xs text-gray-500">{drop?.address}</p>
            </div>
          </div>
        </div>

        {/* Map Preview */}
        <div className="mt-6 h-40 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center relative overflow-hidden">
          {/* Simulated map elements */}
          <div className="absolute inset-0">
            <div className="absolute top-[20%] left-[30%] w-16 h-1 bg-gray-300 rounded-full transform rotate-45"></div>
            <div className="absolute top-[30%] left-[50%] w-20 h-1 bg-gray-300 rounded-full"></div>
            <div className="absolute top-[40%] left-[20%] w-12 h-1 bg-gray-300 rounded-full transform -rotate-20"></div>
            <div className="absolute top-[60%] left-[40%] w-24 h-1 bg-gray-300 rounded-full transform rotate-12"></div>
            <div className="absolute top-[70%] left-[70%] w-16 h-1 bg-gray-300 rounded-full transform -rotate-45"></div>
          </div>
          
          {/* Route indicator */}
          <div className="relative z-10">
            {rideStatus === 'started' && (
              <div className="w-full max-w-[200px] bg-gray-200 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-royal-600 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}
            <div className="flex items-center justify-center">
              <Navigation className="w-8 h-8 text-royal-600" />
            </div>
          </div>
        </div>

        {/* ETA */}
        {rideStatus === 'arriving' && (
          <div className="mt-6 p-4 bg-blue-50 rounded-xl shadow-sm">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-900">
                Driver arriving in {eta} minutes
              </span>
            </div>
          </div>
        )}

        {rideStatus === 'started' && (
          <div className="mt-6 p-4 bg-green-50 rounded-xl shadow-sm">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-900">
                Ride in progress • ETA: {12 - Math.floor(progress/10)} min
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-gray-100 space-y-3 shadow-inner">
        {rideStatus === 'started' ? (
          <button
            onClick={handleCompleteRide}
            className="w-full py-4 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors shadow-md"
          >
            Complete Ride
          </button>
        ) : (
          <button
            onClick={handleCancelRide}
            className="w-full py-4 px-6 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-xl transition-colors flex items-center justify-center space-x-2 shadow-sm"
          >
            <X className="w-5 h-5" />
            <span>Cancel Ride</span>
          </button>
        )}
      </div>
    </div>
  )
}