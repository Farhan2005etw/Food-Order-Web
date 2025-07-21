import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/sidebar/sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import OrderBill from "./pages/Bill/OrderBill"; // Add this import
import { ToastContainer } from "react-toastify";
import { messaging, getToken, onMessage } from "./firebase";
import { useEffect } from "react";

const App = () => {
  const url = "http://localhost:4000";
   useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getToken(messaging, {
          vapidKey: "BOo_zddmjKjSOKICo0-q-w4q_qqHcTPDEYZ0UNuJ1MXyW1lle2Px4JggXVOBoMRgwSILw_9gHkvfNewA3BGlZE0",
        });

        if (token) {
          console.log("FCM Token:", token);

          // Send token to backend for saving
          await fetch("http://localhost:4000/api/token/save-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          });
        }
      } catch (error) {
        console.error("Error getting FCM token:", error);
      }
    };

    fetchToken();

    // Foreground notification
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      alert(payload.notification.title + ": " + payload.notification.body);
    });
  }, []);

  return (
    <>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
          <Route path="/order-bill/:orderId" element={<OrderBill url={url} />} />
        </Routes>
      </div>
    </>
  );
};

export default App;