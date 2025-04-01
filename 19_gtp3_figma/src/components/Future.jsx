import React from "react";
import FeatureBox from "./FeatureBox";

export default function Future() {
  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-r from-gradient-color to-primary px-6 md:px-12 lg:px-25 py-12 min-h-screen justify-between">
      <div className="text-center md:text-left">
        <h1 className="bg-gradient-to-r from-fuchsia-500 to-orange-400 bg-clip-text text-transparent text-[32px] md:text-[42px] font-bold max-w-[450px] mx-auto md:mx-0">
          The Future is Now and You Just Need To Realize It. Step into Future
          Today & Make it Happen.
        </h1>
        <p className="text-orange-400 mt-5 md:mt-10 text-[16px]">
          Request Early Access to Get Started
        </p>
      </div>

      <div className="flex flex-col gap-5 md:gap-7 mt-8 md:mt-0">
        <FeatureBox
          data={"Improving end distrusts instantly "}
          para={
            "From they fine john he give of rich he. They age and draw mrs like. Improving end distrusts may instantly was household applauded."
          }
          className={
            "flex flex-col md:flex-row gap-5 md:gap-20 w-full md:w-[600px] h-auto md:h-[95px] text-[14px]"
          }
        />
        <FeatureBox
          data={"Become the tended active"}
          para={
            "Considered sympathize ten uncommonly occasional assistance sufficient not. Letter of on become he tended active enable to."
          }
          className={
            "flex flex-col md:flex-row gap-5 md:gap-20 w-full md:w-[600px] h-auto md:h-[95px] text-[14px]"
          }
        />
        <FeatureBox
          data={"Message or am nothing"}
          para={
            "Led ask possible mistress relation elegance eat likewise debating. By message or am nothing amongst chiefly address."
          }
          className={
            "flex flex-col md:flex-row gap-5 md:gap-20 w-full md:w-[600px] h-auto md:h-[95px] text-[14px]"
          }
        />
        <FeatureBox
          data={"Really boy law county"}
          para={
            "Really boy law county she unable her sister. Feet you off its like like six. Among sex are leave law built now. In built table in an rapid blush."
          }
          className={
            "flex flex-col md:flex-row gap-5 md:gap-20 w-full md:w-[600px] h-auto md:h-[95px] text-[14px]"
          }
        />
      </div>
    </div>
  );
}
