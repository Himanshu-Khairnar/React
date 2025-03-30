import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export default function Cards({ data }) {
  return (
    <div
      className={`group bg-no-repeat bg-gray-400 bg-blend-multiply bg-cover rounded-3xl 
      hover:bg-gray-50 hover:font-bold flex justify-end items-end flex-col text-white 
      hover:text-gray-700 transition-all duration-300 ease-in-out
      h-[200px] w-[180px] sm:h-[250px] sm:w-[220px] md:h-[300px] md:w-[260px] lg:h-[350px] lg:w-[300px]`}
      style={{ backgroundImage: `url(${data.strMealThumb})` }}
    >
      <div className="w-full py-3 px-5 sm:py-4 sm:px-6 md:py-5 md:px-7">
        <Link
          to={{
            pathname: "/recipeInfo",
            search: `?id=${data.idMeal}`,
          }}
          className="text-lg sm:text-xl flex items-center gap-2 group-hover:bg-yellows w-full p-2 rounded-xl 
          group-hover:scale-105 transition-all duration-200 ease-in-out bg-primary bg-opacity-50"
        >
          {data.strMeal} <ArrowRight />
        </Link>
      </div>
    </div>
  );
}
