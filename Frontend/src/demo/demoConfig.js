/**
 * Demo / Seed Mode Configuration
 *
 * - In local development (`npm run dev`), IS_DEMO_MODE is false so the app
 *   connects directly to the local Express + PostgreSQL backend as usual.
 * - In production builds (e.g. Vercel deployment), IS_DEMO_MODE defaults to true
 *   (unless VITE_DEMO_MODE="false" is explicitly provided) so the portal runs
 *   purely on the shared Indian feed dataset with session-only mutations that recover on logout.
 */
export const IS_DEMO_MODE =
  import.meta.env.VITE_DEMO_MODE === "true" ||
  (import.meta.env.PROD && import.meta.env.VITE_DEMO_MODE !== "false");

export const DEMO_SUPER_ADMIN_EMAIL = "tpo.head@rku.ac.in";

export const PORTAL_BRANDING = {
  institutionName: "RK University",
  shortName: "RKU",
  cityState: "Rajkot, Gujarat",
  emailDomain: "rku.ac.in",
  tpoEmail: IS_DEMO_MODE ? "tpo.head@rku.ac.in" : "tpo@rku.ac.in",
  superAdminEmail: IS_DEMO_MODE ? DEMO_SUPER_ADMIN_EMAIL : "admin@rku.ac.in",
  phone: IS_DEMO_MODE ? "+91 98254 41001" : "+91 2827 255734",
  policyLabel: IS_DEMO_MODE ? "Campus Feed Policy" : "Standard RKU",
  securityFooter: "Protected by RKU Placement Security Layer",
  officers: IS_DEMO_MODE
    ? [
        {
          name: "Dr. Pratiksha Pandya",
          department: "Head of Training & Placement Cell",
          mobile: "+91 98254 41001",
          email: "tpo.head@rku.ac.in",
        },
        {
          name: "Prof. Mihir Upadhyay",
          department: "Assistant Training & Placement Officer",
          mobile: "+91 98254 41002",
          email: "tpo.coord@rku.ac.in",
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
    email: "vihaan.chavda@rku.ac.in",
    password: "FeedStud@2026",
    description: "Browse open drives, apply to jobs, view interviews & profile",
  },
  {
    key: "student_placed",
    label: "Student (Placed)",
    badge: "Offer History",
    role: "Student",
    email: "niharika.solanki@rku.ac.in",
    password: "FeedStud@2026",
    description: "See verified placement offer & One-Student-One-Job policy",
  },
  {
    key: "super_admin",
    label: "Super Admin (TPO)",
    badge: "Full Control",
    role: "Admin",
    email: "tpo.head@rku.ac.in",
    password: "DemoAdmin@2026",
    description: "Approve students & JDs, manage applications, interviews & users",
  },
  {
    key: "sub_admin",
    label: "Coordinator (Admin)",
    badge: "Role Scoped",
    role: "Admin",
    email: "tpo.coord@rku.ac.in",
    password: "DemoSub@2026",
    description: "Placement coordinator access (restricted user management)",
  },
];
