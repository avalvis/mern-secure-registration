// user.js
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
