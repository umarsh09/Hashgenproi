import { Platform, PlatformConfig } from './types';

export const PLATFORMS: Record<Platform, PlatformConfig> = {
  [Platform.INSTAGRAM]: {
    id: Platform.INSTAGRAM,
    name: 'Instagram',
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg',
    color: 'from-pink-500 to-purple-500',
    maxTags: 30,
    description: 'Mix of popular and niche tags for maximum reach.'
  },
  [Platform.TIKTOK]: {
    id: Platform.TIKTOK,
    name: 'TikTok',
    iconUrl: 'https://seeklogo.com/images/T/tiktok-icon-logo-1CB398A1BD-seeklogo.com.png', // Using PNG for better visibility on dark/light
    color: 'from-black to-gray-700',
    maxTags: 10,
    description: 'Trending sounds and challenges.'
  },
  [Platform.TWITTER]: {
    id: Platform.TWITTER,
    name: 'X (Twitter)',
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/X_icon_2.svg',
    color: 'from-gray-700 to-black',
    maxTags: 3,
    description: 'Keep it concise and relevant.'
  },
  [Platform.LINKEDIN]: {
    id: Platform.LINKEDIN,
    name: 'LinkedIn',
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
    color: 'from-blue-700 to-blue-900',
    maxTags: 5,
    description: 'Professional and industry-specific tags.'
  },
  [Platform.YOUTUBE]: {
    id: Platform.YOUTUBE,
    name: 'YouTube',
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg',
    color: 'from-red-500 to-red-700',
    maxTags: 15,
    description: 'SEO optimized tags for video discovery.'
  },
  [Platform.FACEBOOK]: {
    id: Platform.FACEBOOK,
    name: 'Facebook',
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg',
    color: 'from-blue-600 to-blue-800',
    maxTags: 5,
    description: 'Community and topic focused.'
  }
};

export const LANGUAGES = [
  { name: 'English', flag: '🇺🇸' },
  { name: 'Spanish', flag: '🇪🇸' },
  { name: 'Hindi', flag: '🇮🇳' },
  { name: 'Urdu', flag: '🇵🇰' },
  { name: 'Arabic', flag: '🇸🇦' },
  { name: 'French', flag: '🇫🇷' },
  { name: 'German', flag: '🇩🇪' },
  { name: 'Italian', flag: '🇮🇹' },
  { name: 'Portuguese', flag: '🇧🇷' },
  { name: 'Chinese', flag: '🇨🇳' },
  { name: 'Japanese', flag: '🇯🇵' },
  { name: 'Korean', flag: '🇰🇷' },
  { name: 'Russian', flag: '🇷🇺' },
  { name: 'Indonesian', flag: '🇮🇩' },
  { name: 'Turkish', flag: '🇹🇷' },
];