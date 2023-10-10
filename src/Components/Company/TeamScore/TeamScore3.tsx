/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

interface Teamscore3Props {
  onSubmit: (values: typeof initialValues) => void;
  initialValues: typeof initialValues;
}

const initialValues = {
  cLevelNoneFounders: "",
  howMany: "",
  cLevelLinkedin: "",
  cLevelRole: "",
  execGender: "",
  execTime: "",
  otherEmployee: "",
  otherEmployee2: "",
  otherEmployeeWomen: "",
};

const Teamscore3: React.FC<Teamscore3Props> = ({ onSubmit, initialValues }) => {
  const [hasCLevelExecs, setHasCLevelExecs] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        <Form className="m-6 p-8 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px]">
          <div className="mb-4">
            <label htmlFor="cLevelNoneFounders" className="block text-sm">
              Do you have any C-Level Execs that are none founders?
            </label>
            <div className="mt-1">
              <label className="mr-2">
                <input
                  type="radio"
                  name="cLevelNoneFounders"
                  value="yes"
                  onChange={() => setHasCLevelExecs("yes")}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="cLevelNoneFounders"
                  value="no"
                  onChange={() => setHasCLevelExecs("no")}
                />
                No
              </label>
            </div>
            {hasCLevelExecs === "yes" && (
              <div className="mt-4">
                <label htmlFor="howMany" className="block text-sm">
                  How many:
                </label>
                <Field
                  type="text"
                  name="howMany"
                  id="howMany"
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
            )}
            {hasCLevelExecs === "no" && (
              <p className="text-sm text-gray-500 mt-2"></p>
            )}
          </div>
          {hasCLevelExecs === "yes" && (
            <div className="mb-4">
              <label htmlFor=" cLevelLinkedin" className="block text-sm">
                C-level linkedin
              </label>
              <Field
                type="text"
                id=" cLevelLinkedin"
                name=" cLevelLinkedin"
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
          )}
          {hasCLevelExecs === "no" && (
            <p className="text-sm text-gray-500 mt-2"></p>
          )}
          <div className="mb-4">
            <label htmlFor=" cLevelRole" className="block text-sm">
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
            <label htmlFor="execGender" className="block text-sm">
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
            <label htmlFor="execTime" className="block text-sm">
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
            <label htmlFor="otherEmployee" className="block text-sm">
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
            <label htmlFor="otherEmployee2" className="block text-sm">
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
            <label htmlFor="otherEmployeeWomen" className="block text-sm">
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
