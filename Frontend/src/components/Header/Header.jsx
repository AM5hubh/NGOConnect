import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../../context/userContext.jsx";

export default function Header() {
  // const [user,setUser] = useState(null)
  // const currentuser = axios.get("http://localhost:8000/api/v1/users/current-user").then(({data}) =>{ setUser(data)})
  const { user, setUser, logout } = useContext(UserContext);
  const [showButton, setShowButton] = useState(false);

  const handleClick = () => {
    setShowButton(!showButton); // Toggle button visibility
  };

  return (
    <header className="shadow-xl sticky z-50 top-0 rounded-b-2xl">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img
              src="https://res.cloudinary.com/dvv99sjjl/image/upload/v1725102940/mbixwt2ub41viw1i7yud.png"
              className="mr-3 h-12"
              alt="Logo"
            />
          </Link>

          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1 gap-5"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 ">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
                                        ${
                                          isActive
                                            ? "text-orange-700"
                                            : "text-gray-700"
                                        } lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-300 border-b border-gray-100 
                                        ${
                                          isActive
                                            ? "text-orange-700"
                                            : "text-gray-700"
                                        } lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/programs"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-300 border-b border-gray-100 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  <select>
                    <option>Programs</option>
                  </select>
                </NavLink>
              </li>
            </ul>
            <ul>
              {user ? (
                <div className="flex justify-center items-center gap-4">
                  {/* <h1>Welcome, {user.fullname}!</h1>
              <p>Email: {user.email}</p> */}
                  <div className="">
                    <div
                      className="flex justify-center items-center border rounded-full w-10 h-10 cursor-pointer"
                      onClick={handleClick}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        width="20px"
                      >
                        <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
                      </svg>
                    </div>

                    {showButton && (
                      <div className="absolute bg-white p-5 rounded-xl flex text-center justify-center">
                        <button className="text-red-500" onClick={logout}>
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                  <h1>Hello!! {user.fullname}.</h1>
                </div>

              ) : (
                <div className="flex items-center lg:order-2 ml-5">
                  <Link
                    to="/signup"
                    className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                  >
                    Log in
                    {/* <h1>{}</h1> */}
                  </Link>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
