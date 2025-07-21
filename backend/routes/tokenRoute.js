// routes/tokenRoute.js
import express from "express";
import sendNotification from "../utils/sendNotification.js";

const tokenRoute = express.Router();

let tokens = []; // Temporary array, DB use karo production me

// ✅ Save token route
tokenRoute.post("/save-token", (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  if (!tokens.includes(token)) {
    tokens.push(token);
    console.log("Saved FCM token:", token);
  }

  res.status(200).json({ message: "Token saved successfully" });
});

// ✅ Send test notification route
tokenRoute.post("/send-test-notification", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "FCM token is required" });
  }

  const title = "🚀 Test Notification";
  const body = "Your notification setup is working! ✅";

  try {
    await sendNotification(token, title, body);
    res.status(200).json({ success: true, message: "Notification sent!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to send notification", details: err.message });
  }
});

export default tokenRoute;
