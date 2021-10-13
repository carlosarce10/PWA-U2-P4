const CACHE_NAME = "cache-v1";
const CACHE_STATIC_NAME = "static-v1";
const CACHE_DYNAMIC_NAME = "dynamic-v1";
const CACHE_INMUTABLE_NAME = "inmutable-v1";
console.log("Sw: instalado");

function cleanCache(cacheName, sizeItems){
    caches.open(cacheName)
    .then(cache =>{
        cache.keys()
        .then(keys => {
            console.log(keys);
            if(keys.length >= sizeItems){
                cache.delete(keys[0]).then(() => {
                    cleanCache(CACHE_DYNAMIC_NAME,sizeItems);
                })
            }
        });
    });
}

self.addEventListener("install",(event) =>{
    //crear caché y almacenar nuestro APPSHELL
    const promesaCache = caches.open(CACHE_STATIC_NAME)
    .then(cache =>{
        return cache.addAll([
            "/",
            "index.html",
            "css/page.css",
            "img/Inicio.jpg",
            "js/app.js"
        ]);
    });

    const promInmutable = caches.open(CACHE_INMUTABLE_NAME)
    .then(cacheInmutable =>{
        return cacheInmutable.addAll([
            "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
        ]);
    });
    event.waitUntil(Promise.all([promesaCache,promInmutable]));

    event.waitUntil(promesaCache);
});

self.addEventListener("fetch", (event)=>{
    //2 Cache with network fallback
    //Primero busca en caché, si no lo encuentra, va a la red'
    const respuestaCache = caches.match(event.request)
    .then(resp => {
        //si mi respuesta existe en caché
        if(resp){
            return resp;
        }
        console.log("No está en caché",event.request.url);
        return fetch(event.request)
        .then(respNet => {
            caches.open(CACHE_DYNAMIC_NAME)
            .then(cache => {
                //guardo la respuesta de red en caché
                console.log(event.request);
                cache.put(event.request,respNet);
                cleanCache(CACHE_DYNAMIC_NAME,5)
            });
            //regreso la respuesta de la red
            return respNet.clone();
        });
    })
    event.respondWith(respuestaCache);

    //1 Only caché
    // event.respondWith(caches.match(event.request));
});