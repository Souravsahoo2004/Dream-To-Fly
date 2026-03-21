'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const PACKAGES = {
  starter:   { label: 'Starter Website',   price: '₹49,999',   amount: 49999 },
  business:  { label: 'Business Pro',       price: '₹99,999',   amount: 99999 },
  ecommerce: { label: 'E-Commerce Store',   price: '₹1,99,999', amount: 199999 },
  custom:    { label: 'Custom Web App',      price: '₹3,99,999+',amount: 399999 },
};

const BANKS = ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank', 'Bank of Baroda', 'Canara Bank'];

export default function PaymentPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState(null);
  const [method, setMethod] = useState('upi'); // 'upi' | 'netbanking' | 'card'
  const [isProcessing, setIsProcessing] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const data = sessionStorage.getItem('orderData');
    if (!data) { router.push('/contact'); return; }
    setOrderData(JSON.parse(data));
  }, []);

  const pkg = orderData ? PACKAGES[orderData.selectedPackage] : null;

  const formatCard = (val) => val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (val) => {
    const v = val.replace(/\D/g, '').slice(0, 4);
    return v.length >= 3 ? `${v.slice(0, 2)}/${v.slice(2)}` : v;
  };

  const validatePayment = () => {
    const errs = {};
    if (method === 'upi') {
      if (!upiId.trim()) errs.upiId = 'UPI ID is required';
      else if (!/^[\w.\-_]{2,256}@[a-zA-Z]{2,64}$/.test(upiId)) errs.upiId = 'Invalid UPI ID format (e.g. name@upi)';
    }
    if (method === 'netbanking') {
      if (!selectedBank) errs.bank = 'Please select a bank';
    }
    if (method === 'card') {
      if (!card.number || card.number.replace(/\s/g, '').length < 16) errs.cardNumber = 'Invalid card number';
      if (!card.name.trim()) errs.cardName = 'Cardholder name required';
      if (!card.expiry || card.expiry.length < 5) errs.expiry = 'Invalid expiry';
      if (!card.cvv || card.cvv.length < 3) errs.cvv = 'Invalid CVV';
    }
    return errs;
  };

  const handlePay = async () => {
    const errs = validatePayment();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setIsProcessing(true);

    try {
      const payload = {
        orderData,
        paymentMethod: method,
        paymentDetails: method === 'upi' ? { upiId }
          : method === 'netbanking' ? { bank: selectedBank }
          : { lastFour: card.number.replace(/\s/g, '').slice(-4) },
        amount: pkg?.amount,
        packageLabel: pkg?.label,
      };

      const res = await fetch('/api/send-order-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Payment or email failed');

      sessionStorage.setItem('orderSuccess', 'true');
      sessionStorage.setItem('orderPayload', JSON.stringify(payload));
      router.push('/order-success');
    } catch (err) {
      alert('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle page close / navigation away → send abandoned email
  useEffect(() => {
    const handleBeforeUnload = async (e) => {
      if (!sessionStorage.getItem('orderSuccess') && orderData) {
        // Fire-and-forget beacon
        navigator.sendBeacon('/api/send-abandoned-email', JSON.stringify({ orderData }));
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [orderData]);

  if (!orderData) return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a78bfa' }}>
      Loading...
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');
        .order-root * {
  box-sizing: border-box;
}

.order-root {
  background: #0a0a0f;
}

        .pay-root {
          min-height: 100vh;
          background: #0a0a0f;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 40px 20px;
          gap: 24px;
          position: relative;
        }

        .pay-root::before {
          content: '';
          position: fixed;
          top: -100px; right: -100px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Order Summary */
        .summary-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 28px;
          width: 280px;
          flex-shrink: 0;
          animation: fadeIn 0.5s ease forwards;
          position: sticky;
          top: 40px;
          align-self: flex-start;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .summary-label {
          font-size: 11px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 20px;
          font-weight: 500;
        }

        .customer-name {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 4px;
        }

        .customer-email { color: rgba(255,255,255,0.4); font-size: 13px; margin-bottom: 24px; }

        .pkg-badge {
          background: rgba(139,92,246,0.15);
          border: 1px solid rgba(139,92,246,0.25);
          border-radius: 10px;
          padding: 14px;
          margin-bottom: 16px;
        }

        .pkg-badge-label { color: rgba(255,255,255,0.5); font-size: 11px; letter-spacing: 0.5px; margin-bottom: 4px; }
        .pkg-badge-name { color: #fff; font-weight: 600; font-size: 15px; }
        .pkg-badge-price {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 800;
          background: linear-gradient(135deg, #a78bfa, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-top: 6px;
        }

        .divider-line { height: 1px; background: rgba(255,255,255,0.06); margin: 16px 0; }

        .tax-row { display: flex; justify-content: space-between; font-size: 13px; color: rgba(255,255,255,0.4); margin-bottom: 8px; }
        .total-row { display: flex; justify-content: space-between; font-size: 15px; color: #fff; font-weight: 600; }

        .secure-badge {
          display: flex; align-items: center; gap: 8px;
          margin-top: 20px;
          padding: 10px 14px;
          background: rgba(34,197,94,0.08);
          border: 1px solid rgba(34,197,94,0.15);
          border-radius: 8px;
          font-size: 12px;
          color: rgba(34,197,94,0.8);
        }

        /* Payment Card */
        .payment-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          width: 100%;
          max-width: 480px;
          animation: slideUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
          overflow: hidden;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .pay-header { padding: 30px 32px 24px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .pay-title {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 6px;
        }
        .pay-sub { color: rgba(255,255,255,0.35); font-size: 14px; }

        /* Method Tabs */
        .method-tabs {
          display: flex;
          gap: 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .method-tab {
          flex: 1;
          padding: 18px 12px;
          text-align: center;
          cursor: pointer;
          border: none;
          background: transparent;
          color: rgba(255,255,255,0.35);
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.2s;
          border-bottom: 2px solid transparent;
          position: relative;
        }

        .method-tab:hover { color: rgba(255,255,255,0.6); }

        .method-tab.active {
          color: #a78bfa;
          border-bottom-color: #a78bfa;
          background: rgba(167,139,250,0.04);
        }

        .tab-icon { font-size: 18px; display: block; margin-bottom: 4px; }

        /* Payment Body */
        .pay-body { padding: 28px 32px 32px; }

        .form-group { margin-bottom: 20px; }

        label {
          display: block;
          color: rgba(255,255,255,0.5);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        input, select {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 14px 16px;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          outline: none;
          transition: all 0.2s;
          appearance: none;
        }

        input::placeholder { color: rgba(255,255,255,0.2); }
        input:focus, select:focus {
          border-color: rgba(167,139,250,0.4);
          background: rgba(167,139,250,0.06);
          box-shadow: 0 0 0 3px rgba(167,139,250,0.08);
        }

        input.err { border-color: rgba(248,113,113,0.4); }

        .err-msg {
          color: #f87171; font-size: 12px; margin-top: 5px;
        }

        .card-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

        select option { background: #1a1a2e; }

        .bank-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .bank-opt {
          border: 1.5px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 12px;
          cursor: pointer;
          transition: all 0.2s;
          color: rgba(255,255,255,0.6);
          font-size: 13px;
          text-align: center;
          background: transparent;
        }

        .bank-opt:hover { border-color: rgba(167,139,250,0.3); color: #fff; }
        .bank-opt.selected { border-color: #a78bfa; background: rgba(167,139,250,0.1); color: #fff; }

        .upi-apps {
          display: flex; gap: 10px; margin-bottom: 16px;
        }

        .upi-app {
          flex: 1; padding: 10px; border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.08);
          background: transparent;
          color: rgba(255,255,255,0.5);
          font-size: 12px; text-align: center;
          cursor: pointer; transition: all 0.2s;
        }

        .upi-app:hover { border-color: rgba(167,139,250,0.3); color: #fff; }
        .upi-app-icon { font-size: 20px; display: block; margin-bottom: 4px; }

        .pay-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          color: #fff;
          border: none;
          border-radius: 12px;
          font-family: 'Syne', sans-serif;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 8px;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }

        .pay-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 40px rgba(124,58,237,0.4);
        }

        .pay-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .back-btn {
          background: none; border: none;
          color: rgba(255,255,255,0.3);
          font-size: 13px; cursor: pointer;
          margin-top: 16px; width: 100%;
          padding: 8px; transition: color 0.2s;
        }

        .back-btn:hover { color: rgba(255,255,255,0.6); }

        @media (max-width: 768px) {
          .pay-root { flex-direction: column; align-items: center; }
          .summary-card { width: 100%; max-width: 480px; position: static; }
        }
      `}</style>

      <div className="pay-root">
        {/* Order Summary Sidebar */}
        <div className="summary-card">
          <div className="summary-label">Order Summary</div>
          <div className="customer-name">{orderData.name}</div>
          <div className="customer-email">{orderData.email}</div>
          <div className="pkg-badge">
            <div className="pkg-badge-label">Selected Package</div>
            <div className="pkg-badge-name">{pkg?.label}</div>
            <div className="pkg-badge-price">{pkg?.price}</div>
          </div>
          <div className="divider-line" />
          <div className="tax-row"><span>Subtotal</span><span>{pkg?.price}</span></div>
          <div className="tax-row"><span>GST (18%)</span><span>Included</span></div>
          <div className="divider-line" />
          <div className="total-row"><span>Total Amount</span><span>{pkg?.price}</span></div>
          <div className="secure-badge">
            <span>🔒</span>
            <span>256-bit SSL Encrypted & Secure</span>
          </div>
        </div>

        {/* Payment Form */}
        <div className="payment-card">
          <div className="pay-header">
            <div className="pay-title">Complete Payment</div>
            <div className="pay-sub">Your order will be confirmed after successful payment</div>
          </div>

          {/* Method Tabs */}
          <div className="method-tabs">
            {[
              { id: 'upi', label: 'UPI', icon: '📱' },
              { id: 'netbanking', label: 'Net Banking', icon: '🏦' },
              { id: 'card', label: 'Card', icon: '💳' },
            ].map(m => (
              <button
                key={m.id}
                className={`method-tab ${method === m.id ? 'active' : ''}`}
                onClick={() => { setMethod(m.id); setErrors({}); }}
              >
                <span className="tab-icon">{m.icon}</span>
                {m.label}
              </button>
            ))}
          </div>

          <div className="pay-body">

            {/* UPI */}
            {method === 'upi' && (
              <>
                <div className="upi-apps">
                  {[{ icon: '🟣', name: 'PhonePe' }, { icon: '🔵', name: 'GPay' }, { icon: '🔴', name: 'Paytm' }, { icon: '🟠', name: 'BHIM' }].map(app => (
                    <button key={app.name} className="upi-app">
                      <span className="upi-app-icon">{app.icon}</span>
                      {app.name}
                    </button>
                  ))}
                </div>
                <div className="form-group">
                  <label>UPI ID</label>
                  <input
                    type="text"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={e => { setUpiId(e.target.value); setErrors(p => ({ ...p, upiId: '' })); }}
                    className={errors.upiId ? 'err' : ''}
                  />
                  {errors.upiId && <div className="err-msg">⚠ {errors.upiId}</div>}
                </div>
              </>
            )}

            {/* Net Banking */}
            {method === 'netbanking' && (
              <div className="form-group">
                <label>Select Your Bank</label>
                <div className="bank-grid">
                  {BANKS.map(bank => (
                    <div
                      key={bank}
                      className={`bank-opt ${selectedBank === bank ? 'selected' : ''}`}
                      onClick={() => { setSelectedBank(bank); setErrors(p => ({ ...p, bank: '' })); }}
                    >
                      {bank}
                    </div>
                  ))}
                </div>
                {errors.bank && <div className="err-msg" style={{ marginTop: 10 }}>⚠ {errors.bank}</div>}
              </div>
            )}

            {/* Card */}
            {method === 'card' && (
              <>
                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={card.number}
                    onChange={e => { setCard(p => ({ ...p, number: formatCard(e.target.value) })); setErrors(p => ({ ...p, cardNumber: '' })); }}
                    className={errors.cardNumber ? 'err' : ''}
                  />
                  {errors.cardNumber && <div className="err-msg">⚠ {errors.cardNumber}</div>}
                </div>
                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input
                    type="text"
                    placeholder="Name as on card"
                    value={card.name}
                    onChange={e => { setCard(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, cardName: '' })); }}
                    className={errors.cardName ? 'err' : ''}
                  />
                  {errors.cardName && <div className="err-msg">⚠ {errors.cardName}</div>}
                </div>
                <div className="card-row">
                  <div className="form-group">
                    <label>Expiry</label>
                    <input
                      type="text" placeholder="MM/YY"
                      value={card.expiry}
                      onChange={e => { setCard(p => ({ ...p, expiry: formatExpiry(e.target.value) })); setErrors(p => ({ ...p, expiry: '' })); }}
                      className={errors.expiry ? 'err' : ''}
                    />
                    {errors.expiry && <div className="err-msg">⚠ {errors.expiry}</div>}
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="password" placeholder="•••"
                      maxLength={4}
                      value={card.cvv}
                      onChange={e => { setCard(p => ({ ...p, cvv: e.target.value.replace(/\D/g, '') })); setErrors(p => ({ ...p, cvv: '' })); }}
                      className={errors.cvv ? 'err' : ''}
                    />
                    {errors.cvv && <div className="err-msg">⚠ {errors.cvv}</div>}
                  </div>
                </div>
              </>
            )}

            <button className="pay-btn" onClick={handlePay} disabled={isProcessing}>
              {isProcessing ? (
                <><div className="spinner" /> Processing Payment...</>
              ) : (
                <>🔒 Pay {pkg?.price}</>
              )}
            </button>

            <button className="back-btn" onClick={() => router.push('/contact')}>
              ← Back to Order Form
            </button>
          </div>
        </div>
      </div>
    </>
  );
}