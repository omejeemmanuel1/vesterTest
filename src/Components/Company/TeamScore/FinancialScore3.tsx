/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Formik, Form, Field } from "formik";

interface FinancialScore3Props {
  onSubmit: (values: typeof initialValues) => void;
  initialValues: typeof initialValues;
}

const initialValues = {
  lastFunding: "",
  totalFundingRaised: "",
};

const FinancialScore3: React.FC<FinancialScore3Props> = ({
  onSubmit,
  initialValues,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        <Form className="p-8 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px]">
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
            <label htmlFor="totalFundingRaised" className="block text-sm">
              How much did you raise? and what valuation?
            </label>
            <Field
              type="text"
              id="totalFundingRaised"
              name="totalFundingRaised"
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

export default FinancialScore3;
