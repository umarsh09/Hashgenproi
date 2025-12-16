# 🎨 HashGenPro - Figma Design Guide

## Quick Start: Create Website Diagram in Figma

### Option 1: Use FigJam (Recommended for Diagrams)

#### Step 1: Open FigJam
1. Go to Figma.com
2. Click "+ New FigJam file"
3. Name it: "HashGenPro - Website Architecture"

#### Step 2: Create Main Sections
Create 5 main sections using sticky notes:

```
┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│  LANDING PAGE  │  │   AUTH FLOW    │  │   DASHBOARD    │
└────────────────┘  └────────────────┘  └────────────────┘

┌────────────────┐  ┌────────────────┐
│  GENERATORS    │  │   SETTINGS     │
└────────────────┘  └────────────────┘
```

#### Step 3: Landing Page Flow
```
🌐 Landing Page
    │
    ├─► Hero Section
    │   ├─ "Start for Free" Button
    │   ├─ "See Pricing" Button
    │   └─ Social Icons
    │
    ├─► Features Section
    │   └─ 11 Generator Cards
    │
    └─► FAQ Section
```

**FigJam Actions:**
1. Add rectangle shape for "Landing Page"
2. Use connector tool to draw arrow
3. Add smaller rectangles for sub-sections
4. Use different colors for different types:
   - Blue: Pages
   - Green: Actions/Buttons
   - Yellow: Features
   - Pink: User flows

#### Step 4: Auth Flow
```
👤 Authentication
    │
    ├─► Login
    │   ├─ Email/Password
    │   └─ Google Sign-In
    │
    ├─► Signup
    │   └─ Create Account
    │
    └─► Guest Mode
        └─ Limited Access
```

**FigJam Actions:**
1. Create diamond shape for decision points
2. Use different colors for each path
3. Add annotations using sticky notes

#### Step 5: Dashboard Structure
```
📊 Dashboard
    │
    ├─► Navbar (Top)
    │
    ├─► Sidebar (Left)
    │   ├─ 11 Generators
    │   ├─ 2 Analyzers
    │   └─ Account Menu
    │
    └─► Main Content
        ├─ Analytics Stats
        ├─ Usage Chart
        ├─ Recent Activity
        └─ Tools Grid
```

### Option 2: Create Proper Design Mockups

#### Artboard Setup
Create these frames in Figma:

1. **Desktop - Landing Page** (1440 x 900)
2. **Desktop - Dashboard** (1440 x 900)
3. **Desktop - Generator Tool** (1440 x 900)
4. **Mobile - Landing Page** (375 x 812)
5. **Mobile - Dashboard** (375 x 812)

#### Design System Components

##### Colors (Create as Styles)
```
Primary Colors:
├─ Indigo-600: #4F46E5
├─ Purple-600: #9333EA
├─ Pink-500: #EC4899
└─ Gray-900: #111827

Background:
├─ Light: #F9FAFB
└─ Dark: #111827

Text:
├─ Primary: #111827
└─ Secondary: #6B7280
```

**How to create:**
1. Select rectangle
2. Right-click fill → Create Style
3. Name it: "Primary/Indigo-600"

##### Typography
```
Headings:
├─ H1: 48px, Bold (Landing hero)
├─ H2: 36px, Bold (Section titles)
├─ H3: 24px, Semibold (Card titles)
└─ H4: 18px, Semibold (Sub-headings)

Body:
├─ Large: 18px, Regular
├─ Medium: 16px, Regular
└─ Small: 14px, Regular

Font: Inter
```

##### Button Components
Create 3 button variants:

**Primary Button:**
```
Background: Gradient (Indigo → Purple)
Padding: 16px 40px
Border-radius: 9999px (pill shape)
Text: White, 16px, Bold
Shadow: Large
Hover: Scale 1.05
```

**Secondary Button:**
```
Background: White (or transparent)
Border: 2px Gray-200
Padding: 16px 40px
Border-radius: 9999px
Text: Gray-900, 16px, Bold
Hover: Gray-50
```

**Icon Button:**
```
Size: 40x40
Border-radius: 8px
Icon: 20x20
Hover: Background gray-100
```

##### Card Component
```
Size: Flexible
Padding: 24px
Border-radius: 16px
Border: 1px Gray-200
Shadow: Medium
Background: White

Hover State:
├─ Transform: translateY(-4px)
├─ Shadow: Large
└─ Border: Indigo-200
```

### Detailed Page Layouts

#### 1. Landing Page
```
┌─────────────────────────────────────────┐
│  Navbar                                  │
│  [Logo]              [Theme] [Login]    │
└─────────────────────────────────────────┘
│
│  Hero Section (Full height)
│  ┌─────────────────────────────────────┐
│  │  "Stop guessing.                    │
│  │   Start Going Viral."               │
│  │                                     │
│  │  [Social Icons: IG, TT, LI, YT]    │
│  │                                     │
│  │  [Start for Free]  [See Pricing]   │
│  └─────────────────────────────────────┘
│
│  Features Grid
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐
│  │ #  │ │ ✍️ │ │ 📝 │ │ 🎬 │
│  └────┘ └────┘ └────┘ └────┘
│
│  Testimonials
│  FAQ Section
│  Footer
```

**Figma Steps:**
1. Create frame 1440x900
2. Add Auto Layout for sections
3. Use components for repeated elements
4. Add gradients for hero section
5. Use plugins for icons (Iconify)

