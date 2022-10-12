//const CACHE_NAME = 'cache-1';
const CACHE_STATIC_NAME = 'static-v2';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const CACHE_INMUTABLE_NAME = 'inmutable-v1';
const CACHE_DINAMYC_LIMIT = 50;

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
        ]);
    });
    const cacheInmutable = caches.open(CACHE_INMUTABLE_NAME)
        .then(cache => cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'));
    e.waitUntil(Promise.all([cacheProm, cacheInmutable]));
});

self.addEventListener('fetch', e => {
    //Cache & Network Race
    const respuesta = new Promise((resolve, reject) => {
        let rechazada = false;
        const falloUnavez = () => {
            if (rechazada) {
                if (/\.(png|jpg)$/i.test(e.request.url)) {
                    resolve(caches.match('/img/no-image.jpg'));
                } else {
                    reject('no se encontro respuesta')
                }
            } else {
                rechazada = true;
            }
        }
        fetch(e.request).then(res => {
            res.ok ? resolve(res) : falloUnavez();
        }).catch(falloUnavez);
        caches.match(e.request).then(res => {
            res ? resolve(res) : falloUnavez();
        }).catch(falloUnavez);
    });

    e.repondWith(respuesta);
    //Cache Only
    //e.respondWith(caches.match(e.request));

    //Cache with network fallback
    /*const respuestaCache = caches.match(e.request)
        .then(resp => {
            if (resp) return resp;
            //No existe archivo
            console.log('No existe', e.request.url);
            return fetch(e.request).then(newResp => {
                caches.open(CACHE_DYNAMIC_NAME)
                    .then(cache => {
                        cache.put(e.request, newResp);
                        limpiarCache(CACHE_DYNAMIC_NAME, 10);
                    });
                return newResp.clone();
            });
        });

    e.respondWith(respuestaCache);*/

    //Network with cache fallback
    /*const respuesta = fetch(e.request).then(res => {
        console.log('fetch', res);
        caches.open(CACHE_DYNAMIC_NAME)
            .then(cache => {
                cache.put(e.request, res);
                limpiarCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMYC_LIMIT);
            });
        return res.clone();
    }).catch(error => {
        return caches.match(e.request);
    });

    e.respondWith(respuesta);*/

    //Cache with network update
    /*if (e.request.url.includes('bootstrap')) {
        return respondWith(caches.match(e.request));
    }
    const respuesta = caches.open(CACHE_STATIC_NAME).then(cache => {
        fetch(e.request).then(newResp =>
            cache.put(e.request, newResp));
        return cache.match(e.request);
    })

    e.respondWith(respuesta);*/

});