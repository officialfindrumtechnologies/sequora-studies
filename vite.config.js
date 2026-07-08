import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Parse .env file if it exists
try {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const envPath = path.resolve(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)$/);
      if (match) {
        const key = match[1].trim();
        let val = match[2].trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.substring(1, val.length - 1);
        }
        process.env[key] = val;
      }
    });
  }
} catch (e) {
  console.warn('Failed to parse .env file in vite.config.js:', e);
}

// Dev middleware plugin: serves /api/gemini locally using the Vercel serverless function handler
function apiDevMiddleware() {
  return {
    name: 'api-dev-middleware',
    configureServer(server) {
      server.middlewares.use('/api', async (req, res) => {
        if (req.method === 'OPTIONS') {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
          res.statusCode = 200;
          res.end();
          return;
        }

        // Collect request body
        let body = '';
        for await (const chunk of req) {
          body += chunk;
        }
        req.rawBody = body;

        try {
          req.body = JSON.parse(body);
        } catch {
          req.body = {};
        }

        // Parse endpoint name (e.g., /api/admin -> admin)
        // Since middleware is mounted at '/api', req.url is relative to that (e.g. '/admin')
        const parsedUrl = new URL(req.url, 'http://localhost');
        const endpoint = parsedUrl.pathname.replace(/^\//, '');

        // Populate req.query for serverless handlers expecting query params
        req.query = Object.fromEntries(parsedUrl.searchParams);

        // Dynamically import the serverless handler (ESM)
        try {
          const mod = await import(`./api/${endpoint}.js`);
          const handler = mod.default;

          // Wrap res to support Vercel-style res.status().json()/.end()/.send()
          const origEnd = res.end.bind(res);
          res.status = (code) => { res.statusCode = code; return res; };
          res.json = (data) => {
            res.setHeader('Content-Type', 'application/json');
            origEnd(JSON.stringify(data));
          };
          res.send = (body) => {
            if (body instanceof Buffer || typeof body === 'string') {
              origEnd(body);
            } else {
              res.setHeader('Content-Type', 'application/json');
              origEnd(JSON.stringify(body));
            }
          };

          await handler(req, res);
        } catch (err) {
          console.error(`[Dev API Middleware] Error loading ${endpoint}:`, err);
          res.statusCode = 404;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: `Not found or dev middleware error: ${err.message}` }));
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [apiDevMiddleware()],
  server: {
    port: 3000
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',   // landing page — served at /
        app: 'app.html',      // study app — served at /app
        admin: 'admin.html',
      }
    }
  }
});
