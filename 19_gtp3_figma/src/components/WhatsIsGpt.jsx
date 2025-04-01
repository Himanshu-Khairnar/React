import React from "react";
import Box from "./Box";
import FeatureBox from "./FeatureBox";

export default function WhatsIsGpt() {
  return (
    <div className="bg-gradient-to-r from-gradient-color to-primary min-h-screen py-12">
      <div className="mx-4 md:mx-12 lg:mx-24 bg-gradient-to-r from-whatisgpt to-whatisgpt-second">
        <div className="flex flex-col md:flex-row items-center justify-center px-6 md:px-12 lg:px-20 py-10 text-center md:text-left">
          <Box data="What is GPT-3" />
          <p className="text-text-color max-w-[731px] mt-4 md:mt-0">
            We so opinion friends me message as delight. Whole front do of plate
            heard oh ought. His defective nor convinced residence own.
            Connection has put impossible own apartments boisterous. At jointure
            ladyship an insisted so humanity he. Friendly bachelor entrance to
            on by.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-10 bg-gradient-to-r from-fuchsia-500 to-orange-400 bg-clip-text text-transparent text-center md:text-left">
          <h1 className="text-[28px] md:text-[34px] font-bold w-full md:w-[475px]">
            The possibilities are beyond your imagination
          </h1>
          <p className="text-[16px] mt-2 md:mt-0">Explore The Library</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-12 lg:px-20 py-10">
          <FeatureBox
            data="Chatbots"
            para="We so opinion friends me message as delight. Whole front do of plate heard oh ought."
          />
          <FeatureBox
            data="Knowledgebase"
            para="At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. As put impossible own apartments."
          />
          <FeatureBox
            data="Education"
            para="At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. As put impossible own apartments."
          />
        </div>
      </div>
    </div>
  );
}
