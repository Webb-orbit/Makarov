import React, { useState, useEffect} from "react";

function Hidra({catcher}) {
  const [state, setstate] = useState(false);
  const [random, setrandom] = useState("")
  const [passcode, setpasscode] = useState("")
  const sos = [
  900, 500, 900, 500, 900, 500, 900, 500, 900, 500, 900, 500, 900
];

  useEffect(()=>{
    let num = "";
    for (let i = 0; i < 3; i++) {
        num += Math.floor(Math.random() * 10);
    }
    setrandom(num)
    try {
      const data = localStorage.getItem("ultra");
      if(JSON.parse(data)){
      setstate(true);
      navigator.vibrate(sos);
      }
    } catch (error) {
      setstate(false);
    }
    return()=>{
      num = ""
    }
  },[catcher])

  useEffect(()=>{
if(passcode == `TN${random * 2}`){
  localStorage.removeItem("ultra");
  setstate(false)
  setpasscode("")
}
  },[passcode])
  

  return state?(
<div className="bg-neutral-900 z-[1000] fixed top-0 left-0 w-[100%] h-screen text-neutral-200">
  <div className="flex flex-col gap-4 justify-center items-center h-screen w-full">
    <h3 className="text-neutral-200 text-[1rem] uppercase">yo! don't forget who I am.<sub className="text-[0.3rem] text-neutral-200" >TN</sub></h3>
    <div className="flex flex-col gap-2 justify-center items-center">
      <p className="font-medium uppercase text-neutral-200 ">{random}</p>
      <input
        type="text"
        value={passcode}
        onChange={(e) => setpasscode(e.target.value)}
        className="font-medium w-[90%] p-2 bg-neutral-200 text-[0.9rem] text-black rounded-md"
        placeholder="Enter passcode"
      />
      </div>
    </div>
    </div>
  ):null;
}

export default Hidra;
