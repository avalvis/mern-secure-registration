// src/pages/Register.js

/*
This is a React component for my registration form. It uses hooks for state management and function components. 
Here's a brief overview of how it works:

1. The `useState` hook is used to manage the form data, captcha value, form errors, and the visibility of a success modal.

2. The `useRef` hook is used to create a reference to the CAPTCHA component.

3. The `useNavigate` hook from `react-router-dom` is used for navigation.

4. The `handleChange` function updates the form data and resets any field-specific errors when the user types in a field. 
If the password field is being updated, it also evaluates the password strength.

5. The `onCaptchaChange` function updates the captcha value and resets the captcha error when the user interacts with the CAPTCHA.

6. The `handleSubmit` function validates the form fields when the user submits the form. 
If any fields are empty or invalid, it prevents form submission and sets the appropriate error messages. 
If all fields are valid, it sends a POST request to a specified API endpoint with the form data and the captcha value. 
If the request is successful, it shows a success modal. 
If the request fails due to validation errors, it sets the error messages and resets the CAPTCHA. 
For other types of errors, it shows an alert message.

7. The `return` statement renders the form and the success modal. 
The form includes inputs for the username, email, and password, a CAPTCHA, and a submit button. 
Each input has an associated error message that is displayed if the corresponding field is invalid. 
The success modal is displayed if the registration is successful.
*/

import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha"; // Ensure you have installed react-google-recaptcha
import styles from './Register.module.css'; // Your CSS module for styling
import SuccessModal from './SuccessModal'; // Import your SuccessModal component
import { evaluatePasswordStrength } from '../utils/evaluatePasswordStrength'; // Import the evaluatePasswordStrength function

// Define the validateEmail function at the top of your file
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

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

        // Evaluate password strength if the 'password' field is being updated
        if (name === 'password') {
            const { feedback, valid } = evaluatePasswordStrength(value);
            // Update the formErrors state with the feedback for the password
            setFormErrors(prevErrors => ({ ...prevErrors, password: feedback }));
        }
    };

    const onCaptchaChange = (value) => {
        setCaptchaValue(value);
        // Reset captcha error upon change
        setFormErrors({ ...formErrors, captcha: '' });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasInvalidFields = false; // Initialize the variable

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
        if (!validateEmail(formData.email)) {
            newErrors.email = "Invalid email format.";
            hasInvalidFields = true;
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
            const endpoint = process.env.REACT_APP_API_ENDPOINT; // My API endpoint
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
                    sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
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