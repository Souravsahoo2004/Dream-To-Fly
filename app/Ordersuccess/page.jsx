'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function OrderSuccessPage() {
  const router = useRouter();
  const [payload, setPayload] = useState(null);
  const [count, setCount] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const success = sessionStorage.getItem('orderSuccess');
    if (!success) {
  setTimeout(() => {
    router.push('/contact');
  }, 100000); // 3 sec delay
}
    const data = sessionStorage.getItem('orderPayload');
    if (data) setPayload(JSON.parse(data));

    // Trigger confetti
    setTimeout(() => launchConfetti(), 300);
  }, []);

  useEffect(() => {
    // Animate order number count up
    let start = 0;
    const end = 847203;
    const dur = 1500;
    const step = end / (dur / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); return; }
      setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, []);

  const launchConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: -20,
      w: Math.random() * 10 + 5,
      h: Math.random() * 6 + 3,
      color: ['#a78bfa', '#ec4899', '#34d399', '#fbbf24', '#60a5fa'][Math.floor(Math.random() * 5)],
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 3 + 2,
      angle: Math.random() * 360,
      spin: (Math.random() - 0.5) * 8,
      opacity: 1,
    }));

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.spin;
        p.opacity = Math.max(0, 1 - p.y / canvas.height);
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.angle * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      frame++;
      if (frame < 180) requestAnimationFrame(animate);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    animate();
  };

  const PACKAGES = {
    starter:   'Starter Website',
    business:  'Business Pro',
    ecommerce: 'E-Commerce Store',
    custom:    'Custom Web App',
  };

  const PRICES = {
    starter: '₹4,999', business: '₹14,999', ecommerce: '₹29,999', custom: '₹49,999+'
  };

  const METHOD_LABELS = { upi: '📱 UPI', netbanking: '🏦 Net Banking', card: '💳 Card' };

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

        canvas.confetti {
          position: fixed; inset: 0;
          pointer-events: none; z-index: 999;
        }

        .success-root {
          min-height: 100vh;
          background: #0a0a0f;
          font-family: 'DM Sans', sans-serif;
          display: flex; align-items: center; justify-content: center;
          padding: 40px 20px;
          position: relative;
        }

        .glow-1 {
          position: fixed; top: -200px; left: 50%; transform: translateX(-50%);
          width: 800px; height: 400px;
          background: radial-gradient(ellipse, rgba(52,211,153,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .glow-2 {
          position: fixed; bottom: -100px; left: -100px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 28px;
          width: 100%;
          max-width: 540px;
          overflow: hidden;
          position: relative;
          z-index: 1;
          animation: scaleIn 0.7s cubic-bezier(0.16,1,0.3,1) forwards;
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.92) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* Success Banner */
        .success-banner {
          background: linear-gradient(135deg, rgba(52,211,153,0.12), rgba(16,185,129,0.06));
          border-bottom: 1px solid rgba(52,211,153,0.15);
          padding: 50px 40px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .success-banner::before {
          content: '';
          position: absolute;
          top: 50%; left: 50%; transform: translate(-50%,-50%);
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(52,211,153,0.1) 0%, transparent 70%);
        }

        .check-ring {
          width: 90px; height: 90px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(52,211,153,0.2), rgba(16,185,129,0.1));
          border: 2px solid rgba(52,211,153,0.4);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 24px;
          font-size: 40px;
          position: relative;
          z-index: 1;
          animation: popIn 0.5s 0.3s cubic-bezier(0.16,1,0.3,1) both;
        }

        @keyframes popIn {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .success-title {
          font-family: 'Syne', sans-serif;
          font-size: 30px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 10px;
          position: relative; z-index: 1;
          animation: fadeUp 0.5s 0.4s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .success-sub {
          color: rgba(255,255,255,0.4);
          font-size: 15px;
          position: relative; z-index: 1;
          animation: fadeUp 0.5s 0.5s ease both;
          line-height: 1.5;
        }

        .email-note {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(52,211,153,0.1);
          border: 1px solid rgba(52,211,153,0.2);
          border-radius: 100px;
          padding: 8px 16px;
          color: #34d399;
          font-size: 13px;
          margin-top: 16px;
          position: relative; z-index: 1;
          animation: fadeUp 0.5s 0.6s ease both;
        }

        /* Order Details */
        .order-body { padding: 32px 40px 40px; }

        .order-number-box {
          background: rgba(167,139,250,0.07);
          border: 1px solid rgba(167,139,250,0.15);
          border-radius: 14px;
          padding: 18px 20px;
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 24px;
          animation: fadeUp 0.5s 0.7s ease both;
        }

        .on-label { color: rgba(255,255,255,0.35); font-size: 12px; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 4px; }
        .on-value { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: #a78bfa; letter-spacing: 1px; }
        .on-date { color: rgba(255,255,255,0.3); font-size: 13px; text-align: right; }

        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 24px;
        }

        .detail-item {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 14px 16px;
          animation: fadeUp 0.5s ease both;
        }

        .detail-item:nth-child(1) { animation-delay: 0.8s; }
        .detail-item:nth-child(2) { animation-delay: 0.85s; }
        .detail-item:nth-child(3) { animation-delay: 0.9s; }
        .detail-item:nth-child(4) { animation-delay: 0.95s; }

        .d-label { color: rgba(255,255,255,0.3); font-size: 11px; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 5px; }
        .d-value { color: #fff; font-size: 14px; font-weight: 500; }

        /* Progress Steps */
        .progress-section {
          margin-bottom: 28px;
          animation: fadeUp 0.5s 1s ease both;
        }

        .progress-title { color: rgba(255,255,255,0.4); font-size: 12px; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 16px; }

        .steps { display: flex; align-items: flex-start; gap: 0; }

        .step { flex: 1; display: flex; flex-direction: column; align-items: center; position: relative; }

        .step-line {
          position: absolute;
          top: 16px; left: calc(50% + 16px);
          right: calc(-50% + 16px);
          height: 2px;
        }

        .step-line.done { background: linear-gradient(90deg, #34d399, rgba(167,139,250,0.5)); }
        .step-line.pending { background: rgba(255,255,255,0.08); }

        .step-dot {
          width: 32px; height: 32px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px;
          margin-bottom: 8px;
          position: relative; z-index: 1;
        }

        .step-dot.done { background: rgba(52,211,153,0.2); border: 2px solid #34d399; }
        .step-dot.active { background: rgba(167,139,250,0.2); border: 2px solid #a78bfa; animation: pulse-dot 2s infinite; }
        .step-dot.pending { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); }

        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(167,139,250,0.3); }
          50% { box-shadow: 0 0 0 8px rgba(167,139,250,0); }
        }

        .step-label { color: rgba(255,255,255,0.4); font-size: 11px; text-align: center; }
        .step-label.active { color: #a78bfa; }
        .step-label.done { color: #34d399; }

        /* CTA Buttons */
        .cta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; animation: fadeUp 0.5s 1.1s ease both; }

        .cta-primary {
          padding: 14px;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          color: #fff; border: none; border-radius: 12px;
          font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700;
          cursor: pointer; transition: all 0.3s;
        }

        .cta-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(124,58,237,0.35); }

        .cta-secondary {
          padding: 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.6);
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif; font-size: 14px;
          cursor: pointer; transition: all 0.2s;
        }

        .cta-secondary:hover { color: #fff; border-color: rgba(255,255,255,0.2); }
      `}</style>

      <canvas ref={canvasRef} className="confetti" />

      <div className="success-root">
        <div className="glow-1" />
        <div className="glow-2" />

        <div className="card">
          {/* Success Banner */}
          <div className="success-banner">
            <div className="check-ring">✅</div>
            <h1 className="success-title">Order Confirmed! 🎉</h1>
            <p className="success-sub">
              Your order has been successfully placed and payment received.<br />
              Our team will reach out within 24 hours.
            </p>
            <div className="email-note">
              📧 Confirmation email sent to {payload?.orderData?.email || 'your inbox'}
            </div>
          </div>

          {/* Order Details */}
          <div className="order-body">
            {/* Order Number */}
            <div className="order-number-box">
              <div>
                <div className="on-label">Order Number</div>
                <div className="on-value">#{count.toLocaleString('en-IN')}</div>
              </div>
              <div className="on-date">
                {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
            </div>

            {/* Details Grid */}
            <div className="details-grid">
              <div className="detail-item">
                <div className="d-label">Customer</div>
                <div className="d-value">{payload?.orderData?.name || '—'}</div>
              </div>
              <div className="detail-item">
                <div className="d-label">Package</div>
                <div className="d-value">{payload?.packageLabel || '—'}</div>
              </div>
              <div className="detail-item">
                <div className="d-label">Amount Paid</div>
                <div className="d-value" style={{ color: '#34d399', fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>
                  {PRICES[payload?.orderData?.selectedPackage] || '—'}
                </div>
              </div>
              <div className="detail-item">
                <div className="d-label">Payment Method</div>
                <div className="d-value">{METHOD_LABELS[payload?.paymentMethod] || '—'}</div>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="progress-section">
              <div className="progress-title">Order Progress</div>
              <div className="steps">
                {[
                  { icon: '✓', label: 'Order Placed', state: 'done' },
                  { icon: '✓', label: 'Payment Done', state: 'done' },
                  { icon: '⚡', label: 'In Review', state: 'active' },
                  { icon: '🔨', label: 'Development', state: 'pending' },
                  { icon: '🚀', label: 'Delivered', state: 'pending' },
                ].map((s, i, arr) => (
                  <div className="step" key={i}>
                    {i < arr.length - 1 && (
                      <div className={`step-line ${s.state === 'done' ? 'done' : 'pending'}`} />
                    )}
                    <div className={`step-dot ${s.state}`}>{s.icon}</div>
                    <div className={`step-label ${s.state}`}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="cta-grid">
              <button className="cta-primary" onClick={() => router.push('/Dashboard')}>
                Track Order →
              </button>
              <button className="cta-secondary" onClick={() => {
                sessionStorage.clear();
                router.push('/');
              }}>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}