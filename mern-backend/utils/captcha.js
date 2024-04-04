// utils/captcha.js
require('dotenv').config();

async function verifyRecaptcha(token) {
    const fetch = (await import('node-fetch')).default;
    const secretKey = process.env.RECAPTCHA_SECRET_KEY; // Using the secret key from environment variables
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${secretKey}&response=${token}`, // Correctly reference the secretKey variable here
    });
    const captchaValidation = await response.json();
    return captchaValidation.success;
}

module.exports = {verifyRecaptcha};
