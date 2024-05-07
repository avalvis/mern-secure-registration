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

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- Node.js (Download and install from [Node.js official website](https://nodejs.org/))
- MongoDB (Follow the installation guide on the [MongoDB official documentation](https://docs.mongodb.com/manual/installation/))
- npm (Node package manager, comes installed with Node.js)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### 1. Clone the repository

Clone this repository to your local machine using:

```bash
git clone https://yourrepository.git
```

### 2. Install Backend Dependencies

Navigate to the backend directory from the project root:

```bash
cd backend
```

Install the necessary npm packages:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the backend directory and add the following environment variables:

```plaintext
PORT=5000
MY_DB_URI=mongodb://localhost:27017/yourDatabaseName
RECAPTCHA_SECRET_KEY=your_secret_key
```

Replace `your_secret_key` with your actual Google reCAPTCHA secret key.

### 4. Run MongoDB

Ensure your MongoDB service is running. If you have installed MongoDB locally, you can typically start it with a command like:

```bash
mongod
```

### 5. Start the Backend Server

From the backend directory, start the server using:

```bash
npm start
```

This will launch the backend server on `http://localhost:5000`.

### 6. Install Frontend Dependencies

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install the necessary npm packages:

```bash
npm install
```

### 7. Run the Frontend Application

Still in the frontend directory, start the React application:

```bash
npm start
```

This command will open the frontend part of the application in your default web browser at `http://localhost:3000`.

## Using the Application

With both the backend and frontend running, you can navigate to `http://localhost:3000` in your web browser to start using the application. To test the registration functionality, simply fill out the registration form and submit it. Ensure you are connected to the internet to allow Google reCAPTCHA to work correctly.

## Troubleshooting

If you encounter any issues with MongoDB, make sure MongoDB is running and the URI provided in the `.env` file is correct. For any issues with dependencies, ensure all packages are installed by rerunning `npm install` in the respective directories.

---
