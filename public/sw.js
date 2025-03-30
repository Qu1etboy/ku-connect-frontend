self.addEventListener("push", function (event) {
  console.log("[service worker] Event", event.data.json());
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: data.icon || `${self.location.origin}/ku-connect-icon-192x192.png`,
      badge: "/badge.png",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: "2",
        url: data.url,
      },
    };

    // event.waitUntil(self.registration.showNotification(data.title, options));
    event.waitUntil(
      self.clients
        .matchAll({ type: "window", includeUncontrolled: true })
        .then((clients) => {
          // Check if any client (tab) is focused
          const isClientFocused = clients.some(
            (client) => client.url.includes("/chat") && client.focused,
          );

          if (!isClientFocused) {
            // Only show notification when user is not active in the app
            self.registration.showNotification(data.title, options);
          }
        }),
    );
  }
});

self.addEventListener("notificationclick", function (event) {
  console.log(
    "[service worker] Notification click received.",
    event.notification,
  );
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
