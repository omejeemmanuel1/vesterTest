/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import ComSideBar from "./ComSideBar";
import { useTheme } from "../../../Context/ThemeContext";
import ProfileCard from "./ProfileCard";
import ComNavBar from "./ComNavBar";
import Badge from "../../../assets/BadgeDash.png";
import BadgeAPlus from "../../../assets/BadgeA+.png";
import BadgeA from "../../../assets/BadgeA.png";
import BadgeB from "../../../assets/BadgeB.png";
import BadgeC from "../../../assets/BadgeC.png";
import BadgeD from "../../../assets/BadgeD.png";
import BadgeE from "../../../assets/BadgeE.png";
import BadgeF from "../../../assets/BadgeF.png";
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

const CompanyDashboard: React.FC = () => {
  const { theme } = useTheme();
  const [teamscores, setTeamscores] = useState<TeamScore[]>([]);
  const [businessScores, setBusinessScores] = useState<BusinessScore[]>([]);
  const [marketScores, setMarketScores] = useState<MarketScore[]>([]);
  const [financialScores, setFinancialScores] = useState<FinancialScore[]>([]);
  const [governanceScores, setGovernanceScores] = useState<GovernanceScore[]>(
    []
  );
  const [vesterScore, setVesterScore] = useState<string>("");
  const [emptyAPIsList, setEmptyAPIsList] = useState([]);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [showInitialContent, setShowInitialContent] = useState(false);
  const [lastCompletedDate, setLastCompletedDate] = useState<Date | null>(null);

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

    const totalAPIs = apiNames.length;
    const filledAPIs = totalAPIs - emptyAPIs.length;
    const percentage = (filledAPIs / totalAPIs) * 100;

    setProgressPercentage(percentage);

    const anyEmpty = allScores.some((scores) => scores.length === 0);

    if (anyEmpty) {
      setVesterScore(Badge);

      localStorage.setItem("vesterScore", "Badge");
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

      const vesterImage = convertVesterScoreToImage(vesterScore);
      setVesterScore(vesterImage);

      localStorage.setItem("vesterScore", vesterImage);

      if (emptyAPIs.length === 0) {
        setLastCompletedDate(new Date());
        setShowInitialContent(false);
      }
    }
  }, [
    teamscores,
    businessScores,
    marketScores,
    financialScores,
    governanceScores,
    vesterScore,
  ]);

  return (
    <div
      className={`flex bg-white ${
        theme === "light"
          ? "font-poppins text-[#fff]"
          : "dark:bg-[#031549] text-white"
      }`}
    >
      <div>
        {" "}
        <ComSideBar height="h-[825px]" />
      </div>

      <div className="flex-1">
        <ComNavBar />

        <div className="md:-mt-5">
          {showInitialContent && (
            <div
              className={`block text-center ml-2 mr-2 rounded-2xl md:h-[200px] h-[370px] md:justify-center p-6 bg-[#031549] ${
                theme === "light"
                  ? "font-poppins text-[#000D80]"
                  : "dark:bg-white text-white"
              }`}
            >
              <h1 className="text-2xl">
                <span className="font-bold">Welcome to</span> Vester.AI
              </h1>
              <p>
                Your Investment Readiness journey starts with a few simple
                steps.
              </p>
              <br />
              <p>
                Click <span className="font-bold">'Get Started'</span> below to
                get your <strong>Vester Score</strong> and connect with
                potential investors.
              </p>
              <button className="bg-[#ec7f36] pl-6 pr-6 p-2 rounded-full mt-4">
                Get Started
              </button>
            </div>
          )}
          <div className="flex">
            <div
              className={`md:flex text-center text-[20px] ml-2 mr-2 rounded-2xl md:h-[200px] md:w-[740px] h-[370px] md:justify-between p-2 bg-[#031549] ${
                theme === "light"
                  ? "font-poppins"
                  : "dark:bg-white text-[#031549]"
              }`}
            >
              <div className="w-full md:w-[50%] md:ml-10">
                <h2 className="">Your Vester Score</h2>
                <img
                  src={vesterScore}
                  alt=""
                  className="md:ml-5 w-[34%] ml-28"
                />
              </div>
              <div className="w-full md:w-[50%] text-center mt-6 mr-4">
                {emptyAPIsList.length > 0 && (
                  <p>
                    Complete your <strong>{emptyAPIsList.join(", ")}</strong> to
                    get your <strong>Vester Score</strong> and connect with
                    potential investors
                  </p>
                )}

                {emptyAPIsList.length === 0 && (
                  <div>
                    <p>
                      We offer access to investors based on your Vester Score
                    </p>
                    <div className="flex justify-between mt-10">
                      <button className="md:text-sm text-[11px] rounded-full pl-6 pr-6 pt-1 pb-1 h-12 bg-orange-500 text-white">
                        Understand your <br />
                        Vester Score
                      </button>
                      <button className="md:text-sm text-[11px] rounded-full pl-6 pr-6 pt-1 pb-1 h-12 bg-orange-500 text-white">
                        Start your <br /> investor match
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div
              className={`hidden md:block text-center pt-10 text-[20px] ml-10 mr-10 rounded-2xl md:h-[200px]  md:w-[300px] h-[370px] md:justify-center p-6 bg-[#031549] ${
                theme === "light"
                  ? "font-poppins"
                  : "dark:bg-white text-[#031549]"
              }`}
            >
              <p>Profile completion</p>
              <div className="flex justify-center">
                <div className="bg-gray-300 w-[60%] h-4 rounded-full mt-4">
                  <div
                    className="bg-[#ec7f36] h-4 rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="mt-2 ml-1">{`${progressPercentage.toFixed(
                  0
                )}%`}</div>
              </div>
              {lastCompletedDate && (
                <p className="mt-4 text-[14px]">
                  Last Completed:{" "}
                  {lastCompletedDate.toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}
            </div>
          </div>

          <div>
            <ProfileCard
              isGovernanceApiEmpty={governanceScores.length === 0}
              isFinancialApiEmpty={financialScores.length === 0}
              isBusinessApiEmpty={businessScores.length === 0}
              isMarketApiEmpty={marketScores.length === 0}
              isTeamApiEmpty={teamscores.length === 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
