import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import authStore from "../store/store.js";
import { useRef } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);
  const currentUser = authStore((state) => state.currentUser);
  const setCurrentUser = authStore((state) => state.setCurrentUser);
  const [performance, setPerformance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const handleEditClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.match("image.*")) {
      setUploadError("Please select an image file");
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image size should be less than 5MB");
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      // Create form data for file upload
      const formData = new FormData();
      formData.append("profileImage", file);

      // Send request to update profile image
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/update-profile-image`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data && response.data.user) {
        // Update the user in state with new profile image
        setCurrentUser({
          ...currentUser,
          profileImage: response.data.user.profileImage,
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadError(error.response?.data?.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  // Generate a random avatar from DiceBear if no profile image exists
  const getDefaultAvatar = () => {
    // Random seed to generate different avatars
    const seed =
      currentUser?.name ||
      currentUser?.email ||
      Math.random().toString(36).substring(2, 8);
    // Using the latest DiceBear API (version 7.x)
    return `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
  };

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/result/performance`,
          { withCredentials: true }
        );
        // console.log("Performance data received:", response.data);
        setPerformance(response.data);
      } catch (error) {
        console.error("Error fetching performance:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformance();
  }, []);

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark"
            ? "bg-gray-900"
            : "bg-gradient-to-br from-purple-50 to-indigo-50"
        }`}
      >
        <div className="relative">
          <div
            className={`h-24 w-24 rounded-full border-t-4 border-b-4 ${
              theme === "dark" ? "border-purple-500" : "border-purple-600"
            } animate-spin`}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className={`text-lg font-medium ${
                theme === "dark" ? "text-purple-400" : "text-purple-600"
              }`}
            >
              Loading
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 to-gray-800"
          : "bg-gradient-to-br from-purple-50 to-indigo-50"
      } py-8`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div
          className={`${
            theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white"
          } rounded-2xl shadow-xl p-8 mb-8 transform transition-all hover:shadow-2xl`}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <div
                className={`w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden ${
                  theme === "dark"
                    ? "border-4 border-gray-700 shadow-lg shadow-black/20"
                    : "border-4 border-purple-200 shadow-md"
                }`}
              >
                <img
                  src={currentUser?.profileImage || getDefaultAvatar()}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                onClick={handleEditClick}
                className={`absolute -bottom-2 -right-2 ${
                  theme === "dark"
                    ? "bg-purple-600 text-white"
                    : "bg-purple-600 text-white"
                } rounded-full w-10 h-10 flex items-center justify-center shadow-md cursor-pointer hover:opacity-90 transition-opacity`}
              >
                {uploading ? (
                  <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1
                className={`text-3xl font-bold mb-1 ${
                  theme === "dark" ? "text-gray-100" : "text-gray-800"
                }`}
              >
                {currentUser?.name}
              </h1>
              <p
                className={`mb-3 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {currentUser?.email}
              </p>
              {uploadError && (
                <p
                  className={`mb-3 text-sm ${
                    theme === "dark" ? "text-red-300" : "text-red-500"
                  }`}
                >
                  {uploadError}
                </p>
              )}
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                  theme === "dark"
                    ? "bg-purple-900/70 text-purple-300"
                    : "bg-purple-100 text-purple-700"
                }`}
              >
                <span className="mr-1">⭐</span>
                <span className="font-semibold">SmartStrokes</span>
                <span
                  className={`ml-1 text-xs px-2 py-0.5 rounded-full ${
                    theme === "dark"
                      ? "bg-purple-800 text-purple-200"
                      : "bg-purple-200 text-purple-800"
                  }`}
                >
                  Level{" "}
                  {Math.max(1, Math.floor((performance?.averageWpm || 0) / 10))}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
            className={`${
              theme === "dark"
                ? "bg-gray-800 border border-gray-700"
                : "bg-white"
            } rounded-2xl shadow-lg p-6 transform transition-all hover:shadow-xl`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p
                  className={`text-lg font-semibold mb-1 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Average Speed
                </p>
                <div className="flex items-baseline">
                  <h3
                    className={`text-4xl font-bold ${
                      theme === "dark" ? "text-purple-400" : "text-purple-600"
                    }`}
                  >
                    {performance?.averageWpm || 0}
                  </h3>
                  <span
                    className={`ml-1 text-xl font-medium ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    WPM
                  </span>
                </div>
              </div>
              <div
                className={`p-3 rounded-full ${
                  theme === "dark" ? "bg-purple-900/50" : "bg-purple-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-7 w-7 ${
                    theme === "dark" ? "text-purple-400" : "text-purple-600"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
            <div
              className={`mt-4 h-2 rounded-full overflow-hidden ${
                theme === "dark" ? "bg-purple-900/30" : "bg-purple-100"
              }`}
            >
              <div
                className={`h-full rounded-full ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-purple-500/80 to-purple-400/80"
                    : "bg-gradient-to-r from-purple-400 to-purple-600"
                }`}
                style={{
                  width: `${Math.min(
                    100,
                    (performance?.averageWpm || 0) / 1.5
                  )}%`,
                }}
              ></div>
            </div>
          </div>

          <div
            className={`${
              theme === "dark"
                ? "bg-gray-800 border border-gray-700"
                : "bg-white"
            } rounded-2xl shadow-lg p-6 transform transition-all hover:shadow-xl`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p
                  className={`text-lg font-semibold mb-1 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Accuracy
                </p>
                <div className="flex items-baseline">
                  <h3
                    className={`text-4xl font-bold ${
                      theme === "dark" ? "text-blue-400" : "text-blue-500"
                    }`}
                  >
                    {performance?.averageAccuracy || 0}
                  </h3>
                  <span
                    className={`ml-1 text-xl font-medium ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    %
                  </span>
                </div>
              </div>
              <div
                className={`p-3 rounded-full ${
                  theme === "dark" ? "bg-blue-900/50" : "bg-blue-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-7 w-7 ${
                    theme === "dark" ? "text-blue-400" : "text-blue-500"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div
              className={`mt-4 h-2 rounded-full overflow-hidden ${
                theme === "dark" ? "bg-blue-900/30" : "bg-blue-100"
              }`}
            >
              <div
                className={`h-full rounded-full ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-blue-500/80 to-blue-400/80"
                    : "bg-gradient-to-r from-blue-400 to-blue-600"
                }`}
                style={{ width: `${performance?.averageAccuracy || 0}%` }}
              ></div>
            </div>
          </div>

          <div
            className={`${
              theme === "dark"
                ? "bg-gray-800 border border-gray-700"
                : "bg-white"
            } rounded-2xl shadow-lg p-6 transform transition-all hover:shadow-xl`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p
                  className={`text-lg font-semibold mb-1 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Total Tests
                </p>
                <div className="flex items-baseline">
                  <h3
                    className={`text-4xl font-bold ${
                      theme === "dark" ? "text-indigo-400" : "text-indigo-600"
                    }`}
                  >
                    {performance?.totalTests || performance?.totalSessions || 0}
                  </h3>
                  <span
                    className={`ml-1 text-xl font-medium ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    tests
                  </span>
                </div>
              </div>
              <div
                className={`p-3 rounded-full ${
                  theme === "dark" ? "bg-indigo-900/50" : "bg-indigo-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-7 w-7 ${
                    theme === "dark" ? "text-indigo-400" : "text-indigo-600"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
            </div>
            <div
              className={`mt-4 h-2 rounded-full overflow-hidden ${
                theme === "dark" ? "bg-indigo-900/30" : "bg-indigo-100"
              }`}
            >
              <div
                className={`h-full rounded-full ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-indigo-500/80 to-indigo-400/80"
                    : "bg-gradient-to-r from-indigo-400 to-indigo-600"
                }`}
                style={{
                  width: `${Math.min(
                    100,
                    ((performance?.totalTests ||
                      performance?.totalSessions ||
                      0) /
                      100) *
                      100
                  )}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {performance?.sessions && performance.sessions.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 transform transition-all hover:shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Recent Sessions
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      WPM
                    </th>
                    <th className="py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      Accuracy
                    </th>
                    <th className="py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {performance.sessions.map((session, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 text-sm text-gray-700 font-medium">
                        {session.createdAt
                          ? formatDate(session.createdAt)
                          : `Session ${index + 1}`}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <span className="text-lg font-semibold text-purple-600">
                            {session.wpm > 0 ? session.wpm : "N/A"}
                          </span>
                          <span className="ml-1 text-sm text-gray-500">
                            WPM
                          </span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <span className="text-lg font-semibold text-blue-500">
                            {session.accuracy > 0 ? session.accuracy : "N/A"}
                          </span>
                          <span className="ml-1 text-sm text-gray-500">%</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            session.wpm >= 40
                              ? "bg-green-100 text-green-800"
                              : session.wpm >= 20
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {session.wpm >= 40
                            ? "Excellent"
                            : session.wpm >= 20
                            ? "Good"
                            : "Practice Needed"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 transform transition-all hover:shadow-xl text-center">
            <div className="flex flex-col items-center justify-center py-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-purple-200 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Sessions Yet
              </h3>
              <p className="text-gray-500 mb-6">
                Complete your first typing test to see your performance history
                here.
              </p>
              <a
                href="/"
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg shadow-sm hover:bg-purple-700 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                  />
                </svg>
                Start Typing Test
              </a>
            </div>
          </div>
        )}

        {performance?.weakKeyStats &&
          Object.keys(performance.weakKeyStats).length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all hover:shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Areas for Improvement
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-purple-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    Problem Keys
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(performance.weakKeyStats).map(
                      ([key, count], index) => (
                        <div
                          key={index}
                          className="relative px-4 py-3 bg-purple-50 border border-purple-100 rounded-xl shadow-sm transition-all hover:shadow-md hover:bg-purple-100"
                        >
                          <div className="text-center">
                            <span className="inline-block w-10 h-10 rounded-lg bg-white border border-purple-200 shadow-inner flex items-center justify-center text-xl font-mono font-bold text-purple-700">
                              {key}
                            </span>
                            <div className="mt-2 text-xs font-semibold text-purple-700">
                              {count} errors
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-purple-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Recommendations
                  </h3>
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-100 p-6 shadow-sm">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 mr-3">
                          1
                        </span>
                        <p className="text-gray-700">
                          Practice typing words containing your problem keys
                          frequently
                        </p>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 mr-3">
                          2
                        </span>
                        <p className="text-gray-700">
                          Focus on proper finger positioning for these specific
                          keys
                        </p>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 mr-3">
                          3
                        </span>
                        <p className="text-gray-700">
                          Use AI Practice mode to generate text with your
                          problem keys
                        </p>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 mr-3">
                          4
                        </span>
                        <p className="text-gray-700">
                          Try practicing with just these keys before moving to
                          full text
                        </p>
                      </li>
                    </ul>
                    <button
                      onClick={() => {
                        navigate("/");
                      }}
                      className="mt-5 w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md transition-colors flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Start AI Practice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default Dashboard;
