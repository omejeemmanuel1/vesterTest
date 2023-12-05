/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { generalSchema } from "./generalInfoValidate";
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";

interface GeneralInfoProps {
  onSubmit: (values: typeof initialValues, selectedComponent: string) => void;
  selectedComponent: string;
  closeGeneralInfoModal: () => void;
}

const fundingStageOptions = [
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

const initialValues = {
  registrationCountry: "",
  teamLocation: "",
  teamLocation2: "",
  industry: "",
  mainTechnology: "",
  foundingDate: "",
  fundingStage: "",
};

const GeneralInfo: React.FC<
  GeneralInfoProps & { onSubmit: (selectedComponent: string) => void }
> = ({ onSubmit, selectedComponent, closeGeneralInfoModal }) => {
  const [showTeamLocation2, setShowTeamLocation2] = useState(false);
  const [selectedTeamLocation, setSelectedTeamLocation] = useState("");

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

  return (
    <div className="min-h-screen flex md:items-center justify-center md:-mt-6">
      <p className="z-10 absolute right-10 top-10 border-2 border-gray-300 text-white rounded-lg p-4 bg-gray-700">
        Please quickly fill in your company overview
      </p>
      <Formik
        validationSchema={generalSchema}
        onSubmit={(values) => {
          onSubmit(values, selectedComponent);
        }}
        initialValues={initialValues}
        enableReinitialize={true}
      >
        <Form className="m-6 p-8 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px] bg-white">
          <h2 className="text-[24px] font-semibold">Company Overview</h2>
          <p className="italic text-xs text-red-500 font-thin mb-4">
            * indicates required
          </p>

          <div className="mb-4">
            <label htmlFor="registrationCountry" className="block text-sm">
              Where is your company legally registered in Africa?
              <span className="text-red-500">*</span>
            </label>
            <Field
              as="select"
              id="registrationCountry"
              name="registrationCountry"
              className="mt-1 p-2 w-full border rounded"
            >
              <option value="">Select Country</option>
              {africanCountries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </Field>

            <ErrorMessage
              name="registrationCountry"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="teamLocation" className="block text-sm">
              Is this where majority of your team based?
            </label>
            <div className="mt-1">
              <label className="mr-2">
                <Field
                  type="radio"
                  id="teamLocationYes"
                  name="teamLocation"
                  value="yes"
                  checked={selectedTeamLocation === "yes"}
                  onChange={() => {
                    setSelectedTeamLocation("yes");
                    setShowTeamLocation2(false);
                  }}
                />
                Yes
              </label>
              <label>
                <Field
                  type="radio"
                  id="teamLocationNo"
                  name="teamLocation"
                  value="no"
                  checked={selectedTeamLocation === "no"}
                  onChange={() => {
                    setSelectedTeamLocation("no");
                    setShowTeamLocation2(true);
                  }}
                />
                No
              </label>
            </div>
          </div>

          {showTeamLocation2 && (
            <div className="mb-4">
              <label htmlFor="teamLocation2" className="block text-sm">
                If no, please tell us where
              </label>
              <Field
                type="text"
                id="teamLocation2"
                name="teamLocation2"
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="industry" className="block text-sm">
              Which of these best describes your industry?
              <span className="text-red-500">*</span>
            </label>
            <Field
              as="select"
              id="industry"
              name="industry"
              className="mt-1 p-2 w-full border rounded"
            >
              <option value="">Select Industry</option>

              <option value="Advertising/Marketing">
                Advertising/Marketing
              </option>
              <option value="AgTech"> AgTech</option>
              <option value="Art Tech">Art Tech</option>
              <option value="Automotive">Automotive</option>
              <option value="Biotech/Life ScienceBiotech/Life Science">
                Biotech/Life ScienceBiotech/Life Science
              </option>
              <option value="Construction/Real estate">
                Construction/Real estate{" "}
              </option>
              <option value="Consulting">Consulting</option>
              <option value="Cybersecurity/Security">
                Cybersecurity/Security
              </option>
              <option value="Data & Analytics">Data & Analytics</option>
              <option value="Design/UX">Design/UX</option>
              <option value="E-commerce/Consumer">E-commerce/Consumer</option>
              <option value="EdTech">EdTech</option>
              <option value="Energy">Energy</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Fashion/Beauty">Fashion/Beauty</option>
              <option value="Fintech">Fintech</option>
              <option value="Food/Beverage">Food/Beverage</option>
              <option value="aming/E-sports">Gaming/E-sports</option>
              <option value="Health/Medical">Health/Medical </option>
              <option value="Human Resources">Human Resources</option>
              <option value="Insurance IoT (Internet of Things)">
                Insurance IoT (Internet of Things){" "}
              </option>
              <option value="Law Enforcement">Law Enforcement</option>
              <option value="Legal Tech">Legal Tech</option>
              <option value="Logistics">Logistics</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Not-for-profi">Not-for-profit</option>
              <option value="Productivity">Productivity</option>
              <option value="Publishing/Content creation">
                Publishing/Content creation
              </option>
              <option value="Robotics">Robotics</option>
              <option value="Smart cities">Smart cities</option>
              <option value="Social Impact">Social Impact</option>
              <option value="Social networking"> Social networking</option>
              <option value="Space Tech">Space Tech</option>
              <option value="Sports"> Sports</option>
              <option value="Social networking"> Social networking</option>
              <option value="Sustainanility & Cleantech">
                Sustainanility & Cleantech
              </option>
              <option value="Telecommunications">Telecommunications</option>
              <option value="Travel/Hospitality">Travel/Hospitality</option>
              <option value="Wearable Tech">Wearable Tech</option>
              <option value="Other">Other</option>
            </Field>
            <ErrorMessage
              name="industry"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm">
              What technology does your company mainly use? (select all that
              apply)
              <span className="text-red-500">*</span>
            </label>
            <div>
              {technologyOptions.map((option) => (
                <div key={option} className="flex items-center">
                  <Field
                    type="checkbox"
                    id={`mainTechnology-${option}`}
                    name="mainTechnology"
                    value={option}
                    className="mr-2"
                  />
                  <label htmlFor={`mainTechnology-${option}`}>{option}</label>
                </div>
              ))}
            </div>
            <ErrorMessage
              name="mainTechnology"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="foundingDate" className="block text-sm">
              When was this company founded? (date selection){" "}
              <span className="text-red-500">*</span>
            </label>
            <Field
              type="date"
              id="foundingDate"
              name="foundingDate"
              className="mt-1 p-2 w-full border rounded"
            />
            <ErrorMessage
              name="foundingDate"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="fundingStage" className="block text-sm">
              What is your current stage of funding?
              <span className="text-red-500">*</span>
            </label>
            <Field
              as="select"
              id="fundingStage"
              name="fundingStage"
              className="mt-1 p-2 w-full border rounded"
            >
              <option value="">Select funding stage</option>
              {fundingStageOptions.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="fundingStage"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>
          <div className="flex space-x-6">
            <button
              onClick={closeGeneralInfoModal}
              className="flex bg-[#000D80] justify-center text-white py-2 px-2 rounded-full hover:bg-blue-600 w-full"
            >
              <MdOutlineKeyboardDoubleArrowLeft />
              Dashboard
            </button>

            <button
              type="submit"
              className="flex bg-[#000D80] items-center justify-center text-white py-2 px-2 rounded-full hover:bg-blue-600 w-full"
            >
              Submit form
              <MdOutlineKeyboardDoubleArrowRight />
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default GeneralInfo;
