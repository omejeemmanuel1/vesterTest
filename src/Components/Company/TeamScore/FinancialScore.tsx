/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { financialSchema } from "../formValidate";

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

interface FinancialScoreProps {
  onSubmit: (values: typeof initialValues) => void;
  initialValues: typeof initialValues;
}

const initialValues = {
  fundingStage: "",
  moneyRaise: "",
  totalFundingRaised: "",
  monthlyGross: "",
};


const FinancialScore: React.FC<FinancialScoreProps> = ({
  onSubmit,
  initialValues,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
        validationSchema={financialSchema}
      >
        <Form className="m-6 p-8 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px]">
          <h2 className="text-[32px] font-semibold mb-4">Financial Score</h2>
          <div className="mb-4">
            <label htmlFor="fundingStage" className="block text-sm">
              What is your product status/stage?
              <span className="text-red-500">*</span>
            </label>
            <Field
              as="select"
              id="fundingStage"
              name="fundingStage"
              className="mt-1 p-2 w-full border rounded"
            >
              <option value="">Select Product Stage</option>
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

          <div className="mb-4">
            <label htmlFor="moneyRaise" className="block text-sm">
              How much are you currently trying to raise?($)
            </label>
            <Field
              type="text"
              id="moneyRaise"
              name="moneyRaise"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="totalFundingRaised" className="block text-sm">
              What is your company valuation? ($)
            </label>
            <Field
              type="text"
              id="totalFundingRaise"
              name="totalFundingRaised"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm">
              What is your monthly gross margin from the last 3 individual
              months - Month 1, Month 2, Month 3?
            </label>
            <div className="mt-1">
              <label htmlFor="monthlyGross.month1" className="mr-2">
                Month 1 ($):
              </label>
              <Field
                type="num"
                id="monthlyGross.month1"
                name="monthlyGross.month1"
                className="p-2 w-full border rounded"
              />

              <label htmlFor="monthlyGross.month2" className="mr-2">
                Month 2 ($):
              </label>
              <Field
                type="text"
                id="monthlyGross.month2"
                name="monthlyGross.month2"
                className="p-2 w-full border rounded"
              />

              <label htmlFor="monthlyGross.month3" className="mr-2">
                Month 3 ($):
              </label>
              <Field
                type="text"
                id="monthlyGross.month3"
                name="monthlyGross.month3"
                className="p-2 w-full border rounded"
              />
            </div>
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
