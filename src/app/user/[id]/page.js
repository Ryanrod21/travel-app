'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/authcontext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebase/firebaseConfig';
import DestinationRatings from '@/component/Rate';

export default function UserProfile() {
  const { user, loading } = useAuth();
  const [recentDestination, setRecentDestination] = useState([]);

  useEffect(() => {
    const fetchRecentDestination = async () => {
      if (user?.uid) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          console.log('User data from Firestore:', data); // 👈 Check this
          setRecentDestination(data.recentDestinations || null);
        }
      }
    };

    fetchRecentDestination();
  }, [user?.uid]);

  const removedDestination = async (destinationToRemove) => {
    if (!user?.uid) return;

    const updateRecentDestinations = recentDestination.filter(
      (dest) => dest.name !== destinationToRemove.name
    );

    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      recentDestination: updateRecentDestinations,
    });

    setRecentDestination(updateRecentDestinations);
  };

  // Function to update rating locally and in Firestore
  const updateRating = async (destIndex, rating) => {
    // Clone the array to avoid direct mutation
    const updatedDestinations = [...recentDestination];

    // Add/update rating property on the specific destination
    updatedDestinations[destIndex] = {
      ...updatedDestinations[destIndex],
      rating,
    };

    // Update state immediately for UI feedback
    setRecentDestination(updatedDestinations);

    // Update Firestore
    if (user?.uid) {
      const userRef = doc(db, 'users', user.uid);
      try {
        await updateDoc(userRef, { recentDestinations: updatedDestinations });
      } catch (error) {
        console.error('Failed to update rating in Firestore:', error);
      }
    }
  };

  if (loading) {
    return <p className="p-8 text-xl">Loading your profile...</p>;
  }

  return (
    <div className="min-h-screen pt-20 px-6 bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 text-gray-900">
      <div className="pt-24 pb-16 px-5">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-10 text-center text-blue-700">
            Welcome to your profile <br /> {user.name}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-3xl mx-auto">
            Embark on extraordinary journeys to destinations that exist beyond
            imagination. The future of travel is here.
          </p>
        </div>

        {recentDestination.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentDestination.map((dest, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                {dest.image && (
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-blue-600">
                    {dest.name}, {dest.country}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                    {dest.description || 'No description available.'}
                  </p>
                  {/* You can add buttons here if needed */}
                </div>
                <div className="p-4">
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => removedDestination(dest)}
                      className="bg-red-500 text-white cursor-pointer px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                  <DestinationRatings
                    key={index}
                    destination={dest}
                    onRate={(rating) => updateRating(index, rating)}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-8 text-gray-600">
            No recent destination found.
          </p>
        )}
      </div>
    </div>
  );
}
