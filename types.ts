export enum Platform {
  INSTAGRAM = 'instagram',
  TIKTOK = 'tiktok',
  TWITTER = 'twitter',
  LINKEDIN = 'linkedin',
  YOUTUBE = 'youtube',
  FACEBOOK = 'facebook'
}

export enum View {
  HOME = 'HOME',
  AUTH = 'AUTH', // Combined Login/Register view
  PRICING = 'PRICING',
  GENERATOR_HASHTAG = 'GENERATOR_HASHTAG',
  GENERATOR_BIO = 'GENERATOR_BIO',
  HISTORY = 'HISTORY',
  SETTINGS = 'SETTINGS',
  // New Tools
  GENERATOR_CAPTION = 'GENERATOR_CAPTION',
  GENERATOR_SCRIPT = 'GENERATOR_SCRIPT',
  GENERATOR_IDEA = 'GENERATOR_IDEA',
  GENERATOR_EMAIL = 'GENERATOR_EMAIL',
  GENERATOR_EMOJI = 'GENERATOR_EMOJI',
  GENERATOR_SCHEDULE = 'GENERATOR_SCHEDULE',
  GENERATOR_TREND = 'GENERATOR_TREND',
  ANALYZER_COMPETITOR = 'ANALYZER_COMPETITOR',
  ANALYZER_AUDIT = 'ANALYZER_AUDIT',
  ANALYTICS_FULL = 'ANALYTICS_FULL',
  GENERATOR_SPORTS = 'GENERATOR_SPORTS'
}

export interface PlatformConfig {
  id: Platform;
  name: string;
  iconUrl: string; // Changed from icon char to URL
  color: string;
  maxTags: number;
  description: string;
}

export interface GenerationResult {
  id: string;
  timestamp: number;
  type: 'hashtag' | 'bio' | 'caption' | 'script' | 'idea' | 'email' | 'audit' | 'analysis';
  platform: Platform | string;
  keyword: string;
  result: string[] | string; // Tags array or String content
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  plan: 'free' | 'pro' | 'business';
}