# HashGenPro - Website Architecture & Diagram

## 🏗️ Site Structure Overview

### Landing Page (Public)
```
┌─────────────────────────────────────────┐
│         Landing Page (/)                 │
│  - Hero Section                          │
│  - "Start for Free" Button              │
│  - "See Pricing" Button                 │
│  - Features Overview                     │
│  - Social Platform Icons                │
│  - FAQ Section                           │
└─────────────────────────────────────────┘
           │
           ├──► Auth Page (Login/Signup)
           │    └──► Guest Mode Option
           │
           └──► Pricing Page
```

## 📊 User Flow Diagram

### Authentication Flow
```
User Visits Website
    │
    ├──► Clicks "Start for Free"
    │       │
    │       ├──► Not Logged In
    │       │       │
    │       │       └──► Auth Page
    │       │               │
    │       │               ├──► Login (Email/Password)
    │       │               ├──► Signup (New Account)
    │       │               ├──► Google Sign-In
    │       │               └──► Continue as Guest
    │       │                       │
    │       │                       └──► Dashboard (Limited Features)
    │       │
    │       └──► Already Logged In
    │               │
    │               └──► Dashboard (Full Access)
    │
    └──► Clicks "See Pricing"
            │
            └──► Pricing Page
                    │
                    └──► Select Plan → Auth (if not logged in)
```

## 🎯 Dashboard Structure

### Main Dashboard View
```
┌────────────────────────────────────────────────────────────┐
│  NAVBAR (Top)                                               │
│  - Logo: HashGenPro                                         │
│  - Theme Toggle (Dark/Light)                               │
│  - User Menu (Settings, Logout)                            │
│  - Mobile Menu Button                                       │
└────────────────────────────────────────────────────────────┘
│
┌─────────────────┬──────────────────────────────────────────┐
│   SIDEBAR       │   MAIN CONTENT AREA                      │
│   (Left)        │                                          │
│                 │   ┌────────────────────────────────────┐ │
│  Main           │   │  Dashboard Home                    │ │
│  ├─ Dashboard   │   │  - Welcome Section                 │ │
│                 │   │  - Analytics Stats Cards           │ │
│  Generators     │   │    * Total Generations             │ │
│  ├─ Hashtags    │   │    * Credits Left                  │ │
│  ├─ Bio Writer  │   │    * Today's Activity              │ │
│  ├─ Captions    │   │    * Streak Counter                │ │
│  ├─ Reels Script│   │  - Usage Analytics Chart           │ │
│  ├─ Ideas       │   │  - Recent Activity                 │ │
│  ├─ Email       │   │  - Creative Studio Tools Grid      │ │
│  ├─ Emoji Maker│   │                                      │ │
│  ├─ Figma Design│   └────────────────────────────────────┘ │
│  ├─ Trend Watch│                                          │
│  └─ Scheduler  │   OR (When tool selected)                │
│                 │                                          │
│  Analyzers      │   ┌────────────────────────────────────┐ │
│  ├─ Competitor  │   │  Generator/Analyzer Tool           │ │
│  └─ Audit       │   │  - Input Form                      │ │
│                 │   │  - Platform Selector               │ │
│  Account        │   │  - Language Selector               │ │
│  ├─ History     │   │  - Generate Button                 │ │
│  ├─ Upgrade     │   │  - Results Display                 │ │
│  └─ Settings    │   │  - Copy/Download Options           │ │
│                 │   └────────────────────────────────────┘ │
│  [Logout]       │                                          │
└─────────────────┴──────────────────────────────────────────┘
```

## 🔧 Generator Tools (11 Tools)

### 1. Hashtag Generator
```
Input: Keyword + Platform + Count
Output: List of viral hashtags
Features: Copy all, Copy individual, Platform-specific
```

### 2. Bio Generator
```
Input: Keyword + Platform + Tone
Output: Optimized bio text
Features: Copy to clipboard, Character count
```

### 3. Caption Generator
```
Input: Topic/Description + Platform
Output: Engaging caption with emojis
Features: Copy, Multiple variations
```

### 4. Reels Script Generator
```
Input: Video topic/idea
Output: 30-60 second script with visual cues
Features: [Visual] tags + spoken dialogue
```

### 5. Content Ideas Generator
```
Input: Niche/Topic
Output: 5 creative content ideas
Features: Trending formats, Viral potential
```

### 6. Email Writer
```
Input: Purpose/Topic
Output: Professional outreach email
Features: Subject line + body
```

### 7. Emoji Maker
```
Input: Vibe/Theme
Output: Creative emoji combinations
Features: 3 unique combinations
```

### 8. Figma Design Concept
```
Input: Design description + Type
Output: Complete design brief
Features: Colors, Typography, Layout specs
```

### 9. Trend Watch
```
Input: Industry/Niche
Output: 3 current viral trends
Features: Actionable tips
```

### 10. Content Scheduler
```
Input: Focus area
Output: 7-day content plan
Features: Daily post ideas
```

## 🔍 Analyzer Tools (2 Tools)

### 1. Competitor Analysis
```
Input: Competitor content/strategy
Output:
  - 3 Key Strengths
  - 1 Major Weakness
  - Actionable insights
```

### 2. Profile Audit
```
Input: Profile content
Output:
  - Score (out of 10)
  - 3 Improvement tips
  - Quick wins
```

## ⚙️ Settings Page

```
┌────────────────────────────────────────┐
│  Settings                               │
│                                        │
│  Tabs:                                 │
│  ├─ Profile                            │
│  │   - Avatar upload                  │
│  │   - Name                           │
│  │   - Email (read-only)              │
│  │                                    │
│  ├─ Preferences                       │
│  │   - Theme (Dark/Light)             │
│  │   - Language                       │
│  │                                    │
│  └─ Security                          │
│      - Current Password               │
│      - New Password                   │
│      - Confirm Password               │
│      - Update Password Button         │
└────────────────────────────────────────┘
```

