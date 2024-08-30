import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/signup', {
        user: {
          name,
          email,
          password,
          password_confirmation: passwordConfirm,
        },
      });
      setMessage('Signup successful!');
    } catch (error) {
      setMessage('Signup failed!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="flex bg-gray-800 rounded-lg shadow-lg overflow-hidden w-3/4 max-w-5xl">
        {/* Left side - Sign Up form */}
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-bold text-white mb-4">Sign Up</h2>
          <p className="text-gray-400 mb-8">Create your account and get started</p>

          {/* Sign Up form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-400">Name*</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2 mt-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div>
              <label className="block text-gray-400">Email*</label>
              <input
                type="email"
                placeholder="mail@website.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 mt-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div>
              <label className="block text-gray-400">Password*</label>
              <input
                type="password"
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 mt-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div>
              <label className="block text-gray-400">Confirm Password*</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
                className="w-full p-2 mt-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-full hover:bg-purple-700 transition duration-300"
            >
              Sign Up
            </button>
          </form>
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </div>

        {/* Right side - 3D illustration */}
        <div className="w-1/2 relative">
          <img
            src="https://media.dev.to/cdn-cgi/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fz9lrmn4yugrc6cecmu76.jpg"
            alt="3D Illustration"
            className="absolute inset-0 h-full w-full object-cover scale-95"
          />
        </div>
      </div>
      <div className="text-gray-500 text-sm absolute bottom-4">
        ©2024 YourCompany. All rights reserved.
      </div>
    </div>
  );
};

export default Signup;
