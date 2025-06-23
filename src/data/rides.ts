import { Location, Vehicle, Driver, Ride } from '../context/AppContext';
import { vehicles } from './vehicles';
import { drivers } from './drivers';

export interface Ride {
  id: string;
  pickup: Location;
  drop: Location;
  vehicle: Vehicle;
  driver: Driver;
  status: 'upcoming' | 'completed' | 'cancelled';
  fare: number;
  date: string;
  time: string;
}

export const pastRides: Ride[] = [
  {
    id: 'ride-1',
    pickup: {
      id: '1',
      name: 'IIT Roorkee',
      address: 'Indian Institute of Technology, Roorkee',
      coordinates: { lat: 29.8543, lng: 77.8880 }
    },
    drop: {
      id: '2',
      name: 'Roorkee Railway Station',
      address: 'Railway Station Road, Roorkee',
      coordinates: { lat: 29.8519, lng: 77.8881 }
    },
    vehicle: vehicles.find(v => v.type === 'car') || vehicles[0],
    driver: {
      id: 'driver-1',
      name: 'Rajesh Kumar',
      phone: '+91 9876543210',
      rating: 4.8,
      vehicleNumber: 'UK 07 AB 1234',
      vehicleType: 'car',
      photo: '👨‍🦱',
      totalRides: 543,
      experience: '3 years'
    },
    status: 'completed',
    fare: 120,
    date: '2023-06-15',
    time: '14:30'
  },
  {
    id: 'ride-2',
    pickup: {
      id: '3',
      name: 'Civil Lines',
      address: 'Civil Lines, Roorkee',
      coordinates: { lat: 29.8601, lng: 77.8878 }
    },
    drop: {
      id: '1',
      name: 'IIT Roorkee',
      address: 'Indian Institute of Technology, Roorkee',
      coordinates: { lat: 29.8543, lng: 77.8880 }
    },
    vehicle: vehicles.find(v => v.type === 'auto') || vehicles[1],
    driver: {
      id: 'driver-2',
      name: 'Amit Singh',
      phone: '+91 9876543211',
      rating: 4.5,
      vehicleNumber: 'UK 07 CD 5678',
      vehicleType: 'auto',
      photo: '👨',
      totalRides: 321,
      experience: '2 years'
    },
    status: 'completed',
    fare: 85,
    date: '2023-06-12',
    time: '09:15'
  },
  {
    id: 'ride-3',
    pickup: {
      id: '2',
      name: 'Roorkee Railway Station',
      address: 'Railway Station Road, Roorkee',
      coordinates: { lat: 29.8519, lng: 77.8881 }
    },
    drop: {
      id: '4',
      name: 'Malviya Chowk',
      address: 'Malviya Chowk, Roorkee',
      coordinates: { lat: 29.8547, lng: 77.8901 }
    },
    vehicle: vehicles.find(v => v.type === 'bike') || vehicles[2],
    driver: {
      id: 'driver-3',
      name: 'Priya Sharma',
      phone: '+91 9876543212',
      rating: 4.7,
      vehicleNumber: 'UK 07 EF 9012',
      vehicleType: 'bike',
      photo: '👩',
      totalRides: 198,
      experience: '1 year'
    },
    status: 'cancelled',
    fare: 0,
    date: '2023-06-10',
    time: '18:45'
  }
];

export const upcomingRides: Ride[] = [
  {
    id: 'ride-4',
    pickup: {
      id: '1',
      name: 'IIT Roorkee',
      address: 'Indian Institute of Technology, Roorkee',
      coordinates: { lat: 29.8543, lng: 77.8880 }
    },
    drop: {
      id: '3',
      name: 'Civil Lines',
      address: 'Civil Lines, Roorkee',
      coordinates: { lat: 29.8601, lng: 77.8878 }
    },
    vehicle: vehicles.find(v => v.type === 'car') || vehicles[0],
    driver: {
      id: 'driver-4',
      name: 'Vikram Patel',
      phone: '+91 9876543213',
      rating: 4.9,
      vehicleNumber: 'UK 07 GH 3456',
      vehicleType: 'car',
      photo: '👨‍🦲',
      totalRides: 412,
      experience: '2.5 years'
    },
    status: 'upcoming',
    fare: 130,
    date: '2023-06-25',
    time: '10:00'
  }
]; 