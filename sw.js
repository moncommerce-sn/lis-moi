// Garde l'interface en cache pour qu'elle s'ouvre vite, même avec un réseau faible.
const CACHE = "lis-moi-v1";
const FILES = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png"];

self.addEventListener("install", e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))));
self.addEventListener("activate", e => e.waitUntil(
  caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
));
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return; // les envois au serveur ne passent jamais par le cache
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
