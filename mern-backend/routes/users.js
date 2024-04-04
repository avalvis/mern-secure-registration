// users.js
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');
const {evaluatePasswordStrength} = require('../utils/passwordUtils');
const {verifyRecaptcha} = require('../utils/captcha');


router.post('/register', async (req, res) => {
    try {
        // Verify CAPTCHA first. Ensure you're receiving the correct CAPTCHA response key in the request body.
        if (!await verifyRecaptcha(req.body.captcha)) {
            return res.status(400).json({errors: {captcha: "CAPTCHA verification failed. Please try again."}});
        }

        const errors = {};
        // Check if the username is already taken
        const usernameExists = await User.findOne({username: req.body.username});
        if (usernameExists) {
            errors.username = "Username is already in use.";
        }

        // Check if the email is already taken
        const emailExists = await User.findOne({email: req.body.email});
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
            return res.status(400).json({errors});
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
        await newUser.save();

        // Prepare and send the response excluding the password for security
        res.status(201).json({message: "User successfully registered."});
    } catch (error) {
        console.error('Error registering new user:', error);
        res.status(500).json({errors: {general: "An unexpected error occurred. Please try again."}});
    }
});

module.exports = router;
