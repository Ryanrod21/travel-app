'use client';

import { useState, useRef } from 'react';
import {
  Calendar,
  MapPin,
  Navigation,
  Plane,
  Search,
  Users,
} from 'lucide-react';
import Card from '@/component/Card';
import SearchBall from '@/component/SearchBall';

export default function Home() {
  const [location, setLocation] = useState('');
  const [prompt, setPrompt] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'searching' | 'done'
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const resultRef = useRef(null);

  const handleSearch = async () => {
    resultRef.current?.scrollIntoView({ behavior: 'smooth' });

    if (!prompt.trim()) return;

    setStatus('searching');
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/generate-destinations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, location }),
      });

      const data = await res.json();
      if (res.ok) {
        setDestinations(data.destinations);
        setStatus('done');
      } else {
        setError(data.error || 'Something went wrong');
        setStatus('idle');
      }
    } catch (err) {
      setError('Request failed');
      console.error(err);
      setStatus('idle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 pb-26 min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 text-gray-900">
      <section className="pt-24 pb-16 px-5">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent">
            Travel Beyond Reality
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-3xl mx-auto">
            Embark on extraordinary journeys to destinations that exist beyond
            imagination. The future of travel is here.
          </p>

          <div className="w-full max-w-3xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl p-4 md:p-3 border border-blue-200 shadow-lg">
            <div className="flex flex-col md:flex-row items-center md:space-x-3 space-y-2 md:space-y-0">
              {/* From Location */}
              <div className="flex-1 flex items-center space-x-2 px-3 py-2 border-b md:border-none border-gray-300 w-full  bg-white">
                <MapPin className="h-5 w-5 text-blue-600" />
                <input
                  placeholder="Where are you traveling from?"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="border-0 bg-transparent text-gray-900 placeholder-gray-500 focus:ring-0 w-full"
                />
              </div>

              {/* Destination */}
              <div className="flex-1 flex items-center space-x-2 px-3 py-2 md:border-l border-gray-300 w-full  bg-white">
                <Plane className="h-5 w-5 text-blue-600" />
                <input
                  placeholder="Where do you want to explore?"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="border-0 bg-transparent text-gray-900 placeholder-gray-500 focus:ring-0 w-full"
                />
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="mt-2 md:mt-0 px-6 py-2 md:px-8 md:py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 rounded-full text-white flex items-center justify-center transition-all w-full md:w-auto"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={resultRef}
        id="map"
        className={` px-4 ${status === 'done' ? 'hidden' : ''}`}
      >
        <div className="max-w-7xl mx-auto">
          {(status === 'idle' || status === 'searching') && (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Explore The Universe
              </h2>

              <div className="relative h-96 bg-gradient-to-br from-blue-100/80 to-indigo-100/80 rounded-2xl border border-blue-300/50 overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

                <div className="relative z-10 h-full flex items-center justify-center">
                  <div className="text-center">
                    <Navigation
                      className={`h-16 w-16 text-blue-600 mx-auto mb-4 z-999 ${
                        status === 'searching' ? 'animate-nav-move' : 'none'
                      }`}
                    />
                    <h3
                      className={`text-center text-2xl text-blue-600 z-999 ${
                        status === 'searching' ? 'animate-pulse' : 'none'
                      }`}
                    >
                      {status === 'searching'
                        ? 'Searching for Destinations...'
                        : 'Interactive Galactic Map'}
                    </h3>
                    <p className="text-gray-600 z-999">
                      {status === 'searching'
                        ? 'Hold tight while we scan the stars...'
                        : 'Use The Search Bar above to find your destination...'}
                    </p>

                    {status === 'searching' && <SearchBall />}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Destination Results */}
      <section className={`px-4 ${status === 'idle' ? 'hidden' : ''}`}>
        <div className="max-w-7xl mx-auto">
          {status === 'done' && (
            <h2 className="text-3xl md:text-4l font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Your Destination awaits for you
            </h2>
          )}
          {error && <p className="text-center text-red-500">{error}</p>}

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {status === 'done' &&
              destinations.map((destination, index) => (
                <Card
                  key={index}
                  area={[destination]}
                  className="bg-white/80 backdrop-blur-md border border-blue-200/50 hover:border-blue-400/70 transition-all duration-300 hover:scale-105 group overflow-hidden shadow-lg hover:shadow-xl"
                />
              ))}
          </div>
          {!loading && prompt && destinations.length === 0 && (
            <p className="text-center text-2xl text-gray-500 mt-10">
              There are no destinations for this location at the moment.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
