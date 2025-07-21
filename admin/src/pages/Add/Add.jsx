import React, { useState } from 'react'
import './Add.css'
import {assets} from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name:'',
    description:'',
    price:'',
    category:'Select',
    subCategory:'Select'


  })

  const onChangeHandler = (event) => {
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name',data.name)        
    formData.append('description',data.description)        
    formData.append('price',Number(data.price))
    formData.append('image',image)         
    formData.append('category',data.category)    
    formData.append('subCategory',data.subCategory)

    
    const response = await axios.post(`${url}/api/food/add`, formData);
    
    if (response.data.success) {
      setData({
    name:'',
    description:'',
    price:'',
    category:'Select',
    subCategory:'Select'

  })  
  setImage(false)

  toast.success(response.data.message, {
    theme: 'colored'
  })
    }
    else {
      toast.error(response.data.message,{
        theme: 'colored'
      })
    }
   
  }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input onChange={(e) =>setImage(e.target.files[0])} type="file" id='image' hidden required />
          <div className="add-product-name flex-col">
            <p>Product Name</p>
            <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type Here' />
            <div className="add-product-description flex-col">
              <p>Product Description</p>
              <textarea onChange={onChangeHandler} value={data.description} name="description" placeholder='Write Your Description' rows='6' ></textarea>
            </div>
            <div className="add-category-price">
              <div className="add-category flex-col">
                <p>Product Category</p>
                <select onChange={onChangeHandler} name="category" >
                  <option value="Select">Select</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Garlic Bread">Garlic Bread</option>
                  <option value="Rolls">Rolls</option>
                  <option value="Pasta">Pasta</option>
                  <option value="Combo">Combo</option>                 
                  <option value="Noodles">Noodles</option>
                </select>
              </div>
              <div className="add-category flex-col">
                <p>Product Sub Category</p>
                <select onChange={onChangeHandler} name="subCategory" >
                  <option value="Select">Select</option>
                  <option value="Simply Veg">Simply Veg</option>
                  <option value="Veg Treat">Veg Treat</option>
                  <option value="Veg Special">Veg Special</option>
                  <option value="Veg Feast Pizzas">Veg Feast Pizzas</option>
                  <option value="Pizza Mania Veg Single">Pizza Mania Veg Single</option>
                  <option value="Pizza Mania Veg Double">Pizza Mania Veg Double</option>
                  <option value="Pizza Mania Veg Double Extra Cheese">Pizza Mania Veg Double Extra Cheese</option>
                  <option value="Pasta">Pasta</option>
                  <option value="Bread">Bread</option>
                  <option value="Combination Set">Combination Set</option>
                </select>
              </div>
              <div className="add-price flex-col">
                <p>Product Price</p>
                <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='Enter Your Price' />
              </div>
            </div>
            <button type='submit' className='add-btn'>Add</button>
          </div>
          </div></form>      
    </div>
  )
}

export default Add
