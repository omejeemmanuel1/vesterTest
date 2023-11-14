import React, { useEffect } from "react";
import { useTheme } from "../../../Context/ThemeContext";
import { Link } from "react-router-dom";
import ComSideBar from "../Dashboard/ComSideBar";
import ComNavBar from "../Dashboard/ComNavBar";
import Aos from "aos";
import "aos/dist/aos.css";

const CompanyPerformance: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);
  return (
    <div>
      <div
        className={`flex bg-white ${
          theme === "light"
            ? "bg-[#C0C0F5] bg-opacity-10 font-cabinet  text-[#000D80]"
            : "dark:bg-gray-800 text-white"
        }`}
      >
        <div>
          <ComSideBar height="h-[1220px]" />
        </div>

        <div className="flex-1">
          <ComNavBar bgColor="bg-white" />
          <div className="m-6">
            <h4 className="text-sm">
              Add company data to get effective analysis on your company's
              performance{" "}
              <Link to="/team-info" className="text-blue-300">
                Add Data
              </Link>
            </h4>
          </div>
          <h1 className=" text-[30px] ml-6">Performance</h1>
          <div className="flex space-x-8">
            <div
              className={`w-[486px] m-6 h-[711px] rounded-md p-8 ${
                theme === "light"
                  ? "bg-[#F7F9FB] shadow-md font-cabinet  text-[#000D80]"
                  : "dark:bg-gray-600 text-white"
              }`}
            >
              <div className="flex">
                <img src="" alt="logo" />
                <h2>Instagram</h2>
                <p className="w-[59px] h-[28px] bg-[#4CAF50] rounded-3xl text-center items-center justify-center pt-1 ml-64">
                  A
                </p>
              </div>
              <div className="">
                <p>
                  Industry: <span className="text-[#1C1C1C]">SaaS</span>
                </p>
                <p className="mt-5">
                  About :
                  <span className="text-[#1C1C1C]">
                    The search giant that connects the world's knowledge with
                    lightning speed, empowering users to explore, discover, and
                    shape the digital landscape. he search giant that connects
                    the world's knowledge with lightning speed, empowering users
                    to explore, discover, and shape the digital landscape.
                  </span>
                </p>
                <p className="mt-5">
                  Revenue Stage:{" "}
                  <span className="text-[#1C1C1C]">Pre-revenue</span>
                </p>
                <p className="mt-5">
                  Website:{" "}
                  <span className="text-[#1C1C1C]">www.instagram.com</span>
                </p>
                <p className="mt-5">
                  Start-up Stage:{" "}
                  <span className="text-[#1C1C1C]">Pre-seed.</span>
                </p>
                <p className="mt-5">
                  Business Model: <span className="text-[#1C1C1C]">B2B2C.</span>
                </p>
                <p className="mt-5">
                  Current Market Valuation :{" "}
                  <span className="text-[#1C1C1C]">$2M</span>
                </p>
                <p className="mt-5">
                  Female Founder: <span className="text-[#1C1C1C]">No</span>
                </p>
                <p className="mt-5">
                  Investment Target:{" "}
                  <span className="text-[#1C1C1C]">$10,000,000</span>
                </p>
                <p className="mt-5">San Fransisco Bay, California</p>
                <p className="mt-5">Reach out to us:</p>
                <p className="mt-5">
                  <span className="text-[#1C1C1C]">help@instagram.com</span>
                </p>
              </div>
            </div>
            <div className="block m-6">
              <div
                className={`w-[642px] h-[215px] rounded-md p-6 mb-8 ${
                  theme === "light"
                    ? "bg-[#F7F9FB] shadow-md font-cabinet  text-[#000D80]"
                    : "dark:bg-gray-600 text-white text-sm"
                }`}
              >
                <h2>Team</h2>
                <p className="text-sm text-[#1C1C1C]">
                  Instagram is a multifaceted market encompassing social media
                  interactions, visual content sharing, influencer
                  collaborations, e-commerce, content marketing, visual search,
                  entertainment, digital advertising, personal branding, and
                  community formation. It serves as a dynamic hub where
                  individuals and businesses connect, share visually engaging
                  content, promote products and services, build brands, target
                  specific demographics, and cultivate niche communities, making
                  it a versatile platform that has transformed the landscape of
                  personal expression, branding, and digital marketing.
                </p>
              </div>
              <div
                className={`w-[642px] h-[215px] rounded-md p-6 mb-8 ${
                  theme === "light"
                    ? "bg-[#F7F9FB] shadow-md font-cabinet  text-[#000D80]"
                    : "dark:bg-gray-600 text-white text-sm"
                }`}
              >
                <h2>Market</h2>
                <p className="text-sm text-[#1C1C1C]">
                  Instagram is a multifaceted market encompassing social media
                  interactions, visual content sharing, influencer
                  collaborations, e-commerce, content marketing, visual search,
                  entertainment, digital advertising, personal branding, and
                  community formation. It serves as a dynamic hub where
                  individuals and businesses connect, share visually engaging
                  content, promote products and services, build brands, target
                  specific demographics, and cultivate niche communities, making
                  it a versatile platform that has transformed the landscape of
                  personal expression, branding, and digital marketing.
                </p>
              </div>
              <div
                className={`w-[642px] h-[215px]  rounded-md p-8 mb-8 ${
                  theme === "light"
                    ? "bg-[#F7F9FB] shadow-md font-cabinet  text-[#000D80]"
                    : "dark:bg-gray-600 text-white text-sm"
                }`}
              >
                <h2>Finance</h2>
                <div className="text-center text-[15px] text-[#1C1C1C]">
                  <h4>56,938,000</h4>
                  <small>Company worth</small>
                </div>
                <p className="text-sm text-[#1C1C1C] mt-6">
                  Instagram's finance revolves around its advertising model,
                  generating revenue primarily from businesses and brands paying
                  to promote their products and services to its vast user base.
                </p>
              </div>
            </div>
          </div>
          <div data-aos="slide-up" className="flex space-x-14 ml-6 mb-6">
            <div
              className={`w-[661px] h-[187px] p-6 rounded-md ${
                theme === "light"
                  ? "bg-[#F7F9FB] shadow-md font-cabinet  text-[#000D80]"
                  : "dark:bg-gray-600 text-white text-sm"
              }`}
            >
              <h2>Business Model</h2>
              <p className="text-sm text-[#1C1C1C]">
                Instagram operates on a primarily advertising-based business
                model, deriving the majority of its revenue from advertising
                services offered to businesses and brands. The platform provides
                advertisers with a comprehensive suite of tools to create,
                target, and analyze their campaigns, leveraging user data and
                engagement metrics. Instagram offers various ad formats,
                including photo, video, carousel, and story ads, seamlessly
                integrated into users' feeds and stories. Advertisers can target
                their desired audience based on demographics, interests,
                behaviors, and more.
              </p>
            </div>
            <div
              className={`w-[466px] h-[187px]  p-6 rounded-md ${
                theme === "light"
                  ? "bg-[#F7F9FB] shadow-md font-cabinet  text-[#000D80]"
                  : "dark:bg-gray-600 text-white text-sm"
              }`}
            >
              <h2>Governance</h2>
              <p className="text-[15px] text-[#1C1C1C]">
                The governance of Instagram involves a multi-tiered structure to
                manage the platform's policies, content, and user interactions.
                At its core, Instagram is overseen by its parent company,
                Facebook, which provides strategic direction, resources, and
                overarching policies.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPerformance;
