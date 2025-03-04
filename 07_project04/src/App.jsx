import { MoveRight, RefreshCcw } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

export default function App() {
  const [data, setData] = useState({});
  const [refresh, setRefresh] = useState(false);
  // const getQuote = useCallback(, []);
  useEffect(() => {
    const getQuote = async () => {
      const res = await fetch("https://api.quotable.io/random");
      const jsonRes = await res.json();

      setData(jsonRes);
    };
    getQuote();
  }, [refresh]);
  return (
    <div className="bg-main min-h-screen text-text w-full flex flex-col items-center justify-center ">
      <div className="flex flex-col items-left justify-center  p-20 border-2 w-1/2 rounded-2xl gap-2 bg-secondary">
        <h1 className="font-thin text-2xl italic">'{data.content}'</h1>
        <a
          href={`https://en.wikipedia.org/wiki/${data.authorSlug}`}
          target="_blank"
          className=" hover:text-secondaryText underline"
        >
          by {data.author}
        </a>
      </div>
      <button
        onClick={() => setRefresh((prev) => !prev)}
        className=" m-10 bg-secondary h-10 w-15 text-center px-4 rounded-xl border-1    hover:bg-main hover:scale-105"
      >
        {" "}
        <RefreshCcw />{" "}
      </button>
    </div>
  );
}
