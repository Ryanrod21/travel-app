// firebase/auth.js
import { auth } from './firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

// Sign up a new user
export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Log in an existing user
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Log out the user
export const logoutUser = () => {
  return signOut(auth);
};

// Listen for auth state changes (login/logout)
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};
