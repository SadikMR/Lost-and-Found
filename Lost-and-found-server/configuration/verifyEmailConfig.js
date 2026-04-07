const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends a 6-digit email verification code.
 * @param {string} email - Recipient email.
 * @param {string} code  - 6-digit OTP code.
 */
const sendVerificationEmail = async (email, code) => {
  try {
    const mailOptions = {
      from: `"Lost & Found Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Email Verification Code",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;border:1px solid #e2e8f0;border-radius:12px;">
          <h2 style="color:#4f46e5;margin-bottom:8px;">Email Verification</h2>
          <p style="color:#334155;">Thank you for registering on <strong>Lost &amp; Found</strong>.</p>
          <p style="color:#334155;">Use the code below to verify your email address. This code expires in <strong>10 minutes</strong>.</p>
          <div style="font-size:36px;font-weight:bold;letter-spacing:10px;color:#4f46e5;background:#eef2ff;padding:16px 24px;border-radius:8px;text-align:center;margin:24px 0;">
            ${code}
          </div>
          <p style="color:#64748b;font-size:13px;">If you didn't request this, please ignore this email.</p>
          <p style="color:#64748b;font-size:13px;">Best regards,<br/>Lost &amp; Found Team</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Verification code sent to ${email}: ${info.response}`);
  } catch (error) {
    console.error("❌ Error sending verification email:", error);
    throw error;
  }
};

/**
 * Sends a 6-digit password reset code.
 * @param {string} email - Recipient email.
 * @param {string} code  - 6-digit OTP code.
 */
const sendPasswordResetEmail = async (email, code) => {
  try {
    const mailOptions = {
      from: `"Lost & Found Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Password Reset Code",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;border:1px solid #e2e8f0;border-radius:12px;">
          <h2 style="color:#dc2626;margin-bottom:8px;">Password Reset</h2>
          <p style="color:#334155;">We received a request to reset your <strong>Lost &amp; Found</strong> password.</p>
          <p style="color:#334155;">Use the code below to reset your password. This code expires in <strong>10 minutes</strong>.</p>
          <div style="font-size:36px;font-weight:bold;letter-spacing:10px;color:#dc2626;background:#fef2f2;padding:16px 24px;border-radius:8px;text-align:center;margin:24px 0;">
            ${code}
          </div>
          <p style="color:#64748b;font-size:13px;">If you didn't request this, please ignore this email.</p>
          <p style="color:#64748b;font-size:13px;">Best regards,<br/>Lost &amp; Found Team</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Reset code sent to ${email}: ${info.response}`);
  } catch (error) {
    console.error("❌ Error sending password reset email:", error);
    throw error;
  }
};

module.exports = { sendVerificationEmail, sendPasswordResetEmail };
