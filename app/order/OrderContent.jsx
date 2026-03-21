'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const PACKAGES = [
  { value: 'starter', label: 'Starter Website', price: '₹4,999', color: '#6366f1' },
  { value: 'business', label: 'Business Pro', price: '₹14,999', color: '#8b5cf6' },
  { value: 'ecommerce', label: 'E-Commerce Store', price: '₹29,999', color: '#ec4899' },
  { value: 'custom', label: 'Custom Web App', price: '₹29,999+', color: '#f59e0b' },
];

export default function ContactPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isOrderRequest, setIsOrderRequest] = useState(false);
  const [step, setStep] = useState(1); // 1 = form, 2 = review
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', selectedPackage: '', message: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setIsClient(true);
    if (searchParams.get('orderRequest') === 'true') setIsOrderRequest(true);
  }, [searchParams]);

  const validate = (data) => {
    const errs = {};
    if (!data.name.trim()) errs.name = 'Full name is required';
    if (!data.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = 'Invalid email address';
    if (!data.phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^[\+]?[1-9][\d]{8,14}$/.test(data.phone.replace(/[\s\-\(\)]/g, '')))
      errs.phone = 'Invalid phone number';
    if (!data.selectedPackage) errs.selectedPackage = 'Please select a package';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (touched[name]) {
      const errs = validate({ ...formData, [name]: value });
      setErrors(p => ({ ...p, [name]: errs[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(p => ({ ...p, [name]: true }));
    const errs = validate(formData);
    setErrors(p => ({ ...p, [name]: errs[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(formData);
    setErrors(errs);
    setTouched({ name: true, email: true, phone: true, selectedPackage: true });
    if (Object.keys(errs).length > 0) return;

    // Save form data and go to payment
    sessionStorage.setItem('orderData', JSON.stringify(formData));
    router.push('/payment'); // ← new page, won't affect existing nav
  };

  const selectedPkg = PACKAGES.find(p => p.value === formData.selectedPackage);

  if (!isClient) return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#a78bfa' }}>Loading...</div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

       .order-root * {
  box-sizing: border-box;
}

.order-root {
  background: #0a0a0f;
}

        .order-root {
          min-height: 100vh;
          background: #0a0a0f;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          position: relative;
          overflow: hidden;
        }

        .order-root::before {
          content: '';
          position: fixed;
          top: -200px; left: -200px;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%);
          pointer-events: none;
          animation: pulse-bg 6s ease-in-out infinite;
        }

        .order-root::after {
          content: '';
          position: fixed;
          bottom: -200px; right: -200px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%);
          pointer-events: none;
          animation: pulse-bg 8s ease-in-out infinite reverse;
        }

        @keyframes pulse-bg {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
        }

        .card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          width: 100%;
          max-width: 560px;
          backdrop-filter: blur(20px);
          position: relative;
          z-index: 1;
          animation: slideUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .card-header {
          padding: 40px 40px 30px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(139,92,246,0.15);
          border: 1px solid rgba(139,92,246,0.3);
          color: #a78bfa;
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.5px;
          margin-bottom: 20px;
        }

        .badge-dot {
          width: 6px; height: 6px;
          background: #a78bfa;
          border-radius: 50%;
          animation: blink 1.5s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        h1 {
          font-family: 'Syne', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: #fff;
          line-height: 1.1;
          margin-bottom: 10px;
        }

        h1 span {
          background: linear-gradient(135deg, #a78bfa, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtitle {
          color: rgba(255,255,255,0.4);
          font-size: 15px;
          font-weight: 300;
        }

        .form-body { padding: 36px 40px 40px; }

        .form-group { margin-bottom: 22px; }

        label {
          display: block;
          color: rgba(255,255,255,0.6);
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.3px;
          margin-bottom: 8px;
        }

        .req { color: #ec4899; }

        input, select, textarea {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 14px 18px;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          transition: all 0.25s;
          outline: none;
          appearance: none;
        }

        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }

        input:focus, select:focus, textarea:focus {
          border-color: rgba(167,139,250,0.5);
          background: rgba(167,139,250,0.07);
          box-shadow: 0 0 0 3px rgba(167,139,250,0.1);
        }

        input.err, select.err { border-color: rgba(248,113,113,0.5); }

        .error-msg {
          color: #f87171;
          font-size: 12px;
          margin-top: 6px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        select option { background: #1a1a2e; color: #fff; }

        textarea { resize: vertical; min-height: 90px; }

        .pkg-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .pkg-card {
          border: 1.5px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 14px;
          cursor: pointer;
          transition: all 0.2s;
          background: rgba(255,255,255,0.03);
        }

        .pkg-card:hover {
          border-color: rgba(167,139,250,0.3);
          background: rgba(167,139,250,0.05);
        }

        .pkg-card.selected {
          border-color: rgba(167,139,250,0.6);
          background: rgba(167,139,250,0.1);
        }

        .pkg-name {
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 4px;
        }

        .pkg-price {
          font-size: 12px;
          color: #a78bfa;
          font-weight: 500;
        }

        .pkg-check {
          width: 18px; height: 18px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.2);
          margin-bottom: 8px;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
        }

        .pkg-card.selected .pkg-check {
          background: #a78bfa;
          border-color: #a78bfa;
        }

        .submit-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          color: #fff;
          border: none;
          border-radius: 12px;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 8px;
          position: relative;
          overflow: hidden;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
          opacity: 0;
          transition: opacity 0.2s;
        }

        .submit-btn:hover::before { opacity: 1; }
        .submit-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 30px rgba(124,58,237,0.4); }
        .submit-btn:active { transform: translateY(0); }

        .pkg-err {
          color: #f87171;
          font-size: 12px;
          margin-top: 8px;
        }

        .divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 24px 0;
        }

        .selected-preview {
          background: rgba(167,139,250,0.08);
          border: 1px solid rgba(167,139,250,0.2);
          border-radius: 12px;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 12px;
        }

        .sel-pkg-name { color: #fff; font-weight: 500; font-size: 14px; }
        .sel-pkg-price { color: #a78bfa; font-weight: 700; font-size: 15px; font-family: 'Syne', sans-serif; }
      `}</style>

      <div className="order-root">
        <div className="card">
          <div className="card-header">
            <div className="badge">
              <div className="badge-dot" />
              {isOrderRequest ? 'New Order' : 'Your Order'}
            </div>
            <h1>
              {isOrderRequest ? <>Start Your <span>Project</span></> : <>Order <span>Now</span></>}
            </h1>
            <p className="subtitle">
              {isOrderRequest
                ? 'Fill in your details and choose a package to proceed to payment'
                : 'Tell us about your project and we\'ll get back to you'}
            </p>
          </div>

          <div className="form-body">
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label>Full Name <span className="req">*</span></label>
                <input
                  type="text" name="name" value={formData.name}
                  onChange={handleChange} onBlur={handleBlur}
                  placeholder="John Doe"
                  className={errors.name && touched.name ? 'err' : ''}
                />
                {errors.name && touched.name && <div className="error-msg">⚠ {errors.name}</div>}
              </div>

              <div className="form-group">
                <label>Email Address <span className="req">*</span></label>
                <input
                  type="email" name="email" value={formData.email}
                  onChange={handleChange} onBlur={handleBlur}
                  placeholder="you@example.com"
                  className={errors.email && touched.email ? 'err' : ''}
                />
                {errors.email && touched.email && <div className="error-msg">⚠ {errors.email}</div>}
              </div>

              <div className="form-group">
                <label>Phone Number <span className="req">*</span></label>
                <input
                  type="tel" name="phone" value={formData.phone}
                  onChange={handleChange} onBlur={handleBlur}
                  placeholder="+91 9876543210"
                  className={errors.phone && touched.phone ? 'err' : ''}
                />
                {errors.phone && touched.phone && <div className="error-msg">⚠ {errors.phone}</div>}
              </div>

              <div className="form-group">
                <label>Select Package <span className="req">*</span></label>
                <div className="pkg-grid">
                  {PACKAGES.map(pkg => (
                    <div
                      key={pkg.value}
                      className={`pkg-card ${formData.selectedPackage === pkg.value ? 'selected' : ''}`}
                      onClick={() => {
                        setFormData(p => ({ ...p, selectedPackage: pkg.value }));
                        setTouched(p => ({ ...p, selectedPackage: true }));
                        setErrors(p => ({ ...p, selectedPackage: undefined }));
                      }}
                    >
                      <div className="pkg-check">
                        {formData.selectedPackage === pkg.value && <span style={{ color: '#fff', fontSize: 10 }}>✓</span>}
                      </div>
                      <div className="pkg-name">{pkg.label}</div>
                      <div className="pkg-price">{pkg.price}</div>
                    </div>
                  ))}
                </div>
                {errors.selectedPackage && touched.selectedPackage && (
                  <div className="pkg-err">⚠ {errors.selectedPackage}</div>
                )}
                {selectedPkg && (
                  <div className="selected-preview">
                    <span className="sel-pkg-name">✓ {selectedPkg.label}</span>
                    <span className="sel-pkg-price">{selectedPkg.price}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Message (Optional)</label>
                <textarea
                  name="message" value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your project..."
                />
              </div>

              <button type="submit" className="submit-btn">
                Continue to Payment →
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}