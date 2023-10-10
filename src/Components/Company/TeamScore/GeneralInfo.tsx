/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaFastBackward } from "react-icons/fa";
import { Link } from "react-router-dom";
import { generalSchema } from "../formValidate";
import countryList from "country-list"; // Import the country-list library

interface GeneralInfoProps {
  onSubmit: (values: typeof initialValues) => void;
  initialValues: typeof initialValues;
}

const initialValues = {
  companyOverview: "",
  registrationRegion: "",
  registrationCountry: "",
  otherCountries: "",
  teamLocation: "",
  teamLocation2: "",
};

const GeneralInfo: React.FC<GeneralInfoProps> = ({
  onSubmit,
  initialValues,
}) => {
  const [showTeamLocation2, setShowTeamLocation2] = useState(false);
  const [selectedTeamLocation, setSelectedTeamLocation] = useState("");

  // Generate a list of all countries
  const allCountries = countryList.getNames();

  const regionCountries: Record<string, string[]> = {
    "North Africa": [
      "Algeria",
      "Egypt",
      "Libya",
      "Mauritania",
      "Morocco",
      "Sudan",
      "Tunisia",
    ],
    "West Africa": [
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
    ],
    "East Africa": [
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
    ],
    "Southern Africa": [
      "Angola",
      "Botswana",
      "Eswatini (formerly Swaziland)",
      "Lesotho",
      "Namibia",
      "South Africa",
      "Zambia",
      "Zimbabwe",
    ],
    "Central Africa": [
      "Cameroon",
      "Central African Republic",
      "Chad",
      "Congo (Congo-Brazzaville)",
      "Democratic Republic of the Congo (Congo-Kinshasa)",
      "Equatorial Guinea",
      "Gabon",
      "Sao Tome and Principe",
    ],
  };
  const [countryOptions, setCountryOptions] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>("");

  useEffect(() => {
    if (selectedRegion) {
      const selectedCountries = regionCountries[selectedRegion] || [];
      setCountryOptions(selectedCountries);
    }
  }, [selectedRegion]);

  return (
    <div className="min-h-screen flex md:items-center justify-center mt-10 md:mt-none">
      <Link to="/company_dashboard">
        <button className="absolute right-10 top-10 shadow-md p-2  flex cursor-pointer text-white rounded-md bg-[#000D80] hover:bg-blue-600 ">
          <FaFastBackward />
        </button>
      </Link>
      <Formik
        validationSchema={generalSchema}
        onSubmit={onSubmit}
        initialValues={initialValues}
        enableReinitialize={true}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <Form
            onSubmit={handleSubmit}
            className="m-6 p-8 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px]"
          >
            <h2 className="text-[26px] font-semibold mb-4">
              Company's General Information
            </h2>
            <div className="mb-4">
              <label htmlFor="companyOverview" className="block text-sm">
                In one or two lines, tell us about your business?{" "}
                <span className="text-red-500">*</span>
              </label>
              <Field
                as="textarea"
                id="companyOverview"
                name="companyOverview"
                rows={2}
                className="mt-1 text-sm p-2 w-full border rounded"
              />
              <ErrorMessage
                name="companyOverview"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
            {/* Region Dropdown */}
            <div className="mb-4">
              <label htmlFor="registrationRegion" className="block text-sm">
                Where is your company legally registered in Africa (Region)?
                <span className="text-red-500">*</span>
              </label>
              <Field
                as="select"
                id="registrationRegion"
                name="registrationRegion"
                className="mt-1 mr-1 p-2 w-full border rounded"
                onChange={(event: any) => {
                  setSelectedRegion(event.target.value);
                  setFieldValue("registrationRegion", event.target.value);
                  setFieldValue("registrationCountry", ""); // Clear previous value
                  console.log("Selected Region:", event.target.value);
                }}
              >
                <option value="">Select Region</option>
                <option value="North Africa">North Africa</option>
                <option value="West Africa">West Africa</option>
                <option value="East Africa">East Africa</option>
                <option value="Southern Africa">Southern Africa</option>
                <option value="Central Africa">Central Africa</option>
              </Field>
              <ErrorMessage
                name="registrationRegion"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="registrationCountry" className="block text-sm">
                Where is your company legally registered in Africa (Country)?
                <span className="text-red-500">*</span>
              </label>
              <Field
                as="select"
                id="registrationCountry"
                name="registrationCountry"
                className="mt-1 p-2 w-full border rounded"
              >
                <option value="">Select Country</option>
                {countryOptions.map((country) => (
                  <option key={country} value={country}>
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
              <label className="block text-sm">
                Is your company registered in any other country?
              </label>
              <div className="flex">
                <label className="mr-2">
                  <Field
                    type="radio"
                    name="otherCountries"
                    value="yes"
                    className="mr-1"
                  />
                  Yes
                </label>
                <label>
                  <Field
                    type="radio"
                    name="otherCountries"
                    value="no"
                    className="mr-1"
                  />
                  No
                </label>
              </div>
            </div>

            {values.otherCountries === "yes" && (
              <div className="mb-4">
                <label htmlFor="registeredCountries" className="block text-sm">
                  List of all countries your company is registered in:
                </label>
                <Field
                  as="select"
                  id="registeredCountries"
                  name="registeredCountries"
                  className="mt-1 p-2 w-full border rounded"
                >
                  <option value="">Select Country</option>
                  {allCountries.map((country: any) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </Field>
              </div>
            )}
            <div className="mb-4">
              <label htmlFor="teamLocation" className="block text-sm">
                Is the majority of your team based in Africa? (Primary location)
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
                  If no, where is the majority of your team based?
                </label>
                <Field
                  type="text"
                  id="teamLocation2"
                  name="teamLocation2"
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
            )}
            <button
              type="submit"
              className="bg-[#000D80] text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
            >
              Continue
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GeneralInfo;
