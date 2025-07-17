import React, {  useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios'

const LoginPopup = ({ setShowLogin }) => {

  const {url, setToken} = useContext(StoreContext)

  {/* Login & Register State */}
  const [currentState, setCurrentState] = useState("Login");

  {/* User Input Data Storing State */}
  const [data, setdata] = useState({
    name:"",
    mobile:"",
    email:"",
    password:""
  })
  
  {/* Tracking User Inputs */}
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata(data=>({...data,[name]:value}))
  }

  const onLogin = async (event) => {
    event.preventDefault()
    let newUrl = url
    if (currentState === 'Login') {
      newUrl += '/api/user/login'      
    }else{
      newUrl += '/api/user/register'
    }

    const response = await axios.post(newUrl,data);
    if (response.data.success) {
      setToken(response.data.token)
      localStorage.setItem("token", response.data.token) 
      setShowLogin(false)
      console.log(response.data.token);
                 
    } else {
      alert(response.data.message);
    }

  }

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">

        {/* Login Heading */}
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
            <>          
            <input type="text" name="name" onChange={onChangeHandler} value={data.name} placeholder="Your Name" required />
            <input type="text" name="mobile" onChange={onChangeHandler} value={data.mobile} placeholder="Mobile Number" required /> 
            </>

          )}

          <input type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder="Your Email" required />
          <input type="password" name="password" onChange={onChangeHandler} value={data.password} placeholder="Your Password" required />

        </div>

        {/* Button According State */} 
        <button type="submit">          
          {currentState === "Login" ? "Login" : "Sign Up"}
        </button>

        {/* Terms $ Condition and showing state for login and register */}
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
