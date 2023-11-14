/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { teamscoreSchema2 } from "./teamValidate";

interface Teamscore2Props {
  onSubmit: (values: typeof initialValues) => void;

  isSubmitting: boolean;
  handleBack: () => void;
}

const initialValues = {
  cLevelExec: "",
  cLevelLinkedin: "",
  clevelteam_key_role: "",
  execGender: "",
  clevel_committment: "",
  clevelteam: "",
  otherEmployee: "",
  otherEmployee2: "",
  employeeGender: "",
};

const Teamscore2: React.FC<Teamscore2Props & { step: number }> = ({
  onSubmit,
  isSubmitting,
  handleBack,
  step,
}) => {
  const [hasCLevelExecs, setHasCLevelExecs] = useState<boolean>(false);
  const [hasOtherEmployees, setHasOtherEmployees] = useState<boolean>(false);

  const initializeFormValues = () => {
    const storedValues = localStorage.getItem("teamscore3Values");
    if (storedValues) {
      try {
        return JSON.parse(storedValues);
      } catch (error) {
        console.error("Error parsing stored form values:", error);
      }
    }
    return initialValues;
  };

  const initialFormValues = initializeFormValues();

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasOtherEmployees(e.target.value === "yes");
  };

  const handleFormSubmit = (values: any) => {
    localStorage.setItem("teamscore3Values", JSON.stringify(values));
    onSubmit(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center md:-mt-4">
      {isSubmitting && (
        <div className="fixed inset-0 flex items-center justify-center space-x-4">
          <div className="absolute inset-0 bg-black opacity-80"></div>
          <div className="w-24 h-24 border-t-4 border-blue-400 border-solid rounded-full animate-spin z-10"></div>
          <p className="z-50 text-white">
            Please wait while your data is being processed...
          </p>
        </div>
      )}
      <Formik
        initialValues={initialFormValues}
        onSubmit={handleFormSubmit}
        enableReinitialize={true}
        validationSchema={teamscoreSchema2}
      >
        <Form className="m-6 p-8 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px] bg-white">
          <div className="mb-4">
            <label htmlFor="cLevelExec" className="block text-sm">
              Do you have any C-Level Execs that are non-founders?{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <label className="mr-2">
                <input
                  type="radio"
                  name="cLevelExec"
                  value="yes"
                  onChange={() => setHasCLevelExecs(true)}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="cLevelExec"
                  value="no"
                  onChange={() => setHasCLevelExecs(false)}
                />
                No
              </label>
            </div>
            {/* <ErrorMessage
              name="cLevelExec"
              component="p"
              className="text-red-500 text-sm"
            /> */}
          </div>

          {hasCLevelExecs && (
            <div className="mb-4">
              <label htmlFor="cLevelLinkedin" className="block text-sm">
                C-level linkedin<span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                id="cLevelLinkedin"
                name="cLevelLinkedin"
                className="mt-1 p-2 w-full border rounded"
              />
              <ErrorMessage
                name="cLevelLinkedin"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
          )}

          {hasCLevelExecs && (
            <div className="mb-4">
              <label htmlFor="clevelteam_key_role" className="block text-sm">
                What is their role in the business?{" "}
                <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                id="clevelteam_key_role"
                name="clevelteam_key_role"
                className="mt-1 p-2 w-full border rounded"
              />
              <ErrorMessage
                name="clevelteam_key_role"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
          )}

          {hasCLevelExecs && (
            <div className="mb-4">
              <label htmlFor="execGender" className="block text-sm">
                Is this Exec male or female?{" "}
              </label>
              <div className="mt-1">
                <label className="mr-2">
                  <Field
                    type="radio"
                    name="execGender"
                    value="male"
                    className="mr-[1px]"
                  />
                  Male
                </label>
                <label>
                  <Field
                    type="radio"
                    name="execGender"
                    value="female"
                    className="mr-[1px]"
                  />
                  Female
                </label>
              </div>
            </div>
          )}

          {hasCLevelExecs && (
            <div className="mb-4">
              <label htmlFor="clevel_committment" className="block text-sm">
                Is the Exec part time or full time in the business?{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <label className="mr-2">
                  <Field
                    type="radio"
                    name="clevel_committment"
                    value="part time"
                    className="mr-[1px]"
                  />
                  Part time
                </label>
                <label>
                  <Field
                    type="radio"
                    name="clevel_committment"
                    value="full time"
                    className="mr-[1px]"
                  />
                  Full time
                </label>
              </div>
              <ErrorMessage
                name="clevel_committment"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="clevelteam" className="block text-sm">
              In 100 words, tell us about the role of this executive in your
              startup (include their title, what they do and number of years of
              experience)
              <span className="text-red-500">*</span>
            </label>
            <Field
              as="textarea"
              id="clevelteam"
              name="clevelteam"
              rows={2}
              className="mt-1 p-2 w-full border rounded"
            />
            <ErrorMessage
              name="clevelteam"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="otherEmployee" className="block text-sm">
              Do you have any other employees?
            </label>
            <div className="mt-1">
              <label className="mr-2">
                <input
                  type="radio"
                  name="otherEmployee"
                  value="yes"
                  className="mr-[1px]"
                  onChange={handleRadioChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="otherEmployee"
                  value="no"
                  className="mr-[1px]"
                  onChange={handleRadioChange}
                />
                No
              </label>
            </div>
          </div>

          {hasOtherEmployees && (
            <div className="mb-4">
              <label htmlFor="otherEmployee2" className="block text-sm">
                If yes, how many other employees do you have?
              </label>
              <Field
                type="text"
                id="otherEmployee2"
                name="otherEmployee2"
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
          )}

          {hasOtherEmployees && (
            <div className="mb-4">
              <label htmlFor="employeeGender" className="block text-sm">
                What's the gender split of your employees? Male: x% ; Female: y%
              </label>
              <Field
                type="text"
                id="employeeGender"
                name="employeeGender"
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
          )}

          <div className="flex space-x-6">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="flex bg-[#000D80] items-center justify-center text-white py-2 px-2 rounded-full hover:bg-blue-600 w-full"
              >
                <MdOutlineKeyboardDoubleArrowLeft />
                Previous
              </button>
            )}
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

export default Teamscore2;
