import React from "react";

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-gradient-color to-primary min-h-screen flex flex-col md:flex-row items-center px-6 md:px-25 py-12 text-white">
      <div className="flex-1 text-center md:text-left">
        <h1 className="bg-gradient-to-r from-fuchsia-500 to-orange-400 bg-clip-text text-transparent text-4xl md:text-[62px] font-bold leading-tight">
          Let's Build Something amazing with GPT-3 OpenAI
        </h1>
        <p className="text-text-color text-lg md:text-2xl mt-5">
          Yet bed any for travelling assistance indulgence unpleasing. Not
          thoughts all exercise blessing. Indulgence way everything joy
          alteration boisterous the attachment. Party we years to order allow
          asked of.
        </p>

        <div className="flex flex-col md:flex-row mt-5 items-center">
          <input
            type="text"
            placeholder="Your Email Address"
            className="w-full md:w-[460px] h-[60px] md:h-[70px] bg-input-color px-4 rounded-l-lg md:rounded-l-lg mb-4 md:mb-0"
          />
          <button className="bg-orange-600 w-full md:w-[175px] h-[60px] md:h-[70px] rounded-r-lg md:rounded-r-lg">
            Get Started
          </button>
        </div>

        <div className="flex items-center justify-center md:justify-start mt-10">
          <img src="avatar.png" alt="avatar" className="h-[40px]" />
          <p className="ml-3 text-sm md:text-base">
            1,600 people requested access a visit in last 24 hours
          </p>
        </div>
      </div>

      <div className="flex justify-center md:justify-end mt-10 md:mt-0">
        <img
          src="Illustration.png"
          alt="illustration"
          className="h-[300px] md:h-[650px] w-auto"
        />
      </div>
    </div>
  );
}
