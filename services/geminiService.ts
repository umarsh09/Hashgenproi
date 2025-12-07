import { GoogleGenAI, Type } from "@google/genai";
import { Platform } from '../types';

// Use Vite's native environment variable handling
const getApiKey = (): string => {
  // Vite exposes env vars with VITE_ prefix via import.meta.env
  const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
  return apiKey;
};

const getAiClient = () => {
  const apiKey = getApiKey();
  return new GoogleGenAI({ apiKey });
};

// Helper to check key before call
const checkApiKey = () => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("API Key is missing. Please set VITE_GEMINI_API_KEY in your .env.local file.");
  }
}

export const generateHashtags = async (
  keyword: string, 
  platform: Platform, 
  count: number,
  language: string = 'English'
): Promise<string[]> => {
  try {
    checkApiKey();
    const ai = getAiClient();
    
    const systemInstruction = `You are a world-class social media strategist. 
    Your goal is to generate high-performing, viral, and relevant hashtags.
    Strictly output a JSON array of strings. Do not include the '#' symbol in the JSON strings, I will add them later. 
    Do not number them.
    `;

    const prompt = `
      Platform: ${platform}
      Topic/Context: ${keyword}
      Quantity: ${count}
      Target Language: ${language}
      
      Generate a list of ${count} hashtags optimized for ${platform}. 
      Ensure the hashtags are relevant to the topic and used by speakers of ${language}.
      Mix high-volume (popular), medium-volume (niche), and low-volume (highly specific) tags.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];

    const tags: string[] = JSON.parse(text);
    return tags.map(tag => tag.startsWith('#') ? tag : `#${tag}`);

  } catch (error) {
    // Return safe fallback for demo purposes if API fails
    return [`#${keyword.replace(/\s+/g, '')}`, `#trending`, `#${platform}`, `#viral`];
  }
};

export const generateBio = async (
  keyword: string,
  platform: Platform,
  tone: string,
  language: string = 'English'
): Promise<string> => {
  try {
    checkApiKey();
    const ai = getAiClient();
    
    const systemInstruction = `You are an expert copywriter for social media profiles.
    Create a compelling, formatted bio/description based on the user's input.
    Use emojis where appropriate. Keep it within the character limits of the platform.
    `;

    const prompt = `
      Platform: ${platform}
      Topic/Persona: ${keyword}
      Tone: ${tone}
      Target Language: ${language}
      
      Write a single, perfect bio/description in ${language}. Do not output JSON. Just output the text of the bio.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "Could not generate bio.";

  } catch (error) {
    return "Social media enthusiast ready to share amazing content! (AI Service Unavailable)";
  }
};

export const generateCreativeContent = async (
  type: 'caption' | 'script' | 'idea' | 'email' | 'schedule' | 'trend' | 'emoji',
  topic: string,
  platform?: string,
  language: string = 'English'
): Promise<string> => {
  try {
    checkApiKey();
    const ai = getAiClient();
    let prompt = "";
    let systemInstruction = `You are a creative social media assistant. Always output your response in ${language}.`;

    switch (type) {
      case 'caption':
        prompt = `Write an engaging Instagram/TikTok caption for a post about: "${topic}". Include a hook, body, and call to action. Add emojis. Output in ${language}.`;
        break;
      case 'script':
        prompt = `Write a 30-60 second viral video script (Reels/TikTok) about: "${topic}". Include visual cues in brackets [Like this] and spoken audio. Output in ${language}.`;
        break;
      case 'idea':
        prompt = `Generate 5 creative, viral content ideas for the niche: "${topic}". Give a brief description for each in ${language}.`;
        break;
      case 'email':
        prompt = `Write a professional cold outreach or collaboration email regarding: "${topic}". Keep it concise and persuasive. Output in ${language}.`;
        break;
      case 'schedule':
        prompt = `Create a 1-week content posting schedule for a brand focusing on: "${topic}". Format it as Day: Content Idea. Output in ${language}.`;
        break;
      case 'trend':
        prompt = `Identify 3 current viral trends related to: "${topic}" and explain how to adapt them. Output in ${language}.`;
        break;
      case 'emoji':
        prompt = `Create 3 distinct aesthetic emoji combinations/art representing: "${topic}".`;
        break;
    }

    if (platform) prompt += ` Optimized for ${platform}.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: { systemInstruction }
    });

    return response.text || "Generation failed.";
  } catch (e) {
    return "Error generating content. Please try again later.";
  }
};

export const analyzeContent = async (
  type: 'competitor' | 'audit',
  content: string,
  language: string = 'English'
): Promise<string> => {
  try {
    checkApiKey();
    const ai = getAiClient();
    const prompt = type === 'competitor' 
      ? `Analyze this competitor text/strategy and list 3 strengths and 1 weakness: "${content}". Provide the analysis in ${language}.`
      : `Audit this social media profile bio/content and give it a score out of 10, plus 3 specific tips to improve: "${content}". Provide the audit report in ${language}.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });
    return response.text || "Analysis failed.";
  } catch (e) {
    return "Error analyzing content.";
  }
};