// Shared CORS helper — the site can now be reached from multiple production
// origins (custom domain, www, and the vercel.app fallback), so a single
// hardcoded Access-Control-Allow-Origin string would break requests from
// whichever origin isn't the exact configured value. Echo back the request's
// Origin header only if it's in the allowlist.
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

export function applyCors(req, res) {
  const origin = req.headers.origin;
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]);
  res.setHeader('Vary', 'Origin');
}
