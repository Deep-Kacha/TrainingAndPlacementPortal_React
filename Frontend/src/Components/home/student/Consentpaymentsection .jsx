// components/student/ConsentPaymentSection.jsx
// Section 5 of StudentRegistration — consent form (PDF) and payment proof (image) uploads.

import FileUpload from "../register/Fileupload";

const ConsentPaymentSection = ({ formData, errors, handleChange }) => (
  <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
    <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
      <div className="w-7 h-7 bg-red-600 rounded-full flex items-center justify-center">
        <span className="text-white text-xs font-bold">5</span>
      </div>
      <h3 className="font-semibold text-gray-800">Consent & Payment</h3>
    </div>

    <div className="px-6 py-5 space-y-6">
      <FileUpload
        name="consentForm"
        accept=".pdf"
        label={<>Consent Form <span className="text-red-500">*</span></>}
        selectedFile={formData.consentForm}
        onChange={handleChange}
        error={errors.consentForm}
      />

      <FileUpload
        name="paymentProof"
        accept="image/*"
        label={<>Payment Proof <span className="text-red-500">*</span></>}
        hint="For online payment upload screenshot · For offline payment upload cheque photo"
        selectedFile={formData.paymentProof}
        onChange={handleChange}
        error={errors.paymentProof}
      />
    </div>
  </div>
);

export default ConsentPaymentSection;