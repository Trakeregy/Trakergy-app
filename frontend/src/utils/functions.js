function hasNumber(str) {
  return /\d/.test(str);
}

function hasLetter(str) {
  return /[a-zA-Z]/.test(str);
}

function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', { month: 'long' });
}

export { hasNumber, hasLetter, getMonthName };
