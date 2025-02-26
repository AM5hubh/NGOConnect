import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../context/userContext";

const Loader = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-600">NGOConnect</h1>
        <div className="mt-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

const GoogleTranslate = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    return () => {
      const existingScript = document.querySelector(
        `script[src="${script.src}"]`
      );
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div id="google_translate_element" className="fixed top-4 right-4 z-50">
      🌐
    </div>
  );
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-20 right-2.5 z-50">
      <button
        onClick={toggleChatbot}
        className="w-14 h-14 bg-gradient-to-r from-[#011af7] to-[#713dcb] text-white rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 active:scale-90 flex items-center justify-center"
        aria-label="Toggle chat"
      >
        <span className="text-2xl">💬</span>
      </button>
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200">
          {/* Add your chatbot content here */}
          <div className="p-4">
            <h2 className="text-lg font-semibold">Chat Support</h2>
            {/* Add chat interface components */}
          </div>
        </div>
      )}
    </div>
  );
};

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Outlet />
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Footer />
    </div>
  );
}

export default Layout;
