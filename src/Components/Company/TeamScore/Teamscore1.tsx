/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

interface Teamscore1Props {
  onSubmit: (values: typeof initialValues) => void;
  initialValues: typeof initialValues;
}
const initialValues = {
  cofounderCount: "",
  cofounderNames: ["", "", ""],
  cofounderLinkedins: ["", "", ""],
};

const Teamscore1: React.FC<Teamscore1Props> = ({ onSubmit, initialValues }) => {
  const [cofounderCount, setCofounderCount] = useState<number>(0);

  const handleCofounderCountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let count = parseInt(event.target.value, 4) || 0;
    if (count > 3) {
      count = 3;
    }
    setCofounderCount(count);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        <Form className="p-8 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px]">
          <h2 className="text-[32px] font-semibold mb-4">Team Score</h2>

          <div className="mb-4">
            <label htmlFor="cofounderCount" className="block text-sm">
              How many co-founders does your company have?
            </label>
            <Field
              type="text"
              id="cofounderCount"
              name="cofounderCount"
              value={cofounderCount}
              className="mt-1 p-2 w-full border rounded"
              onChange={handleCofounderCountChange}
              min="1"
              max="3"
              required
            />
            <ErrorMessage
              name="cofounderCount"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {Array.from({ length: cofounderCount }).map((_, index) => (
            <div className="mb-4" key={index}>
              <label
                htmlFor={`cofounderNames[${index}]`}
                className="block text-sm"
              >
                Co-founder {index + 1} Name
              </label>
              <Field
                type="text"
                id={`cofounderNames[${index}]`}
                name={`cofounderNames[${index}]`}
                className="mt-1 p-2 w-full border rounded"
              />

              <label
                htmlFor={`cofounderLinkedins[${index}]`}
                className="block text-sm mt-2"
              >
                Co-founder {index + 1} LinkedIn Profile
              </label>
              <Field
                type="text"
                id={`cofounderLinkedins[${index}]`}
                name={`cofounderLinkedins[${index}]`}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
          ))}

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

export default Teamscore1;
