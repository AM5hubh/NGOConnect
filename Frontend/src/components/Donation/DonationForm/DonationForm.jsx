import React, { useState, useEffect } from "react";

const DonationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    message: ""
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success"); // success or error

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add your donation submission logic here
      setAlertType("success");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      setAlertType("error");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {/* Alert Component */}
      {showAlert && (
        <div className={`mb-4 p-4 rounded-lg ${
          alertType === "success" 
            ? "bg-green-100 border border-green-400 text-green-700" 
            : "bg-red-100 border border-red-400 text-red-700"
          }`}
        >
          <p className="text-sm">
            {alertType === "success" 
              ? "Donation submitted successfully!" 
              : "Error submitting donation. Please try again."}
          </p>
        </div>
      )}

      {/* Card Component */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-[#011af7] to-[#713dcb] p-6">
          <h2 className="text-2xl font-bold text-white">Make a Donation</h2>
          <p className="text-white/80 mt-2">Your support makes a difference</p>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Amount Input */}
            <div>
              <label 
                htmlFor="amount" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Donation Amount (₹)
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Enter amount"
                min="1"
                required
              />
            </div>

            {/* Message Input */}
            <div>
              <label 
                htmlFor="message" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Message (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                placeholder="Enter your message"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#011af7] to-[#713dcb] text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Make Donation
            </button>
          </form>

          {/* Secure Payment Notice */}
          <div className="mt-6 text-center text-sm text-gray-500 flex items-center justify-center">
            <svg 
              className="w-4 h-4 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Secure Payment by Razorpay
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationForm;