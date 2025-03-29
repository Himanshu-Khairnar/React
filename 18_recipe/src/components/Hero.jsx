import React from "react";

export default function Hero({url,data}) {
  return (
    <div className={`bg-[url(${url})]  h-[362px] bg-center bg-no-repeat bg-gray-500 bg-blend-multiply bg-cover w-full flex items-center justify-center `}>
      <h1 className="text-white text-4xl font-bold w-[1400px]">
       {data}
      </h1>
    </div>
  );
}
