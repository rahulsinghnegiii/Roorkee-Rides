import React, { createContext, useContext, useReducer, ReactNode } from 'react'

interface User {
  id: string
  name: string
  phone: string
  walletBalance: number
}

interface Location {
  id: string
  name: string
  address: string
  coordinates: { lat: number; lng: number }
}

interface Vehicle {
  id: string
  type: 'auto' | 'bike' | 'car'
  name: string
  price: number
  eta: string
  capacity: number
  icon: string
}

interface Driver {
  id: string
  name: string
  phone: string
  rating: number
  vehicleNumber: string
  vehicleType: string
  photo: string
}

interface Ride {
  id: string
  pickup: Location
  drop: Location
  vehicle: Vehicle
  driver: Driver
  status: 'upcoming' | 'completed' | 'cancelled'
  fare: number
  date: string
  time: string
}

interface AppState {
  user: User | null
  currentBooking: {
    pickup: Location | null
    drop: Location | null
    selectedVehicle: Vehicle | null
    driver: Driver | null
  }
  rides: Ride[]
  recentLocations: Location[]
}

type AppAction = 
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_PICKUP'; payload: Location }
  | { type: 'SET_DROP'; payload: Location }
  | { type: 'SELECT_VEHICLE'; payload: Vehicle }
  | { type: 'ASSIGN_DRIVER'; payload: Driver }
  | { type: 'ADD_RIDE'; payload: Ride }
  | { type: 'CLEAR_BOOKING' }

const initialState: AppState = {
  user: null,
  currentBooking: {
    pickup: null,
    drop: null,
    selectedVehicle: null,
    driver: null,
  },
  rides: [],
  recentLocations: [
    {
      id: '1',
      name: 'IIT Roorkee',
      address: 'Indian Institute of Technology, Roorkee',
      coordinates: { lat: 29.8543, lng: 77.8880 }
    },
    {
      id: '2',
      name: 'Roorkee Railway Station',
      address: 'Railway Station Road, Roorkee',
      coordinates: { lat: 29.8519, lng: 77.8881 }
    },
    {
      id: '3',
      name: 'Civil Lines',
      address: 'Civil Lines, Roorkee',
      coordinates: { lat: 29.8601, lng: 77.8878 }
    },
    {
      id: '4',
      name: 'Malviya Chowk',
      address: 'Malviya Chowk, Roorkee',
      coordinates: { lat: 29.8547, lng: 77.8901 }
    }
  ]
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'SET_PICKUP':
      return {
        ...state,
        currentBooking: { ...state.currentBooking, pickup: action.payload }
      }
    case 'SET_DROP':
      return {
        ...state,
        currentBooking: { ...state.currentBooking, drop: action.payload }
      }
    case 'SELECT_VEHICLE':
      return {
        ...state,
        currentBooking: { ...state.currentBooking, selectedVehicle: action.payload }
      }
    case 'ASSIGN_DRIVER':
      return {
        ...state,
        currentBooking: { ...state.currentBooking, driver: action.payload }
      }
    case 'ADD_RIDE':
      return {
        ...state,
        rides: [action.payload, ...state.rides]
      }
    case 'CLEAR_BOOKING':
      return {
        ...state,
        currentBooking: {
          pickup: null,
          drop: null,
          selectedVehicle: null,
          driver: null,
        }
      }
    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}