import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../context/userContext";

function Layout() {
  return (
    <>
      <UserContextProvider>
        <Header />
        <Outlet />
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        <Footer />
      </UserContextProvider>
    </>
  );
}

export default Layout;
