import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../assets/logo.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const storedUser= localStorage.getItem('user_data');
  const getUserData = async () => {
    try {
      if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      setUser(null)
    }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserData();
  }, [storedUser]);

  // Links for authenticated users based on userType
  const adminLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/users", label: "Users" },
    { to: "/settings", label: "Settings" },
  ];

  const sellerLinks = [
    { to: "/seller/products", label: "My Listings" },
    { to: "/messages", label: "Messages" },
  ];

  const buyerLinks = [
    { to: "/listings", label: "Listings" },
    { to: "/my-orders", label: "My Orders" },
    { to: "/messages", label: "Messages" },
  ];

  // Links for unauthenticated users
  const guestLinks = [
    { to: "/", label: "Home" },
    {to:'/listings',label: "Listings"},
    { to: "/login", label: "Login" },
    { to: "/register", label: "Register" },
  ];

  // Determine which links to render based on userType
  const userLinks = user
    ? user.userType === "admin"
      ? adminLinks
      : user.userType === "seller"
      ? sellerLinks
      : buyerLinks 
    : guestLinks; 

  return (
    <nav className="bg-plum text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Hello Tractor Logo" className="h-8 w-auto" />
          <Link to="/" className="text-xl font-bold">
            Hello Tractor
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {userLinks.map((link) => (
            <Link key={link.to} to={link.to} className="hover:text-sunsetBlaze">
              {link.label}
            </Link>
          ))}
          {user && (
            <div
              className="cursor-pointer rounded-full bg-white w-8 h-8 flex items-center justify-center text-plum font-bold"
              onClick={() => navigate('/profile')} // Navigate to profile
            >
              {user?.firstName?.charAt(0).toUpperCase() || "U"}
            </div>
          )}
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
          {userLinks.map((link) => (
            <Link key={link.to} to={link.to} className="block hover:text-sunsetBlaze">
              {link.label}
            </Link>
          ))}
          {user && (
            <div
              className="cursor-pointer rounded-full bg-white w-8 h-8 flex items-center justify-center text-plum font-bold"
              onClick={() => {
                setIsOpen(false); // Close mobile menu
                navigate('/profile'); // Navigate to profile
              }}
            >
              {user?.firstName?.charAt(0).toUpperCase() || "U"}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
