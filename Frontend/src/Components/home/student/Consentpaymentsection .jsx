// components/student/ConsentPaymentSection.jsx
// Section 5 of StudentRegistration — consent form (PDF) and payment proof (image) uploads.

import SectionCard from "../register/SectionCard";
import FileUpload from "../register/Fileupload";

const ConsentPaymentSection = ({ formData, errors, handleChange }) => (
  <SectionCard number="5" title="Consent & Payment" contentClassName="p-6 md:p-8 space-y-6">
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
  </SectionCard>
);

export default ConsentPaymentSection;