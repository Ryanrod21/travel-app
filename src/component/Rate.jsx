'use client';

import { useState } from 'react';

export default function DestinationRating({ destination, onRate }) {
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(destination.rating || null);

  const ratingEmojis = {
    sad: { emoji: '😞', color: 'text-red-600' },
    neutral: { emoji: '😐', color: 'text-yellow-500' },
    happy: { emoji: '😄', color: 'text-green-600' },
  };

  const handleRate = (value) => {
    setRating(value);
    setShowRating(false);
    if (onRate) onRate(value);
  };

  return (
    <div className="mt-6 text-center">
      {!showRating && !rating && (
        <button
          onClick={() => setShowRating(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Rate this trip
        </button>
      )}

      {showRating && (
        <div className="flex justify-center space-x-6 mt-4 text-4xl cursor-pointer">
          {Object.entries(ratingEmojis).map(([key, { emoji, color }]) => (
            <span
              key={key}
              role="img"
              aria-label={`${key} face`}
              className={`${color} hover:scale-125 transition-transform`}
              onClick={() => handleRate(key)}
            >
              {emoji}
            </span>
          ))}
        </div>
      )}

      {rating && (
        <div className="mt-4 text-center">
          <span
            role="img"
            aria-label={`${rating} face`}
            className={`text-6xl ${ratingEmojis[rating].color}`}
          >
            {ratingEmojis[rating].emoji}
          </span>
          <p className="mt-2 text-lg font-semibold">
            Thanks for rating: <span className="capitalize">{rating}</span>
          </p>
          <button
            className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
            onClick={() => {
              setRating(null);
              setShowRating(false);
              if (onRate) onRate(null); // Optionally clear rating
            }}
          >
            Rate again
          </button>
        </div>
      )}
    </div>
  );
}
