const http = require('http');

// Puerto de escucha
const port = 3000;

// Función para obtener la IP pública desde la metadata de AWS
function obtenerIpPublica(callback) {
  http.get('http://169.254.169.254/latest/meta-data/public-ipv4', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => callback(data));
  }).on('error', (err) => {
    console.error('Error al obtener IP pública:', err.message);
    callback('No disponible');
  });
}

// Crear servidor
const server = http.createServer((req, res) => {
  obtenerIpPublica((ipPublica) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Hola Mundo!\nMi IP es: ${ipPublica}`);
  });
});

// Levantar servidor
server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});


