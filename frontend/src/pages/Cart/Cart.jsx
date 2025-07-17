import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Details</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {Object.entries(cartItems).map(([key, value]) => {
          const isCustom = typeof value === 'object';
          const itemId = isCustom ? value.id : key;
          const item = food_list.find((f) => f._id === itemId);
          if (!item) return null;

          const quantity = isCustom ? value.quantity : value;
          if (quantity <= 0) return null;

          const price = isCustom ? value.customPrice : item.price;
          const total = price * quantity;

          return (
            <div key={key}>
              <div className="cart-items-title cart-items-item">
                <img src={url + '/images/' + item.image} alt={item.name} />
                <p>{item.name}</p>
                <div className="pizza-details">
                  {isCustom ? (
                    <>
                      <p><b>Size:</b> {value.size}</p>
                      {value.crusts?.length > 0 && <p><b>Crusts:</b> {value.crusts.join(", ")}</p>}
                      {value.cheese?.length > 0 && <p><b>Cheese:</b> {value.cheese.join(", ")}</p>}
                      {value.toppings?.length > 0 && <p><b>Toppings:</b> {value.toppings.join(", ")}</p>}
                      {value.extraCheese?.length > 0 && <p><b>Extra Cheese:</b> {value.extraCheese.join(", ")}</p>}
                    </>
                  ) : <p>Standard Item</p>}
                </div>
                <p>₹{price}/-</p>
                <p>{quantity}</p>
                <p>₹{total}/-</p>
                <p onClick={() => removeFromCart(key)} className="cross">x</p>
              </div>
              <hr />
            </div>
          );
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
            }}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
