'use client'

import { useState, useEffect } from 'react'
import HeroSection from './web-builder/components/HeroSection'
import PackagesSection from './web-builder/components/PackagesSection'
import PortfolioSection from './web-builder/components/PortfolioSection'
import ProcessSection from './web-builder/components/ProcessSection'
import WhyChooseUs from './web-builder/components/WhyChooseUs'
import Testimonials from './web-builder/components/Testimonials'
import FinalCTA from './web-builder/components/FinalCTA'

export default function WebBuilderPage() {
  const [activePackage, setActivePackage] = useState(1)
  const [currentPortfolio, setCurrentPortfolio] = useState(0)
  const [currentTech, setCurrentTech] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)

  const technologies = [
    "React & Next.js",
    "Node.js & Express",
    "MongoDB",
    "Convex & Firebase",
    "Full-Stack Solutions",
    "Cloud Deployment"
  ]

  const portfolio = [
    {
      title: "TechCorp Solutions",
      category: "Corporate Website",
      description: "Modern corporate website with advanced functionality and CMS integration.",
      image: "/ApolloHealthAlertApp.jpg",
      technologies: ["React", "Node.js", "MongoDB"],
      results: "300% increase in leads"
    },
    {
      title: "Fashion Forward Store",
      category: "E-commerce Platform",
      description: "Complete e-commerce solution with 1000+ products and advanced filtering.",
      image: "/ApolloHealthAlertApp.jpg",
      technologies: ["Next.js", "Stripe", "Convex"],
      results: "₹50L+ monthly revenue"
    },
    {
      title: "Apollo Health Alert App",
      category: "Web Application",
      description: "Patient Health Monitor and Alert management system.",
      image: "/ApolloHealthAlertApp.jpg",
      technologies: ["Next.js", "Express", "Firebase"],
      results: "10,000+ patients managed",
      link: "http://apollo-health-monitoring-alert-syst.vercel.app/"
    },
    {
      title: "EduTech Learning",
      category: "Learning Platform",
      description: "Online learning platform with video streaming and progress tracking.",
      image: "/ApolloHealthAlertApp.jpg",
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
      project: "Business Pro Package"
    },
    {
      name: "Priya Patel",
      company: "Fashion Hub",
      role: "Founder",
      content: "The e-commerce store they built for us is amazing. Sales increased by 250% and the admin panel makes managing inventory so easy.",
      rating: 5,
      project: "E-Commerce Store"
    },
    {
      name: "Dr. Amit Gupta",
      company: "MediCare Clinic",
      role: "Director",
      content: "The custom web application streamlined our entire patient management process. Highly professional team with excellent results.",
      rating: 5,
      project: "Custom Web App"
    }
  ]

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    const scrollTimer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }, 100)
    return () => clearTimeout(scrollTimer)
  }, [])

  // Rotation effects
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
      
      <PackagesSection
        activePackage={activePackage}
        setActivePackage={setActivePackage}
      />
      <PortfolioSection
        portfolio={portfolio}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />
      <ProcessSection />
      <WhyChooseUs />
      <Testimonials
        testimonials={testimonials}
        currentPortfolio={currentPortfolio}
      />
      <FinalCTA />
    </div>
  )
}