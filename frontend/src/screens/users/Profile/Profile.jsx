import React, { useState } from "react";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const [tab, setTab] = useState("personaldetails");
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
    middleName: "Paul",
    email: "john.doe@example.com",
    companyDetails: {
      name: "FarmTech Inc.",
      description: "Providing top-quality agricultural equipment.",
      phone: "1234567890",
      email: "support@farmtech.com",
    },
    servicesOffered: ["Tractor Repair", "Equipment Rentals"],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("companyDetails")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        companyDetails: {
          ...prev.companyDetails,
          [key]: value,
        },
      }));
    } else if (name === "servicesOffered") {
      setFormData((prev) => ({
        ...prev,
        servicesOffered: value.split(",").map((s) => s.trim()),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Save changes
  const handleSave = () => {
    setUserData(formData);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-8 text-plum">
        My Profile
      </h1>

      {/* Tabs Navigation */}
      <div className="flex justify-center mb-6">
        {["Personal Details", "Company Details", "Services", "Activity Logs"].map(
          (item, index) => (
            <button
              key={index}
              onClick={() => setTab(item.toLowerCase().replace(" ", ""))}
              className={`px-4 py-2 mx-2 rounded-lg font-medium transition duration-300 ${
                tab === item.toLowerCase().replace(" ", "")
                  ? "bg-sunsetBlaze text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {item}
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
        {/* Personal Details */}
        {tab === "personaldetails" && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-plum">
              Personal Details
            </h2>
            <p>
              <strong>First Name:</strong> {userData.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {userData.lastName}
            </p>
            <p>
              <strong>Middle Name:</strong> {userData.middleName}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
          </div>
        )}

        {/* Company Details */}
        {tab === "companydetails" && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-plum">
              Company Details
            </h2>
            <p>
              <strong>Name:</strong> {userData.companyDetails.name}
            </p>
            <p>
              <strong>Description:</strong> {userData.companyDetails.description}
            </p>
            <p>
              <strong>Phone:</strong> {userData.companyDetails.phone}
            </p>
            <p>
              <strong>Email:</strong> {userData.companyDetails.email}
            </p>
          </div>
        )}

        {/* Services Offered */}
        {tab === "services" && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-plum">
              Services Offered
            </h2>
            <ul className="list-disc pl-6">
              {userData.servicesOffered.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Activity Logs */}
        {tab === "activitylogs" && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-plum">
              Activity Logs
            </h2>
            <ul className="list-disc pl-6">
              <li>Updated profile on 2024-11-19</li>
              <li>Uploaded a new product: Tractor A</li>
              <li>Modified pricing for Plow</li>
            </ul>
          </div>
        )}
      </motion.div>

      {/* Edit Profile Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-sunsetBlaze text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Edit Profile
        </button>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center py-4">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-plum">Edit Profile</h2>
            <div className="grid grid-cols-1 gap-4">
              {/* Personal Details */}
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="border p-2 rounded-lg"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="border p-2 rounded-lg"
              />
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                placeholder="Middle Name"
                className="border p-2 rounded-lg"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="border p-2 rounded-lg"
              />

              {/* Company Details */}
              <input
                type="text"
                name="companyDetails.name"
                value={formData.companyDetails.name}
                onChange={handleChange}
                placeholder="Company Name"
                className="border p-2 rounded-lg"
              />
              <input
                type="text"
                name="companyDetails.description"
                value={formData.companyDetails.description}
                onChange={handleChange}
                placeholder="Company Description"
                className="border p-2 rounded-lg"
              />
              <input
                type="text"
                name="companyDetails.phone"
                value={formData.companyDetails.phone}
                onChange={handleChange}
                placeholder="Company Phone"
                className="border p-2 rounded-lg"
              />
              <input
                type="email"
                name="companyDetails.email"
                value={formData.companyDetails.email}
                onChange={handleChange}
                placeholder="Company Email"
                className="border p-2 rounded-lg"
              />

              {/* Services */}
              <input
                type="text"
                name="servicesOffered"
                value={formData.servicesOffered.join(", ")}
                onChange={handleChange}
                placeholder="Services (comma separated)"
                className="border p-2 rounded-lg"
              />
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg mr-4 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-sunsetBlaze text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
 