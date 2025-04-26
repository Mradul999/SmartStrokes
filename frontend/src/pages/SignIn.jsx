import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Header from "../components/Header";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import authStore from "../store/store.js";

import TypingresultStore from "../store/TypingResultStore.js";
import { saveResult } from "../utils/saveResult.js";

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const setCurrentUser = authStore((state) => state?.setCurrentUser);

  const typingResult = TypingresultStore((state) => state.typingResult);
  console.log(typingResult);

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
        // console.log(response.data);
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
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-100 to-blue-100 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-center text-purple-600 mb-4">
            Welcome Back
          </h2>

          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="mb-6 relative">
            <label className="block mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-purple-400"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          {error && (
            <div className="mb-4 text-red-600 bg-red-100 border border-red-400 p-3 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition flex justify-center items-center"
            disabled={loading}
          >
            {loading ? <ClipLoader size={30} color="#fff" /> : "Sign In"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Signin;
