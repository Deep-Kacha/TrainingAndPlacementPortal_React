// components/company/JobRoleSection.jsx
// Section 3 of CompanyRegister — job position, CTC, internship, stipend, bond, join date.

import SectionCard from "../register/SectionCard";
import FormField from "../register/Formfield ";
import { INPUT_STYLE } from "../register/Placementdata";

const JobRoleSection = ({ formData, errors, handleChange }) => (
  <SectionCard number="3" title="Job Role & Compensation" contentClassName="px-6 py-5 space-y-4">
    <FormField label="Job Position" required error={errors.jobPosition}>
      <input
        name="jobPosition"
        placeholder="e.g., Software Developer, Marketing Executive"
        className={INPUT_STYLE}
        value={formData.jobPosition}
        onChange={handleChange}
      />
    </FormField>

    <FormField label="Annual CTC" required error={errors.ctc}>
      <input name="ctc" placeholder="e.g., 3,80,124" className={INPUT_STYLE} value={formData.ctc} onChange={handleChange} />
    </FormField>

    <FormField label="Internship/Training Duration (In Months)">
      <input name="internshipDuration" className={INPUT_STYLE} value={formData.internshipDuration} onChange={handleChange} />
    </FormField>

    <FormField label="Stipend During Internship (Per Month)">
      <input name="stipend" placeholder="e.g., ₹11,200" className={INPUT_STYLE} value={formData.stipend} onChange={handleChange} />
    </FormField>

    <FormField label="Bond (If Any)">
      <input name="bond" placeholder="e.g., 2 years or No" className={INPUT_STYLE} value={formData.bond} onChange={handleChange} />
    </FormField>

    <FormField label="Date of Joining" required error={errors.joinDate}>
      <input name="joinDate" type="date" className={INPUT_STYLE} value={formData.joinDate} onChange={handleChange} />
    </FormField>
  </SectionCard>
);

export default JobRoleSection;