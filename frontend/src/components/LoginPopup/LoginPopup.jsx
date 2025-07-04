import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";

const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Login");
  const [data, setdata] = useState({
    name:"",
    email:"",
    mobile:"",
    password:""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value
  }

  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Login" ? (
            <></>
          ) : (            
            <input type="text" placeholder="Your Name" required />,
            <input type="text" placeholder="Mobile Number" required /> 

          )}
          <input type="email" placeholder="Your Email" required />
          <input type="password" placeholder="Your Password" required />
        </div>
        <button type="submit">
          {currentState === "Login" ? "Login" : "Sign Up"}
        </button>
        <div className="login-condition">
          <input type="checkbox" required />
          <p>I agree to the terms and conditions</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a New Account?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already Have an Account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login Here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
