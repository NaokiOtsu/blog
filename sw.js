importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/0347320b01e98c15ebef.js",
    "revision": "671c8ecf11ab6bd6fcd7a07d469c777e"
  },
  {
    "url": "/_nuxt/0dbcd20913a7f489c3b7.js",
    "revision": "6c354246660f08442f3f6a61895d37ea"
  },
  {
    "url": "/_nuxt/35f5d4cd1087fd4c05c1.js",
    "revision": "dc1a1dcf4b9835369463240ff13af241"
  },
  {
    "url": "/_nuxt/48b5a157089511bc5650.js",
    "revision": "f58ed6db2e170fdd2c864b7515fc134f"
  },
  {
    "url": "/_nuxt/79bcd2b8ceddc0486627.js",
    "revision": "770a825d90e5031991546307445e174e"
  },
  {
    "url": "/_nuxt/7b5e3e04b473deff2b62.js",
    "revision": "f37e225f716657e977b4bf8ecd395c0d"
  },
  {
    "url": "/_nuxt/7d37de19250f8e71d169.js",
    "revision": "9b33639185d3401d75b971e6189c5644"
  },
  {
    "url": "/_nuxt/8f47e504b4adc19ec417.js",
    "revision": "95b058a3d9e0ee84086bebebcccddd3d"
  },
  {
    "url": "/_nuxt/ae9fcf4080d5a1955aa3.js",
    "revision": "5d4d468150397713933ede47dbdc03a7"
  },
  {
    "url": "/_nuxt/b7ed65bc5a05ff8eac64.js",
    "revision": "b6053816deeb5f52af2240d3dc37181b"
  },
  {
    "url": "/_nuxt/c943126437d2ed8780a6.js",
    "revision": "30669e58f146e8a5a932a7113a9837e4"
  },
  {
    "url": "/_nuxt/cf08ce1db9511db5c6af.js",
    "revision": "bbb38abada87ddbe9767ed4bb3445c95"
  }
], {
  "cacheId": "NaokiOtsu",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
