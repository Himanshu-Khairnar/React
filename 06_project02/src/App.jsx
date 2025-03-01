import React, { useState ,useCallback} from "react";

export default function App() {
  const [length, setlength] = useState(8);
  const [password, setpassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  
  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str+="0987654321"
    if(charAllowed) str+="!@#$%^&*()_+{}[]`~/><"
    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setpassword(pass)

  }, [
    length,
    numberAllowed,
    charAllowed,setpassword
  ]);
  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500  ">
     re
    </div>
  );
}
