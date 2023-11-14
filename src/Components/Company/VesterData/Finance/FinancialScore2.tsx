import React from "react";
import { Formik, Form, Field } from "formik";
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";

const fundingSourceOptions = [
  "Venture Capital",
  "Angel Investors",
  "Loans",
  "Grant - Government",
  "Grant - NGO",
  "Grant - Incubators and accelerators",
  "Equity - Incubators and accelerators",
  "Crowdfunding",
  "Corporate Venture Capital",
  "Personal funds",
];

interface FinancialScore2Props {
  onSubmit: (values: typeof initialValues) => void;
  handleBack: () => void;
}

const initialValues: {
  fundingSources: string[];
  fundingAmounts: Record<string, string>;
} = {
  fundingSources: [],
  fundingAmounts: {},
};

const FinancialScore2: React.FC<FinancialScore2Props & { step: number }> = ({
  onSubmit,
  handleBack,
  step,
}) => {
  const initializeFormValues = () => {
    const storedValues = localStorage.getItem("financialScore2Values");
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

  return (
    <div className="min-h-screen flex items-center justify-center mt-5 overflow-scroll">
      <Formik
        initialValues={initialFormValues}
        onSubmit={(values) => {
          localStorage.setItem("financialScore2Values", JSON.stringify(values));
          onSubmit(values);
        }}
      >
        {({ values }) => (
          <Form className="m-6 p-8 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px] bg-white">
            <div className="mb-4">
              <label className="block text-sm">
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

            {values.fundingSources.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm">
                  Since it was founded, how much funding has your startup raised
                  for each selected source?
                </label>
                {values.fundingSources.map((source: string) => (
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

export default FinancialScore2;