// firebase/firestore.js
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { app } from './firebaseConfig'; // Import your initialized Firebase app

// Initialize Firestore
export const db = getFirestore(app);

// Helper example: Add a destination
export const addDestination = async (userId, destinationData) => {
  return await addDoc(collection(db, 'destinations'), {
    userId,
    ...destinationData,
    createdAt: new Date(),
  });
};

// Helper example: Get destinations for a user
export const getUserDestinations = async (userId) => {
  const q = query(
    collection(db, 'destinations'),
    where('userId', '==', userId)
  );
  const querySnapshot = await getDocs(q);
  let destinations = [];
  querySnapshot.forEach((doc) => {
    destinations.push({ id: doc.id, ...doc.data() });
  });
  return destinations;
};

// You can add more helpers like updateDestination, deleteDestination, etc.
