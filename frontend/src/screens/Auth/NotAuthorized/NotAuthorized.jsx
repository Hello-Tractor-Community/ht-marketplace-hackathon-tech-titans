import React from "react";
import { Link } from "react-router-dom";

const NotAuthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-700 mb-6">
          You do not have permission to view this page. If you believe this is an
          error, please contact support or try logging in with a different
          account.
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto mb-6 w-40 h-40 text-red-500"
        >
          <circle cx="12" cy="12" r="10" className="stroke-red-500" />
          <line x1="15" y1="9" x2="9" y2="15" className="stroke-red-500" />
          <line x1="9" y1="9" x2="15" y2="15" className="stroke-red-500" />
        </svg>
        <Link
          to="/"
          className="inline-block bg-sunsetBlaze text-white py-2 px-6 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotAuthorized;
