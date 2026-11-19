// Cloudflare Worker: Gemini kalitini yashirib turadi.
// Variables: GEMINI_API_KEY (Secret), ALLOWED_ORIGIN (masalan https://username.github.io), GEMINI_MODEL (ixtiyoriy)
export default {
  async fetch(req, env) {
    const cors = {
      'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    };
    const json = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { ...cors, 'Content-Type': 'application/json' } });
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (req.method !== 'POST') return json({ error: 'Faqat POST' }, 405);
    try {
      const { prompt } = await req.json();
      if (!prompt || prompt.length > 12000) return json({ error: 'Noto\'g\'ri so\'rov' }, 400);
      const model = env.GEMINI_MODEL || 'gemini-2.5-flash';
      const r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.3, responseMimeType: 'application/json' } })
      });
      const j = await r.json();
      if (!r.ok) return json({ error: (j.error && j.error.message) || 'Gemini xatosi' }, r.status);
      return json({ text: j.candidates[0].content.parts.map(p => p.text || '').join('') });
    } catch (e) {
      return json({ error: String(e) }, 500);
    }
  }
};
