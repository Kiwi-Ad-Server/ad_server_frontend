// Validates email format
export const validateEmail = (email) => {
  if (!email) return "Email is required"; // Check if the email is empty
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return "Invalid email format";
  }
  return ""; // Return an empty string if there are no errors
};

// Validates password length
export const validatePassword = (password) => {
  if (!password) return "Password is required"; // Check if the password is empty
  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }
  return ""; // Return an empty string if there are no errors
};
