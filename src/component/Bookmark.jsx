import { Bookmark, BookmarkCheck, BookmarkMinus } from 'lucide-react';
import { useState } from 'react';

export default function BookmarkButton({ isBookmarked, toggleBookmark }) {
  const [hovered, setHovered] = useState(false);

  return (
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
      {isBookmarked ? (
        hovered ? (
          <BookmarkMinus className="mr-2" />
        ) : (
          <BookmarkCheck className="mr-2" />
        )
      ) : (
        <Bookmark className="mr-2" />
      )}

      {isBookmarked ? (hovered ? 'Remove Bookmark' : 'Bookmarked') : 'Bookmark'}
    </button>
  );
}
