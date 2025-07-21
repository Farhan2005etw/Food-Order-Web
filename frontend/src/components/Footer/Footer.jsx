import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="Logo" className='logo' />
                <p>MKD Suparmart, Ashok Nagar, Friends Colony, Etawah, Uttar Pradesh 206001</p>    
                <div className="footer-social-icons">
                 <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />

            </div>
            </div>
        
           
            <div className="footer-content-right">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-center">
               <h2>Get In Touch</h2>
                <ul>
                    <li>+91-8938009090</li>
                    <li>contact@applespizza.com</li>
                </ul>              

           </div>
        </div>
        <hr />
        <p className='footer-copyright'>© 2023 Food Delivery. All rights reserved.</p>
    </div>
  )
}

export default Footer
