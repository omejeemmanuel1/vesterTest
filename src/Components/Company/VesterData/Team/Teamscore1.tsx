/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { teamscoreSchema } from "./teamValidate";
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { Link } from "react-router-dom";

interface Teamscore1Props {
  onSubmit: (values: typeof initialValues) => void;
  initialValues: typeof initialValues;
}
const initialValues = {
  foundingteam: "",
  cofounderCount: "",
  cofounderNames: ["", "", ""],
  cofounderLinkedins: ["", "", ""],
  foundingteam_key_role: ["", "", ""],
  founderGender: ["", "", ""],
  technicalFounder: ["", "", ""],
  foundingteam_committment: ["", "", ""],
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
    <div className="min-h-screen flex items-center justify-center">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
        validationSchema={teamscoreSchema}
      >
        <Form className="m-6 p-8 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px] bg-white">
          <h2 className="text-[24px] font-semibold">Who Makes Up Your Team?</h2>
          <p className="italic text-xs text-red-500 font-thin mb-4">
            * indicates required
          </p>
          <div className="mb-4">
            <label htmlFor="cofounderCount" className="block text-sm">
              How many co-founders does your company have?
              <span className="text-red-500">*</span>
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
                Co-founder {index + 1} name
                <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                id={`cofounderNames[${index}]`}
                name={`cofounderNames[${index}]`}
                className="mt-1 p-2 w-full border rounded"
              />
              <ErrorMessage
                name="cofounderNames"
                component="p"
                className="text-red-500 text-sm"
              />

              <label
                htmlFor={`cofounderLinkedins[${index}]`}
                className="block text-sm mt-2"
              >
                Co-founder {index + 1} LinkedIn{" "}
                <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                id={`cofounderLinkedins[${index}]`}
                name={`cofounderLinkedins[${index}]`}
                className="mt-1 p-2 w-full border rounded"
              />
              <ErrorMessage
                name="cofounderLinkedins"
                component="p"
                className="text-red-500 text-sm"
              />
              <label
                htmlFor={`foundingteam_key_role[${index}]`}
                className="block text-sm mt-2"
              >
                what is the title of this founder's role
                <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                id={`foundingteam_key_role[${index}]`}
                name={`foundingteam_key_role[${index}]`}
                className="mt-1 p-2 w-full border rounded"
              />
              <ErrorMessage
                name="foundingteam_key_role"
                component="p"
                className="text-red-500 text-sm"
              />

              <label
                htmlFor={`founderGender[${index}]`}
                className="block text-sm mt-2"
              >
                Cofounder gender?
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
                <label className="mr-4">
                  <Field
                    type="radio"
                    id={`founderGender[${index}]`}
                    name={`founderGender[${index}]`}
                    value="prefer"
                    className="mr-[1px]"
                  />
                  Prefer not to say
                </label>
              </div>

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
                htmlFor={`foundingteam_committment[${index}]`}
                className="block text-sm mt-2"
              >
                Is this founder part time or full time in the business?
                <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <label className="mr-4">
                  <Field
                    type="radio"
                    id={`foundingteam_committment[${index}]`}
                    name={`foundingteam_committment[${index}]`}
                    value="part time"
                    className="mr-[1px]"
                  />
                  Part-time
                </label>
                <label className="mr-4">
                  <Field
                    type="radio"
                    id={`foundingteam_committment[${index}]`}
                    name={`foundingteam_committment[${index}]`}
                    value="full time"
                    className="mr-[1px]"
                  />
                  Full-time
                </label>
              </div>
              <ErrorMessage
                name="foundingteam_committment"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
          ))}

          <div className="mb-4">
            <label htmlFor="foundingteam" className="block text-sm">
              In 100 words, tell us about the uniqueness of your founding team
              that contributes to your business success? (include each
              co-founders' title, role and number of years of experience)
              <span className="text-red-500">*</span>
            </label>
            <Field
              as="textarea"
              id="foundingteam"
              name="foundingteam"
              rows={2}
              className="mt-1 p-2 w-full border rounded"
            />
            <ErrorMessage
              name="foundingteam"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="flex space-x-6">
            <Link
              to="/company_dashboard"
              className="flex bg-[#000D80] justify-center text-white py-2 px-2 rounded-full hover:bg-blue-600 w-full"
            >
              <button className="flex items-center">
                <MdOutlineKeyboardDoubleArrowLeft />
                Dashboard
              </button>
            </Link>
            <button
              type="submit"
              className="flex bg-[#000D80] items-center justify-center text-white py-2 px-2 rounded-full hover:bg-blue-600 w-full"
            >
              Next
              <MdOutlineKeyboardDoubleArrowRight />
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Teamscore1;
