import { Calendar, MapPin, Navigation, Search, Users } from 'lucide-react';
import Card from '@/component/Card';
import React from 'react';

const destinations = [
  {
    id: '1',
    name: 'Neo Tokyo',
    country: 'Japan',
    image: '/placeholder.svg?height=300&width=400',
    price: 2499,
    rating: 4.9,
    duration: '7 days',
    description:
      'Experience the cyberpunk future in the neon-lit streets of Neo Tokyo',
    highlights: ['Shibuya Crossing', 'Robot Restaurant', 'Digital Art Museum'],
  },
  {
    id: '2',
    name: 'Mars Colony Alpha',
    country: 'Mars',
    image: '/placeholder.svg?height=300&width=400',
    price: 15999,
    rating: 4.8,
    duration: '14 days',
    description:
      'Pioneer the ultimate space tourism experience on the Red Planet',
    highlights: ['Olympus Mons', 'Polar Ice Caps', 'Underground Cities'],
  },
  {
    id: '3',
    name: 'Atlantis Resort',
    country: 'Pacific Ocean',
    image: '/placeholder.svg?height=300&width=400',
    price: 4299,
    rating: 4.7,
    duration: '10 days',
    description: 'Dive into luxury at our underwater paradise resort',
    highlights: ['Coral Gardens', 'Submarine Tours', 'Aquatic Spa'],
  },
  {
    id: '4',
    name: 'Sky City',
    country: 'Cloud Nine',
    image: '/placeholder.svg?height=300&width=400',
    price: 3799,
    rating: 4.9,
    duration: '5 days',
    description: 'Float among the clouds in our revolutionary aerial city',
    highlights: ['Cloud Walking', 'Sky Gardens', 'Aurora Views'],
  },
  {
    id: '5',
    name: 'Cyber Singapore',
    country: 'Singapore',
    image: '/placeholder.svg?height=300&width=400',
    price: 1899,
    rating: 4.6,
    duration: '6 days',
    description: 'Explore the smart city of tomorrow with AI-guided tours',
    highlights: ['Gardens by the Bay', 'Marina Bay', 'Sentosa Island'],
  },
  {
    id: '6',
    name: 'Arctic Aurora',
    country: 'Norway',
    image: '/placeholder.svg?height=300&width=400',
    price: 2799,
    rating: 4.8,
    duration: '8 days',
    description: 'Witness the Northern Lights in our luxury ice hotels',
    highlights: ['Northern Lights', 'Ice Hotels', 'Husky Sledding'],
  },
];

export default function Home() {
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

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-md rounded-full p-2 border border-blue-300/50 shadow-xl">
            <div className="flex items-center space-x-4">
              <div className="flex-1 flex items-center space-x-2 px-4">
                <MapPin className="h-5 w-5 text-blue-600" />
                {/* <Input /> was here but don't have component or don't if need */}
                <input
                  placeholder="Where do you want to explore?"
                  className="border-0 bg-transparent text-gray-900 placeholder-gray-500 focus:ring-0 w-full"
                ></input>
              </div>

              <div className="flex items-center space-x-2 px-4 border-l border-gray-300">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">Dates</span>
              </div>

              <div className="flex items-center space-x-2 px-4 border-l border-gray-300">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">Travelers</span>
              </div>

              <button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 rounded-full px-8 py-2 text-white transition-all">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="map" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Explore The Universe
          </h2>

          <div className="relative h-96 bg-gradient-to-br from-blue-100/80 to-indigo-100/80 rounded-2xl border border-blue-300/50 overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="text-center">
                <Navigation className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-pulse" />
                <h3 className="text-2xl font-bold mb-2 text-gray-800">
                  Interactive Galactic Map
                </h3>
                <p className="text-gray-600">
                  Click on destinations to explore different worlds
                </p>

                {/* Floating destination markers */}
                <div className="absolute top-1/4 left-1/4 animate-bounce">
                  <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"></div>
                </div>
                <div className="absolute top-1/3 right-1/3 animate-bounce delay-300">
                  <div className="w-4 h-4 bg-sky-500 rounded-full shadow-lg shadow-sky-500/50"></div>
                </div>
                <div className="absolute bottom-1/4 left-1/2 animate-bounce delay-700">
                  <div className="w-4 h-4 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section id="destinations" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4l font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Featured Destinations
          </h2>

          <div className="grid gird-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <Card
                key={destination.id}
                area={[destination]}
                className="bg-white/80 backdrop-blur-md border border-blue-200/50 hover:border-blue-400/70 transition-all duration-300 hover:scale-105 group overflow-hidden shadow-lg hover:shadow-xl"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
