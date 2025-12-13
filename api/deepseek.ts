import type { VercelRequest, VercelResponse } from '@vercel/node';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = DEEPSEEK_API_KEY;

  if (!apiKey) {
    console.error('DeepSeek API key is not configured');
    return res.status(500).json({ error: 'Server configuration error: missing API key' });
  }

  try {
    let body;

    try {
      body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    } catch (parseError: any) {
      return res.status(400).json({ error: 'Invalid JSON body' });
    }

    if (!body || typeof body !== 'object') {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const {
      messages,
      temperature = 0.7,
      maxTokens = 2000,
      jsonMode = false
    } = body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request: messages array required' });
    }

    const invalidMessage = messages.find(
      (message) =>
        !message ||
        typeof message !== 'object' ||
        typeof message.role !== 'string' ||
        typeof message.content !== 'string' ||
        !message.content.trim()
    );

    if (invalidMessage) {
      return res.status(400).json({
        error: 'Invalid request: each message must include role and non-empty content'
      });
    }

    const sanitizedTemperature = Math.min(Math.max(Number(temperature), 0), 2);
    const sanitizedMaxTokens = Math.min(Math.max(parseInt(maxTokens, 10) || 0, 1), 4000);

    console.log('DeepSeek API Request:', {
      messages: messages.length,
      temperature: sanitizedTemperature,
      maxTokens: sanitizedMaxTokens
    });

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: messages,
        temperature: sanitizedTemperature,
        max_tokens: sanitizedMaxTokens,
        stream: false,
        ...(jsonMode && { response_format: { type: 'json_object' } })
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error('DeepSeek API Error:', response.status, errorData);
      return res.status(response.status).json({
        error: errorData.error?.message || 'DeepSeek API request failed',
        details: errorData
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';

    if (!content) {
      return res.status(500).json({ error: 'Empty response from DeepSeek API' });
    }

    console.log('DeepSeek API Success');
    return res.status(200).json({ content });

  } catch (error: any) {
    console.error('Proxy Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}
