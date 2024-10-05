/**
 * Esta aplicacion consiste en tener clientes que envian mensajes
 * y el servidor los reenvia a todos los clientes conectados
 */

const WebSocket = require('ws'); // Importamos el modulo de websocket

// Puertos recomendados para websocket entre 1500 y 9999
// Del 0 al 1500 estan tomados por algunas funciones del sistema

const webSocketServer = new WebSocket.Server({ port: 8000}); // Puertos TCP

// Se ejecuta cuando se detecte una nueva conexion de socket
webSocketServer.on('connection', (socket) => {

    // Espera hasta recibir un mensaje de parte del cliente
    socket.on('message', (message) => {

        // Broadcast (envia el mensaje recibido a todos los clientes)
        webSocketServer.clients.forEach((client) => {

            // Obtenemos todos los clientes conectados en el momento
            if(client.readyState === socket.OPEN) {

                // Enviamos el mensaje
                client.send(message.toString()); 
            }
        })
    })
})
