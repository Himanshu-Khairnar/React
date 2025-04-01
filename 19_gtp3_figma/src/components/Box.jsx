import React from 'react'

export default function Box({data}) {
  return (
    <div className="w-[500px]">
      <div className="bg-gradient-to-r from-fuchsia-500 to-orange-400 h-[3px] w-[35px] my-2"></div>
      <p className="text-white text-[24px] font-bold w-[220px]">{data}</p>
    </div>
  );
}
