import React, { useState } from 'react';

const OTPVerification = () => {
    const [otp, setOtp] = useState('');

    const handleChange = (e) => {
        setOtp(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // api call
        console.log("Verifying OTP:", otp);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-100 to-blue-100 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center text-purple-600 mb-4">OTP Verification</h2>
                <p className="text-center text-gray-500 mb-6">Enter the 6-digit OTP sent to your email</p>

                <input
                    type="text"
                    maxLength="6"
                    value={otp}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-4 py-2 text-center text-lg tracking-widest rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="Enter OTP"
                    required
                />

                <button
                    type="submit"
                    className="mt-6 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-200"
                >
                    Verify OTP
                </button>
            </form>
        </div>
    );
};

export default OTPVerification;
