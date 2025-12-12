import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration - should be moved to environment variables in production
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAjlAtCfQF6NJCGGcLt0xowWLKGrfS7w9c",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "hashgenpro-f9e7f.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "hashgenpro-f9e7f",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "hashgenpro-f9e7f.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "804330129090",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:804330129090:web:498e8fa756a64a1a6ddd5b",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-BLXZVKEBY5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore Database
export const db = getFirestore(app);

// Initialize Analytics (optional, only works in browser)
let analytics = null;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.log('Analytics not available:', error);
  }
}

export { analytics };
export default app;
