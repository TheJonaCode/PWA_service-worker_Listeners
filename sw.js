// Ciclo de vida del SW

self.addEventListener('install', event => {
    console.log('instalando sw :)');

});

//Cuando el SW toma el control de la app
self.addEventListener('activate', event => {
    console.log(':) activo y listo');
});