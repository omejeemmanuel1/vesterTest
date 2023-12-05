/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { Link } from "react-router-dom";

interface GovernanceProps {
  onSubmit: (values: typeof initialValues) => void;
  initialValues: typeof initialValues;
}
export const initialValues = {
  registered: "",
  regulatoryLicence: "",
  boardOfDirector: "",
  boardOfDirector2: "",
};

const validationSchema = Yup.object().shape({
  registered: Yup.string()
    .required("This field is required")
    .oneOf(
      ["fully", "ongoing", "not_registered"],
      "Select a valid registration level"
    ),
  regulatoryLicence: Yup.string().required("This field is required"),
  regulatoryLicence2: Yup.string().required("This field is required"),
  boardOfDirector: Yup.string()
    .required("This field is required")
    .oneOf(["Yes", "No"], "Select a valid option"),
  boardOfDirector2: Yup.string(),
});

const GovernanceScore: React.FC<GovernanceProps> = ({
  onSubmit,
  initialValues,
}) => {
  const initializeFormValues = () => {
    const storedValues = localStorage.getItem("GovernaceFormValues1");
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
    localStorage.setItem("GovernaceFormValues1", JSON.stringify(values));
    onSubmit(values);
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Formik
        initialValues={initialFormValues}
        onSubmit={handleFormSubmit}
        enableReinitialize={true}
        validationSchema={validationSchema}
      >
        {({ values }) => (
          <Form className="p-8 m-6 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px] bg-white md:-mt-[200px]">
            <h2 className="text-[24px] font-semibold">
              How is your company governed?
            </h2>
            <p className="italic text-xs text-red-500 font-thin mb-4">
              * indicates required
            </p>
            <div className="mb-4">
              <label htmlFor="registered" className="block text-sm">
                Are you legally registered in your country of operation?
                <span className="text-red-500">*</span>
              </label>
              {/* <div className="mt-1">
                <label className="mr-2">
                  <Field
                    type="radio"
                    name="registered"
                    value="Yes"
                    className="mr-[1px]"
                  />
                  Yes
                </label>
                <label>
                  <Field
                    type="radio"
                    name="registered"
                    value="No"
                    className="mr-[1px]"
                  />
                  No
                </label>
              </div> */}
              <Field
                as="select"
                id="registered"
                name="registered"
                className="mt-1 p-2 w-full border rounded"
              >
                <option value="">Select your registration level</option>
                <option value="fully">fully</option>
                <option value="ongoing">ongoing</option>
                <option value="not_registered">not_registered</option>
              </Field>
              <ErrorMessage
                name="registered"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor=" regulatoryLicence" className="block text-sm">
                How many regulatory licenses do you need to operate legally?
                <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                id="regulatoryLicence"
                name="regulatoryLicence"
                className="mt-1 p-2 w-full border rounded"
              />
              <ErrorMessage
                name="regulatoryLicence"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="regulatoryLicence2" className="block text-sm">
                If 1 or above, Did you acquire the licenses through acquisiton
                or partnering with a third party?
                <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                id="regulatoryLicence2"
                name="regulatoryLicence2"
                className="mt-1 p-2 w-full border rounded"
              />
              <ErrorMessage
                name="regulatoryLicence2"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="boardOfDirector" className="block text-sm">
                Do you have an official board of directors?
                <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <label className="mr-4">
                  <Field
                    type="radio"
                    id="boardOfDirector"
                    name="boardOfDirector"
                    value="Yes"
                  />
                  Yes
                </label>
                <label className="mr-4">
                  <Field
                    type="radio"
                    id="boardOfDirector"
                    name="boardOfDirector"
                    value="No"
                  />
                  No
                </label>
              </div>
              <ErrorMessage
                name="boardOfDirector"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
            {values.boardOfDirector === "Yes" && (
              <div className="mb-4">
                <label htmlFor="boardOfDirector2" className="block text-sm">
                  If yes, How often does your board meeting?
                  <span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  id="boardOfDirector2"
                  name="boardOfDirector2"
                  className="mt-1 p-2 w-full border rounded"
                />
                <ErrorMessage
                  name="boardOfDirector2"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
            )}

            <div className="flex space-x-6">
              <Link
                to="/company_dashboard"
                className="flex bg-[#031549] justify-center text-white py-2 px-2 rounded-full hover:bg-blue-600 w-full"
              >
                <button className="flex items-center">
                  <MdOutlineKeyboardDoubleArrowLeft />
                  Dashboard
                </button>
              </Link>
              <button
                type="submit"
                className="flex bg-[#031549] items-center justify-center text-white py-2 px-2 rounded-full hover:bg-blue-600 w-full"
              >
                Next
                <MdOutlineKeyboardDoubleArrowRight />
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GovernanceScore;
