importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBPTIiIIoqZE3xDuBBKRbCNB5jM-aaMXNk",
  authDomain: "news-ca97a.firebaseapp.com",
  projectId: "news-ca97a",
  messagingSenderId: "63818778264",
  appId: "1:63818778264:web:d2ab6cba49a9d7e7fef2ed",
});

// 🔹 Get Firebase Messaging Instance
const messaging = firebase.messaging();

// // 🔹 Handle Background Messages
// messaging.onBackgroundMessage((payload) => {
//   console.log("Received background message:", payload);

//   self.registration.showNotification(payload.notification.title, {
//     body: payload.notification.body,
//     icon: payload.notification.image || "/default-icon.png",
//   });
// });

// navigator.serviceWorker.ready.then((registration) => {
//   registration.showNotification(payload.notification.title, {
//     body: payload.notification.body,
//     icon: payload.notification.image || "/default-icon.png",
//   });
// });

messaging.onBackgroundMessage((payload) => {
  console.log("📩 Received background message:", payload);

  console.log(payload.notification, " notifiction");
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.image || "/default-icon.png",
    data: { url: payload?.data?.url || "/" },
  });
});

self.addEventListener("notificationclick", (event) => {
  console.log("🖱️ Notification clicked:", event.notification);
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url || "/"));
});
