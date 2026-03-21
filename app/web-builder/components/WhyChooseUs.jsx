'use client'

const whyChooseUs = [
  { icon: "⚡", title: "Lightning Fast Delivery", description: "Get your website live in 7-60 days depending on complexity." },
  { icon: "🎯", title: "100% Custom Design", description: "No templates. Every website is designed uniquely for your brand." },
  { icon: "📱", title: "Mobile-First Approach", description: "Responsive design that works perfectly on all devices." },
  { icon: "🔒", title: "Enterprise Security", description: "SSL certificates, secure coding practices, and data protection." },
  { icon: "🚀", title: "Performance Optimized", description: "Fast loading speeds and optimized for search engines." },
  { icon: "💡", title: "Modern Technologies", description: "Built with latest frameworks and best development practices." }
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-100 to-pink-100 text-orange-800 rounded-full text-sm font-medium">
            Why Choose Dream To Fly
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            What Sets Us Apart from the Competition
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            We don&apos;t just build websites - we create digital experiences that drive business growth.
            Here&apos;s why 500+ businesses trust us with their digital presence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {whyChooseUs.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 text-center group"
            >
              <div className="text-5xl mb-6 group-hover:scale-125 transition-transform duration-300">{item.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}