// app/Provider.jsx
"use client"

import React, { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Header from "./AllComponents/Header"
import Hero from "./AllComponents/Hero"
import Footer from "./AllComponents/Foter"

export default function Provider({ children }) {
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Handle scroll to top when navigating to home page
  useEffect(() => {
    if (pathname === '/') {
      const timer = setTimeout(() => {
        window.scrollTo({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
        })
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [pathname])

  // Handle hash navigation for same-page scrolling
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.substring(1)
      const timer = setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 200)

      return () => clearTimeout(timer)
    }
  }, [pathname])

  // Show loading state until mounted
  if (!isMounted) {
    return <div>Loading...</div>
  }

  // Check if we're on an auth page (only affects footer now)
  const hideFooter = pathname === '/login' || 
                    pathname === '/signup' || 
                    pathname === '/forgot-password' || 
                    pathname === '/reset-password'

  return (
    <>
      {/* Header shows on ALL pages including login/signup */}
      <Header />
      
      {/* Hero only shows on home page */}
      {pathname === '/' && <Hero />}
      
      {/* Page content */}
      {children}
      
      {/* Footer shows on all pages EXCEPT login/signup */}
      {!hideFooter && <Footer />}
    </>
  )
}