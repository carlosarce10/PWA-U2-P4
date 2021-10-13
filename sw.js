self.addEventListener('install', () => {
    console.log('SERVICE WORKER INSTALADO')
});

self.addEventListener('fetch', (event) => {
    // const RESPOFF = new Response(`
    //     Bienvenido a la página en modo offline
    //     para poder usar la app, necesitas conexión a internet
    // `);

    // const respoffHtml = new Response(`
    //         <!DOCTYPE html>
    //         <html lang="en">

    //         <head>
    //         <meta charset="UTF-8">
    //         <meta http-equiv="X-UA-Compatible" content="IE=edge">
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //         <title>PWA | Cachés</title>
                
    //             <link rel="stylesheet" href="css/page.css">
    //         </head>

    //         <body>
    //          <h1>Página sin conexión</h1>
    //             <p>Para utilizar la aplicación debes tener conexión a internet</p>
    //             <script src="js/app.js"></script>
    //         </body>

    //         </html>
    //         `,{
    //             headers:{
    //                 'Content-Type':'text/html'
    //             }
    //         })
    
    const responseOfflineFile = fetch('pages/view-offline.html');     
 



    const respuesta = fetch(event.request).
        catch((error) => {
            console.log("SW: Error en la petición");
            return responseOfflineFile;
        });

    console.log(event.request.url);
    //Responder
    event.respondWith(respuesta);
})