import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-plum text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">About Us</h2>
          <p className="text-sm">
            Hello Tractor is your trusted platform for buying, selling, and managing agricultural equipment. Join us in revolutionizing farming.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-sunsetBlaze transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-sunsetBlaze transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/listings" className="hover:text-sunsetBlaze transition">
                Listings
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-sunsetBlaze transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Follow Us</h2>
          <ul className="flex space-x-4">
            <li>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sunsetBlaze transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12a10 10 0 1 0-11.65 9.95v-7.04h-3.08v-2.91h3.08V9.92c0-3.06 1.83-4.75 4.63-4.75 1.34 0 2.75.24 2.75.24v3h-1.55c-1.53 0-2.02.95-2.02 1.91v2.29h3.44l-.55 2.91h-2.89V22A10 10 0 0 0 22 12z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sunsetBlaze transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.155 11.675-11.495 0-.175 0-.349-.012-.523A8.18 8.18 0 0 0 22 5.92a8.3 8.3 0 0 1-2.356.631 4.075 4.075 0 0 0 1.804-2.235 8.19 8.19 0 0 1-2.605.985A4.108 4.108 0 0 0 11.845 8.09a11.65 11.65 0 0 1-8.457-4.236 4.023 4.023 0 0 0 1.268 5.482A4.103 4.103 0 0 1 2.8 8.39v.052a4.107 4.107 0 0 0 3.292 4.015 4.106 4.106 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.845A8.233 8.233 0 0 1 2 18.407a11.616 11.616 0 0 0 6.29 1.816" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sunsetBlaze transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.35 3.608 1.324.975.975 1.261 2.242 1.324 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.35 2.633-1.324 3.608-.975.975-2.242 1.261-3.608 1.324-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.35-3.608-1.324-.975-.975-1.261-2.242-1.324-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.35-2.633 1.324-3.608.975-.975 2.242-1.261 3.608-1.324 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.012-4.947.072-1.268.06-2.667.342-3.66 1.335-.992.992-1.275 2.392-1.335 3.66-.06 1.28-.072 1.688-.072 4.947s.012 3.667.072 4.947c.06 1.268.342 2.667 1.335 3.66.992.992 2.392 1.275 3.66 1.335 1.28.06 1.688.072 4.947.072s3.667-.012 4.947-.072c1.268-.06 2.667-.342 3.66-1.335.992-.992 1.275-2.392 1.335-3.66.06-1.28.072-1.688.072-4.947s-.012-3.667-.072-4.947c-.06-1.268-.342-2.667-1.335-3.66-.992-.992-2.392-1.275-3.66-1.335-1.28-.06-1.688-.072-4.947-.072zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0-2.88 1.44 1.44 0 0 0 0 2.88z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-8 border-t border-gray-600 pt-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Tech Titans. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
