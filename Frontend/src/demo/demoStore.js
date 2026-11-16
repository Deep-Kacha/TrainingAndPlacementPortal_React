import { getInitialSeedData } from "./seedData";

const STORAGE_KEY = "tnp_demo_db_synced_v2";
const SEED_VERSION = "2026-11-12-net-sync-v1";

function clone(data) {
  return JSON.parse(JSON.stringify(data));
}

export function getDemoDb() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed._seedVersion === SEED_VERSION) {
        return parsed;
      }
    }
    sessionStorage.removeItem("tnp_demo_db_v1");
  } catch {
    // ignore storage errors and fall back to seed
  }
  const initial = { ...clone(getInitialSeedData()), _seedVersion: SEED_VERSION };
  saveDemoDb(initial);
  return initial;
}

export function saveDemoDb(db) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...db, _seedVersion: SEED_VERSION }));
  } catch {
    // ignore quota errors
  }
}

export function resetDemoDb() {
  try {
    sessionStorage.removeItem("tnp_demo_db_v1");
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore storage errors
  }
}

function extractBearerToken(options) {
  const headers = options?.headers;
  let authHeader = null;
  if (headers) {
    if (typeof headers.get === "function") {
      authHeader = headers.get("Authorization") || headers.get("authorization");
    } else {
      authHeader = headers.Authorization || headers.authorization;
    }
  }
  if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
    return authHeader.slice(7).trim();
  }
  return null;
}

export function getCurrentDemoUser(db, options = null) {
  try {
    const headerToken = extractBearerToken(options);
    const token = headerToken || localStorage.getItem("token");
    const userJson = !headerToken ? localStorage.getItem("user") : null;
    let userId = null;

    if (token && token.startsWith("demo-token-")) {
      const parsed = parseInt(token.replace("demo-token-", ""), 10);
      if (!Number.isNaN(parsed)) userId = parsed;
    }

    if (!userId && userJson) {
      const u = JSON.parse(userJson);
      userId = u?.id;
    }

    if (!userId) return null;
    return db.users.find((u) => u.id === userId) || null;
  } catch {
    return null;
  }
}

// Lightweight local event bus to mirror Socket.IO refresh signals in Demo Mode
const listeners = new Map();

export const demoEventBus = {
  on(event, fn) {
    if (!listeners.has(event)) listeners.set(event, new Set());
    listeners.get(event).add(fn);
  },
  off(event, fn) {
    const set = listeners.get(event);
    if (!set) return;
    if (fn) set.delete(fn);
    else listeners.delete(event);
  },
  emit(event) {
    const set = listeners.get(event);
    if (!set) return;
    set.forEach((fn) => {
      try {
        fn();
      } catch {
        // ignore listener errors
      }
    });
  },
};

export function openDemoDocument(type, student) {
  const isConsent = type === "consent";
  const title = isConsent ? "Student Placement Consent Form" : "Placement Fee Payment Receipt";
  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${title} - ${student.fullName || student.name}</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #f3f4f6; padding: 32px; color: #111827; }
    .card { max-width: 640px; margin: 0 auto; background: #fff; border-radius: 12px; padding: 28px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border-top: 6px solid #dc2626; }
    .badge { display: inline-block; background: #dcfce7; color: #166534; font-weight: 700; font-size: 12px; padding: 4px 10px; border-radius: 999px; }
    h1 { font-size: 20px; margin: 8px 0 4px; }
    p.sub { color: #6b7280; font-size: 13px; margin: 0 0 20px; }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    td { padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; }
    td.label { color: #6b7280; width: 42%; font-weight: 600; }
    .note { margin-top: 20px; font-size: 12px; color: #6b7280; background: #f9fafb; padding: 12px; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">${isConsent ? "VERIFIED CONSENT (DEMO)" : "PAID ₹9,500 (DEMO)"}</span>
    <h1>${title}</h1>
    <p class="sub">RK University — Training &amp; Placement Cell (Demo Preview)</p>
    <table>
      <tr><td class="label">Student Name</td><td><strong>${student.fullName || student.name}</strong></td></tr>
      <tr><td class="label">Enrollment No.</td><td>${student.enrollmentNumber || student.enrollment}</td></tr>
      <tr><td class="label">Department</td><td>${student.branch || student.course}</td></tr>
      <tr><td class="label">Official Email</td><td>${student.email}</td></tr>
      <tr><td class="label">Document Reference</td><td>${isConsent ? student.consentFormPath : student.paymentProofPath}</td></tr>
      <tr><td class="label">Status</td><td>Verified for Campus Placement Drive 2026</td></tr>
    </table>
    <div class="note">
      This is a generated sample document preview for demonstration mode. No real student files are exposed.
    </div>
  </div>
</body>
</html>`;
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank", "noopener,noreferrer");
}
