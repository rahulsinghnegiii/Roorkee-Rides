import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, Shield } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function OTPScreen() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timer, setTimer] = useState(30)
  const navigate = useNavigate()
  const location = useLocation()
  const { dispatch } = useApp()
  const phoneNumber = location.state?.phoneNumber || ''

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const handleVerifyOTP = () => {
    const otpValue = otp.join('')
    if (otpValue.length === 6) {
      // Mock user login
      dispatch({
        type: 'SET_USER',
        payload: {
          id: '1',
          name: 'Rahul Sharma',
          phone: phoneNumber,
          walletBalance: 250
        }
      })
      navigate('/home')
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center px-4 py-4 border-b border-gray-100 shadow-sm">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900 ml-2">Verify Phone</h1>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-sm mx-auto text-center">
          <div className="w-16 h-16 bg-royal-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
            <Shield className="w-8 h-8 text-royal-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter OTP</h2>
          <p className="text-gray-600 mb-8">
            We've sent a 6-digit code to{' '}
            <span className="font-semibold">+91 {phoneNumber}</span>
          </p>

          {/* OTP Input */}
          <div className="flex justify-center space-x-3 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-royal-500 focus:ring-2 focus:ring-royal-200 transition-all shadow-sm"
                maxLength={1}
              />
            ))}
          </div>

          {/* Timer */}
          <div className="mb-8">
            {timer > 0 ? (
              <p className="text-gray-500">
                Resend OTP in <span className="font-semibold text-royal-600">{timer}s</span>
              </p>
            ) : (
              <button className="text-royal-600 font-semibold hover:text-royal-700 transition-colors">
                Resend OTP
              </button>
            )}
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerifyOTP}
            disabled={otp.join('').length !== 6}
            className={`w-full py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all duration-200 shadow-md ${
              otp.join('').length === 6
                ? 'bg-royal-600 hover:bg-royal-700 active:bg-royal-800 transform active:scale-95'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Verify & Continue
          </button>

          <p className="text-sm text-gray-500 mt-6">
            Didn't receive the code?{' '}
            <button className="text-royal-600 font-medium hover:text-royal-700">
              Try again
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}