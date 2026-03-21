// components/student/ParentInfoSection.jsx
// Section 3 of StudentRegistration — parent name, email, mobile.

import SectionCard from "../register/SectionCard";
import FormField from "../register/Formfield ";
import { INPUT_STYLE } from "../register/Placementdata";

const ParentInfoSection = ({ formData, errors, handleChange }) => (
  <SectionCard number="3" title="Parent / Guardian Information" contentClassName="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField label="Parent Name" required error={errors.parentName}>
        <input name="parentName" placeholder="Enter parent name" className={INPUT_STYLE} value={formData.parentName} onChange={handleChange} />
      </FormField>

      <FormField label="Parent Email" required error={errors.parentEmail}>
        <input name="parentEmail" type="email" placeholder="Enter parent email" className={INPUT_STYLE} value={formData.parentEmail} onChange={handleChange} />
      </FormField>

      <FormField label="Parent Mobile Number" required error={errors.parentMobile}>
        <input name="parentMobile" type="tel" placeholder="10-digit mobile number" className={INPUT_STYLE} value={formData.parentMobile} onChange={handleChange} />
      </FormField>
  </SectionCard>
);

export default ParentInfoSection;