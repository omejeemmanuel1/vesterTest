/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Formik, Form, Field } from "formik";

const fundingSourceOptions = [
  "Venture Capital",
  "Angel Investors",
  "Bank Loans",
  "Grants",
  "Crowdfunding",
  "Corporate Investments",
  "Bootstrapped",
];

interface FinancialScore2Props {
  onSubmit: (values: typeof initialValues) => void;
}

const initialValues: {
  fundingSources: string[];
  fundingAmounts: Record<string, string>;
} = {
  fundingSources: [],
  fundingAmounts: {},
};

const FinancialScore2: React.FC<FinancialScore2Props> = ({ onSubmit }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values }) => (
          <Form className="bg-white p-8 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px]">
            {/* Funding Sources */}
            <div className="mb-4">
              <label className="block text-sm text-[#0A0A3F]">
                Which of the following sources has your company raised funding
                from?
              </label>
              <div className="mt-1">
                {fundingSourceOptions.map((source) => (
                  <label key={source} className="mr-2">
                    <Field
                      type="checkbox"
                      name="fundingSources"
                      className="mr-[1px]"
                      value={source}
                    />
                    {source}
                  </label>
                ))}
              </div>
            </div>

            {/* Funding Amounts */}
            {values.fundingSources.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm text-[#0A0A3F]">
                  Since it was founded, how much funding has your startup raised
                  for each selected source?
                </label>
                {values.fundingSources.map((source) => (
                  <div key={source}>
                    <label
                      htmlFor={`fundingAmounts.${source}`}
                      className="block mt-1"
                    >
                      {source}:
                    </label>
                    <Field
                      type="text"
                      id={`fundingAmounts.${source}`}
                      name={`fundingAmounts.${source}`}
                      className="p-2 w-full border rounded"
                    />
                  </div>
                ))}
              </div>
            )}

            <button
              type="submit"
              className="bg-[#000D80] text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
            >
              Next
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FinancialScore2;