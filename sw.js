// Ciclo de vida del SW

self.addEventListener('install', event => {
    console.log('instalando sw :)');

    const instalacion = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('SW: Instalaciones terminadas');
            self.skipWaiting();
            resolve();
        }, 1);

    });

    event.waitUntil(instalacion);

});

//Cuando el SW toma el control de la app
self.addEventListener('activate', event => {
    console.log(':) activo y listo');
});


//FETCH
self.addEventListener('fetch', event => {
    console.log('SW: ', event.request.url);

    if (event.request.url.includes('https://reqres.in/')) {
        const resp = new Response(`{ok: false, mensaje: 'xd'}`);

        event.respondWith(resp);
    }
});