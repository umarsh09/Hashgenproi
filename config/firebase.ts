import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjlAtCfQF6NJCGGcLt0xowWLKGrfS7w9c",
  authDomain: "hashgenpro-f9e7f.firebaseapp.com",
  projectId: "hashgenpro-f9e7f",
  storageBucket: "hashgenpro-f9e7f.firebasestorage.app",
  messagingSenderId: "804330129090",
  appId: "1:804330129090:web:498e8fa756a64a1a6ddd5b",
  measurementId: "G-BLXZVKEBY5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

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
