// Service worker de la app de Sumi Queen
// Guarda la carcasa de la app para que abra rapido y funcione sin internet.
var CACHE = 'sumi-v1';
var BASICOS = ['./', './index.html', './manifest.json', './icono.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) { return c.addAll(BASICOS); })
      .then(function () { return self.skipWaiting(); })
      .catch(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (llaves) {
        return Promise.all(llaves.map(function (k) { return k === CACHE ? null : caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var url = new URL(e.request.url);

  // Las citas siempre se piden frescas al servidor, nunca desde el cache.
  if (url.pathname.indexOf('/webhook/') >= 0) return;
  if (e.request.method !== 'GET') return;

  // La carcasa: primero la red, y si no hay internet lo que este guardado.
  e.respondWith(
    fetch(e.request)
      .then(function (r) {
        if (r && r.ok && url.origin === location.origin) {
          var copia = r.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, copia); });
        }
        return r;
      })
      .catch(function () {
        return caches.match(e.request).then(function (r) {
          return r || caches.match('./index.html');
        });
      })
  );
});
