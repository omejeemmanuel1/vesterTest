import React from "react";
import { Link } from "react-router-dom";

const Heading: React.FC = () => {
  return (
    <div className="bg-blue-900 text-white sticky top-0">
      <div className="flex justify-between items-center">
        <div className="m-6 mt-4">
          <Link to="/" className="text-white">
            <h1 className="text-4xl font-bold">Vester.AI</h1>
            <p className="text-xs">
              Connecting Investors and Startups in Africa
            </p>
          </Link>
        </div>
        <nav className="mr-6">
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/comp-login"
                className="text-white hover:border-b-2 hover:border-blue-300 transition"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/comp-reg"
                className="text-white hover:border-b-2 hover:border-blue-300 transition"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Heading;
