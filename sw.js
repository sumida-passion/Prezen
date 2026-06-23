const CACHE_NAME = 'prezen-combined-v1';
const LOCAL_ASSETS = [
  "./",
  "./index.html",
  "./tankyu2.html",
  "./syokai.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];
const REMOTE_ASSETS = [
  "https://sumida-passion.github.io/game-assets/images/basketleague.jpg",
  "https://sumida-passion.github.io/game-assets/images/demae.jpg",
  "https://sumida-passion.github.io/game-assets/images/dousisya.jpg",
  "https://sumida-passion.github.io/game-assets/images/ensoku.jpg",
  "https://sumida-passion.github.io/game-assets/images/gakuendai.jpg",
  "https://sumida-passion.github.io/game-assets/images/golf.jpg",
  "https://sumida-passion.github.io/game-assets/images/hpmain.jpg",
  "https://sumida-passion.github.io/game-assets/images/ichigo.jpg",
  "https://sumida-passion.github.io/game-assets/images/jouhou.png",
  "https://sumida-passion.github.io/game-assets/images/junkangoukaku.jpg",
  "https://sumida-passion.github.io/game-assets/images/kaibou.jpg",
  "https://sumida-passion.github.io/game-assets/images/kakinohazusi.jpg",
  "https://sumida-passion.github.io/game-assets/images/kanabo.PNG",
  "https://sumida-passion.github.io/game-assets/images/kanu.jpg",
  "https://sumida-passion.github.io/game-assets/images/kawasaki.PNG",
  "https://sumida-passion.github.io/game-assets/images/kensyuryokou2.jpg",
  "https://sumida-passion.github.io/game-assets/images/kokusaikouryu2.jpg",
  "https://sumida-passion.github.io/game-assets/images/mac",
  "https://sumida-passion.github.io/game-assets/images/masuda.PNG",
  "https://sumida-passion.github.io/game-assets/images/miso.jpg",
  "https://sumida-passion.github.io/game-assets/images/naramachi01.png",
  "https://sumida-passion.github.io/game-assets/images/naramachi02.png",
  "https://sumida-passion.github.io/game-assets/images/naramachi03.png",
  "https://sumida-passion.github.io/game-assets/images/naramachi04.png",
  "https://sumida-passion.github.io/game-assets/images/naramachi05.jpg",
  "https://sumida-passion.github.io/game-assets/images/naramachi06.jpg",
  "https://sumida-passion.github.io/game-assets/images/naramachi07.jpg",
  "https://sumida-passion.github.io/game-assets/images/naramarathon.jpg",
  "https://sumida-passion.github.io/game-assets/images/nettyu.jpg",
  "https://sumida-passion.github.io/game-assets/images/okamoto.PNG",
  "https://sumida-passion.github.io/game-assets/images/osakataidai.jpg",
  "https://sumida-passion.github.io/game-assets/images/rounen.jpg",
  "https://sumida-passion.github.io/game-assets/images/science",
  "https://sumida-passion.github.io/game-assets/images/sdgs.jpg",
  "https://sumida-passion.github.io/game-assets/images/sefiroto.jpg",
  "https://sumida-passion.github.io/game-assets/images/senkouka.jpg",
  "https://sumida-passion.github.io/game-assets/images/sinjokita.jpg",
  "https://sumida-passion.github.io/game-assets/images/snsboushi.jpg",
  "https://sumida-passion.github.io/game-assets/images/sukiryokou.jpg",
  "https://sumida-passion.github.io/game-assets/images/sumida.PNG",
  "https://sumida-passion.github.io/game-assets/images/support01.png",
  "https://sumida-passion.github.io/game-assets/images/support02.png",
  "https://sumida-passion.github.io/game-assets/images/support03.png",
  "https://sumida-passion.github.io/game-assets/images/support04.png",
  "https://sumida-passion.github.io/game-assets/images/support05.jpg",
  "https://sumida-passion.github.io/game-assets/images/syokubunka.jpg",
  "https://sumida-passion.github.io/game-assets/images/takoage.jpg",
  "https://sumida-passion.github.io/game-assets/images/tankyu.jpg",
  "https://sumida-passion.github.io/game-assets/images/tsujii.PNG",
  "https://sumida-passion.github.io/game-assets/images/tuji.jpg",
  "https://sumida-passion.github.io/game-assets/images/volunteer.jpg",
  "https://sumida-passion.github.io/game-assets/images/youtien.jpg",
  "https://sumida-passion.github.io/syokai/"
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(LOCAL_ASSETS);
    await Promise.allSettled(REMOTE_ASSETS.map(url => cache.add(new Request(url, {mode:'cors'}))));
    self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
    self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    if (cached) return cached;
    try {
      const response = await fetch(event.request);
      const cache = await caches.open(CACHE_NAME);
      cache.put(event.request, response.clone()).catch(()=>{});
      return response;
    } catch(e) {
      if (event.request.mode === 'navigate') return caches.match('./index.html');
      return cached;
    }
  })());
});