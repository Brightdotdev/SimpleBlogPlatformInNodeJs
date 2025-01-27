import React from 'react';

const Login = () => {
  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    const formData = new FormData(e.target); // Get form data
    const data = Object.fromEntries(formData);
    console.log(data)
  
};

  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>

          {/* Additional Links */}
          <div className="text-sm text-center mt-4 text-gray-600">
            <p>
              Don’t have an account?{' '}
              <a href="/signup" className="text-blue-500 hover:underline">
                Sign up
              </a>
            </p>
            <p>
              <a href="/forgot-password" className="text-blue-500 hover:underline">
                Forgot password?
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
