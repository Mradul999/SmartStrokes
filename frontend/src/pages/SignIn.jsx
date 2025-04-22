import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Signin = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        //api call
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-100 to-blue-100 px-4">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-purple-600 mb-4">Welcome Back</h2>

                <div className="mb-4">
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-purple-400"
                    />
                </div>

                <div className="mb-6 relative">
                    <label className="block mb-1">Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Enter your password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-purple-400"
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-9 cursor-pointer text-gray-500"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </span>
                </div>

                <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition">
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default Signin;
