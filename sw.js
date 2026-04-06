/* ============================================
   SERVICE WORKER
   Offline support and caching
   ============================================ */

const CACHE_NAME = 'birthday-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/css/theme.css',
  '/css/animations.css',
  '/css/components.css',
  '/js/config.js',
  '/js/birthday.js',
  '/js/signature.js',
  '/js/wishes.js',
  '/js/memory-lane.js',
  '/js/share.js',
  '/assets/audio/hbd.mp3',
  '/assets/images/img.png',
  '/assets/images/img2.png'
];

// Install - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
