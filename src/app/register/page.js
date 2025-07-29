'use client';

import { useState } from 'react';
import { ArrowRight, KeyRound, Mail, User } from 'lucide-react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import BouncingBall from '@/component/BouncingBallPage';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPass) {
      setError("Passwords don't match");
      return;
    }

    if (!name || !email || !password) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user info in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        createdAt: new Date(),
        destinations: [], // initialize empty array for storing destinations
      });

      alert('Registration successful! You can now log in.');
      // optionally redirect user or clear form here
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
            Register Today!
          </h1>

          <form
            className="max-w-7xl flex flex-col justify-center items-center gap-5"
            onSubmit={handleRegister}
          >
            <div className="flex flex-col text-center justify-center ">
              <label className="flex text-2xl justify-start items-center gap-4">
                Name <User />
              </label>
              <input
                className="max-w-sm text-2xl border border-black-500 rounded placeholder:text-xl px-2"
                id="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col text-center justify-center ">
              <label
                className="flex text-2xl justify-start items-center gap-4"
                htmlFor="email"
              >
                Create Email <Mail />
              </label>
              <input
                className="max-w-sm text-2xl border border-black-500 rounded placeholder:text-xl px-2"
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
                Create Password <KeyRound />
              </label>
              <input
                className="max-w-sm text-2xl border border-black-500 rounded placeholder:text-xl px-2"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col text-center justify-center">
              <label
                className="flex text-2xl justify-start items-center gap-4 "
                htmlFor="confirmPassword"
              >
                Confirm Password <KeyRound />
              </label>
              <input
                className="max-w-sm text-2xl border border-black-500 rounded placeholder:text-xl px-2"
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
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
                {loading ? 'Registering...' : 'Register'} <ArrowRight />
              </button>
            </div>

            <p className="text-sm text-center text-gray-600 mt-4">
              Have an account?
              <a
                href="/log-in"
                className="text-blue-600 hover:underline font-medium ml-1"
              >
                Log In
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
