'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/authcontext';
import { db } from '@/app/firebase/firebaseConfig';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import { Plane } from 'lucide-react';

export default function Checkout() {
  const { user, loading } = useAuth();

  const { checkoutDestination } = useParams();
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [images, setImages] = useState([]);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const decodedName = decodeURIComponent(checkoutDestination);

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

  async function handleCheckout() {
    if (!user || !selectedDestination) return;

    setSaving(true);
    setConfirmed(true);

    try {
      setSaving(true);

      const userDocRef = doc(db, 'users', user.uid);

      await updateDoc(userDocRef, {
        recentDestinations: arrayUnion({
          ...selectedDestination,
          timestamp: new Date().toISOString(),
        }),
      });

      // Wait before showing success message
      setTimeout(() => {
        setSuccess(true);
        setSaving(false);
      }, 1800); // 1.8 seconds delay
    } catch (error) {
      console.error('Error saving to Firestore:', error);
    } finally {
      setSaving(false);
    }
  }

  if (loading || !selectedDestination)
    return <div className="p-8">Loading...</div>;

  return (
    <div className="pt-16 pb-26 min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 text-gray-900">
      <section className="pt-24 pb-16 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent">
            Checkout Destination
          </h1>
          <h2 className="text-3xl md:text-4xl mb-4">
            {selectedDestination.name}, {selectedDestination.country}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Confirm your destination and we’ll save it for your future
            adventures!
          </p>

          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mb-8">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={selectedDestination.name}
                  className="rounded-lg shadow-md w-full h-48 object-cover"
                />
              ))}
            </div>
          )}

          <div className="flex justify-center items-center space-x-3">
            {!confirmed && (
              <button
                onClick={handleCheckout}
                disabled={saving}
                className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
              >
                Confirm Checkout
              </button>
            )}

            {confirmed && !success && (
              <Plane className="h-8 w-8 text-blue-600 animate-pulse-left-to-right" />
            )}

            {success && (
              <p className="mt-4 text-green-600 font-medium">
                Destination saved to your recent trips!
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
