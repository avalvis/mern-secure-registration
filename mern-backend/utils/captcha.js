// utils/captcha.js

/*
This JavaScript file, captcha.js, exports a single function, verifyRecaptcha, which verifies a reCAPTCHA token.

The verifyRecaptcha function performs the following steps:

1. Imports the 'node-fetch' module to make HTTP requests.

2. Retrieves the reCAPTCHA secret key from the environment variables.

3. Makes a POST request to the Google reCAPTCHA API endpoint ('https://www.google.com/recaptcha/api/siteverify') with the secret key and the reCAPTCHA token from the function argument. The request headers specify that the content type is 'application/x-www-form-urlencoded'.

4. Parses the response from the reCAPTCHA API as JSON.

5. Returns the 'success' property from the parsed response, which indicates whether the reCAPTCHA verification was successful.

The function is asynchronous because it involves network requests, which are inherently asynchronous operations.
*/

require('dotenv').config();

async function verifyRecaptcha(token) {
    const fetch = (await import('node-fetch')).default;
    const secretKey = process.env.RECAPTCHA_SECRET_KEY; // Using the secret key from environment variables
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${secretKey}&response=${token}`, // reference the secretKey variable here
    });
    const captchaValidation = await response.json();
    return captchaValidation.success;
}

module.exports = { verifyRecaptcha };
