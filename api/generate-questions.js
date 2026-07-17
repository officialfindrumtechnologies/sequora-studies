import { createClient } from '@supabase/supabase-js';
import { applyCors } from './_cors.js';

const rateLimitMap = new Map();
const PQ_LIMITS = { free: 0, paid_1: 20, paid_2: 40, paid_3: 100 };

export function detectExamFormat(examCode = '') {
  const code = examCode.toUpperCase();
  if (code.includes('BMDC') || code.startsWith('MBBS')) return 'mbbs';
  if (['9700','9701','9702','9703','0610','0620','0625'].some(c => code.includes(c))) return 'cambridge';
  if (code.startsWith('IB-') || code.startsWith('IB_')) return 'ib';
  return 'generic';
}

function deriveMetadata(examCode = '') {
  const code = examCode.toUpperCase();
  if (code.includes('BMDC') || code.startsWith('MBBS')) return { board: 'BMDC Bangladesh', level: 'MBBS', paper: 'MCQ' };
  const MAP = {
    '9700': { board: 'Cambridge', level: 'A Level', paper: 'Biology' },
    '9701': { board: 'Cambridge', level: 'A Level', paper: 'Chemistry' },
    '9702': { board: 'Cambridge', level: 'A Level', paper: 'Physics' },
    '9703': { board: 'Cambridge', level: 'A Level', paper: 'Psychology' },
    '0610': { board: 'Cambridge', level: 'IGCSE', paper: 'Biology' },
    '0620': { board: 'Cambridge', level: 'IGCSE', paper: 'Chemistry' },
    '0625': { board: 'Cambridge', level: 'IGCSE', paper: 'Physics' },
  };
  if (MAP[code]) return MAP[code];
  if (code.startsWith('IB-') || code.startsWith('IB_')) {
    return { board: 'IB', level: 'IB Diploma', paper: code.slice(3) || 'Mixed' };
  }
  return { board: 'General', level: 'General', paper: 'Mixed' };
}

