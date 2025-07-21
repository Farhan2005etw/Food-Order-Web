import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, description, price, image, category, subCategory }) => {
  const { 
    cartItems, 
    addToCart, 
    removeFromCart, 
    url, 
    openPizzaPopup 
  } = useContext(StoreContext);

  const handleAddClick = () => {
    if (category.toLowerCase() === 'pizza') {
      openPizzaPopup({ id, name, description, price, image, subCategory });
    } else {
      addToCart(id);
    }
  };

  const quantity = typeof cartItems[id] === 'object' ? cartItems[id].quantity : cartItems[id] || 0;
  const fakeOriginalPrice = (price / 0.6).toFixed(2);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-img" src={url + '/images/' + image} alt={name} />
        <div className="discount-badge">40% OFF</div>
        {quantity === 0 ? (
          <img className="add" onClick={handleAddClick} src={assets.add_icon_white} alt="Add" />
        ) : (
          <div className="food-item-count">
            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="Remove" />
            <p>{quantity}</p>
            <img onClick={handleAddClick} src={assets.add_icon_green} alt="Add" />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <div className="food-item-price-container">
          <p className="food-item-price-original"><s>₹{fakeOriginalPrice}/-</s></p>
          <p className="food-item-price-discounted">₹{price}/-</p>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;