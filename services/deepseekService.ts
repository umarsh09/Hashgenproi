import { Platform } from '../types';

const DEEPSEEK_API_KEY = 'sk-01cb9d992e534c868236b6ab13734d19';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// Helper function to call DeepSeek API
const callDeepSeekAPI = async (
  systemPrompt: string,
  userPrompt: string,
  temperature: number = 0.7,
  jsonMode: boolean = false
): Promise<string> => {
  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        temperature: temperature,
        max_tokens: 2000,
        ...(jsonMode && { response_format: { type: 'json_object' } })
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('DeepSeek API Error:', errorData);
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';

  } catch (error) {
    console.error('DeepSeek API Call Failed:', error);
    throw error;
  }
};

export const generateHashtags = async (
  keyword: string,
  platform: Platform,
  count: number,
  language: string = 'English'
): Promise<string[]> => {
  try {
    const systemPrompt = `You are a world-class social media strategist specialized in creating viral hashtags.
Your goal is to generate high-performing, relevant, and trending hashtags.
You MUST respond with ONLY a valid JSON array of strings.
Do NOT include the '#' symbol in the hashtag strings.
Do NOT add any explanation or additional text.`;

    const userPrompt = `Generate ${count} hashtags for ${platform} about "${keyword}" in ${language} language.

Requirements:
- Mix popular (high-volume), niche (medium-volume), and specific (low-volume) hashtags
- Make them relevant to the topic
- Ensure they work well for ${language}-speaking audience
- Return ONLY a JSON array like: ["hashtag1", "hashtag2", "hashtag3"]`;

    const result = await callDeepSeekAPI(systemPrompt, userPrompt, 0.8, true);

    // Parse JSON response
    const tags: string[] = JSON.parse(result);

    // Add # prefix if not present
    return tags.map(tag => tag.startsWith('#') ? tag : `#${tag}`);

  } catch (error) {
    console.error("DeepSeek Hashtag Generation Error:", error);
    // Return safe fallback
    return [`#${keyword.replace(/\s+/g, '')}`, `#trending`, `#${platform}`, `#viral`, `#content`];
  }
};

export const generateBio = async (
  keyword: string,
  platform: Platform,
  tone: string,
  language: string = 'English'
): Promise<string> => {
  try {
    const systemPrompt = `You are an expert copywriter for social media profiles.
Create compelling, engaging bios that capture attention and convert followers.
Use emojis strategically where appropriate.
Keep the bio within platform character limits.
Output ONLY the bio text, no explanations or additional commentary.`;

    const userPrompt = `Create a ${tone} bio for ${platform} about: "${keyword}"

Requirements:
- Language: ${language}
- Tone: ${tone}
- Platform: ${platform}
- Include relevant emojis
- Make it engaging and memorable
- Follow ${platform} best practices

Output only the bio text.`;

    const bio = await callDeepSeekAPI(systemPrompt, userPrompt, 0.7);

    return bio.trim() || "Could not generate bio.";

  } catch (error) {
    console.error("DeepSeek Bio Error:", error);
    return "Social media enthusiast ready to share amazing content! 🚀 (AI Service Unavailable)";
  }
};

