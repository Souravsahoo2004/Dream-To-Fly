'use client'

import Link from 'next/link'

export default function HeroSection({ technologies = [], currentTech = 0 }) {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-purple-200 text-sm font-medium">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Trusted by 500+ Businesses Across India
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              We Build
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Exceptional
              </span>
              <br />
              Websites
            </h1>

            <div className="flex items-center justify-center lg:justify-start space-x-3 text-2xl text-gray-300">
              <span>Specializing in</span>
              <span className="text-cyan-400 font-bold min-w-[280px] text-left">
                {technologies[currentTech] ?? ''}
              </span>
            </div>

            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              From stunning business websites to complex e-commerce platforms and custom web applications.
              We turn your ideas into powerful digital solutions that drive results.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: "500+", label: "Projects Delivered" },
                { number: "98%", label: "Client Satisfaction" },
                { number: "24/7", label: "Support Available" },
                { number: "30 Days", label: "Money Back Guarantee" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-cyan-400">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
              <Link
                href="#packages"
                className="group px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white text-lg font-bold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 flex items-center justify-center space-x-3"
              >
                <span>View Our Packages</span>
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                href="/contact"
                className="px-10 py-5 border-2 border-white/30 text-white hover:bg-white/10 text-lg font-bold rounded-full transition-all duration-300 backdrop-blur-sm flex items-center justify-center space-x-3"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Contact Our Team</span>
              </Link>
            </div>

            <div className="pt-4 text-gray-400 text-center lg:text-left">
              <p className="flex items-center justify-center lg:justify-start space-x-4 text-sm">
                {["No Hidden Costs", "Free Consultation", "Money Back Guarantee"].map((text) => (
                  <span key={text} className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{text}</span>
                  </span>
                ))}
              </p>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="relative z-10 max-w-lg mx-auto">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform rotate-6 hover:rotate-3 transition-transform duration-500">
                <div className="h-8 bg-gray-100 border-b flex items-center px-4 space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="flex-1 text-center text-xs text-gray-500">your-business-website.com</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-cyan-50 p-6">
                  <div className="space-y-4">
                    <div className="h-6 bg-purple-200 rounded-lg w-3/4"></div>
                    <div className="h-10 bg-gradient-to-r from-purple-300 to-cyan-300 rounded-lg w-1/2"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-24 bg-purple-100 rounded-lg"></div>
                      <div className="h-24 bg-cyan-100 rounded-lg"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-300 rounded w-full"></div>
                      <div className="h-3 bg-gray-300 rounded w-4/5"></div>
                      <div className="h-3 bg-gray-300 rounded w-3/5"></div>
                    </div>
                    <div className="h-12 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg"></div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex flex-col items-center justify-center text-white font-bold shadow-2xl animate-bounce">
                <div className="text-2xl">📈</div>
                <div className="text-xs">+300%</div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold shadow-2xl animate-bounce delay-1000">
                <div className="text-xl">⚡</div>
              </div>
              <div className="absolute top-1/3 -left-12 w-14 h-14 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold shadow-xl animate-bounce delay-500">
                <div className="text-sm">🚀</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}