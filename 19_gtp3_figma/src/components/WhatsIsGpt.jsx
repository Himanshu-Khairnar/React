import React from "react";
import Box from "./Box";
import FeatureBox from "./FeatureBox";

export default function WhatsIsGpt() {
  return (
    <div className="bg-gradient-to-r from-gradient-color to-primary min-h-screen py-12">
      <div className="mx-24   bg-gradient-to-r from-whatisgpt to-whatisgpt-second">
        <div className="flex items-center jusitify-center px-20 py-10">
          <Box data="What is GPT-3" />
          <p className="text-text-color w-[731px]">
            We so opinion friends me message as delight. Whole front do of plate
            heard oh ought. His defective nor convinced residence own.
            Connection has put impossible own apartments boisterous. At jointure
            ladyship an insisted so humanity he. Friendly bachelor entrance to
            on by.
          </p>
        </div>

        <div className="flex items-center justify-between px-20 py-10 bg-gradient-to-r from-fuchsia-500 to-orange-400 bg-clip-text text-transparent">
          <h1 className="text-[34px] font-bold w-[475px] ">
            The possibilities are beyond your imagination
          </h1>
          <p className="text-[16px]">Explore The Library </p>
        </div>
        <div className="flex items-center justify-between px-20 py-10">
          <FeatureBox
            data="Chatbots"
            para="We so opinion friends me message as delight. Whole front do of plate heard oh ought. "
          />
          <FeatureBox
            data="Knowledgebase"
            para="At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. As put impossible own apartments b "
          />
          <FeatureBox
            data="Education"
            para="At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. As put impossible own apartments b "
          />
        </div>
      </div>
    </div>
  );
}
