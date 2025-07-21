// routes/notification.js
import express from "express";
const notificationRouter = express.Router();
import admin from "firebase-admin"; // jahan tu firebase.js rakha hai

notificationRouter.post("/send-notification", async (req, res) => {
  const { title, body } = req.body;

  const message = {
    notification: {
      title,
      body,
    },
    topic: "admin", // ya tu device token bhi bhej sakta hai
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Successfully sent notification:", response);
    res.status(200).send({ success: true, response });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).send({ success: false, error });
  }
});

export default notificationRouter
