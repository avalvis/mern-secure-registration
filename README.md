# MERN User Registration System

This project is a complete user registration system built using the MERN stack (MongoDB, Express.js, React, and Node.js). It offers a secure way for users to register, using backend validations to ensure data integrity and security. The system employs Google's reCAPTCHA to prevent bot registrations, enhancing security of user sign-ups.

## Features

- **User Registration**: Allows new users to register by providing a username, email, and password. Each field is validated on server side to ensure compliance with standards and security practices.
- **CAPTCHA Integration**: Integrates Google's reCAPTCHA to differentiate between human and automated access.
- **Responsive UI**: A React-based frontend that provides a user-friendly interface for registration.
- **Secure Password Handling**: Passwords are securely hashed using bcrypt before storage in MongoDB, ensuring sensitive data is protected.
- **Validation Feedback**: Offers immediate, informative feedback for validation errors (e.g., incorrect email format, weak passwords, and duplicate usernames or emails), both on the frontend and backend.
- **Success Notification**: Upon successful registration, users are presented with a modal confirming their registration, followed by a page refresh to reset the form or further actions as needed.

## Technologies Used

- **Frontend**: React for the user interface, Axios for making HTTP requests, and react-google-recaptcha for CAPTCHA functionality.
- **Backend**: Node.js with Express.js framework for handling server-side logic, MongoDB for data storage with Mongoose ORM for data modeling, bcrypt for password hashing, and node-fetch for server-side CAPTCHA verification.
- **Styling**: CSS Modules for component-scoped styling, ensuring a clean and maintainable codebase.

# Working on Extra Features

## Fetch Registered Users

This branch (`feature-fetch-users`) focuses on developing the functionality to fetch and display a list of all registered users. This feature aims to enhance administrative capabilities by providing a quick overview of user engagement.
