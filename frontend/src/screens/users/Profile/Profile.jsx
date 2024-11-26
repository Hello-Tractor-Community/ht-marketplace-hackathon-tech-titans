import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const [tab, setTab] = useState("personaldetails");
  const [userData, setUserData] = useState(null);
  const [showComingSoon, setShowComingSoon] = useState(false);

  // Fetch user data from localStorage
  const getUserData = async () => {
    try {
      const userJson = localStorage.getItem("user_data");
      const user = userJson ? JSON.parse(userJson) : null;
      setUserData(user);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="container mx-auto p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-8 text-plum">
        My Profile
      </h1>

      {/* Tabs Navigation */}
      <div className="flex justify-center mb-6">
        {[
          { label: "Personal Details", icon: "👤", visibleTo: ["buyer", "seller"] },
          { label: "Company Details", icon: "🏢", visibleTo: ["seller"] },
          { label: "Services", icon: "💼", visibleTo: ["seller"] },
          { label: "Activity Logs", icon: "📜", visibleTo: ["buyer", "seller"] },
        ].map(
          (item, index) =>
            item.visibleTo.includes(userData?.userType) && (
              <button
                key={index}
                onClick={() => setTab(item.label.toLowerCase().replace(" ", ""))}
                className={`px-4 py-2 mx-2 rounded-lg font-medium transition duration-300 flex items-center ${
                  tab === item.label.toLowerCase().replace(" ", "")
                    ? "bg-sunsetBlaze text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <span className="mr-2 text-lg">{item.icon}</span>
                {item.label}
              </button>
            )
        )}
      </div>

      {/* Content Section */}
      <motion.div
        className="bg-white shadow-md rounded-lg p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {tab === "personaldetails" && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-plum">
              Personal Details
            </h2>
            <p>
              <strong>First Name:</strong> {userData?.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {userData?.lastName}
            </p>
            <p>
              <strong>Middle Name:</strong> {userData?.middleName}
            </p>
            <p>
              <strong>Email:</strong> {userData?.email}
            </p>
          </div>
        )}
        {tab === "companydetails" && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-plum">
              Company Details
            </h2>
            <p>
              <strong>Name:</strong> {userData?.companyDetails?.name}
            </p>
            <p>
              <strong>Description:</strong> {userData?.companyDetails?.description}
            </p>
            <p>
              <strong>Phone:</strong> {userData?.companyDetails?.phone}
            </p>
            <p>
              <strong>Email:</strong> {userData?.companyDetails?.email}
            </p>
          </div>
        )}
        {tab === "services" && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-plum">
              Services Offered
            </h2>
            <ul className="list-disc pl-6">
              {userData?.servicesOffered?.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>
        )}
        {tab === "activitylogs" && (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4 text-plum">
              Activity Logs
            </h2>
            <p className="text-gray-600">Coming Soon...</p>
            {/* Cartoon SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
              className="w-32 h-32 mt-4"
            >
              <circle cx="100" cy="100" r="100" fill="#FFD93D" />
              <circle cx="70" cy="80" r="15" fill="#FFFFFF" />
              <circle cx="130" cy="80" r="15" fill="#FFFFFF" />
              <circle cx="70" cy="80" r="8" fill="#000" />
              <circle cx="130" cy="80" r="8" fill="#000" />
              <path
                d="M60 130c20 20 60 20 80 0"
                fill="none"
                stroke="#000"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}
      </motion.div>

      {/* Edit Profile Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => setShowComingSoon(true)}
          className="bg-sunsetBlaze text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300 flex items-center"
        >
          <span className="mr-2">✨</span>Edit Profile
        </button>
      </div>

      {/* Coming Soon Popup */}
      {showComingSoon && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4 text-plum">Coming Soon</h2>
            <p className="text-gray-700">
              This feature is under development and will be available soon.
            </p>
            {/* Cartoon SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
              className="w-32 h-32 mx-auto mt-4"
            >
              <circle cx="100" cy="100" r="100" fill="#6A67CE" />
              <rect x="60" y="80" width="80" height="40" rx="10" fill="#FFFFFF" />
              <rect x="80" y="100" width="40" height="20" rx="5" fill="#FFD93D" />
              <circle cx="90" cy="90" r="5" fill="#000" />
              <circle cx="110" cy="90" r="5" fill="#000" />
              <path
                d="M90 115c5 5 15 5 20 0"
                fill="none"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <button
              onClick={() => setShowComingSoon(false)}
              className="mt-4 bg-sunsetBlaze text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
