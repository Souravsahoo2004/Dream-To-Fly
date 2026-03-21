// app/api/send-abandoned-email/route.js
// ---------------------------------------
// Called via navigator.sendBeacon() when user leaves the payment page
// without completing payment.

import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function buildAbandonedEmail({ name, email, packageLabel, price }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Complete Your Order</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0d0d18; font-family: 'DM Sans', Arial, sans-serif; color: #e2e8f0; }
    .wrapper { max-width: 560px; margin: 0 auto; padding: 40px 20px; }
    .card { background: #13131f; border-radius: 20px; overflow: hidden; border: 1px solid rgba(255,255,255,0.06); }
    .header { background: linear-gradient(135deg, #1a1020 0%, #1a0f0f 100%); padding: 48px 40px; text-align: center; position: relative; }
    .header::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 0%, rgba(236,72,153,0.12) 0%, transparent 70%); }
    .icon { font-size: 48px; display: block; margin-bottom: 20px; position: relative; z-index: 1; }
    .headline { font-family: 'Syne', Arial, sans-serif; font-size: 26px; font-weight: 800; color: #fff; margin-bottom: 8px; position: relative; z-index: 1; }
    .sub { color: rgba(255,255,255,0.4); font-size: 14px; position: relative; z-index: 1; }
    .body { padding: 36px 40px; }
    .greeting { font-size: 15px; color: rgba(255,255,255,0.6); margin-bottom: 28px; line-height: 1.7; }
    .greeting strong { color: #fff; }
    .pkg-box { background: rgba(236,72,153,0.07); border: 1px solid rgba(236,72,153,0.15); border-radius: 14px; padding: 20px 24px; margin-bottom: 28px; display: flex; justify-content: space-between; align-items: center; }
    .pb-name { color: #fff; font-weight: 600; font-size: 16px; margin-bottom: 4px; }
    .pb-label { color: rgba(255,255,255,0.3); font-size: 12px; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 8px; }
    .pb-price { font-family: 'Syne', Arial, sans-serif; font-size: 24px; font-weight: 800; background: linear-gradient(135deg, #a78bfa, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; color: #a78bfa; }
    .urgency { display: flex; gap: 12px; align-items: flex-start; background: rgba(251,191,36,0.06); border: 1px solid rgba(251,191,36,0.15); border-radius: 12px; padding: 16px 20px; margin-bottom: 28px; }
    .urgency-icon { font-size: 20px; flex-shrink: 0; }
    .urgency-text { color: rgba(255,255,255,0.6); font-size: 14px; line-height: 1.5; }
    .urgency-text strong { color: #fbbf24; }
    .cta-btn { display: block; text-align: center; background: linear-gradient(135deg, #7c3aed, #ec4899); color: #fff; text-decoration: none; padding: 18px 32px; border-radius: 12px; font-family: 'Syne', Arial, sans-serif; font-weight: 700; font-size: 16px; margin-bottom: 16px; }
    .cta-sub { text-align: center; color: rgba(255,255,255,0.25); font-size: 12px; margin-bottom: 28px; }
    .benefits { display: flex; gap: 16px; margin-bottom: 28px; }
    .benefit { flex: 1; text-align: center; }
    .benefit-icon { font-size: 24px; margin-bottom: 6px; }
    .benefit-label { color: rgba(255,255,255,0.4); font-size: 11px; line-height: 1.4; }
    .footer { background: rgba(0,0,0,0.2); padding: 20px 40px; text-align: center; border-top: 1px solid rgba(255,255,255,0.04); }
    .footer p { color: rgba(255,255,255,0.2); font-size: 12px; line-height: 1.6; }
    .footer a { color: #a78bfa; text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="header">
        <span class="icon">🛒</span>
        <h1 class="headline">Don't Lose Your Spot!</h1>
        <p class="sub">You were so close — your order is waiting for you</p>
      </div>

      <div class="body">
        <p class="greeting">
          Hi <strong>${name}</strong>,<br /><br />
          We noticed you started placing an order but didn't complete the payment.
          Your selected package is still reserved — but we can't hold it forever!
        </p>

        <!-- Package Box -->
        <div class="pkg-box">
          <div>
            <div class="pb-label">Your Selected Package</div>
            <div class="pb-name">${packageLabel}</div>
          </div>
          <div class="pb-price">${price}</div>
        </div>

        <!-- Urgency -->
        <div class="urgency">
          <span class="urgency-icon">⚡</span>
          <div class="urgency-text">
            <strong>Limited slots available!</strong> We only take on a limited number of projects each month
            to ensure quality. Complete your order before this package slot is taken.
          </div>
        </div>

        <!-- CTA -->
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/payment" class="cta-btn">
          Complete My Order →
        </a>
        <p class="cta-sub">Takes less than 2 minutes to complete</p>

        <!-- Benefits -->
        <div class="benefits">
          <div class="benefit">
            <div class="benefit-icon">🔒</div>
            <div class="benefit-label">Secure<br />Payment</div>
          </div>
          <div class="benefit">
            <div class="benefit-icon">💬</div>
            <div class="benefit-label">24/7<br />Support</div>
          </div>
          <div class="benefit">
            <div class="benefit-icon">✅</div>
            <div class="benefit-label">Satisfaction<br />Guaranteed</div>
          </div>
          <div class="benefit">
            <div class="benefit-icon">🚀</div>
            <div class="benefit-label">Fast<br />Delivery</div>
          </div>
        </div>
      </div>

      <div class="footer">
        <p>
          Questions? Reply to this email or reach us at
          <a href="mailto:${process.env.EMAIL_USER}">${process.env.EMAIL_USER}</a>
        </p>
        <p style="margin-top:8px">© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { orderData } = body;

    if (!orderData?.email || !orderData?.name) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    const PACKAGES = {
      starter: 'Starter Website', business: 'Business Pro',
      ecommerce: 'E-Commerce Store', custom: 'Custom Web App',
    };
    const PRICES = {
      starter: '₹49,999', business: '₹99,999',
      ecommerce: '₹1,99,999', custom: '₹3,99,999+',
    };

    const packageLabel = PACKAGES[orderData.selectedPackage] || orderData.selectedPackage;
    const price = PRICES[orderData.selectedPackage] || '';

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: orderData.email,
      subject: `🛒 You left something behind, ${orderData.name}! Complete your order`,
      html: buildAbandonedEmail({ name: orderData.name, email: orderData.email, packageLabel, price }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Abandoned email error:', error);
    return NextResponse.json({ error: 'Failed', details: error.message }, { status: 500 });
  }
}