/**
 * Demo / Seed Mode Configuration
 *
 * - In local development (`npm run dev`), IS_DEMO_MODE is false so the app
 *   connects directly to the local Express + PostgreSQL backend as usual.
 * - In production builds (e.g. Vercel deployment), IS_DEMO_MODE defaults to true
 *   (unless VITE_DEMO_MODE="false" is explicitly provided) so the portal runs
 *   purely on Indian seed data with session-only mutations that recover on logout.
 */
export const IS_DEMO_MODE =
  import.meta.env.VITE_DEMO_MODE === "true" ||
  (import.meta.env.PROD && import.meta.env.VITE_DEMO_MODE !== "false");

export const PORTAL_BRANDING = {
  institutionName: "RK University",
  shortName: "RKU",
  cityState: "Rajkot, Gujarat",
  emailDomain: "rku.ac.in",
  tpoEmail: "tpo@rku.ac.in",
  superAdminEmail: "admin@rku.ac.in",
  phone: "+91 2827 255734",
  policyLabel: "Standard RKU",
  securityFooter: "Protected by RKU Placement Security Layer",
  officers: [
    {
      name: "Dr. Vishal Doshi",
      department: "Head of Training & Placement Cell",
      mobile: "+91 98765 43210",
      email: "vishal.doshi@rku.ac.in",
    },
    {
      name: "Mr. Osho Shah",
      department: "Assistant Training & Placement Officer",
      mobile: "+91 87654 32109",
      email: "osho.shah@rku.ac.in",
    },
  ],
};

export const DEMO_ACCOUNTS = [
  {
    key: "student_active",
    label: "Student (Active)",
    badge: "Apply & Track",
    role: "Student",
    email: "aarav.sharma@rku.ac.in",
    password: "Student@123",
    description: "Browse open drives, apply to jobs, view interviews & profile",
  },
  {
    key: "student_placed",
    label: "Student (Placed)",
    badge: "Offer History",
    role: "Student",
    email: "diya.patel@rku.ac.in",
    password: "Student@123",
    description: "See verified placement offer & One-Student-One-Job policy",
  },
  {
    key: "super_admin",
    label: "Super Admin (TPO)",
    badge: "Full Control",
    role: "Admin",
    email: "admin@rku.ac.in",
    password: "Admin@123",
    description: "Approve students & JDs, manage applications, interviews & users",
  },
  {
    key: "sub_admin",
    label: "Coordinator (Admin)",
    badge: "Role Scoped",
    role: "Admin",
    email: "coordinator@rku.ac.in",
    password: "Admin@123",
    description: "Placement coordinator access (restricted user management)",
  },
];
