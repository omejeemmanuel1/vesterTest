/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useTheme } from "../../../Context/ThemeContext";
import ProfileCard from "./ProfileCard";
import InvestNavBar from "./InvestNavBar";
import InvestSideBar from "./InvestorSideBar";

const InvestorDashboard: React.FC = () => {
  const { theme } = useTheme();

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
        <InvestSideBar height="h-[825px]" />
      </div>

      <div className="flex-1">
        <InvestNavBar />

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
              Get Started
            </button>
          </div>

          <div>
            <ProfileCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;
