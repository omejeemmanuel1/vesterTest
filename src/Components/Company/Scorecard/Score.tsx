/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
// import { useTheme } from "../../../Context/ThemeContext";
import { BsBarChart } from "react-icons/bs";
import { GiBreakingChain } from "react-icons/gi";
import { GiCheckMark } from "react-icons/gi";

import axios from "axios";
import Badge from "../../../assets/BadgeDash.png";
import BadgeAPlus from "../../../assets/BadgeA+.png";
import BadgeA from "../../../assets/BadgeA.png";
import BadgeB from "../../../assets/BadgeB.png";
import BadgeC from "../../../assets/BadgeC.png";
import BadgeD from "../../../assets/BadgeD.png";
import BadgeE from "../../../assets/BadgeE.png";
import BadgeF from "../../../assets/BadgeF.png";
import ScoreNav from "./ScoreNav";
import ScoreSideBar from "./ScoreSideBar";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

interface ApiScores {
  balance: string;
  c_level: string;
  commit: string;
  founding_team: string;
  key_roles: string;
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
  apiScore: ApiScores;
}

interface BusinessScore {
  _id: string;
  apiScores: ApiScores;
}

interface MarketScore {
  _id: string;
  apiScores: ApiScores;
}

interface FinancialScore {
  _id: string;
  apiScores: ApiScores;
}

interface GovernanceScore {
  _id: string;
  apiScores: ApiScores;
}

function convertNumberToGrade(vesterScore: number) {
  if (vesterScore >= 5) {
    return "A+";
  } else if (vesterScore >= 4.5) {
    return "A";
  } else if (vesterScore >= 4) {
    return "B+";
  } else if (vesterScore >= 3.5) {
    return "B";
  } else if (vesterScore >= 3) {
    return "C";
  } else if (vesterScore >= 2.5) {
    return "D";
  } else if (vesterScore >= 2) {
    return "E";
  } else {
    return "F";
  }
}

function convertGradeToNumber(grade: any) {
  if (grade === "A+") {
    return 5;
  } else if (grade === "A") {
    return 4.5;
  } else if (grade === "B+") {
    return 4;
  } else if (grade === "B") {
    return 3.5;
  } else if (grade === "C") {
    return 3;
  } else if (grade === "D") {
    return 2.5;
  } else if (grade === "E") {
    return 2;
  } else {
    return 0;
  }
}

function convertVesterScoreToImage(vesterScore: any) {
  if (vesterScore >= 5) {
    return BadgeAPlus;
  } else if (vesterScore >= 4.5) {
    return BadgeA;
  } else if (vesterScore >= 4) {
    return BadgeB;
  } else if (vesterScore >= 3.5) {
    return BadgeB;
  } else if (vesterScore >= 3) {
    return BadgeC;
  } else if (vesterScore >= 2) {
    return BadgeD;
  } else if (vesterScore >= 1) {
    return BadgeE;
  } else {
    return BadgeF;
  }
}

const apiNames = [
  "team info",
  "business info",
  "market info",
  "financial info",
  "governance info",
];

function getMessageForBalance(balance: number) {
  const messages: { [key: number]: string } = {
    1: "Message for balance",
    2: "Message for balance",
    3: "Message for balance",
    4: "Message for balance",
    5: "Message for balance",
  };
  return messages[balance] || "No message available";
}

function getMessageForCLevel(c_level: number) {
  const messages: { [key: number]: string } = {
    0: "• Message for clevel",
    1: "• Message for clevel",
    2: "• Good leadership! Your C-level team is good, but continuous improvement is key.",
    3: "• Promising C-level team! Consider further enhancing the expertise of your leadership for better prospects.",
    4: "• Strong C-level expertise! Leverage your talented leaders to make your startup thrive.",
    5: "• Your C-level team's expertise is remarkable. Keep them motivated and guide your startup to success.",
  };
  return messages[c_level] || "No message available";
}

function getMessageForCommitment(commit: number) {
  const messages: { [key: number]: string } = {
    1: "Message for commit",
    2: "Message for commit",
    3: "Message for commit",
    4: "Message for commit ",
    5: "Message for commit",
  };
  return messages[commit] || "No message available";
}

function getMessageForFoundingTeam(founding_team: number) {
  const messages: { [key: number]: string } = {
    0: "• Work in progress! Your founding team has potential, but there's room for improvement.",
    1: "• Room for improvement! Focus on enhancing the expertise and balance within your founding team.",
    2: "• Good start! Your founding team shows potential, but strive for better balance and expertise.",
    3: "• Strong foundation! Your founding team is promising, but there's room for enhancement. Consider refining your team's balance.",
    4: "• Impressive founding team! Your expertise and balance are commendable. Keep pushing your startup forward with confidence.",
    5: "• Your founding team's expertise and balance are exemplary. Keep up the good work and leverage your strong foundation for growth.",
  };
  return messages[founding_team] || "No message available";
}

function getMessageForKeyRoles(key_roles: number) {
  const messages: { [key: number]: string } = {
    1: "Message for key_roles",
    2: "Message for key_roles",
    3: "Message for key_roles",
    4: "Message for key_roles",
    5: "Message for key_roles",
  };
  return messages[key_roles] || "No message available";
}

