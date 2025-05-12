import React, { useState, useEffect, useContext } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import authStore from "../store/store.js";
import { ThemeContext } from "../context/ThemeContext";

const Signup = () => {
  const { theme } = useContext(ThemeContext);
  const setVerifying = authStore((state) => state.setVerifying);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: ""
  });
  const [error, setError] = useState("");
  const [avatarSeed, setAvatarSeed] = useState("");
  const [avatarStyle, setAvatarStyle] = useState("adventurer");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Generate a random avatar on component mount
  useEffect(() => {
    generateRandomAvatar();
  }, []);

  const generateRandomAvatar = () => {
    // Generate a random seed for the avatar
    const seed = Math.random().toString(36).substring(2, 10);
    setAvatarSeed(seed);
    
    // Randomly select one of several DiceBear avatar styles (v7.x API)
    const styles = ["adventurer", "avataaars-neutral", "bottts", "pixel-art", "identicon", "shapes"];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    setAvatarStyle(randomStyle);
    
    // Create the modern DiceBear URL with v7.x API
    const avatarUrl = `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
    setFormData(prev => ({...prev, profilePic: avatarUrl}));
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirm = () => setShowConfirm(!showConfirm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        formData
      );

      if (response.status === 200) {
        setError("");
        setLoading(false);
        setVerifying(true);

        sessionStorage.setItem("email", formData.email);
        navigate("/otp-verification");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error.response?.data?.message || "An error occurred during registration");
      return;
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      theme === "dark" 
        ? "bg-gradient-to-tr from-gray-900 to-purple-900"
        : "bg-gradient-to-tr from-purple-100 to-blue-100"
    } px-4 pt-20 pb-10`}>
      <form
        onSubmit={handleSubmit}
        className={`p-8 rounded-xl shadow-xl w-full max-w-md ${
          theme === "dark" 
            ? "bg-gray-800 border border-gray-700" 
            : "bg-white"
        }`}
      >
        <h2 className={`text-2xl font-bold text-center mb-6 ${
          theme === "dark" ? "text-purple-300" : "text-purple-600"
        }`}>
          Create Account
        </h2>

        {/* Avatar preview with fixed size and border */}
        <div className="mb-6 flex flex-col items-center">
          <div className={`w-28 h-28 rounded-full overflow-hidden mb-3 ${
            theme === "dark" 
              ? "border-4 border-gray-700" 
              : "border-4 border-purple-200"
          }`}>
            <img 
              src={formData.profilePic || `https://api.dicebear.com/7.x/adventurer/svg?seed=default`}
              alt="Avatar" 
              className="w-full h-full object-cover bg-white"
            />
          </div>
          <button
            type="button"
            onClick={generateRandomAvatar}
            className={`px-3 py-1.5 rounded-lg shadow-sm text-sm font-medium transition-colors ${
              theme === "dark" 
                ? "bg-purple-700 text-white hover:bg-purple-600" 
                : "bg-purple-100 text-purple-700 hover:bg-purple-200"
            }`}
          >
            Generate New Avatar
          </button>
        </div>

        <div className="mb-4">
          <label className={`block mb-2 font-medium ${
            theme === "dark" ? "text-gray-200" : "text-gray-700"
          }`}>Full Name</label>
          <input
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 rounded-lg focus:ring-2 ${
              theme === "dark" 
                ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-purple-500 placeholder-gray-400" 
                : "border focus:ring-purple-400 placeholder-gray-400"
            }`}
          />
        </div>

        <div className="mb-4">
          <label className={`block mb-2 font-medium ${
            theme === "dark" ? "text-gray-200" : "text-gray-700"
          }`}>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 rounded-lg focus:ring-2 ${
              theme === "dark" 
                ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-purple-500 placeholder-gray-400" 
                : "border focus:ring-purple-400 placeholder-gray-400"
            }`}
          />
        </div>

        <div className="mb-4 relative">
          <label className={`block mb-2 font-medium ${
            theme === "dark" ? "text-gray-200" : "text-gray-700"
          }`}>Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 rounded-lg focus:ring-2 ${
                theme === "dark" 
                  ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-purple-500 placeholder-gray-400" 
                  : "border focus:ring-purple-400 placeholder-gray-400"
              }`}
            />
            <span
              onClick={togglePassword}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
        </div>

        <div className="mb-6 relative">
          <label className={`block mb-2 font-medium ${
            theme === "dark" ? "text-gray-200" : "text-gray-700"
          }`}>Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 rounded-lg focus:ring-2 ${
                theme === "dark" 
                  ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-purple-500 placeholder-gray-400" 
                  : "border focus:ring-purple-400 placeholder-gray-400"
              }`}
            />
            <span
              onClick={toggleConfirm}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
        </div>
        
        {error && (
          <div className={`mb-6 p-4 rounded-lg ${
            theme === "dark" 
              ? "bg-red-900/60 border border-red-800 text-red-200" 
              : "bg-red-100 border border-red-400 text-red-600"
          }`}>
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
          {loading ? <ClipLoader size={24} color="#fff" /> : "Sign Up"}
        </button>
        
        <div className={`mt-6 text-center text-sm ${
          theme === "dark" ? "text-gray-400" : "text-gray-600"
        }`}>
          Already have an account?{" "}
          <a 
            href="/signin" 
            className={`font-medium ${
              theme === "dark" ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700"
            }`}
          >
            Sign in
          </a>
        </div>
      </form>
    </div>
  );
};

export default Signup;
