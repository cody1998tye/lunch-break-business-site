#!/usr/bin/env node
/*
 * Tiny local HTTP server for the Lunch Break Business site.
 * Zero dependencies. Serves the current directory on http://localhost:8000
 *
 * Run:    node server.js
 * Stop:   Ctrl-C   (or kill the process)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8000;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg':  'image/svg+xml',
  '.gif':  'image/gif',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.otf':  'font/otf',
  '.txt':  'text/plain; charset=utf-8',
};

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url);
  let pathname = decodeURIComponent(parsed.pathname);

  if (pathname.endsWith('/')) pathname += 'index.html';
  const filePath = path.join(ROOT, pathname);

  // security: prevent path traversal
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  fs.stat(filePath, (err, stat) => {
    let target = filePath;
    if (err || !stat.isFile()) {
      // try appending .html for pretty urls
      if (fs.existsSync(filePath + '.html')) {
        target = filePath + '.html';
      } else if (fs.existsSync(path.join(filePath, 'index.html'))) {
        target = path.join(filePath, 'index.html');
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<h1>404 — not found</h1><p>${pathname}</p><a href="/">home</a>`);
        return;
      }
    }
    const ext = path.extname(target).toLowerCase();
    const type = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-cache' });
    fs.createReadStream(target).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`▸ Lunch Break Business — local preview`);
  console.log(`▸ http://localhost:${PORT}`);
  console.log(`▸ serving:  ${ROOT}`);
  console.log(`▸ Ctrl-C to stop.`);
});
