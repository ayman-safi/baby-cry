console.log('[Service Worker] Initializing...');

self.addEventListener('install', event => {
    console.log('[Service Worker] Installing...', event);
    event.waitUntil(self.skipWaiting()); // Activate immediately
});

self.addEventListener('activate', event => {
    console.log('[Service Worker] Activated!', event);
    event.waitUntil(self.clients.claim()); // Take control of all pages
});

self.addEventListener('fetch', event => {
    console.log('[Service Worker] Fetching:', event.request.url);

    event.respondWith(
        fetch(event.request)
            .then(response => {
                console.log('[Service Worker] Fetch successful:', response);
                return response;
            })
            .catch(error => {
                console.error('[Service Worker] Fetch failed:', error);
                return new Response('Service Worker Fetch Failed', { status: 500 });
            })
    );
});
