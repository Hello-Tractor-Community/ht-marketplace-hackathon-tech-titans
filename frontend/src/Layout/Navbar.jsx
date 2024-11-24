import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const storedUser = localStorage.getItem("user_data");
  const getUserData = async () => {
    try {
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear all data from localStorage
    setUser(null); // Clear user state
    navigate("/"); // Redirect to home page or login
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
    { to: "/cart", label: "My Cart" },
    { to: "/wish-list", label: "My WishList" },
    { to: "/messages", label: "Messages" },
  ];

  const guestLinks = [
    { to: "/", label: "Home" },
    { to: "/listings", label: "Listings" },
    { to: "/cart", label: "Cart" },
    { to: "/wish-list", label: "WishList" },
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
          <NavLink to="/" className="text-xl font-bold">
            Hello Tractor
          </NavLink>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {userLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `hover:text-sunsetBlaze ${
                  isActive
                    ? "border-b-2 border-sunsetBlaze"
                    : "border-b-2 border-transparent"
                } pb-1`
              }
            >
              {link.label}
            </NavLink>
          ))}
          {user && (
            <>
            <div
              className="cursor-pointer rounded-full bg-white w-8 h-8 flex items-center justify-center text-plum font-bold"
              onClick={() => navigate("/profile")}
            >
              {user?.firstName?.charAt(0).toUpperCase() || "U"}
            </div>
            <button
                onClick={handleLogout}
                className="text-sunsetBlaze px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition duration-300"
              >
                Logout
              </button>
            </>
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
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block hover:text-sunsetBlaze ${
                  isActive
                    ? "border-b-2 border-sunsetBlaze"
                    : "border-b-2 border-transparent"
                } pb-1`
              }
            >
              {link.label}
            </NavLink>
          ))}
          {user && (
            <div
              className="cursor-pointer rounded-full bg-white w-8 h-8 flex items-center justify-center text-plum font-bold"
              onClick={() => {
                setIsOpen(false);
                navigate("/profile");
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
