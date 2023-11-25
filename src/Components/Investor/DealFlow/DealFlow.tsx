/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../../Context/ThemeContext";
import InvestNavBar from "../Dashboard/InvestNavBar";
import InvestSideBar from "../Dashboard/InvestorSideBar";
import { BsFillFunnelFill } from "react-icons/bs";
import { FaSortDown } from "react-icons/fa";
import { BsSendFill } from "react-icons/bs";
import { IoMdHeart } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
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
import axios from "axios";
import ManArt from "../../../assets/manart.png";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

interface ApiScores {
  Grade: any;
}

interface GeneralInfo {
  registrationCountry?: string;
  fundingStage?: string;
}
interface FinancialScores {
  apiScores?: ApiScores;
}

interface MarketScores {
  apiScores?: ApiScores;
}

interface TeamScores {
  apiScores?: ApiScores;
}
interface BusinessScores {
  apiScores?: ApiScores;
}
interface GovernanceScores {
  apiScores?: ApiScores;
}

interface Company {
  companyMail: string;
  companyName: string;
  companySector: string;
  verified: boolean;
  vesterScore: string;
  generalinfos: GeneralInfo[];
  teamscores: TeamScores[];
  businessscores: BusinessScores[];
  marketscores: MarketScores[];
  financialscores: FinancialScores[];
  governancescores: GovernanceScores[];
}

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

const CircularProgress: React.FC<{ percent: number }> = ({ percent }) => {
  const circumference = 16 * 2 * Math.PI;

  return (
    <div className="flex items-center justify-center relative">
      <svg className="w-20 h-20">
        {" "}
        {/* Adjust the width and height here */}
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
          className="text-[#ec7f36]"
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

const DealFlow: React.FC = () => {
  const { theme } = useTheme();

  const [isYes, setIsYes] = useState<boolean>(true);

  const [matchingCompanies, setMatchingCompanies] = useState<Company[]>([]);
  const [investor, setInvestor] = useState<InvestorData | null>(null);
  const [, setPreference] = useState<any | null>(null);
  const [companyScored, setCompanyScored] = useState(0);
  const [matchingCompaniesCount, setMatchingCompaniesCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [showReferralLink, setShowReferralLink] = useState(false);
  const [, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Component mounted");
      try {
        const token = localStorage.getItem("token");

        // Fetch favorites count
        const favoritesResponse = await axios.get(
          `${baseUrl}/investor/favorites`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { total_favorites } = favoritesResponse.data;
        setFavoritesCount(total_favorites);

        // Fetch all data
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

        setCompanyScored(companyScore);
        setMatchingCompaniesCount(matchCompaniesCount);
        setMatchingCompanies(data["Matching companies"]);
        setLoading(false);

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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFavoriteClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${baseUrl}/investor/favorite?companyMail=omejeemmanuel@yahoo.com`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("favorite res:", response.data);

      setIsFavorited(response.data.isFavorited);
    } catch (error) {
      console.error("Error favoriting company:", error);
    }
  };

  const toggleValue = () => {
    setIsYes((prevValue) => !prevValue);
  };

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
        <InvestSideBar height="md:h-[100%] lg:h-[100%]" />
      </div>

      <div className="flex-1">
        <InvestNavBar />

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
              <p className="text-6xl mt-4">{favoritesCount}</p>
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

        <div className="bg-white rounded-lg w-[93%] p-4 h-[500px] shadow-md m-10">
          <h2 className="mb-5 mt-5 font-bold text-[#031549]">Deal Flow</h2>
          <div className="text-[#494a4a] font-bold flex float-right space-x-16 -mt-10 mr-5">
            <h2 className="flex">
              <span className="mt-1">
                <BsFillFunnelFill />
              </span>
              Filter
            </h2>
            <h2 className="flex">
              Sort by:Country
              <span className="text-2xl -mt-2">
                <FaSortDown />
              </span>
            </h2>
          </div>
          <table className="w-full text-[#031549]">
            <thead className="text-sm text-center">
              <th>
                <div className="font-bold">Name</div>
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
              <th>
                <strong>Assessment</strong>
              </th>
              <th>
                <strong>Favourite</strong>
              </th>
              <th className="pt-4">
                <strong>Connect</strong> <br />
                <small className="text-[#ec7f36] font-light">coming soon</small>
              </th>
            </thead>
            {matchingCompanies.map((company) => (
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
                    <CircularProgress percent={95} />
                  </td>
                  <td
                    className="cursor-pointer flex justify-center "
                    onClick={toggleValue}
                  >
                    <div className="border border-gray-400 flex pr-1 pl-1 mt-7">
                      <span>{isYes ? "Yes" : "No"}</span>
                      <span className="mt-1 text-gray-500">
                        <IoIosArrowDown />
                      </span>
                    </div>
                  </td>

                  <td>
                    <div
                      className="rounded-full h-5 w-5 text-center items-center flex justify-center ml-10 cursor-pointer bg-gray-300"
                      onClick={handleFavoriteClick}
                    >
                      <span className="text-gray-400">
                        <IoMdHeart />
                      </span>{" "}
                      <span className="text-orange-500">
                        <IoMdHeart />
                      </span>{" "}
                    </div>
                  </td>
                  <td className="">
                    <div className="rounded-full border border-gray-300 text-gray-300 ">
                      Request
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};
export default DealFlow;
