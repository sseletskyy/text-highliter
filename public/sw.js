importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js'
)

const MAX_ENTRIES_CACHE = 200
const MAX_AGE_CACHE = 6 * 60 * 60 // 6 hours

const isDocumentImageUrl = ({ url }) =>
  url.pathname.includes('/api/document-page/')

if (workbox) {
  workbox.core.skipWaiting()
  workbox.core.clientsClaim()
  workbox.routing.registerRoute(
    isDocumentImageUrl,
    new workbox.strategies.CacheFirst({
      cacheName: 'document-images',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [200],
        }),
        new workbox.expiration.Plugin({
          maxEntries: MAX_ENTRIES_CACHE,
          maxAgeSeconds: MAX_AGE_CACHE,
          purgeOnQuotaError: true,
        }),
      ],
    })
  )
} else {
  console.log(`Workbox is unavailable`)
}
