/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { businessSchema2 } from "./businessValidate";

interface BusinessModel2Props {
  onSubmit: (values: typeof initialValues) => void;
  initialValues: typeof initialValues;
  handleBack: () => void;
}

const initialValues = {
  numberUsersGrowth: "",
  percentagePaidUsers: "",
  location_served: "",
  traction: "",
};

const saveFormValuesToLocalStorage = (values: any) => {
  localStorage.setItem("businessModel2Values", JSON.stringify(values));
};

const loadFormValuesFromLocalStorage = () => {
  const storedValues = localStorage.getItem("businessModel2Values");
  if (storedValues) {
    try {
      return JSON.parse(storedValues);
    } catch (error) {
      console.error("Error parsing stored form values:", error);
    }
  }
  return initialValues;
};

const BusinessModel2: React.FC<BusinessModel2Props & { step: number }> = ({
  onSubmit,
  initialValues,
  handleBack,
  step,
}) => {
  const initialFormValues = loadFormValuesFromLocalStorage();

  useEffect(() => {
    saveFormValuesToLocalStorage(initialFormValues);
  }, [initialFormValues]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={onSubmit}
        validationSchema={businessSchema2}
      >
        <Form className="m-6 p-8 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px] bg-white">
          <div className="mb-4">
            <label htmlFor="numberUsersGrowth" className="block text-sm">
              Number of users/customers as of this time last year (year on year
              growth) <span className="text-red-500">*</span>
            </label>
            <Field
              type="text"
              id="numberUsersGrowth"
              name="numberUsersGrowth"
              className="mt-1 p-2 w-full border rounded"
            />
            <ErrorMessage
              name="numberUsersGrowth"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="percentagePaidUsers" className="block text-sm">
              What percentage of users are paid users?
              <span className="text-red-500">*</span>
            </label>
            <Field
              as="select"
              id="percentagePaidUsers"
              name="percentagePaidUsers"
              className="mt-1 p-2 w-full border rounded"
            >
              <option value="">Select percentage of paid users</option>
              <option value="0-20%">0-20%</option>
              <option value="21-40%">21-40%</option>
              <option value="41-60%">41-60%</option>
              <option value="$61-80%">61-80%</option>
              <option value="$81-100%">81-100%</option>
            </Field>
            <ErrorMessage
              name="percentagePaidUsers"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location_served" className="block text-sm">
              Tell us about the locations of your users/customers (Number of
              countries: x; Number of states across all countries: y)
              <span className="text-red-500">*</span>
            </label>
            <Field
              as="textarea"
              id="location_served"
              name="location_served"
              rows={2}
              className="mt-1 p-2 w-full border rounded"
            />
            <ErrorMessage
              name="location_served"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="traction" className="block text-sm">
              In 100 words, share with us anything else you think we should know
              about your traction so far
              <span className="text-red-500">*</span>
            </label>
            <Field
              as="textarea"
              id="traction"
              name="traction"
              rows={2}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
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
              Submit form
              <MdOutlineKeyboardDoubleArrowRight />
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default BusinessModel2;
