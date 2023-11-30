/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../../Context/ThemeContext";
import InvestNavBar from "./InvestNavBar";
import InvestSideBar from "./InvestorSideBar";
import AssessStartup from "./AssessStartup";
import { Link } from "react-router-dom";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { BsSendFill } from "react-icons/bs";
import axios from "axios";
import ReassessedStartup from "./ReassessedStartup";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

interface InvestorData {
  referral_link: string;
  data: {
    company: string;
    fullName: string;
    investorMail: string;
    referral_link: string;
    verified: boolean;
  }[];
}

const InvestorDashboard: React.FC = () => {
  const { theme } = useTheme();

  const [investor, setInvestor] = useState<InvestorData | null>(null);
  const [preference, setPreference] = useState<any | null>(null);
  const [companyScored, setCompanyScored] = useState(0);
  const [matchingCompaniesCount, setMatchingCompaniesCount] = useState(0);
  const [matchingCompaniesCount2, setMatchingCompaniesCount2] = useState(0);
  const [showReferralLink, setShowReferralLink] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch other data from the API
        const allDataResponse = await axios.get(
          `${baseUrl}/investor/get-all-data`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = allDataResponse.data;

        const companyScore = data["Company scored"] || 0;
        const matchCompaniesCount = data["Matching companies count"] || 0;
        const matchCompaniesCount2 = data["Matching companies count2"] || 0;

        setCompanyScored(companyScore);
        setMatchingCompaniesCount(matchCompaniesCount);
        setMatchingCompaniesCount2(matchCompaniesCount2);

        // Fetch investor and preferences
        const investorResponse = await axios.get(
          `${baseUrl}/investor/get-investor-and-preferences`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const preferenceResponse = await axios.get(
          `${baseUrl}/preference/get-preferences`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setInvestor(investorResponse.data);
        setPreference(preferenceResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const investorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        investorRef.current &&
        !investorRef.current.contains(event.target as Node)
      ) {
        setShowReferralLink(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleShareLink = () => {
    setShowReferralLink(true);
  };
  console.log("investor:", investor);

  const referralLink = investor?.data?.[0]?.referral_link || "";
  console.log("ref:", referralLink);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        setCopied(true);
      })
      .catch((err) => {
        console.error("Unable to copy to clipboard", err);
      });
  };

  const handleClickOutside = (event: any) => {
    const referralLinkSection = document.getElementById("referralLinkSection");

    if (referralLinkSection && !referralLinkSection.contains(event.target)) {
      setShowReferralLink(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`flex bg-[#fafafa] ${
        theme === "light"
          ? "font-poppins text-[#fff]"
          : "dark:bg-[#031549] text-white"
      }`}
    >
      <div>
        {" "}
        <InvestSideBar height="h-[825px]" />
      </div>

      <div className="flex-1">
        <InvestNavBar />

        {preference &&
        preference.message === "No preferences found for this investor" ? (
          <div className="-mt-5">
            <div
              className={`block text-center ml-10 mr-10 rounded-2xl md:h-[200px] h-[370px] md:justify-center p-6 bg-[#031549] ${
                theme === "light"
                  ? "font-poppins "
                  : "dark:bg-white text-[#000D80]"
              }`}
            >
              <h1 className="text-2xl">
                <span className="font-bold">Welcome to</span> Vester.AI
              </h1>
              <p>Your key to unlocking African investment opportunities!.</p>
              <br />
              <p>
                Click <span className="font-bold">'Get Started'</span> below to
                get your <strong>Vester Link</strong> and assess startups in no
                time
              </p>
              <button className="bg-[#ec7f36] pl-6 pr-6 p-2 rounded-full mt-4">
                <Link to="/preference">Get Started</Link>
              </button>
            </div>
          </div>
        ) : (
          <div className="mr-10 ml-10 flex space-x-6">
            <div className="bg-white rounded-2xl text-center text-[#031549] w-full h-40 shadow-md p-6">
              <h4>Startups Scored with Your Vester Link</h4>
              {loading ? (
                <div className="text-center flex justify-center mt-5">
                  <div className="w-6 h-6 border-t-4 border-blue-400 border-solid rounded-full animate-spin bg-white z-10"></div>
                </div>
              ) : (
                <p className="text-6xl mt-4">{companyScored}</p>
              )}
            </div>
            <div className="bg-white rounded-2xl text-center text-[#031549] w-full h-40 shadow-md p-6">
              <h4>Startups Assessed</h4>
              {loading ? (
                <div className="text-center flex justify-center mt-5">
                  <div className="w-6 h-6 border-t-4 border-blue-400 border-solid rounded-full animate-spin bg-white z-10"></div>
                </div>
              ) : (
                <p className="text-6xl mt-4">{matchingCompaniesCount}</p>
              )}
            </div>
            <div className="bg-white rounded-2xl text-center text-[#031549] w-full h-40 shadow-md p-6">
              <h4>Favourited Startups</h4>
              {loading ? (
                <div className="text-center flex justify-center mt-5">
                  <div className="w-6 h-6 border-t-4 border-blue-400 border-solid rounded-full animate-spin bg-white z-10"></div>
                </div>
              ) : (
                <p className="text-6xl mt-4">{matchingCompaniesCount2}</p>
              )}
            </div>
            <div
              ref={investorRef}
              className="bg-[#031549] rounded-2xl text-center w-full h-40 items-center p-6 text-sm"
            >
              <h4>Assess your startups in no time</h4>
              <button
                onClick={handleShareLink}
                className="text-[10px] font-bold flex bg-[#ec7f36] p-2 pr-4 pl-4 rounded-full text-white gap-2 h-10 ml-4 mt-8"
              >
                <span className="text-sm md:text-xl">
                  <BsSendFill />
                </span>
                Share your Vester Link
              </button>

              {showReferralLink && (
                <div className="block items-center justify-center bg-gray-300 absolute top-2 right-[56px] rounded-xl p-5 shadow-lg transform translate-y-0 transition-transform duration-1000 ease-in-out">
                  <p className="text-white bg-blue-900 text-center mb-4 rounded-tl-xl rounded-br-xl text-sm p-1">
                    {copied ? "Vester Link Copied!" : "Your Vester Link"}
                  </p>

                  <div className="flex space-x-4 mb-4">
                    <FacebookShareButton url={referralLink}>
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <LinkedinShareButton url={referralLink}>
                      <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                    <TwitterShareButton url={referralLink}>
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <WhatsappShareButton url={referralLink}>
                      <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="bg-orange-500 rounded-full p-2 text-xs "
                  >
                    Copy Link
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {preference &&
        preference.message === "No preferences found for this investor" ? (
          <div>
            <AssessStartup />
          </div>
        ) : (
          <div>
            <ReassessedStartup />
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestorDashboard;
