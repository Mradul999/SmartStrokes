// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { DecimalsArrowLeftIcon } from "lucide-react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD91D3lEku12x0kwqJDnfLzCy8eUflaaNo",
  authDomain: "smart-strokes.firebaseapp.com",
  projectId: "smart-strokes",
  storageBucket: "smart-strokes.firebasestorage.app",
  messagingSenderId: "806501985728",
  appId: "1:806501985728:web:7a9772c56604e9c41eec25",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
