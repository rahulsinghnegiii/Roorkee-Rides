import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import LoginScreen from './screens/LoginScreen'
import OTPScreen from './screens/OTPScreen'
import HomeScreen from './screens/HomeScreen'
import BookingScreen from './screens/BookingScreen'
import VehicleSelectionScreen from './screens/VehicleSelectionScreen'
import RideConfirmationScreen from './screens/RideConfirmationScreen'
import MyRidesScreen from './screens/MyRidesScreen'
import ProfileScreen from './screens/ProfileScreen'
import DriverRatingScreen from './screens/DriverRatingScreen'

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/otp" element={<OTPScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/booking" element={<BookingScreen />} />
          <Route path="/vehicles" element={<VehicleSelectionScreen />} />
          <Route path="/confirmation" element={<RideConfirmationScreen />} />
          <Route path="/rides" element={<MyRidesScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/rate-driver" element={<DriverRatingScreen />} />
        </Routes>
      </div>
    </AppProvider>
  )
}

export default App