export function buildGeminiPrompt({ topicName, examCode, examFormat, count, difficulty }) {
  const diff = difficulty || 'medium';

  if (examFormat === 'mbbs') {
    return `You are an expert MBBS (Bangladesh BMDC) examiner. Generate ${count} single-best-answer MCQ questions on the topic "${topicName}" for MBBS undergraduate medical students.

Requirements:
- Board: BMDC Bangladesh MBBS
- Style: Clinical scenarios and factual physiology/anatomy/biochemistry/pharmacology questions
- Difficulty: ${diff}
- Each MCQ has exactly 4 options labeled A, B, C, D
- 1 mark for correct, 0.25 mark deducted for wrong (negative marking)
- Stems must be accurate and at genuine MBBS exam standard

Return ONLY a valid JSON array — no markdown fences, no preamble, no trailing text:
[
  {
    "qtype": "mcq_single",
    "stem": "Which of the following best describes...?",
    "options": [
      {"id": "A", "text": "Option A text"},
      {"id": "B", "text": "Option B text"},
      {"id": "C", "text": "Option C text"},
      {"id": "D", "text": "Option D text"}
    ],
    "correct": "A",
    "explanation": "A is correct because... B is incorrect because... C is incorrect because... D is incorrect because...",
    "marks": 1,
    "negative_marking": 0.25,
    "difficulty": "${diff}",
    "command_word": null,
    "mark_scheme": null,
    "model_answer": null
  }
]`;
  }

  if (examFormat === 'cambridge') {
    const mcqCount = Math.ceil(count * 0.6);
    const structCount = count - mcqCount;

    return `You are an expert Cambridge Assessment International Education examiner. Generate ${count} exam questions on the topic "${topicName}" for Cambridge exam code ${examCode}.

Generate exactly ${mcqCount} MCQ questions (Paper 1 multiple-choice style) and ${structCount} structured questions (Paper 2/4 written-answer style).

Requirements:
- Board: Cambridge Assessment International Education
- Difficulty: ${diff}
- MCQ: exactly 4 options A–D, no negative marking, 1 mark, Paper 1 style with one unambiguous correct answer
- Structured: use precise Cambridge command words (State, Describe, Explain, Suggest, Outline, Define, Compare), 2–6 marks, mark scheme as bullet points where each point earns marks totalling the stated mark value, include a model answer
- All questions must be scientifically accurate and specific to "${topicName}"

Return ONLY a valid JSON array — no markdown fences, no preamble, no trailing text:
[
  {
    "qtype": "mcq_single",
    "stem": "Which of the following correctly describes...?",
    "options": [
      {"id": "A", "text": "..."},
      {"id": "B", "text": "..."},
      {"id": "C", "text": "..."},
      {"id": "D", "text": "..."}
    ],
    "correct": "B",
    "explanation": "B is correct because... The distractors are wrong because...",
    "marks": 1,
    "negative_marking": 0,
    "difficulty": "${diff}",
    "command_word": null,
    "mark_scheme": null,
    "model_answer": null
  },
  {
    "qtype": "structured",
    "stem": "Describe the role of enzymes in metabolic reactions. [4]",
    "command_word": "Describe",
    "marks": 4,
    "mark_scheme": [
      {"point": "enzymes are biological catalysts / speed up reactions without being used up", "marks": 1},
      {"point": "lower the activation energy of the reaction", "marks": 1},
      {"point": "enzyme active site is specific / complementary shape to substrate", "marks": 1},
      {"point": "enzyme–substrate complex formed; products released; enzyme unchanged", "marks": 1}
    ],
    "model_answer": "Enzymes are biological catalysts that speed up metabolic reactions without being consumed. They lower the activation energy so reactions can proceed at physiological temperatures. Each enzyme has an active site with a specific shape complementary to its substrate, forming an enzyme–substrate complex. After the reaction, products are released and the enzyme is available for reuse.",
    "negative_marking": 0,
    "difficulty": "${diff}",
    "options": null,
    "correct": null,
    "explanation": null
  }
]`;
  }

  if (examFormat === 'ib') {
    const mcqCount = Math.ceil(count * 0.6);
    const structCount = count - mcqCount;

    return `You are an expert IB Diploma examiner. Generate ${count} exam questions on the topic "${topicName}" for IB Diploma (exam code ${examCode}).

Generate exactly ${mcqCount} MCQ questions (Paper 1 style) and ${structCount} structured questions (Paper 2 style).

Requirements:
- Board: International Baccalaureate Diploma Programme
- Difficulty: ${diff}
- MCQ: exactly 4 options A–D, no negative marking, 1 mark, single correct answer
- Structured: use IB command terms (State, Outline, Describe, Explain, Discuss, Evaluate, Deduce), 2–6 marks, mark scheme with bullet points, include model answer
- Questions must be accurate and specific to "${topicName}"

Return ONLY a valid JSON array — no markdown fences, no preamble, no trailing text:
[
  {
    "qtype": "mcq_single",
    "stem": "Which of the following statements about ... is correct?",
    "options": [
      {"id": "A", "text": "..."},
      {"id": "B", "text": "..."},
      {"id": "C", "text": "..."},
      {"id": "D", "text": "..."}
    ],
    "correct": "C",
    "explanation": "C is correct because...",
    "marks": 1,
    "negative_marking": 0,
    "difficulty": "${diff}",
    "command_word": null,
    "mark_scheme": null,
    "model_answer": null
  },
  {
    "qtype": "structured",
    "stem": "Explain the role of enzymes in metabolic pathways. [4]",
    "command_word": "Explain",
    "marks": 4,
    "mark_scheme": [
      {"point": "enzymes are proteins / biological catalysts", "marks": 1},
      {"point": "lower activation energy allowing reactions at physiological temperatures", "marks": 1},
      {"point": "highly specific — active site complementary to one substrate only", "marks": 1},
      {"point": "enable control and regulation of metabolic pathways", "marks": 1}
    ],
    "model_answer": "Enzymes are proteins acting as biological catalysts that lower the activation energy of metabolic reactions, allowing them to proceed at physiological temperatures. Each enzyme is highly specific, with an active site complementary to only one substrate, enabling precise control and regulation of metabolic pathways within cells.",
    "negative_marking": 0,
    "difficulty": "${diff}",
    "options": null,
    "correct": null,
    "explanation": null
  }
]`;
  }

  // Generic MCQ fallback
  return `You are an expert examiner. Generate ${count} exam-style MCQ questions on the topic "${topicName}".

Requirements:
- Difficulty: ${diff}
- Exactly 4 options A–D, 1 mark each, no negative marking
- Clear stem, one unambiguous correct answer, brief explanation

Return ONLY a valid JSON array — no markdown fences, no preamble:
[
  {
    "qtype": "mcq_single",
    "stem": "Which of the following is correct regarding...?",
    "options": [
      {"id": "A", "text": "..."},
      {"id": "B", "text": "..."},
      {"id": "C", "text": "..."},
      {"id": "D", "text": "..."}
    ],
    "correct": "A",
    "explanation": "A is correct because...",
    "marks": 1,
    "negative_marking": 0,
    "difficulty": "${diff}",
    "command_word": null,
    "mark_scheme": null,
    "model_answer": null
  }
]`;
}

