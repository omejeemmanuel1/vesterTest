/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GeneralInfo from "./GeneralInfo";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

interface GeneralInfoConProps {
  onSubmit: (selectedComponent: string) => void;
  selectedComponent: string;
  closeGeneralInfoModal: () => void;
}

const GeneralInfoContainer: React.FC<GeneralInfoConProps> = ({
  onSubmit,
  selectedComponent,
  closeGeneralInfoModal,
}) => {
  const [step, setStep] = useState(1);
  const initialValues = {
    registrationCountry: "",
    teamLocation: "",
    teamLocation2: "",
    industry: "",
    mainTechnology: "",
    foundingDate: "",
    fundingStage: "",
  };
  // const navigate = useNavigate();

  const getAccessToken = () => {
    return localStorage.getItem("token");
  };

  const handleContinue = () => {
    setStep(step + 1);
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const accessToken = getAccessToken();

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const data = {
        ...values,
        selectedComponent: selectedComponent,
      };

      await axios.post(`${baseUrl}/teamscore/create-generalInfo`, data, config);

      toast.success("General Overview Data submitted successfully");

      onSubmit(selectedComponent);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error || error.response?.data?.error;
        console.log(errorMessage);
        toast.error(errorMessage);
      } else {
        toast.error("Server is not responding. Please try again later.");
      }
    }
  };

  const totalSteps = 2;

  return (
    <div className="overflow-scroll h-[100vh]">
      {step === 1 && (
        <GeneralInfo
          onSubmit={(values) => handleSubmit(values as typeof initialValues)}
          selectedComponent={selectedComponent}
          closeGeneralInfoModal={closeGeneralInfoModal}
        />
      )}

      {step < totalSteps && <button onClick={handleContinue}></button>}
      <ToastContainer />
    </div>
  );
};

export default GeneralInfoContainer;
