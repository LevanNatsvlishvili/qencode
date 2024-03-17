const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
  }
  return emailRegex.test(email);
};

const validatePassword = (password: string) => {
  const emailRegex = password.length >= 8 ? true : false;
  if (!emailRegex) {
    alert('Password must be at least 8 characters long.');
  }
  return emailRegex;
};
const validatePasswordMatch = (password: string, passwordConfirm: string) => {
  const isMatch = password === passwordConfirm ? true : false;
  if (!isMatch) {
    alert('Password must be at least 8 characters long.');
  }
  return isMatch;
};

export { validateEmail, validatePassword, validatePasswordMatch };
