/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { Link } from "react-router-dom";

const initialValues = {
  moneyRaise: "",
  valuation: "",
  totalFundingRaised: "",
  revenueStatus: "",
};

interface FinancialScoreProps {
  onSubmit: (values: typeof initialValues) => void;
}

const saveFormValuesToLocalStorage = (values: any) => {
  localStorage.setItem("financialScoreValues", JSON.stringify(values));
};

const loadFormValuesFromLocalStorage = () => {
  const storedValues = localStorage.getItem("financialScoreValues");
  if (storedValues) {
    try {
      return JSON.parse(storedValues);
    } catch (error) {
      console.error("Error parsing stored form values:", error);
    }
  }
  return initialValues;
};

const FinancialScore: React.FC<FinancialScoreProps> = ({ onSubmit }) => {
  const initialFormValues = loadFormValuesFromLocalStorage();

  useEffect(() => {
    saveFormValuesToLocalStorage(initialFormValues);
  }, [initialFormValues]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Formik
        initialValues={initialFormValues}
        onSubmit={(values) => {
          saveFormValuesToLocalStorage(values);
          onSubmit(values);
        }}
        enableReinitialize={true}
      >
        <Form className="p-8 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px] bg-white md:-mt-[100px]">
          <h2 className="text-[24xpx] font-semibold">
            Tell us about your financials
          </h2>{" "}
          <p className="italic text-xs text-red-500 font-thin mb-4">
            * indicates required
          </p>
          <div className="mb-4">
            <label htmlFor="moneyRaise" className="block text-sm">
              How much are you currently trying to raise?
            </label>
            <Field
              type="text"
              id="moneyRaise"
              name="moneyRaise"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="valuation" className="block text-sm">
              What is your valuation?
            </label>
            <Field
              type="text"
              id="valuation"
              name="valuation"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="totalFundingRaised" className="block text-sm">
              Since it was founded, how much funding has your startup raised?
            </label>
            <Field
              type="text"
              id="totalFundingRaised"
              name="totalFundingRaised"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="revenueStatus" className="block text-sm">
              What is your current revenue status?
            </label>
            <Field
              as="select"
              id="revenueStatus"
              name="revenueStatus"
              className="mt-1 p-2 w-full border rounded"
            >
              <option value="">Select Revenue Status</option>
              <option value="started">Started generating revenue</option>
              <option value="customers_trying_but_no_revenue">
                Have potential customers trying the product but yet to close
              </option>
              <option value="no_trial_no_revenue">
                Not generating revenue yet and no customers in the pipeline
              </option>
            </Field>
          </div>
          <div className="flex space-x-6">
            <Link
              to="/company_dashboard"
              className="flex bg-[#031549] justify-center text-white py-2 px-2 rounded-full hover-bg-blue-600 w-full"
            >
              <button className="flex items-center">
                <MdOutlineKeyboardDoubleArrowLeft />
                Dashboard
              </button>
            </Link>
            <button
              type="submit"
              className="flex bg-[#031549] items-center justify-center text-white py-2 px-2 rounded-full hover-bg-blue-600 w-full"
            >
              Next
              <MdOutlineKeyboardDoubleArrowRight />
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default FinancialScore;
