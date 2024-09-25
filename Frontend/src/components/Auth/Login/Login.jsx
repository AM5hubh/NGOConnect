import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    const { email, password } = formData;

    try {
      // Send POST request to backend for user registration
      const res = await axios.post("http://localhost:8000/api/v1/users/login", {
        email,
        password,
      });
      // console.log("Data",res.data.data.accessToken)
      localStorage.setItem("accessToken", res.data.data.accessToken);
      window.location = "/";
      // If the registration is successful
      toast.success("User logged in successfully!");
      // navigate("/"); // Redirect to login after successful registration
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
      toast.error(errorMessage);
    }
  };
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-100">
  //       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
  //         <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h2>
  //         <form onSubmit={handleSubmit}>
  //           <div className="mb-4">
  //             <label className="block text-gray-700">Email</label>
  //             <input
  //               id="email"
  //               name="email"
  //               type="email"
  //               value={formData.email}
  //               onChange={handleChange}
  //               className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
  //               placeholder="Enter your email"
  //               required
  //             />
  //           </div>
  //           <div className="mb-6">
  //             <label className="block text-gray-700">Password</label>
  //             <input
  //               type="password"
  //               id="password"
  //               name="password"
  //               value={formData.password}
  //               onChange={handleChange}
  //               className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
  //               placeholder="Enter your password"
  //             />
  //           </div>
  //           <button
  //             type="submit"
  //             className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
  //           >
  //             Login
  //           </button>
  //         </form>
  //         <p className="text-center text-gray-500 mt-4">
  //           Don't have an account? <a href="/signup" className="text-blue-600">Sign Up</a>
  //         </p>
  //       </div>
  //     </div>
  //   );
  // };

  // export default Login;

  // import React, { useState } from "react";
  // import { useNavigate } from "react-router-dom";
  // import { toast } from "react-hot-toast";
  // import axios from "axios";

  // const Login = () => {
  //   const navigate = useNavigate();
  //   const [formData, setFormData] = useState({
  //     email: "",
  //     password: "",
  //   });

  //   // Handle input change
  //   const handleChange = (e) => {
  //     setFormData({
  //       ...formData,
  //       [e.target.name]: e.target.value,
  //     });
  //   };

  //   // Handle form submission
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     const { email, password } = formData;

  //     try {
  //       // Send POST request for login
  //       const res = await axios.post("http://localhost:8000/api/v1/users/login", {
  //         email,
  //         password,
  //       });

  //       // If login is successful
  //       toast.success("Login successful!");
  //       navigate("/dashboard"); // Redirect to dashboard after successful login
  //     } catch (err) {
  //       const errorMessage =
  //         err.response?.data?.message ||
  //         err.message ||
  //         "Something went wrong. Please try again.";

  //       console.error("Error response:", err.response?.data.messagetext);
  //       console.error("Error response:", err.response);

  //       // Display error using toast
  //       toast.error(errorMessage);
  //     }
  //   };

  return (
    <div className="min-h-screen flex justify-center items-center ">
      {/* Left Section: Image */}
      {/* <div
        className=" hidden lg:flex items-center justify-center bg-cover bg-center min-h-screen"
        // style={{
        //   backgroundImage:
        //     'url("https://media.istockphoto.com/id/593332654/photo/unity-of-indian-children-asia.jpg?b=1&s=612x612&w=0&k=20&c=jMON71kx1R_YaOvWPyw_TNc5lKc26h2vxN8238Tv9gY=")', // Replace with your image URL
        // }}
      >
        <img src="https://media.istockphoto.com/id/593332654/photo/unity-of-indian-children-asia.jpg?b=1&s=612x612&w=0&k=20&c=jMON71kx1R_YaOvWPyw_TNc5lKc26h2vxN8238Tv9gY=" className="h-full"/>
      </div> */}

      {/* Right Section: Form */}
      <div className="flex">
        <div className="min-h-full relative">
          <img
            src="https://media.istockphoto.com/id/593332654/photo/unity-of-indian-children-asia.jpg?b=1&s=612x612&w=0&k=20&c=jMON71kx1R_YaOvWPyw_TNc5lKc26h2vxN8238Tv9gY="
            className="w-full h-full object-cover blur-sm"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-center text-white font-semibold text-4xl">Welcome to<br></br>NGOConnect</h1>
          </div>
        </div>

        <div className="bg-white p-8 rounded-8 shadow-lg w-full max-w-md z-20">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-yellow-600 rounded-md focus:ring-yellow-600 focus:border-yellow-600"
                placeholder="Enter your email"
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
                className="mt-1 block w-full p-2 border border-yellow-600 rounded-md focus:ring-yellow-600 focus:border-yellow-600"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-yellow-600 text-white rounded-md hover:bg-white hover:text-yellow-600 hover:border-yellow-600 transition border-2 border-yellow-600"
            >
              Login
            </button>
          </form>
          <p className="text-center text-gray-500 mt-4">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-black">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
