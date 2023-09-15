import React, { useState } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import { MdUploadFile } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import PitchDeckStep from "../PitchDeck/PitchDeckStep";
import PitchDeckUpload from "../PitchDeck/PitchDeckUpload";
import YC from "../../../assets/Ycom.png";
import AMC from "../../../assets/AMC.png";
import PerformanceChart from "../Chart/PerformanceChart";
import Activity from "../Activity/Activity";
import { useTheme } from "../../../Context/ThemeContext";

const overlayClassName = "modal-overlay";

const chartData = {
  dates: ["2017", "2018", "2019", "2020", "2021", "2022", "2023"],
  actualValues: [1000, 1200, 1500, 1700, 1900, 2000, 2100],
  forecastValues: [950, 1100, 1400, 1600, 1800, 1900, 2000],

  actualKPI: "$10.2 +11.01%",
  forecastKPI: "$9.4 +14.01%",
};

Modal.setAppElement("#root");

const ProfileCard: React.FC = () => {
  const [isPitchDeckStepOpen, setIsPitchDeckStepOpen] = useState(false);
  const [isPitchDeckUploadOpen, setIsPitchDeckUploadOpen] = useState(false);

  const navigate = useNavigate();

  const openPitchDeckStepModal = () => {
    setIsPitchDeckStepOpen(true);
  };

  const closePitchDeckStepModal = () => {
    setIsPitchDeckStepOpen(false);
  };

  const openPitchDeckUploadModal = () => {
    setIsPitchDeckStepOpen(false);
    setIsPitchDeckUploadOpen(true);
  };

  const closePitchDeckUploadModal = () => {
    setIsPitchDeckUploadOpen(false);
  };

  const handleUploadSuccess = () => {
    setIsPitchDeckUploadOpen(false);
    navigate("/company_dashboard");
  };

  const { theme } = useTheme();

  return (
    <div className="font-cabinet ">
      <h2 className="mt-8 ml-10 mb-4">Upload or update company data</h2>
      <div className="flex space-x-6">
        <div className="flex flex-wrap ml-10 space-x-[10px] w-[836px]">
          <Link to="/team-info" className="h-[108px]">
            <div className="bg-[rgb(0,13,128)] p-[16px] text-xl text-white w-[263px] rounded-2xl">
              <HiOutlineUpload />

              <h2 className="mt-8"> Upload company data</h2>
            </div>
          </Link>
          <div
            className="text-[#0A0A3F] text-xl bg-[#C0C0F5] p-[16px] h-[108px] w-[263px] rounded-2xl cursor-pointer"
            onClick={openPitchDeckStepModal}
          >
            <MdUploadFile />
            <h2 className="mt-8">Upload pitch deck</h2>
          </div>
          {isPitchDeckStepOpen && (
            <Modal
              isOpen={isPitchDeckStepOpen}
              onRequestClose={closePitchDeckStepModal}
              overlayClassName={overlayClassName}
              className="absolute top-[0px] left-[0px] bg-black bg-opacity-60 w-full h-[1160px] overflow-hidden"
            >
              <PitchDeckStep
                openPitchDeckUploadModal={openPitchDeckUploadModal}
                closePitchDeckStepModal={closePitchDeckStepModal}
              />
            </Modal>
          )}

          {isPitchDeckUploadOpen && (
            <Modal
              isOpen={isPitchDeckUploadOpen}
              onRequestClose={closePitchDeckUploadModal}
              overlayClassName={overlayClassName}
              className="absolute top-[0px] left-[0px] bg-black bg-opacity-60 w-full h-[1160px] overflow-hidden"
            >
              <PitchDeckUpload
                closePitchDeckUploadModal={handleUploadSuccess}
              />
            </Modal>
          )}
          {/* 
          <div
            className="bg-[#C0C0F5] text-xl text-[#0A0A3F] p-[16px] h-[108px] w-[263px] rounded-2xl"
            onClick={openPitchDeckStepModal}
          >
            <HiOutlineUpload />
            <h2 className="mt-8">Upload funding data</h2>
          </div> */}

          <div className="rounded-2xl">
            <Link to="/company_dashboard">
              <img src={AMC} alt="" className="h-[108px] w-[263px]" />
            </Link>
          </div>
          <div className="mt-5 flex space-x-[20px] ">
            <Link to="https://www.ycombinator.com/apply">
              <div className="h-[142px] w-[300px] rounded-2xl">
                <img src={YC} alt="" className="-ml-[10px]" />
              </div>
            </Link>
          </div>
          <div className="w-full mt-10 mb-10 shadow-md rounded">
            <PerformanceChart data={chartData} />
          </div>

          <div className="flex mb-6 space-x-4">
            <div
              className={`p-2 rounded-md w-[263px] h-[108px] shadow ${
                theme === "light"
                  ? "bg-[#F7F9FB]  text-[#000D80]"
                  : "dark:bg-gray-700 text-white"
              }`}
            >
              <h2 className="text-2xl">
                $2.2 <span className="text-[#00AB07] text-xs">11.01%</span>
                <p className="text-[18px] mt-4">Investors looking at you</p>
              </h2>
            </div>
            <div
              className={`p-2 rounded-md w-[263px] h-[108px] shadow ${
                theme === "light"
                  ? "bg-[#F7F9FB]  text-[#000D80]"
                  : "dark:bg-gray-700 text-white"
              }`}
            >
              <h2 className="text-2xl">
                30 <span className="text-[#00AB07] text-xs">11.01%</span>
                <p className="text-[18px] mt-4">Connections</p>
              </h2>
            </div>
            <div
              className={`p-2 rounded-md w-[263px] h-[108px] shadow ${
                theme === "light"
                  ? "bg-[#F7F9FB]  text-[#000D80]"
                  : "dark:bg-gray-700 text-white"
              }`}
            >
              <h2 className="text-2xl">
                5 <span className="text-[#00AB07] text-xs">11.01%</span>
                <p className="text-[18px] mt-4">Deals closed</p>
              </h2>
            </div>
          </div>
        </div>
        <div>
          <Activity />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
