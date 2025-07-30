import { Star } from 'lucide-react';
import CardContent from './CardContent';
import React from 'react';

export default function Card({ area, className = '', location }) {
  return (
    <>
      {area.map((destination, index) => (
        <div
          key={destination.id || index}
          className={`rounded-lg overflow-hidden shadow-md bg-white ${className}`}
        >
          {/* Image Section */}
          <div className="relative">
            <img
              src={destination.image || '/placeholder.svg'}
              alt={destination.name}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute top-4 right-4">
              {/* <div className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium shadow">
                {destination.duration}
              </div> */}
            </div>
            <div className="absolute bottom-4 left-4 flex items-center space-x-1">
              {/* <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-white font-semibold drop-shadow-lg">
                {destination.rating}
              </span> */}
            </div>
          </div>

          <div className="p-4">
            <CardContent area={[destination]} />
          </div>
        </div>
      ))}
    </>
  );
}
