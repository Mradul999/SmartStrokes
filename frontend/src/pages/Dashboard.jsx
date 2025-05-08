import React, { useEffect, useState } from "react";
import axios from "axios";
import authStore from "../store/store.js";

const Dashboard = () => {
  const currentUser = authStore((state) => state.currentUser);
  const [performance, setPerformance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/result/performance`,
          { withCredentials: true }
        );
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-purple-600 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-purple-600 text-lg font-medium">Loading</span>
          </div>
        </div>
      </div>
    );
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 transform transition-all hover:shadow-2xl">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-purple-200 shadow-md">
                <img
                  src={currentUser?.profileImage || "https://cdn.vectorstock.com/i/1000v/95/56/user-profile-icon-avatar-or-person-vector-45089556.jpg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800 mb-1">{currentUser?.name}</h1>
              <p className="text-gray-500 mb-3">{currentUser?.email}</p>
              <div className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                <span className="mr-1">⭐</span>
                <span className="font-semibold">TypeMaster</span>
                <span className="ml-1 text-xs bg-purple-200 px-2 py-0.5 rounded-full">Level {Math.max(1, Math.floor((performance?.averageWpm || 0) / 10))}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-lg font-semibold text-gray-600 mb-1">Average Speed</p>
                <div className="flex items-baseline">
                  <h3 className="text-4xl font-bold text-purple-600">{performance?.averageWpm || 0}</h3>
                  <span className="ml-1 text-xl font-medium text-gray-500">WPM</span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 h-2 bg-purple-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full" 
                style={{ width: `${Math.min(100, (performance?.averageWpm || 0) / 1.5)}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-lg font-semibold text-gray-600 mb-1">Accuracy</p>
                <div className="flex items-baseline">
                  <h3 className="text-4xl font-bold text-blue-500">{performance?.averageAccuracy || 0}</h3>
                  <span className="ml-1 text-xl font-medium text-gray-500">%</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 h-2 bg-blue-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full" 
                style={{ width: `${performance?.averageAccuracy || 0}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-lg font-semibold text-gray-600 mb-1">Total Sessions</p>
                <div className="flex items-baseline">
                  <h3 className="text-4xl font-bold text-green-500">{performance?.totalSessions || 0}</h3>
                  <span className="ml-1 text-xl font-medium text-gray-500">tests</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <div className="mt-4 h-2 bg-green-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full" 
                style={{ width: `${Math.min(100, (performance?.totalSessions || 0) * 10)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {performance?.sessions && performance.sessions.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 transform transition-all hover:shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Recent Sessions
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">WPM</th>
                    <th className="py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">Accuracy</th>
                    <th className="py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {performance.sessions.map((session, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 text-sm text-gray-700 font-medium">
                        {session.createdAt ? formatDate(session.createdAt) : `Session ${index + 1}`}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <span className="text-lg font-semibold text-purple-600">{session.wpm}</span>
                          <span className="ml-1 text-sm text-gray-500">WPM</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <span className="text-lg font-semibold text-blue-500">{session.accuracy}</span>
                          <span className="ml-1 text-sm text-gray-500">%</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          session.wpm >= 40
                            ? "bg-green-100 text-green-800"
                            : session.wpm >= 20
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}>
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
        )}

        {performance?.weakKeyStats && Object.keys(performance.weakKeyStats).length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all hover:shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Areas for Improvement
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Problem Keys
                </h3>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(performance.weakKeyStats).map(([key, count], index) => (
                    <div 
                      key={index}
                      className="relative px-4 py-3 bg-purple-50 border border-purple-100 rounded-xl shadow-sm transition-all hover:shadow-md hover:bg-purple-100"
                    >
                      <div className="text-center">
                        <span className="inline-block w-10 h-10 rounded-lg bg-white border border-purple-200 shadow-inner flex items-center justify-center text-xl font-mono font-bold text-purple-700">{key}</span>
                        <div className="mt-2 text-xs font-semibold text-purple-700">
                          {count} errors
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Recommendations
                </h3>
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-100 p-6 shadow-sm">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 mr-3">1</span>
                      <p className="text-gray-700">Practice typing words containing your problem keys frequently</p>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 mr-3">2</span>
                      <p className="text-gray-700">Focus on proper finger positioning for these specific keys</p>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 mr-3">3</span>
                      <p className="text-gray-700">Use AI Practice mode to generate text with your problem keys</p>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 mr-3">4</span>
                      <p className="text-gray-700">Try practicing with just these keys before moving to full text</p>
                    </li>
                  </ul>
                  <button className="mt-5 w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md transition-colors flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
