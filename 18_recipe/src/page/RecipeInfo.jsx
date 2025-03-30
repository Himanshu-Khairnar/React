import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Hero from "../components/Hero";
import RecipeDetails from "../components/RecipeDetails";

export default function RecipeInfo() {
  const [searchParams] = useSearchParams(); // Correct usage
  const value = searchParams.get("id");
  const [datas,setData] = useState("")
  useEffect(() => {
    const getdata = async (value) => {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${value}`
      );
      
      const data = await res.json();
      setData(data.meals[0]);

      
    };
    getdata(value);
    return () => {
      getdata(value);
    };
  }, [value]);
  return (
    <div>
      <Hero url={datas.strMealThumb} data={datas.strMeal} />
      <RecipeDetails data={datas}/>
    </div> 
  );
}
