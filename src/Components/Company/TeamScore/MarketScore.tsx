/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { marketscoreSchema } from "../formValidate";

interface MarketScoreProps {
  onSubmit: (values: typeof initialValues) => void;
}
const initialValues = {
  problemSolved: "",
  geoPeople: "",
  payTimes: "",
  problemCost: "",
};

const MarketScore: React.FC<MarketScoreProps> = ({ onSubmit }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Formik
        initialValues={initialValues}
        validationSchema={marketscoreSchema}
        onSubmit={onSubmit}
      >
        <Form className="bg-white p-8 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px]">
          <h2 className="text-[32px] font-semibold mb-4 text-[#0A0A3F]">
            Market Score
          </h2>
          <div className="mb-4">
            <label
              htmlFor="problemFaced"
              className="block text-sm text-[#0A0A3F]"
            >
              What problem are you solving?
              <span className="text-red-500">*</span>
            </label>
            <Field
              type="text"
              id="problemSolved"
              name="problemSolved"
              className="mt-1 p-2 w-full border rounded"
            />
            <ErrorMessage
              name="problemSolved"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="geopeople" className="block text-sm text-[#0A0A3F]">
              How many people in your geographical focus face this problem that
              you are solving
            </label>
            <Field
              type="text"
              id="geoPeople"
              name="geoPeople"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="payTimes" className="block text-sm text-[#0A0A3F]">
              How many times do they pay to solve this problem per year?
            </label>
            <Field
              type="text"
              id="payTimes"
              name="payTimes"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="problemCost"
              className="block text-sm text-[#0A0A3F]"
            >
              What is the cost to solve the problem each time? in dollars?
              <span className="text-red-500">*</span>
            </label>
            <Field
              type="text"
              id="problemCost"
              name="problemCost"
              className="mt-1 p-2 w-full border rounded"
            />
            <ErrorMessage
              name="problemCost"
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

export default MarketScore;
