import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import authStore from "../store/store.js";
import axios from "axios";

const SignInWithGoogle = () => {
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
        className="bg-red-500 text-white w-full font-semibold py-2 px-4  rounded-lg hover:bg-red-600"
      >
        Continue with Google
      </button>
    </div>
  );
};

export default SignInWithGoogle;
