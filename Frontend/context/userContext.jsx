import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [volunteer, setVolunteer] = useState(null);

  // Fetch the current user on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_RENDER_PATH}/users/current-user`,

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
  },[setUser]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_RENDER_PATH}/ngouser/current`,

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
             // Include cookies (if using refresh tokens)
          }
        );
        console.log(res)
        setUser(res.data.data); // Set the user data in state
      } catch (error) {
        console.error("Error fetching current user:", error);
        setUser(null); // Clear the user state if fetching fails
      }
    };

    if (!user) {
      fetchUser(); // Fetch user if not already fetched
    }
  },[setUser]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_RENDER_PATH}/admin/getcurrentadmin`,

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
            },
             // Include cookies (if using refresh tokens)
          }
        );
        console.log(res)
        setUser(res.data.data); // Set the user data in state
      } catch (error) {
        console.error("Error fetching current user:", error);
        setUser(null); // Clear the user state if fetching fails
      }
    };

    if (!user) {
      fetchUser(); // Fetch user if not already fetched
    }
  },[setUser]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_RENDER_PATH}/volunteer/allvolunteers`
        );
        setVolunteer(res.data.data); // Set the user data in state
      } catch (error) {
        console.error("Error fetching current volunteers:", error);
        setVolunteer(null); // Clear the user state if fetching fails
      }
    };

    if (!volunteer) {
      fetchUser(); // Fetch user if not already fetched
    }
  },[setVolunteer]);

  // Logout function to log the user out
  const logout = async () => {
    try {
      // await axios.post(
      //   "${import.meta.env.VITE_RENDER_PATH}/users/logout", 
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

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}