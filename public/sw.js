const CACHE = 'sequora-v1';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const { request } = e;
  const url = new URL(request.url);

  // Never cache: Supabase, API routes, chrome-extension etc.
  if (
    url.hostname.includes('supabase') ||
    url.hostname.includes('resend') ||
    url.pathname.startsWith('/api/') ||
    url.protocol === 'chrome-extension:'
  ) {
    e.respondWith(fetch(request));
    return;
  }

  // Navigation (HTML pages): network-first, fall back to cached /index.html
  if (request.mode === 'navigate') {
    e.respondWith(
      fetch(request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(request, clone));
          return res;
        })
        .catch(() =>
          caches.match(request)
            .then(cached => cached || caches.match('/index.html'))
        )
    );
    return;
  }

  // Static assets: stale-while-revalidate
  e.respondWith(
    caches.open(CACHE).then(async cache => {
      const cached = await cache.match(request);
      const networkFetch = fetch(request)
        .then(res => { if (res.ok) cache.put(request, res.clone()); return res; })
        .catch(() => null);
      return cached ?? await networkFetch;
    })
  );
});
