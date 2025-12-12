# 🔐 Firebase Authentication Setup Guide

## Overview

This project includes a **production-ready authentication system** powered by Firebase Authentication and Firestore. All features are fully implemented and ready to use.

## Features Implemented

✅ **Email & Password Authentication**
- Email validation with proper error messages
- Password strength indicator (Weak/Good/Strong)
- Minimum 6 character password requirement

✅ **Password Confirmation**
- Real-time validation on registration
- Clear error messages when passwords don't match

✅ **Password Visibility Toggle**
- Eye icon to show/hide password
- Works on both password and confirm password fields

✅ **Remember Me Functionality**
- Checkbox on login page
- Stores user email in localStorage for convenience

✅ **Google Authentication**
- One-click Google sign-in
- Automatic profile creation in Firestore

✅ **Firestore Integration**
- User profiles saved on registration
- Schema: `uid`, `fullName`, `email`, `avatar`, `plan`, `createdAt`
- Automatic profile retrieval on login

✅ **Reusable Components**
- `Input` component with icons, validation, and password toggle
- `Button` component with variants and loading states
- TypeScript typed for type safety

✅ **Protected Routes**
- `ProtectedRoute` component wrapper
- `withProtectedRoute` HOC pattern
- Automatic redirect on unauthorized access

✅ **Auth Context & Hooks**
- `useAuth()` - Access auth state anywhere
- `useRequireAuth()` - Ensure user is authenticated
- `AuthProvider` for global state management

✅ **Environment Variables**
- Firebase config uses environment variables
- Fallback to hardcoded values for development
- `.env.example` provided for setup

## Project Structure

```
├── components/
│   ├── AuthNew.tsx           # Complete auth UI (Login + Register)
│   ├── Input.tsx             # Reusable input with validation
│   ├── Button.tsx            # Reusable button with variants
│   └── ProtectedRoute.tsx    # Route protection HOC
├── contexts/
│   └── AuthContext.tsx       # Global auth state management
├── services/
│   └── authService.ts        # Firebase auth logic + Firestore
├── config/
│   └── firebase.ts           # Firebase initialization
└── .env.example              # Environment variables template
```

## Setup Instructions

### 1. Install Dependencies

The required Firebase packages are already installed:

```bash
npm install
```

Dependencies:
- `firebase@^12.6.0` - Firebase SDK

### 2. Configure Environment Variables (Optional)

For production, use environment variables:

```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your Firebase credentials
```

Get your Firebase config from:
https://console.firebase.google.com/ → Project Settings → Your Apps

### 3. Firebase Console Setup

#### Enable Authentication Methods

1. Go to Firebase Console → **Authentication** → **Sign-in method**
2. Enable:
   - **Email/Password**
   - **Google** (optional, but recommended)

#### Set up Firestore Database

1. Go to Firebase Console → **Firestore Database**
2. Click **Create database**
3. Choose **Start in production mode** or **Test mode**
4. Select a location closest to your users

#### Security Rules (Recommended)

Add these Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 4. Run the Application

```bash
npm run dev
```

Visit http://localhost:5173

## Usage Examples

### Basic Auth Flow

The app already uses the authentication system. Users can:

1. **Register** → Enter name, email, password, confirm password → Account created
2. **Login** → Enter email, password → Access dashboard
3. **Google Login** → One-click authentication
4. **Logout** → Click logout button in sidebar/navbar

### Using the Auth Context

```typescript
import { useAuth, useRequireAuth } from './contexts/AuthContext';

function MyComponent() {
  const { user, loading, logout } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Not logged in</div>;

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Protected Routes

Wrap any component to require authentication:

```typescript
import { ProtectedRoute } from './components/ProtectedRoute';

function Dashboard() {
  return <div>Dashboard content</div>;
}

// Wrap in protected route
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>

// Or use HOC pattern
const ProtectedDashboard = withProtectedRoute(Dashboard);
```

### Using Auth Services Directly

```typescript
import {
  registerUser,
  loginUser,
  loginWithGoogle,
  logoutUser,
  getUserProfile
} from './services/authService';

// Register
const user = await registerUser('email@example.com', 'password123', 'John Doe');

// Login
const user = await loginUser('email@example.com', 'password123');

// Google login
const user = await loginWithGoogle();

// Get user profile from Firestore
const profile = await getUserProfile(uid);

// Logout
await logoutUser();
```

### Custom Input Component

```typescript
import { Input } from './components/Input';

<Input
  label="Email Address"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  icon="✉️"
  placeholder="you@example.com"
  error={!!errors.email}
  errorMessage={errors.email}
/>

// With password toggle
<Input
  label="Password"
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  icon="🔒"
  showPasswordToggle={true}
  error={!!errors.password}
  errorMessage={errors.password}
/>
```

### Custom Button Component

```typescript
import { Button } from './components/Button';

// Primary button
<Button type="submit" loading={loading} fullWidth>
  Sign In
</Button>

// Secondary button
<Button variant="secondary" onClick={handleClick}>
  Cancel
</Button>

// Outline button
<Button variant="outline" icon={<GoogleIcon />} iconPosition="left">
  Continue with Google
