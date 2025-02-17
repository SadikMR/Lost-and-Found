const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const FRONTEND_URL = process.env.FRONTEND_URL.trim();

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Ensure you use an App Password if needed
    },
});

/**
 * Sends a verification email to the user.
 * @param {string} email - The recipient's email.
 * @param {string} token - The verification token.
 */
const sendVerificationEmail = async (email, token) => {
    try {
        const mailOptions = {
            from: `"Lost & Found Support" <${process.env.EMAIL_USER}>`,  //  Adds sender name for credibility
            to: email,
            subject: "Verify Your Email Address",
            text: `Click the following link to verify your email: ${FRONTEND_URL}/verifyEmail/${token}`,
            html: `
                <p>Hello,</p>
                <p>Thank you for registering on Lost & Found.</p>
                <p>Please verify your email by clicking the link below:</p>
                <a href="${FRONTEND_URL}/verifyEmail/${token}" style="padding: 10px; background: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">
                    Verify Email
                </a>
                <p>If you didn't request this, please ignore this email.</p>
                <p>Best regards,<br>Lost & Found Team</p>
            `,
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Verification Email sent to ${email}: ${info.response}`);
    } catch (error) {
        console.error("❌ Error sending verification email:", error);
    }
};

module.exports = { sendVerificationEmail };
