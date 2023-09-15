import React from "react";
import ComSideBar from "../Dashboard/ComSideBar";
import ComNavBar from "../Dashboard/ComNavBar";
import { Link } from "react-router-dom";
import { useTheme } from "../../../Context/ThemeContext";
import ProCon from "./ProCon";

const Score: React.FC = () => {
  const { theme } = useTheme();
  return (
    <>
      <div
        className={`flex bg-white ${
          theme === "light"
            ? "bg-[#C0C0F5] bg-opacity-10 font-cabinet  text-[#000D80]"
            : "dark:bg-gray-800 text-white"
        }`}
      >
        <ComSideBar />

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

            <div
              className={`mt-10 ${
                theme === "light"
                  ? "bg-[#fff] text-[#0A0A3F]"
                  : "dark:bg-gray-800 text-white"
              }`}
            >
              <h1 className=" text-[30px]">Score</h1>
              <div className="flex space-x-10">
                <div
                  className={`bg-[#F7F9FB] w-[205px] h-[195px] rounded-md text-center justify-center items-center ${
                    theme === "light"
                      ? "bg-[#F7F9FB]"
                      : "dark:bg-gray-600 text-white"
                  }`}
                >
                  <h1 className="mt-[50px] text-[45px]">80%</h1>
                  <p>Team</p>
                </div>
                <div
                  className={`bg-[#F7F9FB] w-[205px] h-[195px] rounded-md text-center justify-center items-center ${
                    theme === "light"
                      ? "bg-[#F7F9FB]"
                      : "dark:bg-gray-600 text-white"
                  }`}
                >
                  <h1 className="mt-[50px] text-[45px]">100%</h1>
                  <p>Market</p>
                </div>
                <div
                  className={`bg-[#F7F9FB] w-[205px] h-[195px] rounded-md text-center justify-center items-center ${
                    theme === "light"
                      ? "bg-[#F7F9FB]"
                      : "dark:bg-gray-600 text-white"
                  }`}
                >
                  <h1 className="mt-[50px] text-[45px]">90%</h1>
                  <p>Business Model</p>
                </div>
                <div
                  className={`bg-[#F7F9FB] w-[205px] h-[195px] rounded-md text-center justify-center items-center ${
                    theme === "light"
                      ? "bg-[#F7F9FB]"
                      : "dark:bg-gray-600 text-white"
                  }`}
                >
                  <h1 className="mt-[50px] text-[45px]">100%</h1>
                  <p>Financials</p>
                </div>
                <div
                  className={`bg-[#F7F9FB] w-[205px] h-[195px] rounded-md text-center justify-center items-center ${
                    theme === "light"
                      ? "bg-[#F7F9FB]"
                      : "dark:bg-gray-600 text-white"
                  }`}
                >
                  <h1 className="mt-[50px] text-[45px]">90%</h1>
                  <p>Governance</p>
                </div>
              </div>
            </div>
            <div
              className={`w-[1180px] h-[246px] bg-[#F7F9FB] mt-10 pt-6 ${
                theme === "light"
                  ? "bg-[#F7F9FB]"
                  : "dark:bg-gray-600 text-white"
              }`}
            >
              <div className="items-center justify-center text-center">
                <h1 className="text-[#4CAF50] text-[89px]">A+</h1>
                <p>Your Score</p>
              </div>
            </div>
            <div
              className={`mt-10 ${
                theme === "light"
                  ? "bg-[#fff] text-[#5C5C5C] "
                  : "dark:bg-gray-800 text-white"
              }`}
            >
              <div className="flex space-x-16">
                <div className="flex space-x-4">
                  <h1 className="bg-[#4CAF50] text-white text-[18px] w-[41px] h-[28px] rounded text-center items-center justify-center">
                    A+
                  </h1>
                  <p className="text-[15px]">Total Score of 100% - 95%</p>
                </div>
                <div className="flex space-x-4">
                  <h1 className="bg-[#1B1B1B] text-white text-[18px] w-[41px] h-[28px] rounded text-center items-center justify-center">
                    A
                  </h1>
                  <p className="text-[15px]">Total Score of 94% - 90%</p>
                </div>
                <div className="flex space-x-4">
                  <h1 className="bg-[#A9147F] text-white text-[18px] w-[41px] h-[28px] rounded text-center items-center justify-center">
                    B
                  </h1>
                  <p className="text-[15px]">Total Score of 89% - 85%</p>
                </div>
                <div className="flex space-x-4">
                  <h1 className="bg-[#000D80] text-white text-[18px] w-[41px] h-[28px] rounded text-center items-center justify-center">
                    C
                  </h1>
                  <p className="text-[15px]">Total Score of 84% - 80%</p>
                </div>
              </div>
              <div className="flex space-x-[70px] mt-10">
                <div className="flex space-x-4">
                  <h1 className="bg-[#FFB800] text-white text-[18px] w-[41px] h-[28px] rounded text-center items-center justify-center">
                    D
                  </h1>
                  <p className="text-[15px]">Total Score of 79% - 70%</p>
                </div>
                <div className="flex space-x-4">
                  <h1 className="bg-[#B87D5C] text-white text-[18px] w-[41px] h-[28px] rounded text-center items-center justify-center">
                    E
                  </h1>
                  <p className="text-[15px]">Total Score of 60% - 50%</p>
                </div>
                <div className="flex space-x-4">
                  <h1 className="bg-[#E50909] text-white text-[18px] w-[41px] h-[28px] rounded text-center items-center justify-center">
                    F
                  </h1>
                  <p className="text-[15px]">Total Score of 49% - 0%</p>
                </div>
              </div>
              <div className="mt-8">
                <ProCon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Score;
