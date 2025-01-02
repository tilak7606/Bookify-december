import { createContext ,useContext ,useState,useEffect} from "react";
import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

import {getFirestore,addDoc,collection, getDocs, getDoc,doc,query,where} from 'firebase/firestore'

const firebaseContext = createContext(null);

 export const useFirebase = () =>  useContext(firebaseContext);              // contex create karna ho gya means step 1 //

const firebaseConfig = {
  apiKey: "AIzaSyBE6Kf9TpRN5_D15Fybdk3Y-0HFkyBvVP0",
  authDomain: "bookify-decumber.firebaseapp.com",
  projectId: "bookify-decumber",
  storageBucket: "bookify-decumber.firebasestorage.app",
  messagingSenderId: "455191469499",
  appId: "1:455191469499:web:68d35e605c8e05016ef89e"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);             // yha tk mera firebase ka app ready hai //
const firebaseAuth = getAuth(firebaseApp)                       // means firebase ke app ke lia authentication chahiye //

const handleSignOut = async () => {
  try {
      await signOut(firebaseAuth);
      console.log("User signed out successfully");
  } catch (error) {
      console.error("Error signing out: ", error);
  }
  
};


 export const FirebaseProvider = (props) => {                                              // ye provider bnana ho gya means step 2 //
  const [user,setUser] = useState(null);


  useEffect(()=>{
    onAuthStateChanged(firebaseAuth,(user)=>{
      if(user) setUser(user);
      else setUser(null);
    })
  },[])
  // console.log('This is user' , user)
  
  const signUpUserWithEmailAndPassword = (email,password) => createUserWithEmailAndPassword(firebaseAuth,email,password);

  const signInUserWithEmailAndPass = (email,password) => 
    signInWithEmailAndPassword(firebaseAuth,email,password);

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => signInWithPopup(firebaseAuth,googleProvider);


  // firestore :
  const firestore = getFirestore(firebaseApp)
  

  const handelCreateNewListing = async(name,isbnNumber,price) => {
    return await addDoc(collection(firestore,'books'),{
      name,
      isbnNumber,
      price,
      userID : user.uid,
      userEmail : user.email,
      photoURL : user.photoURL,
      displayName : user.displayName,
    })
  }

  // sari books ki details aa jayangi :
  const listAllBooks = () => {
    return getDocs(collection(firestore,'books'));
  }

  // sirf ek particular book ki detail aaygi using it's id 
  const getBookById = async(id) =>{
    const docref = doc(firestore,'books',id);
    const result = await getDoc(docref);
    return result;
  }

  // Order place karne ke lia :
  const placeOrder = async(bookId,qty) => {
    const collectioneRef = collection(firestore,'books',bookId,'order');
    const result = await addDoc(collectioneRef,{
      userID : user.uid,
      userEmail : user.email,
      photoURL : user.photoURL,
      displayName : user.displayName,
      qty: Number(qty),
    }) 
    return result;
  }

  const fetchMyBooks = async (userId) => {
    if (!user) {
      console.warn("User is not logged in");
      return;
    }
  
    const collectionRef = collection(firestore, 'books');
    const q = query(collectionRef, where('userID', '==', userId));
    const result = await getDocs(q);
    // console.log('This is the result:', result);
    return result;
  };
  // actual orders dekhne ke lia :
  const getOrders = async(bookId) => {
    const collectioneRef = collection(firestore,'books',bookId,'order');
    const result = await getDocs(collectioneRef);
    return result;
  }


  const isLoggedIn = user ? true : false ;

    return <firebaseContext.Provider value={{signUpUserWithEmailAndPassword , signInUserWithEmailAndPass,signInWithGoogle,isLoggedIn,handelCreateNewListing,listAllBooks,getBookById,placeOrder,fetchMyBooks,user,getOrders,handleSignOut,} } > 
      {props.children} 
    </firebaseContext.Provider>
}