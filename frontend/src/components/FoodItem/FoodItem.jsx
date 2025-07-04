// import React, { useContext, useState } from 'react'
// import './FoodItem.css'
// import { assets } from '../../assets/assets'
// import { StoreContext } from '../../context/StoreContext';

// const FoodItem = ({id, name, description, price, image}) => {

//   const {cartItems, addToCart, removeFromCart} = useContext(StoreContext);


//   return (
//     <div className='food-item'>
//         <div className="food-item-img-container">
//             <img className='food-item-img' src={image} alt="" />
//             {!cartItems[id] ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt='' />
//             : <div className='food-item-count'>
//               <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
//               <p>{cartItems[id]}</p>
//               <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />

//             </div>
//             }
//             </div>
//             <div className="food-item-info">
//                 <div className="food-item-rating">
//                     <p>{name}</p>
//                     <img src={assets.rating_starts} alt="" />
//                 </div>
//                 <p className="food-item-desc">{description}</p>
//                 <p className="food-item-price">{price}/-</p>
//             </div>

//     </div>
//   )
// }

// export default FoodItem


import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({id, name, description, price, image}) => {
   const {cartItems, addToCart, removeFromCart} = useContext(StoreContext);
   
   // Calculate fake original price to show 40% discount
   // Current price becomes the "discounted" price
   const fakeOriginalPrice = (price / 0.6).toFixed(2);
   
   return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className='food-item-img' src={image} alt="" />
            
            {/* Discount badge */}
            <div className="discount-badge">40% OFF</div>
            
            {!cartItems[id] ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt='' />
            : <div className='food-item-count'>
              <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
              <p>{cartItems[id]}</p>
              <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
             </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">{description}</p>
            
            {/* Price section with discount */}
            <div className="food-item-price-container">
                <p className="food-item-price-original">₹{fakeOriginalPrice}/-</p>
                <p className="food-item-price-discounted">₹{price}/-</p>
            </div>
        </div>
     </div>
  )
}

export default FoodItem