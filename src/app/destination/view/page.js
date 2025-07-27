'use client';

import { useEffect, useState } from 'react';
import { Plane } from 'lucide-react';

export default function DestinationViewPage() {
  const [destination, setDestination] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('selectedDestination');
    if (saved) {
      const parsed = JSON.parse(saved);
      setDestination(parsed);

      // 🔍 Fetch multiple Unsplash images
      fetchUnsplashImages(parsed.name);
    }
  }, []);

  async function fetchUnsplashImages(query) {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          query
        )}&per_page=5&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
      );

      if (!res.ok) {
        console.error('Unsplash API returned error status:', res.status);
        setImages([]);
        return;
      }

      const data = await res.json();

      if (!data.results) {
        console.error('No results field in Unsplash response:', data);
        setImages([]);
        return;
      }

      setImages(data.results.map((img) => img.urls.regular));
    } catch (error) {
      console.error('Failed to fetch Unsplash images', error);
      setImages([]);
    }
  }

  if (!destination) return <div>Loading...</div>;

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
          className="object-cover rounded-lg w-410 h-170 mb-6"
          src={destination.image}
        />

        {/* 🖼️ Show Unsplash Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {images.map((url, i) => (
            <img
              key={i}
              src={url}
              alt="Destination"
              className="rounded-lg object-cover w-full h-60 shadow-md"
            />
          ))}
        </div>

        <div className="flex flex-col justify-between items-start mb-3 mt-5 w-full">
          <p className="text-gray-700 text-2xl mb-4">
            {destination.description}
          </p>
          <p className="text-gray-700 text-2xl mb-4">{destination.food}</p>
          <p className="text-gray-700 text-2xl mb-4">
            {destination.activities}
          </p>
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
                  className="px-2 py-1 text-l rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium shadow"
                >
                  {highlight}
                </div>
              ))}
            </div>
          </div>

          <button className="cursor-pointer w-95 h-12 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-md transition-all flex items-center justify-center">
            <Plane className="h-4 w-4 mr-2" />
            Book Journey
          </button>
        </div>
      </div>
    </div>
  );
}
