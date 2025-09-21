'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function WebBuilderPage() {
  const [activePackage, setActivePackage] = useState(1)
  const [currentPortfolio, setCurrentPortfolio] = useState(0)
  const [currentTech, setCurrentTech] = useState(0)
  const [showPricingModal, setShowPricingModal] = useState(false)

  const technologies = [
    "React & Next.js",
    "Node.js & Express", 
    "MongoDB",
    "Convex & Firebase",
    "Full-Stack Solutions",
    "Cloud Deployment"
  ]

  const packages = [
    {
      id: 0,
      name: "Starter Website",
      subtitle: "Perfect for small businesses",
      description: "Professional business website with essential features to establish your online presence.",
      price: "₹49,999",
      originalPrice: "₹75,000",
      duration: "7-10 days",
      pages: "5-7 pages",
      features: [
        "Custom Responsive Design",
        "Mobile-Optimized Layout",
        "Contact Forms",
        "Google Maps Integration",
        "SEO Basic Setup",
        "SSL Certificate",
        "1 Month Free Support",
        "Social Media Integration"
      ],
      popular: false,
      icon: "🚀",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 1,
      name: "Business Pro",
      subtitle: "Most popular choice",
      description: "Advanced business website with CMS, analytics, and enhanced functionality for growing businesses.",
      price: "₹99,999",
      originalPrice: "₹1,50,000",
      duration: "14-21 days",
      pages: "10-15 pages",
      features: [
        "Everything in Starter",
        "Content Management System",
        "Blog/News Section",
        "Advanced SEO Optimization",
        "Google Analytics Setup",
        "Payment Gateway Integration",
        "Admin Dashboard",
        "3 Months Free Support",
        "Performance Optimization",
        "Email Marketing Integration"
      ],
      popular: true,
      icon: "💼",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 2,
      name: "E-Commerce Store",
      subtitle: "Complete online store",
      description: "Full-featured e-commerce platform with inventory management, payment processing, and order tracking.",
      price: "₹1,99,999",
      originalPrice: "₹3,00,000",
      duration: "21-30 days",
      pages: "20+ pages",
      features: [
        "Everything in Business Pro",
        "Product Catalog Management",
        "Shopping Cart & Checkout",
        "Multiple Payment Gateways",
        "Inventory Management",
        "Order Tracking System",
        "Customer Account Portal",
        "Discount & Coupon System",
        "Sales Analytics Dashboard",
        "6 Months Free Support"
      ],
      popular: false,
      icon: "🛒",
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      name: "Custom Web App",
      subtitle: "Tailored solutions",
      description: "Custom-built web applications with advanced functionality, API integrations, and scalable architecture.",
      price: "₹3,99,999+",
      originalPrice: "Starting Price",
      duration: "30-60 days",
      pages: "Custom",
      features: [
        "Custom Application Development",
        "Database Architecture Design",
        "API Development & Integration",
        "User Management System",
        "Advanced Admin Panel",
        "Third-party Integrations",
        "Cloud Infrastructure Setup",
        "Security Implementation",
        "Performance Optimization",
        "12 Months Free Support"
      ],
      popular: false,
      icon: "⚡",
      color: "from-orange-500 to-red-500"
    }
  ]

  const portfolio = [
    {
      title: "TechCorp Solutions",
      category: "Corporate Website",
      description: "Modern corporate website with advanced functionality and CMS integration.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "Node.js", "MongoDB"],
      results: "300% increase in leads"
    },
    {
      title: "Fashion Forward Store",
      category: "E-commerce Platform", 
      description: "Complete e-commerce solution with 1000+ products and advanced filtering.",
      image: "/api/placeholder/600/400",
      technologies: ["Next.js", "Stripe", "Convex"],
      results: "₹50L+ monthly revenue"
    },
    {
      title: "HealthCare Plus",
      category: "Web Application",
      description: "Patient management system with appointment booking and medical records.",
      image: "/api/placeholder/600/400", 
      technologies: ["Vue.js", "Express", "Firebase"],
      results: "10,000+ patients managed"
    },
    {
      title: "EduTech Learning",
      category: "Learning Platform",
      description: "Online learning platform with video streaming and progress tracking.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "AWS", "Firebase"],
      results: "25,000+ active students"
    }
  ]

  const testimonials = [
    {
      name: "Rajesh Sharma",
      company: "TechVision Pvt Ltd", 
      role: "CEO",
      content: "Dream To Fly delivered exactly what we needed. Our new website increased our business inquiries by 400% in just 3 months!",
      rating: 5,
      image: "/api/placeholder/80/80",
      project: "Business Pro Package"
    },
    {
      name: "Priya Patel",
      company: "Fashion Hub",
      role: "Founder",
      content: "The e-commerce store they built for us is amazing. Sales increased by 250% and the admin panel makes managing inventory so easy.",
      rating: 5,
      image: "/api/placeholder/80/80", 
      project: "E-Commerce Store"
    },
    {
      name: "Dr. Amit Gupta",
      company: "MediCare Clinic",
      role: "Director",
      content: "The custom web application streamlined our entire patient management process. Highly professional team with excellent results.",
      rating: 5,
      image: "/api/placeholder/80/80",
      project: "Custom Web App"
    }
  ]

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
      title: "Design {'&'} Planning",
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
      title: "Testing {'&'} Launch",
      description: "Thorough testing across devices, performance optimization, and smooth deployment to live servers.",
      duration: "2-3 days", 
      icon: "🚀"
    },
    {
      step: "05",
      title: "Support {'&'} Maintenance",
      description: "Ongoing support, security updates, and maintenance to keep your website running perfectly.",
      duration: "Ongoing",
      icon: "🛠️"
    }
  ]

  const whyChooseUs = [
    {
      icon: "⚡",
      title: "Lightning Fast Delivery",
      description: "Get your website live in 7-30 days depending on complexity."
    },
    {
      icon: "🎯",
      title: "100% Custom Design",
      description: "No templates. Every website is designed uniquely for your brand."
    },
    {
      icon: "📱",
      title: "Mobile-First Approach",
      description: "Responsive design that works perfectly on all devices."
    },
    {
      icon: "🔒",
      title: "Enterprise Security",
      description: "SSL certificates, secure coding practices, and data protection."
    },
    {
      icon: "🚀",
      title: "Performance Optimized",
      description: "Fast loading speeds and optimized for search engines."
    },
    {
      icon: "💡",
      title: "Modern Technologies",
      description: "Built with latest frameworks and best development practices."
    }
  ]

  const comparisonData = [
    {
      feature: "Custom Design",
      starter: true,
      business: true, 
      ecommerce: true,
      custom: true
    },
    {
      feature: "Mobile Responsive",
      starter: true,
      business: true,
      ecommerce: true, 
      custom: true
    },
    {
      feature: "SEO Optimization",
      starter: "Basic",
      business: "Advanced",
      ecommerce: "Advanced",
      custom: "Enterprise"
    },
    {
      feature: "Content Management",
      starter: false,
      business: true,
      ecommerce: true,
      custom: true
    },
    {
      feature: "E-commerce Features",
      starter: false,
      business: false,
      ecommerce: true,
      custom: true
    },
    {
      feature: "Custom Functionality",
      starter: false,
      business: "Limited",
      ecommerce: "Advanced", 
      custom: "Unlimited"
    },
    {
      feature: "Free Support Period",
      starter: "1 Month",
      business: "3 Months",
      ecommerce: "6 Months",
      custom: "12 Months"
    }
  ]

  // Scroll to top on component mount (page load/refresh)
  useEffect(() => {
    // Immediate scroll to top
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    
    // Backup scroll to top after a small delay (in case of slow loading)
    const scrollTimer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }, 100)

    return () => clearTimeout(scrollTimer)
  }, []) // Empty dependency array ensures this runs only once on mount

  // Technology and portfolio rotation effects
  useEffect(() => {
    const techInterval = setInterval(() => {
      setCurrentTech((prev) => (prev + 1) % technologies.length)
    }, 3000)

    const portfolioInterval = setInterval(() => {
      setCurrentPortfolio((prev) => (prev + 1) % portfolio.length)
    }, 5000)

    return () => {
      clearInterval(techInterval)
      clearInterval(portfolioInterval)
    }
  }, [technologies.length, portfolio.length])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - This is now the top of the page */}
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
                  {technologies[currentTech]}
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
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
      <span>Contact Our Team</span>
    </Link>
              </div>

              <div className="pt-4 text-gray-400 text-center lg:text-left">
                <p className="flex items-center justify-center lg:justify-start space-x-4 text-sm">
                  <span className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>No Hidden Costs</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Free Consultation</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Money Back Guarantee</span>
                  </span>
                </p>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="relative z-10 max-w-lg mx-auto">
                {/* Main Website Preview */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform rotate-6 hover:rotate-3 transition-transform duration-500">
                  <div className="h-8 bg-gray-100 border-b flex items-center px-4 space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1 text-center text-xs text-gray-500">
                      your-business-website.com
                    </div>
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

                {/* Floating Success Elements */}
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

      {/* Service Packages Section */}
      <section id="packages" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-100 to-cyan-100 text-purple-800 rounded-full text-sm font-medium">
              Our Service Packages
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Choose Your Perfect Website Solution
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              From simple business websites to complex e-commerce platforms and custom web applications. 
              We have the perfect solution for every budget and requirement.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {packages.map((pkg, index) => (
              <div 
                key={pkg.id}
                className={`relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer ${
                  activePackage === index ? 'ring-4 ring-purple-500 transform scale-105' : 'hover:transform hover:scale-102'
                } ${pkg.popular ? 'border-2 border-purple-500' : 'border border-gray-200'}`}
                onClick={() => setActivePackage(index)}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <div className="p-8 pt-12">
                  <div className={`w-16 h-16 bg-gradient-to-r ${pkg.color} rounded-2xl flex items-center justify-center text-white text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {pkg.icon}
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <h3 className="text-2xl font-bold text-gray-900">{pkg.name}</h3>
                    <p className="text-purple-600 font-semibold">{pkg.subtitle}</p>
                    <p className="text-gray-600">{pkg.description}</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-4xl font-bold text-gray-900">{pkg.price}</span>
                      {pkg.originalPrice !== "Starting Price" && (
                        <span className="text-lg text-gray-500 line-through">{pkg.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>⏱️ {pkg.duration}</span>
                      <span>📄 {pkg.pages}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className={`w-full py-4 bg-gradient-to-r ${pkg.color} hover:shadow-xl text-white font-bold rounded-2xl transition-all duration-300 transform group-hover:scale-105 ${
                    pkg.popular ? 'shadow-lg shadow-purple-500/25' : ''
                  }`}>
                    {pkg.id === 3 ? 'Get Custom Quote' : 'Start This Project'}
                  </button>

                  {pkg.popular && (
                    <div className="mt-4 text-center text-sm text-purple-600 font-semibold">
                      🔥 Save ₹50,000 - Limited Time Offer!
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Package Comparison Table */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Detailed Package Comparison
            </h3>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Features</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Starter</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 bg-purple-50">Business Pro</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">E-Commerce</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Custom App</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {comparisonData.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.feature}</td>
                        <td className="px-6 py-4 text-center text-sm">
                          {typeof row.starter === 'boolean' ? (
                            row.starter ? (
                              <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5 text-red-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            )
                          ) : (
                            <span className="text-gray-600">{row.starter}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center text-sm bg-purple-50">
                          {typeof row.business === 'boolean' ? (
                            row.business ? (
                              <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5 text-red-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            )
                          ) : (
                            <span className="text-purple-600 font-semibold">{row.business}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center text-sm">
                          {typeof row.ecommerce === 'boolean' ? (
                            row.ecommerce ? (
                              <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5 text-red-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            )
                          ) : (
                            <span className="text-gray-600">{row.ecommerce}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center text-sm">
                          {typeof row.custom === 'boolean' ? (
                            row.custom ? (
                              <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5 text-red-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            )
                          ) : (
                            <span className="text-gray-600">{row.custom}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium">
              Our Work Portfolio
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Projects That Speak Success
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              From startups to enterprises, we{'\''}ve helped businesses across industries achieve their digital goals. 
              Here are some of our proudest achievements.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {portfolio.map((project, index) => (
              <div 
                key={index}
                className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <div className="h-64 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <div className="text-6xl opacity-20">{project.title.charAt(0)}</div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {project.results}
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-6">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <button className="text-purple-600 font-semibold hover:text-purple-800 transition-colors">
                      View Case Study →
                    </button>
                    <div className="flex space-x-2">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105">
              View Complete Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* Development Process */}
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
              {/* Process Connection Line */}
              <div className="hidden md:block absolute top-16 left-20 right-20 h-0.5 bg-gradient-to-r from-purple-200 via-blue-200 to-green-200"></div>
              
              {processSteps.map((step, index) => (
                <div 
                  key={index}
                  className="relative text-center group cursor-pointer"
                >
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

      {/* Why Choose Us */}
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
              We don{'\''}t just build websites - we create digital experiences that drive business growth. 
              Here{'\''}s why 500+ businesses trust us with their digital presence.
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

      {/* Client Testimonials */}
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
              Don{'\''}t just take our word for it. Here{'\''}s what business owners have to say 
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
                    {'\"'}{testimonials[currentPortfolio % testimonials.length].content}{'\"'}
                  </blockquote>
                  
                  <div className="flex items-center justify-center space-x-6">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {testimonials[currentPortfolio % testimonials.length].name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-xl text-white">{testimonials[currentPortfolio % testimonials.length].name}</div>
                      <div className="text-purple-200">{testimonials[currentPortfolio % testimonials.length].role}</div>
                      <div className="text-purple-100">{testimonials[currentPortfolio % testimonials.length].company}</div>
                      <div className="text-cyan-300 text-sm mt-1">Project: {testimonials[currentPortfolio % testimonials.length].project}</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center space-x-3 mt-8">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        (currentPortfolio % testimonials.length) === index ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
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

      {/* Pricing Modal */}
      
    </div>
  )
}
