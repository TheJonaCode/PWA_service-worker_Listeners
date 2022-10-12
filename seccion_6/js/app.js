if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js');
};
/*
if (window.caches) {
    caches.open('prueba-1');
    caches.open('prueba-2');
    //caches.has('prueba-3').then(console.log);
    //caches.delete('prueba-2').then(console.log);
    caches.open('cache_v1.1').then(cache => {
        //cache.add('/index.html');
        cache.addAll([
            '/index.html',
            '/css/style.css',
            '/img/main.jpg'
        ]).then(() => {
            //cache.delete('/css/style.css');
            cache.put('index.html', new Response('Hello World'));
        });

        cache.match('/index.html')
            .then(resp => {
                resp.text().then(console.log);
        });

        cache.keys().then(keys => {
            console.log(keys);
        });
    });
};*/