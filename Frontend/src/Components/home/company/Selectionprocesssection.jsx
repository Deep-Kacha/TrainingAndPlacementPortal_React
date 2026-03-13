// components/company/SelectionProcessSection.jsx
// Section 5 of CompanyRegister — selection process, drive date, registration link.

import SectionCard from "../register/SectionCard";
import FormField from "../register/Formfield ";
import { INPUT_STYLE } from "../register/Placementdata";

const SelectionProcessSection = ({ formData, errors, handleChange }) => (
  <SectionCard number="5" title="Selection Process" contentClassName="px-6 py-5 space-y-4">
    <FormField label="Selection Process" required error={errors.selectionProcess}>
      <textarea
        name="selectionProcess"
        rows={4}
        placeholder="Describe the selection process (e.g., Written Test, Technical Interview, HR Interview)"
        className={INPUT_STYLE}
        value={formData.selectionProcess}
        onChange={handleChange}
      />
    </FormField>

    <FormField label="Expected Date of Campus Drive" required error={errors.driveDate}>
      <input name="driveDate" type="date" className={INPUT_STYLE} value={formData.driveDate} onChange={handleChange} />
    </FormField>

    <FormField label="Registration Link (Optional)">
      <input name="registrationLink" placeholder="https://..." className={INPUT_STYLE} value={formData.registrationLink} onChange={handleChange} />
    </FormField>
  </SectionCard>
);

export default SelectionProcessSection;