async function callGemini(prompt) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error('GEMINI_API_KEY not set');

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;
  console.log('[GenQ] POST → Gemini, prompt length:', prompt.length);

  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
  });

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`Gemini error (${resp.status}): ${err.slice(0, 200)}`);
  }

  const data = await resp.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Gemini returned empty response — possible safety filter');

  // Strip markdown fences if Gemini wraps in ```json ... ```
  const cleaned = text.replace(/^```(?:json)?\s*/m, '').replace(/\s*```\s*$/m, '').trim();
  return JSON.parse(cleaned);
}

function validateQuestion(q, topicKey, examCode, meta) {
  if (!q || typeof q !== 'object' || !q.stem || !q.qtype) return null;

  const isMcq = q.qtype === 'mcq_single' || q.qtype === 'mcq_multi';
  const isStructured = q.qtype === 'structured' || q.qtype === 'written';

  if (isMcq && (!Array.isArray(q.options) || q.options.length < 2)) return null;
  if (isMcq && !q.correct) return null;
  if (isStructured && !Array.isArray(q.mark_scheme)) return null;

  return {
    topic_key: topicKey,
    exam_code: examCode,
    board: meta.board,
    level: meta.level,
    paper: meta.paper,
    source: 'ai_generated',
    is_shared: true,
    created_by: null,
    qtype: q.qtype,
    stem: String(q.stem).slice(0, 2000),
    options: isMcq ? q.options : null,
    correct: isMcq ? q.correct : null,
    explanation: q.explanation ? String(q.explanation).slice(0, 1000) : null,
    marks: typeof q.marks === 'number' && q.marks > 0 ? q.marks : 1,
    negative_marking: typeof q.negative_marking === 'number' ? q.negative_marking : 0,
    command_word: q.command_word || null,
    mark_scheme: isStructured ? q.mark_scheme : null,
    model_answer: q.model_answer ? String(q.model_answer).slice(0, 2000) : null,
    difficulty: ['easy', 'medium', 'hard'].includes(q.difficulty) ? q.difficulty : 'medium',
  };
}

