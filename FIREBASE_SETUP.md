# Firebase Configuration Guide 🔥

## Overview
HashGenPro uses Firebase for authentication and database services.

---

## Current Setup ✅

### 1. **Email Verification Type**
- ✅ **Link-based verification** (NOT SMS)
- Users receive email with clickable verification link
- No phone number required
- Configured in `services/authService.ts`

```typescript
await sendEmailVerification(userCredential.user, {
  url: window.location.origin,
  handleCodeInApp: false  // ← This means LINK verification, not SMS!
});
```

### 2. **Firebase Services Enabled**
- ✅ Authentication (Email/Password, Google OAuth)
- ✅ Firestore Database (User profiles)
- ✅ Analytics (Optional)

---

## Firebase Console Settings Required 📋

### Step 1: Enable Email/Password Authentication
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **hashgenpro-f9e7f**
3. Navigate to **Authentication** → **Sign-in method**
4. Enable **Email/Password** provider
5. Enable **Google** provider (for Google Sign-In)

### Step 2: Configure Email Templates
1. In Firebase Console → **Authentication** → **Templates**
2. Customize **Email verification** template:
   - Subject: "Verify your email for HashGenPro"
   - Body: Include clear instructions and brand logo
   - Action URL: `https://hashgenpro.com` (or your domain)

### Step 3: Authorized Domains
1. Go to **Authentication** → **Settings** → **Authorized domains**
2. Add your domains:
   - `localhost` (for development)
   - `hashgenpro.com` (production)
   - Your Vercel domain (e.g., `hashgenpro.vercel.app`)

### Step 4: Firestore Database Rules
1. Go to **Firestore Database** → **Rules**
2. Set up security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own profile
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## Email Verification Flow 📧

### How it works:
1. **User signs up** → Account created
2. **Firebase sends email** → Automatic (link-based)
3. **User clicks link in email** → Redirects to Firebase auth page
4. **Email verified** → User can reload app
5. **User continues** → Full access

### Code Implementation:
```typescript
// On signup (authService.ts)
const userCredential = await createUserWithEmailAndPassword(auth, email, password);

// Send verification email with LINK (not SMS)
await sendEmailVerification(userCredential.user, {
  url: window.location.origin,      // Where to redirect after verification
  handleCodeInApp: false             // Link verification (not in-app code)
});
```

---

## Configuration Values 🔑

### Current Firebase Config:
```typescript
{
  apiKey: "AIzaSyAjlAtCfQF6NJCGGcLt0xowWLKGrfS7w9c",
  authDomain: "hashgenpro-f9e7f.firebaseapp.com",
  projectId: "hashgenpro-f9e7f",
  storageBucket: "hashgenpro-f9e7f.firebasestorage.app",
  messagingSenderId: "804330129090",
  appId: "1:804330129090:web:b50dcd8ca1f5852c6ddd5b",
  measurementId: "G-RNP281S01T"
}
```

**Note:** These are **public API keys** and safe to expose in frontend. Security is enforced by Firebase Security Rules on the backend.

---

## Email Verification vs SMS ℹ️

### Link-based (Current - ✅):
- User gets email with link
- Clicks link → Email verified
- No phone number needed
- Free with Firebase

### SMS-based (NOT used - ❌):
- Would require phone number
- Sends verification code via SMS
- Requires Firebase Phone Auth
- Costs money per SMS

**HashGenPro uses LINK-based verification!** No SMS needed.

---

## Testing Email Verification 🧪

### Local Development:
1. Start dev server: `npm run dev`
2. Sign up with real email address
3. Check email inbox
4. Click verification link
5. Return to app and continue

### Production:
1. Deploy to Vercel/hosting
2. Add domain to Firebase authorized domains
3. Test with real email
4. Verify email templates are branded

---

## Troubleshooting 🔧

### "Email not sending"
- ✅ Check Firebase Console → Authentication → Templates
- ✅ Verify email provider is enabled
- ✅ Check spam folder
- ✅ Verify domain is authorized

### "Verification link not working"
- ✅ Check authorized domains in Firebase
- ✅ Verify `url` in sendEmailVerification config
- ✅ Check console for errors

### "User can't login after verification"
- ✅ User needs to reload the page
- ✅ Call `await user.reload()` to refresh status
- ✅ Check `user.emailVerified` status

---

## Security Best Practices 🔒

1. **Never disable email verification** (optional but recommended)
2. **Use Firebase Security Rules** to protect Firestore
3. **Validate user input** on frontend and backend
4. **Keep API keys in environment variables** for production
5. **Monitor Firebase Console** for suspicious activity

---

## Environment Variables (Optional) 📝

For production, you can use environment variables:

```env
VITE_FIREBASE_API_KEY=AIzaSyAjlAtCfQF6NJCGGcLt0xowWLKGrfS7w9c
VITE_FIREBASE_AUTH_DOMAIN=hashgenpro-f9e7f.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=hashgenpro-f9e7f
VITE_FIREBASE_STORAGE_BUCKET=hashgenpro-f9e7f.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=804330129090
VITE_FIREBASE_APP_ID=1:804330129090:web:b50dcd8ca1f5852c6ddd5b
VITE_FIREBASE_MEASUREMENT_ID=G-RNP281S01T
```

---

## Summary ✨

✅ Email verification is **LINK-based** (not SMS)
✅ Users get email with clickable link
✅ No phone number required
✅ Free with Firebase
✅ Fully configured and working

**No changes needed!** The current setup is correct and production-ready.
