import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification,
  onAuthStateChanged,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
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

// Save user profile to Firestore
const saveUserProfile = async (uid: string, profile: UserProfile): Promise<void> => {
  try {
    await setDoc(doc(db, 'users', uid), {
      uid: profile.id,
      fullName: profile.name,
      email: profile.email,
      avatar: profile.avatar,
      plan: profile.plan,
      createdAt: profile.createdAt
    });
  } catch (error: any) {
    console.error('Error saving user profile:', error);
    throw new Error('Failed to save user profile');
  }
};

// Get user profile from Firestore
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: data.uid,
        name: data.fullName,
        email: data.email,
        avatar: data.avatar,
        plan: data.plan,
        createdAt: data.createdAt
      };
    }
    return null;
  } catch (error: any) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

// Register new user with email and password
export const registerUser = async (
  email: string,
  password: string,
  name: string
): Promise<UserProfile> => {
  try {
    const normalizedEmail = email.trim();
    const trimmedName = name.trim();

    // Create user account
    const userCredential = await createUserWithEmailAndPassword(auth, normalizedEmail, password.trim());

    // Update profile with display name
    await updateProfile(userCredential.user, {
      displayName: trimmedName,
      photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(trimmedName)}&background=6366f1&color=fff&size=200`
    });

    // Send email verification
    try {
      await sendEmailVerification(userCredential.user, {
        url: window.location.origin,
        handleCodeInApp: false
      });
    } catch (verificationError) {
      // Don't throw - allow user to continue even if verification email fails
    }

    // Create user profile object
    const userProfile: UserProfile = {
      id: userCredential.user.uid,
      name: trimmedName,
      email: normalizedEmail,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(trimmedName)}&background=6366f1&color=fff&size=200`,
      plan: 'free',
      createdAt: new Date().toISOString()
    };

    // Save profile to Firestore
    await saveUserProfile(userCredential.user.uid, userProfile);

    // Return user profile
    return userProfile;
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
    const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password.trim());
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
    const user = userCredential.user;

    // Check if user profile exists in Firestore
    let userProfile = await getUserProfile(user.uid);

    // If not, create it (first time Google login)
    if (!userProfile) {
      userProfile = {
        id: user.uid,
        name: user.displayName || user.email?.split('@')[0] || 'User',
        email: user.email || '',
        avatar: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=6366f1&color=fff&size=200`,
        plan: 'free',
        createdAt: new Date().toISOString()
      };
      await saveUserProfile(user.uid, userProfile);
    }

    return userProfile;
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
    await sendPasswordResetEmail(auth, email.trim());
  } catch (error: any) {
    console.error('Password reset error:', error);
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// Resend verification email
export const resendVerificationEmail = async (): Promise<void> => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('No user is currently signed in');
    }

    if (user.emailVerified) {
      throw new Error('Email is already verified');
    }

    await sendEmailVerification(user, {
      url: window.location.origin,
      handleCodeInApp: false
    });
  } catch (error: any) {
    console.error('Resend verification error:', error);
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// Check if current user's email is verified
export const isEmailVerified = (): boolean => {
  const user = auth.currentUser;
  return user ? user.emailVerified : false;
};

// Reload user to get updated verification status
export const reloadUser = async (): Promise<boolean> => {
  try {
    const user = auth.currentUser;
    if (user) {
      await user.reload();
      return user.emailVerified;
    }
    return false;
  } catch (error: any) {
    console.error('Reload user error:', error);
    return false;
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

// Update user password
export const updateUserPassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
  try {
    const user = auth.currentUser;
    if (!user || !user.email) {
      throw new Error('No user is currently signed in');
    }

    // Reauthenticate user with current password
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);

    // Update password
    await updatePassword(user, newPassword);
    return true;
  } catch (error: any) {
    console.error('Password update error:', error);
    if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
      return false;
    }
    throw new Error(getAuthErrorMessage(error.code));
  }
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
