import React from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  
  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error while fetching error");
    }
  };
  
  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url+"/api/order/status", {orderId, status: event.target.value})
    if(response.data.success) {
      await fetchAllOrders()
    }    
  }
  
  // Function to render pizza customizations
  const renderPizzaCustomizations = (item) => {
    if (item.category !== "Pizza") return null;
    
    return (
      <div className="pizza-customizations" style={{ marginLeft: "10px", fontSize: "0.9em", color: "#666" }}>
        {item.size && <p><strong>Size:</strong> {item.size}</p>}
        
        {item.crusts && item.crusts.length > 0 && (
          <p><strong>Crust:</strong> {item.crusts.join(", ")}</p>
        )}
        
        {item.cheese && item.cheese.length > 0 && (
          <p><strong>Cheese:</strong> {item.cheese.join(", ")}</p>
        )}
        
        {item.toppings && item.toppings.length > 0 && (
          <p><strong>Toppings:</strong> {item.toppings.join(", ")}</p>
        )}
        
        {item.basePrice && item.extraCost && (
          <p><strong>Price:</strong> Base Rs. {item.basePrice} + Extra Rs. {item.extraCost} = Rs. {item.customPrice || (item.basePrice + item.extraCost)}</p>
        )}
      </div>
    );
  };
  
  useEffect(() => {
    fetchAllOrders();
  }, []);
  
  return (
    <div className="order add">
      <h3>Order Page</h3>
      {orders.map((order, index) => (
        <div key={index} className="order-item">
          <img src={assets.parcel_icon} alt="Order Icon" />
          <div>
            <div className="order-item-food">
              {order.items.map((item, itemIndex) => (
                <div key={itemIndex} style={{ marginBottom: "10px" }}>
                  <p style={{ margin: "0", fontWeight: "bold" }}>
                    {item.name} x {item.quantity}
                    {itemIndex < order.items.length - 1 && ","}
                  </p>
                  {renderPizzaCustomizations(item)}
                </div>
              ))}
            </div>
            <p className="order-item-name">
              {order.address.firstName + " " + order.address.lastName}
            </p>
            <div className="order-item-address">
              <p>{order.address.houseNo + ", " + order.address.street}</p>
              <p>
                {order.address.landmark +
                  ", " +
                  order.address.town +
                  ", " +
                  order.address.city}
              </p>
            </div>
            <p className="order-item-phone">{order.address.mobile}</p>
          </div>
          <p>Items : {order.items.length}</p>
          <p>Rs. {order.amount}</p>
          <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
            <option value="Food Processing">Food Processing</option>
            <option value="Out for Delevery">Out for Delevery</option>
            <option value="Delevered">Delevered</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default Orders;



