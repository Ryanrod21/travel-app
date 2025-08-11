'use client';

import { useState, useEffect } from 'react';
import { Map, Plane } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ExplorePage() {
  const [topDestinations, setTopDestinations] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch top 10 destinations on mount
  useEffect(() => {
    const fetchTop = async () => {
      setLoading(true);
      setError('');

      try {
        const res = await fetch('/api/generate-destinations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ top10: true }), // Make sure this matches your API
        });

        const raw = await res.text();
        console.log('[API] raw response text:', raw);

        let data;
        try {
          data = JSON.parse(raw);
        } catch (parseErr) {
          throw new Error('Invalid JSON from API: ' + parseErr.message);
        }

        if (!res.ok) {
          throw new Error(data?.error || `API error: ${res.status}`);
        }

        const destinations = data.destinations || data.destination || data;
        if (!Array.isArray(destinations)) {
          throw new Error('API did not return an array of destinations');
        }

        setTopDestinations(destinations);
      } catch (err) {
        console.error('FetchTopDestinations error:', err);
        setError(err.message || 'Request failed');
      } finally {
        setLoading(false);
      }
    };

    fetchTop();
  }, []);

  const handleBookJourney = (destination) => {
    localStorage.setItem('selectedDestination', JSON.stringify(destination));
    router.push(`/destination/view/${encodeURIComponent(destination.name)}`);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-blue-700 text-xl font-semibold">
        Loading top destinations...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl font-semibold">
        Error: {error}
      </div>
    );

  return (
    <div className="min-h-screen pt-20 px-6 bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50">
      <div className="pt-24 pb-16 px-5">
        <h1 className="text-4xl font-bold mb-10 text-center text-blue-700">
          Top Destinations
        </h1>

        {topDestinations.length === 0 ? (
          <p className="text-center text-lg text-gray-600">
            No destinations found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topDestinations.map((destination, idx) => (
              <div
                key={destination.id || idx}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                {destination.image ? (
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-blue-600">
                    {destination.name}
                    {destination.country ? `, ${destination.country}` : ''}
                  </h2>

                  <p className="text-gray-700 text-sm mb-4">
                    {destination.description || 'No description available.'}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-blue-600 mb-2">
                      Highlights:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {destination.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium shadow"
                        >
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2 w-full">
                    <button
                      onClick={() => handleBookJourney(destination)}
                      className="cursor-pointer px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-md transition-all flex items-center justify-center"
                    >
                      <Map className="h-4 w-4 mr-2" />
                      Visit Journey
                    </button>
                    <button
                      onClick={() =>
                        router.push(
                          `/checkout/${encodeURIComponent(destination.name)}`
                        )
                      }
                      className="cursor-pointer px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-md transition-all flex items-center justify-center"
                    >
                      <Plane className="h-4 w-4 mr-2" />
                      Book Journey
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
