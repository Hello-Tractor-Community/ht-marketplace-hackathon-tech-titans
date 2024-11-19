import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.jpg";
import useAxios from "../../../Hooks/useAxios";
import { toast } from "react-toastify";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userType: "buyer", // Default value
    companyDetails: {
      name: "",
      logo: "",
      description: "",
    },
    contactDetails: {
        phone: "",
        email: "",
    },
    logo: null,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigation = useNavigate()

  const { post } = useAxios();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      companyDetails: {
        ...prev.companyDetails,
        [name]: value,
      },
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      contactDetails: {
        ...prev.contactDetails,
        [name]: value,
      },
    }));
  };

  const validateForm = () => {
    const errors = {};
    // Basic fields
    if (!formData.firstName.trim()) errors.firstName = "First Name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.password.trim()) errors.password = "Password is required";

    // Seller-specific fields
    if (formData.userType === "seller") {
      if (!formData.companyDetails.name.trim())
        errors.companyName = "Company Name is required";
      if (!formData.companyDetails.description.trim())
        errors.companyDescription = "Description is required";
      if (!formData.contactDetails.phone.trim())
        errors.phone = "Phone Number is required";
      if (!formData.contactDetails.email.trim())
        errors.companyEmail = "Company Email is required";
      if (!formData.logo) errors.logo = "Company logo is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      logo: e.target.files[0], 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      console.log(formData)
      const response = await post(`/api/register/sign-up`, formData);
      setIsSubmitting(false);
      toast.success(response.message)
      navigation('/login')
    } catch (e) {
      setIsSubmitting(false);
      toast.error(e.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xl">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Hello Tractor Logo" className="h-16 w-auto" />
        </div>

        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
        <form>
          {/* Basic Details */}
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunsetBlaze"
            />
            {formErrors.firstName && (
              <p className="text-red-500 text-sm">{formErrors.firstName}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunsetBlaze"
            />
            {formErrors.lastName && (
              <p className="text-red-500 text-sm">{formErrors.lastName}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunsetBlaze"
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm">{formErrors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunsetBlaze"
            />
            {formErrors.password && (
              <p className="text-red-500 text-sm">{formErrors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="userType" className="block text-gray-700 font-medium mb-2">
              User Type
            </label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunsetBlaze"
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          {/* Seller-Specific Fields */}
          {formData.userType === "seller" && (
            <div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.companyDetails.name}
                  onChange={handleCompanyChange}
                  placeholder="Enter company name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunsetBlaze"
                />
                {formErrors.companyName && (
                  <p className="text-red-500 text-sm">{formErrors.companyName}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="logo" className="block text-gray-700 font-medium mb-2">
                  Company Logo
                </label>
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunsetBlaze"
                />
                {formErrors.logo && (
                  <p className="text-red-500 text-sm">{formErrors.logo}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                  Company Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.companyDetails.description}
                  onChange={handleCompanyChange}
                  placeholder="Enter company description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunsetBlaze"
                ></textarea>
                {formErrors.companyDescription && (
                  <p className="text-red-500 text-sm">{formErrors.companyDescription}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.contactDetails.phone}
                  onChange={handleContactChange}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunsetBlaze"
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-sm">{formErrors.phone}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Company Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.contactDetails.email}
                  onChange={handleContactChange}
                  placeholder="Enter company email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunsetBlaze"
                />
                {formErrors.companyEmail && (
                  <p className="text-red-500 text-sm">{formErrors.companyEmail}</p>
                )}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-sunsetBlaze text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
              onClick={handleSubmit}
            >
              {isSubmitting ? "Submitting..." : "Register"}
            </button>
          </div>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-sunsetBlaze hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
