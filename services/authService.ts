import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { UserProfile } from '../types';

// Convert Firebase User to UserProfile
export const convertFirebaseUser = (firebaseUser: User): UserProfile => {
  return {
    id: firebaseUser.uid,
    email: firebaseUser.email || '',
    name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
    avatar: firebaseUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(firebaseUser.displayName || 'User')}&background=6366f1&color=fff&size=200`,
    plan: 'free', // Default plan
    createdAt: firebaseUser.metadata.creationTime || new Date().toISOString()
  };
};

// Register new user with email and password
export const registerUser = async (
  email: string,
  password: string,
  name: string
): Promise<UserProfile> => {
  try {
    // Create user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Update profile with display name
    await updateProfile(userCredential.user, {
      displayName: name,
      photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff&size=200`
    });

    // Return user profile
    return convertFirebaseUser(userCredential.user);
  } catch (error: any) {
    console.error('Registration error:', error);
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// Login user with email and password
export const loginUser = async (
  email: string,
  password: string
): Promise<UserProfile> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return convertFirebaseUser(userCredential.user);
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// Login with Google
export const loginWithGoogle = async (): Promise<UserProfile> => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return convertFirebaseUser(userCredential.user);
  } catch (error: any) {
    console.error('Google login error:', error);
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// Logout user
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error('Logout error:', error);
    throw new Error('Failed to logout. Please try again.');
  }
};

// Send password reset email
export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    console.error('Password reset error:', error);
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// Listen to auth state changes
export const onAuthStateChange = (callback: (user: UserProfile | null) => void) => {
  return onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      callback(convertFirebaseUser(firebaseUser));
    } else {
      callback(null);
    }
  });
};

// Get current user
export const getCurrentUser = (): UserProfile | null => {
  const firebaseUser = auth.currentUser;
  return firebaseUser ? convertFirebaseUser(firebaseUser) : null;
};

// Helper function to get user-friendly error messages
const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'This email is already registered. Please login instead.';
    case 'auth/invalid-email':
      return 'Invalid email address format.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/user-not-found':
      return 'No account found with this email.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed. Please try again.';
    default:
      return 'An error occurred. Please try again.';
  }
};
