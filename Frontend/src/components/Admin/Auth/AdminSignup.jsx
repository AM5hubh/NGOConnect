import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const AdminSignup = () => {
  const navigate = useNavigate();
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
        `${import.meta.env.VITE_RENDER_PATH}/admin/register`,
        formData
      );
      localStorage.setItem("userId", res.data.date.userId);
      localStorage.setItem("email", res.data.date.email);
      toast.success("User registered successfully!");
      // navigate("/login");
      setShowOtpModal(true);
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
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      const email = localStorage.getItem("email");
      const res = await axios.post(
        `${import.meta.env.VITE_RENDER_PATH}/admin/verifyOtp`,
        { userId, email, otp }
      );
      console.log(res);
      // localStorage.setItem("accesstoken", res.data.accessToken);
      // localStorage.setItem("admin", res.data.admin.admin);
      // localStorage.setItem("isAdmin", res.data.admin.admin);
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
      toast.success(res.data.message);
      setShowOtpModal(false);
      window.location = "/login";
      //   navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
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
              Welcome to
              <br />
              NGOConnect
            </h1>
          </div>
        </div>

        <div className="bg-white p-8 w-full md:w-1/2 max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {["name", "email", "password"].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-gray-700 mb-1 capitalize"
                >
                  {field === "name" ? "Name" : field}
                </label>
                <input
                  type={field === "password" ? "password" : "text"}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition"
                  placeholder={`Enter your ${
                    field === "name" ? "full name" : field
                  }`}
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
            <Link
              to="/adminlogin"
              className="text-gray-800 hover:underline font-medium"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
      {showOtpModal && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          id="my-modal"
        >
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Enter OTP
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  We've sent an OTP to your email. Please enter it below to
                  verify your account.
                </p>
                <input
                  type="text"
                  className="mt-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                />
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-indigo-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={handleOtpSubmit}
                >
                  Verify OTP
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSignup;
