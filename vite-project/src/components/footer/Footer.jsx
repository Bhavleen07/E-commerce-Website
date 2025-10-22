import { useContext } from "react";
import { Link } from "react-router-dom";
import myContext from "../../context/data/myContext";
import { FaInstagram, FaYoutube, FaPinterest } from "react-icons/fa";

export default function Footer() {
  const context = useContext(myContext);
  const { mode } = context;

  return (
    <footer
      className="text-gray-600 body-font bg-gray-300"
      style={{
        backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
        color: mode === "dark" ? "white" : "",
      }}
    >
      <div
        className="bg-gray-200"
        style={{
          backgroundColor: mode === "dark" ? "rgb(55 57 61)" : "",
          color: mode === "dark" ? "white" : "",
        }}
      >
        <div className="container px-5 py-10 mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <Link to={"/"}>
              <h1
                className="text-2xl font-bold text-black px-2 py-1 rounded mb-4"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Kaurkrafts
              </h1>
            </Link>
            <p className="text-sm">
              Handmade Gifts & Crafts with love <br />A small business built with
              passion.
            </p>
          </div>

          {/* The Company */}
          <div>
            <h2 className="font-semibold mb-3">THE COMPANY</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/our-story" className="hover:underline">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:underline">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="hover:underline">
                  Site Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Orders & Support */}
          <div>
            <h2 className="font-semibold mb-3">ORDERS & SUPPORT</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/bulk-orders" className="hover:underline">
                  Bulk Orders
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:underline">
                  FAQ’s
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="font-semibold mb-3">SOCIAL MEDIA</h2>
            <div className="flex space-x-5 text-2xl">
              <a
                href="https://www.instagram.com/kaur.krafts?igsh=MXhyNTZ3Z2JlMG00eQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-600 transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href="https://youtube.com/@kaur.krafts?si=pAYZHRJSnDq0XFwt"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-600 transition-colors"
              >
                <FaYoutube />
              </a>
              <a
                href="https://pin.it/6IC2XwkU9"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-500 transition-colors"
              >
                <FaPinterest />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Bottom */}
        <div className="text-center py-4 border-t border-gray-400 mt-5">
          <p
            className="text-sm text-gray-500"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            © 2025 Kaurkrafts — All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
