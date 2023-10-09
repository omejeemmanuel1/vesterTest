/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import ComSideBar from "./ComSideBar";
import { useTheme } from "../../../Context/ThemeContext";
import loader from "../../../assets/loader.gif";
import Avatar from "../../../assets/man.png";
import ProfileCard from "./ProfileCard";
import ComNavBar from "./ComNavBar";
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
}

const CompanyDashboard: React.FC = () => {
  const [companyInfo, setCompanyInfo] = useState({
    companyLogo: "",
    companyType: "",
  });
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);
  const [teamscores, setTeamscores] = useState<TeamScore[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: DecodedToken = jwt_decode(token);
      console.log(decodedToken.sub.companyWebsite);
      setDecodedToken(decodedToken);

      const companyApiUrl = `${baseUrl}/teamscore/scrape-website?companyWebsite=${decodedToken.sub.companyWebsite}`;
      console.log(companyApiUrl);

      axios
        .get(companyApiUrl)
        .then((response) => {
          setCompanyInfo({
            companyLogo: response.data.companyWebsiteInfo.companyLogo,
            companyType: response.data.companyWebsiteInfo.websiteType,
          });
          setLoading(false);
          console.log(response.data.companyName);
        })
        .catch((error) => {
          console.error("Failed to fetch company data", error);
        });

      const teamscoresFromLocalStorage = localStorage.getItem("teamscores");

      if (teamscoresFromLocalStorage) {
        setTeamscores(JSON.parse(teamscoresFromLocalStorage));
      } else {
        const teamscoresApiUrl = `${baseUrl}/teamscore/get-all-teamscores`;

        axios
          .get(teamscoresApiUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setTeamscores(response.data);

            localStorage.setItem("teamscores", JSON.stringify(response.data));
          })
          .catch((error) => {
            console.error("Failed to fetch teamscores", error);
          });
      }
    }
  }, []);

  const { theme } = useTheme();

  return (
    <div
      className={`flex bg-white ${
        theme === "light"
          ? "bg-[#C0C0F5] bg-opacity-10 font-cabinet text-[#000D80]"
          : "dark:bg-gray-800 text-white"
      }`}
    >
      <div>
        {" "}
        <ComSideBar />
      </div>

      <div className="flex-1">
        <ComNavBar />

        <div>
          <div className="block md:flex md:h-[175px] h-[370px] md:space-x-[130px] md:p-14 p-6 bg-[#C0C0F5] bg-opacity-10 pt-14">
            {loading ? (
              <div className="md:text-center m-auto">
                <img src={loader} alt="Loading" className="w-[60px]" />
              </div>
            ) : (
              <div className="-mt-[43px] md:text-center mb-4 md:border-none md:mb-0 border-b border-gray-300">
                {companyInfo.companyLogo ? (
                  <img
                    src={companyInfo.companyLogo}
                    alt="Company logo"
                    className="w-10 md:m-auto text-xs"
                  />
                ) : (
                  <img
                    src={Avatar}
                    alt="Avatar"
                    className="w-10 md:m-auto text-xs"
                  />
                )}
                <h6 className="m-auto">{decodedToken?.sub.companyName}</h6>
                <span className="bg-[#C0C0F5] text-xs p-[4px] rounded-2xl text-[#000D80]">
                  {companyInfo.companyType}
                </span>
              </div>
            )}

            <div className="mb-4 md:mb-0 md:border-none border-b border-gray-300">
              <h6>Stage</h6>
              {loading ? (
                <div className="text-center m-auto">
                  <img src={loader} alt="Loading" className="w-[60px]" />
                </div>
              ) : (
                <div>
                  {teamscores.map((teamscore) => (
                    <p>
                      <span className="bg-[#DCFFDD] text-xs p-[4px] rounded-2xl text-[#006804]">
                        {teamscore.fundingStage || "NA"}
                      </span>
                    </p>
                  ))}
                </div>
              )}
            </div>
            <div className="mb-4 md:mb-0 md:border-none border-b border-gray-300">
              <h6>Company Valuation</h6>
              {loading ? (
                <div className="text-center m-auto">
                  <img src={loader} alt="Loading" className="w-[60px]" />
                </div>
              ) : (
                <div>
                  {teamscores.map((teamscore) => (
                    <p>{teamscore.totalFundingRaised || "NA"}</p>
                  ))}
                </div>
              )}
            </div>
            <div className="mb-4 md:mb-0 md:border-none border-b border-gray-300">
              <h6>Current Target Raised</h6>
              {loading ? (
                <div className="text-center m-auto">
                  <img src={loader} alt="Loading" className="w-[60px]" />
                </div>
              ) : (
                <div>
                  {teamscores.map((teamscore) => (
                    <p>${teamscore.moneyRaise || "NA"}</p>
                  ))}
                </div>
              )}
            </div>
            <div className="mb-4 md:mb-0 md:border-none border-b border-gray-300">
              <h6>Score</h6>
              {loading ? (
                <div className="text-center m-auto">
                  <img src={loader} alt="Loading" className="w-[60px]" />
                </div>
              ) : (
                <div>
                  {teamscores.map((teamscore) => (
                    <p>{teamscore.Grade || "NA"}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div>
            <ProfileCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
