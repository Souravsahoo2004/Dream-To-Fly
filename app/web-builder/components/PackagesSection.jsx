'use client'

const packages = [
  {
    id: 0,
    name: "Starter Website",
    subtitle: "Perfect for small businesses",
    description: "Professional business website with essential features to establish your online presence.",
    price: "₹4999",
    originalPrice: "₹6999",
    duration: "7-15 days",
    pages: "5-7 pages",
    features: [
      "Custom Responsive Design", "Mobile-Optimized Layout", "Contact Forms",
      "Google Maps Integration", "SEO Basic Setup", "SSL Certificate",
      "1 Month Free Support", "Social Media Integration"
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
    price: "₹14,999",
    originalPrice: "₹19,999",
    duration: "14-30 days",
    pages: "10-15 pages",
    features: [
      "Everything in Starter", "Content Management System", "Blog/News Section",
      "Advanced SEO Optimization", "Google Analytics Setup", "Payment Gateway Integration",
      "Admin Dashboard", "3 Months Free Support", "Performance Optimization", "Email Marketing Integration"
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
    price: "₹29,999",
    originalPrice: "₹35,999",
    duration: "21-45 days",
    pages: "20+ pages",
    features: [
      "Everything in Business Pro", "Product Catalog Management", "Shopping Cart & Checkout",
      "Multiple Payment Gateways", "Inventory Management", "Order Tracking System",
      "Customer Account Portal", "Discount & Coupon System", "Sales Analytics Dashboard", "6 Months Free Support"
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
    price: "₹50,000+",
    originalPrice: "Starting Price",
    duration: "30-60 days",
    pages: "Custom",
    features: [
      "Custom Application Development", "Database Architecture Design", "API Development & Integration",
      "User Management System", "Advanced Admin Panel", "Third-party Integrations",
      "Cloud Infrastructure Setup", "Security Implementation", "Performance Optimization", "12 Months Free Support"
    ],
    popular: false,
    icon: "⚡",
    color: "from-orange-500 to-red-500"
  }
]

const comparisonData = [
  { feature: "Custom Design", starter: true, business: true, ecommerce: true, custom: true },
  { feature: "Mobile Responsive", starter: true, business: true, ecommerce: true, custom: true },
  { feature: "SEO Optimization", starter: "Basic", business: "Advanced", ecommerce: "Advanced", custom: "Enterprise" },
  { feature: "Content Management", starter: false, business: true, ecommerce: true, custom: true },
  { feature: "E-commerce Features", starter: false, business: false, ecommerce: true, custom: true },
  { feature: "Custom Functionality", starter: false, business: "Limited", ecommerce: "Advanced", custom: "Unlimited" },
  { feature: "Free Support Period", starter: "1 Month", business: "3 Months", ecommerce: "6 Months", custom: "12 Months" }
]

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

function CrossIcon() {
  return (
    <svg className="w-5 h-5 text-red-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  )
}

function CellValue({ value, highlight }) {
  if (typeof value === 'boolean') {
    return value ? <CheckIcon /> : <CrossIcon />
  }
  return <span className={highlight ? "text-purple-600 font-semibold" : "text-gray-600"}>{value}</span>
}

export default function PackagesSection({ activePackage, setActivePackage }) {
  return (
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

                <button className={`w-full py-4 bg-gradient-to-r ${pkg.color} hover:shadow-xl text-white font-bold rounded-2xl transition-all duration-300 transform group-hover:scale-105 ${pkg.popular ? 'shadow-lg shadow-purple-500/25' : ''}`}>
                  {pkg.id === 3 ? 'Get Custom Quote' : 'Start This Project'}
                </button>

                {pkg.popular && (
                  <div className="mt-4 text-center text-sm text-purple-600 font-semibold">
                    🔥 Save ₹5000 - Limited Time Offer!
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
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
                      <td className="px-6 py-4 text-center text-sm"><CellValue value={row.starter} /></td>
                      <td className="px-6 py-4 text-center text-sm bg-purple-50"><CellValue value={row.business} highlight /></td>
                      <td className="px-6 py-4 text-center text-sm"><CellValue value={row.ecommerce} /></td>
                      <td className="px-6 py-4 text-center text-sm"><CellValue value={row.custom} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}