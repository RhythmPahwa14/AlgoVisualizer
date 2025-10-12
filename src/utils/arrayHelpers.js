// src/utils/arrayHelpers.js

export const generateRandomArray = (length, min, max) => {
    return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};

export const createBars = (array) => {
    const arrayContainer = document.getElementById("array-container");
    arrayContainer.innerHTML = '';
    array.forEach(num => {
        const bar = document.createElement("div");
        bar.classList.add("array-bar");
        bar.style.height = `${num * 5}px`; // Adjust bar height
        arrayContainer.appendChild(bar);
    });
};
// ===== NEW PASSWORD VALIDATION HELPER =====
/**
 * Validates password strength
 * Rules:
 * - Minimum 8 characters
 * - At least 1 uppercase letter
 * - At least 1 lowercase letter
 * - At least 1 number
 * - At least 1 special character
 */
export const validatePassword = (password) => {
    const errors = [];

    if (!password.match(/[A-Z]/)) {
        errors.push("Add at least one uppercase letter");
    }
    if (!password.match(/[a-z]/)) {
        errors.push("Add at least one lowercase letter");
    }
    if (!password.match(/[0-9]/)) {
        errors.push("Add at least one number");
    }
    if (!password.match(/[!@#$%^&*(),.?":{}|<>]/)) {
        errors.push("Add at least one special character");
    }
    if (password.length < 8) {
        errors.push("Password must be at least 8 characters long");
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};
