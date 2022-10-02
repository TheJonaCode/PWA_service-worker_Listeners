// Detectar si podemos usar Service Workers
if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js')
        .then(reg => {
            // setTimeout(() => {
            //     reg.sync.register('posteo-gatitos');
            //     console.log('se enviaron fotos');
            // }, 3000);
            Notification.requestPermission().then(result => {
                console.log(result);
                reg.showNotification('Hello world!');

            });
        });
}

// fetch('https://reqres.in/api/users')
//     .then(resp => resp.text())
//     .then(console.log);