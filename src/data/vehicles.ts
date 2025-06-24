export interface Vehicle {
  id: string;
  type: 'bike' | 'auto' | 'car';
  name: string;
  price: number;
  basePrice: number;
  pricePerKm: number;
  eta: string;
  capacity: number;
  icon: string;
  description: string;
}

export const vehicles: Vehicle[] = [
  {
    id: 'bike-1',
    type: 'bike',
    name: 'Bike',
    price: 45,
    basePrice: 20,
    pricePerKm: 5,
    eta: '3-5',
    capacity: 1,
    icon: '🏍️',
    description: 'Fastest option for solo travelers'
  },
  {
    id: 'auto-1',
    type: 'auto',
    name: 'Auto',
    price: 75,
    basePrice: 30,
    pricePerKm: 9,
    eta: '5-8',
    capacity: 3,
    icon: '🛺',
    description: 'Affordable option for small groups'
  },
  {
    id: 'car-1',
    type: 'car',
    name: 'Car',
    price: 120,
    basePrice: 50,
    pricePerKm: 14,
    eta: '7-10',
    capacity: 4,
    icon: '🚗',
    description: 'Comfortable ride for up to 4 people'
  }
]; 