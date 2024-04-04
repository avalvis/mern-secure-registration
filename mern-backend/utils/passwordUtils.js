// utils/passwordUtils.js

const commonPasswords = new Set([
    '123456', 'password', '123456789', '12345678', '12345', 'qwerty', 'abc123',
    // Extend with more common passwords as needed.
]);

function evaluatePasswordStrength(password) {
    let feedback = [];

    // Check for common passwords
    if (commonPasswords.has(password.toLowerCase())) {
        console.log("Password is very weak: Avoid using common passwords.");
        return {valid: false, feedback: "Password is very weak: Avoid using common passwords."};
    }

    // Check for minimum length
    if (password.length < 8) {
        console.log("Password is very weak: Use at least 8 characters.");
        return {valid: false, feedback: "Password is very weak: Use at least 8 characters."};
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

module.exports = {evaluatePasswordStrength};
