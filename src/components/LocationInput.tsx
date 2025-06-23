import React from 'react';
import { MapPin } from 'lucide-react';
import { Location } from '../context/AppContext';

interface LocationInputProps {
  label: string;
  placeholder: string;
  value: Location | null;
  onClick: () => void;
  icon?: React.ReactNode;
}

export default function LocationInput({ 
  label, 
  placeholder, 
  value, 
  onClick, 
  icon = <MapPin className="w-5 h-5 text-gray-400" />
}: LocationInputProps) {
  return (
    <div 
      onClick={onClick}
      className="flex items-center p-4 border border-gray-200 rounded-xl bg-white hover:border-gray-300 transition-colors cursor-pointer"
    >
      <div className="mr-3">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-xs text-gray-500 mb-0.5">{label}</p>
        {value ? (
          <p className="font-medium text-gray-900">{value.name}</p>
        ) : (
          <p className="text-gray-500">{placeholder}</p>
        )}
      </div>
    </div>
  );
} 