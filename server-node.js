const http = require('http');
const os = require('os');

const port = 3000;

// Función para obtener la primera IP local no interna
function getLocalIp() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'No disponible';
}

const server = http.createServer((req, res) => {
  const ip = getLocalIp();
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(`Hola Mundo!\nMi IP local es: ${ip}`);
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



