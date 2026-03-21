"use client"

import React, { useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import ProgressBar from "./ProgressBar"
import Footer from "./web-builder/components/Footer"
import Header from "./web-builder/components/Header"
import Hero from "./web-builder/components/HeroSection"
import Nprogress from "nprogress"

export default function Provider({ children }) {
  const pathname = usePathname()

  const hideFooter =
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/forgot-password' ||
    pathname === '/reset-password'

  return (
    <>
      <Header />
<ProgressBar/>
      {pathname === '/' && <Hero />}

      {/* 🔥 Page Transition Wrapper */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut"
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {!hideFooter && <Footer />}
    </>
  )
}