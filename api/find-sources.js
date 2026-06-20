import { createClient } from '@supabase/supabase-js';

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';

const SYSTEM = `You are a citation assistant. Given a text excerpt, find or generate 3-5 relevant academic sources related to the content. Return ONLY a valid JSON object with a "sources" array. Each source object must have: title (string), author (string, "Last, First" format), year (string), url (string or null), formatted_citation (string formatted in the requested citation style). No prose, no markdown, no code fences — raw JSON only.`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Missing Authorization header' });

  const adminSb = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  const { data: { user }, error: authError } = await adminSb.auth.getUser(token);
  if (authError || !user) return res.status(401).json({ error: 'Invalid or expired session' });

  const { data: sub, error: subErr } = await adminSb
    .from('subscriptions')
    .select('tier, status')
    .eq('user_id', user.id)
    .single();

  if (subErr || !sub || sub.status !== 'active') {
    return res.status(403).json({ error: 'Active subscription required.', code: 'INACTIVE' });
  }

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicKey) {
    console.error('[find-sources] ANTHROPIC_API_KEY not configured');
    return res.status(500).json({ error: 'Source search is temporarily unavailable' });
  }

  const { text, style = 'apa' } = req.body || {};
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'text is required' });
  }

  const styleLabel = style === 'mla' ? 'MLA 9th edition' : style === 'harvard' ? 'Harvard' : 'APA 7th edition';
  const userMsg = `Find 3-5 real academic sources related to this text. Format all citations in ${styleLabel}. Return as JSON.\n\nText:\n${text.slice(0, 3000)}`;

  try {
    const messages = [{ role: 'user', content: userMsg }];
    let finalContent = null;
    let iterations = 0;
    const MAX_ITER = 8;

    while (iterations < MAX_ITER) {
      iterations++;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': anthropicKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 1024,
          system: SYSTEM,
          tools: [{ type: 'web_search_20250305', name: 'web_search' }],
          messages,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error('[find-sources] Claude API error:', response.status, errText.slice(0, 300));
        return res.status(500).json({ error: 'Source search is temporarily unavailable' });
      }

      const data = await response.json();

      if (data.stop_reason === 'end_turn' || data.stop_reason === 'pause_turn') {
        finalContent = data.content;
        break;
      }

      if (data.stop_reason === 'tool_use') {
        // Handle any explicit tool_use blocks (shouldn't occur for server-side tools, but guard)
        const toolResults = (data.content || [])
          .filter(c => c.type === 'tool_use')
          .map(c => ({ type: 'tool_result', tool_use_id: c.id, content: '{}' }));
        messages.push({ role: 'assistant', content: data.content });
        messages.push({ role: 'user', content: toolResults });
        continue;
      }

      // Unknown stop reason — use what we have
      finalContent = data.content;
      break;
    }

    if (!finalContent) {
      return res.status(500).json({ error: 'Source search is temporarily unavailable' });
    }

    const textOutput = finalContent
      .filter(c => c.type === 'text')
      .map(c => c.text)
      .join('');

    let sources = [];
    const jsonMatch = textOutput.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        sources = Array.isArray(parsed.sources) ? parsed.sources : [];
      } catch (parseErr) {
        console.error('[find-sources] JSON parse failed:', parseErr.message);
      }
    }

    return res.status(200).json({ sources });
  } catch (err) {
    console.error('[find-sources] Exception:', err.message);
    return res.status(500).json({ error: 'Source search is temporarily unavailable' });
  }
}
