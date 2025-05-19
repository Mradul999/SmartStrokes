import React, { useState, useContext } from "react";
import { Eye, EyeOff } from "lucide-react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const ResetPassword = () => {
  const { theme } = useContext(ThemeContext);
  const { token } = useParams();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      s;
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password/${token}`,
        { password: formData.password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setSuccess("Password reset successful!");
        setTimeout(() => {
          navigate("/signin");
        }, 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to reset password");
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
          Reset Password
        </h2>

        <div className="mb-6 relative">
          <label
            className={`block mb-2 font-medium ${
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}
          >
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter new password"
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

        <div className="mb-6 relative">
          <label
            className={`block mb-2 font-medium ${
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm new password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg focus:ring-2 ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-purple-500 placeholder-gray-400"
                  : "border focus:ring-purple-400 placeholder-gray-400"
              }`}
            />
            <span
              onClick={() => setShowConfirm(!showConfirm)}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
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
          {loading ? <ClipLoader size={24} color="#fff" /> : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
