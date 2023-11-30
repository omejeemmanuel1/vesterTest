import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useTheme } from "../../../Context/ThemeContext";
import Piechart from "./PieChart/Piechart";
import ManArt from "../../../assets/manart.png";
import axios from "axios";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

interface GeneralInfo {
  registrationCountry?: string;
  fundingStage?: string;
}

interface Company {
  companyMail: string;
  companyName: string;
  companySector: string;
  verified: boolean;
  vesterScore: string;
  generalinfos: GeneralInfo[];
}

Modal.setAppElement("#root");

const CircularProgress: React.FC<{ percent: number }> = ({ percent }) => {
  const circumference = 16 * 2 * Math.PI;

  return (
    <div className="flex items-center justify-center relative">
      <svg className="w-20 h-20">
        <circle
          className="text-gray-600"
          strokeWidth="4"
          stroke="currentColor"
          fill="transparent"
          r="16"
          cx="38"
          cy="38"
        />
        <circle
          className="text-orange-500"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (percent / 103) * circumference}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="16"
          cx="38"
          cy="38"
        />
      </svg>
      <span className="text-[11px] absolute -mt-1">{`${percent}%`}</span>
    </div>
  );
};

const ReassessedStartup: React.FC = () => {
  const { theme } = useTheme();

  const [matchingCompanies, setMatchingCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch matching companies from localStorage
        const matchingCompaniesFromStorage =
          localStorage.getItem("matchingCompanies");
        if (matchingCompaniesFromStorage) {
          setMatchingCompanies(JSON.parse(matchingCompaniesFromStorage));
        } else {
          // Fetch matching companies from the API
          const response = await axios.get(`${baseUrl}/investor/get-all-data`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const matchingCompaniesData = response.data["Matching companies"];
          setMatchingCompanies(matchingCompaniesData);

          // Store matching companies in localStorage
          localStorage.setItem(
            "matchingCompanies",
            JSON.stringify(matchingCompaniesData)
          );
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const colors = ["#031549", "#0000FF", "#800080"];

  const countryData = matchingCompanies.reduce(
    (acc: Record<string, number>, company) => {
      if (company.generalinfos) {
        company.generalinfos.forEach((generalInfo) => {
          const country = generalInfo.registrationCountry || "NA";
          acc[country] = (acc[country] || 0) + 1;
        });
      }
      return acc;
    },
    {}
  );

  const totalCompanies = matchingCompanies.length;

  let colorIndex = 0;

  const countryPercentages = Object.entries(countryData).map(
    ([country, count]: [string, number]) => {
      const color = colors[colorIndex];
      colorIndex = (colorIndex + 1) % colors.length;
      return {
        value: (count / totalCompanies) * 100,
        color,
        title: `${(count / totalCompanies) * 100}% ${country}`,
      };
    }
  );

  // Calculate percentages for sectors
  const colors2 = ["#CF9FFF", "#7F00FF", "#DA70D6"];
  const sectorData = matchingCompanies.reduce(
    (acc: Record<string, number>, company) => {
      const sector = company.companySector || "NA";
      acc[sector] = (acc[sector] || 0) + 1;
      return acc;
    },
    {}
  );

  const totalSectors = matchingCompanies.length;
  let colorIndex2 = 0;

  const sectorPercentages = Object.entries(sectorData).map(
    ([sector, count]: [string, number]) => {
      const color = colors2[colorIndex2];
      colorIndex2 = (colorIndex2 + 1) % colors.length;
      return {
        value: (count / totalSectors) * 100,
        color,
        title: `${(count / totalSectors) * 100}% ${sector}`,
      };
    }
  );

  //calculate percentage for fundingStage
  const colors3 = ["#B4C424", "#FDDA0D", "#E4D00A"];
  const fundingData = matchingCompanies.reduce(
    (acc: Record<string, number>, company) => {
      if (company.generalinfos) {
        company.generalinfos.forEach((generalInfo) => {
          const country = generalInfo.fundingStage || "NA";
          acc[country] = (acc[country] || 0) + 1;
        });
      }
      return acc;
    },
    {}
  );

  const totalFundingStages = matchingCompanies.length;

  let colorIndex3 = 0;

  const fundingStagePercentages = Object.entries(fundingData).map(
    ([fundingStage, count]: [string, number]) => {
      const color = colors3[colorIndex3];
      colorIndex3 = (colorIndex3 + 1) % colors.length;
      return {
        value: (count / totalFundingStages) * 100,
        color,
        title: `${(count / totalFundingStages) * 100}% ${fundingStage}`,
      };
    }
  );

  const pieChartData = countryPercentages;
  const pieChartData2 = sectorPercentages;
  const pieChartData3 = fundingStagePercentages;

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div
        className={`font-poppins ${
          theme === "light"
            ? "font-poppins text-[#031549]"
            : "dark:bg-[#031549] text-[#031549]"
        }`}
      >
        <div className="flex ml-10 mr-10 mt-5 justify-between">
          <div className="bg-white rounded-lg w-[68%] p-4 h-[500px] shadow-md">
            <h2 className="mb-5 mt-5 font-bold">Recently Assessed Startups</h2>
            <table className="mb-5  w-full text-[#031549]">
              <thead className="text-sm text-center mb-5">
                <th>
                  <div className=" font-bold">Name</div>
                </th>
                <th>
                  <strong>Sector</strong>
                </th>
                <th>
                  <strong>Vester Score</strong>
                </th>
                <th>
                  <strong>Mandate match</strong>
                </th>
              </thead>
              {matchingCompanies.map((company) => (
                <>
                  {company.vesterScore !== "NA" && (
                    <tbody className="text-center">
                      <tr>
                        <td>
                          <div className="flex">
                            {" "}
                            <img
                              src={ManArt}
                              alt=""
                              className="w-8 h-7 rounded-full pr-1"
                            />{" "}
                            {company.companyName}
                          </div>
                        </td>
                        <td>{company.companySector}</td>
                        <td>
                          <div className="border border-[#ec7f36] rounded-full h-8 w-8 pt-1 ml-[70px] text-[#ec7f36]">
                            {company.vesterScore}
                          </div>
                        </td>
                        <td>
                          <div className="">
                            <CircularProgress percent={95} />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  )}
                </>
              ))}
            </table>
          </div>
          <div className="block">
            <div className="bg-white rounded-lg w-full h-[30%] shadow-md">
              <div className="flex space-x-16 pt-2 pl-6 pr-6">
                <h4>Country</h4>
                <h4>Top 3</h4>
              </div>

              <div className="flex">
                {" "}
                <div className="w-20 m-6 mb-8">
                  <Piechart data={pieChartData} />
                </div>
                <div className="m-5 mt-6">
                  {pieChartData.map((segment, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                      <span
                        style={{ backgroundColor: segment.color }}
                        className="rounded-full w-[12px] h-[12px]"
                      ></span>
                      <p className="-mt-1 text-sm">{segment.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg w-full h-[30%] mt-3 shadow-md">
              <div className="flex space-x-16 pt-2 pl-6 pr-6">
                <h4>Sector</h4>
                <h4>Top 3</h4>
              </div>

              <div className="flex">
                {" "}
                <div className="w-20 m-6 mb-8">
                  <Piechart data={pieChartData2} />
                </div>
                <div className="m-5 mt-6">
                  {pieChartData2.map((segment, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                      <span
                        style={{ backgroundColor: segment.color }}
                        className="rounded-full w-[12px] h-[12px]"
                      ></span>
                      <p className="-mt-1 text-sm">{segment.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg w-[300px] h-[30%] mt-3 shadow-md">
              <div className="flex space-x-16 pt-2 pl-6 pr-6">
                <h4>Stage</h4>
                <h4>Top 3</h4>
              </div>

              <div className="flex">
                {" "}
                <div className="w-20 m-6">
                  <Piechart data={pieChartData3} />
                </div>
                <div className="m-5 mt-6">
                  {pieChartData3.map((segment, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                      <span
                        style={{ backgroundColor: segment.color }}
                        className="rounded-full w-[12px] h-[12px]"
                      ></span>
                      <p className="-mt-1 text-sm">{segment.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReassessedStartup;
