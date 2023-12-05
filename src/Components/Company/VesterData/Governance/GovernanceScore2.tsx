/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import * as Yup from "yup";

interface GovernanceProps2 {
  onSubmit: (values: typeof initialValues) => void;
  handleBack: () => void;
}
export const initialValues = {
  advisors: "",
  advisors2: "",
  investorFunding: "",
  directorsAvailable: "",
  pendingThreat: "",
  registeredLicense: "",
};

const validationSchema2 = Yup.object().shape({
  advisors: Yup.string()
    .required("This field is required")
    .oneOf(["Yes", "No"], "Select a valid option"),
  advisors2: Yup.string(),
  investorFunding: Yup.string().required("This field is required"),
  directorsAvailable: Yup.string()
    .required("This field is required")
    .oneOf(["Yes", "No"], "Select a valid option"),
  pendingThreat: Yup.string().required("This field is required"),
  registeredLicense: Yup.string().required("This field is required"),
});

const GovernanceScore2: React.FC<GovernanceProps2 & { step: number }> = ({
  onSubmit,
  handleBack,
  step,
}) => {
  const initializeFormValues = () => {
    const storedValues = localStorage.getItem("GovernaceFormValues2");
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

  const handleFormSubmit = (values: any) => {
    localStorage.setItem("GovernaceFormValues2", JSON.stringify(values));
    onSubmit(values);
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Formik
        initialValues={initialFormValues}
        onSubmit={handleFormSubmit}
        enableReinitialize={true}
        validationSchema={validationSchema2}
      >
        {({ values }) => (
          <Form className="p-8 m-6 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px] bg-white md:-mt-[200px]">
            <div className="mb-4">
              <label htmlFor="advisors" className="block text-sm">
                Do you have a team of advisors?{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <label className="mr-4">
                  <Field
                    type="radio"
                    id="advisors"
                    name="advisors"
                    value="Yes"
                  />
                  Yes
                </label>
                <label className="mr-4">
                  <Field
                    type="radio"
                    id="advisors"
                    name="advisors"
                    value="No"
                  />
                  No
                </label>
              </div>
              <ErrorMessage
                name="advisors"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
            {values.advisors === "Yes" && (
              <div className="mb-4">
                <label htmlFor="advisors2" className="block text-sm">
                  If yes, How often do you meet with your advisers?
                  <span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  id="advisors2"
                  name="advisors2"
                  className="mt-1 p-2 w-full border rounded"
                />
                <ErrorMessage
                  name="advisors2"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
            )}
            <div className="mb-4">
              <label htmlFor=" investorFunding" className="block text-sm">
                If you've raised funding, who are your investors?
                <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                id="investorFunding"
                name="investorFunding"
                className="mt-1 p-2 w-full border rounded"
              />
              <ErrorMessage
                name="investorFunding"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="directorsAvailable" className="block text-sm">
                Are there directors , investors or founders PEPs?
                <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <label className="mr-4">
                  <Field
                    type="radio"
                    id="directorsAvailable"
                    name="directorsAvailable"
                    value="Yes"
                  />
                  Yes
                </label>
                <label className="mr-4">
                  <Field
                    type="radio"
                    id="directorsAvailable"
                    name="directorsAvailable"
                    value="No"
                  />
                  No
                </label>
              </div>
              <ErrorMessage
                name="directorsAvailable"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="pendingThreat" className="block text-sm">
                Pending or threatened disputes, investigations and litigation
                <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                id="pendingThreat"
                name="pendingThreat"
                className="mt-1 p-2 w-full border rounded"
              />
              <ErrorMessage
                name="pendingThreat"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="registeredLicense" className="block text-sm">
                Registered/Licensed any priorietary IP ( patent, copyright or
                trademark) used<span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                id="registeredLicense"
                name="registeredLicense"
                className="mt-1 p-2 w-full border rounded"
              />
              <ErrorMessage
                name="registeredLicense"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex space-x-6">
              {step > 1 && (
                <button
                  onClick={handleBack}
                  className="flex bg-[#031549] items-center justify-center text-white py-2 px-2 rounded-full hover:bg-blue-600 w-full"
                >
                  <MdOutlineKeyboardDoubleArrowLeft />
                  Previous
                </button>
              )}
              <button
                type="submit"
                className="flex bg-[#031549] items-center justify-center text-white py-2 px-2 rounded-full hover:bg-blue-600 w-full"
              >
                Submit form
                <MdOutlineKeyboardDoubleArrowRight />
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GovernanceScore2;
