// components/student/PersonalInfoSection.jsx
// Section 1 of StudentRegistration — enrollment, name, branch, semester, emails, passwords, mobile.

import SectionCard from "../register/SectionCard";
import FormField from "../register/Formfield ";
import { INPUT_STYLE } from "../register/Placementdata";

const PersonalInfoSection = ({ formData, errors, handleChange }) => (
  <SectionCard number="1" title="Personal Information" contentClassName="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField label="Enrollment Number" required error={errors.enrollment}>
        <input name="enrollment" placeholder="Enter your enrollment number" className={INPUT_STYLE} value={formData.enrollment} onChange={handleChange} />
      </FormField>

      <FormField label="Full Name" required error={errors.name}>
        <input name="name" placeholder="Enter your full name" className={INPUT_STYLE} value={formData.name} onChange={handleChange} />
      </FormField>

      <FormField label="Branch" required error={errors.branch}>
        <select name="branch" className={INPUT_STYLE} value={formData.branch} onChange={handleChange}>
          <option value="">Select your branch</option>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="CE">CE</option>
          <option value="ECE">ECE</option>
          <option value="ME">ME</option>
        </select>
      </FormField>

      <FormField label="Current Semester" required error={errors.semester}>
        <select name="semester" className={INPUT_STYLE} value={formData.semester} onChange={handleChange}>
          <option value="">Select semester</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
      </FormField>

      <FormField label="University Email Address" required error={errors.universityEmail}>
        <input name="universityEmail" type="email" placeholder="yourname@rku.ac.in" className={INPUT_STYLE} value={formData.universityEmail} onChange={handleChange} />
      </FormField>

      <FormField label="Personal Email Address" required error={errors.personalEmail}>
        <input name="personalEmail" type="email" placeholder="yourname@gmail.com" className={INPUT_STYLE} value={formData.personalEmail} onChange={handleChange} />
      </FormField>

      <FormField label="Password" required error={errors.password}>
        <input name="password" type="password" placeholder="Enter your password" className={INPUT_STYLE} value={formData.password} onChange={handleChange} />
      </FormField>

      <FormField label="Confirm Password" required error={errors.confirmPassword}>
        <input name="confirmPassword" type="password" placeholder="Re-enter your password" className={INPUT_STYLE} value={formData.confirmPassword} onChange={handleChange} />
      </FormField>

      <FormField label="Mobile Number" required error={errors.mobile}>
        <input name="mobile" type="tel" placeholder="10-digit mobile number" className={INPUT_STYLE} value={formData.mobile} onChange={handleChange} />
      </FormField>
  </SectionCard>
);

export default PersonalInfoSection;