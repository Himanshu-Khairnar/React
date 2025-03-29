import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Hero from "../components/Hero";

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
      setData(data.meals)
      log
    };
    getdata(value);
    return () => {
      getdata(value);
    };
  }, [value]);
  return (
    <div>
      <Her  o url={datas.strMealThumb} data={datas.strMeal} />
    </div> 
  );
}
