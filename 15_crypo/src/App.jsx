import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export default function App() {

  const [data,setData] =useState([])
  const [currency,setCurrency] = useState("inr") 

  useEffect(()=>{
    const getData = async()=>{
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false`);

      const data = await res.json()
      console.log(data);
        setData(data)
    }
    getData();
    
  })
  return (
    <div>
      <input type="text" />
      
    </div>
  )
}