export const generateCreativeContent = async (
  type: 'caption' | 'script' | 'idea' | 'email' | 'schedule' | 'trend' | 'emoji',
  topic: string,
  platform?: string,
  language: string = 'English'
): Promise<string> => {
  try {
    let systemPrompt = `You are a creative social media expert and content strategist.
Always provide responses in ${language} language.
Be creative, engaging, and practical.`;

    let userPrompt = "";

    switch (type) {
      case 'caption':
        systemPrompt += ` You specialize in writing viral, engaging captions.`;
        userPrompt = `Write a compelling ${platform || 'Instagram/TikTok'} caption about: "${topic}"

Requirements:
- Language: ${language}
- Include a strong hook
- Add engaging body text
- End with a call-to-action
- Use relevant emojis
- Make it shareable and engaging

${platform ? `Optimize for ${platform} audience` : ''}`;
        break;

      case 'script':
        systemPrompt += ` You specialize in writing viral video scripts.`;
        userPrompt = `Write a 30-60 second viral Reels/TikTok script about: "${topic}"

Requirements:
- Language: ${language}
- Include visual cues in [brackets]
- Add spoken dialogue
- Make it engaging from the first second
- Include trending hooks
- Format: [Visual] Spoken text

${platform ? `Optimize for ${platform}` : ''}`;
        break;

      case 'idea':
        systemPrompt += ` You specialize in generating viral content ideas.`;
        userPrompt = `Generate 5 creative, viral content ideas for: "${topic}"

Requirements:
- Language: ${language}
- Make each idea unique and actionable
- Include brief descriptions
- Focus on trending formats
- Consider virality potential

${platform ? `Optimize for ${platform}` : ''}`;
        break;

      case 'email':
        systemPrompt += ` You specialize in writing professional, persuasive emails.`;
        userPrompt = `Write a professional outreach/collaboration email about: "${topic}"

Requirements:
- Language: ${language}
- Keep it concise (under 200 words)
- Be persuasive but not pushy
- Include clear value proposition
- Professional tone
- Strong subject line`;
        break;

      case 'schedule':
        systemPrompt += ` You specialize in content planning and scheduling.`;
        userPrompt = `Create a 1-week content posting schedule for: "${topic}"

Requirements:
- Language: ${language}
- 7 days of content ideas
- Format: Day: Content Idea
- Mix different content types
- Consider best posting times
- Balance educational, entertaining, and promotional content

${platform ? `Optimize for ${platform}` : ''}`;
        break;

      case 'trend':
        systemPrompt += ` You are an expert in social media trends and viral content.`;
        userPrompt = `Identify 3 current viral trends related to: "${topic}"

Requirements:
- Language: ${language}
- Explain each trend briefly
- Show how to adapt them
- Include actionable tips
- Focus on current, active trends

${platform ? `For ${platform} platform` : ''}`;
        break;

      case 'emoji':
        systemPrompt += ` You are creative with emoji combinations and visual communication.`;
        userPrompt = `Create 3 unique emoji combinations/art representing: "${topic}"

Requirements:
- Each combination should be distinct
- Use creative emoji sequences
- Make them visually appealing
- Suitable for social media`;
        break;
    }

    const content = await callDeepSeekAPI(systemPrompt, userPrompt, 0.8);

    return content.trim() || "Generation failed. Please try again.";

  } catch (error) {
    console.error("DeepSeek Content Generation Error:", error);
    return `Error generating ${type} content. Please try again later.`;
  }
};

export const analyzeContent = async (
  type: 'competitor' | 'audit',
  content: string,
  language: string = 'English'
): Promise<string> => {
  try {
    const systemPrompt = type === 'competitor'
      ? `You are an expert social media strategist specializing in competitive analysis.
Provide actionable insights and strategic recommendations.
Always respond in ${language} language.`
      : `You are an expert social media auditor and consultant.
Provide detailed, actionable feedback with specific recommendations.
Always respond in ${language} language.`;

    const userPrompt = type === 'competitor'
      ? `Analyze this competitor's content/strategy:

"${content}"

Provide:
1. 3 Key Strengths (what they're doing well)
2. 1 Major Weakness (area for improvement)
3. Actionable insights for our strategy

Language: ${language}`
      : `Audit this social media profile/content:

"${content}"

Provide:
1. Overall Score (out of 10) with justification
2. 3 Specific Improvement Tips
3. Quick wins they can implement immediately

Language: ${language}`;

    const analysis = await callDeepSeekAPI(systemPrompt, userPrompt, 0.7);

    return analysis.trim() || "Analysis failed.";

  } catch (error) {
    console.error("DeepSeek Analysis Error:", error);
    return `Error analyzing content. Please try again later.`;
  }
};
