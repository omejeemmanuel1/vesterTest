/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
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
import axios from "axios";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

interface ApiScores {
  Grade: string;
  Percentage: string;
  api_score: number;
  api_score2: number;
  api_score3: number;
  api_score4: number;
  api_score5: number;
}

interface TeamScore {
  _id: string;
  apiScores: ApiScores;
}
function calculateGrade(percentage: any) {
  const numericPercentage = parseFloat(percentage);

  if (numericPercentage >= 90) {
    return "A+";
  } else if (numericPercentage >= 80) {
    return "A";
  } else if (numericPercentage >= 75) {
    return "B";
  } else if (numericPercentage >= 60) {
    return "C";
  } else if (numericPercentage >= 50) {
    return "D";
  } else if (numericPercentage >= 40) {
    return "E";
  } else {
    return "F";
  }
}

const Score: React.FC = () => {
  const [activeItem, setActiveItem] = useState("overall");
  const [teamscores, setTeamscores] = useState<TeamScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const teamscoresApiUrl = `${baseUrl}/teamscore/get-teamscores`;

        const storedTeamscores = localStorage.getItem("teamscores");

        if (storedTeamscores) {
          const parsedTeamscores = JSON.parse(storedTeamscores);
          setTeamscores(parsedTeamscores);
          setLoading(false);
        } else {
          const response = await axios.get(teamscoresApiUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          localStorage.setItem("teamscores", JSON.stringify(response.data));

          setTeamscores(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch teamscores", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
          <ComSideBar marginTop="400px" />
        </div>

        <div className="flex-1">
          <ComNavBar bgColor="bg-white" />
          <div className="md:m-6 mt-[31px]">
            <h4 className="text-sm text-left break-words ">
              Add company data to get effective analysis on your company's
              performance{" "}
              <Link to="/team-info" className="text-blue-300">
                Add Data
              </Link>
            </h4>

            <div className="mt-10">
              <h1 className="ml-4 text-[20px] md:ml-10 mb-5">Summary</h1>
              <div className="md:flex justify-between">
                <div className="ml-4 md:ml-10">
                  <ul className="w-full md:flex space-x-[10px] mb-4 text-gray-500">
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
                    className={`${activeItem === "overall" ? "" : "hidden"}`}
                  >
                    <div className="w-[330px] md:w-[620px]  h-[250px]  shadow-md rounded-2xl p-4 border">
                      <h3>Based on the information shared with us..</h3>
                      <p>Below is your</p>
                      <p>...</p>
                      <div>
                        {loading ? (
                          <div className="text-center m-auto flex">
                            <div className="w-4 h-4 border-t-4 border-blue-400 border-solid rounded-full animate-spin z-10"></div>
                          </div>
                        ) : (
                          <div>
                            {teamscores.map((teamscore) => (
                              <p>
                                With the score of{" "}
                                <span className="font-bold">
                                  {typeof teamscore.apiScores.Percentage ===
                                  "string"
                                    ? calculateGrade(
                                        teamscore.apiScores.Percentage
                                      )
                                    : "NA"}
                                </span>
                                , you get access to these vester services
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
                    <div className="md:flex justify-between mt-[690px] md:mt-10 mb-4">
                      <div className=" w-[330px] md:w-[300px] h-[220px] rounded-2xl border shadow-md mb-4 md:mb-0">
                        <div className="flex justify-between">
                          <p className="text-3xl m-4">Strengths</p>
                          <p className="text-7xl text-[#083982e2]">
                            <AiOutlineBarChart />
                          </p>
                        </div>
                        <ul className="list-disc m-5">
                          <li>oxx</li>
                          <li>xxx</li>
                          <li>xxx</li>
                        </ul>
                      </div>
                      <div className=" w-[330px] md:w-[300px] h-[220px] rounded-2xl border shadow-md">
                        <div className="flex justify-between">
                          <p className="text-3xl m-4">Improvements</p>
                          <p className="text-7xl text-[#083982e2] font-bold">
                            <GiBreakingChain />
                          </p>
                        </div>
                        <ul className="list-disc m-5">
                          <li>oxxx</li>
                          <li>xxx</li>
                          <li>xxx</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className={`${activeItem === "team" ? "" : "hidden"}`}>
                    <div className="w-[330px] md:w-[620px] h-[250px] flex justify-between shadow-md rounded-2xl p-4 border">
                      <div className="block">
                        <h3>Based on the information shared with us..</h3>
                        <br />
                        <div>
                          {loading ? (
                            <div className="text-center m-auto flex">
                              <div className="w-4 h-4 border-t-4 border-blue-400 border-solid rounded-full animate-spin z-10"></div>
                            </div>
                          ) : (
                            <div>
                              {teamscores.map((teamscore) => {
                                const scoreValue =
                                  teamscore.apiScores.api_score !== null &&
                                  teamscore.apiScores.api_score >= 0 &&
                                  teamscore.apiScores.api_score <= 100
                                    ? teamscore.apiScores.api_score * 20
                                    : null;
                                return (
                                  <p>
                                    Below is your team score of{" "}
                                    <span className="font-bold">
                                      {scoreValue !== null
                                        ? `${calculateGrade(scoreValue)}`
                                        : "NA"}
                                    </span>
                                  </p>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>

                      <p className=" text-9xl text-gray-500">
                        <GiTeamUpgrade />
                      </p>
                    </div>
                    <div className="md:flex justify-between mt-[690px] md:mt-10 mb-4">
                      <div className=" w-[330px] md:w-[300px] h-[220px] rounded-2xl border shadow-md mb-4 md:mb-0">
                        <div className="flex justify-between">
                          <p className="text-3xl m-4">Strengths</p>
                          <p className="text-7xl text-[#083982e2]">
                            <AiOutlineBarChart />
                          </p>
                        </div>
                        <ul className="list-disc m-5">
                          <li>txx</li>
                          <li>xxx</li>
                          <li>xxx</li>
                        </ul>
                      </div>
                      <div className=" w-[330px] md:w-[300px] h-[220px] rounded-2xl border shadow-md">
                        <div className="flex justify-between">
                          <p className="text-3xl m-4">Improvements</p>
                          <p className="text-7xl text-[#083982e2] font-bold">
                            <GiBreakingChain />
                          </p>
                        </div>
                        <ul className="list-disc m-5">
                          <li>txxx</li>
                          <li>xxx</li>
                          <li>xxx</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div
                    className={` ${activeItem === "market" ? "" : "hidden"}`}
                  >
                    <div className="w-[330px] md:w-[620px] h-[250px] flex justify-between shadow-md rounded-2xl p-4 border">
                      <div className="block">
                        <h3>Based on the information shared with us..</h3>
                        <br />
                        <div>
                          {loading ? (
                            <div className="text-center m-auto flex">
                              <div className="w-4 h-4 border-t-4 border-blue-400 border-solid rounded-full animate-spin z-10"></div>
                            </div>
                          ) : (
                            <div>
                              {teamscores.map((teamscore) => (
                                <p>
                                  Below is your market score of{" "}
                                  <span className="font-bold">
                                    {teamscore.apiScores.api_score2 !== null
                                      ? teamscore.apiScores.api_score2 >= 0 &&
                                        teamscore.apiScores.api_score2 <= 100
                                        ? `${calculateGrade(
                                            teamscore.apiScores.api_score2 * 20
                                          )}`
                                        : "Out of Range"
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
                    <div className="md:flex justify-between mt-[690px] md:mt-10 mb-4">
                      <div className=" w-[330px] md:w-[300px] h-[220px] rounded-2xl border shadow-md mb-4 md:mb-0">
                        <div className="flex justify-between">
                          <p className="text-3xl m-4">Strengths</p>
                          <p className="text-7xl text-[#083982e2]">
                            <AiOutlineBarChart />
                          </p>
                        </div>
                        <ul className="list-disc m-5">
                          <li>mxx</li>
                          <li>xxx</li>
                          <li>xxx</li>
                        </ul>
                      </div>
                      <div className=" w-[330px] md:w-[300px] h-[220px] rounded-2xl border shadow-md">
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
                  <div
                    className={`${activeItem === "business" ? "" : "hidden"}`}
                  >
                    <div className="w-[330px] md:w-[620px] h-[250px] flex justify-between shadow-md rounded-2xl p-4 border ">
                      <div className="block">
                        <h3>Based on the information shared with us..</h3>
                        <br />
                        <div>
                          {loading ? (
                            <div className="text-center m-auto flex">
                              <div className="w-4 h-4 border-t-4 border-blue-400 border-solid rounded-full animate-spin z-10"></div>
                            </div>
                          ) : (
                            <div>
                              {teamscores.map((teamscore) => (
                                <p>
                                  Below is your business model score of{" "}
                                  <span className="font-bold">
                                    {teamscore.apiScores.api_score3 !== null
                                      ? teamscore.apiScores.api_score3 >= 0 &&
                                        teamscore.apiScores.api_score3 <= 100
                                        ? `${calculateGrade(
                                            teamscore.apiScores.api_score3 * 20
                                          )}`
                                        : "Out of Range"
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
                    <div className="md:flex justify-between mt-[690px] md:mt-10 mb-4">
                      <div className=" w-[330px] md:w-[300px] h-[220px] rounded-2xl border shadow-md mb-4 md:mb-0">
                        <div className="flex justify-between">
                          <p className="text-3xl m-4">Strengths</p>
                          <p className="text-7xl text-[#083982e2]">
                            <AiOutlineBarChart />
                          </p>
                        </div>
                        <ul className="list-disc m-5">
                          <li>bxx</li>
                          <li>xxx</li>
                          <li>xxx</li>
                        </ul>
                      </div>
                      <div className=" w-[330px] md:w-[300px] h-[220px] rounded-2xl border shadow-md">
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

                  <div
                    className={` ${activeItem === "finance" ? "" : "hidden"}`}
                  >
                    <div className="w-[330px] md:w-[620px] h-[250px] flex justify-between shadow-md rounded-2xl p-4 border">
                      <div className="block">
                        <h3>Based on the information shared with us..</h3>
                        <br />
                        <div>
                          {loading ? (
                            <div className="text-center m-auto flex">
                              <div className="w-4 h-4 border-t-4 border-blue-400 border-solid rounded-full animate-spin z-10"></div>
                            </div>
                          ) : (
                            <div>
                              {teamscores.map((teamscore) => (
                                <p>
                                  Below is your financial score of{" "}
                                  <span className="font-bold">
                                    {teamscore.apiScores.api_score4 !== null
                                      ? teamscore.apiScores.api_score4 >= 0 &&
                                        teamscore.apiScores.api_score4 <= 100
                                        ? `${calculateGrade(
                                            teamscore.apiScores.api_score4 * 20
                                          )}`
                                        : "Out of Range"
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
                    <div className="md:flex justify-between mt-[690px] md:mt-10 mb-4">
                      <div className=" w-[330px] md:w-[300px] h-[220px] rounded-2xl border shadow-md mb-4 md:mb-0">
                        <div className="flex justify-between">
                          <p className="text-3xl m-4">Strengths</p>
                          <p className="text-7xl text-[#083982e2]">
                            <AiOutlineBarChart />
                          </p>
                        </div>
                        <ul className="list-disc m-5">
                          <li>fxx</li>
                          <li>xxx</li>
                          <li>xxx</li>
                        </ul>
                      </div>
                      <div className=" w-[330px] md:w-[300px] h-[220px] rounded-2xl border shadow-md">
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

                  <div
                    className={`${activeItem === "governance" ? "" : "hidden"}`}
                  >
                    <div className="w-[330px] md:w-[620px] h-[250px] flex justify-between shadow-md rounded-2xl p-4 border">
                      <div className="block">
                        <h3>Based on the information shared with us.. </h3>
                        <br />
                        <div>
                          {loading ? (
                            <div className="text-center m-auto flex">
                              <div className="w-4 h-4 border-t-4 border-blue-400 border-solid rounded-full animate-spin z-10"></div>
                            </div>
                          ) : (
                            <div>
                              {teamscores.map((teamscore) => (
                                <p>
                                  Below is your governance score of{" "}
                                  <span className="font-bold">
                                    {teamscore.apiScores.api_score5 !== null
                                      ? teamscore.apiScores.api_score5 >= 0 &&
                                        teamscore.apiScores.api_score5 <= 100
                                        ? `${calculateGrade(
                                            teamscore.apiScores.api_score5 * 20
                                          )}`
                                        : "Out of Range"
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

                    <div className="md:flex justify-between mt-[690px] md:mt-10 mb-4">
                      <div className=" w-[330px] md:w-[300px] h-[220px] rounded-2xl border shadow-md mb-4 md:mb-0">
                        <div className="flex justify-between">
                          <p className="text-3xl m-4">Strengths</p>
                          <p className="text-7xl text-[#083982e2]">
                            <AiOutlineBarChart />
                          </p>
                        </div>
                        <ul className="list-disc m-5">
                          <li>gxxx</li>
                          <li>xxx</li>
                          <li>xxx</li>
                        </ul>
                      </div>
                      <div className=" w-[330px] md:w-[300px] h-[220px] rounded-2xl border shadow-md">
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
                </div>
                <div className="absolute top-[750px] left-4 md:static block -mt-28 mr-10">
                  <div className="bg-[#083982e2] w-[330px] md:w-[350px] md:h-[400px] h-[420px] rounded-3xl p-6 justify-center text-center text-white">
                    <h3 className="text-2xl">Vester score</h3>
                    <div className="ml-20 mt-10 w-32 h-32 border-dashed border-2 border-white rounded-[50%] p-10">
                      <div>
                        {loading ? (
                          <div className="text-center m-auto">
                            <div className="w-10 h-10 border-t-4 border-blue-400 border-solid rounded-full animate-spin z-10"></div>
                          </div>
                        ) : (
                          <div>
                            {teamscores.map((teamscore) => (
                              <p className="text-5xl font-cursive">
                                {teamscore.apiScores.Grade || "NA"}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <div>
                        <div>
                          {teamscores.map((teamscore) => (
                            <p className="text-center font-bold mt-5">
                              {(() => {
                                const grade = teamscore.apiScores.Grade || "NA";
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
                      </div>
                    </div>
                  </div>
                  <div className="w-[330px] md:w-[350px] h-[220px] border-4 border-red-400 rounded-3xl mt-4 md:mt-10">
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
