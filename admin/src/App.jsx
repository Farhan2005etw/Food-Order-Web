import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/sidebar/sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import OrderBill from "./pages/Bill/OrderBill"; // Add this import
import { ToastContainer } from "react-toastify";

const App = () => {
  const url = "http://localhost:4000";
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