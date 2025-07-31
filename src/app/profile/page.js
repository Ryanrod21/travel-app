'use client';

import { useAuth } from '../context/authcontext';

export default function Profile() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p className="p-8 text-xl">Loading your profile...</p>;
  }

  return (
    <div className="pt-16 pb-26 min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 text-gray-900">
      <div className="pt-24 pb-16 px-5">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl pb-5 md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent">
            Welcome to your profile <br></br> {user.name}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-3xl mx-auto">
            Embark on extraordinary journeys to destinations that exist beyond
            imagination. The future of travel is here.
          </p>
        </div>
      </div>
    </div>
  );
}
