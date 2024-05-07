// routes/users.js

/*
users.js, sets up an Express router for user-related routes and handles user registration.

The '/register' route is a POST route that handles user registration. It performs the following steps:

1. Verifies the CAPTCHA response from the request body. 
If the CAPTCHA verification fails, it sends a 400 status response with an error message.

2. Checks if the username and email provided in the request body are already in use. 
If either is already in use, it adds an error message to the 'errors' object.

3. Evaluates the strength of the password provided in the request body using the 'evaluatePasswordStrength' function. 
If the password is not valid, it adds the feedback to the 'errors' object.

4. If there are any validation errors (i.e., if the 'errors' object is not empty),
 it sends a 400 status response with the 'errors' object.

5. If there are no validation errors, it hashes the password using bcrypt. 
The number of salt rounds is either the value of the 'BCRYPT_SALT_ROUNDS' environment variable or 10 
if the environment variable is not set.

6. Creates a new User instance with the username, email, and hashed password from the request body, and saves it to the database.

7. Sends a 201 status response with a success message.

If any unexpected errors occur during this process, it logs the error and sends a 500 status response with a general error message.

Finally, it exports the router for use in other parts of the application.
*/

const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');
const { evaluatePasswordStrength } = require('../utils/passwordUtils');
const { verifyRecaptcha } = require('../utils/captcha');


router.post('/register', async (req, res) => {
    try {
        // Verify CAPTCHA first. Ensure you're receiving the correct CAPTCHA response key in the request body.
        if (!await verifyRecaptcha(req.body.captcha)) {
            return res.status(400).json({ errors: { captcha: "CAPTCHA verification failed. Please try again." } });
        }

        const errors = {};
        // Check if the username is already taken
        const usernameExists = await User.findOne({ username: req.body.username });
        if (usernameExists) {
            errors.username = "Username is already in use.";
        }

        // Check if the email is already taken
        const emailExists = await User.findOne({ email: req.body.email });
        if (emailExists) {
            errors.email = "Email is already in use.";
        }

        // Evaluate password strength
        const passwordValidation = evaluatePasswordStrength(req.body.password);
        if (!passwordValidation.valid) {
            errors.password = passwordValidation.feedback;
        }

        // If there are any validation errors, return them
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }

        // If validations pass, hash the password
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        // Create and save the new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        try {
            await newUser.save();
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError && error.errors.email) {
                return res.status(400).json({ errors: { email: "Invalid email format." } });
            }
            throw error;
        }

        // Prepare and send the response excluding the password for security
        res.status(201).json({ message: "User successfully registered." });
    } catch (error) {
        console.error('Error registering new user:', error);
        res.status(500).json({ errors: { general: "An unexpected error occurred. Please try again." } });
    }
});

module.exports = router;
