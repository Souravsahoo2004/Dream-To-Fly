"use client"

import { motion } from "framer-motion"

export default function AnimatedCard({ title, desc, gradient }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`p-6 rounded-3xl shadow-xl bg-gradient-to-br ${gradient} text-white relative overflow-hidden`}
    >
      {/* Glow effect */}
      <div className="absolute w-32 h-32 bg-white/20 blur-2xl rounded-full top-0 right-0"></div>

      {/* Anime style circle */}
      <div className="w-16 h-16 rounded-full bg-white/30 mb-4 animate-pulse"></div>

      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-sm opacity-90 mt-2">{desc}</p>
    </motion.div>
  )
}