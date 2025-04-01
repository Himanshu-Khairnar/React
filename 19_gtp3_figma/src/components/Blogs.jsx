import React from "react";

export default function Blogs({ img, className }) {
  return (
    <div
      className={`text-base sm:text-lg md:text-xl lg:text-2xl text-white bg-footer-primary ${className}`}
    >
      <div className="h-auto">
        <img src={img} alt="" className="h-auto w-full object-cover" />
      </div>
      <div className="flex flex-col justify-between h-auto min-h-48 gap-2 md:gap-4 px-3 md:px-4 pt-2">
        <div>
          <p className="text-xs mt-2 md:mt-3">Sep 26, 2021</p>
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl">
            GPT-3 and Open AI is the future. Let us exlore how it is?
          </h2>
        </div>
        <p className="text-xs mb-3 md:mb-4">Read Full Article</p>
      </div>
    </div>
  );
}
