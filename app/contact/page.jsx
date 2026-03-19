'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const ContactPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isOrderRequest, setIsOrderRequest] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    selectedPackage: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ensure component only renders on client side
  useEffect(() => {
    setIsClient(true);
    
    // Check if this is an order request
    if (searchParams.get('orderRequest') === 'true') {
      setIsOrderRequest(true);
    }
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { name, email, phone, selectedPackage } = formData;

    if (!name || !email || !phone || !selectedPackage) {
      alert('Please fill in all required fields.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }

    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
      alert('Please enter a valid phone number.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Add your API call here
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     ...formData,
      //     isOrderRequest: isOrderRequest
      //   })
      // });

      setShowSuccess(true);

      // If this is an order request, set up order tracking
      if (isOrderRequest) {
        // Set order as submitted in localStorage
        localStorage.setItem('orderSubmitted', 'true');
        localStorage.setItem('currentStatus', '0');
        localStorage.setItem('orderData', JSON.stringify(formData));

        // Redirect to dashboard after showing success message briefly
        setTimeout(() => {
          router.push('/Dashboard'); // Update this path to match your dashboard route
        }, 2000);
      } else {
        // Normal contact form behavior
        setTimeout(() => {
          setShowSuccess(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            selectedPackage: ''
          });
        }, 5000);
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Don't render anything until client-side
  if (!isClient) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ color: 'white', fontSize: '18px' }}>Loading...</div>
      </div>
    );
  }

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    contactContainer: {
      background: 'white',
      borderRadius: '15px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      width: '100%',
      maxWidth: '500px'
    },
    contactHeader: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '30px',
      textAlign: 'center'
    },
    headerTitle: {
      fontSize: '28px',
      marginBottom: '10px',
      margin: '0'
    },
    headerSubtitle: {
      opacity: '0.9',
      fontSize: '16px',
      margin: '0'
    },
    orderAlert: {
      background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
      color: 'white',
      padding: '20px',
      textAlign: 'center',
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    },
    orderAlertTitle: {
      fontSize: '18px',
      fontWeight: '600',
      margin: '0 0 8px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    orderAlertText: {
      fontSize: '14px',
      opacity: '0.9',
      margin: '0'
    },
    contactForm: {
      padding: '40px'
    },
    formGroup: {
      marginBottom: '25px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '600',
      color: '#333',
      fontSize: '14px'
    },
    required: {
      color: '#e74c3c'
    },
    input: {
      width: '100%',
      padding: '15px',
      border: '2px solid #e1e5e9',
      borderRadius: '8px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      backgroundColor: '#f8f9fa',
      boxSizing: 'border-box'
    },
    submitBtn: {
      width: '100%',
      padding: '15px',
      background: isOrderRequest 
        ? 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)'
        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    submitBtnDisabled: {
      opacity: '0.7',
      cursor: 'not-allowed'
    },
    successMessage: {
      background: isOrderRequest ? '#d4edda' : '#d4edda',
      color: isOrderRequest ? '#155724' : '#155724',
      padding: '20px',
      borderRadius: '8px',
      textAlign: 'center',
      border: '1px solid #c3e6cb'
    },
    successTitle: {
      margin: '0 0 10px 0',
      fontSize: '18px'
    },
    successText: {
      margin: '0'
    },
    redirectMessage: {
      background: '#e3f2fd',
      color: '#1565c0',
      padding: '15px',
      borderRadius: '8px',
      textAlign: 'center',
      marginTop: '15px',
      border: '1px solid #bbdefb',
      fontSize: '14px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.contactContainer}>
        <div style={styles.contactHeader}>
          <h1 style={styles.headerTitle}>
            {isOrderRequest ? 'Place Your Order' : 'Contact Us'}
          </h1>
          <p style={styles.headerSubtitle}>
            {isOrderRequest 
              ? 'Fill out the form below to start your order process'
              : 'Get in touch for your next web project'
            }
          </p>
        </div>

        {/* Order Request Alert */}
        {isOrderRequest && (
          <div style={styles.orderAlert}>
            <h3 style={styles.orderAlertTitle}>
              <span>🚀</span>
              New Order Request
            </h3>
            <p style={styles.orderAlertText}>
              After submitting this form, you'll be redirected to track your order progress in real-time.
            </p>
          </div>
        )}

        <div style={styles.contactForm}>
          {!showSuccess ? (
            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label htmlFor="name" style={styles.label}>
                  Full Name <span style={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                  style={styles.input}
                  suppressHydrationWarning={true}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.label}>
                  Email Address <span style={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email address"
                  style={styles.input}
                  suppressHydrationWarning={true}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="phone" style={styles.label}>
                  Phone Number <span style={styles.required}>*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your phone number"
                  style={styles.input}
                  suppressHydrationWarning={true}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="selectedPackage" style={styles.label}>
                  {isOrderRequest ? 'Select Service Package' : 'Select Package'} <span style={styles.required}>*</span>
                </label>
                <select
                  id="selectedPackage"
                  name="selectedPackage"
                  value={formData.selectedPackage}
                  onChange={handleInputChange}
                  required
                  style={styles.input}
                  suppressHydrationWarning={true}
                >
                  <option value="">Select Package</option>
                  <option value="starter">Starter Website - ₹49,999</option>
                  <option value="business">Business Pro - ₹99,999</option>
                  <option value="ecommerce">E-Commerce Store - ₹1,99,999</option>
                  <option value="custom">Custom Web App - ₹3,99,999+</option>
                </select>
              </div>

              <button 
                type="submit" 
                style={{
                  ...styles.submitBtn,
                  ...(isSubmitting ? styles.submitBtnDisabled : {})
                }}
                disabled={isSubmitting}
                suppressHydrationWarning={true}
              >
                {isSubmitting 
                  ? (isOrderRequest ? 'Processing Order...' : 'Submitting...') 
                  : (isOrderRequest ? 'Start Order Process' : 'Submit Request')
                }
              </button>
            </form>
          ) : (
            <div style={styles.successMessage}>
              <h3 style={styles.successTitle}>
                {isOrderRequest ? '🎉 Order Request Submitted!' : '✅ Message Sent Successfully!'}
              </h3>
              <p style={styles.successText}>
                {isOrderRequest 
                  ? 'Your order has been received and processing will begin shortly.'
                  : 'Thank you for contacting us. Our team will reach you soon.'
                }
              </p>
              
              {isOrderRequest && (
                <div style={styles.redirectMessage}>
                  <strong>📊 Redirecting to Order Dashboard...</strong>
                  <br />
                  You'll be able to track your order progress in real-time.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
