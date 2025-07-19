import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./OrderBill.css";

const OrderBill = ({ url }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { orderId } = useParams();
  const navigate = useNavigate();

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/order/${orderId}`);
      if (response.data.success) {
        setOrder(response.data.data);
      } else {
        toast.error("Error fetching order details");
        navigate("/orders");
      }
    } catch (error) {
      toast.error("Error fetching order details");
      navigate("/orders");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const goBack = () => {
    navigate("/orders");
  };

  // Function to render pizza customizations for bill
  const renderPizzaCustomizations = (item) => {
    if (item.category !== "Pizza") return null;

    return (
      <div className="bill-pizza-customizations">
        {item.size && (
          <div className="customization-row">
            <span>Size: {item.size}</span>
          </div>
        )}
        {item.crusts && item.crusts.length > 0 && (
          <div className="customization-row">
            <span>Crust: {item.crusts.join(", ")}</span>
          </div>
        )}
        {item.cheese && item.cheese.length > 0 && (
          <div className="customization-row">
            <span>Cheese: {item.cheese.join(", ")}</span>
          </div>
        )}
        {item.toppings && item.toppings.length > 0 && (
          <div className="customization-row">
            <span>Toppings: {item.toppings.join(", ")}</span>
          </div>
        )}
      </div>
    );
  };

  const calculateItemTotal = (item) => {
    if (item.category === "Pizza" && item.customPrice) {
      return item.customPrice * item.quantity;
    }
    return item.price * item.quantity;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  if (loading) {
    return <div className="loading">Loading order details...</div>;
  }

  if (!order) {
    return <div className="error">Order not found</div>;
  }

  return (
    <div className="order-bill-container">
      <div className="no-print">
        <button onClick={goBack} className="back-btn">
          ← Back to Orders
        </button>
        <button onClick={handlePrint} className="print-btn">
          🖨️ Print Bill
        </button>
      </div>

      <div className="bill-content">
        {/* Restaurant Header */}
        <div className="bill-header">
          <h1>RESTAURANT NAME</h1>
          <p>123 Restaurant Street, City, State</p>
          <p>Phone: +91 12345 67890</p>
          <p>Email: info@restaurant.com</p>
          <hr />
        </div>

        {/* Bill Title */}
        <div className="bill-title">
          <h2>ORDER BILL</h2>
          <p>Order ID: {order._id}</p>
          <p>Date: {formatDate(order.date)}</p>
          <p>Status: {order.status}</p>
        </div>

        {/* Customer Details */}
        <div className="customer-details">
          <h3>Customer Details:</h3>
          <p><strong>Name:</strong> {order.address.firstName} {order.address.lastName}</p>
          <p><strong>Phone:</strong> {order.address.mobile}</p>
          <p><strong>Address:</strong></p>
          <p style={{ marginLeft: "20px" }}>
            {order.address.houseNo}, {order.address.street}<br />
            {order.address.landmark}, {order.address.town}<br />
            {order.address.city}
          </p>
        </div>

        {/* Order Items */}
        <div className="order-items">
          <h3>Order Items:</h3>
          <table className="items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="item-details">
                      <strong>{item.name}</strong>
                      {renderPizzaCustomizations(item)}
                    </div>
                  </td>
                  <td>{item.quantity}</td>
                  <td>Rs. {item.category === "Pizza" && item.customPrice ? item.customPrice : item.price}</td>
                  <td>Rs. {calculateItemTotal(item)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bill Summary */}
        <div className="bill-summary">
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>Rs. {order.amount }</span>
          </div>
          <div className="summary-row">
            <span>Delivery Fee:</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span><strong>Total Amount:</strong></span>
            <span><strong>Rs. {order.amount}</strong></span>
          </div>
        </div>

        {/* Payment Details */}
        <div className="payment-details">
          <p><strong>Payment Method:</strong> {order.payment ? "Online Payment" : "Cash on Delivery"}</p>
          {order.payment && <p><strong>Payment Status:</strong> Paid</p>}
        </div>

        {/* Footer */}
        <div className="bill-footer">
          <hr />
          <p>Thank you for your order!</p>
          <p>Visit us again soon!</p>
        </div>
      </div>
    </div>
  );
};

export default OrderBill;