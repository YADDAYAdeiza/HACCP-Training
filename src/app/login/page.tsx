// src/app/login/page.tsx
"use client"; // This line marks the component as a Client Component

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for App Router
import Link from 'next/link';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Initialize the router

  // Check if already logged in on component mount
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true') {
      router.push('/'); // Redirect to home if already logged in
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // --- MVP HARDCODED CREDENTIALS ---
    // In a real app, you would send these to a backend API for validation
    if (username === 'nafdac_user' && password === 'haccp_pass') {
      if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', 'true'); // Simulate login state
      }
      router.push('/'); // Redirect to home page after successful login
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)]"> {/* Adjust min-height as needed */}
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">NAFDAC Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Username:
            </label>
            <input
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600 text-sm">
          For MVP: Use Username: <span className="font-semibold">nafdac_user</span>, Password: <span className="font-semibold">haccp_pass</span>
        </p>
      </div>
    </div>
  );
}