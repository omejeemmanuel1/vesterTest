/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormBg from "../../../../assets/FormBg.mp4";
import Vester from "../../../../assets/Vester.AI2.png";

import GovernanceScore, { initialValues } from "./GovernanceScore2";
import GovernanceScore2 from "./GovernanceScore";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

const GovernanceScoreContainer: React.FC = () => {
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

    localStorage.setItem("formData5", JSON.stringify(updatedFormData));

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
        `${baseUrl}/teamscore/create-governanceScore`,
        combinedData,
        config
      );

      console.log("Data submitted successfully:", combinedData);
      toast.success("Data submitted successfully");
      navigate("/score");
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
        {[1, 2].map((circleStep) => (
          <div
            key={circleStep}
            className={`w-10 h-10 rounded-full ${
              circleStep <= step ? "bg-[#031549]" : "bg-white"
            }`}
          ></div>
        ))}
      </div>
      <div className="w-20 h-1 bg-[#031549] relative left-[670px] -top-5 -z-10"></div>

      {step === 1 && (
        <GovernanceScore2 onSubmit={handleContinue} initialValues={formData} />
      )}
      {step === 2 && (
        <GovernanceScore
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          handleBack={handleBack}
          step={step}
        />
      )}

      {step < totalSteps && <button onClick={handleContinue}></button>}
      <ToastContainer />
    </div>
  );
};

export default GovernanceScoreContainer;