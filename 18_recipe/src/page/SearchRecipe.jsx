import React from 'react'
import RandomRecipe from "../components/RandomRecipe";
import { useSearchParams } from "react-router";

export default function SearchRecipe() {
      const [searchParams] = useSearchParams();
      const value = searchParams.get("value");
  return (
    <div>
       <RandomRecipe
              url={`https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`}
              headerText={value.toLocaleUpperCase()}
              limit="50"
            />
    </div>
  )
}
