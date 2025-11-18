import { useEffect, useState, useRef} from "react"
import Admin from "./appwrite/auth"
import { useDispatch, useSelector} from "react-redux"
import { storelogin } from "./store/adminslice"
import Loadingpage from "./compos/utiles/Loadingpage"
import Hidra from "./compos/utiles/Hidra"
import { Outlet, useNavigate, useLocation } from "react-router-dom"



const App = () => {
  const disptch = useDispatch()
  const [loading, setloading] = useState(true)
  const [hidra, sethidra] = useState(false)
  const {isadmin} = useSelector(state=> state.admin)
  let location = useLocation();
  let navigate = useNavigate();
  const recognitionRef = useRef(null);
  
  useEffect(() => {
    ; (async () => {
      try {
        const isadmin = await Admin.getcurrentaccount()
        if (isadmin && isadmin.labels.includes("admin")) {
          disptch(storelogin(isadmin.$id))
          setloading(false)
        }
      } catch (error) {
        setloading(false)
      }
    }
    )()
  }, [])

  useEffect(() => {
    if (recognitionRef.current) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognitionRef.current = recognition;
    
    if(JSON.parse(localStorage.getItem("ultra"))){
      recognition.abort();
      recognitionRef.current = null;
      return 
    }

    recognition.onresult = (event) => {
      const command = event.results[event.results.length - 1][0].transcript.toLowerCase();

      if (command === "open") {
        navigate('/')
      } else if (command === "open blog") {
        navigate('/mkr/blog')
      } else if (command === "open about") {
        navigate('/mkr/about')
      } else if (command === "go out") {
        sethidra((pre)=>!pre)
        localStorage.setItem("ultra", JSON.stringify(true));
      }
      
    };

    recognition.onend = () => {
      if (!JSON.parse(localStorage.getItem("ultra"))) {
        recognition.start();
      }
    };

    recognition.start();

    return () => {
      recognition.abort();
      recognitionRef.current = null;
    };
  }, []); // Empty dependency array - run only once on mount for logged-in users

  return loading ? (<Loadingpage />) : (
    <>
      <Hidra catcher={hidra}/>
      <Outlet />
    </>
  )
}

export default App
