/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Formik, Form, Field } from "formik";

interface BusinessModel2Props {
  onSubmit: (values: typeof initialValues) => void;
  initialValues: typeof initialValues;
}
const initialValues = {
  revenuePercentage: "",
  newUsersLast3Months: "",
  loseUsersLast3Months: "",
};

const BusinessModel2: React.FC<BusinessModel2Props> = ({
  onSubmit,
  initialValues,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        <Form className="p-8 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px]">
          <div className="mb-4">
            <label htmlFor="revenue" className="block text-sm">
              what % of your revenue is coming from your core business or
              product?
            </label>
            <Field
              type="text"
              id="revenuePercentage"
              name="revenuePercentage"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          {/* New Users in Last 3 Months */}
          <div className="mb-4">
            <label className="block text-sm">
              Number of new users acquired in the last 3 months (Month 1, Month
              2, Month 3):
            </label>
            <div className="mt-1">
              <label htmlFor="newUsersLast3Months.month1" className="mr-2">
                Month 1:
              </label>
              <Field
                type="number"
                id="newUsersLast3Months.month1"
                name="newUsersLast3Months.month1"
                className="p-2 w-full border rounded"
              />
              <label htmlFor="newUsersLast3Months.month2" className="mr-2">
                Month 2:
              </label>
              <Field
                type="number"
                id="newUsersLast3Months.month2"
                name="newUsersLast3Months.month2"
                className="p-2 w-full border rounded"
              />
              <label htmlFor="newUsersLast3Months.month3" className="mr-2">
                Month 3:
              </label>
              <Field
                type="number"
                id="newUsersLast3Months.month3"
                name="newUsersLast3Months.month3"
                className="p-2 w-full border rounded"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm">
              How many users did you lose in the last 3 month (Month 1, Month 2,
              Month 3):
            </label>
            <div className="mt-1">
              <label htmlFor="loseUsersLast3Months.month1" className="mr-2">
                Month 1:
              </label>
              <Field
                type="number"
                id="loseUsersLast3Months.month1"
                name="loseUsersLast3Months.month1"
                className="p-2 w-full border rounded"
              />
              <label htmlFor="loseUsersLast3Months.month2" className="mr-2">
                Month 2:
              </label>
              <Field
                type="number"
                id="loseUsersLast3Months.month2"
                name="loseUsersLast3Months.month2"
                className="p-2 w-full border rounded"
              />
              <label htmlFor="loseUsersLast3Months.month3" className="mr-2">
                Month 3:
              </label>
              <Field
                type="number"
                id="loseUsersLast3Months.month3"
                name="loseUsersLast3Months.month3"
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

export default BusinessModel2;
