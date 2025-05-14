// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// import dotenv from "dotenv";
// dotenv.config();

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "smart-strokes.firebaseapp.com",
  projectId: "smart-strokes",
  storageBucket: "smart-strokes.firebasestorage.app",
  messagingSenderId: "806501985728",
  appId: "1:806501985728:web:7a9772c56604e9c41eec25",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
