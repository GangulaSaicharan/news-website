// "use client";

// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: "AIzaSyBPTIiIIoqZE3xDuBBKRbCNB5jM-aaMXNk",
//   authDomain: "news-ca97a.firebaseapp.com",
//   projectId: "news-ca97a",
//   storageBucket: "news-ca97a.firebasestorage.app",
//   messagingSenderId: "63818778264",
//   appId: "1:63818778264:web:d2ab6cba49a9d7e7fef2ed",
//   measurementId: "G-5F0W3YJ24V",
// };

// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

// // ✅ Function to Register the Service Worker
// export async function registerServiceWorker() {
//   if ("serviceWorker" in navigator) {
//     try {
//       await navigator.serviceWorker.register("/firebase-messaging-sw.js");
//       console.log("Service Worker registered successfully.");
//     } catch (error) {
//       console.error("Service Worker registration failed:", error);
//     }
//   }
// }

// // ✅ Function to Get & Store FCM Token
// export async function requestFCMToken(): Promise<string | null> {
//   console.log("Requesting FCM token...");

//   try {
//     const token = await getToken(messaging, {
//       vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
//     });

//     if (token) {
//       localStorage.setItem("fcmToken", token);
//       console.log("FCM Token stored:", token);

//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_FETCH_URL}/api/site/store-fcm-token/`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             token,
//             userUuid: localStorage.getItem("userUuid"),
//           }),
//         }
//       );

//       const data = await response.json();
//       console.log("Response from backend:", data);
//       if (response.ok && data.userUuid) {
//         localStorage.setItem("userUuid", data.userUuid);
//         console.log("User ID received from backend:", data.userUuid);
//       }

//       console.log("FCM Token sent to backend.");
//       return token;
//     } else {
//       console.warn("No FCM token available.");
//       return null;
//     }
//   } catch (error) {
//     console.error("Error getting FCM token:", error);
//     return null;
//   }
// }

// // ✅ Listen for Foreground Notifications
// onMessage(messaging, (payload: any) => {
//   console.log("Foreground message received:", payload);
//   new Notification(payload.notification.title, {
//     body: payload.notification.body,
//     icon: payload.notification.image || "/default-icon.png",
//   });
// });

"use client";

import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBPTIiIIoqZE3xDuBBKRbCNB5jM-aaMXNk",
  authDomain: "news-ca97a.firebaseapp.com",
  projectId: "news-ca97a",
  storageBucket: "news-ca97a.firebasestorage.app",
  messagingSenderId: "63818778264",
  appId: "1:63818778264:web:d2ab6cba49a9d7e7fef2ed",
  measurementId: "G-5F0W3YJ24V",
};

const app = initializeApp(firebaseConfig);
let messaging: any = null;

// ✅ Ensure Messaging is Available Before Using It
async function initializeMessaging() {
  if (typeof window !== "undefined") {
    const supported = await isSupported();
    if (supported) {
      messaging = getMessaging(app);
      console.log("🔥 Firebase Messaging initialized!");
    } else {
      console.warn("🚫 Firebase Messaging is not supported in this browser.");
    }
  }
}
initializeMessaging();

// ✅ Function to Request Notification Permission & Get Token
export async function requestFCMToken(): Promise<string | null> {
  console.log("🔄 Requesting FCM token...");

  while (!messaging) {
    console.warn("⏳ Waiting for Firebase Messaging to initialize...");
    await new Promise((resolve) => setTimeout(resolve, 500)); // Small delay
  }

  try {
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });

    if (token) {
      localStorage.setItem("fcmToken", token);
      console.log("✅ FCM Token stored:", token);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FETCH_URL}/api/site/store-fcm-token/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token,
            userUuid: localStorage.getItem("userUuid"),
          }),
        }
      );

      const data = await response.json();
      console.log("📩 Response from backend:", data);
      if (response.ok && data.userUuid) {
        localStorage.setItem("userUuid", data.userUuid);
        console.log("🆔 User ID received from backend:", data.userUuid);
      }

      console.log("📤 FCM Token sent to backend.");
      return token;
    } else {
      console.warn("⚠️ No FCM token available.");
      return null;
    }
  } catch (error) {
    console.error("❌ Error getting FCM token:", error);
    return null;
  }
}

// ✅ Listen for Foreground Notifications
// if (typeof window !== "undefined") {
//   initializeMessaging().then(() => {
if (messaging) {
  onMessage(messaging, (payload: any) => {
    console.log("📩 Foreground message received:", payload);
    new Notification(payload.notification.title, {
      body: payload.notification.body,
      icon: payload.notification.image || "/default-icon.png",
      data: { url: payload?.data?.url || "/" },
    });
  });
}
// });
//}

export { app, messaging };
