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
  selectedComponent: string; // Add selectedComponent as a prop
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

      // Create a data object with the form values
      const data = {
        ...values,
        selectedComponent: selectedComponent,
      };

      // Make a POST request with the data
      await axios.post(`${baseUrl}/teamscore/create-generalInfo`, data, config);

      toast.success("Data submitted successfully");

      // Call the onSubmit function and pass the selected component
      onSubmit(selectedComponent);

      // You can also pass the selected component to navigate to the specific component route
      // navigate(`/${selectedComponent}-info`); // Update the route
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