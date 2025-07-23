import { Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-md border-t border-blue-200/50 py-12 px-4 shadow-lg pt-30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Globe className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                FutureTravel
              </span>
            </div>
            <p className="text-gray-600">
              Pioneering the future of interplanetary tourism and extraordinary
              experiences.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Destinations
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Earth Locations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Space Stations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Underwater Cities
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Sky Colonies
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Services
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Space Travel
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Virtual Reality Tours
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Time Travel Packages
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Dimension Hopping
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Contact
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>Galactic Headquarters</li>
              <li>Sector 7, Alpha Centauri</li>
              <li>contact@futuretravel.galaxy</li>
              <li>+1 (555) FUTURE-1</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-8 text-center text-gray-600">
          <p>
            &copy; 2025 FutureTravel. All rights reserved across all dimensions.
          </p>
        </div>
      </div>
    </footer>
  );
}
