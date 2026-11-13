const CACHE_NAME = 'langa-complex-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/manifest.json',
  '/images/bread.jpg',
  '/images/scones.jpg',
  '/images/muffins.jpg',
  '/images/biscuits.jpg'
];

// Install Service Worker and Cache Core Files
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Serve Cached Content when Offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
