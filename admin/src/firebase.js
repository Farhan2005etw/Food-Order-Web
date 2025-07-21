// admin/src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAiBvhytK2Ztf78Q48li7-oZRyLLObb-y8",
  authDomain: "food-del-web.firebaseapp.com",
  projectId: "food-del-web",
  storageBucket: "food-del-web.firebasestorage.app",
  messagingSenderId: "777153375846",
  appId: "1:777153375846:web:1bbe3bb6364175517c87a7",
  measurementId: "G-PW54DEVYTR"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export { messaging, getToken, onMessage };
