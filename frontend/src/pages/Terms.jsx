import React from "react";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Agreement Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 transform transition-all hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Agreement to Terms
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            By accessing or using SmartStrokes (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Service.
          </p>
          <p className="text-gray-700 leading-relaxed">
            These Terms constitute a legally binding agreement between you and SmartStrokes regarding your use of the Service. The Service is intended for users who are at least 13 years of age.
          </p>
        </div>

        {/* Using Our Service Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 transform transition-all hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
            Using Our Services
          </h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Account Creation</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            To access certain features of the Service, you may be required to create an account. When you create an account, you must provide accurate and complete information. You are solely responsible for the activity that occurs on your account, and you must keep your account password secure.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-4">User Content</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Our Service allows you to create, upload, and share content. You retain any rights you may have to your content, but you grant SmartStrokes a worldwide, royalty-free license to use, copy, modify, and display your content in connection with providing the Service.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Prohibited Uses</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            You agree not to use the Service:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>In any way that violates any applicable laws or regulations</li>
            <li>To impersonate or attempt to impersonate SmartStrokes, a SmartStrokes employee, or any other person</li>
            <li>To engage in any other conduct that restricts or inhibits anyone's use of the Service</li>
            <li>To attempt to gain unauthorized access to the Service or any parts of the Service not intended for your use</li>
            <li>To use the Service in any manner that could disable, overburden, damage, or impair the Service</li>
          </ul>
        </div>

        {/* Intellectual Property Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 transform transition-all hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Intellectual Property Rights
          </h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of SmartStrokes and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
          </p>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of SmartStrokes.
          </p>
        </div>

        {/* User Rights Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 transform transition-all hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Your Rights and Responsibilities
          </h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            You are responsible for:
          </p>
          
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-3">
            <li><span className="font-semibold">Keeping your account secure:</span> Maintaining the security of your account and password. SmartStrokes cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.</li>
            <li><span className="font-semibold">Respectful use:</span> Using the Service in a manner that respects other users and does not violate any applicable laws or regulations.</li>
            <li><span className="font-semibold">Accurate information:</span> Providing truthful and accurate information when creating an account or using the Service.</li>
            <li><span className="font-semibold">Proper content:</span> Ensuring that any content you upload or share through the Service does not infringe on the rights of others.</li>
          </ul>
        </div>

        {/* Termination Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 transform transition-all hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Termination
          </h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
          </p>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            If you wish to terminate your account, you may simply discontinue using the Service, or contact us to request account deletion.
          </p>
          
          <p className="text-gray-700 leading-relaxed">
            All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
          </p>
        </div>

        {/* Limitation of Liability Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 transform transition-all hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Limitation of Liability
          </h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            In no event shall SmartStrokes, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-3">
            <li>Your access to or use of or inability to access or use the Service</li>
            <li>Any conduct or content of any third party on the Service</li>
            <li>Any content obtained from the Service</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content</li>
          </ul>
        </div>

        {/* Disclaimer Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 transform transition-all hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Disclaimer
          </h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
          </p>
          
          <p className="text-gray-700 leading-relaxed">
            SmartStrokes, its subsidiaries, affiliates, and its licensors do not warrant that:
          </p>
          
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2 mt-4">
            <li>The Service will function uninterrupted, secure, or available at any particular time or location</li>
            <li>Any errors or defects will be corrected</li>
            <li>The Service is free of viruses or other harmful components</li>
            <li>The results of using the Service will meet your requirements</li>
          </ul>
        </div>

        {/* India-Specific Terms Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 transform transition-all hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
            </svg>
            India-Specific Terms
          </h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            If you are a user accessing our Services from India, the following additional terms apply:
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Consumer Protection</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Our Services comply with the Consumer Protection Act, 2019 and the Consumer Protection (E-Commerce) Rules, 2020. As a consumer, you have rights under these laws, including the right to seek redressal for any unfair trade practices.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Electronic Contracts</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            These Terms constitute an electronic contract as per the provisions of the Information Technology Act, 2000. By clicking "I agree" or using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms without modification.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Dispute Resolution</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            In the event of any dispute arising between you and SmartStrokes:
          </p>
          <ol className="list-decimal pl-6 mb-6 text-gray-700 space-y-3">
            <li>We encourage you to first contact us directly to seek an amicable resolution.</li>
            <li>If the dispute cannot be resolved through direct discussion, you may file a complaint with the appropriate Consumer Dispute Redressal Commission or other forums as provided under applicable Indian laws.</li>
            <li>Any legal proceedings shall be initiated only in the courts of Bangalore, Karnataka, having jurisdiction over the matter.</li>
          </ol>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Taxes</h3>
          <p className="text-gray-700 leading-relaxed">
            All applicable taxes, including Goods and Services Tax (GST), as per Indian taxation laws, shall be charged as appropriate for any paid services we offer. Tax details will be included in any invoices issued to you.
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
            These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
          </p>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            Any disputes arising out of or relating to these Terms or any use of our Services shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka, India.
          </p>
          
          <p className="text-gray-700 leading-relaxed">
            If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
          </p>
        </div>

        {/* Changes to Terms Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 transform transition-all hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Changes to Terms
          </h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
          
          <p className="text-gray-700 leading-relaxed">
            By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
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
            If you have any questions about these Terms, please contact us at:
          </p>
          
          <div className="bg-purple-50 rounded-xl p-6 border border-purple-100 mb-8">
            <p className="text-gray-700 mb-2"><span className="font-semibold">Email:</span> legal@smartstrokes.com</p>
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

export default Terms; 