/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { initialValues } from "../Governance/GovernanceScore2";
import BusinessModel from "./BusinessModel";
import BusinessModel2 from "./BusinessModel2";
import axios from "axios";
import FormBg from "../../../../assets/FormBg.mp4";
import Vester from "../../../../assets/Vester.AI2.png";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

const BusinessScoreContainer: React.FC = () => {
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

    localStorage.setItem("formData2", JSON.stringify(updatedFormData));

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
        "Your business data is submitting, you can move on to Assess other pillars"
      );

      await axios.post(
        `${baseUrl}/teamscore/create-businessScore`,
        combinedData,
        config
      );

      console.log("Data submitted successfully:", combinedData);

      toast.success("Business Data submitted successfully");
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

  const totalSteps = 2;

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
        {[1, 2].map((circleStep, index) => (
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

      {step === 1 && <BusinessModel onSubmit={handleContinue} />}
      {step === 2 && (
        <BusinessModel2
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

export default BusinessScoreContainer;
