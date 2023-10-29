console.log('Service worker is running...')

self.addEventListener("install", (event) => {
    console.log('[Service Worker] Installing...')
});

self.addEventListener("activate", (event) => {
    console.log('[Service Worker] Activating...')
    return self.clients.claim()
});

self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);
    console.log('fetch url: ', url)
});