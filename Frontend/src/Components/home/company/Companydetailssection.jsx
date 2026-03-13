// components/company/CompanyDetailsSection.jsx
// Section 2 of CompanyRegister — email, company name, location, website, description.

import SectionCard from "../register/SectionCard";
import FormField from "../register/Formfield ";
import { INPUT_STYLE } from "../register/Placementdata";

const CompanyDetailsSection = ({ formData, errors, handleChange }) => (
  <SectionCard number="2" title="Company Details" contentClassName="px-6 py-5 space-y-4">
    <FormField label="Email Address" required error={errors.email}>
      <input name="email" type="email" className={INPUT_STYLE} value={formData.email} onChange={handleChange} />
    </FormField>

    <FormField label="Company Name" required error={errors.companyName}>
      <input name="companyName" className={INPUT_STYLE} value={formData.companyName} onChange={handleChange} />
    </FormField>

    <FormField label="Job Location" required error={errors.jobLocation}>
      <input name="jobLocation" className={INPUT_STYLE} value={formData.jobLocation} onChange={handleChange} />
    </FormField>

    <FormField label="Company Website URL" required error={errors.website}>
      <input name="website" className={INPUT_STYLE} value={formData.website} onChange={handleChange} />
    </FormField>

    <FormField label="Short Company Description">
      <textarea name="description" rows={4} className={INPUT_STYLE} value={formData.description} onChange={handleChange} />
    </FormField>
  </SectionCard>
);

export default CompanyDetailsSection;