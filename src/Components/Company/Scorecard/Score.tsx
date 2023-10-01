/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from "react";
import ComSideBar from "../Dashboard/ComSideBar";
import ComNavBar from "../Dashboard/ComNavBar";
import { Link } from "react-router-dom";
import { useTheme } from "../../../Context/ThemeContext";
import { PiUsersFourFill } from "react-icons/pi";
import { AiOutlineBarChart } from "react-icons/ai";
import { GiBreakingChain } from "react-icons/gi";
import { GiTeamUpgrade } from "react-icons/gi";
import { SiMarketo } from "react-icons/si";
import { FaBusinessTime } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa";
import { RiGovernmentFill } from "react-icons/ri";
import { PiDotFill } from "react-icons/pi";
import loader from "../../../assets/loader.gif";
import axios from "axios";

import jwt_decode from "jwt-decode";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

interface DecodedToken {
  sub: any;
  email: string;
  companyName: string;
}

interface TeamScore {
  _id: string;
  fundingStage: string;
  totalFundingRaised: string;
  moneyRaise: string;
  Grade: string;
  Percentage: string;
  TeamScore: number;
  BusinessModel: number;
  MarketFitScore: number;
  FinancialScore: number;
  GovernanceScore: number;
}

const Score: React.FC = () => {
  const [activeItem, setActiveItem] = useState("overall");
  const [teamscores, setTeamscores] = useState<TeamScore[]>([]);
  const [, setDecodedToken] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);

  const isMountedRef = useRef<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: DecodedToken = jwt_decode(token);
      console.log(decodedToken.sub.companyWebsite);
      setDecodedToken(decodedToken);

      if (isMountedRef.current && teamscores.length === 0) {
        const teamscoresApiUrl = `${baseUrl}/teamscore/get-all-teamscores`;

        axios
          .get(teamscoresApiUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (isMountedRef.current) {
              setTeamscores(response.data);
              setLoading(false);
            }
          })
          .catch((error) => {
            console.error("Failed to fetch teamscores", error);
          });
      }
    }

    // Cleanup function to update isMountedRef when the component unmounts
    return () => {
      isMountedRef.current = false;
    };
  }, [teamscores]);

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
  };

  const { theme } = useTheme();
  return (
    <>
      <div
        className={`flex overflow-hidden ${
          theme === "light"
            ? "font-cabinet text-[#000D80]"
            : "dark:bg-gray-800 text-white"
        }`}
      >
        <div>
          <ComSideBar />
        </div>

        <div className="flex-1">
          <ComNavBar bgColor="bg-white" />
          <div className="m-6 mt-[31px]">
            <h4 className="text-sm">
              Add company data to get effective analysis on your company's
              performance{" "}
              <Link to="/team-info" className="text-blue-300">
                Add Data
              </Link>
            </h4>

            <div className="mt-10">
              <h1 className=" text-[20px] ml-10 mb-5">Summary</h1>
              <div className="flex justify-between">
                <div className="ml-10">
                  <ul className="flex space-x-[10px] mb-4 text-gray-500">
                    <li
                      onClick={() => handleItemClick("overall")}
                      className={
                        activeItem === "overall" ? "active text-blue-700" : ""
                      }
                    >
                      <span className="flex cursor-pointer">
                        <PiDotFill />
                        Overall Score
                      </span>
                    </li>
                    <li
                      onClick={() => handleItemClick("team")}
                      className={
                        activeItem === "team" ? "active text-blue-700" : ""
                      }
                    >
                      <span className="flex cursor-pointer">
                        {" "}
                        <PiDotFill />
                        Team Score
                      </span>
                    </li>
                    <li
                      onClick={() => handleItemClick("market")}
                      className={
                        activeItem === "market" ? "active text-blue-700" : ""
                      }
                    >
                      <span className="flex cursor-pointer">
                        <PiDotFill />
                        Market Fit
                      </span>
                    </li>
                    <li
                      onClick={() => handleItemClick("business")}
                      className={
                        activeItem === "business" ? "active text-blue-700" : ""
                      }
                    >
                      <span className="flex cursor-pointer">
                        <PiDotFill />
                        Business Model
                      </span>
                    </li>
                    <li
                      onClick={() => handleItemClick("finance")}
                      className={
                        activeItem === "finance" ? "active text-blue-700" : ""
                      }
                    >
                      <span className="flex cursor-pointer">
                        <PiDotFill />
                        Finance
                      </span>
                    </li>
                    <li
                      onClick={() => handleItemClick("governance")}
                      className={
                        activeItem === "governance"
                          ? "active text-blue-700"
                          : ""
                      }
                    >
                      <span className="flex cursor-pointer">
                        <PiDotFill />
                        Governance
                      </span>
                    </li>
                  </ul>

                  <div
                    className={`w-[620px] h-[250px] bg-white shadow-md rounded-2xl p-4 border ${
                      activeItem === "overall" ? "" : "hidden"
                    }`}
                  >
                    <h3>Based on the information shared with us..</h3>
                    <p>Below is your</p>
                    <p>...</p>
                    <div>
                      {loading ? (
                        <div className="text-center m-auto">
                          <img
                            src={loader}
                            alt="Loading"
                            className="w-[60px]"
                          />
                        </div>
                      ) : (
                        <div>
                          {teamscores.map((teamscore) => (
                            <p>
                              With the score of{" "}
                              <span>
                                {teamscore.Percentage || "NA"}, you get acess to
                                these vester services
                              </span>
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between mt-12 ml-4 mr-4 text-white font-bold">
                      <button className="bg-red-400 w-[150px] p-2 rounded-full">
                        Call to Action1
                      </button>
                      <button className="bg-red-400 w-[150px] p-2 rounded-full">
                        Call to Action2
                      </button>
                    </div>
                  </div>

                  <div
                    className={`w-[620px] h-[250px] flex justify-between shadow-md rounded-2xl p-4 border ${
                      activeItem === "team" ? "" : "hidden"
                    }`}
                  >
                    <div className="block">
                      <h3>Based on the information shared with us..</h3>
                      <br />
                      <div>
                        {loading ? (
                          <div className="text-center m-auto">
                            <img
                              src={loader}
                              alt="Loading"
                              className="w-[60px]"
                            />
                          </div>
                        ) : (
                          <div>
                            {teamscores.map((teamscore) => (
                              <p>
                                Below is your team score of{" "}
                                <span className="font-bold">
                                  {teamscore.TeamScore !== null
                                    ? (teamscore.TeamScore * 100).toFixed(2) +
                                      "%"
                                    : "NA"}
                                </span>
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <p className=" text-9xl text-gray-500">
                      <GiTeamUpgrade />
                    </p>
                  </div>
                  <div
                    className={`w-[620px] h-[250px] flex justify-between shadow-md rounded-2xl p-4 border ${
                      activeItem === "market" ? "" : "hidden"
                    }`}
                  >
                    <div className="block">
                      <h3>Based on the information shared with us..</h3>
                      <br />
                      <div>
                        {loading ? (
                          <div className="text-center m-auto">
                            <img
                              src={loader}
                              alt="Loading"
                              className="w-[60px]"
                            />
                          </div>
                        ) : (
                          <div>
                            {teamscores.map((teamscore) => (
                              <p>
                                Below is your market score of{" "}
                                <span className="font-bold">
                                  {teamscore.MarketFitScore !== null
                                    ? (teamscore.MarketFitScore * 100).toFixed(
                                        2
                                      ) + "%"
                                    : "NA"}
                                </span>
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className=" text-9xl text-gray-500">
                      <SiMarketo />
                    </p>
                  </div>
                  <div
                    className={`w-[620px] h-[250px] flex justify-between shadow-md rounded-2xl p-4 border ${
                      activeItem === "business" ? "" : "hidden"
                    }`}
                  >
                    <div className="block">
                      <h3>Based on the information shared with us..</h3>
                      <br />
                      <div>
                        {loading ? (
                          <div className="text-center m-auto">
                            <img
                              src={loader}
                              alt="Loading"
                              className="w-[60px]"
                            />
                          </div>
                        ) : (
                          <div>
                            {teamscores.map((teamscore) => (
                              <p>
                                Below is your business model score of{" "}
                                <span className="font-bold">
                                  {teamscore.BusinessModel !== null
                                    ? (teamscore.BusinessModel * 100).toFixed(
                                        2
                                      ) + "%"
                                    : "NA"}
                                </span>
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className=" text-9xl text-gray-500">
                      <FaBusinessTime />
                    </p>
                  </div>
                  <div
                    className={`w-[620px] h-[250px] flex justify-between shadow-md rounded-2xl p-4 border ${
                      activeItem === "finance" ? "" : "hidden"
                    }`}
                  >
                    <div className="block">
                      <h3>Based on the information shared with us..</h3>
                      <br />
                      <div>
                        {loading ? (
                          <div className="text-center m-auto">
                            <img
                              src={loader}
                              alt="Loading"
                              className="w-[60px]"
                            />
                          </div>
                        ) : (
                          <div>
                            {teamscores.map((teamscore) => (
                              <p>
                                Below is your financial score of{" "}
                                <span className="font-bold">
                                  {teamscore.FinancialScore !== null
                                    ? (teamscore.FinancialScore * 100).toFixed(
                                        2
                                      ) + "%"
                                    : "NA"}
                                </span>
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className=" text-9xl text-gray-500">
                      <FaMoneyBill />
                    </p>
                  </div>
                  <div
                    className={`w-[620px] h-[250px] flex justify-between shadow-md rounded-2xl p-4 border ${
                      activeItem === "governance" ? "" : "hidden"
                    }`}
                  >
                    <div className="block">
                      <h3>Based on the information shared with us.. </h3>
                      <br />
                      <div>
                        {loading ? (
                          <div className="text-center m-auto">
                            <img
                              src={loader}
                              alt="Loading"
                              className="w-[60px]"
                            />
                          </div>
                        ) : (
                          <div>
                            {teamscores.map((teamscore) => (
                              <p>
                                Below is your governance score of{" "}
                                <span className="font-bold">
                                  {teamscore.GovernanceScore !== null
                                    ? (teamscore.GovernanceScore * 100).toFixed(
                                        2
                                      ) + "%"
                                    : "NA"}
                                </span>
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className=" text-9xl text-gray-500">
                      <RiGovernmentFill />
                    </p>
                  </div>
                  <div className="flex justify-between mt-10">
                    <div className="bg-white w-[300px] h-[220px] rounded-2xl border shadow-md">
                      <div className="flex justify-between">
                        <p className="text-3xl m-4">Strengths</p>
                        <p className="text-7xl text-[#083982e2]">
                          <AiOutlineBarChart />
                        </p>
                      </div>
                      <ul className="list-disc m-5">
                        <li>xxx</li>
                        <li>xxx</li>
                        <li>xxx</li>
                      </ul>
                    </div>
                    <div className="bg-white w-[300px] h-[220px] rounded-2xl border shadow-md">
                      <div className="flex justify-between">
                        <p className="text-3xl m-4">Improvements</p>
                        <p className="text-7xl text-[#083982e2] font-bold">
                          <GiBreakingChain />
                        </p>
                      </div>
                      <ul className="list-disc m-5">
                        <li>xxx</li>
                        <li>xxx</li>
                        <li>xxx</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="block -mt-28 mr-10">
                  <div className="bg-[#083982e2] w-[350px] h-[400px] rounded-3xl p-6 justify-center text-center text-white">
                    <h3 className="text-2xl">Vester score</h3>
                    <div className="ml-20 mt-10 w-32 h-32 border-dashed border-2 border-white rounded-[50%] p-10">
                      <div>
                        {loading ? (
                          <div className="text-center m-auto">
                            <img
                              src={loader}
                              alt="Loading"
                              className="w-[60px]"
                            />
                          </div>
                        ) : (
                          <div>
                            {teamscores.map((teamscore) => (
                              <p className="text-5xl font-cursive">
                                {teamscore.Grade || "NA"}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <div>
                        {loading ? (
                          <div className="text-center m-auto">
                            <img
                              src={loader}
                              alt="Loading"
                              className="w-[60px]"
                            />
                          </div>
                        ) : (
                          <div>
                            {teamscores.map((teamscore) => (
                              <p className="text-center font-bold mt-10">
                                {(() => {
                                  const grade = teamscore.Grade || "NA";
                                  if (grade === "A+") {
                                    return "Congratulations! Your startup is exceptionally well-prepared for investment. You have a strong foundation, a compelling value proposition, and a clear path to success. Investors will likely be eager to engage with you.";
                                  } else if (grade === "A") {
                                    return "Great job! Your startup is in great shape for investment. You've demonstrated a solid investment case, and your preparation is impressive. With some fine-tuning, you're on track for success.";
                                  } else if (grade === "B") {
                                    return "Good work! Your startup is investment-ready and shows promise. There are areas for improvement, but you're on the right path. Investors will be interested in what you have to offer.";
                                  } else if (grade === "C") {
                                    return "Keep pushing! Your startup has potential, but there's room for improvement before you're fully investment-ready. Consider refining your strategy and addressing weaknesses to attract investors.";
                                  } else if (grade === "D") {
                                    return "You're on the journey, but there's work to be done. Your startup may not be investment-ready yet, but with dedication and strategic adjustments, you can enhance your appeal to potential investors.";
                                  } else if (grade === "E") {
                                    return "You've got potential, but there's a significant gap to bridge. Your startup may face challenges in attracting investors at this stage. Focus on strengthening your fundamentals and strategy.";
                                  } else if (grade === "F") {
                                    return "There's work to do. Your startup is not yet ready for investment. It's essential to reevaluate your approach, address weaknesses, and refine your business model to become more attractive to investors.";
                                  } else {
                                    return "NA";
                                  }
                                })()}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-[350px] h-[220px] border-4 border-red-400 bg-white rounded-3xl mt-10">
                    <div className="text-[#083982e2] text-6xl float-right m-3">
                      <PiUsersFourFill />
                    </div>
                    <div>
                      <h2 className="text-center text-2xl mt-10">Ranking</h2>
                      <p className="mt-2 p-5">
                        You are rank in the{" "}
                        <span className="text-red-400 font-bold">
                          top 10% percentile{" "}
                        </span>
                        of other imilar companies in your industly or country
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Score;
