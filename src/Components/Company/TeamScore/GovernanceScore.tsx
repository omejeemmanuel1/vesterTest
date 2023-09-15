/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Formik, Form, Field } from "formik";

interface GovernanceProps {
  onSubmit: (values: typeof initialValues) => void;
  initialValues: typeof initialValues;
}
const initialValues = {
  boardOfDirector: "",
  boardOfDirector2: "",
  advisors: "",
  advisors2: "",
  investorFunding: "",
  directorsAvailable: "",
};

const GovernanceScore: React.FC<GovernanceProps> = ({
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
          <h2 className="text-[32px] font-semibold mb-4">Governance Score</h2>
          <div className="mb-4">
            <label htmlFor="boardOfDirector" className="block text-sm">
              Do you have an official board of directors?
            </label>
            <div className="mt-1">
              <label className="mr-4">
                <Field
                  type="radio"
                  id="boardOfDirector"
                  name="boardOfDirector"
                  value="Yes"
                />
                Yes
              </label>
              <label className="mr-4">
                <Field
                  type="radio"
                  id="boardOfDirector"
                  name="boardOfDirector"
                  value="No"
                />
                No
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="boardOfDirector2" className="block text-sm">
              If yes, How often does your board meeting?
            </label>
            <Field
              type="text"
              id="boardOfDirector2"
              name=" boardOfDirector2"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="advisors" className="block text-sm">
              Do you have a team of advisors?
            </label>
            <div className="mt-1">
              <label className="mr-2">
                <Field type="radio" name="advisors" value="yes" />
                Yes
              </label>
              <label>
                <Field type="radio" name="advisors" value="no" />
                No
              </label>
            </div>
            <div className="mb-4">
              <label htmlFor="advisors2" className="block text-sm">
                If yes, How often do you meet with your advisers?
              </label>
              <Field
                type="text"
                id="advisors2"
                name="advisors2"
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor=" investorFunding" className="block text-sm">
              If you've raised funding, who are your investors?
            </label>
            <Field
              type="text"
              id=" investorFunding"
              name=" investorFunding"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="directorsAvailable" className="block text-sm">
              Are there directors , investors or founders PEPs? (yes or no)
            </label>
            <div className="mt-1">
              <label className="mr-4">
                <Field
                  type="radio"
                  id="directorsAvailable"
                  name="directorsAvailable"
                  value="Yes"
                />
                Yes
              </label>
              <label className="mr-4">
                <Field
                  type="radio"
                  id="directorsAvailable"
                  name="directorsAvailable"
                  value="No"
                />
                No
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#000D80] text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
          >
            Get Started
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default GovernanceScore;
