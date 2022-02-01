const cacheName = "ApexMapRotation_alpha1.0.2";
const staticAssets = [
    "./",
    "./index.html",
    "./style.css",
    "./index.js",
    "./app.js",
    "./images/assets/Arena_Encore.jpg",
    "./images/assets/Arena_Habitat.jpg",
    "./images/assets/Arena_Overflow.jpg",
    "./images/assets/Arena_Party_Crasher.jpg",
    "./images/assets/Arena_Phase_Runner.jpg",
    "./images/assets/Kings_Canyon.jpg",
    "./images/assets/Olympus.jpg",
    "./images/assets/Storm_Point.jpg",
    "./images/assets/Worlds_Edge.jpg",

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