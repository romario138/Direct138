const V="direct-v1";
self.addEventListener("install",e=>{self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=="GET"||u.origin!==location.origin)return;
  if(r.mode==="navigate"){
    e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(V).then(k=>k.put("./",c));return x}).catch(()=>caches.match("./")));
  }
});
