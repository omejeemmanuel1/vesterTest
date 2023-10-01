/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { generalSchema2 } from "../formValidate";

interface GeneralInfo2Props {
  onSubmit: (values: typeof initialValues) => void;
  initialValues: typeof initialValues;
}

const initialValues = {
  industry: "",
  mainTechnology: "",
  mainTechnology2: "",
  foundingDate: null,
  companyExplanation: "",
};

const GeneralInfo2: React.FC<GeneralInfo2Props> = ({
  onSubmit,
  initialValues,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={generalSchema2}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <Form
            onSubmit={handleSubmit}
            className="p-8 rounded-2xl shadow-md border border-gray-400 font-cabinet w-[422px]"
          >
            <div className="mb-4">
              <label htmlFor="industry" className="block text-sm">
                Which industry do you operate in?
                <span className="text-red-500">*</span>
              </label>
              <Field
                as="select"
                id="industry"
                name="industry"
                className="mt-1 p-2 w-full border rounded"
              >
                <option value="">Select Industry</option>

                <option value="Advertising/Marketing">
                  Advertising/Marketing
                </option>
                <option value="AgTech"> AgTech</option>
                <option value="Art Tech">Art Tech</option>
                <option value="Automotive">Automotive</option>
                <option value="Biotech/Life ScienceBiotech/Life Science">
                  Biotech/Life ScienceBiotech/Life Science
                </option>
                <option value="Construction/Real estateS">
                  Construction/Real estate{" "}
                </option>
                <option value="Consulting">Consulting</option>
                <option value="Cybersecurity/Security">
                  Cybersecurity/Security
                </option>
                <option value="Data & Analytics">Data & Analytics</option>
                <option value="Design/UX">Design/UX</option>
                <option value="E-commerce/Consumer">E-commerce/Consumer</option>
                <option value="EdTech">EdTech</option>
                <option value="Energy">Energy</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Fashion/Beauty">Fashion/Beauty</option>
                <option value="Fintech">Fintech</option>
                <option value="Food/Beverage">Food/Beverage</option>
                <option value="aming/E-sports">Gaming/E-sports</option>
                <option value="Health/Medical">Health/Medical </option>
                <option value="Human Resources">Human Resources</option>
                <option value="Insurance IoT (Internet of Things)">
                  Insurance IoT (Internet of Things){" "}
                </option>
                <option value="Law Enforcement">Law Enforcement</option>
                <option value="Legal Tech">Legal Tech</option>
                <option value="Logistics">Logistics</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Not-for-profi">Not-for-profit</option>
                <option value="Productivity">Productivity</option>
                <option value="Publishing/Content creation">
                  Publishing/Content creation
                </option>
                <option value="Robotics">Robotics</option>
                <option value="Smart cities">Smart cities</option>
                <option value="Social Impact">Social Impact</option>
                <option value="Social networking"> Social networking</option>
                <option value="Space Tech">Space Tech</option>
                <option value="Sports"> Sports</option>
                <option value="Social networking"> Social networking</option>
                <option value="Sustainanility & Cleantech">
                  Sustainanility & Cleantech
                </option>
                <option value="Telecommunications">Telecommunications</option>
                <option value="Travel/Hospitality">Travel/Hospitality</option>
                <option value="Wearable Tech">Wearable Tech</option>
                <option value="Other">Other</option>
              </Field>
              <ErrorMessage
                name="industry"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mainTechnology" className="block text-sm">
                What is your company's main technology?
                <span className="text-red-500">*</span>
              </label>
              <Field
                as="select"
                id="mainTechnology"
                name="mainTechnology"
                className="mt-1 p-2 w-full border rounded"
              >
                <option value="">Select Main Technology</option>
                <option value="Software Development">
                  Software Development
                </option>
                <option value="Information Technology (IT)">
                  Information Technology (IT)
                </option>
                <option value="Hardware/ Electronics">
                  Hardware/ Electronics
                </option>
                <option value="Internet/ E-commerce">
                  Internet/ E-commerce
                </option>
                <option value="Biotechnology">Biotechnology</option>
                <option value="Artificial Intelligence (AI) and Machine Learning">
                  Artificial Intelligence (AI) and Machine Learning
                </option>
                <option value="Blockchain and Cryptocurrency">
                  Blockchain and Cryptocurrency
                </option>
                <option value="Renewable Energy Technology">
                  Renewable Energy Technology
                </option>
                <option value="Green Technology">Green Technology</option>
                <option value="Other">Other (Please specify)</option>
              </Field>
              <ErrorMessage
                name="mainTechnology"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mainTechnology2" className="block text-sm">
                If other, specify the technology
              </label>
              <Field
                type="text"
                id="mainTechnology2"
                name="mainTechnology2"
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="foundingDate" className="block text-sm">
                When was this company founded? (date selection){" "}
                <span className="text-red-500">*</span>
              </label>
              <Field
                type="date"
                id="foundingDate"
                name="foundingDate"
                className="mt-1 p-2 w-full border rounded"
              />
              <ErrorMessage
                name="foundingDate"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="companyExplanation" className="block text-sm">
                In under 100 words, explain why you started this company?{" "}
                <span className="text-red-500">*</span>
              </label>
              <Field
                as="textarea"
                id="companyExplanation"
                name="companyExplanation"
                rows={4}
                className="mt-1 p-2 w-full border rounded"
              />
              <ErrorMessage
                name="companyExplanation"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-[#000D80] text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
            >
              Continue
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GeneralInfo2;
