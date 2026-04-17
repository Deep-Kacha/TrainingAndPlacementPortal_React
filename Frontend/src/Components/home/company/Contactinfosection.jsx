import { Phone, Mail } from "lucide-react";
import SectionCard from "../register/SectionCard";
import { useState, useEffect } from "react";

const ContactInfoSection = () => {
  const [officers, setOfficers] = useState([]);

  useEffect(() => {
    const fetchOfficers = async () => {
      try {
        const res = await fetch("/api/guest/contact-officers");
        const result = await res.json();
        if (result.success && result.data.length > 0) {
          setOfficers(result.data);
        } else {
          // Fallback if no officers exist in DB
          setOfficers([
            { name: "Dr. Vishal Doshi", department: "Head of Training & Placement Cell", mobile: "+91 98765 43210", email: "vishal.doshi@rku.ac.in" },
            { name: "Mr. Osho Shah", department: "Assistant Training & Placement Officer", mobile: "+91 87654 32109", email: "osho.shah@rku.ac.in" }
          ]);
        }
      } catch (err) {
        console.error("Failed to fetch contact officers", err);
      }
    };
    fetchOfficers();
  }, []);

  return (
    <SectionCard number="1" title="Contact Information" contentClassName="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-4">
      {officers.map((officer, i) => (
        <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <p className="text-sm font-semibold text-gray-800">{officer.name}</p>
          <p className="text-xs text-gray-500">{officer.department || "Training & Placement Cell"}</p>
          {officer.mobile && (
            <p className="text-xs text-gray-600 mt-2 flex items-center gap-1.5">
              <Phone size={11} className="text-red-500" /> {officer.mobile}
            </p>
          )}
          <p className="text-xs text-gray-600 flex items-center gap-1.5 mt-1">
            <Mail size={11} className="text-red-500" /> {officer.email}
          </p>
        </div>
      ))}
    </SectionCard>
  );
};

export default ContactInfoSection;