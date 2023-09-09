/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GeneralInfo from "./GeneralInfo";
import Teamscore1 from "./Teamscore1";
import Teamscore2 from "./Teamscore2";
import MarketScore from "./MarketScore";
import MarketScore2 from "./MarketScore2";
import BusinessModel from "./BusinessModel";
import BusinessModel2 from "./BusinessModel2";
import BusinessModel3 from "./BusinessModel3";
import FinancialScore from "./FinancialScore";
import GovernanceScore from "./GovernanceScore";
import FinancialScore2 from "./FinancialScore2";
import FinancialScore3 from "./FinancialScore3";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBackward } from "react-icons/fa";
import GeneralInfo2 from "./GeneralInfo2";
import Teamscore3 from "./TeamScore3";

const TeamScoreContainer: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});

  const navigate = useNavigate();

  const getAccessToken = () => {
    return localStorage.getItem("token");
  };

  const handleContinue = (data: any) => {
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (finalData: any) => {
    try {
      const combinedData = { ...formData, ...finalData };

      const accessToken = getAccessToken();

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      await axios.post(
        "http://127.0.0.1:5000/teamscore/create-teamscore",
        combinedData,
        config
      );

      console.log("Data submitted successfully:", combinedData);
      toast.success("Data submitted successfully");
      navigate("/company_dashboard");
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data?.error || "An error occurred";
        console.log(errorMessage);

        if (errorMessage === "Invalid email or password") {
          toast.error(
            "Invalid email or password. Please check your credentials."
          );
        } else {
          toast.error(errorMessage);
        }
      } else {
        toast.error("Server is not responding. Please try again later.");
      }
    }
  };

  const totalSteps = 14;

  // Calculate the progress percentage
  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="overflow-hidden h-[100vh]">
      <div className="relative h-[10px] overflow-hidden bg-gray-300">
        <div
          className="absolute h-full bg-gradient-to-r from-gray-700 via-green-600 to-orange-400 transition-all duration-300 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      {step === 1 && <GeneralInfo onSubmit={handleContinue} />}
      {step === 2 && <GeneralInfo2 onSubmit={handleContinue} />}
      {step === 3 && <Teamscore1 onSubmit={handleContinue} />}
      {step === 4 && <Teamscore2 onSubmit={handleContinue} />}
      {step === 5 && <Teamscore3 onSubmit={handleContinue} />}
      {step === 6 && <MarketScore onSubmit={handleContinue} />}
      {step === 7 && <MarketScore2 onSubmit={handleContinue} />}
      {step === 8 && <BusinessModel onSubmit={handleContinue} />}
      {step === 9 && <BusinessModel2 onSubmit={handleContinue} />}
      {step === 10 && <BusinessModel3 onSubmit={handleContinue} />}
      {step === 11 && <FinancialScore onSubmit={handleContinue} />}
      {step === 12 && <FinancialScore2 onSubmit={handleContinue} />}
      {step === 13 && <FinancialScore3 onSubmit={handleContinue} />}
      {step === 14 && <GovernanceScore onSubmit={handleSubmit} />}
      {step > 1 && (
        <button
          onClick={handleBack}
          className="absolute right-10 top-10 shadow-md p-2  flex cursor-pointer text-white rounded-md bg-[#000D80] hover:bg-blue-600 "
        >
          <FaBackward />
        </button>
      )}
      {step < totalSteps && <button onClick={handleContinue}></button>}
      <ToastContainer />
    </div>
  );
};

export default TeamScoreContainer;
