import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import authStore from "../store/store.js";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";


const SignInWithGoogle = () => {
  const {theme} = useContext(ThemeContext)
  const navigate = useNavigate();
  const setCurrentUser = authStore((state) => state?.setCurrentUser);
  const handleGoogleSignIn = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/continuewithgoogle`,
        user,
        { withCredentials: true }
      );

      if (response.status === 200 || 201) {
        setCurrentUser(response.data.user);
        navigate("/");
      }
    } catch (error) {
      console.error("Error during sign-in:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className={`border bg-white w-full font-semibold py-2 px-4 rounded-lg flex justify-center items-center gap-2 ${theme =="dark"?"text-white":"text-black"} ${theme=="dark"?"hover:bg-gray-600":"hover:bg-gray-100"} `}
      >
        <FcGoogle className="text-xl"/>
        Continue with Google
      </button>
    </div>
  );
};

export default SignInWithGoogle;
