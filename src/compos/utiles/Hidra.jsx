import React, { useState, useEffect} from "react";

function Hidra({catcher}) {
  const [state, setstate] = useState(false);
  const [random, setrandom] = useState(true)

  useEffect(()=>{
    let num = "";
    for (let i = 0; i < 3; i++) {
        num += Math.floor(Math.random() * 10);
    }
    setrandom(num)
    const data = localStorage.getItem("ultra");
    data?setstate(JSON.parse(data)):setstate(false)
    return()=>{
      num = ""
    }
  },[])

  useEffect(()=>{
if(passcode == `TN${random * 2}`){
 localStorage.removeItem("ultra");
setstate(false)
}
  },[passcode])
  
  useEffect(()=>{
    const data = localStorage.getItem("ultra");
    data?setstate(JSON.parse(data)):setstate(false)
  },[catcher])

  return state?(
    <div className={`bg-neutral-900 z-[1000] fixed top-0 left-0 w-full h-screen text-neutral-200`}>
      <div class="flex items-center justify-center">
        <input type="text" value={passcode} onChange={(e)=> setpasscode(e.target.value)}
          className="font-medium w-[90%] bg-neutral-200 text-[0.9rem]"
          />
      </div>
    </div>
  ):null;
}

export default Hidra;
