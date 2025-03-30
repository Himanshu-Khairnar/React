import React, { useState, useEffect } from "react";
import Cards from "./Cards";

export default function RandomRecipe({ url, headerText, limit }) {
  const cardsLimit = parseInt(limit);
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    const getdata = async () => {
      const res = await fetch(url);
      const data = await res.json();
      setJsonData(data.meals);
    };
    getdata();
    return () => {
      getdata();
    };
  }, [headerText]);

  return (
    <div className="flex flex-col p-6 sm:p-10 md:p-16 lg:p-20">
      <h2 className="text-3xl font-bold mb-4">{headerText}</h2>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 
          place-items-center w-full gap-6 sm:gap-8 md:gap-10"
      >
        {jsonData
          .filter((_, i) => i < cardsLimit)
          .map((item) => (
            <Cards key={item.idMeal} data={item} />
          ))}
      </div>
    </div>
  );
}
