/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { teamscoreSchema2 } from "../formValidate";

interface Teamscore2Props {
  onSubmit: (values: typeof initialValues) => void;
  initialValues: typeof initialValues;
}

const initialValues = {
  founderGender: "",
  technicalFounder: "",
  founderTime: "",
  cLevel: "",
  cLevel2: "",
  cLevel3: "",
};

const Teamscore2: React.FC<Teamscore2Props> = ({ onSubmit, initialValues }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={onSubmit}
        validationSchema={teamscoreSchema2}
      >
        <Form className="m-6 p-8 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px]">
          <div className="mb-4">
            <label htmlFor="founderGender" className="block text-sm">
              Is this founder male or female?
              <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <label className="mr-4">
                <Field
                  type="radio"
                  id="founderGender"
                  name="founderGender"
                  value="male"
                  className="mr-[1px]"
                />
                Male
              </label>
              <label className="mr-4">
                <Field
                  type="radio"
                  id="founderGender"
                  name="founderGender"
                  value="female"
                  className="mr-[1px]"
                />
                Female
              </label>
              <label>
                <Field
                  type="radio"
                  id="founderGender"
                  name="founderGender"
                  value="both"
                  className="mr-[1px]"
                />
                Both Male and Female
              </label>
            </div>
            <ErrorMessage
              name="founderGender"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="technicalFounder" className="block text-sm">
              Is this a technical founder?
              <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <label className="mr-4">
                <Field
                  type="radio"
                  id="technicalFounder"
                  name="technicalFounder"
                  value="Yes"
                  className="mr-[1px]"
                />
                Yes
              </label>
              <label className="mr-4">
                <Field
                  type="radio"
                  id="technicalFounder"
                  name="technicalFounder"
                  value="No"
                  className="mr-[1px]"
                />
                No
              </label>
            </div>
            <ErrorMessage
              name="technicalFounder"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="technicalFounder" className="block text-sm">
              Is this founder part time or full time in the business?
              <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <label className="mr-4">
                <Field
                  type="radio"
                  id="founderTime"
                  name="founderTime"
                  value="Yes"
                  className="mr-[1px]"
                />
                Part-time
              </label>
              <label className="mr-4">
                <Field
                  type="radio"
                  id="founderTime"
                  name="founderTime"
                  value="No"
                  className="mr-[1px]"
                />
                Full-time
              </label>
            </div>
            <ErrorMessage
              name="founderTime"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="cLevel" className="block text-sm">
              Has this founder been a founder or C-level exec in a previous
              company?<span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <label className="mr-4">
                <Field
                  type="radio"
                  id="cLevel"
                  className="mr-[1px]"
                  name="cLevel"
                  value="Yes"
                />
                Yes
              </label>
              <label className="mr-4">
                <Field
                  type="radio"
                  className="mr-[1px]"
                  id="cLevel"
                  name="cLevel"
                  value="No"
                />
                No
              </label>
            </div>
            <ErrorMessage
              name="cLevel"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cLevel2" className="block text-sm">
              If yes, is the previous company still running?
            </label>
            <div className="mt-1">
              <label className="mr-2">
                <Field
                  type="radio"
                  name="cLevel2"
                  value="yes"
                  className="mr-[1px]"
                />
                Yes
              </label>
              <label>
                <Field
                  type="radio"
                  name="cLevel2"
                  value="no"
                  className="mr-[1px]"
                />
                No
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="cLevel3" className="block text-sm">
              If yes, was that previous company acquired or did it have an IPO?
            </label>
            <div className="mt-1">
              <label className="mr-2">
                <Field
                  type="radio"
                  name="cLevel3"
                  value="yes"
                  className="mr-[1px]"
                />
                Yes acquired
              </label>
              <label>
                <Field
                  type="radio"
                  name="cLevel3"
                  value="no"
                  className="mr-[1px]"
                />
                No IPO
              </label>
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

export default Teamscore2;
