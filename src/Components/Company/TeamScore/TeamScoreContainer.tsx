/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GeneralInfo from "./GeneralInfo";
import Teamscore1 from "./Teamscore1";
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
import Teamscore2 from "./TeamScore2";
import { useTheme } from "../../../Context/ThemeContext";
import { initialValues } from "./GovernanceScore";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

const TeamScoreContainer: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem("formData");
    return savedFormData ? JSON.parse(savedFormData) : initialValues;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const getAccessToken = () => {
    return localStorage.getItem("token");
  };

  const handleContinue = (data: any) => {
    const updatedFormData = { ...formData, ...data };
    setFormData(updatedFormData);

    localStorage.setItem("formData", JSON.stringify(updatedFormData));

    setStep(step + 1);
  };
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (finalData: any) => {
    setIsSubmitting(true); 

    try {
      const combinedData = { ...formData, ...finalData };

      const accessToken = getAccessToken();

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      await axios.post(
        `${baseUrl}/teamscore/create-teamscore`,
        combinedData,
        config
      );

      console.log("Data submitted successfully:", combinedData);
      toast.success("Data submitted successfully");
      navigate("/company_dashboard");
    } catch (error: any) {
      if (error.response) {
        const errorMessage =
          error.response.data?.error || error.response.data?.error;
        console.log(errorMessage);
        toast.error(errorMessage);
      } else {
        toast.error("Server is not responding. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalSteps = 13;

  const progressPercentage = (step / totalSteps) * 100;
  const { theme } = useTheme();

  return (
    <div
      className={`overflow-scroll h-[100vh] ${
        theme === "light"
          ? "bg-[#fff] bg-opacity-10 text-[#000D80]"
          : "dark:bg-gray-800 text-gray-400"
      }`}
    >
      <div className="relative h-[10px] overflow-hidden bg-gray-300">
        <div
          className="absolute h-full bg-gradient-to-r from-gray-700 via-green-600 to-orange-400 transition-all duration-300 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      {step === 1 && (
        <GeneralInfo onSubmit={handleContinue} initialValues={formData} />
      )}
      {step === 2 && (
        <GeneralInfo2 onSubmit={handleContinue} initialValues={formData} />
      )}
      {step === 3 && (
        <Teamscore1 onSubmit={handleContinue} initialValues={formData} />
      )}
     
      {step === 4 && <Teamscore2 onSubmit={handleContinue} />}
      {step === 5 && (
        <MarketScore onSubmit={handleContinue} initialValues={formData} />
      )}
      {step === 6 && <MarketScore2 onSubmit={handleContinue} />}
      {step === 7 && <BusinessModel onSubmit={handleContinue} />}
      {step === 8 && (
        <BusinessModel2 onSubmit={handleContinue} initialValues={formData} />
      )}
      {step === 9 && (
        <BusinessModel3 onSubmit={handleContinue} initialValues={formData} />
      )}
      {step === 10 && (
        <FinancialScore onSubmit={handleContinue} initialValues={formData} />
      )}
      {step === 11 && <FinancialScore2 onSubmit={handleContinue} />}
      {step === 12 && (
        <FinancialScore3 onSubmit={handleContinue} initialValues={formData} />
      )}
      {step === 13 && (
        <GovernanceScore
          onSubmit={handleSubmit}
          initialValues={formData}
          isSubmitting={isSubmitting}
        />
      )}
      {step > 1 && (
        <button
          onClick={handleBack}
          className="absolute top-6 right-10 md:top-10 shadow-md p-2  flex cursor-pointer text-white rounded-md bg-[#000D80] hover:bg-blue-600 "
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