// Exported so api/admin.js can reuse without a second Gemini call
export async function generateAndInsert({ topicKey, examCode, topicName, count = 5, difficulty = 'medium', adminSb }) {
  const examFormat = detectExamFormat(examCode);
  const meta = deriveMetadata(examCode);
  const prompt = buildGeminiPrompt({ topicName, examCode, examFormat, count, difficulty });

  let rawArr;
  try {
    rawArr = await callGemini(prompt);
  } catch (err) {
    console.error('[GenQ] Gemini call failed for', topicKey, ':', err.message);
    return { generated: 0, questions: [], error: err.message };
  }

  if (!Array.isArray(rawArr)) {
    console.error('[GenQ] Non-array response for', topicKey);
    return { generated: 0, questions: [], error: 'Gemini returned non-array JSON' };
  }

  const validated = rawArr.map(q => validateQuestion(q, topicKey, examCode, meta)).filter(Boolean);
  if (!validated.length) {
    return { generated: 0, questions: [], error: 'No questions passed validation' };
  }

  const { data: inserted, error: insertErr } = await adminSb.from('questions').insert(validated).select();
  if (insertErr) {
    console.error('[GenQ] Insert error:', insertErr.message);
    return { generated: 0, questions: [], error: insertErr.message };
  }

  console.log(`[GenQ] Inserted ${inserted.length} questions for ${topicKey}`);
  return { generated: inserted.length, questions: inserted };
}

export default async function handler(req, res) {
  applyCors(req, res);
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Missing Authorization header' });

  const adminSb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const { data: { user }, error: authError } = await adminSb.auth.getUser(token);
  if (authError || !user) return res.status(401).json({ error: 'Invalid or expired session' });

  // Subscription tier + status check — this route generates and shares content
  // (is_shared: true) and calls a paid Gemini API, so it must not be reachable
  // by free-tier accounts just because they hold a valid JWT.
  const { data: sub, error: subErr } = await adminSb
    .from('subscriptions')
    .select('tier, status')
    .eq('user_id', user.id)
    .single();

  if (subErr || !sub || sub.status !== 'active') {
    return res.status(403).json({ error: 'Account not active.', code: 'INACTIVE' });
  }

  const pqLimit = PQ_LIMITS[sub.tier] ?? 0;
  if (pqLimit === 0) {
    return res.status(403).json({
      error: 'AI-generated practice questions require a paid plan.',
      code: 'UPGRADE_REQUIRED',
    });
  }

  // Monthly quota via atomic RPC (same mechanism as api/gemini.js)
  const monthYear = new Date().toISOString().slice(0, 7);
  const { data: pqUsage, error: pqRpcErr } = await adminSb.rpc('increment_ai_usage', {
    p_user_id: user.id,
    p_call_type: 'practice_questions',
    p_month_year: monthYear,
    p_limit: pqLimit,
  });
  if (pqRpcErr) {
    console.error('[GenQ] increment_ai_usage RPC error:', pqRpcErr);
    return res.status(500).json({ error: 'Usage tracking failed.' });
  }
  if (pqUsage?.blocked) {
    return res.status(429).json({
      error: `Monthly AI question-generation limit of ${pqLimit} reached. Resets 1st of next month.`,
      code: 'QUOTA_EXCEEDED',
    });
  }

  // Per-minute burst protection
  const now = Date.now();
  let requests = rateLimitMap.get(user.id) || [];
  requests = requests.filter(time => now - time < 60000);
  if (requests.length >= 10) {
    return res.status(429).json({ error: 'Too many requests. Please wait a minute.' });
  }
  requests.push(now);
  rateLimitMap.set(user.id, requests);

  const { topic_key, exam_code, topic_name, count = 5, difficulty = 'medium' } = req.body || {};
  if (!topic_key || !exam_code || !topic_name) {
    return res.status(400).json({ error: 'topic_key, exam_code, and topic_name are required' });
  }

  console.log(`[GenQ] User ${user.id} requesting ${count} questions for ${topic_key}`);

  const result = await generateAndInsert({
    topicKey: topic_key,
    examCode: exam_code,
    topicName: topic_name,
    count: Math.min(Math.max(1, count), 10),
    difficulty,
    adminSb,
  });

  return res.status(200).json(result);
}
