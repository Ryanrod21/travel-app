'use client';

import { useAuth } from '@/app/context/authcontext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase/firebaseConfig';

export default function BookmarksPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [destinations, setDestinations] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      if (user?.uid) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setDestinations(data.destinations || []);
        }
      }
      setFetching(false);
    };

    fetchDestinations();
  }, [user?.uid]);

  if (loading || fetching)
    return <p className="p-8 text-xl">Loading your bookmarks...</p>;

  if (!user) {
    router.push('/log-in');
    return null;
  }

  const handleBookJourney = (destination) => {
    localStorage.setItem('selectedDestination', JSON.stringify(destination));
    router.push(`/destination/view/${encodeURIComponent(destination.name)}`);
  };

  return (
    <div className="min-h-screen pt-20 px-6 bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50">
      <div className="pt-24 pb-16 px-5">
        <h1 className="text-4xl font-bold mb-10 text-center text-blue-700">
          Your Bookmarked Destinations
        </h1>

        {destinations.length === 0 ? (
          <p className="text-center text-lg text-gray-600">No bookmarks yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                {destination.image && (
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-blue-600">
                    {destination.name}, {destination.country}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                    {destination.description || 'No description available.'}
                  </p>
                  <button
                    onClick={() => handleBookJourney(destination)}
                    className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    Book Journey
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
