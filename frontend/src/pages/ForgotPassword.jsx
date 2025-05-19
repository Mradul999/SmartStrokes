import React, { useState, useContext } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const ForgotPassword = () => {
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
        { email },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setSuccess("Reset link sent to your email!");
        setTimeout(() => {
          navigate("/signin");
        }, 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        theme === "dark"
          ? "bg-gradient-to-tr from-gray-900 to-purple-900"
          : "bg-gradient-to-tr from-purple-100 to-blue-100"
      } px-4 pt-20 pb-10`}
    >
      <form
        onSubmit={handleSubmit}
        className={`p-8 rounded-xl shadow-xl w-full max-w-md ${
          theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white"
        }`}
      >
        <h2
          className={`text-2xl font-bold text-center mb-6 ${
            theme === "dark" ? "text-purple-300" : "text-purple-600"
          }`}
        >
          Forgot Password
        </h2>

        <p
          className={`text-center mb-6 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Enter your email address and we'll send you a link to reset your
          password.
        </p>

        <div className="mb-6">
          <label
            className={`block mb-2 font-medium ${
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`w-full px-4 py-3 rounded-lg focus:ring-2 ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-purple-500 placeholder-gray-400"
                : "border focus:ring-purple-400 placeholder-gray-400"
            }`}
          />
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

        {success && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              theme === "dark"
                ? "bg-green-900/60 border border-green-800 text-green-200"
                : "bg-green-100 border border-green-400 text-green-600"
            }`}
          >
            {success}
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
          {loading ? <ClipLoader size={24} color="#fff" /> : "Send Reset Link"}
        </button>

        <div
          className={`mt-6 text-center text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Remember your password?{" "}
          <a
            href="/signin"
            className={`font-medium ${
              theme === "dark"
                ? "text-purple-400 hover:text-purple-300"
                : "text-purple-600 hover:text-purple-700"
            }`}
          >
            Sign in
          </a>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;