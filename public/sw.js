// Bumped so the activate handler drops caches written under the old
// cache-first-for-everything policy.
const CACHE = 'sequora-v2';
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

  // Built assets carry a content hash (app-hqbVIm-U.js), so their URL changes
  // whenever their contents do and cache-first is always safe. Files served
  // straight from public/ do not, so cache-first pins them forever — a change
  // to topic-3d-functions.js would never reach anyone who had already loaded
  // it. Those go network-first and fall back to cache when offline.
  // Matching the hash pattern in the filename is not reliable — the hyphen in
  // "topic-3d-functions.js" makes it look hashed, and that is exactly the file
  // this needs to keep fresh. The build emits hashed output to /assets/ and
  // nothing else lands there, so the directory is the signal.
  const immutable = url.origin === self.location.origin
                 && url.pathname.startsWith('/assets/');

  event.respondWith(
    caches.open(CACHE).then(async cache => {
      const cached = await cache.match(request);
      const networkFetch = fetch(request)
        .then(res => { if (res.ok) cache.put(request, res.clone()); return res; })
        .catch(() => null);
      if (immutable) return cached ?? await networkFetch;
      return (await networkFetch) ?? cached;
    })
  );
});
