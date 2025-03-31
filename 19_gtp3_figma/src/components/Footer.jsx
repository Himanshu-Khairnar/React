import React from "react";

export default function Footer() {
  const links = ["Overons", "Social Media", "Counters", "Contact"];
  const company = ["Terms & Condition", "Privacy Policy", "Contact"];
  const getInTouch = [
    "Crechterwoord K12 182 DK Alknjkcb",
    "085-132567",
    "info@payme.net",
  ];

  return (
    <div className="bg-footer-primary text-white px-4 sm:px-6 md:px-10 lg:px-25 py-12">
      <div className="flex flex-col justify-center items-center text-center py-12 md:py-20 lg:py-[175px] gap-8 md:gap-12 lg:gap-24">
        <h1 className="bg-gradient-to-r from-fuchsia-500 to-orange-400 bg-clip-text text-transparent text-3xl md:text-4xl lg:text-5xl xl:text-[62px] w-full md:w-4/5 lg:w-[900px] font-extrabold leading-tight">
          Do you want to step in to the future before others
        </h1>
        <button className="w-[210px] h-[65px] border border-white">
          Request Early Access
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-start md:items-start flex-wrap gap-10 md:gap-8 lg:gap-10 xl:gap-15">
        <div className="w-full md:w-[250px]">
          <img src="GPT-3.svg" alt="" className="w-[100px] mb-4" />
          <p>Crechterwoord K12 182 DK Alknjkcb, All Rights Reserved</p>
        </div>

        <ul className="flex flex-col gap-5">
          <li className="font-bold">Links</li>
          {links.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <ul className="flex flex-col gap-5">
          <li className="font-bold">Company</li>
          {company.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <ul className="flex flex-col gap-5">
          <li className="font-bold">Get in touch</li>
          {getInTouch.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
