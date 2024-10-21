import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../../context/userContext.jsx";
import { Menu, X, ChevronDown } from "lucide-react";
import GoogleTranslate from "../GTranslate/GoogleTranslate.jsx";
import { useEffect } from "react";

export default function Header() {
  // const [user,setUser] = useState(null)
  // const currentuser = axios.get("http://localhost:8000/api/v1/users/current-user").then(({data}) =>{ setUser(data)})
  // const { logout } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [user, setUser] = useState(null);

  // Fetch the current user on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/users/current-user",

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
             // Include cookies (if using refresh tokens)
          }
        );
        setUser(res.data.data); // Set the user data in state
      } catch (error) {
        console.error("Error fetching current user:", error);
        setUser(null); // Clear the user state if fetching fails
      }
    };

    if (!user) {
      fetchUser(); // Fetch user if not already fetched
    }
  });
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/admin/getcurrentadmin",

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
             // Include cookies (if using refresh tokens)
          }
        );
        setUser(res.data.data); // Set the user data in state
      } catch (error) {
        console.error("Error fetching current user:", error);
        setUser(null); // Clear the user state if fetching fails
      }
    };

    if (!user) {
      fetchUser(); // Fetch user if not already fetched
    }
  });
  const logout = async () => {
    try {
      // await axios.post(
      //   "http://localhost:8000/api/v1/users/logout", 
      //   {}, 
      //   { headers: {
      //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      //     }, } // Ensures that cookies are included
      // );

      // Clear user data and localStorage tokens
      localStorage.removeItem("accessToken");
      setUser(null); // Reset the user state after logout

      toast.success("User logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleClick = () => {
    setShowButton(!showButton); // Toggle button visibility
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="bg-gray-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center gap-2 cursor pointer">
              {/* <span className='text-blue-300 text-center font-bold'>LegacyNet</span> */}
              <span className="text-xl font-bold">
                <img src="/shortw.png" className=" h-12" />
              </span>
            </NavLink>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink
                  to="/"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                >
                  Home
                </NavLink>
                {/* <div className="relative">
                  <button onClick={toggleDropdown} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 flex items-center">
                    Services
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Service 1</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Service 2</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Service 3</a>
                      </div>
                    </div>
                  )}
                </div> */}
                {/* <NavLink to="/donations" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Contribute</NavLink> */}
                <NavLink
                  to="/donations"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                >
                  Donation
                </NavLink>
                <NavLink
                  to="/NGOcards"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                >
                  Search NGO
                </NavLink>
                <NavLink
                  to="/volunteer"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                >
                  Volunteers
                </NavLink>
              </div>
            </div>
          </div>
          <div className="hidden md:block flex">
            {user ? (
              <div
                className="flex justify-center items-center gap-4 "
                onClick={handleClick}
              >
                <div className="">
                  <div className="flex justify-center items-center border rounded-full w-10 h-10 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      width="20px"
                      fill="white"
                    >
                      <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
                    </svg>
                  </div>

                  {showButton && (
                    <div className="absolute bg-white p-5 rounded-xl flex text-center justify-center z-50">
                      <button className="text-red-500" onClick={logout}>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
                <h1>Hello!! {user.fullname || user.name}.</h1>
              </div>
            ) : (
              <div className="ml-4 flex items-center md:ml-6">
                <NavLink
                  to="/login"
                  className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium ml-2"
                >
                  Sign up
                </NavLink>
                <NavLink
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium ml-2"
                >
                  Register NGO
                </NavLink>
              </div>
            )}
          </div>
            {/* <div>
              <GoogleTranslate />
            </div> */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
            >
              Home
            </a>
            <button
              onClick={toggleDropdown}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 flex items-center justify-between"
            >
              Services
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {isDropdownOpen && (
              <div className="pl-4">
                <a
                  href="#"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                >
                  Service 1
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                >
                  Service 2
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                >
                  Service 3
                </a>
              </div>
            )}
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
            >
              About
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
            >
              Contact
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center text-center px-5">
              <NavLink
                to="/login"
                className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-md text-base font-medium w-full"
              >
                Login
              </NavLink>
            </div>
            <div className="mt-3 flex items-center text-center px-5">
              <NavLink
                to="/signup"
                className="bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded-md text-base font-medium w-full"
              >
                Sign up
              </NavLink>
            </div>
            <div className="mt-3 flex items-center text-center px-5">
              <NavLink
                to="/register"
                className="bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded-md text-base font-medium w-full"
              >
                Register NGO
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
    // <header className="shadow-xl sticky z-50 top-0 rounded-b-2xl">
    //   <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
    //     <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
    //       <Link to="/" className="flex items-center">
    //         <img
    //           src="https://res.cloudinary.com/dvv99sjjl/image/upload/v1725102940/mbixwt2ub41viw1i7yud.png"
    //           className="mr-3 h-12"
    //           alt="Logo"
    //         />
    //       </Link>

    //       <div
    //         className="justify-between items-center w-full lg:flex lg:w-auto lg:order-1 gap-5"
    //         id="mobile-menu-2"
    //       >
    //         <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 ">
    //           <li>
    //             <NavLink
    //               to="/"
    //               className={({ isActive }) =>
    //                 `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100
    //                                     ${
    //                                       isActive
    //                                         ? "text-orange-700"
    //                                         : "text-gray-700"
    //                                     } lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
    //               }
    //             >
    //               Home
    //             </NavLink>
    //           </li>
    //           <li>
    //             <NavLink
    //               to="/about"
    //               className={({ isActive }) =>
    //                 `block py-2 pr-4 pl-3 duration-300 border-b border-gray-100
    //                                     ${
    //                                       isActive
    //                                         ? "text-orange-700"
    //                                         : "text-gray-700"
    //                                     } lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
    //               }
    //             >
    //               About Us
    //             </NavLink>
    //           </li>
    //           <li>
    //             <NavLink
    //               to="/programs"
    //               className={({ isActive }) =>
    //                 `py-2 pr-4 pl-3 duration-300 border-b border-gray-100 ${
    //                   isActive ? "text-orange-700" : "text-gray-700"
    //                 } lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
    //               }
    //             >
    //               <select>
    //                 <option>Programs</option>
    //               </select>
    //             </NavLink>
    //           </li>
    //         </ul>
    //         <ul>
    //           {user ? (
    //             <div className="flex justify-center items-center gap-4">
    //               {/* <h1>Welcome, {user.fullname}!</h1>
    //           <p>Email: {user.email}</p> */}
    //               <div className="">
    //                 <div
    //                   className="flex justify-center items-center border rounded-full w-10 h-10 cursor-pointer"
    //                   onClick={handleClick}
    //                 >
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     viewBox="0 0 448 512"
    //                     width="20px"
    //                   >
    //                     <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
    //                   </svg>
    //                 </div>

    //                 {showButton && (
    //                   <div className="absolute bg-white p-5 rounded-xl flex text-center justify-center">
    //                     <button className="text-red-500" onClick={logout}>
    //                       Logout
    //                     </button>
    //                   </div>
    //                 )}
    //               </div>
    //               <h1>Hello!! {user.fullname}.</h1>
    //             </div>

    //           ) : (
    //             <div className="flex items-center lg:order-2 ml-5">
    //               <Link
    //                 to="/signup"
    //                 className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
    //               >
    //                 Log in
    //                 {/* <h1>{}</h1> */}
    //               </Link>
    //             </div>
    //           )}
    //         </ul>
    //       </div>
    //     </div>
    //   </nav>
    // </header>
  );
}
