import 'regenerator-runtime';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { clientsClaim, setCacheNameDetails, skipWaiting } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheFirst, NetworkOnly, StaleWhileRevalidate } from 'workbox-strategies';
import APP_CONFIG from './Globals/Config';

const { CACHE } = APP_CONFIG;
const { CACHENAME, PREFIX, SUFFIX } = CACHE;

clientsClaim();
skipWaiting();

// eslint-disable-next-line no-restricted-globals
let precacheItem = self.__WB_MANIFEST;
setCacheNameDetails({
  prefix: PREFIX,
  suffix: SUFFIX,
  precache: CACHENAME,
});

precacheItem = [
  './',
  { url: './index.html', revision: null },
  { url: './favicon.ico', revision: null },
  { url: './manifest.json', revision: null },
  { url: './images/thumbnail.svg', revision: null },
  { url: './images/failed-to-load.svg', revision: null },
  { url: './images/route-not-found.svg', revision: null },
];
precacheAndRoute(precacheItem, { ignoreURLParametersMatching: [/.*/] });

registerRoute(
  new RegExp('(?:css|js|woff|woff2|eot)$'),
  new CacheFirst({
    cacheName: `${PREFIX}-Assets`,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Hari
      }),
    ],
  }),
);

registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: `${PREFIX}-Images`,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Hari
      }),
    ],
  }),
);

registerRoute(
  ({ url }) => url.href.indexOf('/review') > -1,
  new NetworkOnly(),
);

const StaleWhileRevalidatePlugin = {
  cacheDidUpdate: async () => {
    await console.log('Update Data ke dalam Cache');
  },
  fetchDidFail: async () => {
    await console.log('Gagal Mengupdate data Cache');
  },
};

registerRoute(
  ({ url }) => url.href.indexOf('/list'),
  new StaleWhileRevalidate({
    cacheName: `${PREFIX}-Source`,
    plugins: [StaleWhileRevalidatePlugin],
  }),
);
