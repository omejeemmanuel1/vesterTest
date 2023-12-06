/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Formik, Form, Field } from "formik";
import { BsSendFill } from "react-icons/bs";
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

const ScoreNav: React.FC<ComNavBarProps> = () => {
  const [userData, setUserData] = useState<DecodedToken | null>(null);
  const [companyInfo, setCompanyInfo] = useState({
    companyLogo: "",
  });
  const [loading, setLoading] = useState(true);

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleToggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const { theme } = useTheme();
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
    navigate("/comp-login");
  };

  return (
    <div className="flex bg-white text-[#031549]">
      <nav className="md:pl-10 md:pr-20  md:h-[95px] w-[100%] pb-4 md:pb-0 font-poppins">
        <div className="flex md:items-center justify-between">
          <div className="hidden md:flex md:items-center justify-center space-x-2 p-6">
            <div className="flex text-center text-2xl m-auto">
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
          <div>
            <h2 className="text-xl md:text-3xl mt-2 md:mt-0 ml-2 md:hidden">
              Dashboard
            </h2>
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
          <div className="hidden md:flex md:ml-auto">
            <button className="text-[10px] md:text-xl flex bg-[#ec7f36] p-2 pr-4 pl-4 rounded-full text-white gap-2">
              <span className="text-sm md:text-2xl">
                <BsSendFill />
              </span>
              Share your vester score
            </button>
          </div>

          {/* mobile nav */}
          <div className="md:hidden w-full">
            <button
              onClick={handleToggleMobileNav}
              className="text-3xl ml-14 text-white absolute right-2 top-2 z-50"
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
              <div className="md:hidden h-[340px] bg-[#000D80] absolute top-0 left-0 w-full block text-white pt-4 pb-4">
                <div className="flex space-x-2 pl-5">
                  <div className="flex text-center text-xl mb-1">
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
                  <li className="text-white rounded-2xl pb-2 pl-5">
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
                <div className="md:hidden md:ml-auto">
                  <button className="text-[10px] md:text-xl flex bg-[#ec7f36] p-2 pr-4 pl-4 rounded-full text-white gap-2">
                    <span className="text-sm md:text-2xl">
                      <BsSendFill />
                    </span>
                    Share your vester score
                  </button>
                </div>
                {/* <button onClick={handleToggleMobileNav}>Close</button> */}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default ScoreNav;
