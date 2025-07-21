import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  // Filter food items based on category
  const filteredItems = food_list.filter(item => 
    category === "All" || category === item.category
  );

  // Group items by subcategory
  const groupedBySubcategory = filteredItems.reduce((acc, item) => {
    const subCategory = item.subCategory || 'Other'; // fallback for items without subcategory
    if (!acc[subCategory]) {
      acc[subCategory] = [];
    }
    acc[subCategory].push(item);
    return acc;
  }, {});

  // Get sorted subcategory names
  const subcategoryNames = Object.keys(groupedBySubcategory).sort();

  return (
    <div className='food-display' id='food-display'>
      <h2>Top Dishes Near You</h2>
      
      {subcategoryNames.map(subCategory => (
        <div key={subCategory} className="subcategory-section">
          <h3 className="subcategory-heading">{subCategory}</h3>
          <div className="food-display-list">
            {groupedBySubcategory[subCategory].map(item => (
              <FoodItem
                key={item._id}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                category={item.category}
              />
            ))}
          </div>
        </div>
      ))}
      
      {subcategoryNames.length === 0 && (
        <p className="no-items">No items found for the selected category.</p>
      )}
    </div>
  );
};

export default FoodDisplay;