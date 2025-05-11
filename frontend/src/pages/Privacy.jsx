import React from "react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Introduction Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 transform transition-all hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Introduction
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            SmartStrokes ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by SmartStrokes when you use our website and services (collectively, the "Services").
          </p>
          <p className="text-gray-700 leading-relaxed">
            By accessing or using our Services, you signify that you have read, understood, and agree to our collection, storage, use, and disclosure of your personal information as described in this Privacy Policy.
          </p>
        </div>

        {/* Information We Collect Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 transform transition-all hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Information We Collect
          </h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-4">1. Personal Information</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            When you register for an account, we collect:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Your name</li>
            <li>Email address</li>
            <li>Password (stored in encrypted format)</li>
            <li>Optional profile picture</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-4">2. Usage Data</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            We collect information about how you use the Services, including:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Typing test results (speed, accuracy, errors)</li>
            <li>Problem keys and typing patterns</li>
            <li>Session duration and frequency</li>
            <li>Feature usage patterns</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-4">3. Technical Information</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            We may automatically collect the following information when you visit our website:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Operating system</li>
            <li>Device information</li>
            <li>Usage patterns and preferences</li>
            <li>Referring website</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-4">4. Cookies</h3>
          <p className="text-gray-700 leading-relaxed">
            We use cookies and similar tracking technologies to track activity on our Services and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>
        </div>

        {/* How We Use Information Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 transform transition-all hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            How We Use Your Information
          </h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            We use the information we collect for various purposes, including:
          </p>
          
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-3">
            <li><span className="font-semibold">Provide and maintain our Services:</span> To deliver the features of SmartStrokes, including personalized typing practice and performance tracking.</li>
            <li><span className="font-semibold">Improve user experience:</span> To understand how users interact with our platform and identify areas for improvement.</li>
            <li><span className="font-semibold">Analyze typing patterns:</span> To generate personalized practice content focused on your weak keys.</li>
            <li><span className="font-semibold">Communicate with you:</span> To send you updates, security alerts, and support messages.</li>
            <li><span className="font-semibold">Monitor usage:</span> To detect, prevent, and address technical issues or fraudulent activities.</li>
            <li><span className="font-semibold">Personalization:</span> To remember your preferences and customize your experience.</li>
          </ul>
        </div>

        {/* Sharing Your Information Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 transform transition-all hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Sharing Your Information
          </h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            We do not sell, trade, or otherwise transfer your personal information to outside parties except in the following cases:
          </p>
          
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-3">
            <li><span className="font-semibold">Service providers:</span> We may share your information with third-party vendors who provide services on our behalf (e.g., hosting, data analysis, customer service).</li>
            <li><span className="font-semibold">Legal requirements:</span> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
            <li><span className="font-semibold">Business transfers:</span> If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
            <li><span className="font-semibold">With your consent:</span> We may share your information with third parties when we have your consent to do so.</li>
          </ul>
          
          <p className="text-gray-700 leading-relaxed">
            We require all third parties to respect the security of your personal data and to treat it in accordance with the law.
          </p>
        </div>

        {/* Data Security Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 transform transition-all hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Data Security
          </h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            The security of your personal information is important to us. We implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your information. These measures include:
          </p>
          
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-3">
            <li>Encryption of sensitive data</li>
            <li>Regular security assessments</li>
            <li>Access controls for our systems</li>
            <li>Secure user authentication procedures</li>
          </ul>
          
          <p className="text-gray-700 leading-relaxed">
            However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
          </p>
        </div>

        {/* India-Specific Information Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 transform transition-all hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
            </svg>
            India-Specific Information
          </h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            For users in India, we comply with applicable data protection laws including the Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Sensitive Personal Data</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            As per Indian law, we consider the following information as sensitive personal data or information:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Passwords</li>
            <li>Financial information such as bank account details, credit card information, or payment instrument details</li>
            <li>Health information</li>
            <li>Biometric information</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Data Retention</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements. To determine the appropriate retention period, we consider the amount, nature, and sensitivity of the data, the potential risk of harm from unauthorized use or disclosure, and the applicable legal requirements.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Grievance Officer</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            In accordance with the Information Technology Act, 2000 and rules made thereunder, the name and contact details of the Grievance Officer are provided below:
          </p>
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-100 mb-6">
            <p className="text-gray-700"><span className="font-semibold">Name:</span> Grievance Officer</p>
            <p className="text-gray-700"><span className="font-semibold">Email:</span> grievance@smartstrokes.com</p>
            <p className="text-gray-700"><span className="font-semibold">Address:</span> 42 Tech Park, Electronic City, Bangalore, Karnataka 560100, India</p>
          </div>
          <p className="text-gray-700 leading-relaxed">
            If you have any grievances regarding the processing of your personal information, you may contact our Grievance Officer. The Grievance Officer will address your concern within 30 days from the date of receipt of the grievance.
          </p>
        </div>

        {/* Your Choices Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 transform transition-all hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Your Choices
          </h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            You have certain rights and choices regarding your personal information:
          </p>
          
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-3">
            <li><span className="font-semibold">Account Information:</span> You can review, update, or delete your account information at any time by logging into your account settings.</li>
            <li><span className="font-semibold">Marketing Communications:</span> You can opt out of receiving promotional emails by following the unsubscribe instructions in those emails.</li>
            <li><span className="font-semibold">Cookies:</span> Most web browsers are set to accept cookies by default. You can choose to set your browser to remove or reject browser cookies.</li>
            <li><span className="font-semibold">Data Access and Portability:</span> You can request a copy of your personal information that we hold.</li>
            <li><span className="font-semibold">Deletion:</span> You can request that we delete your personal information, subject to certain exceptions.</li>
          </ul>
        </div>

        {/* Children's Privacy Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 transform transition-all hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Children's Privacy
          </h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            Our Services are not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we can take necessary actions.
          </p>
        </div>

        {/* Governing Law Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 transform transition-all hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
            Governing Law
          </h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            This Privacy Policy shall be governed by and construed in accordance with the laws of India, including but not limited to the Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
          </p>
          
          <p className="text-gray-700 leading-relaxed">
            By using our Services, you consent to the collection and use of your information as described in this Privacy Policy, subject to the laws of India.
          </p>
        </div>

        {/* Changes to This Policy Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 transform transition-all hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Changes to This Privacy Policy
          </h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this page.
          </p>
          
          <p className="text-gray-700 leading-relaxed">
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
        </div>

        {/* Contact Us Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Us
          </h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          
          <div className="bg-purple-50 rounded-xl p-6 border border-purple-100 mb-8">
            <p className="text-gray-700 mb-2"><span className="font-semibold">Email:</span> privacy@smartstrokes.com</p>
            <p className="text-gray-700"><span className="font-semibold">Address:</span> 42 Tech Park, Electronic City, Bangalore, Karnataka 560100, India</p>
          </div>
          
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

export default Privacy; 