import React, { useState, useContext } from "react";
import { Eye, EyeOff } from "lucide-react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import authStore from "../store/store.js";
import TypingresultStore from "../store/TypingResultStore.js";
import { saveResult } from "../utils/saveResult.js";
import { ThemeContext } from "../context/ThemeContext";
import SignInWithGoogle from "../components/SignInWithGoogle.jsx";

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { theme } = useContext(ThemeContext);

  const setCurrentUser = authStore((state) => state?.setCurrentUser);
  const typingResult = TypingresultStore((state) => state.typingResult);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setError("");
        setCurrentUser(response.data.existingUser);
        saveResult(typingResult);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
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
          Welcome Back
        </h2>

        <div className="mb-4">
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
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg focus:ring-2 ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-purple-500 placeholder-gray-400"
                : "border focus:ring-purple-400 placeholder-gray-400"
            }`}
          />
        </div>

        <div className="mb-6 relative">
          <label
            className={`block mb-2 font-medium ${
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg focus:ring-2 ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-purple-500 placeholder-gray-400"
                  : "border focus:ring-purple-400 placeholder-gray-400"
              }`}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
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
          {loading ? <ClipLoader size={24} color="#fff" /> : "Sign In"}
        </button>
        <div  className="flex gap-2 mt-2 flex-col ">
          <span className="flex justify-center  ">OR</span>
          <SignInWithGoogle />
        </div>

        <div
          className={`mt-6 text-center text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Don't have an account?{" "}
          <a
            href="/signup"
            className={`font-medium ${
              theme === "dark"
                ? "text-purple-400 hover:text-purple-300"
                : "text-purple-600 hover:text-purple-700"
            }`}
          >
            Sign up
          </a>
        </div>
      </form>
    </div>
  );
};

export default Signin;
