/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { teamscoreSchema } from "../formValidate";

interface Teamscore1Props {
  onSubmit: (values: typeof initialValues) => void;
  initialValues: typeof initialValues;
}
const initialValues = {
  cofounderCount: "",
  cofounderNames: ["", "", ""],
  cofounderLinkedins: ["", "", ""],
  founderRoleTitle: ["", "", ""],
  founderGender: ["", "", ""],
  technicalFounder: ["", "", ""],
  founderTime: ["", "", ""],
  cLevel: ["", "", ""],
  cLevel2: ["", "", ""],
  cLevel3: ["", "", ""],
  founding_team_info: "",
};

const Teamscore1: React.FC<Teamscore1Props> = ({ onSubmit, initialValues }) => {
  const [cofounderCount, setCofounderCount] = useState<number>(0);

  useEffect(() => {
    const storedCofounderCount = localStorage.getItem("cofounderCount");
    if (storedCofounderCount) {
      setCofounderCount(parseInt(storedCofounderCount, 10));
    }
  }, []);

  const handleCofounderCountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let count = parseInt(event.target.value, 10) || 0;
    if (count > 3) {
      count = 3;
    }
    setCofounderCount(count);

    localStorage.setItem("cofounderCount", count.toString());
  };

  return (
    <div className="min-h-screen flex items-center justify-center mt-10">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
        validationSchema={teamscoreSchema}
      >
        <Form className="m-6 p-8 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px]">
          <h2 className="text-[32px] font-semibold mb-4">Team Score</h2>

          <div className="mb-4">
            <label htmlFor="cofounderCount" className="block text-sm">
              How many co-founders does your company have?
            </label>
            <Field
              type="text"
              id="cofounderCount"
              name="cofounderCount"
              value={cofounderCount}
              className="mt-1 p-2 w-full border rounded"
              onChange={handleCofounderCountChange}
              min="1"
              max="3"
              required
            />
          </div>

          {Array.from({ length: cofounderCount }).map((_, index) => (
            <div className="mb-4" key={index}>
              <label
                htmlFor={`cofounderNames[${index}]`}
                className="block text-sm"
              >
                Co-founder {index + 1} Name
              </label>
              <Field
                type="text"
                id={`cofounderNames[${index}]`}
                name={`cofounderNames[${index}]`}
                className="mt-1 p-2 w-full border rounded"
              />

              <label
                htmlFor={`cofounderLinkedins[${index}]`}
                className="block text-sm mt-2"
              >
                Co-founder {index + 1} LinkedIn Profile
              </label>
              <Field
                type="text"
                id={`cofounderLinkedins[${index}]`}
                name={`cofounderLinkedins[${index}]`}
                className="mt-1 p-2 w-full border rounded"
              />
              <label
                htmlFor={`founderRoleTitle[${index}]`}
                className="block text-sm mt-2"
              >
                what is the title of this founder's role
              </label>
              <Field
                type="text"
                id={`founderRoleTitle[${index}]`}
                name={`founderRoleTitle[${index}]`}
                className="mt-1 p-2 w-full border rounded"
              />

              <label
                htmlFor={`founderGender[${index}]`}
                className="block text-sm mt-2"
              >
                Is this founder male or female?
                <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <label className="mr-4">
                  <Field
                    type="radio"
                    id={`founderGender[${index}]`}
                    name={`founderGender[${index}]`}
                    value="male"
                    className="mr-[1px]"
                  />
                  Male
                </label>
                <label className="mr-4">
                  <Field
                    type="radio"
                    id={`founderGender[${index}]`}
                    name={`founderGender[${index}]`}
                    value="female"
                    className="mr-[1px]"
                  />
                  Female
                </label>
              </div>
              <ErrorMessage
                name="founderGender"
                component="p"
                className="text-red-500 text-sm"
              />

              <label
                htmlFor={`technicalFounder[${index}]`}
                className="block text-sm mt-2"
              >
                Is this a technical founder?
                <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <label className="mr-4">
                  <Field
                    type="radio"
                    id={`technicalFounder[${index}]`}
                    name={`technicalFounder[${index}]`}
                    value="Yes"
                    className="mr-[1px]"
                  />
                  Yes
                </label>
                <label className="mr-4">
                  <Field
                    type="radio"
                    id={`technicalFounder[${index}]`}
                    name={`technicalFounder[${index}]`}
                    value="No"
                    className="mr-[1px]"
                  />
                  No
                </label>
              </div>
              <ErrorMessage
                name="technicalFounder"
                component="p"
                className="text-red-500 text-sm"
              />
              <label
                htmlFor={`founderTime[${index}]`}
                className="block text-sm mt-2"
              >
                Is this founder part time or full time in the business?
                <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <label className="mr-4">
                  <Field
                    type="radio"
                    id={`founderTime[${index}]`}
                    name={`founderTime[${index}]`}
                    value="Yes"
                    className="mr-[1px]"
                  />
                  Part-time
                </label>
                <label className="mr-4">
                  <Field
                    type="radio"
                    id={`founderTime[${index}]`}
                    name={`founderTime[${index}]`}
                    value="No"
                    className="mr-[1px]"
                  />
                  Full-time
                </label>
              </div>
              <ErrorMessage
                name="founderTime"
                component="p"
                className="text-red-500 text-sm"
              />
              <label
                htmlFor={`cLevel[${index}]`}
                className="block text-sm mt-2"
              >
                Has this founder been a founder or C-level exec in a previous
                company?
              </label>
              <div className="mt-1">
                <label className="mr-4">
                  <Field
                    type="radio"
                    id={`cLevel[${index}]`}
                    className="mr-[1px]"
                    name={`cLevel[${index}]`}
                    value="Yes"
                  />
                  Yes
                </label>
                <label className="mr-4">
                  <Field
                    type="radio"
                    className="mr-[1px]"
                    id={`cLevel[${index}]`}
                    name={`cLevel[${index}]`}
                    value="No"
                  />
                  No
                </label>
              </div>
              <ErrorMessage
                name="cLevel"
                component="p"
                className="text-red-500 text-sm"
              />

              <label
                htmlFor={`cLevel2[${index}]`}
                className="block text-sm mt-2"
              >
                If yes, is the previous company still running?
              </label>
              <div className="mt-1">
                <label className="mr-2">
                  <Field
                    type="radio"
                    name={`cLevel2[${index}]`}
                    value="yes"
                    className="mr-[1px]"
                  />
                  Yes
                </label>
                <label>
                  <Field
                    type="radio"
                    name={`cLevel2[${index}]`}
                    value="no"
                    className="mr-[1px]"
                  />
                  No
                </label>
              </div>
              <label
                htmlFor={`cLevel3[${index}]`}
                className="block text-sm mt-2"
              >
                If yes, was that previous company acquired or did it have an
                IPO?
              </label>
              <div className="mt-1">
                <label className="mr-2">
                  <Field
                    type="radio"
                    name={`cLevel3[${index}]`}
                    value="yes"
                    className="mr-[1px]"
                  />
                  Yes acquired
                </label>
                <label>
                  <Field
                    type="radio"
                    name={`cLevel3[${index}]`}
                    value="no"
                    className="mr-[1px]"
                  />
                  No IPO
                </label>
              </div>
            </div>
          ))}
          <div className="mb-4">
            <label
              htmlFor="founding_team_info[${index}]"
              className="block text-sm"
            >
              What is the founding team information
              <span className="text-red-500">*</span>
            </label>
            <Field
              as="textarea"
              id="founding_team_info"
              name="founding_team_info"
              rows={4}
              className="mt-1 p-2 w-full border rounded"
            />
            <ErrorMessage
              name="founding_team_info"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          <button
            type="submit"
            className="bg-[#000D80] text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
          >
            Next
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Teamscore1;
