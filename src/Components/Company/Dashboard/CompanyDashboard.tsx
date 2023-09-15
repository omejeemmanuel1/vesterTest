/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import ComNavBar from "./ComNavBar";
import ComSideBar from "./ComSideBar";
import ProfileCard from "./ProfileCard";
import jwt_decode from "jwt-decode";
import loader from "../../../assets/loader.gif";
import Avatar from "../../../assets/man.png";
import { useTheme } from "../../../Context/ThemeContext";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

interface DecodedToken {
  sub: any;
  email: string;
  companyName: string;
}

const CompanyDashboard: React.FC = () => {
  const [companyInfo, setCompanyInfo] = useState({
    companyLogo: "",
    companyType: "",
  });
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: DecodedToken = jwt_decode(token);
      console.log(decodedToken.sub.companyWebsite);
      setDecodedToken(decodedToken);

      const apiUrl = `${baseUrl}/teamscore/scrape-website?companyWebsite=${decodedToken.sub.companyWebsite}`;
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
            companyType: data.companyWebsiteInfo.websiteType,
          });
          setLoading(false);
          console.log(data.companyName);
        })
        .catch((error) => {
          console.error(error);
        });
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
      <ComSideBar />
      <div className="flex-1">
        <ComNavBar />
        <div>
          <div className="flex h-[175px] space-x-[130px] p-14 bg-[#C0C0F5] bg-opacity-10 ">
            {loading ? (
              <div className="text-center m-auto">
                <img src={loader} alt="Loading" className="w-[60px]" />
              </div>
            ) : (
              <div className="-mt-[43px] text-center">
                {companyInfo.companyLogo ? (
                  <img
                    src={companyInfo.companyLogo}
                    alt="Company logo"
                    className="w-10 m-auto text-xs"
                  />
                ) : (
                  <img
                    src={Avatar}
                    alt="Avatar"
                    className="w-10 m-auto text-xs"
                  />
                )}
                <h6 className="m-auto">{decodedToken?.sub.companyName}</h6>
                <span className="bg-[#C0C0F5] text-xs p-[4px] rounded-2xl text-[#000D80]">
                  {companyInfo.companyType}
                </span>
              </div>
            )}

            <div>
              <h6>Stage</h6>
              <p>
                NA{" "}
                <span className="bg-[#DCFFDD] text-xs p-[4px] rounded-md text-[#006804]">
                  open
                </span>
              </p>
            </div>
            <div>
              <h6>Company Valuation</h6>
              <p>NA</p>
            </div>
            <div>
              <h6>Current Target Raised</h6>
              <p>NA</p>
            </div>
            <div>
              <h6>Score</h6>
              <p>NA</p>
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
