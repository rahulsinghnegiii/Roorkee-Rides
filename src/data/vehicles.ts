import { Vehicle } from '../context/AppContext';

export const vehicles: Vehicle[] = [
  {
    id: 'bike-1',
    type: 'bike',
    name: 'Bike',
    price: 45,
    eta: '3-5',
    capacity: 1,
    icon: '🏍️'
  },
  {
    id: 'auto-1',
    type: 'auto',
    name: 'Auto',
    price: 75,
    eta: '5-8',
    capacity: 3,
    icon: '🛺'
  },
  {
    id: 'car-1',
    type: 'car',
    name: 'Car',
    price: 120,
    eta: '7-10',
    capacity: 4,
    icon: '🚗'
  }
]; 