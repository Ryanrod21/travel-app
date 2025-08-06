'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc, updateDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            name: userDoc.data().name,
          });
        } else {
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // New function to update bookmarks both locally and in Firestore
  async function updateUserDestinations(newDestinations) {
    if (!user) return;

    const userDocRef = doc(db, 'users', user.uid);
    await updateDoc(userDocRef, { destinations: newDestinations });
    setUser((prev) => ({ ...prev, destinations: newDestinations }));
  }

  return (
    <AuthContext.Provider value={{ user, loading, updateUserDestinations }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy usage in components
export const useAuth = () => useContext(AuthContext);
