/**
 * Demo / Seed Mode Configuration
 *
 * - In local development (`npm run dev`), IS_DEMO_MODE is false so the app
 *   connects directly to the local Express + PostgreSQL backend as usual.
 * - In production builds (e.g. Vercel deployment), IS_DEMO_MODE defaults to true
 *   (unless VITE_DEMO_MODE="false" is explicitly provided) so the portal runs
 *   purely on brand-new Indian feed data with session-only mutations that recover on logout.
 */
export const IS_DEMO_MODE =
  import.meta.env.VITE_DEMO_MODE === "true" ||
  (import.meta.env.PROD && import.meta.env.VITE_DEMO_MODE !== "false");

export const DEMO_SUPER_ADMIN_EMAIL = "tpo.director@rku.ac.in";

export const PORTAL_BRANDING = {
  institutionName: "RK University",
  shortName: "RKU",
  cityState: "Rajkot, Gujarat",
  emailDomain: "rku.ac.in",
  tpoEmail: IS_DEMO_MODE ? "placement.desk@rku.ac.in" : "tpo@rku.ac.in",
  superAdminEmail: IS_DEMO_MODE ? DEMO_SUPER_ADMIN_EMAIL : "admin@rku.ac.in",
  phone: IS_DEMO_MODE ? "+91 281 240 0190" : "+91 2827 255734",
  policyLabel: IS_DEMO_MODE ? "Campus Feed Policy" : "Standard RKU",
  securityFooter: "Protected by RKU Placement Security Layer",
  officers: IS_DEMO_MODE
    ? [
        {
          name: "Dr. Harshadrai Trivedi",
          department: "Dean & Chief Placement Officer",
          mobile: "+91 90112 34001",
          email: "harshad.trivedi@rku.ac.in",
        },
        {
          name: "Prof. Bhavna Solanki",
          department: "Senior Placement Coordinator",
          mobile: "+91 90112 34002",
          email: "bhavna.solanki@rku.ac.in",
        },
      ]
    : [
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
    email: "devansh.pandya@rku.ac.in",
    password: "Student@123",
    description: "Browse open drives, apply to jobs, view interviews & profile",
  },
  {
    key: "student_placed",
    label: "Student (Placed)",
    badge: "Offer History",
    role: "Student",
    email: "moksha.parmar@rku.ac.in",
    password: "Student@123",
    description: "See verified placement offer & One-Student-One-Job policy",
  },
  {
    key: "super_admin",
    label: "Super Admin (TPO)",
    badge: "Full Control",
    role: "Admin",
    email: "tpo.director@rku.ac.in",
    password: "Admin@123",
    description: "Approve students & JDs, manage applications, interviews & users",
  },
  {
    key: "sub_admin",
    label: "Coordinator (Admin)",
    badge: "Role Scoped",
    role: "Admin",
    email: "placement.lead@rku.ac.in",
    password: "Admin@123",
    description: "Placement coordinator access (restricted user management)",
  },
];
