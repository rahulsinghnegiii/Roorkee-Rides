import { Location } from '../context/AppContext';

export interface RideData {
  id: string;
  pickup: Location;
  drop: Location;
  vehicleType: 'bike' | 'auto' | 'car';
  driverName: string;
  driverPhoto: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  fare: number;
  date: string;
  time: string;
  driverRating?: number;
}

export const pastRides: RideData[] = [
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
    vehicleType: 'car',
    driverName: 'Rajesh Kumar',
    driverPhoto: '👨‍🦱',
    status: 'completed',
    fare: 120,
    date: '2023-06-15',
    time: '14:30',
    driverRating: 5
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
    vehicleType: 'auto',
    driverName: 'Amit Singh',
    driverPhoto: '👨',
    status: 'completed',
    fare: 85,
    date: '2023-06-12',
    time: '09:15',
    driverRating: 4
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
    vehicleType: 'bike',
    driverName: 'Priya Sharma',
    driverPhoto: '👩',
    status: 'cancelled',
    fare: 0,
    date: '2023-06-10',
    time: '18:45',
    driverRating: undefined
  }
];

export const upcomingRides: RideData[] = [
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
    vehicleType: 'car',
    driverName: 'Vikram Patel',
    driverPhoto: '👨‍🦲',
    status: 'upcoming',
    fare: 130,
    date: '2023-06-25',
    time: '10:00',
    driverRating: undefined
  }
]; 