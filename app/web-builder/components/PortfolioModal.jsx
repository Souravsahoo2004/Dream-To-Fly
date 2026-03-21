'use client'

import Image from 'next/image'

export default function PortfolioModal({ selectedProject, onClose }) {
  if (!selectedProject) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-3xl w-full mx-4 p-8 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        <div className="relative h-64 rounded-xl overflow-hidden mb-6">
          <Image
            src={selectedProject.image}
            alt={selectedProject.title}
            fill
            className="object-cover"
          />
        </div>

        <h2 className="text-3xl font-bold mb-3">{selectedProject.title}</h2>
        <p className="text-gray-600 mb-4">{selectedProject.description}</p>

        <p className="mb-4">
          <span className="font-semibold">Category:</span> {selectedProject.category}
        </p>
        <p className="mb-4">
          <span className="font-semibold">Results:</span> {selectedProject.results}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {selectedProject.technologies.map((tech, i) => (
            <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              {tech}
            </span>
          ))}
        </div>

        {selectedProject.link && (
          <a
            href={selectedProject.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
          >
            Visit Project →
          </a>
        )}
      </div>
    </div>
  )
}