/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Formik, Form, Field } from "formik";
// import { financialSchema } from "../formValidate";

interface FinancialScoreProps {
  onSubmit: (values: typeof initialValues) => void;
  initialValues: typeof initialValues;
}

const initialValues = {
  monthlyGross: "",
  startupRunway: "",
  currentBurnRate: "",
};

const FinancialScore: React.FC<FinancialScoreProps> = ({ onSubmit, initialValues }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        <Form className="p-8 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px]">
          <h2 className="text-[32px] font-semibold mb-4">
            Financial Score
          </h2>
          <div className="mb-4">
            <label className="block text-sm">
              What is your monthly gross margin from the last 3 individual
              months - Month 1, Month 2, Month 3?
            </label>
            <div className="mt-1">
              <label htmlFor="customerAcquisition.month1" className="mr-2">
                Month 1:
              </label>
              <Field
                type="num"
                id="monthlyGross.month1"
                name="monthlyGross.month1"
                className="p-2 w-full border rounded"
              />

              <label htmlFor="monthlyGross.month2" className="mr-2">
                Month 2:
              </label>
              <Field
                type="text"
                id="monthlyGross.month2"
                name="monthlyGross.month2"
                className="p-2 w-full border rounded"
              />

              <label htmlFor="monthlyGross.month3" className="mr-2">
                Month 3:
              </label>
              <Field
                type="text"
                id="monthlyGross.month3"
                name="monthlyGross.month3"
                className="p-2 w-full border rounded"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="startupRunway"
              className="block text-sm"
            >
              What is your current startup runway? In months
            </label>
            <Field
              type="text"
              id="startupRunway"
              name="startupRunway"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="currentBurnRate"
              className="block text-sm"
            >
              What is your current burn rate?
            </label>
            <Field
              type="text"
              id="currentBurnRate"
              name="currentBurnRate"
              className="mt-1 p-2 w-full border rounded"
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

export default FinancialScore;
