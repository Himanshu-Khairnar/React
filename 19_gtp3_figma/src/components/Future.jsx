import React from "react";
import FeatureBox from "./FeatureBox";
export default function Future() {
  return (
    <div className="flex bg-gradient-to-r from-gradient-color to-primary px-25 py-12 min-h-screen justify-between">
      <div className="">
        <h1 className="bg-gradient-to-r from-fuchsia-500 to-orange-400 bg-clip-text text-transparent text-[42px] font-bold w-[450px]">
          The Future is Now and You Just Need To Realize It. Step into Future
          Today & Make it Happen.
        </h1>
        <p className="text-orange-400 mt-10 text-[16px]">
          Request Early Access to Get Started
        </p>
      </div>
      <div className="flex flex-col gap-7 ">
        <FeatureBox
          data={"Improving end distrusts instantly "}
          para={
            "From they fine john he give of rich he. They age and draw mrs like. Improving end distrusts may instantly was household applauded."
          }
          className={"flex gap-20 w-[600px] h-[95px] text-[14px]"}
        />
        <FeatureBox
          data={"Become the tended active"}
          para={
            "Considered sympathize ten uncommonly occasional assistance sufficient not. Letter of on become he tended active enable to."
          }
          className={"flex gap-20 w-[600px] h-[95px]"}
        />
        <FeatureBox
          data={"Message or am nothing"}
          para={
            "Led ask possible mistress relation elegance eat likewise debating. By message or am nothing amongst chiefly address."
          }
          className={"flex gap-20 w-[600px] h-[95px]"}
        />
        <FeatureBox
          data={"Really boy law county"}
          para={
            "Really boy law county she unable her sister. Feet you off its like like six. Among sex are leave law built now. In built table in an rapid blush."
          }
          className={"flex gap-20 w-[600px] h-[95px]"}
        />
        <FeatureBox
          data={"Improving end distrusts instantly "}
          para={
            "From they fine john he give of rich he. They age and draw mrs like. Improving end distrusts may instantly was household applauded."
          }
          className={"flex gap-20 w-[600px] h-[95px]"}
        />
      </div>
    </div>
  );
}
