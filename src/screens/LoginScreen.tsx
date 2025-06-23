import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Phone } from 'lucide-react'

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const navigate = useNavigate()

  const handleSendOTP = () => {
    if (phoneNumber.length === 10) {
      navigate('/otp', { state: { phoneNumber } })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-600 to-royal-800 flex flex-col">
      {/* Header */}
      <div className="pt-16 pb-8 px-6 text-center">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <div className="text-2xl font-bold text-royal-600">RR</div>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Roorkee Rides</h1>
        <p className="text-royal-100 text-lg">Your trusted ride partner in Roorkee</p>
      </div>

      {/* Login Form */}
      <div className="flex-1 bg-white rounded-t-3xl px-6 py-8 animate-slide-up shadow-lg">
        <div className="max-w-sm mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome!</h2>
          <p className="text-gray-600 mb-8">Enter your phone number to get started</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="Enter 10-digit mobile number"
                  className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-royal-500 focus:border-royal-500 text-lg shadow-sm"
                  maxLength={10}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-sm text-gray-500">+91</span>
                <span className="text-sm text-gray-500">{phoneNumber.length}/10</span>
              </div>
            </div>

            <button
              onClick={handleSendOTP}
              disabled={phoneNumber.length !== 10}
              className={`w-full py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all duration-200 shadow-md ${
                phoneNumber.length === 10
                  ? 'bg-royal-600 hover:bg-royal-700 active:bg-royal-800 transform active:scale-95'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Send OTP
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              By continuing, you agree to our{' '}
              <span className="text-royal-600 font-medium">Terms of Service</span> and{' '}
              <span className="text-royal-600 font-medium">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}