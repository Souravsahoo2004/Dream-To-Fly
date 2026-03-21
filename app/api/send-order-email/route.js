// app/api/send-order-email/route.js
// ---------------------------------
// Install dependencies:
//   npm install nodemailer
//
// Add to your .env.local:
//   EMAIL_HOST=smtp.gmail.com
//   EMAIL_PORT=587
//   EMAIL_USER=your-gmail@gmail.com
//   EMAIL_PASS=your-app-password        (Gmail App Password, not your login password)
//   EMAIL_FROM="Your Company <your-gmail@gmail.com>"
//   OWNER_EMAIL=owner@yourcompany.com   (who receives new-order alerts)

import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

// ── Shared transporter ────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,            // true for port 465, false for 587 (STARTTLS)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ── Helper: pretty payment method string ─────────────────────────────────────
function paymentLabel(method, details) {
  if (method === 'upi')        return `UPI — ${details?.upiId || ''}`;
  if (method === 'netbanking') return `Net Banking — ${details?.bank || ''}`;
  if (method === 'card')       return `Card ending ••••${details?.lastFour || ''}`;
  return method;
}

// ── Customer confirmation email HTML ─────────────────────────────────────────
function buildCustomerEmail({ name, email, packageLabel, price, paymentMethod, paymentDetails, orderId, date }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Order Confirmed</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0d0d18; font-family: 'DM Sans', Arial, sans-serif; color: #e2e8f0; }
    .wrapper { max-width: 560px; margin: 0 auto; padding: 40px 20px; }
    .card { background: #13131f; border-radius: 20px; overflow: hidden; border: 1px solid rgba(255,255,255,0.06); }
    .header { background: linear-gradient(135deg, #1a1040 0%, #0f1a1a 100%); padding: 48px 40px; text-align: center; position: relative; }
    .header::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 0%, rgba(52,211,153,0.15) 0%, transparent 70%); }
    .check-icon { width: 72px; height: 72px; margin: 0 auto 24px; background: rgba(52,211,153,0.15); border: 2px solid rgba(52,211,153,0.4); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 32px; position: relative; z-index: 1; }
    .headline { font-family: 'Syne', Arial, sans-serif; font-size: 28px; font-weight: 800; color: #fff; margin-bottom: 8px; position: relative; z-index: 1; }
    .sub { color: rgba(255,255,255,0.45); font-size: 15px; position: relative; z-index: 1; }
    .body { padding: 36px 40px; }
    .greeting { font-size: 16px; color: rgba(255,255,255,0.7); margin-bottom: 28px; line-height: 1.6; }
    .greeting strong { color: #fff; }
    .order-box { background: rgba(167,139,250,0.07); border: 1px solid rgba(167,139,250,0.15); border-radius: 14px; padding: 20px 24px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
    .ob-label { color: rgba(255,255,255,0.35); font-size: 11px; letter-spacing: 0.8px; text-transform: uppercase; margin-bottom: 4px; }
    .ob-value { font-family: 'Syne', Arial, sans-serif; font-size: 20px; font-weight: 800; color: #a78bfa; }
    .ob-date { color: rgba(255,255,255,0.3); font-size: 13px; text-align: right; }
    table.details { width: 100%; border-collapse: collapse; margin-bottom: 28px; }
    table.details td { padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 14px; }
    table.details td:first-child { color: rgba(255,255,255,0.4); width: 140px; }
    table.details td:last-child { color: #fff; font-weight: 500; text-align: right; }
    .amount-row td { padding-top: 16px !important; border-bottom: none !important; }
    .amount-row td:last-child { font-family: 'Syne', Arial, sans-serif; font-size: 20px; font-weight: 800; background: linear-gradient(135deg, #a78bfa, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; color: #a78bfa; }
    .what-next { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 20px 24px; margin-bottom: 28px; }
    .wn-title { font-size: 13px; letter-spacing: 0.5px; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 14px; }
    .wn-step { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px; }
    .wn-dot { width: 24px; height: 24px; background: rgba(167,139,250,0.15); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0; }
    .wn-text { color: rgba(255,255,255,0.55); font-size: 14px; line-height: 1.5; padding-top: 2px; }
    .cta-btn { display: block; text-align: center; background: linear-gradient(135deg, #7c3aed, #ec4899); color: #fff; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-family: 'Syne', Arial, sans-serif; font-weight: 700; font-size: 15px; margin-bottom: 28px; }
    .footer { background: rgba(0,0,0,0.2); padding: 24px 40px; text-align: center; border-top: 1px solid rgba(255,255,255,0.04); }
    .footer p { color: rgba(255,255,255,0.2); font-size: 12px; line-height: 1.6; }
    .footer a { color: #a78bfa; text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <!-- Header -->
      <div class="header">
        <div class="check-icon">✅</div>
        <h1 class="headline">Order Confirmed!</h1>
        <p class="sub">Your payment was successful and your order is now live</p>
      </div>

      <!-- Body -->
      <div class="body">
        <p class="greeting">
          Hi <strong>${name}</strong>,<br /><br />
          Thank you for placing your order with us! We're excited to start working on your project.
          Here's a summary of your order:
        </p>

        <!-- Order Number -->
        <div class="order-box">
          <div>
            <div class="ob-label">Order ID</div>
            <div class="ob-value">#${orderId}</div>
          </div>
          <div class="ob-date">${date}</div>
        </div>

        <!-- Order Details -->
        <table class="details">
          <tr>
            <td>Package</td>
            <td>${packageLabel}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>${email}</td>
          </tr>
          <tr>
            <td>Payment Via</td>
            <td>${paymentLabel(paymentMethod, paymentDetails)}</td>
          </tr>
          <tr class="amount-row">
            <td>Amount Paid</td>
            <td>${price}</td>
          </tr>
        </table>

        <!-- What's Next -->
        <div class="what-next">
          <div class="wn-title">What Happens Next</div>
          <div class="wn-step">
            <div class="wn-dot">1</div>
            <div class="wn-text"><strong style="color:#fff">Within 2 hours</strong> — Our project manager will call or email you to discuss requirements</div>
          </div>
          <div class="wn-step">
            <div class="wn-dot">2</div>
            <div class="wn-text"><strong style="color:#fff">Within 24 hours</strong> — You'll receive a detailed project timeline and milestone plan</div>
          </div>
          <div class="wn-step">
            <div class="wn-dot">3</div>
            <div class="wn-text"><strong style="color:#fff">Development begins</strong> — Our team starts building your project as per the agreed plan</div>
          </div>
        </div>

        <!-- CTA -->
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/Dashboard" class="cta-btn">
          📊 Track Your Order in Dashboard →
        </a>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p>
          If you have any questions, reply to this email or contact us at<br />
          <a href="mailto:${process.env.EMAIL_USER}">${process.env.EMAIL_USER}</a>
        </p>
        <p style="margin-top:12px">© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

// ── Owner alert email HTML ────────────────────────────────────────────────────
function buildOwnerEmail({ name, email, phone, packageLabel, price, paymentMethod, paymentDetails, orderId }) {
  return `
<div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;background:#13131f;color:#e2e8f0;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.1)">
  <div style="background:linear-gradient(135deg,#7c3aed,#ec4899);padding:24px 28px">
    <h2 style="color:#fff;margin:0;font-size:20px">🚀 New Order Received!</h2>
    <p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:14px">Order #${orderId}</p>
  </div>
  <div style="padding:24px 28px">
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <tr><td style="color:rgba(255,255,255,0.4);padding:8px 0;width:130px">Customer</td><td style="color:#fff;font-weight:600">${name}</td></tr>
      <tr><td style="color:rgba(255,255,255,0.4);padding:8px 0">Email</td><td style="color:#fff">${email}</td></tr>
      <tr><td style="color:rgba(255,255,255,0.4);padding:8px 0">Phone</td><td style="color:#fff">${phone}</td></tr>
      <tr><td style="color:rgba(255,255,255,0.4);padding:8px 0">Package</td><td style="color:#a78bfa;font-weight:700">${packageLabel}</td></tr>
      <tr><td style="color:rgba(255,255,255,0.4);padding:8px 0">Amount</td><td style="color:#34d399;font-weight:700;font-size:16px">${price}</td></tr>
      <tr><td style="color:rgba(255,255,255,0.4);padding:8px 0">Payment</td><td style="color:#fff">${paymentLabel(paymentMethod, paymentDetails)}</td></tr>
    </table>
  </div>
</div>
  `;
}

// ── POST handler ──────────────────────────────────────────────────────────────
export async function POST(request) {
  try {
    const body = await request.json();
    const { orderData, paymentMethod, paymentDetails, packageLabel } = body;

    const orderId = Math.floor(800000 + Math.random() * 99999).toString();
    const date = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

    const PRICES = {
      starter: '₹49,999', business: '₹99,999',
      ecommerce: '₹1,99,999', custom: '₹3,99,999+',
    };
    const price = PRICES[orderData.selectedPackage] || '—';

    // 1️⃣ Send confirmation to customer
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: orderData.email,
      subject: `✅ Order Confirmed #${orderId} — ${packageLabel}`,
      html: buildCustomerEmail({
        name: orderData.name,
        email: orderData.email,
        packageLabel,
        price,
        paymentMethod,
        paymentDetails,
        orderId,
        date,
      }),
    });

    // 2️⃣ Alert the business owner
    if (process.env.OWNER_EMAIL) {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.OWNER_EMAIL,
        subject: `🚀 New Order #${orderId} from ${orderData.name} — ${packageLabel}`,
        html: buildOwnerEmail({
          name: orderData.name,
          email: orderData.email,
          phone: orderData.phone,
          packageLabel,
          price,
          paymentMethod,
          paymentDetails,
          orderId,
        }),
      });
    }

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ error: 'Failed to send email', details: error.message }, { status: 500 });
  }
}