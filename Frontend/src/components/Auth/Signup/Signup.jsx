import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        formData
      );
      localStorage.setItem("accessToken", res.data);
      toast.success("User registered successfully!");
      navigate("/login");
    } catch (err) {
      const errorMessage =
        err.response?.data.messagetext ||
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        err.message ||
        "Something went wrong. Please try again.";

      console.error("Error response:", err.response);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="flex shadow-2xl rounded-lg overflow-hidden">
        <div className="hidden md:block relative w-1/2">
          <img
            src="https://media.istockphoto.com/id/593332654/photo/unity-of-indian-children-asia.jpg?b=1&s=612x612&w=0&k=20&c=jMON71kx1R_YaOvWPyw_TNc5lKc26h2vxN8238Tv9gY="
            className="w-full h-full object-cover"
            alt="NGO Connect"
          />
          <div className="absolute inset-0 bg-yellow-800 bg-opacity-30 flex items-center justify-center">
            <h1 className="text-center text-white font-bold text-4xl px-6 hover:scale-125 transition-transform duration-500 cursor-default">
              Welcome to<br />NGOConnect
            </h1>
          </div>
        </div>

        <div className="bg-white p-8 w-full md:w-1/2 max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {['fullname', 'email', 'username', 'password'].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-gray-700 mb-1 capitalize"
                >
                  {field === 'fullname' ? 'Full Name' : field}
                </label>
                <input
                  type={field === 'password' ? 'password' : 'text'}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition"
                  placeholder={`Enter your ${field === 'fullname' ? 'full name' : field}`}
                  required
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50 transition duration-200"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-gray-800 hover:underline font-medium">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;