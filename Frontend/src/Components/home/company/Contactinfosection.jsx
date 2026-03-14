// components/company/ContactInfoSection.jsx
// Section 1 of CompanyRegister — the two placement-cell contact cards.
// Extracted as-is; no UI changes.

import { Phone, Mail } from "lucide-react";
import SectionCard from "../register/SectionCard";

const ContactInfoSection = () => (
  <SectionCard number="1" title="Contact Information" contentClassName="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
      <p className="text-sm font-semibold text-gray-800">Dr. Vishal Doshi</p>
      <p className="text-xs text-gray-500">Head of Training & Placement Cell</p>
      <p className="text-xs text-gray-600 mt-2 flex items-center gap-1.5">
        <Phone size={11} className="text-red-500" /> +91 (0) 4329
      </p>
      <p className="text-xs text-gray-600 flex items-center gap-1.5">
        <Mail size={11} className="text-red-500" /> vishal.doshi@rku.ac.in
      </p>
    </div>

    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
      <p className="text-sm font-semibold text-gray-800">Mr. Osho Shah</p>
      <p className="text-xs text-gray-500">Assistant Training & Placement Officer</p>
      <p className="text-xs text-gray-600 mt-2 flex items-center gap-1.5">
        <Phone size={11} className="text-red-500" /> +91 (0) 42138
      </p>
      <p className="text-xs text-gray-600 flex items-center gap-1.5">
        <Mail size={11} className="text-red-500" /> osho.shah@rku.ac.in
      </p>
    </div>
  </SectionCard>
);

export default ContactInfoSection;