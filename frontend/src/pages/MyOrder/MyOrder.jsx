import React, { useContext, useState, useEffect } from 'react'
import './MyOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrder = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  
  const fetchOrders = async () => {
    const response = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } });
    setData(response.data.data);
    console.log(response.data.data);
  };
  
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);
  
  // Enhanced function to render pizza customizations
  const renderPizzaCustomization = (item) => {
    // Check if item is pizza (by name or category)
    if (item.name !== "Pizza" && item.category !== "Pizza") {
      return null;
    }
    
    const customizations = [];
    
    // Add all available customization options
    if (item.size) customizations.push(`Size: ${item.size}`);
    if (item.crusts?.length > 0) customizations.push(`Crust: ${item.crusts.join(', ')}`);
    if (item.crust?.length > 0) customizations.push(`Crust: ${item.crust.join(', ')}`);
    if (item.cheese?.length > 0) customizations.push(`Cheese: ${item.cheese.join(', ')}`);
    if (item.toppings?.length > 0) customizations.push(`Toppings: ${item.toppings.join(', ')}`);
    if (item.extraCheese?.length > 0) customizations.push(`Extra Cheese: ${item.extraCheese.join(', ')}`);
    
    // Add price breakdown if available
    if (item.basePrice && item.extraCost) {
      customizations.push(`Price: Base ₹${item.basePrice} + Extra ₹${item.extraCost} = ₹${item.customPrice || (item.basePrice + item.extraCost)}`);
    }
    
    return customizations.length > 0 ? (
      <div className="pizza-customization">
        <h4 className="customization-title">Customizations:</h4>
        {customizations.map((custom, i) => (
          <p key={i} className="customization-item">{custom}</p>
        ))}
      </div>
    ) : null;
  };
  
  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            <div className="order-main-grid">
              <img src={assets.parcel_icon} alt="parcel" />
             
              <div className="order-items">
                {/* Display each item separately with its details */}
                {order.items.map((item, i) => (
                  <div key={i} className="order-item-details">
                    <p className="item-name">
                      {item.name} x {item.quantity}
                    </p>
                    
                    {/* Show pizza customizations for each pizza item */}
                    {renderPizzaCustomization(item)}
                    
                    {/* Add separator between items if not the last item */}
                    {i !== order.items.length - 1 && <hr className="item-separator" />}
                  </div>
                ))}
              </div>
             
              <div className="order-summary">
                <p className="order-amount">₹{order.amount}.00</p>
                <p className="order-items-count">Items: {order.items.length}</p>
                <p className="order-status">
                  <span>&#x25cf;</span> <b>{order.status}</b>
                </p>
                <button className="track-btn">Track Order</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrder;


