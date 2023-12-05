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
import GeneralInfoContainer from "../VesterData/CompanyOverview/GeneralInfoContainer";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

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
    console.log("emptyAPIsList:", emptyAPIs);
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

  const [showGeneralInfoModal, setShowGeneralInfoModal] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<
    string | undefined
  >();
  const [generalInfo, setGeneralInfo] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const generalInfoApiUrl = `${baseUrl}/teamscore/get-generalInfo`;

        const response = await axios.get(generalInfoApiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setGeneralInfo(response.data);
      } catch (error) {
        console.error("Failed to fetch generalinfo", error);
      }
    };
    fetchData();
  }, []);

  const isGeneralInfoEmpty = generalInfo.length === 0;

  const openGeneralInfoModal = (componentType: string) => {
    setSelectedComponent(componentType);
    if (isGeneralInfoEmpty) {
      setShowGeneralInfoModal(true);
    } else {
      navigate(`/${componentType}-info`);
    }
  };

  const closeGeneralInfoModal = () => {
    setShowGeneralInfoModal(false);
  };

  const handleGeneralInfoSubmit = (componentType: string) => {
    setSelectedComponent(componentType);
    closeGeneralInfoModal();

    navigate(`/team-info`);
  };

  return (
    <>
      {showGeneralInfoModal && (
        <Modal
          isOpen={showGeneralInfoModal}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
            },
            content: {
              background: "transparent",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: "0",
              left: "0",
            },
          }}
        >
          {selectedComponent !== undefined && (
            <GeneralInfoContainer
              onSubmit={handleGeneralInfoSubmit}
              selectedComponent={selectedComponent ?? ""}
              closeGeneralInfoModal={closeGeneralInfoModal}
            />
          )}
        </Modal>
      )}
      <div
        className={`flex bg-white ${
          theme === "light"
            ? "font-poppins text-[#fff]"
            : "dark:bg-[#031549] text-white"
        }`}
      >
        <div>
          {" "}
          <ComSideBar height="md:h-[900px] lg:[1000px]" />
        </div>

        <div className="flex-1">
          <ComNavBar />

          <div className="md:-mt-5">
            {emptyAPIsList.length === 5 ? (
              <div
                className={`block text-center ml-2 mr-2 rounded-2xl md:h-[30vh]  h-[370px] md:justify-center p-6 bg-[#031549] ${
                  theme === "light"
                    ? "font-poppins text-white"
                    : "dark:bg-white  text-[#000D80]"
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
                  Click <span className="font-bold">'Get Started'</span> below
                  to get your <strong>Vester Score</strong> and connect with
                  potential investors.
                </p>
                <button
                  className="bg-[#ec7f36] pl-6 pr-6 p-2 rounded-full mt-4"
                  onClick={() => openGeneralInfoModal("team")}
                >
                  Get Started
                </button>
              </div>
            ) : (
              <div className="flex">
                <div
                  className={`md:flex  text-[20px] ml-16 mr-2 rounded-2xl md:h-[25vh] md:w-[740px] lg:w-[100%] h-[370px] md:justify-between p-2 bg-[#031549] ${
                    theme === "light"
                      ? "font-poppins"
                      : "dark:bg-white text-[#031549]"
                  }`}
                >
                  <div className="w-full md:w-[50%] lg:w-[50%] md:ml-10">
                    <h2 className="">Your Vester Score</h2>
                    <img
                      src={vesterScore}
                      alt=""
                      className="md:ml-5 w-[34%] ml-28"
                    />
                  </div>
                  <div className="w-full md:w-[50%] lg:w-[50%] text-center mt-6 mr-4">
                    {emptyAPIsList.length === 0 ? (
                      <div>
                        <p>
                          We offer access to investors based on your Vester
                          Score
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
                    ) : (
                      <>
                        <p>
                          Complete your{" "}
                          <strong>{emptyAPIsList.join(", ")}</strong> to get
                          your <strong>Vester Score</strong> and connect with
                          potential investors
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div
                  className={`hidden md:block text-center pt-10 text-[20px] ml-2 mr-10 rounded-2xl md:h-[200px]  md:w-[300px] lg:w-[500px] h-[370px] md:justify-center p-6 bg-[#031549] ${
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
            )}

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
    </>
  );
};

export default CompanyDashboard;
