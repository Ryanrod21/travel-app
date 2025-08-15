'use client';

import { useEffect, useState } from 'react';
import { Bookmark, Plane, BookmarkMinus, BookmarkCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/authcontext';
import { useParams } from 'next/navigation';

export default function DestinationViewPage() {
  const { destination: destinationParam } = useParams(); // 👈 get it from URL
  const decodedName = decodeURIComponent(destinationParam);
  const { user, loading, updateUserDestinations } = useAuth();

  const [destination, setDestination] = useState(null);
  const [destinationImages, setDestinationImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);

  const [images, setImages] = useState([]);
  const [mainFoodImage, setMainFoodImage] = useState(null);

  const [hotelImage, setHotelImage] = useState([]);
  const [mainHotelImage, setMainHotelImage] = useState(null);

  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  // 👇 ADD THESE TWO FUNCTIONS RIGHT HERE
  async function fetchDestinationImage(query) {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          query
        )}&per_page=5&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
      );

      const data = await res.json();
      if (data.results?.length > 0) {
        setMainImage(data.results[0].urls.regular); // first image as main
        setDestinationImages(data.results.map((img) => img.urls.regular)); // all for thumbnails
      } else {
        console.warn('No destination images found');
      }
    } catch (error) {
      console.error('Error fetching destination image:', error);
    }
  }

  async function fetchFoodImages(query) {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          query + ' food'
        )}&per_page=5&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
      );

      const data = await res.json();
      if (data.results?.length > 0) {
        const urls = data.results.map((img) => img.urls.regular);
        setImages(urls);
        setMainFoodImage(urls[0]); // ← this sets the first food image as the main
      } else {
        console.warn('No food images found');
      }
    } catch (error) {
      console.error('Error fetching food images:', error);
    }
  }

  async function fetchHotelImages(query) {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          query + ' hotel'
        )}&per_page=5&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
      );

      const data = await res.json();
      if (data.results?.length > 0) {
        const urls = data.results.map((img) => img.urls.regular);
        setHotelImage(urls);
        setMainHotelImage(urls[0]); // ← this sets the first food image as the main
      } else {
        console.warn('No food images found');
      }
    } catch (error) {
      console.error('Error fetching food images:', error);
    }
  }

  // 👇 Then your useEffect comes after
  useEffect(() => {
    const saved = localStorage.getItem('selectedDestination');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.name === decodedName) {
        setDestination(parsed);
        fetchDestinationImage(parsed.name); // Get destination image
        fetchFoodImages(parsed.name); // Get food images
        fetchHotelImages(parsed.name);
      }
    }
  }, [decodedName]);

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
    } catch (error) {
      console.error('Error toggling bookmark:', error);
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
            className="object-cover rounded-lg max-w-[320px] md:max-w-[1200px] h-[200px] md:h-[700px] w-full mb-6 transition duration-300 shadow-lg"
            src={mainImage}
            alt="Selected destination"
          />
        )}

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mb-10">
          {destinationImages.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`Destination Image ${i}`}
              onClick={() => setMainImage(url)}
              className={`rounded-lg object-cover max-w-[90px] md:max-w-[200px] w-full h-16 md:h-28 cursor-pointer  shadow-md hover:scale-105 transition-transform duration-200  ${
                mainImage === url ? 'ring-4 ring-blue-500' : ''
              }`}
            />
          ))}
        </div>

        <h3 className="text-3xl font-bold text-left mb-4 text-blue-700">
          Popular Local Foods
        </h3>

        {mainFoodImage && (
          <img
            className="object-cover rounded-lg max-w-[320px] md:max-w-[1200px] h-[200px] md:h-[700px] w-full mb-6 transition duration-300 shadow-lg"
            src={mainFoodImage}
            alt="Selected Food"
          />
        )}

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mb-10">
          {images.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`Food ${i}`}
              onClick={() => setMainFoodImage(url)}
              className={`rounded-lg object-cover max-w-[90px] md:max-w-[200px] w-full h-16 md:h-28 cursor-pointer  shadow-md hover:scale-105 transition-transform duration-200 ${
                mainFoodImage === url ? 'ring-4 ring-blue-500' : ''
              }`}
            />
          ))}
        </div>
        <p className="text-gray-700 text-2xl mb-4 text-center">
          {destination.food}
        </p>

        <h3 className="text-3xl font-bold text-left mb-6 text-blue-700">
          Local Hotels
        </h3>

        {mainHotelImage && (
          <img
            className="object-cover rounded-lg max-w-[320px] md:max-w-[1200px] h-[200px] md:h-[700px] w-full mb-6 transition duration-300 shadow-lg"
            src={mainHotelImage}
            alt="Selected Hotel"
          />
        )}

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mb-10">
          {hotelImage.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`Hotel ${i}`}
              onClick={() => setMainHotelImage(url)}
              className={`rounded-lg object-cover max-w-[90px] md:max-w-[200px] w-full h-16 md:h-28 cursor-pointer  shadow-md hover:scale-105 transition-transform duration-200  ${
                mainHotelImage === url ? 'ring-4 ring-blue-500' : ''
              }`}
            />
          ))}
        </div>
        <p className="text-gray-700 text-2xl mb-6 text-center">
          {destination.hotel}
        </p>

        <div className="flex flex-col justify-between items-start mb-3 mt-5 w-full text-center">
          <h3 className="text-3xl font-bold text-center md:text-left mb-4 text-blue-700 w-full">
            More about {destination.name}
          </h3>
          <p className="text-gray-700 text-2xl mb-4">
            {destination.description}
          </p>
          <p className="text-gray-700 text-2xl mb-4">
            {destination.activities}
          </p>
          <p className="text-gray-700 text-2xl mb-4">{destination.history}</p>
          <p className="text-gray-700 text-2xl mb-4">{destination.sports}</p>
        </div>

        <div className="flex flex-col justify-between items-start mb-3 mt-5 w-full text-center">
          <h3 className="text-3xl font-bold md:text-left mb-4 text-blue-700 w-full text-center">
            Flight Time
          </h3>
          <p className="text-gray-700 text-2xl mb-4">{destination.travel}</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center w-full mt-10">
          <div className="mb-4 text-left">
            <h4 className="text-xl font-semibold text-blue-600 mb-2 text-center md:text-left">
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
            {user && (
              <button
                onClick={toggleBookmark}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className={`w-full md:w-96 h-12 px-4 py-2 rounded-md transition-all flex items-center justify-center
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
            )}

            {!user && (
              <button
                onClick={() => router.push('/register')}
                className={`w-full md:w-96 h-12 px-4 py-2 rounded-md transition-all flex items-center justify-center
        ${
          isBookmarked
            ? 'bg-green-600 hover:bg-red-600 text-white'
            : 'bg-blue-500 hover:bg-indigo-600 text-white'
        }
      `}
              >
                <Icon className="mr-2" />
                Register Now to Save Your Trips !!!
              </button>
            )}

            <button
              onClick={() =>
                router.push(`/checkout/${encodeURIComponent(destination.name)}`)
              }
              className="w-full md:w-96 h-12 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-md transition-all flex items-center justify-center"
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
