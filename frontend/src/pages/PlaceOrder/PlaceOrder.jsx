import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {

  const {getTotalCartAmount} = useContext(StoreContext)

  return (
    <div className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
             <input type="text" placeholder='First Name' />
             <input type="text" placeholder='Last Name'/> 
        </div>
        <input type="text" placeholder='Mobile No'/>
        <input type="text" placeholder='House No' />
      <div className="multi-fields">
             <input type="text" placeholder='Street/Ward' />
             <input type="text" placeholder='Landmark'/> 
        </div> 
      <div className="multi-fields">
             <input type="text" placeholder='Town' />
             <input type="text" placeholder='City'/> 
        </div> 
      <input type="text" placeholder='Extra Message' />
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
            <p>₹{0}/-</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>₹{getTotalCartAmount()}/-</b>
          </div>
          <button       
            
          >
            PROCEED TO PAYMENT
          </button>
        </div>        

      
      </div>      
    </div>
  )
}

export default PlaceOrder
