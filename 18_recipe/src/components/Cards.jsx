import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export default function Cards({ data }) {

  return (
    <div
      className={`group bg-no-repeat bg-gray-400 bg-blend-multiply bg-cover  h-[350px]  w-[300px]  rounded-3xl hover:bg-gray-50 hover: hover:font-bold flex justify-end items-end flex-col  text-whites  hover:text-gray-700`}
      style={{ backgroundImage: `url(${data.strMealThumb})` }}
    >
      <div className=" w-full py-5 px-7  ">
        <Link
          to={{
            pathname: "/recipeInfo",
            search: `?id=${data.idMeal}`,
          }}
          className="text-xl  flex group-hover:bg-primary w-48 p-1 rounded-xl group-hover:scale-101 group-hover:animate-bounce hover:bg-yellows"
        >
          {data.strMeal} <ArrowRight />
        </Link>
      </div>
    </div>
  );
}
