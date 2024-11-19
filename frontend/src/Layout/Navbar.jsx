import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from '../assets/logo.jpg'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-plum text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
      <img src={Logo} alt="Hello Tractor Logo" className="h-8 w-auto" />
      <Link to="/" className="text-xl font-bold">Hello Tractor</Link>
    </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-sunsetBlaze">Home</Link>
          <Link to="/listings" className="hover:text-sunsetBlaze">Listings</Link>          
          <Link to="/messages" className="hover:text-sunsetBlaze">Message</Link>
          <Link to="/login" className="hover:text-sunsetBlaze">Login</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-sunsetBlaze focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-plum text-white space-y-2 px-4 py-4">
          <Link to="/" className="block hover:text-sunsetBlaze">Home</Link>
          <Link to="/listings" className="block hover:text-sunsetBlaze">Listings</Link>
          <Link to="/login" className="block hover:text-sunsetBlaze">Login</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
