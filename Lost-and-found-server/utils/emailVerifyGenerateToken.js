const jwt = require("jsonwebtoken");

const emailVerifyGenerateToken = (email, userId) => {
    return jwt.sign(
        { email, id: userId, purpose: "email_verification" }, // Secure payload
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EMAIL_VERIFICATION_EXPIRY || "5m" } // Configurable expiry
    );
};

module.exports = { emailVerifyGenerateToken };
