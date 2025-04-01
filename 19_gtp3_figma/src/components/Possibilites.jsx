import React from "react";

export default function Possibilities() {
  return (
    <div className="bg-gradient-to-r from-gradient-color to-primary px-6 md:px-12 lg:px-25 py-12 min-h-screen flex flex-col gap-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        <img
          src="FeatureImage.png"
          alt="Feature"
          className="w-full md:w-[550px] object-cover"
        />
        <div className="text-[16px] max-w-[600px] flex flex-col gap-4 text-center md:text-left">
          <p className="text-cyan-500">Request Early Access to Get Started</p>
          <h2 className="text-[28px] md:text-[34px] font-bold max-w-[430px] mx-auto md:mx-0 bg-gradient-to-r from-fuchsia-500 to-orange-400 bg-clip-text text-transparent">
            The possibilities are beyond your imagination
          </h2>
          <p className="text-text-color max-w-[450px] mx-auto md:mx-0">
            Yet bed any for travelling assistance indulgence unpleasing. Not
            thoughts all exercise blessing. Indulgence way everything joy
            alteration boisterous the attachment. Party we years to order allow
            asked of.
          </p>
          <p className="text-orange-400 mt-5 md:mt-10">
            Request Early Access to Get Started
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-fuchsia-500 to-orange-400 px-8 md:px-15 py-8 md:py-10 mt-12 md:mt-36 rounded-lg flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6 md:gap-0">
        <div>
          <p className="text-[12px] text-gray-800">
            Request Early Access to Get Started
          </p>
          <h1 className="text-[20px] md:text-[24px] font-bold max-w-[400px]">
            Register today & start exploring the endless possibilities.
          </h1>
        </div>
        <button className="bg-black text-white text-[18px] w-[150px] h-[50px] rounded-3xl">
          Get Started
        </button>
      </div>
    </div>
  );
}
