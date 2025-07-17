import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setfood_list] = useState([]);

  // 🔹 Pizza Popup State
  const [showPizzaPopup, setShowPizzaPopup] = useState(false);
  const [pizzaItem, setPizzaItem] = useState(null);

  // 🔹 Generate unique key for customized pizza
  const generateUniqueKey = (id, options) => {
    if (!options) return id;
    const { size, crusts, cheese, toppings, extraCheese } = options;
    return `${id}-${size}-${crusts?.join('-')}-${cheese?.join('-')}-${toppings?.join('-')}-${extraCheese?.join('-')}`;
  };

  // 🔸 Pizza Popup Handlers
  const openPizzaPopup = (item) => {
    setPizzaItem(item);
    setShowPizzaPopup(true);
  };

  const closePizzaPopup = () => {
    setShowPizzaPopup(false);
    setPizzaItem(null);
  };

  const confirmPizzaOrder = async (options) => {
    if (pizzaItem) {
      await addToCart(pizzaItem.id, options);
      closePizzaPopup();
    }
  };

  // 🔸 ADD TO CART
  const addToCart = async (itemId, options = null) => {
    const cartKey = generateUniqueKey(itemId, options);
    setCartItems((prev) => {
      const existing = prev[cartKey];
      let updatedItem;
      if (existing) {
        updatedItem = typeof existing === 'number'
          ? existing + 1
          : { ...existing, quantity: existing.quantity + 1 };
      } else {
        updatedItem = options
          ? { ...options, id: itemId, quantity: 1 }
          : 1;
      }
      return { ...prev, [cartKey]: updatedItem };
    });

    if (token) {
      await axios.post(url + "/api/cart/add", {
        cartKey,
        itemId,
        custom: options || null
      }, {
        headers: { token }
      });
    }
  };

  // 🔸 REMOVE FROM CART
  const removeFromCart = async (cartKey) => {
    setCartItems((prev) => {
      const item = prev[cartKey];
      if (!item) return prev;
      if (typeof item === 'number') {
        return item <= 1
          ? Object.fromEntries(Object.entries(prev).filter(([k]) => k !== cartKey))
          : { ...prev, [cartKey]: item - 1 };
      } else if (item.quantity <= 1) {
        const updated = { ...prev };
        delete updated[cartKey];
        return updated;
      } else {
        return {
          ...prev,
          [cartKey]: { ...item, quantity: item.quantity - 1 }
        };
      }
    });

    if (token) {
      await axios.post(url + "/api/cart/remove", { cartKey }, { headers: { token } });
    }
  };

  // 🔸 CLEAR CART (🌟 Added)
  const clearCart = async () => {
    setCartItems({});
    localStorage.removeItem("cartItems");
    if (token) {
      await axios.post(url + "/api/cart/clear", {}, { headers: { token } });
    }
  };

  // 🔸 TOTAL AMOUNT
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const key in cartItems) {
      const item = cartItems[key];
      if (typeof item === 'number') {
        const itemInfo = food_list.find(p => p._id === key);
        if (itemInfo) totalAmount += itemInfo.price * item;
      } else if (item?.quantity > 0) {
        totalAmount += item.customPrice * item.quantity;
      }
    }
    return totalAmount;
  };

  // 🔸 FETCH ITEMS
  const fetchFoodList = async () => {
    const response = await axios.get(url + '/api/food/list');
    setfood_list(response.data.data);
  };

  // 🔸 LOAD USER CART
  const loadCartData = async (token) => {
    const response = await axios.post(url + "/api/cart/get", {}, {
      headers: { token }
    });
    setCartItems(response.data.cart);
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await loadCartData(savedToken);
      }
    };
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    generateUniqueKey,
    showPizzaPopup,
    pizzaItem,
    openPizzaPopup,
    closePizzaPopup,
    confirmPizzaOrder,
    clearCart, // 🌟 Exposed here
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
