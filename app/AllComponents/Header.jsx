// app/AllComponents/Header.jsx
'use client'

import { User } from "lucide-react"
import React from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()

  // Function to handle home link click
  const handleHomeClick = (e) => {
    e.preventDefault()
    
    // If we're already on the home page, just scroll to top
    if (pathname === '/') {
      window.scrollTo({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      })
    } else {
      // If we're on a different page, navigate to home first
      router.push('/')
    }
  }

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm shadow-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          
          {/* Left: Logo + Name + Motto */}
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

          {/* Middle: Nav Links */}
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={handleHomeClick}
              className="hover:text-blue-600 font-medium text-gray-700 transition-colors duration-200 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </button>
            
            
            
            <Link 
              href="/Dashboard" 
              className="hover:text-blue-600 font-medium text-gray-700 transition-colors duration-200 relative group"
            >
              Dashbourd
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            <Link 
              href="/Learning" 
              className="hover:text-blue-600 font-medium text-gray-700 transition-colors duration-200 relative group"
            >
              Learning
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            <Link 
              href="/contact" 
              className="hover:text-blue-600 font-medium text-gray-700 transition-colors duration-200 relative group"
            >
              Contact Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/About" 
              className="hover:text-blue-600 font-medium text-gray-700 transition-colors duration-200 relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Right: Profile + Login */}
          <div className="flex items-center space-x-4">
            <User className="w-6 h-6 cursor-pointer text-gray-700 hover:text-blue-600 transition-colors duration-200" />
            <Link href={"/login"}>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105">
              Login
            </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer so content below is visible */}
      <div className="pt-20"></div>
    </>
  )
}
