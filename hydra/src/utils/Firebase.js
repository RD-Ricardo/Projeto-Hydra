import  { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbxjVoSZfEiQLYgkVpLQDLkKBUr2i_mK4",
  authDomain: "hydra-4e69e.firebaseapp.com",
  projectId: "hydra-4e69e",
  storageBucket: "hydra-4e69e.appspot.com",
  messagingSenderId: "237530867301",
  appId: "1:237530867301:web:72b552a93c9ba9fdb1088c"
};


const app =  initializeApp(firebaseConfig);
export const db = getFirestore(app);