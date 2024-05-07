// src/utils/evaluatePasswordStrength.js
export function evaluatePasswordStrength(password) {
    const commonPasswords = new Set([
        '123456', 'password', '123456789', '12345678', '12345', 'qwerty', 'abc123',
        'admin', 'welcome', 'letmein', '1234567', 'master', '123123',
        'welcome1', 'password1', 'qwerty123', '123qwe', '123abc', 'qwe123', 'admin123',
        'pass123', 'qwertyuiop', '123321', '654321'
    ]);

    // Basic checks for common passwords and minimum length
    if (commonPasswords.has(password.toLowerCase())) {
        return { valid: false, feedback: "Password is very weak: Avoid using common passwords." };
    }
    if (password.length < 8) {
        return { valid: false, feedback: "Password is very weak: Use at least 8 characters." };
    }

    // Advanced checks for character diversity
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[\W_]/.test(password);

    let missingTypes = [];
    if (!hasLower) {
        missingTypes.push("lowercase");
    }
    if (!hasUpper) {
        missingTypes.push("uppercase");
    }
    if (!hasNumber) {
        missingTypes.push("number");
    }
    if (!hasSpecial) {
        missingTypes.push("special character");
    }

    let feedback = "You also need to include: ";
    if (missingTypes.length > 1) {
        let lastType = missingTypes.pop();
        feedback += missingTypes.join(", ") + " and " + lastType;
    } else if (missingTypes.length === 1) {
        feedback += missingTypes[0];
    }

    if (missingTypes.length > 0) {
        return { valid: false, feedback };
    }

    // If all checks are passed, then evaluate strength
    let strengthScore = 0;
    if (hasLower) strengthScore++;
    if (hasUpper) strengthScore++;
    if (hasNumber) strengthScore++;
    if (hasSpecial) strengthScore++;
    if (password.length >= 12) strengthScore++;
    if (password.length >= 16) strengthScore++;

    const isValid = true;  // Since it passes all basic checks
    let strengthLabel = "very weak";
    if (strengthScore >= 6) strengthLabel = "strong";
    else if (strengthScore >= 4) strengthLabel = "average";
    else strengthLabel = "weak";

    return {
        valid: isValid,
        feedback: `Password is ${strengthLabel}.`
    };
}
