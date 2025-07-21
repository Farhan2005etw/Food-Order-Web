// admin/public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.3.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.3.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAiBvhytK2Ztf78Q48li7-oZRyLLObb-y8",
  authDomain: "food-del-web.firebaseapp.com",
  projectId: "food-del-web",
  storageBucket: "food-del-web.firebasestorage.app",
  messagingSenderId: "777153375846",
  appId: "1:777153375846:web:1bbe3bb6364175517c87a7",
  measurementId: "G-PW54DEVYTR"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
