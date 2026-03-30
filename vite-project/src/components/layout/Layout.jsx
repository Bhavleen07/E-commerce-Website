import React from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="content">{children}</div>
      <Footer />

      {/* ✅ WhatsApp Floating Button */}
      <a
        href="https://wa.me/918699741106?text=Hello%20Kaurkrafts%20I%20need%20a%20custom%20gift"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 group"
      >
        {/* Tooltip */}
        <span className="absolute right-14 bottom-3 bg-black text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap">
          Chat with us
        </span>

        {/* Button */}
        <div className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center animate-bounce">
          
          {/* WhatsApp Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-6 h-6"
            fill="currentColor"
          >
            <path d="M16 .4C7.3.4.3 7.4.3 16c0 2.8.7 5.5 2.1 7.9L0 32l8.3-2.2c2.3 1.2 4.9 1.9 7.7 1.9 8.7 0 15.7-7 15.7-15.6S24.7.4 16 .4zm0 28.7c-2.4 0-4.8-.6-6.8-1.8l-.5-.3-4.9 1.3 1.3-4.8-.3-.5c-1.3-2.1-2-4.5-2-7 0-7.4 6-13.4 13.3-13.4s13.3 6 13.3 13.4-6 13.4-13.3 13.4z" />
          </svg>

        </div>
      </a>
    </div>
  );
}

export default Layout;
