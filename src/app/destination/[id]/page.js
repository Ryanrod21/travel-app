'use client';

import { useParams } from 'next/navigation';
import { destinations } from '@/app/dummyData/data';
import { Plane } from 'lucide-react';

export default function DestinationId() {
  const params = useParams(); // ✅ grab params from the hook

  const destination = destinations.find((d) => d.id === params.id);

  if (!destination) {
    return <div>Destination not found</div>;
  }

  return (
    <div className="pt-16 pb-26 min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 text-gray-900">
      <section className="pt-24 pb-16 px-5">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent">
            Your Future Destination for
          </h1>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r">
            {destination.name}, {destination.country}
          </h2>
        </div>
      </section>
      <div className="flex items-center mx-auto justify-center flex-col max-w-7xl py-16">
        <img
          className="object-cover rounded-lg w-410 h-170"
          src={destination.image}
        />
        <div className="flex justify-between items-start mb-3 mt-5 w-full">
          <p className="text-gray-700 text-2xl mb-4">
            {destination.description}
          </p>

          <div className="text-right">
            <span className="text-4xl font-bold text-gray-900">
              ${destination.price.toLocaleString()}
            </span>
            <p className="text-gray-600 text-l">per person</p>
          </div>
        </div>

        <div className="flex justify-between items-center w-full mt-10">
          <div className="mb-4 text-left">
            <h4 className="text-xl font-semibold text-blue-600 mb-2">
              Highlights:
            </h4>
            <div className="flex flex-wrap gap-1">
              {destination.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  variant="outline"
                  className="px-2 py-1 text-l rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium shadow"
                >
                  {highlight}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => router.push(`/destination/${destination.id}`)}
            className="cursor-pointer w-95 h-12  px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-md transition-all flex items-center justify-center"
          >
            <Plane className="h-4 w-4 mr-2" />
            Book Journey
          </button>
        </div>
      </div>
    </div>
  );
}
