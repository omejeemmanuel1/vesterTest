/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

interface Teamscore3Props {
  onSubmit: (values: typeof initialValues) => void;
}

const initialValues = {
  cLevelNoneFounders: "",
  cLevelLinkedin: "",
  cLevelRole: "",
  execGender: "",
  execTime: "",
  otherEmployee: "",
  otherEmployee2: "",
  otherEmployeeWomen: "",
};

const Teamscore3: React.FC<Teamscore3Props> = ({ onSubmit }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className="bg-white p-8 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px]">
          <div className="mb-4">
            <label
              htmlFor="cLevelNoneFounders"
              className="block text-sm text-[#0A0A3F]"
            >
              Do you have any C-Level Execs that are none founders?
            </label>
            <div className="mt-1">
              <label className="mr-2">
                <Field type="radio" name="cLevelNoneFounders" value="yes" />
                Yes
              </label>
              <label>
                <Field type="radio" name="cLevelNoneFounders" value="no" />
                No
              </label>
            </div>
            <ErrorMessage
              name="cLevelNoneFounders"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor=" cLevelLinkedin"
              className="block text-sm text-[#0A0A3F]"
            >
              If yes, C-level linkedin
            </label>
            <Field
              type="text"
              id=" cLevelLinkedin"
              name=" cLevelLinkedin"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor=" cLevelRole"
              className="block text-sm text-[#0A0A3F]"
            >
              What is their role in the business?
            </label>
            <Field
              type="text"
              id=" cLevelRole"
              name=" cLevelRole"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="execGender"
              className="block text-sm text-[#0A0A3F]"
            >
              Is this Exec male or female?
            </label>
            <div className="mt-1">
              <label className="mr-2">
                <Field
                  type="radio"
                  name="execGender"
                  value="yes"
                  className="mr-[1px]"
                />
                Male
              </label>
              <label>
                <Field
                  type="radio"
                  name="execGender"
                  value="no"
                  className="mr-[1px]"
                />
                Female
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="execTime" className="block text-sm text-[#0A0A3F]">
              Is the Exec part time or full time in the business?
            </label>
            <div className="mt-1">
              <label className="mr-2">
                <Field
                  type="radio"
                  name="execTime"
                  value="yes"
                  className="mr-[1px]"
                />
                Part time
              </label>
              <label>
                <Field
                  type="radio"
                  name="execTime"
                  value="no"
                  className="mr-[1px]"
                />
                Full time
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="otherEmployee"
              className="block text-sm text-[#0A0A3F]"
            >
              Do you have have any other employees?
            </label>
            <div className="mt-1">
              <label className="mr-2">
                <Field
                  type="radio"
                  name="otherEmployee"
                  value="yes"
                  className="mr-[1px]"
                />
                Yes
              </label>
              <label>
                <Field
                  type="radio"
                  name="otherEmployee"
                  value="no"
                  className="mr-[1px]"
                />
                No
              </label>
            </div>
            <ErrorMessage
              name="otherEmployee"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="otherEmployee2"
              className="block text-sm text-[#0A0A3F]"
            >
              If yes, how many other employees do you have?
            </label>
            <Field
              type="text"
              id="otherEmployee2"
              name="otherEmployee2"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="otherEmployeeWomen"
              className="block text-sm text-[#0A0A3F]"
            >
              How many of your other employees are women?
            </label>
            <Field
              type="text"
              id="otherEmployeeWomen"
              name="otherEmployeeWomen"
              className="mt-1 p-2 w-full border rounded"
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

export default Teamscore3;
