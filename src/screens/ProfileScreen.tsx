import React from 'react'
import { 
  User, 
  Phone, 
  Wallet, 
  HelpCircle, 
  Settings, 
  Star, 
  Gift,
  ChevronRight,
  LogOut,
  Shield,
  MapPin
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Header from '../components/Header'
import BottomNavigation from '../components/BottomNavigation'

export default function ProfileScreen() {
  const navigate = useNavigate()
  const { state, dispatch } = useApp()

  const handleLogout = () => {
    dispatch({ type: 'CLEAR_BOOKING' })
    navigate('/')
  }

  const menuItems = [
    {
      icon: Wallet,
      title: 'Wallet',
      subtitle: `₹${state.user?.walletBalance || 0} available`,
      color: 'bg-green-100 text-green-600',
      action: () => {}
    },
    {
      icon: Star,
      title: 'Rate your rides',
      subtitle: 'Help us improve',
      color: 'bg-yellow-100 text-yellow-600',
      action: () => navigate('/rate-driver')
    },
    {
      icon: Gift,
      title: 'Offers & Rewards',
      subtitle: 'Save on your rides',
      color: 'bg-purple-100 text-purple-600',
      action: () => {}
    },
    {
      icon: Shield,
      title: 'Safety Features',
      subtitle: 'Emergency contacts & safety tools',
      color: 'bg-blue-100 text-blue-600',
      action: () => {}
    },
    {
      icon: MapPin,
      title: 'Saved Places',
      subtitle: 'Home, work and other places',
      color: 'bg-red-100 text-red-600',
      action: () => {}
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      subtitle: 'Get help with your rides',
      color: 'bg-orange-100 text-orange-600',
      action: () => {}
    },
    {
      icon: Settings,
      title: 'Settings',
      subtitle: 'Privacy, notifications & more',
      color: 'bg-gray-100 text-gray-600',
      action: () => {}
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
      <Header title="Profile" />

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-royal-600 to-royal-700 px-4 py-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-white">
              {state.user?.name || 'User'}
            </h2>
            <div className="flex items-center space-x-2 mt-1">
              <Phone className="w-4 h-4 text-white/70" />
              <span className="text-white/90">+91 {state.user?.phone}</span>
            </div>
          </div>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ChevronRight className="w-5 h-5 text-white/70" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white mx-4 -mt-4 rounded-xl p-4 shadow-md">
        <div className="grid grid-cols-3 divide-x divide-gray-100">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-sm text-gray-500">Total Rides</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">4.9</p>
            <p className="text-sm text-gray-500">Rating</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-royal-600">₹540</p>
            <p className="text-sm text-gray-500">Saved</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 px-4 py-4">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <button
                key={index}
                onClick={item.action}
                className="w-full flex items-center space-x-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.subtitle}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            )
          })}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full mt-6 bg-white rounded-xl p-4 flex items-center justify-center space-x-2 text-red-600 hover:bg-red-50 transition-colors shadow-md"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>

      <BottomNavigation />
    </div>
  )
}