/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { preferenceSchema } from "./formValidate";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Vester from "../../../assets/Vester.AI2.png";
import FormBg from "../../../assets/FormBg.mp4";
import Select from "react-select";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

const initialValues = {
  startupStage: "",
  africanCountry: "",
  sector: "",
  technologyInterest: "",
  businessModel: "",
  startupValuation: "",
  femaleFounderInterest: null,
  technicalFounder: null,
  additionalContext: "",
};

const startupOptions = [
  "pre-seed",
  "seed",
  "pre-series A",
  "series A",
  "pre-series B",
  "series B",
  "pre-series C",
  "series C",
  "pre-series D",
  "series D",
];

const africanCountries = [
  "Algeria",
  "Angola",
  "Benin",
  "Botswana",
  "Burkina Faso",
  "Burundi",
  "Cape Verde",
  "Cameroon",
  "Central African Republic",
  "Chad",
  "Comoros",
  "Congo (Congo-Brazzaville)",
  "Democratic Republic of the Congo (Congo-Kinshasa)",
  "Djibouti",
  "Egypt",
  "Equatorial Guinea",
  "Eritrea",
  "Eswatini (formerly Swaziland)",
  "Ethiopia",
  "Gabon",
  "Gambia",
  "Ghana",
  "Guinea",
  "Guinea-Bissau",
  "Ivory Coast (Cote d'Ivoire)",
  "Kenya",
  "Lesotho",
  "Liberia",
  "Libya",
  "Madagascar",
  "Malawi",
  "Mali",
  "Mauritania",
  "Mauritius",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Niger",
  "Nigeria",
  "Rwanda",
  "Sao Tome and Principe",
  "Senegal",
  "Seychelles",
  "Sierra Leone",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Sudan",
  "Tanzania",
  "Togo",
  "Tunisia",
  "Uganda",
  "Zambia",
  "Zimbabwe",
  "Benin",
  "Burkina Faso",
  "Cape Verde",
  "Ivory Coast (Cote d'Ivoire)",
  "Gambia",
  "Ghana",
  "Guinea",
  "Guinea-Bissau",
  "Liberia",
  "Mali",
  "Niger",
  "Nigeria",
  "Senegal",
  "Sierra Leone",
  "Togo",
  "Burundi",
  "Comoros",
  "Djibouti",
  "Eritrea",
  "Ethiopia",
  "Kenya",
  "Madagascar",
  "Malawi",
  "Mauritius",
  "Mozambique",
  "Rwanda",
  "Seychelles",
  "Somalia",
  "South Sudan",
  "Tanzania",
  "Uganda",
  "Angola",
  "Botswana",
  "Eswatini (formerly Swaziland)",
  "Lesotho",
  "Namibia",
  "South Africa",
  "Zambia",
  "Zimbabwe",
  "Cameroon",
  "Central African Republic",
  "Chad",
  "Congo (Congo-Brazzaville)",
  "Democratic Republic of the Congo (Congo-Kinshasa)",
  "Equatorial Guinea",
  "Gabon",
  "Sao Tome and Principe",
  "Libya",
  "Mauritania",
  "Morocco",
  "Sudan",
  "Tunisia",
];

const sectorOptions = [
  "Advertising/Marketing",
  "AgTech",
  "Art Tech",
  "Automotive",
  "Biotech/Life ScienceBiotech/Life Science",
  "Construction/Real estate",
  "Consulting",
  "Cybersecurity/Security",
  "Data & Analytics",
  "Design/UX",
  "E-commerce/Consumer",
  "EdTech",
  "Energy",
  "Entertainment",
  "Fashion/Beauty",
  "Fintech",
  "Food/Beverage",
  "Gaming/E-sports",
  "Health/Medical",
  "Human Resources",
  "Insurance IoT (Internet of Things)",
  "Law Enforcement",
  "Legal Tech",
  "Logistics",
  "Manufacturing",
  "Not-for-profit",
  "Productivity",
  "Publishing/Content creation",
  "Robotics",
  "Smart cities",
  "Social Impact",
  "Social networking",
  "Space Tech",
  "Sports",
  "Social networking",
  "Sustainanility & Cleantech",
  "Telecommunications",
  "Travel/Hospitality",
  "Wearable Tech",
  "Other",
];

const technologyOptions = [
  "Software Development",
  "Information Technology (IT)",
  "Hardware/ Electronics",
  "Internet/ E-commerce",
  "Biotechnology",
  "Artificial Intelligence (AI) and Machine Learning",
  "Blockchain and Cryptocurrency",
  "Renewable Energy Technology",
  "Green Technology",
  "Other (Please specify)",
];
const businessOptions = ["B2B", "B2C", "B2B2C", "C2C", "B2G"];

