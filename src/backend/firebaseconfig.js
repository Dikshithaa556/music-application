import { initializeApp } from "firebase/app";

//? Authentication Services from Firebase
import { getAuth } from "firebase/auth";

//? Database Services from firebase
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBxGh_uiCdWzp19BFttywYj5dZZrQMNN8",
  authDomain: "music-application-59c06.firebaseapp.com",
  projectId: "music-application-59c06",
  storageBucket: "music-application-59c06.firebasestorage.app",
  messagingSenderId: "879113764590",
  appId: "1:879113764590:web:7d5ab220682b519816fdff"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export let __AUTH = getAuth(firebaseApp);
export let __DB = getFirestore(firebaseApp);

export default firebaseApp;