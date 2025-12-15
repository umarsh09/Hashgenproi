# HashGenPro - Site Flow Diagram (Mermaid)

## User Journey Flow

```mermaid
graph TD
    A[Landing Page] --> B{User Action}
    B -->|Start for Free| C{Logged In?}
    B -->|See Pricing| D[Pricing Page]

    C -->|No| E[Auth Page]
    C -->|Yes| F[Dashboard]

    E --> E1[Login]
    E --> E2[Signup]
    E --> E3[Google Sign-In]
    E --> E4[Guest Mode]

    E1 --> F
    E2 --> F
    E3 --> F
    E4 --> G[Guest Dashboard]

    D --> D1{Select Plan}
    D1 --> C

    F --> H[Main Dashboard]
    H --> I[11 Generators]
    H --> J[2 Analyzers]
    H --> K[History]
    H --> L[Settings]

    I --> I1[Hashtag Generator]
    I --> I2[Bio Generator]
    I --> I3[Caption Generator]
    I --> I4[Reels Script]
    I --> I5[Content Ideas]
    I --> I6[Email Writer]
    I --> I7[Emoji Maker]
    I --> I8[Figma Design]
    I --> I9[Trend Watch]
    I --> I10[Scheduler]

    J --> J1[Competitor Analysis]
    J --> J2[Profile Audit]
```

## Application Architecture

```mermaid
graph LR
    A[User] --> B[React Frontend]
    B --> C[Firebase Auth]
    B --> D[Vercel API Proxy]
    D --> E[DeepSeek API]
    C --> F[Firestore DB]
    B --> G[LocalStorage]

    subgraph Frontend
    B
    end

    subgraph Backend Services
    C
    D
    E
    F
    end

    subgraph Client Storage
    G
    end
```

## Component Hierarchy

```mermaid
graph TD
    App[App.tsx] --> ErrorBoundary
    ErrorBoundary --> ToastProvider
    ToastProvider --> AppContainer

    AppContainer --> Navbar
    AppContainer --> Sidebar
    AppContainer --> MainContent

    MainContent --> Home
    MainContent --> Auth
    MainContent --> Dashboard
    MainContent --> Generators
    MainContent --> Analyzers
    MainContent --> History
    MainContent --> Settings
    MainContent --> Pricing

    Generators --> Generator[Hashtag]
    Generators --> BioGen[Bio]
    Generators --> UniversalGen[Caption/Script/Ideas/etc]
    Generators --> FigmaGen[Figma Design]

    Analyzers --> CompAnalyzer[Competitor]
    Analyzers --> AuditAnalyzer[Profile Audit]
```

## Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant FA as Firebase Auth
    participant DB as Firestore

    U->>F: Click "Start Free"
    F->>FA: Check Auth State

    alt Not Authenticated
        FA-->>F: No User
        F->>U: Show Auth Page
        U->>F: Enter Credentials
        F->>FA: Login/Signup
        FA->>DB: Create/Fetch Profile
        DB-->>FA: User Profile
        FA-->>F: Auth Success
        F->>U: Show Dashboard
    else Authenticated
        FA-->>F: User Data
        F->>U: Show Dashboard
    end

    alt Guest Mode
        U->>F: Continue as Guest
        F->>F: Create Guest User
        F->>U: Show Guest Dashboard
    end
```

## Generation Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant P as API Proxy
    participant D as DeepSeek AI
    participant LS as LocalStorage

    U->>F: Enter Input + Select Platform
    U->>F: Click Generate
    F->>F: Show Loading State
    F->>P: POST /api/deepseek
    P->>D: Forward Request
    D-->>P: AI Response
    P-->>F: Generated Content
    F->>LS: Save to History
    F->>U: Display Result
    U->>F: Copy to Clipboard
    F->>U: Show Success Toast
```

## State Management

```mermaid
graph TD
    A[Global State] --> B[User Profile]
    A --> C[Auth Status]
    A --> D[Current View]
    A --> E[Theme]
    A --> F[History]
    A --> G[Sidebar State]

    B --> H[User Context]
    C --> H
    D --> I[Router State]
    E --> J[Theme Context]
    F --> K[LocalStorage]
    G --> L[Component State]
```

## Page Structure

```mermaid
graph TD
    Root[HashGenPro] --> Landing[Landing Page]
    Root --> App[App Dashboard]

    Landing --> Hero[Hero Section]
    Landing --> Features[Features]
    Landing --> FAQ[FAQ]
    Landing --> CTA[Call to Action]

    App --> Nav[Navbar]
    App --> Side[Sidebar]
    App --> Main[Main Content]

    Side --> SM[Main Menu]
    Side --> SG[Generators 11]
    Side --> SA[Analyzers 2]
    Side --> SAc[Account 3]

    Main --> DH[Dashboard Home]
    Main --> Tools[Tool Pages]
    Main --> Hist[History]
    Main --> Sett[Settings]

    DH --> Stats[Analytics Stats]
    DH --> Chart[Usage Chart]
    DH --> Recent[Recent Activity]
    DH --> Grid[Tools Grid]
```

## Data Flow

```mermaid
flowchart LR
    A[User Input] --> B[Form Validation]
    B --> C{Valid?}
    C -->|No| D[Show Error]
    C -->|Yes| E[Call API]
    E --> F{Success?}
    F -->|No| G[Show Error Toast]
    F -->|Yes| H[Parse Response]
    H --> I[Update State]
    I --> J[Save to History]
    I --> K[Display Result]
    K --> L[Enable Copy Button]
    L --> M[User Copies]
    M --> N[Show Success Toast]
```

## Theme Toggle

```mermaid
stateDiagram-v2
    [*] --> Dark: Default
    Dark --> Light: Toggle
    Light --> Dark: Toggle

    Dark --> UpdateDOM: Apply Dark Classes
    Light --> UpdateDOM: Remove Dark Classes
    UpdateDOM --> [*]
```

## Guest vs Authenticated Flow

```mermaid
graph TD
    Start[User Arrives] --> Check{Authenticated?}
    Check -->|No| Guest{Guest Mode?}
    Check -->|Yes| Auth[Authenticated User]

    Guest -->|Yes| GuestDash[Guest Dashboard]
    Guest -->|No| Landing[Landing Page]

    GuestDash --> Limit[5 Generations/Day]
    GuestDash --> NoSave[No Cloud Save]
    GuestDash --> Banner[Upgrade Banner]

    Auth --> FullDash[Full Dashboard]
    FullDash --> CheckPlan{Plan Type?}

    CheckPlan -->|Free| Free[5/Day + Save]
    CheckPlan -->|Pro| Pro[Unlimited + Analytics]
    CheckPlan -->|Business| Biz[Unlimited + API + Team]
```

---

## How to Use in Figma

### Method 1: Import this Markdown
1. Copy the mermaid code blocks
2. Use [Mermaid Live Editor](https://mermaid.live)
3. Export as SVG
4. Import SVG into Figma

### Method 2: Manual Recreation
Use the text diagrams in `WEBSITE_ARCHITECTURE.md` as reference to:
1. Create frames for each page
2. Add components (buttons, forms, cards)
3. Connect with arrows/flows
4. Add annotations

### Method 3: Use FigJam
1. Open FigJam (Figma's whiteboard)
2. Create flowchart with shapes and connectors
3. Use sticky notes for annotations
4. Add screenshots from the website

---

**Tip:** Use the architecture document alongside these diagrams for complete context!
