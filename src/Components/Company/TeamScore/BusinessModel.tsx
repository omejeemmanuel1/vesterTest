/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { businessSchema } from "../formValidate";

const productStageOptions = [
  "Concept/Idea",
  "Prototype",
  "Development",
  "Testing",
  "Launch",
  "Post-launch",
  "Other",
];

interface BusinessModelProps {
  onSubmit: (values: typeof initialValues) => void;
}
const initialValues = {
  productStage: "",
  businessModels: [],
  userCounts: {},
};

const businessModels = [
  { label: "B2B", value: "B2B" },
  { label: "B2C", value: "B2C" },
  { label: "B2B2C", value: "B2B2C" },
  { label: "C2C", value: "C2C" },
  { label: "B2G", value: "B2G" },
];

const DynamicUserCounts = ({ values }: any) => {
  return (
    <div className="mb-4">
      <label className="block text-sm text-[#0A0A3F]">
        Number of users for each selected business model:
      </label>
      {values.businessModels.map((model: string) => (
        <div key={model}>
          <label htmlFor={`userCounts.${model}`} className="block mt-1">
            {model}:
          </label>
          <Field
            type="number"
            id={`userCounts.${model}`}
            name={`userCounts.${model}`}
            className="p-2 w-full border rounded"
          />
        </div>
      ))}
    </div>
  );
};

const BusinessModel: React.FC<BusinessModelProps> = ({ onSubmit }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={businessSchema}
      >
        {({ values }) => (
          <Form className="bg-white p-8 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px]">
            <h2 className="text-[26px] font-semibold mb-4 text-[#0A0A3F]">
              Understanding your Business Model
            </h2>
            <div className="mb-4">
              <label
                htmlFor="productStage"
                className="block text-sm text-[#0A0A3F]"
              >
                What is your product status/stage?
                <span className="text-red-500">*</span>
              </label>
              <Field
                as="select"
                id="productStage"
                name="productStage"
                className="mt-1 p-2 w-full border rounded"
              >
                <option value="">Select Product Stage</option>
                {productStageOptions.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="productStage"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-[#0A0A3F]">
                What is your business model(s)?
              </label>
              <div className="mt-1">
                {businessModels.map((model) => (
                  <label key={model.value} className="mr-2">
                    <Field
                      type="checkbox"
                      name="businessModels"
                      value={model.value}
                    />
                    {model.label}
                  </label>
                ))}
              </div>
              <ErrorMessage
                name="businessModels"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Dynamic User Count Fields */}
            {values.businessModels.length > 0 && (
              <DynamicUserCounts values={values} />
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

export default BusinessModel;