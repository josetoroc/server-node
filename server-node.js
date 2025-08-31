// Importamos los módulos nativos de Node.js
const http = require('http'); // Para levantar un servidor HTTP
const os = require('os');     // Para obtener información del sistema operativo (interfaces de red)

const port = 3000; // Puerto en el que escuchará el servidor

// Función que obtiene la primera dirección IP local (IPv4, no interna)
// Esto recorre todas las interfaces de red y retorna la IP que corresponde a la red de la VPC
function getLocalIp() {
  const nets = os.networkInterfaces(); // Devuelve todas las interfaces de red de la máquina
  for (const name of Object.keys(nets)) {   // Recorremos cada interfaz (eth0, ens5, etc.)
    for (const net of nets[name]) {         // Cada interfaz puede tener varias direcciones (IPv4, IPv6)
      // Condición: nos quedamos con la primera IPv4 que no sea "interna" (ej. no 127.0.0.1)
      if (net.family === 'IPv4' && !net.internal) {
        return net.address; // Retornamos la IP encontrada
      }
    }
  }
  return 'No disponible'; // Si no encontramos ninguna, devolvemos este texto
}

// Creamos el servidor HTTP
const server = http.createServer((req, res) => {
  const ip = getLocalIp(); // Obtenemos la IP local de la instancia
  res.statusCode = 200; // Código 200 = OK
  res.setHeader('Content-Type', 'text/plain'); // Indicamos que la respuesta será texto plano
  // Respondemos al navegador con dos líneas
  res.end(`Hola Mundo!\nMi IP local es: ${ip}`);
});

// Ponemos el servidor a escuchar en el puerto indicado
server.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
  console.log(`Prueba en el navegador: http://<IP-de-la-instancia>:${port}/`);
});