#### 2. Dashboard Layout
```
┌─────────────────────────────────────────┐
│  Navbar: Logo | Search | Profile       │
└─────────────────────────────────────────┘
┌──────┬──────────────────────────────────┐
│      │  Welcome Section                 │
│ SIDE │  ┌───┐ ┌───┐ ┌───┐ ┌───┐      │
│ BAR  │  │ 5 │ │ ∞ │ │ 3 │ │ 🔥│      │
│      │  └───┘ └───┘ └───┘ └───┘      │
│ Main │                                  │
│ ├─📊│  Usage Chart                     │
│ Gen. │  [Bar chart visualization]       │
│ ├─⚡│                                  │
│ ├─✍️│  Recent Activity                 │
│ ├─📝│  [List of recent generations]    │
│      │                                  │
│ Ana. │  Creative Studio                 │
│ ├─🕵️│  [Grid of 11 tool cards]        │
│ ├─🔍│                                  │
│      │                                  │
│ Acc. │                                  │
│ ├─📜│                                  │
│ ├─💎│                                  │
│ └─⚙️│                                  │
└──────┴──────────────────────────────────┘
```

**Figma Steps:**
1. Create frame 1440x900
2. Use Auto Layout for sidebar (vertical)
3. Use Auto Layout for main content (vertical)
4. Create stats cards with icons
5. Add chart using plugins (Chart plugin)
6. Create tool grid (4 columns)

#### 3. Generator Tool Page
```
┌─────────────────────────────────────────┐
│  [← Back]  Hashtag Generator            │
└─────────────────────────────────────────┘
│
│  Input Section
│  ┌─────────────────────────────────────┐
│  │ Keyword:  [___________________]    │
│  │                                     │
│  │ Platform: [Instagram ▼]            │
│  │                                     │
│  │ Count:    [●────○] 30              │
│  │                                     │
│  │ Language: [English ▼]              │
│  │                                     │
│  │         [Generate ⚡]              │
│  └─────────────────────────────────────┘
│
│  Results
│  ┌─────────────────────────────────────┐
│  │ #fitness #gym #workout #fitfam     │
│  │ [Copy All]                          │
│  │                                     │
│  │ #fitness           [Copy]          │
│  │ #gym               [Copy]          │
│  │ #workout           [Copy]          │
│  └─────────────────────────────────────┘
```

### Components Library Checklist

Create these as Figma components:

**Navigation:**
- [ ] Desktop Navbar
- [ ] Mobile Navbar (hamburger)
- [ ] Sidebar Menu Item
- [ ] User Profile Dropdown

**Buttons:**
- [ ] Primary Button (3 sizes: sm, md, lg)
- [ ] Secondary Button
- [ ] Ghost Button
- [ ] Icon Button

**Cards:**
- [ ] Feature Card
- [ ] Tool Card
- [ ] Stats Card
- [ ] Result Card
- [ ] History Item Card

**Forms:**
- [ ] Text Input
- [ ] Dropdown Select
- [ ] Slider
- [ ] Checkbox
- [ ] Radio Button
- [ ] Textarea

**Feedback:**
- [ ] Toast Notification (Success, Error, Info)
- [ ] Loading Spinner
- [ ] Progress Bar
- [ ] Empty State

**Misc:**
- [ ] Logo
- [ ] Avatar
- [ ] Badge
- [ ] Tooltip
- [ ] Modal/Dialog

## Color Codes for Copy-Paste

```css
/* Primary Colors */
--indigo-50: #EEF2FF;
--indigo-500: #6366F1;
--indigo-600: #4F46E5;
--indigo-700: #4338CA;

--purple-500: #A855F7;
--purple-600: #9333EA;

--pink-500: #EC4899;
--pink-600: #DB2777;

/* Neutrals */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-400: #9CA3AF;
--gray-500: #6B7280;
--gray-600: #4B5563;
--gray-700: #374151;
--gray-800: #1F2937;
--gray-900: #111827;

/* Semantic Colors */
--success: #10B981;
--warning: #F59E0B;
--error: #EF4444;
--info: #3B82F6;
```

## Gradients

```css
/* Primary Gradient */
background: linear-gradient(135deg, #6366F1 0%, #9333EA 100%);

/* Hero Gradient */
background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #EC4899 100%);

/* Card Hover Gradient */
background: linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 100%);
```

## Export Settings

**For Development:**
- Format: SVG
- Scale: 1x
- Include: "id" attribute

**For Assets:**
- Icons: PNG, 2x, transparent
- Images: JPG, 2x, 90% quality
- Logos: SVG, vector

---

## Useful Figma Plugins

1. **Iconify** - For social media icons
2. **Unsplash** - For placeholder images
3. **Content Reel** - For dummy text
4. **Chart** - For usage analytics chart
5. **Stark** - For accessibility checking
6. **Autoflow** - For creating flowcharts

---

## Quick Tips

1. **Use Auto Layout everywhere** - Makes responsive design easy
2. **Create variants** for button states (default, hover, active, disabled)
3. **Use grids** - 12-column grid with 24px gutters
4. **Consistent spacing** - Use 4px, 8px, 12px, 16px, 24px, 32px, 48px
5. **Name layers properly** - Use "/" for organization (e.g., "Button/Primary/Default")

---

**Need help?** Check out:
- Figma YouTube tutorials
- Figma Community for templates
- `WEBSITE_ARCHITECTURE.md` for detailed structure
- `SITE_FLOW_DIAGRAM.md` for flowcharts

Happy designing! 🎨
