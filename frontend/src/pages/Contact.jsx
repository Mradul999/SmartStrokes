import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    success: false,
    message: ""
  });
  
  const [serverStatus, setServerStatus] = useState({
    checked: false,
    online: false,
    message: ""
  });
  
  // Check server connectivity on component mount
  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/test`);
        // console.log("Server status check:", response.data);
        setServerStatus({
          checked: true,
          online: true,
          message: `Server is online. ${response.data.message}`
        });
      } catch (error) {
        console.error("Server connectivity error:", error);
        setServerStatus({
          checked: true,
          online: false,
          message: "Cannot connect to the server. Please try again later."
        });
      }
    };
    
    checkServerStatus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if server is online
    if (serverStatus.checked && !serverStatus.online) {
      setFormStatus({
        submitting: false,
        submitted: true,
        success: false,
        message: "Server is offline. Please try again later."
      });
      return;
    }
    
    // Form validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormStatus({
        submitting: false,
        submitted: true,
        success: false,
        message: "Please fill in all fields."
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        submitting: false,
        submitted: true,
        success: false,
        message: "Please provide a valid email address."
      });
      return;
    }
    
    setFormStatus({
      submitting: true,
      submitted: false,
      success: false,
      message: ""
    });
    
    try {
      // console.log("Submitting form data:", formData);
      
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/contact/submit`,
        formData,
        { withCredentials: true }
      );
      
      // console.log("Form submission response:", response.data);
      
      if (response.data.success) {
        setFormStatus({
          submitting: false,
          submitted: true,
          success: true,
          message: response.data.message
        });
        
        // Clear form after successful submission
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        throw new Error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      
      let errorMessage = "An error occurred while sending your message. Please try again later.";
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        errorMessage = error.response?.data?.message || errorMessage;
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error request:", error.request);
        errorMessage = "Could not connect to the server. Please check your internet connection and try again.";
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
        errorMessage = error.message || errorMessage;
      }
      
      setFormStatus({
        submitting: false,
        submitted: true,
        success: false,
        message: errorMessage
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We'd love to hear from you! Feel free to reach out with any questions, feedback, or suggestions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Contact Information */}
          <div className="col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:shadow-2xl h-full">
              <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Get In Touch
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">Email</h3>
                    <p className="text-gray-600 mt-1">prashant047alg@gmail.com</p>
                    <p className="text-sm text-gray-500 mt-1">We'll respond as soon as possible.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">Documentation</h3>
                    <p className="text-gray-600 mt-1">Check out our comprehensive FAQ section.</p>
                    <Link to="/about" className="text-purple-600 font-medium text-sm mt-1 inline-block hover:text-purple-700">
                      Learn more about SmartStrokes →
                    </Link>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">Social</h3>
                    <div className="flex space-x-3 mt-2">
                      <a href="https://github.com/Prashantkumar999" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">
                        <span className="sr-only">GitHub</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href="https://github.com/Mradul999" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">
                        <span className="sr-only">GitHub</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:shadow-2xl">
              <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Send a Message
              </h2>
              
              {/* Server Status Indicator */}
              {serverStatus.checked && (
                <div className={`mb-6 px-4 py-3 rounded-lg ${
                  serverStatus.online 
                    ? "bg-green-50 border border-green-200 text-green-700" 
                    : "bg-red-50 border border-red-200 text-red-700"
                }`}>
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      serverStatus.online ? "bg-green-500" : "bg-red-500"
                    }`}></div>
                    <p className="text-sm">
                      {serverStatus.online 
                        ? "Server is online. You can submit the form."
                        : "Server is offline. Form submission is currently unavailable."
                      }
                    </p>
                  </div>
                </div>
              )}
              
              {formStatus.submitted && formStatus.success ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-700 mb-4">{formStatus.message}</p>
                  <button 
                    onClick={() => setFormStatus(prev => ({ ...prev, submitted: false, success: false }))}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {formStatus.submitted && !formStatus.success && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">There was an error with your submission</h3>
                          <p className="mt-1 text-sm text-red-700">{formStatus.message}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition-colors"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition-colors"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition-colors"
                      placeholder="Feedback about SmartStrokes"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition-colors"
                      placeholder="Write your message here..."
                      required
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      <span className="text-red-500">*</span> Required fields
                    </p>
                    <button
                      type="submit"
                      disabled={formStatus.submitting}
                      className={`inline-flex items-center px-6 py-3 rounded-lg text-white shadow-md transition-all ${
                        formStatus.submitting
                          ? "bg-purple-400 cursor-not-allowed"
                          : "bg-purple-600 hover:bg-purple-700 transform hover:-translate-y-0.5"
                      }`}
                    >
                      {formStatus.submitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                          </svg>
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 transform transition-all hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-purple-700 mb-8 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">How can I improve my typing speed?</h3>
              <p className="text-gray-700">
                Regular practice is key to improving typing speed. SmartStrokes provides personalized text that focuses on your problem keys, helping you strengthen your weak points. We recommend practicing for at least 15 minutes daily for optimal results.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">How does the AI text generation work?</h3>
              <p className="text-gray-700">
                Our AI text generation system analyzes your typing patterns and identifies keys that give you trouble. It then creates customized practice texts that include a higher frequency of these problem keys, allowing for targeted improvement.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Is there a limit to how many tests I can take?</h3>
              <p className="text-gray-700">
                There are no limits to the number of typing tests you can take with SmartStrokes. We encourage you to practice as much as you'd like, as consistent practice is the best way to improve your typing skills.
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home Button */}
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
  );
};

export default Contact; 