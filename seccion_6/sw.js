self.addEventListener('install', e => {
    const cacheProm = caches.open('CACHE_NAME').then(cache => {
        return cache.addAll([
            '/',
            '/index.html',
            '/css/style.css',
            'img/main.jpg',
            'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
            '/js/app.js'
        ]);
    });
    e.waitUntil(cacheProm);
});

self.addEventListener('fetch', e => {
    //Cache Only
    //e.respondWith(caches.match(e.request));

    //Cache with network fallback
    const respuestaCache = caches.match(e.request)
        .then(resp => {
            if (resp) return resp;
            //No existe archivo
            console.log('No existe', e.request.url);
            return fetch(e.request).then(newResp => {
                caches.open(CACHE_NAME)
                    .then(cache => {
                        cache.put(e.request, newResp);
                    });
                return newResp.clone();
            });
        });

    e.respondWith(respuestaCache);
});