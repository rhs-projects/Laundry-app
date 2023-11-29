import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import  { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAsCBGko8lZ8mLdl9LG-St8JJ0GTNeP3g",
  authDomain: "laudry-application.firebaseapp.com",
  projectId: "laudry-application",
  storageBucket: "laudry-application.appspot.com",
  messagingSenderId: "1036832487379",
  appId: "1:1036832487379:web:21a6e2176a484b6ebfe126"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export {auth,db};