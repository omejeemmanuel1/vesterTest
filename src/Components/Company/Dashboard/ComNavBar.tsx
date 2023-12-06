/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Formik, Form, Field } from "formik";
import { BsChatRightDotsFill } from "react-icons/bs";
import { FiMoon } from "react-icons/fi";
import { BiSolidMoon } from "react-icons/bi";
import jwt_decode from "jwt-decode";
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
// import { AiOutlinePieChart } from "react-icons/ai";
import { CgMenuBoxed } from "react-icons/cg";
import { CgCloseR } from "react-icons/cg";
import axios from "axios";

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
    };
    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    const apiUrl = `${baseUrl}/teamscore/scrape-website?companyWebsite=${decodedToken?.sub.companyWebsite}`;
    console.log(apiUrl);

    const fetchData = async () => {
      try {
        const hasFailed = localStorage.getItem("companyInfoFailed");

        if (hasFailed) {
          setCompanyInfo({ companyLogo: "" });
          setLoading(false);
        } else {
          const storedCompanyInfo = localStorage.getItem("companyInfo");

          if (storedCompanyInfo) {
            const parsedCompanyInfo = JSON.parse(storedCompanyInfo);
            setCompanyInfo(parsedCompanyInfo);
            setLoading(false);
          } else {
            const response = await axios.get(apiUrl);

            if (response.status !== 200) {
              localStorage.setItem("companyInfoFailed", "true");
              throw new Error("Failed to fetch company data");
            }

            const newCompanyInfo = {
              companyLogo: response.data.companyWebsiteInfo.companyLogo,
            };

            localStorage.setItem("companyInfo", JSON.stringify(newCompanyInfo));

            setCompanyInfo(newCompanyInfo);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("teamscores");
    navigate("/company-login");
  };

  return (
    <div
      className={`flex bg-white ${
        theme === "light" ? "font-poppins text-[#031549]" : "dark:bg-[#031549]"
      }`}
    >
      <nav className="md:pl-10 md:pr-8  md:h-[95px] w-[100%] pb-4 md:pb-0 font-poppins">
        <div className="flex md:items-center justify-between">
          <div>
            <h2 className="text-xl md:text-3xl mt-2 md:mt-0 ml-2">Dashboard</h2>
          </div>
          <div className="flex ml-auto">
            <Formik
              initialValues={{ search: "" }}
              onSubmit={(values) => {
                console.log(values.search);
              }}
            >
              {() => (
                <Form
                  onSubmit={handleFormSubmit}
                  className="flex items-center mt-2 ml-2 md:ml-0 md:mt-none"
                >
                  <div className="relative">
                    <Field
                      type="text"
                      name="search"
                      className=" border rounded-full md:w-[320px] w-[170px] md:h-[40px] h-[30px] px-2 py-1 pl-8"
                      placeholder="Search here..."
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
            <BsChatRightDotsFill className=" text-xl" />
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
                <div className="w-4 h-4 border-t-4 border-blue-400 border-solid rounded-full animate-spin bg-white z-10"></div>
              </div>
            ) : (
              <>
                {companyInfo.companyLogo ? (
                  <img
                    src={companyInfo.companyLogo}
                    alt="Company Logo"
                    className="w-5 h-5 rounded-full"
                  />
                ) : (
                  <img
                    src={Avatar}
                    alt="Avatar"
                    className="w-5 h-5 rounded-full"
                  />
                )}
              </>
            )}
          </div>
          {/* mobile nav */}
          <div className="md:hidden w-full">
            <button
              onClick={handleToggleMobileNav}
              className="text-3xl text-white absolute top-2 right-2 z-50"
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
                <div className="flex md:items-center space-x-2 p-2 ">
                  {theme === "light" ? (
                    <FiMoon
                      className={`text-xl cursor-pointer text-[#6873dd]`}
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
                      <div className="w-4 h-4 border-t-4 border-blue-400 border-solid rounded-full animate-spin bg-white z-10"></div>
                    </div>
                  ) : (
                    <>
                      {companyInfo.companyLogo ? (
                        <img
                          src={companyInfo.companyLogo}
                          alt="Company Logo"
                          className="w-5 h-5 rounded-full"
                        />
                      ) : (
                        <img
                          src={Avatar}
                          alt="Avatar"
                          className="w-5 h-5 rounded-full"
                        />
                      )}
                    </>
                  )}
                </div>

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
                  {/* <li className="text-white rounded-2xl pt-2 pb-2 pl-4">
                    <NavLink
                      to="/Performance"
                      className="flex hover:transition-transform hover:scale-105"
                    >
                      <AiOutlinePieChart className="mt-[1px] mr-2 text-2xl" />
                      Investor Match
                    </NavLink>
                  </li> */}
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
                      to="/company-login"
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
    </div>
  );
};

export default ComNavBar;
