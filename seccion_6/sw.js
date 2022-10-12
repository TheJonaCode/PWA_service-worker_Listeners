self.addEventListener('fetch', event => {

    const offlineResp = new Response(`
        Bienvenido a mi Página Web
        necesitas conexión a internet para entrar.
    `);

    const resp = fetch(event.request)
        .catch(() => offlineResp);


    event.respondWith(resp);

});