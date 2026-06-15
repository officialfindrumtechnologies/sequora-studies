import { defineConfig } from 'vite';

// Dev middleware plugin: serves /api/gemini locally using the Vercel serverless function handler
function apiDevMiddleware() {
  return {
    name: 'api-dev-middleware',
    configureServer(server) {
      server.middlewares.use('/api/gemini', async (req, res) => {
        if (req.method === 'OPTIONS') {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
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

        try {
          req.body = JSON.parse(body);
        } catch {
          req.body = {};
        }

        // Dynamically import the serverless handler (ESM)
        try {
          const mod = await import('./api/gemini.js');
          const handler = mod.default;

          // Wrap res to support Vercel-style res.status().json()/.end()
          const origEnd = res.end.bind(res);
          res.status = (code) => { res.statusCode = code; return res; };
          res.json = (data) => {
            res.setHeader('Content-Type', 'application/json');
            origEnd(JSON.stringify(data));
          };

          await handler(req, res);
        } catch (err) {
          console.error('[Dev API Middleware] Error:', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Dev middleware error: ' + err.message }));
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
        main: 'index.html',
        landing: 'landing.html',
        admin: 'admin.html',
      }
    }
  }
});
