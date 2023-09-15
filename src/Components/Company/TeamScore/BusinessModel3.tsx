/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Formik, Form, Field } from "formik";

interface BusinessModel3Props {
  onSubmit: (values: typeof initialValues) => void;
  initialValues: typeof initialValues;
}
const initialValues = {
  averageRevenue: "",
  customerAcquisition: "",
};

const BusinessModel3: React.FC<BusinessModel3Props> = ({
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
            <label className="block text-sm">
              What is you company's average revenue per user (ARPU) per month -
              looking at the last 3 month average - Month 1, Month 2, Month 3
            </label>
            <div className="mt-1">
              <label htmlFor="averageRevenue.month1" className="mr-2">
                Month 1:
              </label>
              <Field
                type="number"
                id="averageRevenue.month1"
                name="averageRevenue.month1"
                className="p-2 w-full border rounded"
              />
              <label htmlFor="averageRevenue.month2" className="mr-2">
                Month 2:
              </label>
              <Field
                type="number"
                id="averageRevenue.month2"
                name="averageRevenue.month2"
                className="p-2 w-full border rounded"
              />
              <label htmlFor="averageRevenue.month3" className="mr-2">
                Month 3:
              </label>
              <Field
                type="number"
                id="averageRevenue.month3"
                name="averageRevenue.month3"
                className="p-2 w-full border rounded"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm">
              What is you company's customer acquisition cost (CAC) per month -
              looking at the last 3 month average - Month 1, Month 2, Month 3
            </label>
            <div className="mt-1">
              <label htmlFor="customerAcquisition.month1" className="mr-2">
                Month 1:
              </label>
              <Field
                type="number"
                id="customerAcquisition.month1"
                name="customerAcquisition.month1"
                className="p-2 w-full border rounded"
              />
              <label htmlFor="customerAcquisition.month2" className="mr-2">
                Month 2:
              </label>
              <Field
                type="number"
                id="customerAcquisition.month2"
                name="customerAcquisition.month2"
                className="p-2 w-full border rounded"
              />
              <label htmlFor="customerAcquisition.month3" className="mr-2">
                Month 3:
              </label>
              <Field
                type="number"
                id="customerAcquisition.month3"
                name="customerAcquisition.month3"
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

export default BusinessModel3;
