'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function AboutSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const services = [
    {
      title: "Custom Website Development",
      description: "Tailored websites built from scratch using modern technologies like React, Next.js, and Node.js. Every line of code is crafted to match your unique business needs.",
      icon: "💻",
      features: ["Responsive Design", "SEO Optimized", "Lightning Fast"]
    },
    {
      title: "E-commerce Solutions", 
      description: "Complete online stores with secure payment gateways, inventory management, and conversion-focused design that turns visitors into customers.",
      icon: "🛍️",
      features: ["Secure Payments", "Inventory System", "Mobile Commerce"]
    },
    {
      title: "Digital Marketing Integration",
      description: "Websites that work as powerful marketing tools with built-in SEO, analytics, and lead generation capabilities to grow your business.",
      icon: "📈",
      features: ["SEO Optimization", "Analytics Setup", "Lead Generation"]
    }
  ]

  const stats = [
    { number: "200+", label: "Websites Delivered" },
    { number: "150+", label: "Happy Clients" },
    { number: "99%", label: "Client Satisfaction" },
    { number: "24/7", label: "Support Available" }
  ]

  return (
    <section 
      ref={ref}
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16"></div>
      
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-20"
          variants={itemVariants}
        >
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-400 bg-clip-text text-transparent mb-6">
            Crafting Digital
            <span className="block text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text">
              Experiences
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We are a dedicated team of web developers and designers who transform your vision 
            into powerful, conversion-focused websites that drive real business growth.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          variants={itemVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Our Story */}
          <motion.div 
            className="space-y-8"
            variants={itemVariants}
          >
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Our Story
              </h2>
              <div className="absolute -top-4 -left-4 w-20 h-20 border-2 border-cyan-500/30 rounded-full"></div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500">
              <h3 className="text-2xl font-semibold text-cyan-300 mb-4">
                Building Success Stories, One Website at a Time
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Founded with the mission to bridge the gap between beautiful design and powerful functionality, 
                we've been helping businesses establish their online presence since day one.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                From startups launching their first website to established companies seeking digital transformation, 
                we've delivered over 200 successful projects across various industries.
              </p>
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-4">
                <p className="text-cyan-200 font-medium italic">
                  "Every website we build is a partnership. Your success is our success."
                </p>
              </div>
            </div>
          </motion.div>

          {/* Our Approach */}
          <motion.div 
            className="space-y-8"
            variants={itemVariants}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Our Approach
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  step: "01",
                  title: "Discovery & Strategy",
                  description: "We dive deep into understanding your business goals, target audience, and competitive landscape to create a winning strategy."
                },
                {
                  step: "02", 
                  title: "Design & Development",
                  description: "Our team crafts pixel-perfect designs and develops robust, scalable websites using the latest technologies and best practices."
                },
                {
                  step: "03",
                  title: "Launch & Support",
                  description: "We ensure a smooth launch and provide ongoing support, maintenance, and optimization to keep your website performing at its best."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="group bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:from-cyan-500/10 hover:to-blue-500/10 hover:border-cyan-500/30 transition-all duration-500"
                  whileHover={{ x: 10 }}
                >
                  <div className="flex items-start space-x-6">
                    <div className="text-3xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-gray-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Services Section */}
        <motion.div 
          className="mb-20"
          variants={itemVariants}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              What We Do Best
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive web development services tailored to elevate your business 
              and deliver measurable results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:from-cyan-500/10 hover:to-blue-500/10 hover:border-cyan-500/30 transition-all duration-500"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-5xl mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span className="text-sm text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us & CTA Section */}
        <motion.div 
          className="text-center space-y-12"
          variants={itemVariants}
        >
          <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-12 mx-auto max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Why Choose Us?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div>
                <div className="text-3xl mb-4">⚡</div>
                <h4 className="text-xl font-semibold text-white mb-3">Lightning Fast Delivery</h4>
                <p className="text-gray-300">Most projects completed within 2-4 weeks without compromising on quality.</p>
              </div>
              <div>
                <div className="text-3xl mb-4">🎯</div>
                <h4 className="text-xl font-semibold text-white mb-3">Results-Driven Focus</h4>
                <p className="text-gray-300">Every website is built with conversion and user experience as top priorities.</p>
              </div>
              <div>
                <div className="text-3xl mb-4">🚀</div>
                <h4 className="text-xl font-semibold text-white mb-3">Future-Proof Technology</h4>
                <p className="text-gray-300">Built with modern, scalable technologies that grow with your business.</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <motion.div 
            className="relative"
            variants={itemVariants}
          >
            <h3 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-8">
              Ready to Get Started?
            </h3>
            <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto">
              Let's discuss your project and create a website that not only looks amazing 
              but drives real business results. Your success story starts here.
            </p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              whileHover={{ scale: 1.05 }}
            >
              <button className="group relative px-12 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full font-semibold text-white text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/25">
                <span className="relative z-10">Start Your Project</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button className="px-12 py-4 border-2 border-white/20 rounded-full font-semibold text-white text-lg hover:bg-white/10 hover:border-white/40 transition-all duration-300">
                View Our Work
              </button>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-2 text-gray-400">
                <span className="text-cyan-400">✓</span>
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-400">
                <span className="text-cyan-400">✓</span>
                <span>No Hidden Costs</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-400">
                <span className="text-cyan-400">✓</span>
                <span>30-Day Money Back Guarantee</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-400">
                <span className="text-cyan-400">✓</span>
                <span>Ongoing Support Included</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Custom Styles for animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .bg-grid-16 {
          background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 16px 16px;
        }
      `}</style>
    </section>
  )
}
