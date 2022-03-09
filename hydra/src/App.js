import {useState} from "react";
import { db } from "./utils/Firebase";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import Auth  from "./pages/Auth/";
import { ToastContainer } from "react-toastify";
import LoggedLayout from "./layouts/LoggedLayout";

function App() {

  const [user,setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const auth = getAuth();

  onAuthStateChanged(auth, currentUser =>{
    if(!currentUser){
      setUser(null);
    }
    else{
      setUser(currentUser);
    }
    setIsLoading(false);
  });

  if(isLoading){
    return null;
  }

  return (
    <>
      {!user ? <Auth/> : <LoggedLayout user={user}/>}
      <ToastContainer
      position="top-center"
      autoClose={43325000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      /> 
    </>
  );
}


export default App;
