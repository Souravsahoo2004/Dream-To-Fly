'use client'

export default function Testimonials({ testimonials, currentPortfolio }) {
  const current = testimonials[currentPortfolio % testimonials.length]

  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-purple-200 text-sm font-medium">
            Client Success Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            What Our Clients Say About Us
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what business owners have to say
            about their experience working with our team.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            <div className="relative z-10">
              <div className="text-center space-y-8">
                <div className="flex justify-center space-x-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="text-2xl md:text-3xl font-semibold italic text-white leading-relaxed">
                  &quot;{current.content}&quot;
                </blockquote>

                <div className="flex items-center justify-center space-x-6">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {current.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-xl text-white">{current.name}</div>
                    <div className="text-purple-200">{current.role}</div>
                    <div className="text-purple-100">{current.company}</div>
                    <div className="text-cyan-300 text-sm mt-1">Project: {current.project}</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-3 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      (currentPortfolio % testimonials.length) === index
                        ? 'bg-white scale-125'
                        : 'bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}