const Score: React.FC = () => {
  const [activeItem, setActiveItem] = useState("overall");
  const [teamscores, setTeamscores] = useState<TeamScore[]>([]);
  const [businessScores, setBusinessScores] = useState<BusinessScore[]>([]);
  const [marketScores, setMarketScores] = useState<MarketScore[]>([]);
  const [financialScores, setFinancialScores] = useState<FinancialScore[]>([]);
  const [governanceScores, setGovernanceScores] = useState<GovernanceScore[]>(
    []
  );
  const [vesterScore, setVesterScore] = useState<string>("");
  const [, setVesterGrade] = useState<string>("");
  const [emptyAPIsList, setEmptyAPIsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const teamscoresApiUrl = `${baseUrl}/teamscore/get-teamScores`;

        const response = await axios.get(teamscoresApiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTeamscores(response.data);
      } catch (error) {
        console.error("Failed to fetch teamscores", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const teamscoresApiUrl = `${baseUrl}/teamscore/get-businessScores`;

        const response = await axios.get(teamscoresApiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBusinessScores(response.data);
      } catch (error) {
        console.error("Failed to fetch businessScores", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const teamscoresApiUrl = `${baseUrl}/teamscore/get-marketScores`;

        const response = await axios.get(teamscoresApiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMarketScores(response.data);
      } catch (error) {
        console.error("Failed to fetch marketScores", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const teamscoresApiUrl = `${baseUrl}/teamscore/get-financialScores`;

        const response = await axios.get(teamscoresApiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFinancialScores(response.data);
      } catch (error) {
        console.error("Failed to fetch financialScores", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const teamscoresApiUrl = `${baseUrl}/teamscore/get-governanceScores`;

        const response = await axios.get(teamscoresApiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setGovernanceScores(response.data);
      } catch (error) {
        console.error("Failed to fetch governanceScores", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const allScores = [
      teamscores,
      businessScores,
      marketScores,
      financialScores,
      governanceScores,
    ];

    const emptyAPIs: any = [];

    allScores.forEach((scores, index) => {
      if (scores.length === 0) {
        emptyAPIs.push(apiNames[index]);
      }
    });

    setEmptyAPIsList(emptyAPIs);

    const anyEmpty = allScores.some((scores) => scores.length === 0);

    if (anyEmpty) {
      setVesterScore(Badge);
      setVesterGrade("NA");
    } else {
      const flattenedScores = allScores.flat();

      const totalGrade = flattenedScores.reduce((acc, score) => {
        if (score.apiScores) {
          const numericalGrade = convertGradeToNumber(score.apiScores.Grade);
          return acc + numericalGrade;
        }
        return acc;
      }, 0);

      const vesterScore =
        flattenedScores.length > 0 ? totalGrade / flattenedScores.length : 0;

      const vesterGrade = convertNumberToGrade(vesterScore);

      const vesterImage = convertVesterScoreToImage(vesterScore);

      setVesterScore(vesterImage);
      setVesterGrade(vesterGrade);
    }
  }, [
    teamscores,
    businessScores,
    marketScores,
    financialScores,
    governanceScores,
  ]);

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
  };

  return (
    <>
      <div className="flex overflow-hidden font-poppins">
        <div>
          <ScoreSideBar />
        </div>

        <div className="flex-1">
          <ScoreNav bgColor="bg-white" />

          <div className="">
            <div className={`${activeItem === "overall"}`}>
              <div className="flex text-white">
                <div className="text-[20px] ml-16 rounded-l-2xl border-r border-gray-400 md:h-[300px] md:w-[400px] h-[370px] md:justify-between bg-[#031549]">
                  <div className="ml-28 mt-4">
                    <h2 className="w-full">Your Vester Score</h2>
                    <img src={vesterScore} alt="" className="ml-4 w-[44%] " />
                  </div>
                  <div>
                    <p className="text-center absolute top-[310px] left-[320px] w-[400px] text-[16px]">
                      {(() => {
                        if (vesterScore === BadgeAPlus) {
                          return "Congratulations! Your startup is exceptionally well-prepared for investment.";
                        } else if (vesterScore === BadgeA) {
                          return "Well done! Your startup is in great shape for investment.";
                        } else if (vesterScore === BadgeB) {
                          return "Good work! You're on the right track and your startup shows promise, but a few tweaks can enhance your investment prospects.";
                        } else if (vesterScore === BadgeC) {
                          return "A good start! Your startup is on the journey to investment readiness. Focus on improving to unlock more opportunities.";
                        } else if (vesterScore === BadgeD) {
                          return "Keep going! Your startup has potential, but several areas need improvement for increased investment attractiveness.";
                        } else if (vesterScore === BadgeE) {
                          return "There's work to be done! Identify weaknesses and make essential improvements to enhance your startup's investment readiness.";
                        } else if (vesterScore === BadgeF) {
                          return "Time to refocus! Your startup faces significant challenges in investment readiness. Identify and address weaknesses to progress.";
                        } else {
                          return "Vester score is not yet available.";
                        }
                      })()}
                    </p>
                  </div>
                </div>
                <div className="text-center  p-6 text-[20px] rounded-r-2xl md:h-[300px]  md:w-[650px] h-[370px] md:justify-center bg-[#031549]">
                  <h2 className="mb-6 font-bold text-2xl">Score Summary</h2>
                  <div className=" text-center ">
                    {emptyAPIsList.length > 0 && (
                      <p>
                        Complete your{" "}
                        <strong>{emptyAPIsList.join(", ")}</strong> to get your{" "}
                        <strong>Vester Score</strong> and connect with potential
                        investors
                      </p>
                    )}

                    {emptyAPIsList.length === 0 && (
                      <div>
                        <p className="text-center">
                          {(() => {
                            if (vesterScore === BadgeAPlus) {
                              return "An A+ score signifies an outstanding level of investment readiness, indicating strong strengths across various aspects of your startup, making it highly attractive to investors.";
                            } else if (vesterScore === BadgeA) {
                              return "An A score suggests a high level of investment readiness, showcasing your strengths in key areas and making your startup a compelling choice for investors.";
                            } else if (vesterScore === BadgeB) {
                              return "A B score indicates that your startup is promising, with significant strengths, yet some aspects may need refinement to attract investors more effectively.";
                            } else if (vesterScore === BadgeC) {
                              return "A C score reflects a moderate investment readiness level, showing potential, but also indicating the need for enhancements in various areas to gain investor interest.";
                            } else if (vesterScore === BadgeD) {
                              return "A D score suggests that your startup has potential but has significant areas that require development and enhancement to become more appealing to investors.";
                            } else if (vesterScore === BadgeE) {
                              return "An E score signifies that your startup has notable weaknesses and requires substantial improvements in several areas to become more appealing to investors.";
                            } else if (vesterScore === BadgeF) {
                              return "An F score indicates that your startup faces substantial challenges and needs substantial improvements in multiple areas to become attractive to investors.";
                            } else {
                              return "Vester score is not yet available.";
                            }
                          })()}
                        </p>
                        <button className="bg-[#ec7f36] p-2 pr-4 pl-4 mt-12 rounded-full text-white">
                          View your investor matches
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ul className="md:flex mb-4 justify-between mt-6 mr-16 ml-16">
            <li
              onClick={() => handleItemClick("overall")}
              className={
                activeItem === "overall"
                  ? "active text-[#031549] flex"
                  : "text-[#031549] flex"
              }
            >
              <div
                className={
                  activeItem === "overall"
                    ? "active bg-[#031549] text-white shadow font-bold pt-2 border border-blue-950 rounded-lg cursor-pointer w-40 text-center h-10"
                    : "shadow font-bold pt-2 border border-blue-950 rounded-lg cursor-pointer w-40 text-center h-10"
                }
              >
                Vester Score
              </div>

              <span
                className={
                  activeItem === "overall"
                    ? "active font-bold bg-[#ec7f36] border-[3px] border-dashed border-[#031549] p-3 -ml-5 text-center rounded-full w-12 h-12 -mt-1"
                    : "font-bold bg-white border-[3px] border-dashed border-[#ec7f36] p-3 -ml-5 text-center rounded-full w-12 h-12 -mt-1"
                }
              >
                {/* {vesterGrade || "NA"} */}
                <GiCheckMark />
              </span>
            </li>
            <li
              onClick={() => handleItemClick("team")}
              className={
                activeItem === "team"
                  ? "active text-[#031549] flex"
                  : "text-[#031549] flex"
              }
            >
              <div
                className={
                  activeItem === "team"
                    ? "active bg-[#031549] text-white shadow font-bold pt-2 border border-blue-950 rounded-lg cursor-pointer w-32 text-center h-10"
                    : "shadow font-bold pt-2 border border-blue-950 rounded-lg cursor-pointer w-32 text-center h-10"
                }
              >
                Team
              </div>
              {teamscores.length === 0 ? (
                <span
                  className={
                    activeItem === "team"
                      ? "active font-bold bg-[#ec7f36] border-[3px] border-dashed border-[#031549] p-2 -ml-5 text-center rounded-full w-12 h-12 -mt-1"
                      : "font-bold bg-white border-[3px] border-dashed border-[#ec7f36] p-2 -ml-5 text-center rounded-full w-12 h-12 -mt-1"
                  }
                >
                  NA
                </span>
              ) : (
                teamscores.map((teamscore) => (
                  <span
                    className={
                      activeItem === "team"
                        ? "active font-bold bg-[#ec7f36] border-[3px] border-dashed border-[#031549] p-2 -ml-5 text-center rounded-full w-12 h-12 -mt-1"
                        : "font-bold bg-white border-[3px] border-dashed border-[#ec7f36] p-2 -ml-5 text-center rounded-full w-12 h-12 -mt-1"
                    }
                  >
                    {teamscore.apiScores.Grade || "NA"}
                  </span>
                ))
              )}
            </li>
            <li
              onClick={() => handleItemClick("market")}
              className={
                activeItem === "market"
                  ? "active text-[#031549] flex"
                  : "text-[#031549] flex"
              }
            >
              <div
                className={
                  activeItem === "market"
                    ? "active bg-[#031549] text-white shadow font-bold pt-2 border border-blue-950 rounded-lg cursor-pointer w-32 text-center h-10"
                    : "shadow font-bold pt-2 border border-blue-950 rounded-lg cursor-pointer w-32 text-center h-10"
                }
              >
                Market
              </div>
              {marketScores.length === 0 ? (
                <span
                  className={
                    activeItem === "market"
                      ? "active font-bold bg-[#ec7f36] border-[3px] border-dashed border-[#031549] p-2 -ml-5 text-center rounded-full w-12 h-12 -mt-1"
                      : "font-bold bg-white border-[3px] border-dashed border-[#ec7f36] p-2 -ml-5 text-center rounded-full w-12 h-12 -mt-1"
                  }
                >
                  NA
                </span>
              ) : (
                marketScores.map((marketScore) => (
                  <span
                    className={
                      activeItem === "market"
                        ? "active font-bold bg-[#ec7f36] border-[3px] border-dashed border-[#031549] p-2 -ml-5 text-center rounded-full w-12 h-12 -mt-1"
                        : "font-bold bg-white border-[3px] border-dashed border-[#ec7f36] p-2 -ml-5 text-center rounded-full w-12 h-12 -mt-1"
                    }
                  >
                    {marketScore.apiScores.Grade || "NA"}
                  </span>
                ))
              )}
            </li>
            <li
              onClick={() => handleItemClick("business")}
              className={
                activeItem === "business"
                  ? "active text-[#031549] flex"
                  : "text-[#031549] flex"
              }
            >
              <div
                className={
                  activeItem === "business"
                    ? "active bg-[#031549] text-white shadow font-bold pt-2 border border-blue-950 rounded-lg cursor-pointer w-32 text-center h-10"
                    : "shadow font-bold pt-2 border border-blue-950 rounded-lg cursor-pointer w-32 text-center h-10"
                }
              >
                Business
              </div>
              {businessScores.length === 0 ? (
                <span
                  className={
                    activeItem === "business"
                      ? "active font-bold bg-[#ec7f36] border-[3px] border-dashed border-[#031549] p-2 -ml-5 text-center rounded-full w-12 h-12 -mt-1"
                      : "font-bold bg-white border-[3px] border-dashed border-[#ec7f36] p-2 -ml-5 text-center rounded-full w-12 h-12 -mt-1"
                  }
                >
                  NA
                </span>
              ) : (
                businessScores.map((businessScore) => (
                  <span
                    className={
                      activeItem === "business"
                        ? "active font-bold bg-[#ec7f36] border-[3px] border-dashed border-[#031549] p-2 -ml-5 text-center rounded-full w-12 h-12 -mt-1"
                        : "font-bold bg-white border-[3px] border-dashed border-[#ec7f36] p-2 -ml-5 text-center rounded-full w-12 h-12 -mt-1"
                    }
                  >
                    {businessScore.apiScores.Grade || "NA"}
                  </span>
                ))
              )}
            </li>
            <li
              onClick={() => handleItemClick("finance")}
              className={
                activeItem === "finance"
                  ? "active text-[#031549] flex"
                  : "text-[#031549] flex"
              }
            >
              <div
                className={
                  activeItem === "finance"
                    ? "active bg-[#031549] text-white shadow font-bold pt-2 border border-blue-950 rounded-lg cursor-pointer w-32 text-center h-10"
                    : "shadow font-bold pt-2 border border-blue-950 rounded-lg cursor-pointer w-32 text-center h-10"
                }
              >
                Finance
              </div>
              {financialScores.length === 0 ? (
                <span
                  className={
                    activeItem === "finance"
                      ? "active font-bold bg-[#ec7f36] border-[3px] border-dashed border-[#031549] p-2 -ml-5 text-center rounded-full w-12 h-12 -mt-1"
                      : "font-bold bg-white border-[3px] border-dashed border-[#ec7f36] p-2 -ml-5 text-center rounded-full w-12 h-12 -mt-1"
                  }
                >
                  NA
                </span>
              ) : (
                financialScores.map((financialScore) => (
                  <span
                    className={
                      activeItem === "finance"
                        ? "active font-bold bg-[#ec7f36] border-[3px] border-dashed border-[#031549] p-2 -ml-5 text-center rounded-full w-12 h-12 -mt-1"
                        : "font-bold bg-white border-[3px] border-dashed border-[#ec7f36] p-2 -ml-5 text-center rounded-full w-12 h-12 -mt-1"
                    }
                  >
                    {financialScore.apiScores.Grade || "NA"}
                  </span>
                ))
              )}
            </li>
            <li
              onClick={() => handleItemClick("governance")}
              className={
                activeItem === "governance"
                  ? "active text-[#031549] flex"
                  : "text-[#031549] flex"
              }
            >
              <div
                className={
                  activeItem === "governance"
                    ? "active bg-[#031549] text-white shadow font-bold pt-2 border border-blue-950 rounded-lg cursor-pointer w-40 text-center h-10"
                    : "shadow font-bold pt-2 border border-blue-950 rounded-lg cursor-pointer w-40 text-center h-10"
                }
              >
                Governance
              </div>
              {governanceScores.length === 0 ? (
                <span
                  className={
                    activeItem === "governance"
                      ? "active font-bold bg-[#ec7f36] border-[3px] border-dashed border-[#031549] p-2 -ml-5 text-center rounded-full w-12 h-12 -mt-1"
                      : "font-bold bg-white border-[3px] border-dashed border-[#ec7f36] p-2 -ml-5 text-center rounded-full w-12 h-12 -mt-1"
                  }
                >
                  NA
                </span>
              ) : (
                governanceScores.map((governanceScore) => (
                  <span
                    className={
                      activeItem === "governance"
                        ? "active font-bold bg-[#ec7f36] border-[3px] border-dashed border-[#031549] p-2 -ml-5 text-center rounded-full w-12 h-12 -mt-1"
                        : "font-bold bg-white border-[3px] border-dashed border-[#ec7f36] p-2 -ml-5 text-center rounded-full w-12 h-12 -mt-1"
                    }
                  >
                    {governanceScore.apiScores.Grade || "NA"}
                  </span>
                ))
              )}
            </li>
          </ul>
          <div className={`${activeItem === "overall" ? "" : "hidden"}`}>
            <div className="md:flex justify-between mt-[690px] md:mt-10 mb-4 ml-16 mr-16">
              <div className="w-[330px] md:w-[500px] h-[300px] rounded-2xl border shadow-md mb-4 md:mb-0">
                <div className="flex justify-between">
                  <p className="text-3xl m-2">Strengths</p>
                  <p className="text-6xl text-[#083982e2] mt-2 mr-4">
                    <BsBarChart />
                  </p>
                </div>
                <ul className="list-none m-5 text-sm">
                  <li>
                    {emptyAPIsList.length === 0 && (
                      <div>
                        {teamscores.map((teamscore) => (
                          <div key={teamscore._id}>
                            <p className="">
                              {["A+", "A", "B+", "B"].includes(
                                teamscore.apiScores.Grade
                              ) && (
                                <>
                                  {(() => {
                                    switch (teamscore.apiScores.Grade) {
                                      case "A+":
                                        return "• Your team is exceptionally strong. Keep nurturing your collective talent and expertise, and you'll excel. Invest in leadership and diverse skills to maintain your edge.";
                                      case "A":
                                        return "• Your team is a powerful asset, instilling confidence in investors. Continue your journey with this strong foundation.";
                                      case "B+":
                                        return "• Your team is solid, with considerable strengths. A few enhancements can make it even more appealing to investors.";
                                      case "B":
                                        return "• You have a promising team. A bit of fine-tuning can help your startup gain investor attention. Invest in leadership and diversify skills to reach your full potential.";
                                      default:
                                        return "Vester score is not yet available.";
                                    }
                                  })()}
                                </>
                              )}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                  <li>
                    {emptyAPIsList.length === 0 && (
                      <div>
                        {marketScores.map((marketScore) => (
                          <div key={marketScore._id}>
                            <p className="">
                              {["A+", "A", "B+", "B"].includes(
                                marketScore.apiScores.Grade
                              ) && (
                                <>
                                  {(() => {
                                    switch (marketScore.apiScores.Grade) {
                                      case "A+":
                                        return "• Your market readiness is exceptional, promising investor appeal right from the start.";
                                      case "A":
                                        return "• Your addressable market is promising and uniqueness is noteworthy, laying a solid foundation for attracting investors. Maximize your market strength.";
                                      case "B+":
                                        return "• Your market insight has potential, with minor room for improvement to boost investor interest.";
                                      case "B":
                                        return "• Your market readiness is good, with potential for growth upon some refinements. Continue refining your approach.";
                                      default:
                                        return "Vester score is not yet available.";
                                    }
                                  })()}
                                </>
                              )}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                  <li>
                    {emptyAPIsList.length === 0 && (
                      <div>
                        {businessScores.map((businessScore) => (
                          <div key={businessScore._id}>
                            <p className="">
                              {["A+", "A", "B+", "B"].includes(
                                businessScore.apiScores.Grade
                              ) && (
                                <>
                                  {(() => {
                                    switch (businessScore.apiScores.Grade) {
                                      case "A+":
                                        return "• Your business model is exceptional, presenting a highly attractive proposition to investors.";
                                      case "A":
                                        return "• Your business model is strong, instilling confidence in investors from the get-go.";
                                      case "B+":
                                        return "• Your business model is strong. Keep exploring new revenue sources and ensure scalability as you expand.";
                                      case "B":
                                        return "• Your business model is promising, with room for growth upon some adjustments. Explore new revenue sources and ensure scalability as you grow your startup.";
                                      default:
                                        return "Vester score is not yet available.";
                                    }
                                  })()}
                                </>
                              )}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </li>

                  <li>
                    {emptyAPIsList.length === 0 && (
                      <div>
                        {governanceScores.map((governanceScore) => (
                          <div key={governanceScore._id}>
                            <p className="">
                              {["A+", "A", "B+", "B"].includes(
                                governanceScore.apiScores.Grade
                              ) && (
                                <>
                                  {(() => {
                                    switch (governanceScore.apiScores.Grade) {
                                      case "A+":
                                        return "• Your governance structure is exemplary. Keep up with good practices and transparency.";
                                      case "A":
                                        return "• Your governance is commendable. Continue to foster good practices and transparency, building strong relationships with investors.";
                                      case "B+":
                                        return " •Your governance practices are positive. Uphold best practices and transparency while building robust investor relationships.";
                                      case "B":
                                        return "• Your governance is making strides with some room for improvement. Uphold good practices and transparency while strengthening investor relationships.";

                                      default:
                                        return "Vester score is not yet available.";
                                    }
                                  })()}
                                </>
                              )}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </li>

                  <li>
                    {emptyAPIsList.length === 0 && (
                      <div>
                        {financialScores.map((financialScore) => (
                          <div key={financialScore._id}>
                            <p className="">
                              {["A+", "A", "B+", "B"].includes(
                                financialScore.apiScores.Grade
                              ) && (
                                <>
                                  {(() => {
                                    switch (financialScore.apiScores.Grade) {
                                      case "A+":
                                        return "• Your financials are robust. Maintain a focus on profitability, growth, and solid margins. Be diligent in managing expenses and identifying revenue opportunities.";
                                      case "A":
                                        return "• Your financials are in good shape. Focus on profitability and sound margins. Manage expenses wisely and seize revenue opportunities.";
                                      case "B+":
                                        return "• Your financials are looking good, with some room for growth. Emphasize profitability and maintain solid margins. Manage expenses prudently and seek revenue opportunities.";
                                      case "B":
                                        return "• Your financials are promising, with potential for growth upon some adjustments. Prioritize profitability and maintaining strong margins. Manage expenses wisely and explore revenue opportunities.";

                                      default:
                                        return "Vester score is not yet available.";
                                    }
                                  })()}
                                </>
                              )}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                </ul>
              </div>
              <div className="w-[330px] md:w-[500px] h-[300px] rounded-2xl border shadow-md">
                <div className="flex justify-between">
                  <p className="text-3xl m-4">Improvements</p>
                  <p className="text-6xl text-[#083982e2] mt-4 mr-4">
                    <GiBreakingChain />
                  </p>
                </div>
                <ul className="m-5 text-sm">
                  <li>
                    {emptyAPIsList.length === 0 && (
                      <div>
                        {teamscores.map((teamscore) => (
                          <div key={teamscore._id}>
                            <p className="">
                              {["C", "D", "E", "F"].includes(
                                teamscore.apiScores.Grade
                              ) && (
                                <>
                                  {(() => {
                                    switch (teamscore.apiScores.Grade) {
                                      case "C":
                                        return "• Your team shows potential but needs improvement in various areas to inspire investor confidence. Invest in strengthening your team. Balance and diversity are key to thriving in the competitive startup ecosystem.";
                                        "";
                                      case "D":
                                        return "• Your team has potential, but significant areas need development to attract investor interest. Seek more expertise, commitment, and diversity to stand out in the market.";
                                      case "E":
                                        return "• Your team has weaknesses that need substantial improvements to make it appealing to investors. Invest in expertise, commitment, and diversity to strengthen your position.";
                                      case "F":
                                        return "• Your team faces significant challenges, requiring substantial development to attract investor interest. Address weaknesses urgently with a focus on expertise, commitment, and diversity.";
                                      default:
                                        return "Vester score is not yet available.";
                                    }
                                  })()}
                                </>
                              )}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                  <li>
                    {emptyAPIsList.length === 0 && (
                      <div>
                        {marketScores.map((marketScore) => (
                          <div key={marketScore._id}>
                            <p className="">
                              {["C", "D", "E", "F"].includes(
                                marketScore.apiScores.Grade
                              ) && (
                                <>
                                  {(() => {
                                    switch (marketScore.apiScores.Grade) {
                                      case "C":
                                        return "• Your market understanding is fair but needs enhancement to truly engage investors. Focus on defining your addressable market clearly. Understand your uniqueness and use it to your advantage.";
                                        "";
                                      case "D":
                                        return "• Your market readiness has potential but requires substantial improvement. Define your addressable market precisely. Leverage your uniqueness to capture more opportunities.";
                                      case "E":
                                        return "• Your market positioning has notable weaknesses that need substantial development. Clarify your addressable market definition. Leverage your uniqueness to unlock more market potential.";
                                      case "F":
                                        return "• Your market readiness faces significant challenges, necessitating substantial improvements to engage investors. Define your addressable market more clearly. Leverage your uniqueness to access untapped opportunities.";
                                      default:
                                        return "Vester score is not yet available.";
                                    }
                                  })()}
                                </>
                              )}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                  <li>
                    {emptyAPIsList.length === 0 && (
                      <div>
                        {businessScores.map((businessScore) => (
                          <div key={businessScore._id}>
                            <p className="">
                              {["C", "D", "E", "F"].includes(
                                businessScore.apiScores.Grade
                              ) && (
                                <>
                                  {(() => {
                                    switch (businessScore.apiScores.Grade) {
                                      case "C":
                                        return "• Your business model is fair but requires enhancement to engage investors fully.  Your business model needs refinement. Improve monetization and expand your reach for enhanced growth.";
                                      case "D":
                                        return "• Your business model has potential but needs substantial improvement. Optimize monetization and extend your reach for growth.";
                                      case "E":
                                        return "• Your business model faces notable weaknesses that require substantial development. Enhance monetization and expand your reach for growth.";
                                      case "F":
                                        return "• Your business model requires a major overhaul. Optimize monetization and expand your reach for sustainable growth.";
                                      default:
                                        return "Vester score is not yet available.";
                                    }
                                  })()}
                                </>
                              )}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </li>

                  <li>
                    {emptyAPIsList.length === 0 && (
                      <div>
                        {governanceScores.map((governanceScore) => (
                          <div key={governanceScore._id}>
                            <p className="">
                              {["C", "D", "E", "F"].includes(
                                governanceScore.apiScores.Grade
                              ) && (
                                <>
                                  {(() => {
                                    switch (governanceScore.apiScores.Grade) {
                                      case "C":
                                        return "• Governance Improvement Needed! Focus on improving governance and ensuring you're legally registered and regulator compliant.";
                                      case "D":
                                        return "• Governance Challenges! Work on addressing governance issues, legal registration, and compliance for better readiness.";
                                      case "E":
                                        return "• Governance Struggles! Identify and address substantial governance weaknesses to become more investment-ready.";
                                      case "F":
                                        return "• Governance Revamp Required! Substantial governance challenges need attention. Revamp to enhance your investment prospects.";
                                      default:
                                        return "Vester score is not yet available.";
                                    }
                                  })()}
                                </>
                              )}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </li>

                  <li>
                    {emptyAPIsList.length === 0 && (
                      <div>
                        {financialScores.map((financialScore) => (
                          <div key={financialScore._id}>
                            <p className="">
                              {["C", "D", "E", "F"].includes(
                                financialScore.apiScores.Grade
                              ) && (
                                <>
                                  {(() => {
                                    switch (financialScore.apiScores.Grade) {
                                      case "C":
                                        return "• Your financials are fair but require improvement for full investor engagement.  Keep an eye on financial sustainability. Work on achieving better revenue growth and cost management.";
                                      case "D":
                                        return "• Your financials have potential but need substantial development. Financial sustainability is a challenge. Focus on boosting revenue growth and cost management.";
                                      case "E":
                                        return "• Your financials face hurdles requiring substantial improvements. Work on avenues to increase revenue growth and efficient cost management.";
                                      case "F":
                                        return "• Your financials face substantial obstacles. Concentrate on improving revenue growth and cost management for sustainability.";
                                      default:
                                        return "Vester score is not yet available.";
                                    }
                                  })()}
                                </>
                              )}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={`${activeItem === "team" ? "" : "hidden"}`}>
            <div className="md:flex justify-between mt-[690px] md:mt-10 mb-4 ml-16 mr-16">
              <div className="w-[330px] md:w-[500px] h-[300px] rounded-2xl border shadow-md mb-4 md:mb-0">
                <div className="flex justify-between">
                  <p className="text-3xl m-2">Strengths</p>
                  <p className="text-6xl text-[#083982e2] mt-2 mr-4">
                    <BsBarChart />
                  </p>
                </div>
                <ul className="list-none m-5 text-sm">
                  <li>
                    {teamscores.map((teamscore) => (
                      <div key={teamscore._id}>
                        <p className="">
                          {teamscore.apiScore && (
                            <>
                              <p className="">
                                {/* {`Balance: ${teamscore.apiScore.balance}. `} */}
                                {parseInt(teamscore.apiScore.balance) >= 3
                                  ? getMessageForBalance(
                                      parseInt(teamscore.apiScore.balance)
                                    )
                                  : "Improvement"}
                              </p>
                              <p className="">
                                {/* {`C-Level: ${teamscore.apiScore.c_level}. `} */}
                                {parseInt(teamscore.apiScore.c_level) >= 3
                                  ? getMessageForCLevel(
                                      parseInt(teamscore.apiScore.c_level)
                                    )
                                  : "Improvement"}
                              </p>
                              <p className="">
                                {/* {`Commitment: ${teamscore.apiScore.commit}. `} */}
                                {parseInt(teamscore.apiScore.commit) >= 3
                                  ? getMessageForCommitment(
                                      parseInt(teamscore.apiScore.commit)
                                    )
                                  : "Improvement"}
                              </p>
                              <p className="">
                                {/* {`Founding Team: ${teamscore.apiScore.founding_team}. `} */}
                                {parseInt(teamscore.apiScore.founding_team) >= 3
                                  ? getMessageForFoundingTeam(
                                      parseInt(teamscore.apiScore.founding_team)
                                    )
                                  : "Improvement"}
                              </p>
                              <p className="">
                                {/* {`Key Roles: ${teamscore.apiScore.key_roles}. `} */}
                                {parseInt(teamscore.apiScore.key_roles) >= 3
                                  ? getMessageForKeyRoles(
                                      parseInt(teamscore.apiScore.key_roles)
                                    )
                                  : "Improvement"}
                              </p>
                            </>
                          )}
                        </p>
                      </div>
                    ))}
                  </li>
                </ul>
                <p className="ml-5">
                  {teamscores.every((teamscore) =>
                    Object.values(teamscore.apiScore).every(
                      (val) => parseInt(val) < 3
                    )
                  ) ? (
                    <p>No strength in any category.</p>
                  ) : null}
                </p>
              </div>
              <div className="w-[330px] md:w-[500px] h-[300px] rounded-2xl border shadow-md">
                <div className="flex justify-between">
                  <p className="text-3xl m-4">Improvements</p>
                  <p className="text-6xl text-[#083982e2] mt-4 mr-4">
                    <GiBreakingChain />
                  </p>
                </div>
                <ul className="list-none m-5 text-sm">
                  <li>
                    {teamscores.map((teamscore) => (
                      <div key={teamscore._id}>
                        <p className="">
                          {teamscore.apiScore && (
                            <>
                              <p className="">
                                {/* {`Balance: ${teamscore.apiScore.balance}. `} */}
                                {parseInt(teamscore.apiScore.balance) < 3
                                  ? getMessageForBalance(
                                      parseInt(teamscore.apiScore.balance)
                                    )
                                  : ""}
                              </p>
                              <p className="">
                                {/* {`C-Level: ${teamscore.apiScore.c_level}. `} */}
                                {parseInt(teamscore.apiScore.c_level) < 3
                                  ? getMessageForCLevel(
                                      parseInt(teamscore.apiScore.c_level)
                                    )
                                  : ""}
                              </p>
                              <p className="">
                                {/* {`Commitment: ${teamscore.apiScore.commit}. `} */}
                                {parseInt(teamscore.apiScore.commit) < 3
                                  ? getMessageForCommitment(
                                      parseInt(teamscore.apiScore.commit)
                                    )
                                  : ""}
                              </p>
                              <p className="">
                                {/* {`Founding Team: ${teamscore.apiScore.founding_team}. `} */}
                                {parseInt(teamscore.apiScore.founding_team) < 3
                                  ? getMessageForFoundingTeam(
                                      parseInt(teamscore.apiScore.founding_team)
                                    )
                                  : ""}
                              </p>
                              <p className="">
                                {/* {`Key Roles: ${teamscore.apiScore.key_roles}. `} */}
                                {parseInt(teamscore.apiScore.key_roles) < 3
                                  ? getMessageForKeyRoles(
                                      parseInt(teamscore.apiScore.key_roles)
                                    )
                                  : ""}
                              </p>
                            </>
                          )}
                        </p>
                      </div>
                    ))}
                  </li>
                </ul>
                <p className="ml-5">
                  {teamscores.every((teamscore) =>
                    Object.values(teamscore.apiScore).every(
                      (val) => parseInt(val) >= 3
                    )
                  ) ? (
                    <p>No improvement in any category.</p>
                  ) : null}
                </p>
              </div>
            </div>
          </div>

          <div className={` ${activeItem === "market" ? "" : "hidden"}`}>
            <div className="md:flex justify-between mt-[690px] md:mt-10 mb-4 ml-16 mr-16">
              <div className="w-[330px] md:w-[500px] h-[300px] rounded-2xl border shadow-md mb-4 md:mb-0">
                <div className="flex justify-between">
                  <p className="text-3xl m-4">Strengths</p>
                  <p className="text-6xl text-[#083982e2] mt-4 mr-4">
                    <BsBarChart />
                  </p>
                </div>
                <ul className="list-disc m-5">
                  <li>mxx</li>
                  <li>xxx</li>
                  <li>xxx</li>
                </ul>
              </div>
              <div className="w-[330px] md:w-[500px] h-[300px] rounded-2xl border shadow-md">
                <div className="flex justify-between">
                  <p className="text-3xl m-4">Improvements</p>
                  <p className="text-6xl text-[#083982e2] mt-4 mr-4">
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
          <div className={`${activeItem === "business" ? "" : "hidden"}`}>
            <div className="md:flex justify-between mt-[690px] md:mt-10 mb-4 ml-16 mr-16">
              <div className="w-[330px] md:w-[500px] h-[300px] rounded-2xl border shadow-md mb-4 md:mb-0">
                <div className="flex justify-between">
                  <p className="text-3xl m-4">Strengths</p>
                  <p className="text-6xl text-[#083982e2] mt-4 mr-4">
                    <BsBarChart />
                  </p>
                </div>
                <ul className="list-disc m-5">
                  <li>bxx</li>
                  <li>xxx</li>
                  <li>xxx</li>
                </ul>
              </div>
              <div className="w-[330px] md:w-[500px] h-[300px] rounded-2xl border shadow-md">
                <div className="flex justify-between">
                  <p className="text-3xl m-4">Improvements</p>
                  <p className="text-6xl text-[#083982e2] mt-4 mr-4">
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
          <div className={` ${activeItem === "finance" ? "" : "hidden"}`}>
            <div className="md:flex justify-between mt-[690px] md:mt-10 mb-4 ml-16 mr-16">
              <div className="w-[330px] md:w-[500px] h-[300px] rounded-2xl border shadow-md mb-4 md:mb-0">
                <div className="flex justify-between">
                  <p className="text-3xl m-4">Strengths</p>
                  <p className="text-6xl text-[#083982e2] mt-4 mr-4">
                    <BsBarChart />
                  </p>
                </div>
                <ul className="list-disc m-5">
                  <li>fxx</li>
                  <li>xxx</li>
                  <li>xxx</li>
                </ul>
              </div>
              <div className="w-[330px] md:w-[500px] h-[300px] rounded-2xl border shadow-md">
                <div className="flex justify-between">
                  <p className="text-3xl m-4">Improvements</p>
                  <p className="text-6xl text-[#083982e2] mt-4 mr-4">
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
          <div className={`${activeItem === "governance" ? "" : "hidden"}`}>
            <div className="md:flex justify-between mt-[690px] md:mt-10 mb-4 ml-16 mr-16">
              <div className="w-[330px] md:w-[500px] h-[300px] rounded-2xl border shadow-md mb-4 md:mb-0">
                <div className="flex justify-between">
                  <p className="text-3xl m-4">Strengths</p>
                  <p className="text-6xl text-[#083982e2] mt-4 mr-4">
                    <BsBarChart />
                  </p>
                </div>
                <ul className="list-disc m-5">
                  <li>gxxx</li>
                  <li>xxx</li>
                  <li>xxx</li>
                </ul>
              </div>
              <div className="w-[330px] md:w-[500px] h-[300px] rounded-2xl border shadow-md">
                <div className="flex justify-between">
                  <p className="text-3xl m-4">Improvements</p>
                  <p className="text-6xl text-[#083982e2] mt-4 mr-4">
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
      </div>
    </>
  );
};

export default Score;
