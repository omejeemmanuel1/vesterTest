/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { businessSchema } from "./businessValidate";
import { Link } from "react-router-dom";
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";

const productStageOptions = [
  "Launched, gotten customers and revenue, entering new markets",
  "Some paid customers",
  "Launched but no revenue yet",
  "Pilot stage",
  "Prototype/Beta-testing",
];

interface BusinessModelProps {
  onSubmit: (values: typeof initialValues) => void;
}

const initialValues = {
  productStage: "",
  monetization: "",
  businessModels: [],
  current_user_count: {},
  past_user_count: {},
};

const businessModels = [
  { label: "B2B", value: "B2B" },
  { label: "B2C", value: "B2C" },
  { label: "B2B2C", value: "B2B2C" },
  { label: "C2C", value: "C2C" },
  { label: "B2G", value: "B2G" },
];

const saveFormValuesToLocalStorage = (values: any) => {
  localStorage.setItem("businessModelValues", JSON.stringify(values));
};

const loadFormValuesFromLocalStorage = () => {
  const storedValues = localStorage.getItem("businessModelValues");
  if (storedValues) {
    try {
      return JSON.parse(storedValues);
    } catch (error) {
      console.error("Error parsing stored form values:", error);
    }
  }
  return initialValues;
};

const DynamicCurrent_user_count = ({ values }: any) => {
  return (
    <div className="mb-4">
      <label className="block text-sm">
        Number of users for each selected business model:
      </label>
      {values.businessModels.map((model: string) => (
        <div key={model}>
          <label htmlFor={`current_user_count.${model}`} className="block mt-1">
            {model}:
          </label>
          <Field
            type="text"
            id={`current_user_count.${model}`}
            name={`current_user_count.${model}`}
            className="p-2 w-full border rounded"
          />
        </div>
      ))}
    </div>
  );
};

const DynamicPast_user_count = ({ values }: any) => {
  return (
    <div className="mb-4">
      <label className="block text-sm">
        Past user interactions for each selected business model:
      </label>
      {values.businessModels.map((model: string) => (
        <div key={model}>
          <label htmlFor={`past_user_count.${model}`} className="block mt-1">
            {model}:
          </label>
          <Field
            type="text"
            id={`past_user_count.${model}`}
            name={`past_user_count.${model}`}
            className="p-2 w-full border rounded"
          />
        </div>
      ))}
    </div>
  );
};

const BusinessModel: React.FC<BusinessModelProps> = ({ onSubmit }) => {
  const initialFormValues = loadFormValuesFromLocalStorage();

  useEffect(() => {
    saveFormValuesToLocalStorage(initialFormValues);
  }, [initialFormValues]);

  return (
    <div className="min-h-screen flex items-center justify-center md:-mt-6">
      <Formik
        initialValues={initialFormValues}
        onSubmit={(values) => {
          saveFormValuesToLocalStorage(values);
          onSubmit(values);
        }}
        validationSchema={businessSchema}
      >
        {({ values }) => (
          <Form className="m-6 p-8 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px] bg-white">
            <h2 className="text-[24px] font-semibold">
              How does your business operate?
            </h2>
            <p className="italic text-xs text-red-500 font-thin mb-4">
              * indicates required
            </p>

            <div className="mb-4">
              <label htmlFor="productStage" className="block text-sm">
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
              <label htmlFor="revenue" className="block text-sm">
                what % of your revenue is coming from your core business or
                product? <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                id="monetization"
                name="monetization"
                className="mt-1 p-2 w-full border rounded"
              />
              <ErrorMessage
                name="monetization"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm">
                What is your business model(s)? (You can select multiple)
                <span className="text-red-500">*</span>
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

            {values.businessModels.length > 0 && (
              <DynamicCurrent_user_count values={values} />
            )}

            {values.businessModels.length > 0 && (
              <DynamicPast_user_count values={values} />
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

export default BusinessModel;
