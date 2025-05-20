import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "smart-strokes.firebaseapp.com",
  projectId: "smart-strokes",
  storageBucket: "smart-strokes.firebasestorage.app",
  messagingSenderId: "806501985728",
  appId: "1:806501985728:web:7a9772c56604e9c41eec25",
};

const app = initializeApp(firebaseConfig);

export default app;
