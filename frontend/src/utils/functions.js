function hasNumber(str) {
  return /\d/.test(str);
}

function hasLetter(str) {
  return /[a-zA-Z]/.test(str);
}

function getMonthName(monthNumber) {
  const date = new Date(0, monthNumber - 1);
  return date.toLocaleDateString('en-US', { month: 'long' });
}

export { hasNumber, hasLetter, getMonthName };
