function hasNumber(str) {
    return /\d/.test(str);
}

function hasLetter(str) {
    return /[a-zA-Z]/.test(str);
}

export { hasNumber, hasLetter };
