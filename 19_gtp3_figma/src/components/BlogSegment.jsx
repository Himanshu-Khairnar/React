import React from "react";
import Blogs from "./Blogs";

export default function BlogSegment() {
  return (
    <div className="bg-gradient-to-r from-gradient-color to-primary px-4 md:px-8 lg:px-12 py-8 md:py-12 min-h-screen">
      <h1 className="w-full max-w-4xl text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-fuchsia-500 to-orange-400 bg-clip-text text-transparent mb-8">
        A lot is happening, We are blogging about it.
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Blogs
          className="col-span-1 md:col-span-1 w-full h-auto md:h-full"
          img="blog1.png"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 col-span-1 md:col-span-2">
          <Blogs className="w-full h-auto" img="blog2.png" />
          <Blogs className="w-full h-auto" img="blog3.png" />
          <Blogs className="w-full h-auto" img="blog4.png" />
          <Blogs className="w-full h-auto" img="blog5.png" />
        </div>
      </div>
    </div>
  );
}
