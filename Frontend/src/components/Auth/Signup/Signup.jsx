// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import { handleError, handleSuccess } from "../../../utils";

// function Signup() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullname: "",
//     email: "",
//     username: "",
//     password: "",
//     avatar: "",
//     coverImage: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form Data Submitted: ", formData);
//     const { fullname, email, username, password, coverImage, avatar } = formData;
//     // try {
//     //   await axios.post(
//     //     "http://localhost:8000/api/v1/users/register",
//     //     {
//     //       fullname,
//     //       email,
//     //       username,
//     //       password,
//     //       coverImage,
//     //       avatar
//     //     }
//     //   )
//     //   // console.log(formData)
//     //   // if (formData.error) {
//     //   //   toast.error(formData.error);
//     //   //   console.log("error", formData.error);
//     //   // } else {
//     //   //   setFormData({});
//     //   //   toast.success(formData.response);
//     //   //   console.log("success", formData.response);
//     //   //   navigate("/Login");
//     //   // }
//     //   // navigate('/');
//     // } catch (err) {
//     //   toast.error(err?.data?.message || err.error || err.message);
//     // }

//     try {
//       const res = await axios.post(
//             "http://localhost:8000/api/v1/users/register",
//             {
//               fullname,
//               email,
//               username,
//               password,
//               coverImage,
//               avatar
//             }
//       );
//       // Access the data from the response
//       dispatch(setCredentials({ ...res.data }));
//       navigate('/');
// } catch (err) {
//       const errorMessage = err.response?.data?.message || err?.response?.data?.message || err.message || "Something went wrong";
//       // Handle errors properly by accessing err.response
//       // toast.error(err?.response?.data?.message || err.message || "An error occurred");
//       toast.error(errorMessage);
// }

    
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-6">NGO Signup</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label
//               htmlFor="fullname"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Full Name
//             </label>
//             <input
//               type="text"
//               id="fullname"
//               name="fullname"
//               value={formData.fullname}
//               onChange={handleChange}
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//               placeholder="Enter your full name"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="username"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//               placeholder="Choose a username"
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//               placeholder="Enter a password"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
//           >
//             Sign Up
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Signup;



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
        // coverImage,
        // avatar,
      });
      
      console.log(formData)
      const errorMessage =
        res.err.response?.data?.message || 
        res.err.response?.data?.errors?.[0]?.msg || // If there are specific validation errors
        res.err.message || 
        "Something went wrong. Please try again.";
        
        if (res.err) {
          console.log("hello")
          toast.error("toast",errorMessage);
        console.log("error", errorMessage);
      } else {
        // setFormData({});
        // toast.success(res.response);
        // console.log("success", formData.response);
        toast.success("User registered successfully!");
        navigate("/login");
      }
      // Success notification
      

      // Optional: Navigate to another page on successful registration
      // navigate("/login");
      // Your code that may throw an error
  } catch (err) {
      // Extract the error message from the response
      const errorMessage =
          err.response?.data?.message || 
          err.response?.data?.errors?.[0]?.msg || // Specific validation errors
          err.message || 
          "Something went wrong. Please try again.";
          // let message = defaultErrorMessage;
          
        
          // Log the error response for debugging
          console.error('Error response:', err.response?.data);
        
          // Show error using toast (assuming toast is properly set up)
          toast.error(err.response?.data.Error);
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
