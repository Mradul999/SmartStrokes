import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const About = () => {
  const { theme } = useContext(ThemeContext);
  
  const developers = [
    {
      name: "Prashant Kumar",
      role: "Full Stack Developer",
      github: "https://github.com/Prashantkumar999",
      image: "prashant.jpeg",
      description: "Specializes in React.js and Node.js development with a focus on creating intuitive user interfaces and robust backend systems."
    },
    {
      name: "Mradul",
      role: "Full Stack Developer",
      github: "https://github.com/Mradul999",
      image: "mradul.jpeg",
      description: "Expert in modern JavaScript frameworks with experience in developing responsive web applications and RESTful APIs."
    }
  ];

  return (
    <div className={`min-h-screen ${
      theme === "dark" 
        ? "bg-gradient-to-br from-gray-900 to-gray-800" 
        : "bg-gradient-to-br from-purple-50 to-indigo-50"
    } py-16`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl md:text-5xl font-bold ${
            theme === "dark"
              ? "bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"
              : "bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
          } mb-4`}>
            About SmartStrokes
          </h1>
          <p className={`text-lg max-w-3xl mx-auto ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}>
            Your intelligent typing companion designed to enhance your typing skills with personalized practice and performance tracking.
          </p>
        </div>

        {/* Mission Section */}
        <div className={`${
          theme === "dark" 
            ? "bg-gray-800 border border-gray-700" 
            : "bg-white"
        } rounded-2xl shadow-xl p-8 mb-12 transform transition-all hover:shadow-2xl`}>
          <h2 className={`text-2xl font-bold ${
            theme === "dark" ? "text-purple-400" : "text-purple-700"
          } mb-6 flex items-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Our Mission
          </h2>
          <p className={`${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          } leading-relaxed mb-6`}>
            SmartStrokes was developed with a clear purpose: to help individuals improve their typing efficiency through intelligent practice. We believe that typing is a foundational skill in today's digital world, and our platform is designed to make practicing this skill both effective and enjoyable.
          </p>
          <p className={`${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          } leading-relaxed`}>
            Our app uniquely identifies your weak keys and generates customized practice texts that focus on your specific challenges. With real-time feedback and comprehensive analytics, you can track your progress and see tangible improvements in your typing speed and accuracy.
          </p>
        </div>

        {/* Features Section */}
        <div className={`${
          theme === "dark" 
            ? "bg-gray-800 border border-gray-700" 
            : "bg-white"
        } rounded-2xl shadow-xl p-8 mb-12 transform transition-all hover:shadow-2xl`}>
          <h2 className={`text-2xl font-bold ${
            theme === "dark" ? "text-purple-400" : "text-purple-700"
          } mb-6 flex items-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`rounded-xl p-6 ${
              theme === "dark" 
                ? "bg-gradient-to-br from-purple-900/40 to-purple-800/40 border border-purple-800" 
                : "bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200"
            }`}>
              <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-4 shadow-sm ${
                theme === "dark" ? "bg-gray-700" : "bg-white"
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${
                  theme === "dark" ? "text-purple-400" : "text-purple-600"
                }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${
                theme === "dark" ? "text-purple-300" : "text-purple-800"
              }`}>Personalized Practice</h3>
              <p className={`${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}>
                AI-powered text generation that focuses on your problem keys for targeted improvement.
              </p>
            </div>
            
            <div className={`rounded-xl p-6 ${
              theme === "dark" 
                ? "bg-gradient-to-br from-indigo-900/40 to-indigo-800/40 border border-indigo-800" 
                : "bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200"
            }`}>
              <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-4 shadow-sm ${
                theme === "dark" ? "bg-gray-700" : "bg-white"
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${
                  theme === "dark" ? "text-indigo-400" : "text-indigo-600"
                }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${
                theme === "dark" ? "text-indigo-300" : "text-indigo-800"
              }`}>Performance Analytics</h3>
              <p className={`${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}>
                Detailed statistics and visualizations to track your progress over time.
              </p>
            </div>
            
            <div className={`rounded-xl p-6 ${
              theme === "dark" 
                ? "bg-gradient-to-br from-blue-900/40 to-blue-800/40 border border-blue-800" 
                : "bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200"
            }`}>
              <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-4 shadow-sm ${
                theme === "dark" ? "bg-gray-700" : "bg-white"
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${
                  theme === "dark" ? "text-blue-400" : "text-blue-600"
                }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${
                theme === "dark" ? "text-blue-300" : "text-blue-800"
              }`}>Interactive Interface</h3>
              <p className={`${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}>
                Visual keyboard feedback, real-time stats, and a sleek, modern design for an engaging experience.
              </p>
            </div>
          </div>
        </div>

        {/* Developers Section */}
        <div className={`${
          theme === "dark" 
            ? "bg-gray-800 border border-gray-700" 
            : "bg-white"
        } rounded-2xl shadow-xl p-8 mb-12 transform transition-all hover:shadow-2xl`}>
          <h2 className={`text-2xl font-bold ${
            theme === "dark" ? "text-purple-400" : "text-purple-700"
          } mb-8 flex items-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {developers.map((dev, index) => (
              <div key={index} className={`rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 transition-all hover:shadow-md ${
                theme === "dark" 
                  ? "bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700" 
                  : "bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100"
              }`}>
                <div className={`w-56 h-24 rounded-full overflow-hidden border-4 shadow-md ${
                  theme === "dark" ? "border-gray-700" : "border-white"
                }`}>
                  <img src={dev.image} alt={dev.name} className="w-full h-full rounded-full object-cover" />
                </div>
                <div>
                  <h3 className={`text-xl font-bold mb-1 ${
                    theme === "dark" ? "text-gray-200" : "text-gray-800"
                  }`}>{dev.name}</h3>
                  <p className={`font-medium mb-2 ${
                    theme === "dark" ? "text-purple-400" : "text-purple-600"
                  }`}>{dev.role}</p>
                  <p className={`mb-4 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}>{dev.description}</p>
                  <a 
                    href={dev.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      theme === "dark" 
                        ? "bg-gray-700 text-white hover:bg-gray-600" 
                        : "bg-gray-800 text-white hover:bg-gray-700"
                    }`}
                  >
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="white">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub Profile
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className={`${
          theme === "dark" 
            ? "bg-gray-800 border border-gray-700" 
            : "bg-white"
        } rounded-2xl shadow-xl p-8 transform transition-all hover:shadow-2xl`}>
          <h2 className={`text-2xl font-bold ${
            theme === "dark" ? "text-purple-400" : "text-purple-700"
          } mb-6 flex items-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Get In Touch
          </h2>
          <p className={`${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          } leading-relaxed mb-6`}>
            We're constantly working to improve SmartStrokes and would love to hear your feedback or suggestions.
          </p>
          <div className="text-center">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl shadow-md hover:from-purple-700 hover:to-indigo-700 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 