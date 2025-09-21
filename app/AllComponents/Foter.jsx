// components/Footer.jsx
'use client';
import React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const socialLinks = [
    { name: 'GitHub', href: '#', icon: '⚡' },
    { name: 'Twitter', href: '#', icon: '🚀' },
    { name: 'LinkedIn', href: '#', icon: '💎' },
    { name: 'Discord', href: '#', icon: '🌟' }
  ];

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '/features' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'API', href: '/api' },
        { name: 'Enterprise', href: '/enterprise' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
        { name: 'Contact', href: '/contact' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '/docs' },
        { name: 'Blog', href: '/blog' },
        { name: 'Community', href: '/community' },
        { name: 'Support', href: '/support' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy', href: '/privacy' },
        { name: 'Terms', href: '/terms' },
        { name: 'Security', href: '/security' },
        { name: 'Cookies', href: '/cookies' }
      ]
    }
  ];

  return (
    <>
      <footer className="futuristic-footer">
        {/* Animated Background Elements */}
        <div className="footer-bg-elements">
          <div className="grid-pattern"></div>
          <div className="floating-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className={`particle particle-${i % 4}`}></div>
            ))}
          </div>
          <div 
            className="mouse-glow"
            style={{
              '--mouse-x': `${mousePos.x}px`,
              '--mouse-y': `${mousePos.y}px`
            }}
          ></div>
        </div>

        {/* Main Footer Content */}
        <div className="footer-container">
          {/* Top Section with Logo and CTA */}
          <div className="footer-top">
            <div className="footer-brand">
              <div className="logo-container">
                <div className="logo-glow">
                  <span className="logo-text">Dream To Fly</span>
                  <div className="logo-pulse"></div>
                </div>
              </div>
              <p className="brand-tagline">
                Building the future with cutting-edge technology
              </p>
              <div className="cta-section">
                <Link href={"/contact"} >
                  <span className="cta-text" >Get Started</span>
                  <div className="cta-glow"></div>
                </Link>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="newsletter-section">
              <h3 className="section-title">Stay Connected</h3>
              <p className="newsletter-desc">
                Get the latest updates and exclusive content
              </p>
              <div className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="email-input"
                />
                <button className="subscribe-btn">
                  <span>Subscribe</span>
                  <div className="btn-glow"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="footer-links">
            {footerLinks.map((section, index) => (
              <div key={section.title} className="link-column">
                <h4 className="column-title">{section.title}</h4>
                <ul className="link-list">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="footer-link">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="social-section">
            <h4 className="social-title">Connect With Us</h4>
            <div className="social-links">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.href}
                  className="social-link"
                  aria-label={social.name}
                >
                  <span className="social-icon">{social.icon}</span>
                  <span className="social-name">{social.name}</span>
                  <div className="social-glow"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="footer-bottom">
            <div className="footer-divider"></div>
            <div className="bottom-content">
             
            <div className="mt-8 border-t border-white/10 pt-6 flex flex-col md:flex-row md:items-center md:justify-between md:gap-x-12">
  {/* Left side copyright */}
  <p className="text-sm text-gray-400 md:text-left text-center mb-4 md:mb-0">
    © 2025 Dream To Fly. All rights reserved.
  </p>

  {/* Center contact info */}
  <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
    {/* Email */}
    <span className="flex items-center space-x-2">
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
      </svg>
      <span>hello@dreamtofly.com</span>
    </span>

    {/* Location */}
    <span className="flex items-center space-x-2">
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
      </svg>
      <span>Mumbai, Delhi, Bangalore, Pune</span>
    </span>

    {/* Support */}
    <span className="flex items-center space-x-2">
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
      </svg>
      <span>24/7 Support Available</span>
    </span>
  </div>
</div>

              <div className="bottom-links">
                <Link href="/status" className="status-link">
                  <div className="status-indicator"></div>
                  System Status
                </Link>
                <span className="version-tag">v2.0.1</span>
              </div>
              
            </div>
          </div>
        </div>

        {/* Scanning Line Effect */}
        <div className="scanning-line"></div>
      </footer>

      <style jsx>{`
        .futuristic-footer {
          position: relative;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
          color: #ffffff;
          overflow: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          border-top: 2px solid transparent;
          border-image: linear-gradient(90deg, 
            transparent 0%, 
            #00d4ff 25%, 
            #ff00d4 50%, 
            #00d4ff 75%, 
            transparent 100%
          ) 1;
        }

        /* Background Elements */
        .footer-bg-elements {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 0;
        }

        .grid-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridPulse 4s ease-in-out infinite;
        }

        .floating-particles {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, #00d4ff 0%, transparent 70%);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }

        .particle-0 { 
          left: 10%; 
          animation-delay: 0s;
          box-shadow: 0 0 10px #00d4ff;
        }
        .particle-1 { 
          left: 30%; 
          animation-delay: 1.5s;
          box-shadow: 0 0 10px #ff00d4;
        }
        .particle-2 { 
          left: 60%; 
          animation-delay: 3s;
          box-shadow: 0 0 10px #00ff88;
        }
        .particle-3 { 
          left: 80%; 
          animation-delay: 4.5s;
          box-shadow: 0 0 10px #ffaa00;
        }

        .mouse-glow {
          position: fixed;
          top: var(--mouse-y, 0);
          left: var(--mouse-x, 0);
          width: 200px;
          height: 200px;
          background: radial-gradient(
            circle,
            rgba(0, 212, 255, 0.15) 0%,
            rgba(255, 0, 212, 0.1) 50%,
            transparent 70%
          );
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 1;
          transition: opacity 0.3s ease;
        }

        /* Main Container */
        .footer-container {
          position: relative;
          z-index: 2;
          max-width: 1400px;
          margin: 0 auto;
          padding: 80px 40px 40px;
        }

        /* Top Section */
        .footer-top {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          margin-bottom: 80px;
          align-items: start;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .logo-container {
          position: relative;
        }

        .logo-glow {
          position: relative;
          display: inline-block;
        }

        .logo-text {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(45deg, #00d4ff, #ff00d4, #00ff88);
          background-size: 200% 200%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.5));
          animation: gradientShift 3s ease-in-out infinite;
        }

        .logo-pulse {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 120%;
          height: 120%;
          background: radial-gradient(
            circle,
            rgba(0, 212, 255, 0.2) 0%,
            transparent 70%
          );
          transform: translate(-50%, -50%);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        .brand-tagline {
          font-size: 1.1rem;
          color: #a0aec0;
          line-height: 1.6;
          max-width: 400px;
        }

        .cta-section {
          margin-top: 16px;
        }

        .neon-cta {
          position: relative;
          background: transparent;
          border: 2px solid #00d4ff;
          color: #ffffff;
          padding: 16px 32px;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .neon-cta:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 0 20px rgba(0, 212, 255, 0.4),
            0 10px 40px rgba(0, 212, 255, 0.2);
        }

        .cta-text {
          position: relative;
          z-index: 2;
        }

        .cta-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(0, 212, 255, 0.4) 50%,
            transparent 100%
          );
          transition: left 0.5s ease;
        }

        .neon-cta:hover .cta-glow {
          left: 100%;
        }

        /* Newsletter Section */
        .newsletter-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
        }

        .newsletter-desc {
          color: #a0aec0;
          margin-bottom: 8px;
        }

        .newsletter-form {
          display: flex;
          gap: 12px;
          margin-top: 16px;
        }

        .email-input {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(0, 212, 255, 0.3);
          color: #ffffff;
          padding: 14px 16px;
          border-radius: 6px;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        .email-input:focus {
          outline: none;
          border-color: #00d4ff;
          box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1);
          background: rgba(255, 255, 255, 0.08);
        }

        .email-input::placeholder {
          color: #6b7280;
        }

        .subscribe-btn {
          position: relative;
          background: linear-gradient(45deg, #00d4ff, #0ea5e9);
          border: none;
          color: #ffffff;
          padding: 14px 24px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .subscribe-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 15px rgba(0, 212, 255, 0.4);
        }

        .btn-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 100%
          );
          transition: left 0.5s ease;
        }

        .subscribe-btn:hover .btn-glow {
          left: 100%;
        }

        /* Links Section */
        .footer-links {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 60px;
          margin-bottom: 60px;
          padding-top: 40px;
          border-top: 1px solid rgba(0, 212, 255, 0.2);
        }

        .link-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .column-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #ffffff;
          text-shadow: 0 0 5px rgba(0, 212, 255, 0.3);
          margin-bottom: 4px;
        }

        .link-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-link {
          color: #a0aec0;
          text-decoration: none;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          position: relative;
        }

        .footer-link:hover {
          color: #00d4ff;
          text-shadow: 0 0 8px rgba(0, 212, 255, 0.6);
          transform: translateX(4px);
        }

        .footer-link::before {
          content: '';
          position: absolute;
          left: -16px;
          top: 50%;
          width: 8px;
          height: 1px;
          background: #00d4ff;
          transform: translateY(-50%) scaleX(0);
          transition: transform 0.3s ease;
        }

        .footer-link:hover::before {
          transform: translateY(-50%) scaleX(1);
        }

        /* Social Section */
        .social-section {
          margin-bottom: 60px;
        }

        .social-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 24px;
          text-shadow: 0 0 5px rgba(0, 212, 255, 0.3);
        }

        .social-links {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }

        .social-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(0, 212, 255, 0.2);
          color: #a0aec0;
          text-decoration: none;
          padding: 12px 20px;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .social-link:hover {
          color: #ffffff;
          border-color: #00d4ff;
          background: rgba(0, 212, 255, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 0 15px rgba(0, 212, 255, 0.3);
        }

        .social-icon {
          font-size: 1.1rem;
        }

        .social-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(0, 212, 255, 0.2) 50%,
            transparent 100%
          );
          transition: left 0.5s ease;
        }

        .social-link:hover .social-glow {
          left: 100%;
        }

        /* Bottom Section */
        .footer-bottom {
          border-top: 1px solid rgba(0, 212, 255, 0.2);
          padding-top: 40px;
        }

        .footer-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            #00d4ff 50%,
            transparent 100%
          );
          margin-bottom: 40px;
          animation: dividerGlow 3s ease-in-out infinite;
        }

        .bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .copyright {
          color: #6b7280;
          font-size: 0.9rem;
        }

        .bottom-links {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .status-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #a0aec0;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }

        .status-link:hover {
          color: #00ff88;
        }

        .status-indicator {
          width: 8px;
          height: 8px;
          background: #00ff88;
          border-radius: 50%;
          animation: statusPulse 2s ease-in-out infinite;
          box-shadow: 0 0 6px #00ff88;
        }

        .version-tag {
          background: rgba(0, 212, 255, 0.1);
          border: 1px solid rgba(0, 212, 255, 0.3);
          color: #00d4ff;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        /* Scanning Line Effect */
        .scanning-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            #00d4ff 50%,
            transparent 100%
          );
          animation: scan 4s linear infinite;
        }

        /* Animations */
        @keyframes gridPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0) rotate(0deg); 
            opacity: 0.7;
          }
          25% { 
            transform: translateY(-20px) rotate(90deg); 
            opacity: 1;
          }
          50% { 
            transform: translateY(-10px) rotate(180deg); 
            opacity: 0.8;
          }
          75% { 
            transform: translateY(-30px) rotate(270deg); 
            opacity: 1;
          }
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes pulse {
          0%, 100% { 
            opacity: 0.4; 
            transform: translate(-50%, -50%) scale(1);
          }
          50% { 
            opacity: 0.8; 
            transform: translate(-50%, -50%) scale(1.1);
          }
        }

        @keyframes dividerGlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        @keyframes statusPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .footer-container {
            padding: 60px 30px 30px;
          }
          
          .footer-top {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .footer-links {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .footer-container {
            padding: 40px 20px 20px;
          }
          
          .logo-text {
            font-size: 2.2rem;
          }
          
          .footer-links {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          
          .newsletter-form {
            flex-direction: column;
          }
          
          .social-links {
            justify-content: center;
          }
          
          .bottom-content {
            flex-direction: column;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .footer-top {
            gap: 30px;
          }
          
          .newsletter-section {
            text-align: center;
          }
          
          .social-links {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;
