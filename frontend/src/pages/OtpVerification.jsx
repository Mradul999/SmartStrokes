import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import authStore from "../store/store.js";
import { ThemeContext } from "../context/ThemeContext";

const OTPVerification = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const setCurrentUser = authStore((state) => state.setCurrentUser);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(300);
  const [countdownActive, setCountdownActive] = useState(true);

  useEffect(() => {
    // Get email from session storage
    const storedEmail = sessionStorage.getItem("email");
    if (!storedEmail) {
      navigate("/signup");
    } else {
      setEmail(storedEmail);
    }

    // Set countdown timer
    let timer;
    if (countdownActive && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCountdownActive(false);
    }

    return () => clearTimeout(timer);
  }, [countdown, countdownActive, navigate]);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setError("Please enter all 6 digits");
      setLoading(false);
      return;
    }

    try {
      // Get the saved profile image from sessionStorage
      const pendingProfileImage = sessionStorage.getItem("pendingProfileImage");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/verify`,
        { email, otp: otpValue, profileImage: pendingProfileImage },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setLoading(false);

        // Store the user data in state
        setCurrentUser(response.data.user);

        // Clear session storage
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("pendingProfileImage");

        // Navigate to dashboard
        navigate("/signin");
      }
    } catch (error) {
      setLoading(false);
      console.error("OTP verification error:", error);
      setError(
        error.response?.data?.message || "Invalid OTP, please try again"
      );
    }
  };

  const resendOtp = async () => {
    setError("");
    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/resend-otp`, {
        email,
      });
      setLoading(false);
      setCountdown(300);
      setCountdownActive(true);
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || "Failed to resend OTP");
    }
  };

  // Format countdown time
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds
    }`;
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        theme === "dark"
          ? "bg-gradient-to-tr from-gray-900 to-purple-900"
          : "bg-gradient-to-tr from-purple-100 to-blue-100"
      } px-4 pt-20 pb-10`}
    >
      <div
        className={`p-8 rounded-xl shadow-xl w-full max-w-md ${
          theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white"
        }`}
      >
        <h2
          className={`text-2xl font-bold text-center mb-6 ${
            theme === "dark" ? "text-purple-300" : "text-purple-600"
          }`}
        >
          Verify Your Email
        </h2>

        <p
          className={`text-center mb-6 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          We've sent a 6-digit verification code to{" "}
          <span
            className={`font-medium ${
              theme === "dark" ? "text-gray-200" : "text-gray-800"
            }`}
          >
            {email}
          </span>
        </p>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex justify-center gap-2 mb-6 flex-wrap">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                className={`w-12 h-12 text-center text-xl font-bold rounded-lg focus:ring-2 ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-purple-500"
                    : "border border-gray-300 focus:border-purple-500 focus:ring-purple-400"
                }`}
              />
            ))}
          </div>

          {error && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                theme === "dark"
                  ? "bg-red-900/60 border border-red-800 text-red-200"
                  : "bg-red-100 border border-red-400 text-red-600"
              }`}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-medium transition-colors flex justify-center items-center text-white ${
              theme === "dark"
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
            disabled={loading}
          >
            {loading ? <ClipLoader size={24} color="#fff" /> : "Verify OTP"}
          </button>
        </form>

        <div className="text-center">
          <p
            className={`mb-3 text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Didn't receive the code?{" "}
            {countdownActive ? (
              <span
                className={`font-medium ${
                  theme === "dark" ? "text-purple-400" : "text-purple-600"
                }`}
              >
                {formatTime(countdown)}
              </span>
            ) : (
              <button
                onClick={resendOtp}
                disabled={loading}
                className={`font-medium ${
                  theme === "dark"
                    ? "text-purple-400 hover:text-purple-300"
                    : "text-purple-600 hover:text-purple-700"
                }`}
              >
                Resend OTP
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
