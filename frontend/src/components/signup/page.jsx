import React, { useState } from 'react';

function SignupForm() {
  const [isSignUp, setIsSignUp] = useState(true); // Toggle between signup and signin
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '', // Only used for signup
  });
  const [errors, setErrors] = useState({}); // Store validation errors
  const [submissionMessage, setSubmissionMessage] = useState(''); // Success/error message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors for the changed field
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (isSignUp && formData.name.trim() === '') {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    if (isSignUp && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionMessage(''); // Clear any previous messages

    if (!validateForm()) {
      return; // Stop if validation fails
    }

    // Simulate API call (replace with your actual API call)
    try {
      // In a real application, you would send the formData to your backend API.
      // Example using fetch (replace with your API endpoint):
      /*
      const response = await fetch('/api/signup', {  // Or '/api/signin'
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmissionMessage(isSignUp ? 'Signup successful!' : 'Signin successful!');
        // Redirect or perform other actions after successful signup/signin
      } else {
        // Handle API errors (e.g., user already exists, invalid credentials)
        setSubmissionMessage(data.message || 'An error occurred.');
      }
      */

      //Simulate a delay and success for this example:
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        setSubmissionMessage(isSignUp ? 'Signup successful!' : 'Signin successful!');
        setFormData({  //clear form after successful submission.
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
      });


    } catch (error) {
      console.error('Error during signup/signin:', error);
      setSubmissionMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${errors.name ? 'border-red-500' : ''}`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${errors.password ? 'border-red-500' : ''}`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {isSignUp && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${errors.confirmPassword ? 'border-red-500' : ''}`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </form>

        {submissionMessage && (
            <p className={`text-center mt-4 ${submissionMessage.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
                {submissionMessage}
            </p>
        )}

        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrors({}); // Clear errors when switching forms
              setSubmissionMessage(''); // Clear message
              setFormData({ // Clear the form when switching
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
              });
            }}
            className="text-sm text-indigo-600 hover:underline"
          >
            {isSignUp ? 'Already have an account? Sign In' : 'Create an account'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;