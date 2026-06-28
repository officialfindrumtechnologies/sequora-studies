const CACHE = 'sequora-v1';
const STATIC = ['/app', '/app.html', '/manifest.json'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(STATIC))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  if (
    request.method !== 'GET' ||
    url.hostname.includes('supabase') ||
    url.hostname.includes('resend') ||
    url.pathname.startsWith('/api/') ||
    url.protocol === 'chrome-extension:'
  ) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(request, clone));
          return res;
        })
        .catch(() =>
          caches.match(request).then(cached => cached || caches.match('/app.html'))
        )
    );
    return;
  }

  event.respondWith(
    caches.open(CACHE).then(async cache => {
      const cached = await cache.match(request);
      const networkFetch = fetch(request)
        .then(res => { if (res.ok) cache.put(request, res.clone()); return res; })
        .catch(() => null);
      return cached ?? await networkFetch;
    })
  );
});
