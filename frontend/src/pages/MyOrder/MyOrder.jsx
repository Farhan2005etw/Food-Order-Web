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

  const renderPizzaCustomization = (item) => {
    const customizations = [];
    if (item.size) customizations.push(`Size: ${item.size}`);
    if (item.crust?.length > 0) customizations.push(`Crust: ${item.crust.join(', ')}`);
    if (item.cheese?.length > 0) customizations.push(`Cheese: ${item.cheese.join(', ')}`);
    if (item.toppings?.length > 0) customizations.push(`Toppings: ${item.toppings.join(', ')}`);
    if (item.extraCheese?.length > 0) customizations.push(`Extra Cheese: ${item.extraCheese.join(', ')}`);
    
    return customizations.length > 0 ? (
      <div className="pizza-customization">
        {customizations.map((custom, i) => (
          <p key={i}>{custom}</p>
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
                <p>
                  {order.items.map((item, i) => (
                    <span key={i}>
                      {item.name} x {item.quantity}
                      {i !== order.items.length - 1 && ', '}
                    </span>
                  ))}
                </p>
                
                {/* Pizza customization details */}
                {order.items.map((item, i) => {
                  if (item.name === "Pizza") {
                    return renderPizzaCustomization(item);
                  }
                  return null;
                })}
              </div>
              
              <p>Rs. {order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p><span>&#x25cf;</span> <b>{order.status}</b></p>
              <button>Track Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrder;