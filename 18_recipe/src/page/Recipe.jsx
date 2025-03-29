import React from 'react'
import RandomRecipe from "../components/RandomRecipe";

export default function Recipe() {
  return (
    <div>
      <RandomRecipe
        url="https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian"
        headerText="Indian Food 🇮🇳"
        limit="30"
      />
    </div>
  );
}
