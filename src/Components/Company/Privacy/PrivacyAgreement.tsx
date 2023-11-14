import React, { useState } from "react";

const PrivacyAgreement: React.FC = () => {
  const [agreed, setAgreed] = useState(false);

  const handleAgree = () => {
    setAgreed(!agreed);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Privacy Agreement</h2>
      <div className="bg-white p-4 rounded shadow">
        <p>
          By signing this Privacy Agreement, you agree to the terms and
          conditions outlined in our privacy policy.
        </p>
      </div>
      <div className="mt-4 flex items-center">
        <input
          type="checkbox"
          id="privacyAgreement"
          checked={agreed}
          onChange={handleAgree}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <label htmlFor="privacyAgreement" className="ml-2">
          I have read and agree to the Privacy Policy
        </label>
      </div>
      <button
        onClick={() => {
          if (agreed) {
            // Handle user agreement, e.g., redirect to the next step
            console.log("User agreed to the Privacy Policy");
          } else {
            alert("Please read and agree to the Privacy Policy.");
          }
        }}
        className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded ${
          agreed ? "hover:bg-blue-600" : "cursor-not-allowed opacity-50"
        }`}
        disabled={!agreed}
      >
        Continue
      </button>
    </div>
  );
};

export default PrivacyAgreement;
