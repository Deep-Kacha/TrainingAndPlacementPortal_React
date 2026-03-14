// components/company/ContactPersonSection.jsx
// Section 6 of CompanyRegister — contact person name, email, mobile.

import SectionCard from "../register/SectionCard";
import FormField from "../register/Formfield ";
import { INPUT_STYLE } from "../register/Placementdata";

const ContactPersonSection = ({ formData, errors, handleChange }) => (
  <SectionCard number="6" title="Contact Person Details" contentClassName="px-6 py-5 space-y-4">
    <FormField label="Contact Person Name" required error={errors.contactName}>
      <input name="contactName" className={INPUT_STYLE} value={formData.contactName} onChange={handleChange} />
    </FormField>

    <FormField label="Contact Person Email ID" error={errors.contactEmail}>
      <input name="contactEmail" type="email" className={INPUT_STYLE} value={formData.contactEmail} onChange={handleChange} />
    </FormField>

    <FormField label="Contact Person Mobile No." required error={errors.contactMobile}>
      <input name="contactMobile" type="tel" placeholder="10-digit number" className={INPUT_STYLE} value={formData.contactMobile} onChange={handleChange} />
    </FormField>
  </SectionCard>
);

export default ContactPersonSection;