"use client";
import { useEffect } from "react";
import { requestFCMToken } from "./firebase";

function NotificationHandler() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("✅ Service Worker registered:", registration);
        })
        .catch((error) => {
          console.error("❌ Service Worker registration failed:", error);
        });
    }

    // navigator.serviceWorker.ready.then((registration) => {
    //   registration.showNotification("Test Notification", {
    //     body: "This is a test notification from news.",
    //     icon: "/default-icon.png",
    //   });
    // });

    async function setupNotifications() {
      // ✅ Request Notification Permission
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("✅ Notification permission granted.");
        } else {
          console.warn("🚫 Notification permission denied.");
        }
      });
      await requestFCMToken(); // ✅ Request and store FCM token
    }

    console.log("in NotificationHandler component");
    setupNotifications();
  }, []);

  return null; // ✅ No UI, just runs automatically
}

export default NotificationHandler;
