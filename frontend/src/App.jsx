import React, { useState, useContext } from 'react';
import Navbar from './components/navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import PizzaPopup from './components/PizzaPopup/PizzaPopup';
import { ToastContainer } from 'react-toastify';
import { StoreContext } from './context/StoreContext';
import MyOrder from './pages/MyOrder/MyOrder';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { showPizzaPopup, pizzaItem, closePizzaPopup, confirmPizzaOrder } = useContext(StoreContext);

  return (
    <>
      <ToastContainer />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      {showPizzaPopup && pizzaItem && (
        <PizzaPopup
          item={pizzaItem}
          onCancel={closePizzaPopup}
          onConfirm={confirmPizzaOrder}
        />
      )}
      <div className="App">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/myorder' element={<MyOrder />} />
          
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;