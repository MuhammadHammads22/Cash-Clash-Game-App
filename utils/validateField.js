export const validateField = (value, field, setError, setIsError,password='') => {
    let errorMessage = '';
    let isValid = true;
  
    // Step 1: Check if the field is empty or null
    if (!value.trim()) {
      errorMessage = `${field} cannot be empty.`;
      isValid = false;
    }
    else{
  
    // Step 2: Field-specific validations
    switch (field.toLowerCase()) {
      case 'email':
        // Check if email format is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errorMessage = 'Invalid email address.';
          isValid = false;
        }
        break;
      case 'password':
        // Check password strength (at least 8 characters, 1 uppercase, 1 number)
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(value)) {
          errorMessage = 'Password must be at least 8 characters long, with at least 1 uppercase letter and 1 number.';
          isValid = false;
        }
        break;
      case 'name':
        // Check name validity (can be adjusted as needed)
        const nameRegex = /^[A-Za-z0-9_]+$/; // Allows alphabets, numbers, and underscores
        if (!nameRegex.test(value)) {
          errorMessage = 'Name should only contain letters and spaces.';
          isValid = false;
        }
        break;
      case 'confirm password':
        // Check if confirm password matches the password
        if (value !== password) {
          errorMessage = 'Passwords do not match.';
          isValid = false;
        }
        break;
      default:
        break;
    }
  }
  
    // Step 3: Set error message and error state
    setError(errorMessage);
    setIsError(!isValid);
    return isValid;
  };
  