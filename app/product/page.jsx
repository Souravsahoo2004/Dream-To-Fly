"use client"

import { motion } from "framer-motion"
import AnimatedCard from "../web-builder/components/AnimatedCard"
export default function ProductPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-6 py-16">

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-gray-800">
          Build Products That Feel Magical ✨
        </h1>
        <p className="text-gray-600 mt-4">
          Powerful tools, beautiful UI, seamless experience.
        </p>
      </motion.div>

      {/* Grid Sections */}
      <div className="grid md:grid-cols-2 gap-8">

        <AnimatedCard
          title="Smart Builder"
          desc="AI-powered website creation with stunning layouts."
          gradient="from-indigo-500 to-purple-500"
        />

        <AnimatedCard
          title="Realtime Preview"
          desc="Instant visual updates while editing."
          gradient="from-pink-500 to-rose-500"
        />

        <AnimatedCard
          title="Performance Optimized"
          desc="Blazing fast loading with optimized assets."
          gradient="from-blue-500 to-cyan-500"
        />

        <AnimatedCard
          title="Custom Animations"
          desc="Smooth transitions and motion design built-in."
          gradient="from-green-500 to-emerald-500"
        />

      </div>
    </div>
  )
}