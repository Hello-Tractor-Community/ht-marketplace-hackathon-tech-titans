import React from "react";

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-opacity-90 bg-white">
      <div className="w-16 h-16 border-4 border-gray-200 border-t-sunsetBlaze rounded-full animate-spin"></div>
      <p className="mt-4 text-sunsetBlaze text-lg font-medium">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
