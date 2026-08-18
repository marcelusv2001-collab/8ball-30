const CACHE_NAME = 'mvp-tv-v2'; // Incremented version to force update

const ASSETS = [
  './',              // Caches index.html in the current subdirectory
  './index.html',
  './8ball.html',
  './9ball.html',
  './8ball-18.html', // Added your new 18-point app
  './8ball-30.html',
  './bracket maker.html',
  './tuesday-8ball-18.html',
  './shays-leaderboard.html',
    './controller.html',
  './manifest.json',
  './sw.js',         // Cache the service worker itself
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
];

// Install stage: uses relative paths to find your files in /pool-scorer/
self.addEventListener('install', (e) => {
  self.skipWaiting(); // Forces the new service worker to become active immediately
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching assets');
      return cache.addAll(ASSETS);
    })
  );
});

// Activate stage: cleans up old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    })
  );
});

// Fetch stage: serves cached content first, then network
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});



