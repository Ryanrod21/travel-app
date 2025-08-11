'use client';

import { useAuth } from '@/app/context/authcontext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebase/firebaseConfig';
import { Plane, Map, Trash2 } from 'lucide-react';

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

  const removeDestination = async (destinationToRemove) => {
    if (!user?.uid) return;

    const updatedDestinations = destinations.filter(
      (dest) => dest.name !== destinationToRemove.name
    );

    // Update Firestore
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      destinations: updatedDestinations,
    });

    // Update local state
    setDestinations(updatedDestinations);
  };

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

                  <div className="mt-4 flex gap-2">
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
                    <button
                      onClick={() => removeDestination(destination)}
                      className="bg-red-500 text-white cursor-pointer px-4 py-2 rounded hover:bg-red-600 transition flex items-center justify-center"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
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
