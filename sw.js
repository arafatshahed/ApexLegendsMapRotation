const cacheName = "ApexMapRotation_beta1.15";
const staticAssets = [
    "./",
    "./index.html",
    "./style.css",
    "./index.js",
    "./app.js",
    "./apiHelper.js",
    "./assets/images/Arena_Encore.jpg",
    "./assets/images/Arena_Habitat.jpg",
    "./assets/images/Arena_Overflow.jpg",
    "./assets/images/Arena_Party_Crasher.jpg",
    "./assets/images/Arena_Phase_Runner.jpg",
    "./assets/images/Kings_Canyon.jpg",
    "./assets/images/Olympus.jpg",
    "./assets/images/Storm_Point.jpg",
    "./assets/images/Worlds_Edge.jpg",

];

self.addEventListener("install", async(e) => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
    return self.skipWaiting();
});

self.addEventListener("activate", (e) => {
    self.clients.claim();
});

self.addEventListener("fetch", async(e) => {
    const req = e.request;
    const url = new URL(req.url);

    if (url.origin === location.origin) {
        e.respondWith(cacheFirst(req));
    } else {
        e.respondWith(networkAndCache(req));
    }
});

async function cacheFirst(req) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);
    return cached || fetch(req);
}

async function networkAndCache(req) {
    const cache = await caches.open(cacheName);
    try {
        const fresh = await fetch(req);
        await cache.put(req, fresh.clone());
        return fresh;
    } catch (e) {
        const cached = await cache.match(req);
        return cached;
    }
}