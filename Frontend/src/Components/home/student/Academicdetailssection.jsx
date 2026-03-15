// components/student/AcademicDetailsSection.jsx
// Section 2 of StudentRegistration — 10th, 12th, CGPA, backlogs.

import SectionCard from "../register/SectionCard";
import FormField from "../register/Formfield ";
import { INPUT_STYLE } from "../register/Placementdata";

const AcademicDetailsSection = ({ formData, errors, handleChange }) => (
  <SectionCard number="2" title="Academic Details" contentClassName="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField label="10th Percentage" required error={errors.tenth}>
        <input name="tenth" type="number" placeholder="e.g. 85.50" className={INPUT_STYLE} value={formData.tenth} onChange={handleChange} />
      </FormField>

      <FormField label="12th Percentage" required error={errors.twelfth}>
        <input name="twelfth" type="number" placeholder="e.g. 82.00" className={INPUT_STYLE} value={formData.twelfth} onChange={handleChange} />
      </FormField>

      <FormField label="Current CGPA" required error={errors.cgpa}>
        <input name="cgpa" type="number" placeholder="e.g. 7.50" className={INPUT_STYLE} value={formData.cgpa} onChange={handleChange} />
      </FormField>

      <FormField label="Active Backlogs (if any)">
        <input name="backlogs" type="number" placeholder="0" className={INPUT_STYLE} value={formData.backlogs} onChange={handleChange} />
      </FormField>
  </SectionCard>
);

export default AcademicDetailsSection;