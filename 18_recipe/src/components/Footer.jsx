import {
  Coffee,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <div className="bg-primary flex flex-col md:flex-row h-auto md:h-[273px] px-6 md:px-24 py-8">
      {/* Logo Section */}
      <div className="flex-1 flex items-center  gap-2 mb-6 md:mb-0">
        <Coffee className="w-8 h-8" />
        <h2 className="text-3xl font-medium font-mono">Delights at the Table</h2>
      </div>

      
      <div className="flex-1 flex flex-col items-left  justify-center">
        <h2 className="text-xl font-medium mb-3">Social Media:</h2>
        <div className="flex gap-3">
          <div className="h-9 w-9 bg-yellows rounded flex items-center justify-center">
            <Instagram />
          </div>
          <div className="h-9 w-9 bg-yellows rounded flex items-center justify-center">
            <Facebook />
          </div>
          <div className="h-9 w-9 bg-yellows rounded flex items-center justify-center">
            <Youtube />
          </div>
          <div className="h-9 w-9 bg-yellows rounded flex items-center justify-center">
            <Twitter />
          </div>
        </div>
      </div>
    </div>
  );
}
