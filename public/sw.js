self.addEventListener("push", function (event) {
  console.log("event", event.data.json());
  if (event.data) {
    const data = event.data.json();
    console.log("push data", data);
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
    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

self.addEventListener("notificationclick", function (event) {
  console.log("Notification click received.", event.notification);
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
