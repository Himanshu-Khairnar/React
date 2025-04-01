import React from "react";
import Box from "./Box";

export default function FeatureBox({data,para}) {
  return (
    <div className="w-[325px]">
      <Box data={data} />
      <p className="text-[16px] text-text-color">
       {para}
      </p>
    </div>
  );
}
