const CACHE_STATIC_NAME = 'static-v5';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const CACHE_INMUTABLE_NAME = 'inmutable-v1';
const CACHE_DYNAMYX_LIMIT = 50;

function limpiarCache(cacheName, numeroItems) {
    cache.open(cacheName)
        .then(cache => {
            return cache.keys()
                .then(keys => {
                    if (keys.length = numeroItems) {
                        cache.delete(keys[0])
                            .then(limpiarCache(cacheName, numeroItems));
                    }
                });
        });
};
self.addEventListener('install', e => {
    const cacheProm = caches.open(CACHE_STATIC_NAME).then(cache => {
        return cache.addAll([
            '/',
            '/index.html',
            '/css/style.css',
            'img/main.jpg',
            '/js/app.js',
            '/img/no-image.jpg',
            '/pages/offline.html',
        ]);
    });
    const cacheInmutable = caches.open(CACHE_INMUTABLE_NAME)
        .then(cache => cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'));
    e.waitUntil(Promise.all([cacheProm, cacheInmutable]));
});

self.addEventListener('activate', e => {
    const respuesta = caches.keys().then(keys => {
        keys.forEach(key => {
            if (key != CACHE_STATIC_NAME && key.includes('static')) {
                return caches.delete(key);
            }
        });
    })

    e.waitUntil(respuesta);
});


self.addEventListener('fetch', e => {
    const respuestaCache = caches.match(e.request)
        .then(resp => {
            if (resp) return resp;
            //no existe archivo
            console.log('No existe', e.request.url);
            return fetch(e.request).then(newResp => {
                caches.open(CACHE_DYNAMIC_NAME)
                    .then(cache => {
                        cache.put(e.request, newResp);
                        limpiarCache(CACHE_DYNAMIC_NAME, 10);
                        limpiarCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMYX_LIMIT);
                    });
                return newResp.clone();
            }).catch(error => {
                if (e.request.headers.get('accept').includes('text/html')) {
                    return caches.match('/pages/offline.html')
                }
            });
        });

    e.respondWith(respuestaCache);

});