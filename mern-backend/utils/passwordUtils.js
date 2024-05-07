// utils/passwordUtils.js

/*
passwordUtils.js, exports a single function, evaluatePasswordStrength, which evaluates the strength of a password.

The evaluatePasswordStrength function performs the following steps:

1. Checks if the password is in a set of common passwords. If it is, it logs a message, returns false for 'valid', and provides feedback.

2. Checks if the password is less than 8 characters long. If it is, it logs a message, returns false for 'valid', and provides feedback.

3. Checks if the password includes lowercase letters, uppercase letters, numbers, and special characters. For each type of character that the password includes, it increments a 'strengthScore' variable.

4. If the password is 12 or more characters long, it increments 'strengthScore'. If the password is 16 or more characters long, it increments 'strengthScore' again.

5. Determines whether the password is valid by checking if it includes all types of characters.

6. Assigns a strength label ('very weak', 'weak', 'average', or 'strong') based on the 'strengthScore' and whether the password is valid.

7. Constructs a feedback message based on the strength label and whether the password is valid, and logs this message.

8. Returns an object with 'valid' indicating whether the password is valid, and 'feedback' containing the feedback message.

The function is designed to provide detailed feedback on how to improve the strength of a password.
*/

const commonPasswords = new Set([
    '123456', 'password', '123456789', '12345678', '12345', 'qwerty', 'abc123',
    // Extend with more common passwords as needed.
]);

function evaluatePasswordStrength(password) {
    let feedback = [];

    // Check for common passwords
    if (commonPasswords.has(password.toLowerCase())) {
        console.log("Password is very weak: Avoid using common passwords.");
        return { valid: false, feedback: "Password is very weak: Avoid using common passwords." };
    }

    // Check for minimum length
    if (password.length < 8) {
        console.log("Password is very weak: Use at least 8 characters.");
        return { valid: false, feedback: "Password is very weak: Use at least 8 characters." };
    }

    // Character diversity checks
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[\W_]/.test(password);

    let strengthScore = 0; // Initialize strength score

    // Accumulate feedback for missing character types
    if (!hasLower) feedback.push("Include lowercase letters.");
    else strengthScore++;

    if (!hasUpper) feedback.push("Include uppercase letters.");
    else strengthScore++;

    if (!hasNumber) feedback.push("Include numbers.");
    else strengthScore++;

    if (!hasSpecial) feedback.push("Include special characters.");
    else strengthScore++;

    // Increase strengthScore based on password length tiers
    if (password.length >= 12) strengthScore += 1; // Longer passwords are stronger
    if (password.length >= 16) strengthScore += 1; // Add extra point for even longer passwords

    // The password is considered valid if it includes all character types
    const isValid = hasLower && hasUpper && hasNumber && hasSpecial;

    // Assign a strength label based on the presence of character types and length
    let strengthLabel = "very weak"; // Default label for initialization
    if (isValid) {
        if (strengthScore >= 6) strengthLabel = "strong";
        else if (strengthScore >= 4) strengthLabel = "average";
        else strengthLabel = "weak";
    }

    // Construct final feedback
    if (!isValid) {
        feedback.unshift("Password is very weak:");
    } else {
        feedback = [isValid ? `Password is ${strengthLabel}.` : "Password meets the minimum criteria but could be stronger."];
    }

    console.log(feedback.join(" ")); // Log the constructed feedback to the terminal

    return {
        valid: isValid,
        feedback: feedback.join(" ").trim()
    };
}

module.exports = { evaluatePasswordStrength };
