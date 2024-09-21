import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
    avatar: "",
    coverImage: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Destructuring formData
    const { fullname, email, username, password } = formData;

    try {
      // Send POST request to backend for user registration
      const res = await axios.post("http://localhost:8000/api/v1/users/register", {
        fullname,
        email,
        username,
        password,
      });

      // If the registration is successful
      toast.success("User registered successfully!");
      navigate("/login"); // Redirect to login after successful registration
    } catch (err) {
      // Extract the error message from the response
      const errorMessage =
        err.response?.data.messagetext ||
        err.response?.data?.message || // Backend error message
        err.response?.data?.errors?.[0]?.msg || // Specific validation error (if any)
        err.message || // Axios error message
        "Something went wrong. Please try again."; // Default fallback message

      // Log the error for debugging (optional)
      console.error("Error response:", err.response?.data.messagetext);
      console.error("Error response:", err.response);

      // Display error using toast (assuming toast is properly set up)
      toast.error(err.response?.data.statusCode , errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">NGO Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Choose a username"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter a password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