</Button>
```

## Firestore Data Structure

User profiles are stored in Firestore under `users/{uid}`:

```typescript
{
  uid: string;           // Firebase Auth UID
  fullName: string;      // User's full name
  email: string;         // User's email
  avatar: string;        // Avatar URL (auto-generated)
  plan: 'free' | 'pro' | 'business';  // Subscription plan
  createdAt: string;     // ISO timestamp
}
```

## Features Breakdown

### Password Strength Indicator

Shows real-time feedback during registration:
- **Red (Weak)**: < 6 characters
- **Yellow (Good)**: 6-7 characters
- **Green (Strong)**: 8+ characters

### Remember Me

When checked on login:
- Stores user email in `localStorage`
- Can be used to pre-fill email field on return
- Currently stores: `rememberMe` and `userEmail`

### Error Handling

All auth errors are caught and displayed with user-friendly messages:

| Firebase Error | User Message |
|----------------|-------------|
| `auth/email-already-in-use` | This email is already registered |
| `auth/invalid-email` | Invalid email address format |
| `auth/weak-password` | Password should be at least 6 characters |
| `auth/user-not-found` | No account found with this email |
| `auth/wrong-password` | Incorrect password |
| `auth/too-many-requests` | Too many failed attempts |

### Loading States

All buttons show a loading spinner during:
- Registration
- Login
- Google authentication
- Logout

### Form Validation

Real-time validation with clear error messages:
- Email format validation
- Password length check
- Password confirmation match
- Required field validation

## Security Best Practices

✅ **Implemented:**
- Firebase Authentication for secure login
- Firestore security rules (see setup section)
- Environment variables for sensitive config
- Password strength requirements
- Email validation
- HTTPS-only in production (automatic with Firebase)

⚠️ **Additional Recommendations:**
- Enable email verification (optional)
- Add reCAPTCHA for bot protection
- Implement rate limiting
- Add 2FA for sensitive accounts
- Regular security audits

## Customization

### Change Theme Colors

Edit Tailwind classes in `AuthNew.tsx`:

```typescript
// Current: Indigo/Purple gradient
className="bg-gradient-to-r from-indigo-600 to-purple-600"

// Change to: Blue/Cyan gradient
className="bg-gradient-to-r from-blue-600 to-cyan-600"
```

### Add More Auth Providers

In `authService.ts`, add new providers:

```typescript
import { FacebookAuthProvider, TwitterAuthProvider } from 'firebase/auth';

export const loginWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  // ... handle profile
};
```

### Modify User Profile Fields

Update both:
1. Firestore document in `authService.ts` (`saveUserProfile`)
2. TypeScript type in `types.ts` (`UserProfile`)

## Troubleshooting

### Issue: "Firebase app not initialized"
**Solution:** Check that `config/firebase.ts` is imported before use

### Issue: "User profile not saved to Firestore"
**Solution:** Ensure Firestore is enabled in Firebase Console and security rules allow writes

### Issue: Google sign-in popup blocked
**Solution:** Enable popups in browser or use redirect flow

### Issue: Environment variables not loading
**Solution:** Restart dev server after creating `.env` file

### Issue: "auth/configuration-not-found"
**Solution:** Enable the authentication method in Firebase Console

## Testing

Manual test checklist:

- [ ] Register with email/password
- [ ] Login with registered credentials
- [ ] Check Firestore for user profile
- [ ] Test password visibility toggle
- [ ] Test password confirmation validation
- [ ] Test Remember Me checkbox
- [ ] Login with Google
- [ ] Test logout functionality
- [ ] Test protected route access
- [ ] Test error messages (wrong password, etc.)

## API Reference

### Auth Context

```typescript
const { user, loading, logout } = useAuth();
```

- `user`: Current user profile or `null`
- `loading`: `true` while checking auth state
- `logout`: Function to sign out

### Auth Service

```typescript
registerUser(email: string, password: string, name: string): Promise<UserProfile>
loginUser(email: string, password: string): Promise<UserProfile>
loginWithGoogle(): Promise<UserProfile>
logoutUser(): Promise<void>
getUserProfile(uid: string): Promise<UserProfile | null>
onAuthStateChange(callback: (user: UserProfile | null) => void): Unsubscribe
```

## Production Deployment

Before deploying:

1. ✅ Set up environment variables on your hosting platform
2. ✅ Configure Firebase security rules
3. ✅ Enable only required auth providers
4. ✅ Set up proper error logging
5. ✅ Test all auth flows in production environment
6. ✅ Add email verification (optional but recommended)

## Support

For Firebase-specific issues:
- Firebase Documentation: https://firebase.google.com/docs
- Firebase Console: https://console.firebase.google.com/

For project-specific issues:
- Check this README
- Review code comments
- Test with Firebase Console logs

---

## Summary

You now have a **complete, production-ready authentication system** with:

- Beautiful UI with animations
- Email/Password + Google login
- Firestore user profiles
- Password confirmation & visibility toggle
- Remember Me functionality
- Reusable components
- Protected routes
- Global auth context
- TypeScript types
- Error handling
- Loading states

Everything is ready to use. Just enable the auth providers in Firebase Console and start authenticating users!
