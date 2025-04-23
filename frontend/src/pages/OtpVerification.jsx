import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import authStore from "../store/store.js";

const OTPVerification = () => {
  const setVerifying = authStore((state) => state.setVerifying);
  const isVerifying = authStore((state) => state.isVerifying);
  const [otp, setOtp] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Get email from localStorage or props or route state
  const email = sessionStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isVerifying) {
      navigate("/signin");
    }
  }, [isVerifying]);

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/verify`,
        {
          email,
          otp,
        }
      );

      if (response.status === 200) {
        setLoading(false);
        setVerifying(false);

        navigate("/signin");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-100 to-blue-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-purple-600 mb-4">
          OTP Verification
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Enter the 6-digit OTP sent to your email
        </p>

        <input
          type="text"
          maxLength="6"
          value={otp}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2 text-center text-lg tracking-widest rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Enter OTP"
          required
        />

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <button
          type="submit"
          className="mt-6 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-200"
        >
          {loading ? <ClipLoader size={30} color="#fff" /> : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default OTPVerification;
