// Service Worker for caching and performance
const CACHE_NAME = "idevx-v1";
const STATIC_CACHE = "idevx-static-v1";
const DYNAMIC_CACHE = "idevx-dynamic-v1";

// Assets to cache immediately
const STATIC_ASSETS = [
  "/",
  "/models",
  "/blog",
  "/privacy",
  "/terms",
  "/refund",
  "/careers",
  "/partner",
  "/talk-to-us",
  "/images/logo.png",
  "/images/logo_white.png",
  "/images/logo_black.png",
  "/fonts/Neuropolitical Rg.otf",
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log("Caching static assets");
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log("Static assets cached successfully");
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error("Failed to cache static assets:", error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log("Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log("Service Worker activated");
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // Skip external requests
  if (url.origin !== location.origin) {
    return;
  }

  // Handle different types of requests
  if (request.destination === "image") {
    event.respondWith(handleImageRequest(request));
  } else if (request.destination === "font") {
    event.respondWith(handleFontRequest(request));
  } else if (url.pathname.startsWith("/api/")) {
    event.respondWith(handleApiRequest(request));
  } else {
    event.respondWith(handlePageRequest(request));
  }
});

// Handle image requests with cache-first strategy
async function handleImageRequest(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      await cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error("Image request failed:", error);
    return new Response("Image not available", { status: 404 });
  }
}

// Handle font requests with cache-first strategy
async function handleFontRequest(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      await cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error("Font request failed:", error);
    return new Response("Font not available", { status: 404 });
  }
}

// Handle API requests with network-first strategy
async function handleApiRequest(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      await cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error("API request failed:", error);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response("API not available", { status: 503 });
  }
}

// Handle page requests with stale-while-revalidate strategy
async function handlePageRequest(request) {
  try {
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
      // Return cached response immediately, but also update cache in background
      fetch(request)
        .then(async (response) => {
          if (response.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            await cache.put(request, response.clone());
          }
        })
        .catch(() => {
          // Ignore background update errors
        });

      return cachedResponse;
    }

    // No cache, fetch from network
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      await cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.error("Page request failed:", error);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response("Page not available", { status: 503 });
  }
}

// Background sync for offline actions
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Handle offline actions when back online
    console.log("Performing background sync");
    // Add your offline action handling here
  } catch (error) {
    console.error("Background sync failed:", error);
  }
}

// Push notifications (if needed)
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: "/images/logo.png",
      badge: "/images/logo.png",
      tag: data.tag || "default",
      data: data.data,
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

// Notification click handling
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(clients.openWindow(event.notification.data.url));
  }
});

// Cache management
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "CACHE_MANAGEMENT") {
    const { action, cacheName, urls } = event.data;

    switch (action) {
      case "CLEAR_CACHE":
        clearCache(cacheName);
        break;
      case "ADD_TO_CACHE":
        addToCache(cacheName, urls);
        break;
      case "DELETE_FROM_CACHE":
        deleteFromCache(cacheName, urls);
        break;
    }
  }
});

async function clearCache(cacheName) {
  try {
    if (cacheName) {
      await caches.delete(cacheName);
    } else {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
    }
    console.log("Cache cleared:", cacheName || "all");
  } catch (error) {
    console.error("Failed to clear cache:", error);
  }
}

async function addToCache(cacheName, urls) {
  try {
    const cache = await caches.open(cacheName);
    await cache.addAll(urls);
    console.log("Added to cache:", urls);
  } catch (error) {
    console.error("Failed to add to cache:", error);
  }
}

async function deleteFromCache(cacheName, urls) {
  try {
    const cache = await caches.open(cacheName);
    await Promise.all(urls.map((url) => cache.delete(url)));
    console.log("Deleted from cache:", urls);
  } catch (error) {
    console.error("Failed to delete from cache:", error);
  }
}