## 📜 History Page

```
┌────────────────────────────────────────┐
│  History                                │
│                                        │
│  Filters:                              │
│  ├─ All                                │
│  ├─ Hashtags                           │
│  ├─ Bios                               │
│  ├─ Captions                           │
│  └─ Scripts                            │
│                                        │
│  Search: [___________]                 │
│                                        │
│  Results:                              │
│  ┌──────────────────────────────────┐ │
│  │ 📝 Fitness hashtags               │ │
│  │ Instagram • 2 hours ago           │ │
│  │ [Copy] [View]                     │ │
│  └──────────────────────────────────┘ │
│  ┌──────────────────────────────────┐ │
│  │ ✍️ Tech influencer bio            │ │
│  │ LinkedIn • 5 hours ago            │ │
│  │ [Copy] [View]                     │ │
│  └──────────────────────────────────┘ │
└────────────────────────────────────────┘
```

## 💎 Pricing Page

```
┌────────────────────────────────────────┐
│  Pricing Plans                          │
│                                        │
│  ┌──────┐  ┌──────┐  ┌──────┐        │
│  │ FREE │  │  PRO │  │ BIZ  │        │
│  ├──────┤  ├──────┤  ├──────┤        │
│  │ $0   │  │ $9.99│  │$29.99│        │
│  │/month│  │/month│  │/month│        │
│  ├──────┤  ├──────┤  ├──────┤        │
│  │5/day │  │  ∞   │  │  ∞   │        │
│  │Basic │  │  All │  │  All │        │
│  │Tools │  │Tools │  │Tools │        │
│  │      │  │+Analy│  │+API  │        │
│  │      │  │tics  │  │+Team │        │
│  └──────┘  └──────┘  └──────┘        │
│                                        │
│  [Select Plan]                         │
└────────────────────────────────────────┘
```

## 🎨 Design System

### Color Palette
```
Primary: Indigo (#6366F1)
Secondary: Purple (#A855F7)
Accent: Pink (#EC4899)
Background: Gray-50 (Light) / Gray-900 (Dark)
Text: Gray-900 (Light) / White (Dark)
```

### Components
```
Buttons:
- Primary: Gradient (Indigo → Purple)
- Secondary: Outlined
- Tertiary: Ghost/Text

Cards:
- Rounded-2xl
- Shadow-lg
- Border: Gray-200 (Light) / Gray-700 (Dark)
- Hover: Scale(1.02) + Shadow-xl

Inputs:
- Rounded-lg
- Focus: Ring-2 Ring-Indigo-500
- Padding: px-4 py-2.5
```

## 🔐 Authentication States

```
┌─────────────────────────────────────┐
│  User States                         │
│                                     │
│  1. Not Logged In                   │
│     └─► Landing Page Only           │
│         ├─► Can view pricing        │
│         └─► Must auth to use tools  │
│                                     │
│  2. Guest User                      │
│     └─► Limited Dashboard Access    │
│         ├─► 5 generations/day       │
│         ├─► Guest banner shown      │
│         └─► Can't save history      │
│                                     │
│  3. Logged In (Free)                │
│     └─► Full Dashboard Access       │
│         ├─► 5 generations/day       │
│         ├─► History saved           │
│         └─► All tools available     │
│                                     │
│  4. Logged In (Pro/Business)        │
│     └─► Unlimited Access            │
│         ├─► ∞ generations           │
│         ├─► Priority support        │
│         └─► Advanced analytics      │
└─────────────────────────────────────┘
```

## 📱 Responsive Breakpoints

```
Mobile:  < 768px  (1 column, hamburger menu)
Tablet:  768-1024px (2 columns, collapsible sidebar)
Desktop: > 1024px (3-4 columns, persistent sidebar)
```

## 🔄 State Management

```
Global State (React Context):
├─ User Profile
├─ Authentication Status
├─ Current View
├─ Theme (Dark/Light)
├─ Generation History
└─ Sidebar Open/Close

Local State (Component Level):
├─ Form Inputs
├─ Loading States
├─ Error Messages
└─ Modal States
```

## 🌐 API Integration

```
DeepSeek API (via Proxy)
├─ Endpoint: /api/deepseek
├─ Method: POST
├─ Headers: Content-Type, Authorization
└─ Body: { messages, temperature, maxTokens }

Firebase
├─ Authentication
│   ├─ Email/Password
│   ├─ Google OAuth
│   └─ Password Reset
├─ Firestore
│   └─ User Profiles
└─ Analytics (Optional)
```

## 🎯 Key Features Summary

1. **11 AI-Powered Generators**
2. **2 Analytics Tools**
3. **Multi-Language Support** (15+ languages)
4. **Dark/Light Theme**
5. **Guest Mode Access**
6. **History Tracking**
7. **Copy to Clipboard**
8. **Responsive Design**
9. **Real-time Generation**
10. **Secure Authentication**

---

## 📐 For Figma Design

### Recommended Artboards:
1. Landing Page (1440x900)
2. Auth Page (1440x900)
3. Dashboard Home (1440x900)
4. Generator Tool (1440x900)
5. Settings Page (1440x900)
6. History Page (1440x900)
7. Mobile View (375x812)

### Components to Create:
- Navigation Bar
- Sidebar Menu
- Tool Cards
- Input Forms
- Result Display Cards
- Buttons (Primary, Secondary, Ghost)
- Modals/Overlays
- Toast Notifications
- Loading States
- Empty States

---

**Created for:** HashGenPro
**Date:** December 2025
**Version:** 1.0
