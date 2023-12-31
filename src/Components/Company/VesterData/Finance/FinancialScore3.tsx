/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Formik, Form, Field } from "formik";

import {
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";

interface FinancialScore3Props {
  onSubmit: (values: typeof initialValues) => void;
  initialValues: typeof initialValues;
  handleBack: () => void;
}

const initialValues = {
  lastFunding: "",
  startupRunway: "",
  currentRevenue: "",
  averageRevenue: "",
  customerAcquisition: "",
  currentBurnRate: "",
};

const FinancialScore3: React.FC<FinancialScore3Props & { step: number }> = ({
  onSubmit,
  initialValues,
  handleBack,
  step,
}) => {
  const initializeFormValues = () => {
    const storedValues = localStorage.getItem("FinancialFormValues3");
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
    localStorage.setItem("FinancialFormValues3", JSON.stringify(values));
    onSubmit(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Formik
        initialValues={initialFormValues}
        onSubmit={handleFormSubmit}
        enableReinitialize={true}
      >
        <Form className="p-8 m-6 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px] bg-white md:-mt-[50px]">
          <div className="mb-4">
            <label htmlFor="lastFunding" className="block text-sm">
              When did you close your last funding round?
            </label>
            <Field
              type="text"
              id="lastFunding"
              name="lastFunding"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="currentRevenue" className="block text-sm">
              What is your current average revenue per user (ARPU) each month?
            </label>
            <Field
              type="text"
              id="currentRevenue"
              name="currentRevenue"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="averageRevenue" className="block text-sm">
              What was your average revenue as of this time last year (or from
              Month 1 after inception, if less than a year)
            </label>
            <Field
              type="text"
              id="averageRevenue"
              name="averageRevenue"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="customerAcquisition" className="block text-sm">
              What is you company's customer acquisition cost (CAC)
            </label>
            <Field
              type="text"
              id="customerAcquisition"
              name="customerAcquisition"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="currentBurnRate" className="block text-sm">
              What is your current burn rate? ($)
            </label>
            <Field
              type="text"
              id="currentBurnRate"
              name="currentBurnRate"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="startupRunway" className="block text-sm">
              What is your current startup runway? In months($)
            </label>
            <Field
              type="text"
              id="startupRunway"
              name="startupRunway"
              className="mt-1 p-2 w-full border rounded"
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
      </Formik>
    </div>
  );
};

export default FinancialScore3;
