// components/company/AdditionalDetailsSection.jsx
// Section 8 of CompanyRegister — free-text additional info textarea.

import SectionCard from "../register/SectionCard";
import { INPUT_STYLE } from "../register/Placementdata";

const AdditionalDetailsSection = ({ formData, handleChange }) => (
  <SectionCard number="7" title="Additional Details" contentClassName="px-6 py-5">
    <label className="text-sm text-gray-600">Additional Information</label>
    <textarea
      name="additionalInfo"
      rows={3}
      placeholder="Any additional information or special requirements"
      className={INPUT_STYLE}
      value={formData.additionalInfo}
      onChange={handleChange}
    />
  </SectionCard>
);

export default AdditionalDetailsSection;