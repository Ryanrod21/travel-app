'use client';

import { useState } from 'react';
import { ArrowRight, LockKeyhole, Mail } from 'lucide-react';
import BouncingBall from '@/component/BouncingBallPage';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useRouter } from 'next/navigation';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in both email and password.');
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 pb-26 min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 text-gray-900">
      <div className="pt-24 pb-16 px-5">
        <BouncingBall />
        <div className="max-w-2xl mx-auto text-center bg-white border border-black-500 rounded pt-16">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent pb-16">
            Log In
          </h1>
          <form
            className="max-w-7xl flex flex-col justify-center items-center gap-5"
            onSubmit={handleLogin}
          >
            <div className="flex flex-col text-center justify-center ">
              <label
                className="flex text-2xl justify-start items-center gap-4"
                htmlFor="email"
              >
                Enter Email <Mail />
              </label>
              <input
                className="max-w-sm text-2xl border border-black-500 rounded"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col text-center justify-center">
              <label
                className="flex text-2xl justify-start items-center gap-4 "
                htmlFor="password"
              >
                Enter Password <LockKeyhole />
              </label>
              <input
                className="max-w-sm text-2xl border border-black-500 rounded"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-red-600 text-lg font-semibold">{error}</p>
            )}

            <div className="max-w-7xl flex justify-center pb-16">
              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer flex px-4 py-1 border border-black-500 text-2xl justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-md transition-all"
              >
                {loading ? 'Logging in...' : 'Log In'} <ArrowRight />
              </button>
            </div>

            <p className="text-sm text-center text-gray-600 mt-4">
              Don’t have an account?
              <a
                href="/register"
                className="text-blue-600 hover:underline font-medium ml-1"
              >
                Create account
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
