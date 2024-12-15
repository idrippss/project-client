// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-landwise.firebaseapp.com",
  projectId: "mern-landwise",
  storageBucket: "mern-landwise.appspot.com",
  messagingSenderId: "400956840733",
  appId: "1:400956840733:web:7c71c68451b98ff9875ff4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);