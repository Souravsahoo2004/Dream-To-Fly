// app/learning/page.jsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function LearningPage() {
  const [currentLanguage, setCurrentLanguage] = useState(0)
  const [activeCategory, setActiveCategory] = useState(0)
  
  const languages = [
    "C++ Programming", 
    "Java Development", 
    "JavaScript ES6+", 
    "Spring Boot APIs",
    "Data Structures"
  ]

  const categories = [
    {
      title: "C++ Programming",
      description: "Master C++ from basics to advanced concepts with hands-on projects",
      courses: ["C++ Fundamentals", "OOP in C++", "STL {'&'} Templates", "Advanced C++"],
      students: "5,200+",
      icon: "🔥",
      color: "from-red-500 to-orange-500"
    },
    {
      title: "Java Development",
      description: "Complete Java programming from core concepts to enterprise applications",
      courses: ["Java Basics", "OOP Concepts", "Collections Framework", "Spring Framework"],
      students: "4,800+",
      icon: "☕",
      color: "from-orange-500 to-yellow-500"
    },
    {
      title: "JavaScript Mastery",
      description: "Modern JavaScript including ES6+, async programming, and frameworks",
      courses: ["JavaScript Basics", "ES6+ Features", "Async Programming", "Node.js"],
      students: "6,500+",
      icon: "⚡",
      color: "from-yellow-500 to-green-500"
    },
    {
      title: "Spring Boot",
      description: "Build robust web applications and REST APIs with Spring Boot",
      courses: ["Spring Basics", "REST APIs", "Database Integration", "Security"],
      students: "3,200+",
      icon: "🍃",
      color: "from-green-500 to-teal-500"
    }
  ]

  const features = [
    { icon: "📚", title: "Free Content", desc: "100% free tutorials and resources" },
    { icon: "🎯", title: "Project-Based", desc: "Learn by building real projects" },
    { icon: "📱", title: "Mobile Friendly", desc: "Learn anywhere, anytime" },
    { icon: "🏆", title: "Certificates", desc: "Get certified upon completion" },
    { icon: "💬", title: "Community", desc: "Join our learning community" },
    { icon: "🔄", title: "Updated", desc: "Always current with trends" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLanguage((prev) => (prev + 1) % languages.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [languages.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-32 right-20 w-80 h-80 bg-emerald-500 rounded-full filter blur-3xl animate-pulse delay-500"></div>
          <div className="absolute bottom-32 left-20 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl animate-pulse delay-1500"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Visual Section */}
            <div className="relative order-2 lg:order-1">
              <div className="relative z-10 mx-auto max-w-lg">
                <div className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-sm text-gray-400 font-mono">
                      learning.{currentLanguage === 1 ? 'java' : currentLanguage === 2 ? 'js' : 'cpp'}
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-3 font-mono text-sm">
                    <div className="text-green-400">// Your coding journey starts here!</div>
                    <div className="text-blue-400">
                      <span className="text-purple-400">public</span> <span className="text-yellow-300">class</span> <span className="text-blue-300">Success</span> {'{'}
                    </div>
                    <div className="pl-4 space-y-1">
                      <div className="text-cyan-400">String dedication = <span className="text-orange-300">{'"'}consistent practice{'"'}</span>;</div>
                      <div className="text-cyan-400">String growth = <span className="text-orange-300">{'"'}step by step{'"'}</span>;</div>
                      <div className="text-cyan-400">boolean success = <span className="text-orange-300">true</span>;</div>
                    </div>
                    <div className="text-blue-400">{'}'}</div>
                    <div className="text-gray-500">
                      <span className="text-emerald-400">console</span>.log(<span className="text-orange-300">{'"'}Keep learning!{'"'}</span>);
                    </div>
                  </div>
                </div>

                {/* Floating Programming Icons */}
                <div className="absolute -top-6 -right-8 w-14 h-14 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg animate-bounce">
                  Java
                </div>
                <div className="absolute top-16 -left-10 w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg animate-bounce delay-1000">
                  C++
                </div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center text-black font-bold shadow-lg animate-bounce delay-500">
                  JS
                </div>
                <div className="absolute bottom-12 -left-8 w-14 h-14 bg-green-500 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg animate-bounce delay-1500">
                  Spring
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="text-center lg:text-left space-y-8 order-1 lg:order-2">
              

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Learn Coding
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  From Scratch
                </span>
                <br />
                to Expert
              </h1>
              
              <div className="flex items-center justify-center lg:justify-start space-x-3 text-2xl text-gray-300">
                <span>Master</span>
                <span className="text-emerald-400 font-bold min-w-[250px] text-left">
                  {languages[currentLanguage]}
                </span>
              </div>

              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Master programming with our comprehensive, free tutorials. From C++ fundamentals to advanced Spring Boot applications - learn at your own pace.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  href="#courses"
                  className="group px-10 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-lg font-bold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25 flex items-center justify-center space-x-3"
                >
                  <span>Start Learning Free</span>
                  <svg className="w-6 h-6 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </Link>
                
                <Link 
                  href="#tutorials"
                  className="px-10 py-5 border-2 border-white/30 text-white hover:bg-white/10 text-lg font-bold rounded-full transition-all duration-300 backdrop-blur-sm flex items-center justify-center space-x-3"
                >
                  <span>Browse Tutorials</span>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
                {[
                  { number: "20K+", label: "Students Learning" },
                  { number: "150+", label: "Free Tutorials" },
                  { number: "4.9★", label: "Student Rating" }
                ].map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="text-3xl md:text-4xl font-bold text-white">{stat.number}</div>
                    <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Why Choose <span className="text-emerald-400">Our Platform</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to master programming and advance your career
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-emerald-400/50 transition-all duration-300 hover:transform hover:scale-105 text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Programming <span className="text-teal-400">Courses</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive courses designed to take you from beginner to expert
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div 
                key={index}
                className={`bg-white/10 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:transform hover:scale-105 cursor-pointer ${
                  activeCategory === index ? 'border-emerald-400 bg-white/20' : 'border-white/20 hover:border-emerald-400/50'
                }`}
                onClick={() => setActiveCategory(index)}
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{category.title}</h3>
                <p className="text-gray-300 mb-6">{category.description}</p>
                
                <div className="space-y-2 mb-6">
                  {category.courses.map((course, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-300 text-sm">{course}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-emerald-400 font-semibold">{category.students} students</span>
                  <span className="text-yellow-400 font-semibold">★ 4.8</span>
                </div>
                
                <button className={`w-full py-3 bg-gradient-to-r ${category.color} hover:shadow-lg text-white font-semibold rounded-lg transition-all duration-300`}>
                  Start Learning
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section id="tutorials" className="py-20 bg-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Learning <span className="text-cyan-400">Path</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Follow our structured path to become a proficient programmer
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {[
              { phase: "Beginner", title: "Programming Fundamentals", duration: "4-6 weeks", topics: ["Variables & Data Types", "Control Structures", "Functions", "Basic Problem Solving"] },
              { phase: "Intermediate", title: "Object-Oriented Programming", duration: "6-8 weeks", topics: ["Classes & Objects", "Inheritance", "Polymorphism", "Design Patterns"] },
              { phase: "Advanced", title: "Web Development {'&'} Frameworks", duration: "8-12 weeks", topics: ["Spring Boot", "REST APIs", "Database Integration", "Testing"] },
              { phase: "Expert", title: "Full-Stack Projects", duration: "12+ weeks", topics: ["Complete Applications", "Deployment", "Performance", "Best Practices"] }
            ].map((phase, index) => (
              <div key={index} className="relative">
                {index < 3 && (
                  <div className="absolute left-8 top-24 w-0.5 h-20 bg-gradient-to-b from-emerald-400 to-teal-400"></div>
                )}
                <div className="flex items-start space-x-8 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-emerald-400 font-semibold">{phase.phase}</span>
                        <h3 className="text-2xl font-bold text-white">{phase.title}</h3>
                      </div>
                      <span className="text-gray-400">{phase.duration}</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {phase.topics.map((topic, idx) => (
                        <div key={idx} className="bg-white/5 rounded-lg p-3 text-center">
                          <span className="text-gray-300 text-sm">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready To Start Your Coding Journey?
            </h2>
            <p className="text-xl text-gray-300">
              Join thousands of students learning programming with our free platform
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/register"
                className="px-12 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-lg font-bold rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Create Free Account
              </Link>
              
              <Link  
                href="/tutorials/cpp-basics"
                className="px-12 py-5 border-2 border-white/30 text-white hover:bg-white/10 text-lg font-bold rounded-full transition-all duration-300"
              >
                Try Sample Tutorial
              </Link>
            </div>

            <div className="pt-8 text-gray-400">
              <p>🎓 100% Free • 📚 Comprehensive Content • 🏆 Certificate Available • 💬 Community Support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
