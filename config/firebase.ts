import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
// These are public API keys - safe to expose in frontend
// Security is enforced by Firebase Security Rules
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAjlAtCfQF6NJCGGcLt0xowWLKGrfS7w9c",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "hashgenpro-f9e7f.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "hashgenpro-f9e7f",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "hashgenpro-f9e7f.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "804330129090",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:804330129090:web:b50dcd8ca1f5852c6ddd5b",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-RNP281S01T"
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
