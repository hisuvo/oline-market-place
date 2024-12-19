// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: import.meta.env.VITE_apiKey,
  // authDomain: import.meta.env.VITE_authDomain,
  // projectId: import.meta.env.VITE_projectId,
  // storageBucket: import.meta.env.VITE_storageBucket,
  // messagingSenderId: import.meta.env.VITE_messagingSenderId,
  // appId: import.meta.env.VITE_appId,
  apiKey: "AIzaSyB6NqLwejVlPU5sTZvf2A-RGgw7DItkFtc",
  authDomain: "online-market-place-33758.firebaseapp.com",
  projectId: "online-market-place-33758",
  storageBucket: "online-market-place-33758.firebasestorage.app",
  messagingSenderId: "666733152735",
  appId: "1:666733152735:web:98cd5d408d945ffc525c6a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
