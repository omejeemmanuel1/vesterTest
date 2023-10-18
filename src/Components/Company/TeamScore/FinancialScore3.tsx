/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { financialSchema3 } from "../formValidate";


interface FinancialScore3Props {
  onSubmit: (values: typeof initialValues) => void;
  initialValues: typeof initialValues;
}

const initialValues = {
  lastFunding: "",
  startupRunway: "",
  currentBurnRate: "",
  revenueStatus: "",
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
        validationSchema={financialSchema3}
      >
        <Form className="m-6 p-8 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px]">
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
            <label htmlFor="startupRunway" className="block text-sm">
              What is your current startup runway? In months($)
            </label>
            <Field
              type="text"
              id="startupRunway"
              name="startupRunway"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="currentBurnRate" className="block text-sm">
              What is your current burn rate? ($)
            </label>
            <Field
              type="text"
              id="currentBurnRate"
              name="currentBurnRate"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="mainTechnology" className="block text-sm">
              What is your current revenue status?
              <span className="text-red-500">*</span>
            </label>
            <Field
              as="select"
              id="revenueStatus"
              name="revenueStatus"
              className="mt-1 p-2 w-full border rounded"
            >
              <option value="">Select Revenue Status</option>
              <option value="started">started</option>
              <option value="customers_trying_but_no_revenue">
                {" "}
                customers_trying_but_no_revenue
              </option>
              <option value="no_trial_no_revenue">no_trial_no_revenue</option>
            </Field>
            <ErrorMessage
              name="revenueStatus"
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

export default FinancialScore3;
