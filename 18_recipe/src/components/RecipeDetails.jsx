import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router";

export default function ecipeDetails({ data }) {
  const formattedInstruction = data.strInstructions?.replace(/\r\n/g, "<br/>");
  const htmlFormatedInstruction = formattedInstruction?.replace(/\r/g, "<br/>");
  let ingredientMeasurement = [];

  for (let index = 1; index < 21; index++) {
    const data1 = "strIngredient" + index;
    const data2 = "strMeasure" + index;
    const value1 = data[data1];
    const value2 = data[data2];

    ingredientMeasurement = [...ingredientMeasurement, { value1, value2 }];
  }
  
    // const urlObj = new URL(data.strYoutube);
    // const youtubeId = urlObj.searchParams.get("v");
  

  return (
    <div className="bg-whites text-black p-6 rounded-xl shadow-lg max-full px-20">
      {data.strTags && (
        <h1 className="text-yellow-400 font-bold text-lg mb-2">
          #{data?.strTags.replaceAll(",", " #")}
        </h1>
      )}
      <h1 className="text-2xl font-bold text-yellow-400 mb-1">
        {data.strMeal}
      </h1>
      <p className="text-gray-500 text-sm">
        {data.strCategory} • {data.strArea}
      </p>
      <hr className="my-4 border-yellow-400" />

      <div
        className="text-black"
        dangerouslySetInnerHTML={{ __html: htmlFormatedInstruction }}
      />

      <div className="mt-4">
        <h2 className="text-yellow-400 font-semibold text-lg mb-2">
          Ingredients
        </h2>
        <div className="space-y-2">
          {ingredientMeasurement
            .filter((item) => item.value1 !== "" && item.value2 !== "")
            .map((item, index) => (
              <p key={index} className="flex items-center gap-2 text-black">
                {item.value1} <ArrowRight className="text-yellow-400" />{" "}
                {item.value2}
              </p>
            ))}
        </div>
      </div>

      <div className="mt-6 flex justify-start">
        <Link
          to={data.strYoutube}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary hover:bg-yellows text-white font-medium py-2 px-4 rounded-md shadow-sm transition duration-300 hover"
        >
          🎥 WATCH VIDEO
        </Link>
      </div>
    </div>
  );
}
