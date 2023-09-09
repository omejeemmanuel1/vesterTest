/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Formik, Form, Field } from "formik";
import { FaRegBell } from "react-icons/fa";
import { FiMoon } from "react-icons/fi";
import Avatar from "../../../assets/man.png";
import jwt_decode from "jwt-decode";

interface DecodedToken {
  sub: any;
  email: string;
  companyName: string;
}
const ComNavBar: React.FC = () => {
  const [userData, setUserData] = useState<DecodedToken | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken: DecodedToken = jwt_decode(token);
          console.log(decodedToken);
          setUserData(decodedToken);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchLoggedInUser();
  }, []);
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Retrieve Formik's handleSubmit function
    // Call it here if you want to perform any Formik-specific actions
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/comp-login");
  };

  return (
    <nav className="bg-[#C0C0F5] bg-opacity-10 p-4 h-[100px] lg:flex hidden">
      <div className="flex items-center space-x-[450px]">
        <Formik
          initialValues={{ search: "" }}
          onSubmit={(values) => {
            console.log(values.search);
          }}
        >
          {() => (
            <Form onSubmit={handleFormSubmit} className="flex items-center">
              <div className="relative">
                <Field
                  type="text"
                  name="search"
                  className="bg-[#0A0A3F] bg-opacity-5 border rounded-xl w-[523px] h-[56px] px-2 py-1 pl-8"
                  placeholder="Search..."
                />
                <button
                  type="submit"
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 ml-2"
                >
                  <FaSearch className="text-gray-400" />
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="flex items-center space-x-4">
          <FaRegBell className="text-[#000D80] text-xl" />
          <FiMoon className="text-[#000D80] text-xl" />
          <div className="text-[#000D80] w-auto">
            {userData ? userData.sub.companyName : "Loading..."}
          </div>
          <img src={Avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
          <button onClick={handleLogout} className="mr-2 pointer">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default ComNavBar;
