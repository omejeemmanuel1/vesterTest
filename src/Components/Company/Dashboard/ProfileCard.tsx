import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import GeneralInfoContainer from "../VesterData/CompanyOverview/GeneralInfoContainer";
import Team from "../../../assets/Team.mp4";
import Market from "../../../assets/Markett.mp4";
import Financials from "../../../assets/Financials.mp4";
import Business from "../../../assets/Business.mp4";
import Governance from "../../../assets/Governance.mp4";
import { useTheme } from "../../../Context/ThemeContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");
const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

interface profileProps {
  isGovernanceApiEmpty: boolean;
  isFinancialApiEmpty: boolean;
  isBusinessApiEmpty: boolean;
  isMarketApiEmpty: boolean;
  isTeamApiEmpty: boolean;
}

const ProfileCard: React.FC<profileProps> = ({
  isGovernanceApiEmpty,
  isFinancialApiEmpty,
  isBusinessApiEmpty,
  isMarketApiEmpty,
  isTeamApiEmpty,
}) => {
  const { theme } = useTheme();
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

    navigate(`/${componentType}-info`);
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
        className={`font-poppins text-center md:w-[80vw] md:h-[60vh] ${
          theme === "light"
            ? "font-poppins text-[#031549]"
            : "dark:bg-[#031549] text-[#031549]"
        }`}
      >
        <h2 className="md:mt-2 ml-5 mb-4">
          You can assess any of the 5 areas below or complete all 5 to get your
          Vester Score
        </h2>
        <div className="md:flex lg:flex ">
          <div className="md:-mt-2">
            <div className="block md:flex lg:flex flex-wrap gap-20 justify-center">
              <button
                onClick={() => openGeneralInfoModal("team")}
                className="h-[108px]"
              >
                <div
                  className={
                    isTeamApiEmpty
                      ? "border-orange-200 bg-white border-2 p-[16px] md:w-[300px] w-[343px] mb-10 md:mb-5 md:mb-none rounded-2xl"
                      : "border-orange-300 bg-white border-[3px] p-[16px] md:w-[300px] w-[343px] mb-5 md:mb-none rounded-2xl"
                  }
                >
                  <video autoPlay muted loop playsInline>
                    <source src={Team} type="video/mp4"></source>
                  </video>
                  <h2 className={isTeamApiEmpty ? "mt-2" : "mt-2"}>
                    {isTeamApiEmpty
                      ? "Assess your Team"
                      : "Update your Team info"}
                  </h2>
                </div>
              </button>
              <button
                onClick={() => {
                  setSelectedComponent("market");
                  openGeneralInfoModal("market");
                }}
                className="h-[108px]"
              >
                <div
                  className={
                    isMarketApiEmpty
                      ? "border-orange-200 bg-white border-2 p-[16px] md:w-[300px] w-[343px] mb-5 mt-16 md:mt-0 md:mb-none rounded-2xl"
                      : "border-orange-300 bg-white border-[3px] p-[16px] md:w-[300px] w-[343px] mb-5 mt-16 md:mt-0 md:mb-none rounded-2xl"
                  }
                >
                  <video autoPlay muted loop playsInline>
                    <source src={Market} type="video/mp4"></source>
                  </video>
                  <h2 className={isMarketApiEmpty ? "mt-2" : "mt-2"}>
                    {isMarketApiEmpty
                      ? "Assess your Market"
                      : "Update your Market info"}
                  </h2>
                </div>
              </button>
              <button
                onClick={() => {
                  setSelectedComponent("business");
                  openGeneralInfoModal("business");
                }}
                className="h-[108px]"
              >
                <div
                  className={
                    isBusinessApiEmpty
                      ? "border-orange-200 bg-white border-2 p-[16px] md:w-[300px] w-[343px] mb-5 mt-16 md:mt-0 md:mb-none rounded-2xl"
                      : "border-orange-300 bg-white border-[3px] p-[16px] md:w-[300px] w-[343px] mb-5 mt-16 md:mt-0 md:mb-none rounded-2xl"
                  }
                >
                  <video autoPlay muted loop playsInline>
                    <source src={Business} type="video/mp4"></source>
                  </video>
                  <h2 className={isBusinessApiEmpty ? "mt-2" : "mt-2"}>
                    {isBusinessApiEmpty
                      ? "Assess your Business Model"
                      : "Update your Business info"}
                  </h2>
                </div>
              </button>
              <button
                onClick={() => {
                  setSelectedComponent("financial");
                  openGeneralInfoModal("financial");
                }}
                className="h-[108px] mt-16"
              >
                <div
                  className={
                    isFinancialApiEmpty
                      ? "border-orange-200 bg-white border-2 p-[16px] md:w-[300px] w-[343px] mb-5 md:mb-none rounded-2xl"
                      : "border-orange-300 bg-white border-[3px] p-[16px] md:w-[300px] w-[343px] mb-5 md:mb-none rounded-2xl"
                  }
                >
                  <video autoPlay muted loop playsInline>
                    <source src={Financials} type="video/mp4"></source>
                  </video>
                  <h2 className={isFinancialApiEmpty ? "mt-2" : "mt-2"}>
                    {isFinancialApiEmpty
                      ? "Assess your Financials"
                      : "Update your Financial info"}
                  </h2>
                </div>
              </button>
              <button
                onClick={() => {
                  setSelectedComponent("governance");
                  openGeneralInfoModal("governance");
                }}
                className="h-[108px] mt-16"
              >
                <div
                  className={
                    isGovernanceApiEmpty
                      ? "border-orange-200 bg-white border-2 p-[16px] md:w-[300px] w-[343px] mb-5 md:mb-none rounded-2xl"
                      : "border-orange-300 bg-white border-[3px] p-[16px] md:w-[300px] w-[343px] mb-5 md:mb-none rounded-2xl"
                  }
                >
                  <video autoPlay muted loop playsInline>
                    <source src={Governance} type="video/mp4"></source>
                  </video>
                  <h2 className={isGovernanceApiEmpty ? "-mt-4" : "-mt-4"}>
                    {isGovernanceApiEmpty
                      ? "Assess your Corporate Governance"
                      : "Update your Corporate Governance info"}
                  </h2>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
