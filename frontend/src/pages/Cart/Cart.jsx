import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);

  const navigate = useNavigate()

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((items, index) => {
          if (cartItems[items._id] > 0) {
            return (
              <div>
                <div className="cart-items-title cart-items-item">
                  <img src={items.image} alt={items.title} />
                  <p>{items.name}</p>
                  <p>₹{items.price}/-</p>
                  <p>{cartItems[items._id]}</p>
                  <p>₹{items.price * cartItems[items._id]}/-</p>
                  <p
                    onClick={() => removeFromCart(items._id)}
                    className="cross"
                  >
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}/-</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{0}/-</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>₹{getTotalCartAmount()}/-</b>
          </div>
          <button
            onClick={() => navigate('/order')}
            disabled={getTotalCartAmount() < 200}
            style={{
              opacity: getTotalCartAmount() < 200 ? 0.5 : 1,
              cursor: getTotalCartAmount() < 200 ? "not-allowed" : "pointer",
            } }
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
       </div>
    </div>
  );
};

export default Cart;
