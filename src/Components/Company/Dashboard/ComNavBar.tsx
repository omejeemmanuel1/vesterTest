/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Formik, Form, Field } from "formik";
import { FaRegBell } from "react-icons/fa";
import { FiMoon } from "react-icons/fi";
import { BiSolidMoon } from "react-icons/bi";
import jwt_decode from "jwt-decode";
import loader from "../../../assets/loader.gif";
import { useTheme } from "../../../Context/ThemeContext";
import Avatar from "../../../assets/man.png";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

interface DecodedToken {
  sub: any;
  email: string;
  companyName: string;
}

interface ComNavBarProps {
  bgColor?: string;
}

const ComNavBar: React.FC<ComNavBarProps> = () => {
  const [userData, setUserData] = useState<DecodedToken | null>(null);
  const [companyInfo, setCompanyInfo] = useState({
    companyLogo: "",
  });
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const { theme, toggleTheme } = useTheme();
  console.log(theme);
  let decodedToken: DecodedToken;

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          decodedToken = jwt_decode(token);
          console.log(decodedToken);
          setUserData(decodedToken);
        }
      } catch (error) {
        console.log(error);
      }

      const apiUrl = `${baseUrl}/teamscore/scrape-website?companyWebsite=${decodedToken?.sub.companyWebsite}`;
      console.log(apiUrl);

      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch company data");
          }
          return response.json();
        })
        .then((data) => {
          setCompanyInfo({
            companyLogo: data.companyWebsiteInfo.companyLogo,
          });
          console.log(data.companyName);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchLoggedInUser();
  }, []);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/comp-login");
  };

  // const navClasses = `p-4 h-[100px] lg:flex hidden ${
  //   bgColor || "bg-[#C0C0F5] bg-opacity-10"
  // } dark:bg-gray-800`;

  return (
    <nav className="p-4 h-[100px] lg:flex bg-[#C0C0F5] font-cabinet bg-opacity-10 ">
      <div className="flex space-x-[410px]">
        <div className="flex">
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
        </div>
        <div className="flex items-center justify-center space-x-2 p-6">
          <FaRegBell className=" text-xl" />
          {theme === "light" ? (
            <FiMoon
              className={`text-xl cursor-pointer text-[#000D80]`}
              onClick={toggleTheme}
            />
          ) : (
            <BiSolidMoon
              className={`text-xl cursor-pointer`}
              onClick={toggleTheme}
            />
          )}
          <div className="flex text-center m-auto">
            {userData ? userData.sub.companyName : "Loading..."}
          </div>
          {loading ? (
            <div className="text-center">
              <img src={loader} alt="Loading" className="w-[60px]" />
            </div>
          ) : (
            <>
              {companyInfo.companyLogo ? (
                <img
                  src={companyInfo.companyLogo}
                  alt="Company Logo"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <img
                  src={Avatar}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
              )}
            </>
          )}

          <button onClick={handleLogout} className="mr-2 pointer">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default ComNavBar;
