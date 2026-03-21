'use client'

import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Ready to Transform Your
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Business Online?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Join 500+ successful businesses who chose Dream To Fly for their digital transformation.
            Get a free consultation and detailed project proposal tailored to your specific needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Link
              href="/contact"
              className="px-12 py-6 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white text-xl font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25 flex items-center space-x-3"
            >
              <span>Start Your Project Now</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <div className="text-center space-y-2">
              <div className="text-gray-400 text-sm">Or call us directly</div>
              <div className="text-2xl font-bold text-cyan-400 hover:text-cyan-300 transition-colors">
                +91 98765 43210
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 pt-12 text-center">
            {[
              { icon: "💬", text: "Free Consultation", desc: "No cost, no obligation" },
              { icon: "⚡", text: "Quick Turnaround", desc: "7-30 days delivery" },
              { icon: "💰", text: "Best Price Guarantee", desc: "Beat any quote by 10%" },
              { icon: "🛡️", text: "Money Back Guarantee", desc: "30-day refund policy" }
            ].map((benefit, index) => (
              <div key={index} className="space-y-2">
                <div className="text-3xl">{benefit.icon}</div>
                <div className="text-white font-semibold">{benefit.text}</div>
                <div className="text-gray-400 text-sm">{benefit.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}