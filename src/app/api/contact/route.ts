import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

export async function POST(request: Request) {
  try {
    const { Name, Organization, Email, Message } = await request.json();

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      // SMTP credentials not configured - notify frontend to fallback to FormSubmit
      return NextResponse.json({ useFallback: true });
    }

    const logoPath = path.join(process.cwd(), "public", "bglogo.png");
    const logoExists = fs.existsSync(logoPath);
    const logoSrc = logoExists ? "cid:pixelcultlogo" : "https://pixelcult.com/bglogo.png";

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "465"),
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>PixelCult Contact Submission</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #020617;
      color: #f1f5f9;
      margin: 0;
      padding: 40px 20px;
    }
    .card {
      background-color: #0f172a;
      border: 1px solid #10b981;
      border-radius: 20px;
      padding: 40px;
      max-width: 600px;
      margin: 0 auto;
      box-shadow: 0 0 50px rgba(16, 185, 129, 0.15);
    }
    .header {
      text-align: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding-bottom: 25px;
      margin-bottom: 30px;
    }
    .logo {
      height: 48px;
      margin-bottom: 12px;
    }
    .title {
      font-size: 20px;
      font-weight: 900;
      color: #10b981;
      text-transform: uppercase;
      letter-spacing: 0.25em;
    }
    .field-row {
      margin-bottom: 24px;
    }
    .field-label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: #64748b;
      font-weight: 800;
      margin-bottom: 8px;
    }
    .field-value {
      font-size: 15px;
      color: #f1f5f9;
      background-color: rgba(2, 6, 23, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.05);
      padding: 14px 18px;
      border-radius: 10px;
      line-height: 1.6;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      font-size: 9px;
      color: #475569;
      letter-spacing: 0.2em;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      padding-top: 25px;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div style="margin-bottom: 15px;">
        <img class="logo" src="${logoSrc}" alt="PixelCult Icon" style="height: 45px; vertical-align: middle;">
      </div>
      <div style="font-family: 'Courier New', Courier, monospace; font-size: 22px; font-weight: 900; color: #ffffff; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 8px;">
        PIXEL<span style="color: #10b981;">CULT</span>
      </div>
      <div class="title" style="font-size: 11px; font-weight: 800; color: #64748b; letter-spacing: 0.3em; text-transform: uppercase;">
        Lead Transmission Portal
      </div>
    </div>
    
    <div class="field-row">
      <div class="field-label">Sender Name</div>
      <div class="field-value">${Name}</div>
    </div>
    
    <div class="field-row">
      <div class="field-label">Organization</div>
      <div class="field-value">${Organization}</div>
    </div>
    
    <div class="field-row">
      <div class="field-label">Email Address</div>
      <div class="field-value">
        <a href="mailto:${Email}" style="color: #10b981; text-decoration: none; font-weight: 600;">${Email}</a>
      </div>
    </div>
    
    <div class="field-row">
      <div class="field-label">Message Payload</div>
      <div class="field-value" style="white-space: pre-wrap;">${Message}</div>
    </div>
    
    <div class="footer">
      SYSTEM NOMINAL // PORTAL CORE INTERACTIVE
    </div>
  </div>
</body>
</html>
    `;

    const attachments = [];
    if (logoExists) {
      attachments.push({
        filename: "bglogo.png",
        path: logoPath,
        cid: "pixelcultlogo",
      });
    }

    await transporter.sendMail({
      from: `"PixelCult Portal" <${smtpUser}>`,
      to: "info.pixelcult@gmail.com",
      replyTo: Email,
      subject: `[PixelCult Portal] New Lead: ${Name} (${Organization})`,
      html: htmlContent,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("SMTP Mail transmission error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
