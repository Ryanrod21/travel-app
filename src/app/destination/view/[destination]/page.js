'use client';

import { useEffect, useState } from 'react';
import { Bookmark, Plane, BookmarkMinus, BookmarkCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/authcontext';
import { useParams } from 'next/navigation';

export default function DestinationViewPage() {
  const { destination: destinationParam } = useParams(); // 👈 get it from URL
  const decodedName = decodeURIComponent(destinationParam);

  const [destination, setDestination] = useState(null);
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const { user, loading, updateUserDestinations } = useAuth();
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem('selectedDestination');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.name === decodedName) {
        setDestination(parsed);
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
      setMainImage(data.results[0].urls.regular);
    } catch (error) {
      console.error('Failed to fetch Unsplash images', error);
      setImages([]);
    }
  }

  // Determine if bookmarked:
  const isBookmarked =
    destination && user?.destinations?.some((d) => d.name === destination.name);

  const icon = !isBookmarked
    ? Bookmark
    : hovered
    ? BookmarkMinus
    : BookmarkCheck;

  const label = !isBookmarked
    ? 'Bookmark'
    : hovered
    ? 'Remove Bookmark'
    : 'Bookmarked';

  const Icon = icon;

  async function toggleBookmark() {
    if (!user) {
      alert('You need to be logged in to bookmark destinations.');
      return;
    }

    try {
      let newDestinations;
      if (isBookmarked) {
        // Remove destination
        newDestinations = user.destinations.filter(
          (d) => d.name !== destination.name
        );
      } else {
        // Add destination
        newDestinations = [...(user.destinations || []), destination];
      }

      await updateUserDestinations(newDestinations);

      alert(isBookmarked ? 'Bookmark removed!' : 'Destination bookmarked!');
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      alert('Failed to update bookmark. Try again.');
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
        {mainImage && (
          <img
            className="object-cover rounded-lg w-full h-[800px] mb-6 transition duration-300 shadow-lg"
            src={mainImage}
            alt="Selected destination"
          />
        )}

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mb-10">
          {images.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`Thumbnail ${i}`}
              onClick={() => setMainImage(url)}
              className={`rounded-lg object-cover w-full h-28 cursor-pointer shadow-md hover:scale-105 transition-transform duration-200 ${
                mainImage === url ? 'ring-4 ring-blue-500' : ''
              }`}
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
          <p className="text-gray-700 text-2xl mb-4">{destination.history}</p>
          <p className="text-gray-700 text-2xl mb-4">{destination.sports}</p>
          <p className="text-gray-700 text-2xl mb-4">{destination.travel}</p>
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

          <div className="flex flex-col gap-5">
            <button
              onClick={toggleBookmark}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className={`cursor-pointer w-95 h-12 px-4 py-2 rounded-md transition-all flex items-center justify-center
              ${
                isBookmarked
                  ? 'bg-green-600 hover:bg-red-600 text-white'
                  : 'bg-blue-500 hover:bg-indigo-600 text-white'
              }
              `}
            >
              <Icon className="mr-2" />
              {label}
            </button>

            <button
              onClick={() =>
                router.push(`/checkout/${encodeURIComponent(destination.name)}`)
              }
              className="cursor-pointer w-95 h-12 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-md transition-all flex items-center justify-center"
            >
              <Plane className="h-4 w-4 mr-2" />
              Book Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
