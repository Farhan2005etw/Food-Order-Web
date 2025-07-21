import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const { getTotalCartAmount, food_list, url, token, cartItems, clearCart } =
    useContext(StoreContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    houseNo: "",
    street: "",
    landmark: "",
    town: "",
    city: "",
    message: "",
  });

  const handleOnChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    if (
      !formData.firstName ||
      !formData.mobile ||
      !formData.houseNo ||
      !formData.city
    ) {
      return alert("Please fill all required fields");
    }

    let orderItems = [];

    for (let cartKey in cartItems) {
      const cartItem = cartItems[cartKey];

      if (typeof cartItem === "number") {
        const itemInfo = food_list.find((item) => item._id === cartKey);
        if (itemInfo) {
          orderItems.push({ ...itemInfo, quantity: cartItem });
        }
      } else if (cartItem?.quantity > 0) {
        const itemInfo = food_list.find((item) => item._id === cartItem.id);
        if (itemInfo) {
          orderItems.push({
            ...itemInfo,
            ...cartItem,
          });
        }
      }
    }

    try {
      const response = await axios.post(
        `${url}/api/order/place-order`,
        {
          items: orderItems,
          amount: getTotalCartAmount(),
          address: formData,
        },
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message, {
          theme: "colored",
        });

        clearCart();

        // 🔔 Send notification to admin via backend route
        await axios.post(`${url}/api/notification/send-notification`, {
          title: "New Order Received",
          body: `New order placed by ${formData.firstName} from ${formData.city}`,
        });

        navigate("/myorder");
      } else {
        alert(response.data.error);
        navigate("/cart");
      }
    } catch (error) {
      console.log("Order Error:", error);
      alert("Something went wrong while placing the order.");
    }
  };

  return (
    <form onSubmit={handlePlaceOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            value={formData.firstName}
            onChange={handleOnChange}
            type="text"
            placeholder="First Name"
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleOnChange}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          name="mobile"
          value={formData.mobile}
          onChange={handleOnChange}
          type="text"
          placeholder="Mobile No"
        />
        <input
          required
          name="houseNo"
          value={formData.houseNo}
          onChange={handleOnChange}
          type="text"
          placeholder="House No"
        />
        <div className="multi-fields">
          <input
            name="street"
            value={formData.street}
            onChange={handleOnChange}
            type="text"
            placeholder="Street/Ward"
          />
          <input
            name="landmark"
            value={formData.landmark}
            onChange={handleOnChange}
            type="text"
            placeholder="Landmark"
          />
        </div>
        <div className="multi-fields">
          <input
            name="town"
            value={formData.town}
            onChange={handleOnChange}
            type="text"
            placeholder="Town"
          />
          <input
            required
            name="city"
            value={formData.city}
            onChange={handleOnChange}
            type="text"
            placeholder="City"
          />
        </div>
        <input
          name="message"
          value={formData.message}
          onChange={handleOnChange}
          type="text"
          placeholder="Extra Message"
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}/-</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹0/-</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>₹{getTotalCartAmount()}/-</b>
          </div>
          <button type="submit">PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