const valuationOptions = [
  "Under $5m",
  "$5m - $10m",
  "$10m-$15m",
  "$15m-$20m",
  "Over $20m",
  "Other",
];

const InvestorPreference: React.FC = () => {
  const [femaleFounderInterest, setFemaleFounderInterest] = useState<
    number | null
  >(null);
  const [technicalFounder, setTechnicalFounder] = useState<number | null>(null);

  const handleFemaleFounderInterestChange = (
    value: number,
    setFieldValue: (field: string, value: any) => void
  ) => {
    console.log("Selected Female Founder Interest:", value);
    setFemaleFounderInterest(value);
    setFieldValue("femaleFounderInterest", value);
  };

  const handleTechnicalFounderChange = (
    value: number,
    setFieldValue: (field: string, value: any) => void
  ) => {
    console.log("Selected Technical Founder:", value);
    setTechnicalFounder(value);
    setFieldValue("technicalFounder", value);
  };

  const navigate = useNavigate();

  const getAccessToken = () => {
    return localStorage.getItem("token");
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const accessToken = getAccessToken();

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      await axios.post(
        `${baseUrl}/preference/create-preference`,
        values,
        config
      );

      console.log("Data submitted successfully:", values);
      toast.success("Data submitted successfully");
      navigate("/deal-flow");
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

  return (
    <div className="overflow-hidden">
      <div className="w-32">
        <img src={Vester} alt="vester logo" className="m-4" />
      </div>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="object-cover w-full absolute top-0 left-0 -z-10 overflow-hidden"
      >
        <source src={FormBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="min-h-screen flex md:items-center justify-center m-32 md:m-0">
        <div className="-mt-[100px] bg-white p-8 rounded-2xl shadow-md border border-gray-400 font-poppins w-[800px]">
          <h2 className="text-xl md:text-[24px] text-center font-semibold mb-4 text-[#0A0A3F]">
            Investor Preferences
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={preferenceSchema}
            onSubmit={handleSubmit}
          >
            {(formikProps) => (
              <Form className="flex flex-col md:flex-row mb-5">
                <div className="md:w-1/2 md:mr-4">
                  <div className="mb-4">
                    <label
                      htmlFor="startupStage"
                      className="block text-sm text-[#0A0A3F]"
                    >
                      What is your preferred startup stage? <br />
                      <small>Choose as many as you like</small>
                    </label>
                    <Field
                      name="startupStage"
                      render={({ field, form }: any) => (
                        <Select
                          {...field}
                          options={[
                            { value: "all", label: "Select All" },
                            ...startupOptions.map((option) => ({
                              value: option,
                              label: option,
                            })),
                          ]}
                          isMulti
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={(value: any) => {
                            if (
                              value &&
                              value.length > 0 &&
                              value[0].value === "all"
                            ) {
                              form.setFieldValue(
                                "startupStage",
                                startupOptions
                              );
                            } else {
                              form.setFieldValue("startupStage", value);
                            }
                          }}
                        />
                      )}
                    />

                    <ErrorMessage
                      name="startupStage"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="africanCountry"
                      className="block text-sm text-[#0A0A3F]"
                    >
                      What african country are you focused on?{" "}
                      <span className="text-red-500">*</span> <br />
                      <small>Select as many as apply</small>
                    </label>
                    <Field
                      name="africanCountry"
                      render={({ field, form }: any) => (
                        <Select
                          {...field}
                          options={[
                            {
                              value: "all",
                              label: "Select All",
                            },
                            ...africanCountries.map((option) => ({
                              value: option,
                              label: option,
                            })),
                          ]}
                          isMulti
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={(value: any) => {
                            if (
                              value &&
                              value.length > 0 &&
                              value[0].value === "all"
                            ) {
                              form.setFieldValue(
                                "africanCountry",
                                africanCountries
                              );
                            } else {
                              form.setFieldValue("africanCountry", value);
                            }
                          }}
                        />
                      )}
                    />
                    <ErrorMessage
                      name="africanCountry"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="sector"
                      className="block text-sm text-[#0A0A3F]"
                    >
                      What sector(s) in the selected country are you interested
                      in? <span className="text-red-500">*</span> <br />
                      <small>Select as many as apply</small>
                    </label>
                    <Field
                      name="sector"
                      render={({ field, form }: any) => (
                        <Select
                          {...field}
                          options={[
                            { value: "all", label: "select All" },
                            ...sectorOptions.map((option) => ({
                              value: option,
                              label: option,
                            })),
                          ]}
                          isMulti
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={(value: any) => {
                            if (
                              value &&
                              value.length > 0 &&
                              value[0].value === "all"
                            ) {
                              form.setFieldValue("sector", sectorOptions);
                            } else {
                              form.setFieldValue("sector", value);
                            }
                          }}
                        />
                      )}
                    />
                    <ErrorMessage
                      name="sector"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="technologyInterest"
                      className="block text-sm text-[#0A0A3F]"
                    >
                      What technology are you interested in funding?{" "}
                      <span className="text-red-500">*</span> <br />
                      <small>Select as many as apply</small>
                    </label>
                    <Field
                      name="technologyInterest"
                      render={({ field, form }: any) => (
                        <Select
                          {...field}
                          options={[
                            { value: "all", label: "select All" },
                            ...technologyOptions.map((option) => ({
                              value: option,
                              label: option,
                            })),
                          ]}
                          isMulti
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={(value: any) => {
                            if (
                              value &&
                              value.length > 0 &&
                              value[0].value === "all"
                            ) {
                              form.setFieldValue(
                                "technologyInterest",
                                technologyOptions
                              );
                            } else {
                              form.setFieldValue("technologyInterest", value);
                            }
                          }}
                        />
                      )}
                    />
                    <ErrorMessage
                      name="technologyInterest"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="businessModel"
                      className="block text-sm text-[#0A0A3F]"
                    >
                      What is your preferred business model <br />
                      <small>Select as many as apply</small>
                    </label>
                    <Field
                      name="businessModel"
                      render={({ field, form }: any) => (
                        <Select
                          {...field}
                          options={[
                            { value: "all", label: "Select All" },
                            ...businessOptions.map((option) => ({
                              value: option,
                              label: option,
                            })),
                          ]}
                          isMulti
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={(value: any) => {
                            if (
                              value &&
                              value.length > 0 &&
                              value[0].value === "all"
                            ) {
                              form.setFieldValue(
                                "businessModel",
                                businessOptions
                              );
                            } else {
                              form.setFieldValue("businessModel", value);
                            }
                          }}
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="md:w-1/2 mt-4 md:mt-5">
                  {" "}
                  <div className="mb-4">
                    <label
                      htmlFor="startupValuation"
                      className="block text-sm text-[#0A0A3F]"
                    >
                      What is your ideal startup valuation?
                    </label>
                    <Field
                      name="startupValuation"
                      render={({ field, form }: any) => (
                        <Select
                          {...field}
                          options={[
                            { value: "all", label: "Select All" },
                            ...valuationOptions.map((option) => ({
                              value: option,
                              label: option,
                            })),
                          ]}
                          isMulti
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={(value: any) => {
                            if (
                              value &&
                              value.length > 0 &&
                              value[0].value === "all"
                            ) {
                              form.setFieldValue(
                                "startupValuation",
                                valuationOptions
                              );
                            } else {
                              form.SetFieldValue("startupValuation", value);
                            }
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="femaleFounderInterest"
                      className="block text-sm text-[#0A0A3F]"
                    >
                      On a scale of 1-10, how interested are you in startups
                      that have a woman founder?
                    </label>
                    <div className="flex">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                        <div
                          key={value}
                          onClick={() =>
                            handleFemaleFounderInterestChange(
                              value,
                              formikProps.setFieldValue
                            )
                          }
                          className={`p-2 cursor-pointer mr-2 ${
                            femaleFounderInterest === value
                              ? "bg-[#031549] text-white"
                              : "bg-[#bbbbbc] text-[#1F2937]"
                          }`}
                        >
                          {value}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="technicalFounder"
                      className="block text-sm text-[#0A0A3F]"
                    >
                      On a scale of 1-10, how important is it to you that a
                      startup has a technical co-founder?
                    </label>
                    <div className="flex">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                        <div
                          key={value}
                          onClick={() =>
                            handleTechnicalFounderChange(
                              value,
                              formikProps.setFieldValue
                            )
                          }
                          className={`p-2 cursor-pointer mr-2 ${
                            technicalFounder === value
                              ? "bg-[#031549] text-white"
                              : "bg-[#bbbbbc] text-[#1F2937]"
                          }`}
                        >
                          {value}
                        </div>
                      ))}
                    </div>
                    <input
                      type="hidden"
                      id="technicalFounder"
                      name="technicalFounder"
                      value={
                        technicalFounder !== null
                          ? technicalFounder.toString()
                          : ""
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="additionalContext"
                      className="block text-sm text-[#0A0A3F]"
                    >
                      Please share any additional context on what you would like
                      to know about your preferred market or startup segment
                    </label>
                    <Field
                      as="textarea"
                      id="additionalContext"
                      name="additionalContext"
                      rows={4}
                      className="mt-1 p-2 w-full border rounded"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex bg-[#031549] items-center justify-center text-white py-2 px-2 rounded-full hover:bg-blue-600 w-full"
                  >
                    Submit
                    <MdOutlineKeyboardDoubleArrowRight />
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default InvestorPreference;
