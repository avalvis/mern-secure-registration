// user.js

/*
This JavaScript file, user.js, defines a Mongoose schema for a User. Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. 

The User schema includes the following fields:
- username: A unique, required string that is trimmed and must be at least 3 characters long.
- password: A required string.
- email: A unique, required string that is trimmed and validated with a regular expression to ensure it's in a valid email format.
- isVerified: A boolean that defaults to false, indicating whether the user's email has been verified.
- passwordResetToken: A string that defaults to an empty string, which could be used for password reset functionality in the future.
- passwordResetExpires: A date field, which could be used to set an expiration time for the password reset token.

The schema also includes timestamps (createdAt and updatedAt fields) that are automatically managed by Mongoose.

Finally, the User model is created from the schema and exported for use in other parts of the application.
*/

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        // Email validation regex
        // Email should:
        // Start with word characters (letters, numbers, underscore), optionally followed by dots or hyphens.
        // Contain an @ symbol, followed by more word characters, optionally followed by dots or hyphens.
        // End with a dot and two to three word characters (to match domain extensions like .com, .net, .org, etc.).
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'is invalid']


    },
    isVerified: {
        type: Boolean,
        default: false
    },
    // This field could be useful if I implement password reset functionality
    passwordResetToken: {
        type: String,
        default: ''
    },
    passwordResetExpires: {
        type: Date
    }
    // Future user fields if needed
}, {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);

module.exports = User;
