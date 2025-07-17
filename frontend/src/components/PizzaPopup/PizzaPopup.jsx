import React, { useState } from 'react';
import './PizzaPopup.css';

const PizzaPopup = ({ item, onCancel, onConfirm }) => {
  const [size, setSize] = useState('7 Inch [regular]');
  const [crusts, setCrusts] = useState([]);
  const [cheese, setCheese] = useState([]);
  const [toppings, setToppings] = useState([]);

  const priceMap = {
    sizes: {
      '7 Inch [regular]': { price: 0, original: 0 },
      '10 Inch [medium]': { price: 60, original: 100 },
      '13 Inch [large]': { price: 120, original: 200 },
    },
    crusts: {
      'Cheese Burst': { price: 30, original: 50 },
      'Pan': { price: 12, original: 20 },
    },
    cheese: {
      'Extra Cheese': { price: 24, original: 40 },
      'Double Extra Cheese': { price: 36, original: 60 },
    },
    toppings: [
      { name: 'Black Olives', price: 18, original: 30 },
      { name: 'Red Paprika', price: 18, original: 30 },
      { name: 'Jalapeno', price: 18, original: 30 },
      { name: 'Paneer', price: 18, original: 30 },
      { name: 'Mushroom', price: 18, original: 30 },
      { name: 'Golden Corn', price: 18, original: 30 },
      { name: 'Onion', price: 18, original: 30 },
      { name: 'Capsicum', price: 18, original: 30 },
      { name: 'Tomato', price: 18, original: 30 },
    ],
  };

  const handleSelection = (name, state, setState, limit) => {
    if (state.includes(name)) {
      setState(state.filter(item => item !== name));
    } else if (state.length < limit) {
      setState([...state, name]);
    }
  };

  const basePrice = item.price;
  const sizeExtra = priceMap.sizes[size]?.price || 0;
  const extraCost =
    sizeExtra +
    crusts.reduce((sum, c) => sum + priceMap.crusts[c].price, 0) +
    cheese.reduce((sum, c) => sum + priceMap.cheese[c].price, 0) +
    toppings.reduce((sum, t) => sum + priceMap.toppings.find(p => p.name === t).price, 0);

  const total = basePrice + extraCost;

  const handleAdd = () => {
    onConfirm({
      size,
      crusts,
      cheese,
      toppings,
      basePrice,
      extraCost,
      customPrice: total,
      quantity: 1,
    });
  };

  return (
    <div className="pizza-popup">
      <div className="pizza-popup-container">
        <div className="popup-header">
          <h3>{item.name}</h3>
          <button onClick={onCancel}>Close</button>
        </div>

        <p>{item.description}</p>

        <div className="section">
          <h4>Choose Size</h4>
          <div className="options">
            {Object.keys(priceMap.sizes).map(key => (
              <div
                key={key}
                className={`option ${size === key ? 'selected' : ''}`}
                onClick={() => setSize(key)}
              >
                <span>{key}</span>
                <s>Rs {basePrice + priceMap.sizes[key].original}.00</s>
                <strong>Rs {basePrice + priceMap.sizes[key].price}.00</strong>
              </div>
            ))}
          </div>
        </div>

        {[{
          title: 'Crusts',
          state: crusts,
          setState: setCrusts,
          data: priceMap.crusts,
          limit: 2,
        }, {
          title: 'Cheese',
          state: cheese,
          setState: setCheese,
          data: priceMap.cheese,
          limit: 2,
        }].map((section, i) => (
          <div className="section" key={i}>
            <h4>{section.title}</h4>
            <div className="options">
              {Object.keys(section.data).map(name => (
                <div
                  key={name}
                  className={`option ${section.state.includes(name) ? 'selected' : ''}`}
                  onClick={() => handleSelection(name, section.state, section.setState, section.limit)}
                >
                  <input type="checkbox" readOnly checked={section.state.includes(name)} />
                  <span>{name}</span>
                  <s>Rs {section.data[name].original}.00</s>
                  <strong>Rs {section.data[name].price}.00</strong>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="section">
          <h4>Choice of Toppings</h4>
          <div className="options">
            {priceMap.toppings.map(t => (
              <div
                key={t.name}
                className={`option ${toppings.includes(t.name) ? 'selected' : ''}`}
                onClick={() => handleSelection(t.name, toppings, setToppings, 9)}
              >
                <input type="checkbox" readOnly checked={toppings.includes(t.name)} />
                <span>{t.name}</span>
                <s>Rs {t.original}.00</s>
                <strong>Rs {t.price}.00</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="popup-footer">
          <p><b>Total:</b> ₹{total}/-</p>
          <button onClick={onCancel} className="cancel-btn">Cancel</button>
          <button onClick={handleAdd} className="add-btn">Add</button>
        </div>
      </div>
    </div>
  );
};

export default PizzaPopup;
