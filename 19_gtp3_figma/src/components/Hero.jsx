import React from 'react'

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-gradient-color to-primary  min-h-screen flex px-25 py-12 text-white">
      <div className="flex-1">
        <h1 className="bg-gradient-to-r from-fuchsia-500 to-orange-400 bg-clip-text text-transparent text-[62px] font-bold ">
          Let's Build Something amazing with GPT-3 OpenAI
        </h1>
        <p className="text-text-color text-20 mt-5">
          Yet bed any for travelling assistance indulgence unpleasing. Not
          thoughts all exercise blessing. Indulgence way everything joy
          alteration boisterous the attachment. Party we years to order allow
          asked of.
        </p>

        <div className="flex mt-5">
          <input
            type="text"
            placeholder="Your Email Address"
            className="w-[460px] h-[70px] bg-input-color px-4 rounded-l-lg"
          />
          <button className="bg-orange-600  w-[175px] h-[70px] rounded-r-lg">
            Get Started
          </button>
        </div>

        <div className='flex items-center justify-start mt-10'>
          <img src="avatar.png" alt="" srcset="" className="h-[40px]" />
          <p>1,600 people requested access a visit in last 24 hours</p>
        </div>
      </div>
      <div className="flex">
        <img src="Illustration.png" alt="" srcset="" className="h-[650px]" />
      </div>
    </div>
  );
}
