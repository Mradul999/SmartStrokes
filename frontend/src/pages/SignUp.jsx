import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import Header from "../components/Header";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import authStore from "../store/store.js";

const Signup = () => {
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
  const [avatarStyle, setAvatarStyle] = useState("avataaars");

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
    
    // Randomly select one of several DiceBear avatar styles
    const styles = ["avataaars", "bottts", "identicon", "initials", "micah", "pixel-art"];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    setAvatarStyle(randomStyle);
    
    // Create the DiceBear URL
    const avatarUrl = `https://avatars.dicebear.com/api/${randomStyle}/${seed}.svg`;
    setFormData(prev => ({...prev, profilePic: avatarUrl}));
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirm = () => setShowConfirm(!showConfirm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
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

      console.log(response.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error.response?.data?.message || "An error occurred during registration");
      return;
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
            Create Account
          </h2>

          {/* Avatar preview */}
          <div className="mb-6 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-200 mb-2">
              <img 
                src={formData.profilePic} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={generateRandomAvatar}
              className="text-purple-600 text-sm font-medium hover:text-purple-800 transition-colors"
            >
              Generate New Avatar
            </button>
          </div>

          <div className="mb-4">
            <label className="block mb-1">Full Name</label>
            <input
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="mb-4 relative">
            <label className="block mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-purple-400"
            />
            <span
              onClick={togglePassword}
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <div className="mb-6 relative">
            <label className="block mb-1">Confirm Password</label>
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-purple-400"
            />
            <span
              onClick={toggleConfirm}
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          {error && (
            <div className="mb-4 text-red-600 bg-red-100 border border-red-400 p-3 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
          >
            {loading ? <ClipLoader size={30} color="#fff" /> : "Signup"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
