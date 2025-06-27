// src/components/Navbar.tsx
"use client"; // This component now also needs to be a Client Component

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter(); // Initialize useRouter

  // Check login status on component mount and whenever localStorage changes
  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true');
    };

    // Initial check
    checkLoginStatus();

    // Listen for changes to localStorage (e.g., from other tabs/windows or login page)
    window.addEventListener('storage', checkLoginStatus);

    // Cleanup listener
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []); // Empty dependency array means this runs once on mount

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn'); // Clear login state
    }
    setIsLoggedIn(false); // Update local state
    router.push('/login'); // Redirect to login page
  };

  return (
    <nav className="bg-blue-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          NAFDAC HACCP Trainer
        </Link>
        <div>
          <Link href="/lesson" className="mr-4 hover:underline">
            HACCP Lesson
          </Link>
          <Link href="/simulation" className="mr-4 hover:underline">
            Start Simulation
          </Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}