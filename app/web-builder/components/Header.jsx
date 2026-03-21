// app/AllComponents/Header.jsx
'use client'

import { User } from "lucide-react"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // ✅ Check login from cookie
 useEffect(() => {
  const checkLogin = async () => {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include", // ✅ important for cookies
      });

      setIsLoggedIn(res.ok);
    } catch {
      setIsLoggedIn(false);
    }
  };

  checkLogin();
}, [pathname]); // ✅ runs on page change

  // ✅ Handle Logout
 const handleLogout = async () => {
  await fetch("/api/auth/logout", { 
    method: "POST",
    credentials: "include"
  });

  setIsLoggedIn(false);
  router.push("/login");
  router.refresh(); // ✅ important
};

  // ✅ Handle Home Click
  const handleHomeClick = (e) => {
    e.preventDefault()

    if (pathname === '/') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    } else {
      router.push('/')
    }
  }

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm shadow-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

          {/* Logo */}
          <Link href={"/"}>
            <div className="flex items-center space-x-3">
              <img
                src="/logo2.jpg"
                alt="Dream To Fly Logo"
                className="h-12 w-12 object-cover rounded-full border-2 border-blue-100"
              />

              <div className="flex flex-col leading-tight">
                <span className="font-bold text-lg text-gray-800 tracking-wide">ᴅʀᴇᴀᴍ ᴛᴏ ꜰʟʏ</span>
                <span className="text-sm text-gray-600 font-medium">The Web Master</span>
              </div>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex space-x-8">
            <button
              onClick={handleHomeClick}
              className="hover:text-blue-600 font-medium text-gray-700 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all"></span>
            </button>

            <Link href="/dashboard" className="hover:text-blue-600 font-medium text-gray-700 relative group">
              Dashboard
            </Link>

            <Link href="/Learning" className="hover:text-blue-600 font-medium text-gray-700 relative group">
              Learning
            </Link>

            <Link href="/contact" className="hover:text-blue-600 font-medium text-gray-700 relative group">
              Contact Us
            </Link>

            <Link href="/order" className="hover:text-blue-600 font-medium text-gray-700 relative group">
              Orders
            </Link>

            <Link href="/About" className="hover:text-blue-600 font-medium text-gray-700 relative group">
              About
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">

            {/* Profile */}
            <Link href="/profile">
              <User className="w-6 h-6 cursor-pointer text-gray-700 hover:text-blue-600 transition" />
            </Link>

            {/* ✅ Conditional Auth Buttons */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium shadow-md"
              >
                Logout
              </button>
            ) : (
              <Link href="/login">
                <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition font-medium shadow-md">
                  Login
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="pt-20"></div>
    </>
  )
}