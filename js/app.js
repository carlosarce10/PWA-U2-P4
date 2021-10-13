if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw1.js');
}


// if (window.caches) {
//     console.log("tenemos caché");
//     //si no existe, lo crea la instrucción caches.open
//     caches.open('prueba')
//     caches.open('prueba-v2')
//     caches.open('prueba-v3')


//     caches.has('prueba').then((response)=>{
//         console.log(response);
//     })

//     caches.open('cache-v1').
//         then((cache)=>{
//             //cache.add('/index.html')
//             cache.addAll([
//                 '/index.html',
//                 '/css/page.css',
//                 '/img/inicio.png',
//                 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
//             ]).then(()=>{
//                 //cache.delete('/css/page.css')
//                 cache.put('/index.html', new Response('Actualizado desde caché'))
//             });
//             cache.match('index.html').then((response)=>{
//                 response.text().then((text)=>{
//                     console.log(text);
//                 })
//                 console.log(response);
//             })
            
//         });

//     caches.keys().then((keys)=>{
//         console.log(keys);
//     })
// }