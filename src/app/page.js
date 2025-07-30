'use client';

import { useState, useRef } from 'react';
import { Calendar, MapPin, Navigation, Search, Users } from 'lucide-react';
import Card from '@/component/Card';

export default function Home() {
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
        body: JSON.stringify({ prompt }),
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
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-5">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent">
            Travel Beyond Reality
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-3xl mx-auto">
            Embark on extraordinary journeys to destinations that exist beyond
            imagination. The future of travel is here.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-md rounded-full p-2 border border-blue-300/50 shadow-xl">
            <div className="flex items-center space-x-4">
              <div className="flex-1 flex items-center space-x-2 px-4">
                <MapPin className="h-5 w-5 text-blue-600" />
                <input
                  placeholder="Where do you want to explore?"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault(); // optional, stops default form behavior
                      handleSearch(); // calls your async search function
                    }
                  }}
                  className="border-0 bg-transparent text-gray-900 placeholder-gray-500 focus:ring-0 w-full"
                />
              </div>

              <div className="flex items-center space-x-2 px-4 border-l border-gray-300">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">Dates</span>
              </div>

              <div className="flex items-center space-x-2 px-4 border-l border-gray-300">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">Travelers</span>
              </div>

              <button
                onClick={handleSearch}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 rounded-full px-8 py-2 text-white transition-all"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
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
                      className={`h-16 w-16 text-blue-600 mx-auto mb-4 ${
                        status === 'searching'
                          ? 'animate-nav-move'
                          : 'animate-pulse'
                      }`}
                    />
                    <h3 className="text-center text-2xl text-blue-600 animate-pulse">
                      {status === 'searching'
                        ? 'Searching for Destinations...'
                        : 'Interactive Galactic Map'}
                    </h3>
                    <p className="text-gray-600">
                      {status === 'searching'
                        ? 'Hold tight while we scan the stars...'
                        : 'Use The Search Bar above to find your destination...'}
                    </p>

                    {/* Bouncing Dots (extra if searching) */}

                    {status === 'searching' && (
                      <>
                        <div className="absolute top-1/4 left-1/4 animate-bounce">
                          <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"></div>
                        </div>
                        <div className="absolute bottom-1/4 right-1/13 animate-bounce">
                          <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"></div>
                        </div>
                        <div className="absolute top-1/3 right-1/3 animate-bounce delay-300">
                          <div className="w-4 h-4 bg-sky-500 rounded-full shadow-lg shadow-sky-500/50"></div>
                        </div>
                        <div className="absolute top-1/13 left-1/13 animate-bounce delay-300">
                          <div className="w-4 h-4 bg-sky-500 rounded-full shadow-lg shadow-sky-500/50"></div>
                        </div>
                        <div className="absolute top-1/8 right-1/6 animate-bounce delay-700">
                          <div className="w-4 h-4 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50"></div>
                        </div>
                        <div className="absolute bottom-1/2 left-1/16 animate-bounce delay-700">
                          <div className="w-4 h-4 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50"></div>
                        </div>
                        <div className="absolute top-2/3 left-[26%] animate-bounce delay-200">
                          <div className="w-4 h-4 bg-pink-400 rounded-full shadow-lg shadow-pink-400/50"></div>
                        </div>
                        <div className="absolute top-[40%] right-[20%] animate-bounce delay-200">
                          <div className="w-4 h-4 bg-pink-400 rounded-full shadow-lg shadow-pink-400/50"></div>
                        </div>
                        <div className="absolute bottom-1/3 right-1/4 animate-bounce delay-[450ms]">
                          <div className="w-4 h-4 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50"></div>
                        </div>
                        <div className="absolute top-1/2 left-[19%] animate-bounce delay-[450ms]">
                          <div className="w-4 h-4 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50"></div>
                        </div>
                        <div className="absolute bottom-[10%] right-[30%] animate-bounce delay-[600ms]">
                          <div className="w-4 h-4 bg-green-400 rounded-full shadow-lg shadow-green-400/50"></div>
                        </div>
                        <div className="absolute bottom-[20%] left-[10%] animate-bounce delay-[600ms]">
                          <div className="w-4 h-4 bg-green-400 rounded-full shadow-lg shadow-green-400/50"></div>
                        </div>
                      </>
                    )}
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
