import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const PasswordInvestCreated: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[349px] h-[252px] text-center">
        <p className="text-gray-500 mb-5 text-sm mt-14">
          Your new password has been created.
        </p>
        <Link
          to="/investor-login"
          className="text-[#0A0A3F] py-2 px-4 rounded hover:bg-blue-600 hover:text-white w-full flex items-center justify-center"
        >
          <FaArrowLeft className="mr-2" /> Back to Log In
        </Link>
      </div>
    </div>
  );
};

export default PasswordInvestCreated;
