import fs from "fs";
import path from "path";
import admin from "firebase-admin";

// ✅ Use absolute path to avoid path issues
const serviceAccountPath = path.resolve("./config/firebaseServiceKey.json");
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const sendNotification = async (fcmToken, title, body) => {
  const message = {
    notification: {
      title,
      body,
    },
    token: fcmToken,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("✅ Successfully sent notification:", response);
  } catch (error) {
    console.log("❌ Error sending notification:", error);
  }
};

export default sendNotification;
