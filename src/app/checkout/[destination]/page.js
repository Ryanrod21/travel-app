'use client';

import React, { useEffect, useState } from 'react';

export default function Checkout({ params }) {
  const { destination } = React.use(params); // ✅ correct usage going forward

  const [selectedDestination, setSelectedDestination] = useState(null);
  const [images, setImages] = useState([]);

  const decodedName = decodeURIComponent(destination);

  useEffect(() => {
    const saved = localStorage.getItem('selectedDestination');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.name === decodedName) {
        setSelectedDestination(parsed);
        fetchUnsplashImages(decodedName);
      }
    }
  }, [decodedName]);

  async function fetchUnsplashImages(query) {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          query
        )}&per_page=5&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
      );

      const data = await res.json();
      setImages(data.results?.map((img) => img.urls.regular) || []);
    } catch (error) {
      console.error('Failed to fetch Unsplash images', error);
      setImages([]);
    }
  }

  if (!selectedDestination) return <div>Loading...</div>;

  return (
    <div className="pt-16 pb-26 min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 text-gray-900">
      <section className="pt-24 pb-16 px-5">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent">
            Your are one step away for your futrue Destination
          </h1>
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            {selectedDestination.name}, {selectedDestination.country}
          </h2>
        </div>
      </section>
    </div>
  );
}
