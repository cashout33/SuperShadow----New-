import express from 'express';
import cors from 'cors';
import mime from 'mime';
import createBareServer from '@tomphttp/bare-server-node'; // The latest version of tomphttp's bare server does not work. We are using v1.2.2
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import http from 'node:http';
import * as url from 'node:url';
import * as path from 'node:path';

const app = express();
const server = http.createServer();
const port = process.env.PORT || process.argv[2] || 8080;
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

app.use(express.static(path.join(__dirname, '/static'), { extensions: ['html'] }));
app.use('/uv/', express.static(uvPath));

app.get('/assets/games/*', cors({ origin: false }), async (req, res, next) => {
  const reqTarget = `https://raw.githubusercontent.com/IncorHosting/IncorAssets/main/${req.path.replace('/assets/games/', '')}`;

  const asset = await fetch(reqTarget);
  if (asset.status == 200) {
    var data = Buffer.from(await asset.arrayBuffer());

    res.writeHead(200, {
      'content-type': mime.getType(reqTarget)
    });

    if (mime.getType(reqTarget) === 'text/html') {
      data = data + '<script src="/assets/js/inject.js" preload="true"></script>';
    }

    res.end(data);
  } else {
    next();
  }
});

app.get('/discord', (req, res) => res.redirect('https://discord.gg/uphBNeSjUy'));
app.get('/github', (req, res) => res.redirect('https://github.com/IncorHosting/IncorHosting'));

app.use((req, res) => res.status(404).sendFile(path.join(__dirname, './static/', '404.html')));

const bare = createBareServer('/bare/');

server.on('request', (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on('upgrade', (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

if (process.version.replace('v', '').split('.')[0] > 17) {
  server.listen({
    port
  });
} else {
  console.error(`Node.js ${process.version.replace('v', '')} is not supported. Please use node 18.0.0 or higher.`);
}

server.on('listening', () => {
  console.log(`SuperShadow is running on port ${server.address().port}, using nodejs ${process.version}`);
});