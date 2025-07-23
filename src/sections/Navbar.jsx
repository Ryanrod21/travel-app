'use client';

import { Globe, X, Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-blue-200/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              FutureTravel
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#destinations"
              className="hover:text-blue-600 transition-colors text-gray-700"
            >
              Destinations
            </a>
            <a
              href="#map"
              className="hover:text-blue-600 transition-colors text-gray-700"
            >
              Explore
            </a>
            <a
              href="#about"
              className="hover:text-blue-600 transition-colors text-gray-700"
            >
              About
            </a>
            <button className="px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent rounded-md transition-colors">
              Book Now
            </button>
          </div>

          <button
            className="md:hidden px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent rounded-md transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#destinations"
              className="block px-3 py-2 hover:text-blue-600 text-gray-700"
            >
              Destinations
            </a>
            <a
              href="#map"
              className="block px-3 py-2 hover:text-blue-600 text-gray-700"
            >
              Explore
            </a>
            <a
              href="#about"
              className="block px-3 py-2 hover:text-blue-600 text-gray-700"
            >
              About
            </a>
            <button className="w-full mt-2 px-4 py-2 border border-blue-600 text-blue-600 bg-transparent hover:bg-blue-600 hover:text-white rounded-md transition-colors">
              Book Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
