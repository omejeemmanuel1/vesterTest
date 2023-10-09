/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Formik, Form, Field } from "formik";
import { FaRegBell } from "react-icons/fa";
import { FiMoon } from "react-icons/fi";
import { BiSolidMoon } from "react-icons/bi";
import jwt_decode from "jwt-decode";
import loader from "../../../assets/loader.gif";
import { useTheme } from "../../../Context/ThemeContext";
import Avatar from "../../../assets/man.png";
import { BiLogOut } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MdHelp,
  MdOutlineSettings,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import { RxBarChart } from "react-icons/rx";
import { AiOutlinePieChart } from "react-icons/ai";
import { CgMenuBoxed } from "react-icons/cg";
import { CgCloseR } from "react-icons/cg";

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

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleToggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const { theme, toggleTheme } = useTheme();
  console.log(theme);
  let decodedToken: DecodedToken;

  const navigate = useNavigate();

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
    localStorage.removeItem("teamscores");
    navigate("/comp-login");
  };

  return (
    <nav className="md:p-4 pl-[15px] md:h-[100px] w-[100%] bg-[#C0C0F5] pb-4 md:pb-0 font-cabinet bg-opacity-10">
      <div className="flex md:items-center justify-between">
        <div className="flex justify-between">
          <Formik
            initialValues={{ search: "" }}
            onSubmit={(values) => {
              console.log(values.search);
            }}
          >
            {() => (
              <Form
                onSubmit={handleFormSubmit}
                className="flex items-center mt-2 md:mt-none"
              >
                <div className="relative">
                  <Field
                    type="text"
                    name="search"
                    className="bg-[#0A0A3F] bg-opacity-5 border rounded-xl md:w-[523px] w-[250px] md:h-[56px] h-[30px] px-2 py-1 pl-8"
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
        <div className="hidden md:flex md:items-center justify-center space-x-2 p-6 ml-auto">
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
        </div>
        {/* mobile nav */}
        <div className="md:hidden w-full">
          <button
            onClick={handleToggleMobileNav}
            className="text-3xl ml-14 text-white absolute top-2 z-50"
          >
            {isMobileNavOpen ? (
              <CgCloseR />
            ) : (
              <span className="text-[#000D80]">
                <CgMenuBoxed />
              </span>
            )}
          </button>
          {isMobileNavOpen && (
            <div className="md:hidden h-[300px] bg-[#000D80] absolute top-0 left-0 w-full block text-white pt-4 pb-4">
              <FaRegBell className=" text-xl mb-2 md:mb-none ml-5" />
              <ul className="">
                <li className="text-white rounded-2xl pt-2 pb-2 pl-5">
                  <NavLink
                    to="/company_dashboard"
                    className="flex hover:transition-transform hover:scale-105"
                  >
                    <MdOutlineSpaceDashboard className="mt-[1px] mr-2 text-2xl" />
                    Dashboard
                  </NavLink>
                </li>
                <li className="text-white rounded-2xl pt-2 pb-2 pl-6">
                  <NavLink
                    to="/score"
                    className="flex hover:transition-transform hover:scale-105"
                  >
                    <RxBarChart className="mt-[1px] mr-2 text-2xl" />
                    Vester Score
                  </NavLink>
                </li>
                <li className="text-white rounded-2xl pt-2 pb-2 pl-4">
                  <NavLink
                    to="/Performance"
                    className="flex hover:transition-transform hover:scale-105"
                  >
                    <AiOutlinePieChart className="mt-[1px] mr-2 text-2xl" />
                    Investor Match
                  </NavLink>
                </li>
                <li className="text-white rounded-2xl p-2 pt-2 pb-2 pl-4">
                  <NavLink
                    to="/profile-update"
                    className="flex hover:transition-transform hover:scale-105"
                  >
                    <MdOutlineSettings className="mt-[1px] mr-2 text-2xl" />
                    Profile
                  </NavLink>
                </li>

                <li className="text-white rounded-2xl p-2 pt-2 pb-2 pl-4">
                  <NavLink
                    to="/comp-login"
                    className="flex hover:transition-transform hover:scale-105"
                  >
                    <BiLogOut className="mt-[1px] mr-2 text-2xl" />
                    <button onClick={handleLogout} className="mr-2 pointer">
                      Logout
                    </button>
                  </NavLink>
                </li>

                <li className="text-white rounded-2xl p-2 pt-2 pb-2 pl-4">
                  <NavLink
                    to="/d-admin"
                    className="flex hover:transition-transform hover:scale-105"
                  >
                    <MdHelp className="mt-[1px] mr-2 text-2xl" />
                    Help
                  </NavLink>
                </li>
              </ul>
              {/* <button onClick={handleToggleMobileNav}>Close</button> */}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default ComNavBar;
