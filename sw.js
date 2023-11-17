console.log('Service worker is running...')

self.addEventListener("install", (event) => {
    console.log('[Service Worker] Installing...');
    event.waitUntil(caches.open('static')
        .then((cache) => {
            console.log('[Service Worker] Precaching App Shell')
            cache.add('/')
            cache.add('/index.html')
            cache.add('/css/style.css')
            cache.add('/js/app.js')
            cache.add('/sw.js')
            cache.add('/images/166-500x300.jpg')
            cache.add('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600')
        })
    )
});

self.addEventListener("activate", (event) => {
    console.log('[Service Worker] Activating...')
    return self.clients.claim()
});

self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);
    //console.log('fetch url: ', url)
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if(response) {
                    return response
                }
                else {
                    return fetch(event.request)
                }
            })
            .catch(err => {
                console.log(err)
            })
    )
});