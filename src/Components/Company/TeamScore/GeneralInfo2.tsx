/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { generalSchema2 } from "../formValidate";

interface GeneralInfo2Props {
  onSubmit: (values: typeof initialValues) => void;
  initialValues: typeof initialValues;
}

const initialValues = {
  industry: "",
  mainTechnology: "",
  mainTechnology2: "",
  foundingDate: null,
  companyExplanation: "",
};

const GeneralInfo2: React.FC<GeneralInfo2Props> = ({
  onSubmit,
  initialValues,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={generalSchema2}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <Form
            onSubmit={handleSubmit}
            className="p-8 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px]"
          >
            <div className="mb-4">
              <label htmlFor="industry" className="block text-sm">
                Which industry do you operate in?
                <span className="text-red-500">*</span>
              </label>
              <Field
                as="select"
                id="industry"
                name="industry"
                className="mt-1 p-2 w-full border rounded"
              >
                <option value="">Select Industry</option>
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Retail">Retail</option>
                <option value="Services">Services</option>
                <option value="Energy">Energy</option>
                <option value="Transportation and Logistics">
                  Transportation and Logistics
                </option>
                <option value="Media and Entertainment">
                  Media and Entertainment
                </option>
                <option value="Real Estate and Construction">
                  Real Estate and Construction
                </option>
                <option value="Non-profit/Government">
                  Non-profit/Government
                </option>
              </Field>
              <ErrorMessage
                name="industry"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mainTechnology" className="block text-sm">
                What is your company's main technology?
                <span className="text-red-500">*</span>
              </label>
              <Field
                as="select"
                id="mainTechnology"
                name="mainTechnology"
                className="mt-1 p-2 w-full border rounded"
              >
                <option value="">Select Main Technology</option>
                <option value="Software Development">
                  Software Development
                </option>
                <option value="Information Technology (IT)">
                  Information Technology (IT)
                </option>
                <option value="Hardware/ Electronics">
                  Hardware/ Electronics
                </option>
                <option value="Internet/ E-commerce">
                  Internet/ E-commerce
                </option>
                <option value="Biotechnology">Biotechnology</option>
                <option value="Artificial Intelligence (AI) and Machine Learning">
                  Artificial Intelligence (AI) and Machine Learning
                </option>
                <option value="Blockchain and Cryptocurrency">
                  Blockchain and Cryptocurrency
                </option>
                <option value="Renewable Energy Technology">
                  Renewable Energy Technology
                </option>
                <option value="Green Technology">Green Technology</option>
                <option value="Other">Other (Please specify)</option>
              </Field>
              <ErrorMessage
                name="mainTechnology"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mainTechnology2" className="block text-sm">
                If other, specify the technology
              </label>
              <Field
                type="text"
                id="mainTechnology2"
                name="mainTechnology2"
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="foundingDate" className="block text-sm">
                When was this company founded? (date selection){" "}
                <span className="text-red-500">*</span>
              </label>
              <Field
                type="date"
                id="foundingDate"
                name="foundingDate"
                className="mt-1 p-2 w-full border rounded"
              />
              <ErrorMessage
                name="foundingDate"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="companyExplanation" className="block text-sm">
                In under 100 words, explain why you started this company?{" "}
                <span className="text-red-500">*</span>
              </label>
              <Field
                as="textarea"
                id="companyExplanation"
                name="companyExplanation"
                rows={4}
                className="mt-1 p-2 w-full border rounded"
              />
              <ErrorMessage
                name="companyExplanation"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-[#000D80] text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
            >
              Continue
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GeneralInfo2;
