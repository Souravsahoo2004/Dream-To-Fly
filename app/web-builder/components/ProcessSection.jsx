'use client'

const processSteps = [
  {
    step: "01",
    title: "Discovery Call",
    description: "We understand your business goals, target audience, and technical requirements through detailed consultation.",
    duration: "1-2 days",
    icon: "📞"
  },
  {
    step: "02",
    title: "Design and Planning",
    description: "Create wireframes, mockups, and technical architecture based on your requirements and feedback.",
    duration: "3-5 days",
    icon: "🎨"
  },
  {
    step: "03",
    title: "Development",
    description: "Build your website/application using cutting-edge technologies with regular progress updates.",
    duration: "7-45 days",
    icon: "💻"
  },
  {
    step: "04",
    title: "Testing and Launch",
    description: "Thorough testing across devices, performance optimization, and smooth deployment to live servers.",
    duration: "2-3 days",
    icon: "🚀"
  },
  {
    step: "05",
    title: "Support and Maintenance",
    description: "Ongoing support, security updates, and maintenance to keep your website running perfectly.",
    duration: "Ongoing",
    icon: "🛠️"
  }
]

export default function ProcessSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-100 to-blue-100 text-green-800 rounded-full text-sm font-medium">
            Our Development Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            From Concept to Launch in 5 Simple Steps
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Our proven development methodology ensures your project is delivered on time,
            within budget, and exceeds your expectations at every stage.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 relative">
            <div className="hidden md:block absolute top-16 left-20 right-20 h-0.5 bg-gradient-to-r from-purple-200 via-blue-200 to-green-200"></div>

            {processSteps.map((step, index) => (
              <div key={index} className="relative text-center group cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-all duration-300 relative z-10">
                  <span className="text-2xl">{step.icon}</span>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <div className="text-sm text-purple-600 font-bold mb-2">{step.step}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{step.description}</p>
                  <div className="text-xs text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full inline-block">
                    {step.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}