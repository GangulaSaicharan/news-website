// // File: _app.js

// import { getToken } from "firebase/messaging";
// import { useEffect } from "react";
// import { messaging } from "./newfirebase";

// export default function MyApp() {
//   async function requestPermission() {
//     const permission = await Notification.requestPermission();
//     if (permission === "granted") {
//       if (!messaging) return;
//       // Generate Device Token for notification
//       const token = await getToken(messaging, {
//         vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
//       });
//       console.log("Token Gen", token);
//     } else if (permission === "denied") {
//       console.log("Denied for the notification");
//     }
//   }
//   useEffect(() => {
//     requestPermission();
//   }, []);
//   return null;
// }
