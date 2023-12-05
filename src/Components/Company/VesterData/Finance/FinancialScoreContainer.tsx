/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormBg from "../../../../assets/FormBg.mp4";
import Vester from "../../../../assets/Vester.AI2.png";
import { initialValues } from "../Governance/GovernanceScore2";
import FinancialScore2 from "./FinancialScore2";
import FinancialScore from "./FinancialScore";
import FinancialScore3 from "./FinancialScore3";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

const FinancialScoreContainer: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem("formData");
    return savedFormData ? JSON.parse(savedFormData) : initialValues;
  });

  const navigate = useNavigate();

  const getAccessToken = () => {
    return localStorage.getItem("token");
  };

  const handleContinue = (data: any) => {
    const updatedFormData = { ...formData, ...data };
    setFormData(updatedFormData);

    localStorage.setItem("formData4", JSON.stringify(updatedFormData));

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

      navigate("/company_dashboard");
      toast.info(
        "Your financial data is submitting, you can move on to Assess other pillars"
      );

      await axios.post(
        `${baseUrl}/teamscore/create-financialScore`,
        combinedData,
        config
      );

      console.log("Data submitted successfully:", combinedData);

      toast.success("Finance Data submitted successfully");
    } catch (error: any) {
      if (error.response) {
        const errorMessage =
          error.response.data?.error || error.response.data?.error;
        console.log(errorMessage);
        toast.error(errorMessage);
      } else {
        toast.error("Server is not responding. Please try again later.");
      }
    } 
  };

  const totalSteps = 3;

  return (
    <div className={`overflow-scroll h-[100vh] `}>
      <div className="w-32">
        <img src={Vester} alt="vester logo" className="m-4" />
      </div>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="object-cover w-full h-full absolute top-0 left-0 -z-10"
      >
        <source src={FormBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="flex justify-center space-x-6 z-20">
        {[1, 2, 3].map((circleStep, index) => (
          <div key={circleStep} className="relative">
            {index > 0 && (
              <div className="absolute h-1 w-10 bg-[#000D80] top-4 -left-7 -z-10"></div>
            )}
            <div
              className={`w-10 h-10 rounded-full ${
                circleStep <= step ? "bg-[#000D80]" : "bg-white"
              }`}
            ></div>
          </div>
        ))}
      </div>

      {step === 1 && <FinancialScore onSubmit={handleContinue} />}
      {step === 2 && (
        <FinancialScore2
          onSubmit={handleContinue}
          handleBack={handleBack}
          step={step}
        />
      )}
      {step === 3 && (
        <FinancialScore3
          onSubmit={handleSubmit}
          initialValues={formData}
          handleBack={handleBack}
          step={step}
        />
      )}

      {step < totalSteps && <button onClick={handleContinue}></button>}
      <ToastContainer />
    </div>
  );
};

export default FinancialScoreContainer;
