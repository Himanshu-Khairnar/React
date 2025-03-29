import React from 'react'
import Hero from '../components/Hero'
import RandomRecipe from '../components/RandomRecipe'

export default function Home() {
  return (
    <div>
      <Hero
        url="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        data=" Inspire yourself, cook with passion and savor unforgettable moments at
        the table."
        
      />
      <RandomRecipe url="https://www.themealdb.com/api/json/v1/1/search.php?s=Chicken" headerText="Most View 🩷" limit="8" />
    </div>
  );
}
