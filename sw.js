// Ciclo de vida del SW

self.addEventListener('install', event => {
    console.log('instalando sw :)');

    const instalacion = new Promise((resulve, reject) => {
        setTimeout(() => {
            console.log('SW: Instalaciones terminadas');
            self.skipWaiting();
            resolve();
        }, 1000);

    });

    event.waitUntil(instalacion);

});

//Cuando el SW toma el control de la app
self.addEventListener('activate', event => {
    console.log(':) activo y listo');
});