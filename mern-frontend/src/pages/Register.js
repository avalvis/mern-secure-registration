// src/pages/Register.js

/*
Register.js, is a React component that provides a registration form for users. It uses hooks for state management, axios for HTTP requests, react-router-dom for navigation, and react-google-recaptcha for CAPTCHA verification.

The Register component performs the following steps:

1. Initializes state variables for form data, CAPTCHA response, form errors, and a flag for showing a success modal.

2. Defines a ref for the CAPTCHA component.

3. Defines a handleChange function that updates the form data and resets any field-specific errors when the user types in a form field.

4. Defines an onCaptchaChange function that updates the CAPTCHA response and resets any CAPTCHA-specific errors when the user interacts with the CAPTCHA.

5. Defines a handleSubmit function that validates the form fields and CAPTCHA response, sends a POST request to the '/api/users/register' endpoint with the form data and CAPTCHA response, and handles the response from the server.

6. Renders a form with inputs for username, email, and password, a CAPTCHA, and a submit button. It also renders error messages for each field and a general error message if they exist in the state. If the success modal flag is true, it renders a SuccessModal component.

This component is typically used in a registration page of an application, and is responsible for collecting user input, validating it, sending it to the server, and handling the server's response.
*/

import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha"; // Ensure you have installed react-google-recaptcha
import styles from './Register.module.css'; // Your CSS module for styling
import SuccessModal from './SuccessModal'; // Import your SuccessModal component


function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [captchaValue, setCaptchaValue] = useState(null); // State for CAPTCHA response
    const [formErrors, setFormErrors] = useState({}); // State for form errors
    const [showSuccessModal, setShowSuccessModal] = useState(false); // State for showing the success modal

    const navigate = useNavigate(); // Hook for navigation
    const captchaRef = useRef(null); // Create a ref for the CAPTCHA

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Reset individual field error upon change
        setFormErrors({ ...formErrors, [name]: '' });
    };

    const onCaptchaChange = (value) => {
        setCaptchaValue(value);
        // Reset captcha error upon change
        setFormErrors({ ...formErrors, captcha: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check for empty fields and set errors if any are found
        let hasEmptyFields = false;
        const newErrors = { ...formErrors }; // Copy existing errors
        if (!formData.username) {
            newErrors.username = "Username is required.";
            hasEmptyFields = true;
        }
        if (!formData.email) {
            newErrors.email = "Email is required.";
            hasEmptyFields = true;
        }
        if (!formData.password) {
            newErrors.password = "Password is required.";
            hasEmptyFields = true;
        }

        // If there are any empty fields, prevent form submission and display errors
        if (hasEmptyFields) {
            setFormErrors(newErrors);
            return;
        }

        if (!captchaValue) {
            newErrors.captcha = "Please verify you're not a robot.";
            hasEmptyFields = true;
        }


        try {
            const endpoint = 'http://localhost:5000/api/users/register';
            const data = { ...formData, captcha: captchaValue };
            const response = await axios.post(endpoint, data);
            setShowSuccessModal(true); // Show the success modal upon successful registration

            navigate('/register');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setFormErrors(error.response.data.errors);
                // Reset CAPTCHA if there's a validation error
                captchaRef.current.reset();
                setCaptchaValue(null); // Also clear the captchaValue state
            } else {
                // Handle other errors
                alert('An error occurred. Please try again.');
            }
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit} className={styles.form}>
                {/* Username Input */}
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />
                {formErrors.username && <div className={styles.error}>{formErrors.username}</div>}

                {/* Email Input */}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {formErrors.email && <div className={styles.error}>{formErrors.email}</div>}

                {/* Password Input */}
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {formErrors.password && <div className={styles.error}>{formErrors.password}</div>}

                {/* CAPTCHA */}
                <ReCAPTCHA
                    sitekey="6LdwuawpAAAAAEJxFPNnaidq5y0co4bQ-WZcn4DA"
                    onChange={onCaptchaChange}
                    ref={captchaRef} // Attach the ref to the CAPTCHA component
                />
                {formErrors.general && <div className={styles.error}>{formErrors.general}</div>}
                <button type="submit">Register</button>
            </form>
            {showSuccessModal && (
                <SuccessModal
                    isOpen={showSuccessModal}
                    onConfirm={() => {
                        setShowSuccessModal(false); // Close the modal
                        window.location.reload(); // Refresh the page or navigate as needed
                    }}
                />
            )}
        </>

    );
}

export default Register;
