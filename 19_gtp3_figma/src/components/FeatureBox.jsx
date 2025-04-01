import React from "react";
import Box from "./Box";

export default function FeatureBox({ data, para, className }) {
  return (
    <div className={`w-[325px]  ${className}`}>
      <Box data={data} />
      <p className="text-[16px] w-full text-text-color">{para}</p>
    </div>
  );
}
