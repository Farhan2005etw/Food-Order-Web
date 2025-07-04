import React, { useState } from 'react'
import './Home.css'
import Headers from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'

const Home = () => {

  const [category, setCategory] = useState('All');

  return (
    <div>
        <Headers />
        <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category} />
    </div>
  )
}

export default Home
