'use client';

import { Globe, X, Menu, User, Bookmark } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/app/context/authcontext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const router = useRouter();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-lg">Checking sign-in status...</p>
    );
  }
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

            {user && (
              <button
                onClick={() => router.push('/bookmark')}
                className="hover:text-blue-600 transition-colors text-gray-700 cursor-pointer"
              >
                <Bookmark />
              </button>
            )}

            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center gap-4 ">
                {user && (
                  <>
                    <p className="text-center text-lg text-blue-600">
                      Welcome back, {user.name}!
                    </p>
                    <button
                      className="hover:text-blue-600 transition-colors text-gray-700 cursor-pointer"
                      onClick={() => setDropdown(!dropdown)}
                      aria-label="User menu"
                    >
                      <User />
                    </button>
                  </>
                )}
                {!user && (
                  <button
                    className="hover:text-blue-600 transition-colors text-gray-700 cursor-pointer"
                    onClick={() => setDropdown(!dropdown)}
                    aria-label="User menu"
                  >
                    <User />
                  </button>
                )}
              </div>

              {dropdown && (
                <div className="absolute left-0 top-5 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-10">
                  {!user && (
                    <a
                      href="/log-in"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Login
                    </a>
                  )}
                  {user && (
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </a>
                  )}
                </div>
              )}
            </div>
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
