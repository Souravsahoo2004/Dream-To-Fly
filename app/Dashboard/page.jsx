'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function OrderDashboard() {
  const router = useRouter()
  const [orderSubmitted, setOrderSubmitted] = useState(false)
  const [currentStatus, setCurrentStatus] = useState(0)

  // Order status progression
  const orderStatuses = [
    { id: 0, label: 'Pending to Accept', icon: '⏳', color: 'bg-yellow-500' },
    { id: 1, label: 'Order Processing', icon: '⚙️', color: 'bg-blue-500' },
    { id: 2, label: 'Order Analysing', icon: '🔍', color: 'bg-purple-500' },
    { id: 3, label: 'Order Granted', icon: '✅', color: 'bg-green-500' },
    { id: 4, label: 'Work in Progress', icon: '🚧', color: 'bg-orange-500' },
    { id: 5, label: 'Order Going to Finish', icon: '🏁', color: 'bg-indigo-500' },
    { id: 6, label: 'Order is Ready', icon: '📦', color: 'bg-emerald-500' },
    { id: 7, label: 'Order Delivered', icon: '🚚', color: 'bg-teal-500' }
  ]

  // Auto-progress through statuses after order is submitted
  useEffect(() => {
    if (orderSubmitted && currentStatus < orderStatuses.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStatus(prev => prev + 1)
      }, 2000) // Progress every 2 seconds for demo

      return () => clearTimeout(timer)
    }
  }, [orderSubmitted, currentStatus])

  // Check if order was submitted (you can get this from URL params, localStorage, or props)
  useEffect(() => {
    // Check URL parameters for order submission
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('orderSubmitted') === 'true') {
      setOrderSubmitted(true)
      setCurrentStatus(0)
      
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname)
    }

    // Or check localStorage
    const orderStatus = localStorage.getItem('orderSubmitted')
    if (orderStatus === 'true') {
      setOrderSubmitted(true)
      setCurrentStatus(parseInt(localStorage.getItem('currentStatus') || '0'))
    }
  }, [])

  // Save order status to localStorage whenever it changes
  useEffect(() => {
    if (orderSubmitted) {
      localStorage.setItem('orderSubmitted', 'true')
      localStorage.setItem('currentStatus', currentStatus.toString())
    }
  }, [orderSubmitted, currentStatus])

  const handlePlaceOrder = () => {
    // Redirect to contact page
    router.push('/contact?orderRequest=true')
  }

  const resetOrder = () => {
    setOrderSubmitted(false)
    setCurrentStatus(0)
    localStorage.removeItem('orderSubmitted')
    localStorage.removeItem('currentStatus')
  }

  // Demo function to simulate order submission (remove this in production)
  const simulateOrderSubmission = () => {
    setOrderSubmitted(true)
    setCurrentStatus(0)
  }

  const progressPercentage = orderSubmitted ? ((currentStatus + 1) / orderStatuses.length) * 100 : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 pt-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Order Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Track your order progress in real-time
          </p>
        </motion.header>

        {/* Main Dashboard */}
        <div className="grid gap-8">
          
          {/* Order Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Place Your Order
                </h2>
                <p className="text-gray-600">
                  Click below to start your order process
                </p>
              </div>
              <div className="text-4xl">📋</div>
            </div>

            {!orderSubmitted ? (
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handlePlaceOrder}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>📝</span>
                  <span>Place Order</span>
                </button>
                
                {/* Demo button - remove this in production */}
                <button
                  onClick={simulateOrderSubmission}
                  className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 text-sm"
                >
                  Demo: Simulate Order
                </button>
                
                <div className="flex items-center space-x-2 text-gray-500">
                  <span>💡</span>
                  <span className="text-sm">Redirects to contact page</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-600 font-medium">Order Active</span>
                  <span className="text-gray-500 text-sm">
                    (Step {currentStatus + 1} of {orderStatuses.length})
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handlePlaceOrder}
                    className="text-sm text-blue-600 hover:text-blue-800 px-4 py-2 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    New Order
                  </button>
                  <button
                    onClick={resetOrder}
                    className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Order Progress Section - Only visible after order submission */}
          <AnimatePresence>
            {orderSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 overflow-hidden"
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Order Progress
                    </h2>
                    <p className="text-gray-600">
                      Your order is being processed
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">
                      {Math.round(progressPercentage)}%
                    </div>
                    <div className="text-sm text-gray-500">Complete</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full"
                    ></motion.div>
                  </div>
                </div>

                {/* Status Steps */}
                <div className="space-y-4">
                  {orderStatuses.map((status, index) => (
                    <motion.div
                      key={status.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        scale: currentStatus === index ? 1.02 : 1
                      }}
                      transition={{ 
                        delay: index * 0.1,
                        scale: { duration: 0.3 }
                      }}
                      className={`flex items-center space-x-4 p-4 rounded-xl border transition-all duration-300 ${
                        index <= currentStatus
                          ? 'bg-gradient-to-r from-green-50 to-blue-50 border-green-200 shadow-sm'
                          : index === currentStatus + 1
                          ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-sm animate-pulse'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                        index <= currentStatus
                          ? status.color
                          : 'bg-gray-400'
                      }`}>
                        {index <= currentStatus ? status.icon : index + 1}
                      </div>
                      
                      <div className="flex-1">
                        <div className={`font-semibold ${
                          index <= currentStatus 
                            ? 'text-gray-900' 
                            : 'text-gray-500'
                        }`}>
                          {status.label}
                        </div>
                        <div className="text-sm text-gray-500">
                          {index < currentStatus ? 'Completed' :
                           index === currentStatus ? 'In Progress...' : 'Pending'}
                        </div>
                      </div>

                      {index <= currentStatus && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-green-500 text-xl"
                        >
                          ✓
                        </motion.div>
                      )}

                      {index === currentStatus && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="text-blue-500 text-xl"
                        >
                          ⟳
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Order Complete Message */}
                {currentStatus === orderStatuses.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 p-6 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 rounded-xl text-center"
                  >
                    <div className="text-4xl mb-3">🎉</div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">
                      Order Completed Successfully!
                    </h3>
                    <p className="text-green-700 mb-4">
                      Your order has been delivered. Thank you for choosing our service!
                    </p>
                    <button
                      onClick={handlePlaceOrder}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                    >
                      Place New Order
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats Section */}
          {orderSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="text-2xl mb-2">⏱️</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {currentStatus + 1}/{orderStatuses.length}
                </div>
                <div className="text-gray-600 text-sm">Steps Completed</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="text-2xl mb-2">📊</div>
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {Math.round(progressPercentage)}%
                </div>
                <div className="text-gray-600 text-sm">Progress</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="text-2xl mb-2">⏰</div>
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {currentStatus < orderStatuses.length - 1 ? 'Active' : 'Complete'}
                </div>
                <div className="text-gray-600 text-sm">Status</div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
