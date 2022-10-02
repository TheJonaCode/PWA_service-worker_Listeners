// Detectar si podemos usar Service Workers
if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js')
        .then(reg => {
            setTimeout(() => {
                reg.sync.register('posteo');
                console.log('Se enviaron fotos');
            }, 3000);

        });
}

// fetch('https://reqres.in/api/users')
//     .then(resp => resp.text())
//     .then(console.log);