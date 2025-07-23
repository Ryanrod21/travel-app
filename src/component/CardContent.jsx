'use client';

import React from 'react';
import { Plane } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CardContent({ area }) {
  const router = useRouter();

  return (
    <>
      {area.map((destination, index) => (
        <React.Fragment key={destination.id || index}>
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {destination.name}
              </h3>
              <p className="text-blue-600 text-sm">{destination.country}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-gray-900">
                ${destination.price.toLocaleString()}
              </span>
              <p className="text-gray-600 text-sm">per person</p>
            </div>
          </div>

          <p className="text-gray-700 text-sm mb-4">
            {destination.description}
          </p>

          <div className="mb-4">
            <h4 className="text-sm font-semibold text-blue-600 mb-2">
              Highlights:
            </h4>
            <div className="flex flex-wrap gap-1">
              {destination.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  variant="outline"
                  className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium shadow"
                >
                  {highlight}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => router.push(`/destination/${destination.id}`)}
            className="cursor-pointer w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-md transition-all flex items-center justify-center"
          >
            <Plane className="h-4 w-4 mr-2" />
            Book Journey
          </button>
        </React.Fragment>
      ))}
    </>
  );
}
