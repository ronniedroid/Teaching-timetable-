const CACHE = 'teaching-timetable-v4';
const FILES = ['/', '/manifest.webmanifest', '/icon-192.png', '/icon-512.png'];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.all(FILES.map(async path => {
      try {
        const response = await fetch(path, {credentials: 'same-origin'});
        if (response.ok && new URL(response.url).origin === self.location.origin) {
          await cache.put(path, response);
        }
      } catch {}
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name !== CACHE).map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  if (event.request.mode !== 'navigate') return;
  event.respondWith((async () => {
    try {
      const response = await fetch(event.request);
      if (response.ok && new URL(response.url).origin === self.location.origin) {
        const cache = await caches.open(CACHE);
        await cache.put('/', response.clone());
      }
      return response;
    } catch {
      return (await caches.match('/')) || Response.error();
    }
  })());
});
