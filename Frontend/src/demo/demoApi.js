import { PORTAL_BRANDING } from "./demoConfig";
import { demoEventBus, getCurrentDemoUser, getDemoDb, saveDemoDb } from "./demoStore";

const jsonResponse = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const validatePasswordStrength = (password) => {
  if (!password || password.length < 8) return "Password must be at least 8 characters long.";
  if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";
  if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter.";
  if (!/\d/.test(password)) return "Password must contain at least one number.";
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return "Password must contain at least one special character.";
  return null;
};

async function parseBody(options) {
  if (!options || !options.body) return {};
  if (typeof options.body === "string") {
    try {
      return JSON.parse(options.body);
    } catch {
      return {};
    }
  }
  if (options.body instanceof FormData) {
    const obj = {};
    for (const [k, v] of options.body.entries()) {
      if (v instanceof File) {
        obj[k] = v.name;
      } else {
        try {
          if (typeof v === "string" && (v.startsWith("[") || v.startsWith("{"))) {
            obj[k] = JSON.parse(v);
          } else {
            obj[k] = v;
          }
        } catch {
          obj[k] = v;
        }
      }
    }
    return obj;
  }
  return {};
}

function getResolvedCompanyName(db, job) {
  if (job.company_id) {
    const comp = db.companies_profile.find((c) => c.id === job.company_id);
    if (comp) return comp.company_name;
  }
  return job.company_name || "Unknown Company";
}

function getResolvedCompanyWebsite(db, job) {
  if (job.company_id) {
    const comp = db.companies_profile.find((c) => c.id === job.company_id);
    if (comp?.website) return comp.website;
  }
  return job.website || "";
}

function parseCtcNumber(ctcStr) {
  if (!ctcStr) return 0;
  const match = String(ctcStr).match(/([\d.]+)/);
  return match ? parseFloat(match[1]) : 0;
}

export async function handleDemoRequest(urlString, options = {}) {
  const url = new URL(urlString, window.location.origin);
  const path = url.pathname;
  const method = (options.method || "GET").toUpperCase();
  const body = await parseBody(options);
  const db = getDemoDb();

  // ── 1. AUTH & GUEST ROUTES ────────────────────────────────────────────────
  if (path === "/api/auth/login" && method === "POST") {
    const { email, password, role } = body;
    const targetRole = String(role || "").toLowerCase();
    const user = db.users.find(
      (u) => u.email.toLowerCase() === String(email || "").trim().toLowerCase() && u.role === targetRole
    );

    if (!user || user.password !== password) {
      return jsonResponse({ error: "Invalid credentials or role." }, 401);
    }
    if (user.role === "student" && !user.is_approved) {
      return jsonResponse({ error: "Your account is pending admin approval." }, 403);
    }
    if (user.role === "admin" && !user.is_approved) {
      return jsonResponse({ error: "Your admin account has been disabled. Contact super admin." }, 403);
    }

    return jsonResponse({
      message: "Login successful",
      token: `demo-token-${user.id}`,
      user: { id: user.id, name: user.name, role: user.role, email: user.email },
    });
  }

  if (path === "/api/auth/register" && method === "POST") {
    const {
      name,
      universityEmail,
      password,
      enrollment,
      branch,
      semester,
      cgpa,
      mobile,
      personalEmail,
      tenth,
      twelfth,
      backlogs,
      parentName,
      parentEmail,
      parentMobile,
      currentAddress,
      permanentAddress,
      city,
      state,
      pincode,
      consentForm,
      paymentProof,
    } = body;

    if (!name || !universityEmail || !password || !enrollment) {
      return jsonResponse({ error: "Please provide all required fields." }, 400);
    }
    if (db.users.some((u) => u.email.toLowerCase() === String(universityEmail).toLowerCase())) {
      return jsonResponse({ error: "Email already registered." }, 400);
    }

    const userId = db.nextIds.user++;
    const profileId = db.nextIds.studentProfile++;

    db.users.push({
      id: userId,
      name,
      email: universityEmail,
      password,
      role: "pending",
      is_approved: false,
      created_at: new Date().toISOString(),
    });

    db.students_profile.push({
      id: profileId,
      user_id: userId,
      enrollment_no: enrollment,
      department: branch,
      current_year: Number(semester) >= 7 ? 4 : 3,
      semester: Number(semester) || 6,
      cgpa: cgpa || "0",
      resume_url: null,
      contact_number: mobile,
      consent_form_url: consentForm || `demo-consent-${enrollment}`,
      payment_proof_url: paymentProof || `demo-payment-${enrollment}`,
      personal_email: personalEmail,
      tenth_percentage: tenth,
      twelfth_percentage: twelfth,
      backlogs: Number(backlogs) || 0,
      parent_name: parentName,
      parent_email: parentEmail,
      parent_mobile: parentMobile,
      current_address: currentAddress,
      permanent_address: permanentAddress,
      city,
      state,
      pincode,
      is_paid: true,
    });

    saveDemoDb(db);
    demoEventBus.emit("REFRESH_STUDENTS");
    demoEventBus.emit("REFRESH_STATS");
    return jsonResponse({ message: "Registration successful. Pending admin approval." }, 201);
  }

  if (path === "/api/auth/forgot-password" && method === "POST") {
    const { email, enrollment, newPassword } = body;
    if (!email || !newPassword) {
      return jsonResponse({ success: false, error: "Email and new password are required." }, 400);
    }
    const strengthErr = validatePasswordStrength(newPassword);
    if (strengthErr) {
      return jsonResponse({ success: false, error: strengthErr }, 400);
    }

    const user = db.users.find((u) => u.email.toLowerCase() === String(email).toLowerCase());
    if (!user) {
      return jsonResponse({ success: false, error: "No account found with this email." }, 404);
    }

    if (user.role === "student") {
      if (!enrollment) {
        return jsonResponse({ success: false, error: "Enrollment number is required for verification." }, 400);
      }
      const sp = db.students_profile.find((s) => s.user_id === user.id && s.enrollment_no === enrollment);
      if (!sp) {
        return jsonResponse({ success: false, error: "Email and Enrollment Number do not match our records." }, 403);
      }
    }

    user.password = newPassword;
    saveDemoDb(db);
    return jsonResponse({ success: true, message: "Password reset successful. You can now login." });
  }

  if (path === "/api/auth/payment/create-order" && method === "POST") {
    const amount = Number(body.amount) || 9500;
    return jsonResponse({
      success: true,
      order_id: `order_demo_${Date.now()}`,
      amount: amount * 100,
      key_id: "rzp_test_demo",
      is_demo: true,
    });
  }

  if (path === "/api/guest/stats" && method === "GET") {
    const studentsCount = db.students_profile.length;
    const placedSet = new Set(db.placement_history.map((p) => p.student_id));
    const placedCount = placedSet.size;
    const placementRate = studentsCount > 0 ? Math.round((placedCount / studentsCount) * 100) : 0;
    const totalCompanies = db.companies_profile.length;
    let highest = "18.0 LPA";
    if (db.placement_history.length > 0) {
      const sorted = [...db.placement_history].sort(
        (a, b) => parseCtcNumber(b.ctc_offered) - parseCtcNumber(a.ctc_offered)
      );
      if (sorted[0]?.ctc_offered) highest = sorted[0].ctc_offered;
    }

    return jsonResponse({
      success: true,
      data: [
        { value: `${studentsCount}+`, label: "Registered Students" },
        { value: `${placementRate}%`, label: "Placement Rate" },
        { value: `${totalCompanies}+`, label: "Recruiters" },
        { value: highest, label: "Highest Package" },
      ],
    });
  }

  if (path === "/api/guest/contact-officers" && method === "GET") {
    const admins = db.users
      .filter((u) => u.role === "admin" && u.is_approved)
      .slice(0, 2)
      .map((u) => {
        const ap = db.admins_profile.find((p) => p.user_id === u.id) || {};
        return {
          name: u.name,
          email: u.email,
          mobile: ap.mobile || PORTAL_BRANDING.phone,
          department: ap.department || "Training & Placement Cell",
        };
      });
    return jsonResponse({
      success: true,
      data: admins.length > 0 ? admins : PORTAL_BRANDING.officers,
    });
  }

  if (path === "/api/guest/submit-jd" && method === "POST") {
    const {
      email,
      companyName,
      jobLocation,
      website,
      description,
      jobPosition,
      ctc,
      internshipDuration,
      stipend,
      bond,
      joinDate,
      eligibleBatches,
      eligibleCourses,
      selectionProcess,
      driveDate,
      registrationLink,
      contactName,
      contactEmail,
      contactMobile,
      additionalInfo,
      minCgpa,
      deadline,
    } = body;

    if (!companyName || !email || !jobPosition) {
      return jsonResponse({ success: false, error: "Please provide all required fields." }, 400);
    }

    const newJobId = db.nextIds.job++;
    db.jobs.unshift({
      id: newJobId,
      company_id: null,
      company_name: companyName,
      job_title: `${companyName} - ${jobPosition}`,
      job_position: jobPosition,
      job_type: "Full Time",
      description: description || `${jobPosition} opening at ${companyName}.`,
      required_skills: "",
      eligibility_criteria: "",
      ctc_package: ctc || "",
      stipend: stipend || "",
      bond: bond || "",
      location: jobLocation || "",
      joining_date: joinDate || null,
      internship_duration: internshipDuration || "",
      eligible_batches: Array.isArray(eligibleBatches) ? eligibleBatches : [],
      eligible_courses: Array.isArray(eligibleCourses) ? eligibleCourses : [],
      selection_process: selectionProcess || "",
      drive_date: driveDate || null,
      registration_link: registrationLink || "",
      application_deadline: deadline || null,
      website: website || "",
      contact_person_name: contactName || "",
      contact_person_email: contactEmail || email,
      contact_person_mobile: contactMobile || "",
      additional_info: additionalInfo || "",
      min_cgpa: minCgpa || "0",
      status: "pending",
      created_at: new Date().toISOString(),
    });

    saveDemoDb(db);
    demoEventBus.emit("REFRESH_JOBS");
    demoEventBus.emit("REFRESH_STATS");
    return jsonResponse(
      {
        success: true,
        message: "JD submitted successfully! An administrator will review it and contact you soon.",
        jobId: newJobId,
      },
      201
    );
  }

  // ── 2. ADMIN ROUTES (RBAC Enforced) ───────────────────────────────────────
  if (path.startsWith("/api/admin/") || path.startsWith("/api/applications/admin/")) {
    const caller = getCurrentDemoUser(db, options);
    if (!caller) {
      return jsonResponse({ success: false, error: "Unauthorized" }, 401);
    }
    if (caller.role !== "admin" || !caller.is_approved) {
      return jsonResponse({ success: false, error: "Forbidden: Approved admin access required." }, 403);
    }

    if (path === "/api/admin/stats" && method === "GET") {
    const totalStudents = db.students_profile.length;
    const pendingApprovals = db.users.filter((u) => (u.role === "student" || u.role === "pending") && !u.is_approved).length;
    const activeJobs = db.jobs.filter((j) => j.status === "approved").length;
    const totalApplications = db.applications.length;
    const shortlisted = db.applications.filter((a) => a.status === "shortlisted").length;
    const selected = db.applications.filter((a) => a.status === "selected").length;

    const companyMap = new Map();
    db.applications.forEach((app) => {
      const job = db.jobs.find((j) => j.id === app.job_id);
      if (!job) return;
      const compName = getResolvedCompanyName(db, job);
      if (!companyMap.has(compName)) {
        companyMap.set(compName, { company: compName, total: 0, placed: 0 });
      }
      const entry = companyMap.get(compName);
      entry.total += 1;
      if (app.status === "selected") entry.placed += 1;
    });

    const placementsByCompany = Array.from(companyMap.values())
      .sort((a, b) => b.placed - a.placed || b.total - a.total)
      .slice(0, 10);

    return jsonResponse({
      success: true,
      data: {
        totalStudents,
        pendingApprovals,
        activeJobs,
        totalApplications,
        shortlisted,
        selected,
        placementsByCompany,
      },
    });
  }

    if (path === "/api/admin/profile" && method === "GET") {
      const ap = db.admins_profile.find((p) => p.user_id === caller.id) || {};
      return jsonResponse({
        success: true,
        data: {
          name: caller.name,
          email: caller.email,
          role: caller.role,
          employeeId: ap.employee_id || "",
          department: ap.department || "",
          location: ap.location || "",
          mobile: ap.mobile || "",
          isSuperAdmin: caller.email === PORTAL_BRANDING.superAdminEmail,
        },
      });
    }

    if (path === "/api/admin/profile" && method === "PUT") {
      const { name, email, employeeId, department, location, mobile } = body;
      caller.name = name || caller.name;
      caller.email = email || caller.email;

      let ap = db.admins_profile.find((p) => p.user_id === caller.id);
      if (!ap) {
        ap = { id: db.nextIds.adminProfile++, user_id: caller.id };
        db.admins_profile.push(ap);
      }
      ap.employee_id = employeeId || "";
      ap.department = department || "";
      ap.location = location || "";
      ap.mobile = mobile || "";

      saveDemoDb(db);
      return jsonResponse({ success: true, message: "Profile updated successfully" });
    }

    if (path === "/api/admin/change-password" && method === "PUT") {
      const { currentPassword, newPassword } = body;
      if (caller.password !== currentPassword) {
        return jsonResponse({ success: false, error: "Invalid current password" }, 401);
      }
      caller.password = newPassword;
      saveDemoDb(db);
      return jsonResponse({ success: true, message: "Password updated successfully" });
    }

    if (path === "/api/admin/users" && method === "GET") {
      const admins = db.users
        .filter((u) => u.role === "admin")
        .map((u) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          is_approved: u.is_approved,
          created_at: u.created_at,
        }));
      return jsonResponse({ success: true, data: admins });
    }

    if (path === "/api/admin/add-user" && method === "POST") {
      if (caller.email !== PORTAL_BRANDING.superAdminEmail) {
        return jsonResponse({ success: false, error: "Only the super admin can add portal users." }, 403);
      }
      const { email, password } = body;
      if (!email || !password) {
        return jsonResponse({ success: false, error: "Email and password are required." }, 400);
      }
      if (db.users.some((u) => u.email.toLowerCase() === String(email).toLowerCase())) {
        return jsonResponse({ success: false, error: "User already exists with this email." }, 409);
      }
      const newId = db.nextIds.user++;
      db.users.push({
        id: newId,
        name: "Portal Admin",
        email,
        password,
        role: "admin",
        is_approved: true,
        created_at: new Date().toISOString(),
      });
      saveDemoDb(db);
      return jsonResponse({ success: true, message: "User added successfully", data: { email, password, id: newId } }, 201);
    }

    const toggleUserMatch = path.match(/^\/api\/admin\/users\/(\d+)\/toggle$/);
    if (toggleUserMatch && method === "PUT") {
      if (caller.email !== PORTAL_BRANDING.superAdminEmail) {
        return jsonResponse({ success: false, error: "Only the super admin can enable/disable users." }, 403);
      }
      const targetId = parseInt(toggleUserMatch[1], 10);
      if (targetId === caller.id) {
        return jsonResponse({ success: false, error: "You cannot disable your own account." }, 400);
      }
      const target = db.users.find((u) => u.id === targetId && u.role === "admin");
      if (!target) return jsonResponse({ success: false, error: "Admin user not found." }, 404);
      if (target.email === PORTAL_BRANDING.superAdminEmail) {
        return jsonResponse({ success: false, error: "Cannot disable the super admin account." }, 400);
      }
      target.is_approved = !target.is_approved;
      saveDemoDb(db);
      return jsonResponse({
        success: true,
        message: target.is_approved ? "User enabled successfully." : "User disabled successfully.",
        is_approved: target.is_approved,
      });
    }

    const deleteUserMatch = path.match(/^\/api\/admin\/users\/(\d+)$/);
    if (deleteUserMatch && method === "DELETE") {
      if (caller.email !== PORTAL_BRANDING.superAdminEmail) {
        return jsonResponse({ success: false, error: "Only the super admin can remove users." }, 403);
      }
    const targetId = parseInt(deleteUserMatch[1], 10);
    if (targetId === caller.id) {
      return jsonResponse({ success: false, error: "You cannot delete your own account." }, 400);
    }
    const target = db.users.find((u) => u.id === targetId && u.role === "admin");
    if (!target) return jsonResponse({ success: false, error: "Admin user not found." }, 404);
    if (target.email === PORTAL_BRANDING.superAdminEmail) {
      return jsonResponse({ success: false, error: "Cannot delete the super admin account." }, 400);
    }
    db.users = db.users.filter((u) => u.id !== targetId);
    saveDemoDb(db);
    return jsonResponse({ success: true, message: "User removed successfully." });
  }

  if (path === "/api/admin/companies" && method === "GET") {
    const rows = [...db.jobs]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .map((j) => ({
        id: j.id,
        name: getResolvedCompanyName(db, j),
        role: j.job_title,
        salary: j.ctc_package,
        location: j.location,
        process: j.selection_process,
        status: j.status,
      }));
    return jsonResponse({ success: true, data: rows });
  }

  const compStatusMatch = path.match(/^\/api\/admin\/companies\/(\d+)\/status$/);
  if (compStatusMatch && method === "PUT") {
    const id = parseInt(compStatusMatch[1], 10);
    const { status } = body;
    if (!["pending", "approved", "rejected"].includes(status)) {
      return jsonResponse({ success: false, error: "Invalid status value" }, 400);
    }
    const job = db.jobs.find((j) => j.id === id);
    if (!job) return jsonResponse({ success: false, error: "Job posting not found" }, 404);
    job.status = status;
    saveDemoDb(db);
    demoEventBus.emit("REFRESH_JOBS");
    demoEventBus.emit("REFRESH_STATS");
    return jsonResponse({ success: true, message: `Status updated to ${status}` });
  }

  const jobDetailMatch = path.match(/^\/api\/admin\/jobs\/(\d+)$/);
  if (jobDetailMatch && method === "GET") {
    const id = parseInt(jobDetailMatch[1], 10);
    const job = db.jobs.find((j) => j.id === id);
    if (!job) return jsonResponse({ success: false, error: "Job details not found" }, 404);
    return jsonResponse({
      success: true,
      data: {
        ...job,
        resolved_company_name: getResolvedCompanyName(db, job),
      },
    });
  }

  if (jobDetailMatch && method === "PUT") {
    const id = parseInt(jobDetailMatch[1], 10);
    const job = db.jobs.find((j) => j.id === id);
    if (!job) return jsonResponse({ success: false, error: "Job details not found" }, 404);
    Object.assign(job, {
      job_position: body.job_position ?? job.job_position,
      job_title: body.job_position ?? job.job_title,
      description: body.description ?? job.description,
      ctc_package: body.ctc_package ?? job.ctc_package,
      location: body.location ?? job.location,
      website: body.website ?? job.website,
      stipend: body.stipend ?? job.stipend,
      bond: body.bond ?? job.bond,
      joining_date: body.joining_date ?? job.joining_date,
      eligible_batches: body.eligible_batches ?? job.eligible_batches,
      eligible_courses: body.eligible_courses ?? job.eligible_courses,
      selection_process: body.selection_process ?? job.selection_process,
      drive_date: body.drive_date ?? job.drive_date,
      registration_link: body.registration_link ?? job.registration_link,
      contact_person_name: body.contact_person_name ?? job.contact_person_name,
      contact_person_email: body.contact_person_email ?? job.contact_person_email,
      contact_person_mobile: body.contact_person_mobile ?? job.contact_person_mobile,
      additional_info: body.additional_info ?? job.additional_info,
      min_cgpa: body.min_cgpa ?? job.min_cgpa,
      application_deadline: body.application_deadline ?? job.application_deadline,
    });
    saveDemoDb(db);
    demoEventBus.emit("REFRESH_JOBS");
    return jsonResponse({ success: true, message: "Job details updated successfully!", data: job });
  }

  if (path === "/api/admin/students" && method === "GET") {
    const formatted = db.users
      .filter((u) => u.role === "student" || u.role === "pending")
      .map((u) => {
        const sp = db.students_profile.find((s) => s.user_id === u.id);
        if (!sp) return null;
        return {
          id: u.id,
          name: u.name,
          enrollment: sp.enrollment_no,
          course: sp.department || "N/A",
          batch: sp.semester ? `Sem ${sp.semester}` : "N/A",
          cgpa: sp.cgpa || "N/A",
          email: u.email,
          approved: u.is_approved,
          registeredAt: u.created_at,
          consentFormPath: sp.consent_form_url,
          paymentProofPath: sp.payment_proof_url,
          personalEmail: sp.personal_email,
          tenth: sp.tenth_percentage,
          twelfth: sp.twelfth_percentage,
          backlogs: sp.backlogs,
          parentName: sp.parent_name,
          parentEmail: sp.parent_email,
          parentMobile: sp.parent_mobile,
          currentAddress: sp.current_address,
          permanentAddress: sp.permanent_address,
          city: sp.city,
          state: sp.state,
          pincode: sp.pincode,
        };
      })
      .filter(Boolean)
      .sort((a, b) => new Date(b.registeredAt) - new Date(a.registeredAt));
    return jsonResponse(formatted);
  }

  const studentActionMatch = path.match(/^\/api\/admin\/students\/(\d+)\/(approve|reject)$/);
  if (studentActionMatch && method === "PUT") {
    const id = parseInt(studentActionMatch[1], 10);
    const action = studentActionMatch[2];
    const user = db.users.find((u) => u.id === id);
    if (!user) return jsonResponse({ success: false, error: "Student not found" }, 404);
    if (action === "approve") {
      user.is_approved = true;
      user.role = "student";
    } else {
      user.is_approved = false;
    }
    saveDemoDb(db);
    demoEventBus.emit("REFRESH_STUDENTS");
    demoEventBus.emit("REFRESH_STATS");
    return jsonResponse({
      success: true,
      message: action === "approve" ? "Student approved successfully." : "Student rejected/set to pending.",
    });
  }

  const studentDeleteMatch = path.match(/^\/api\/admin\/students\/(\d+)$/);
  if (studentDeleteMatch && method === "DELETE") {
    const id = parseInt(studentDeleteMatch[1], 10);
    const sp = db.students_profile.find((s) => s.user_id === id);
    if (sp) {
      db.applications = db.applications.filter((a) => a.student_id !== sp.id);
      db.placement_history = db.placement_history.filter((p) => p.student_id !== sp.id);
      db.students_profile = db.students_profile.filter((s) => s.user_id !== id);
    }
    db.users = db.users.filter((u) => u.id !== id);
    saveDemoDb(db);
    demoEventBus.emit("REFRESH_STUDENTS");
    demoEventBus.emit("REFRESH_STATS");
    return jsonResponse({ success: true, message: "Student deleted permanently." });
  }

  if (path === "/api/applications/admin/applied-companies" && method === "GET") {
    const jobsWithApps = db.jobs
      .map((j) => {
        const count = db.applications.filter((a) => a.job_id === j.id).length;
        if (count === 0) return null;
        return {
          jobPostingId: j.id,
          companyName: getResolvedCompanyName(db, j),
          jobRole: j.job_title,
          applicationCount: count,
        };
      })
      .filter(Boolean);
    return jsonResponse({ success: true, data: jobsWithApps });
  }

  const jobStudentsMatch = path.match(/^\/api\/applications\/admin\/job\/(\d+)\/students$/);
  if (jobStudentsMatch && method === "GET") {
    const jobId = parseInt(jobStudentsMatch[1], 10);
    const students = db.applications
      .filter((a) => a.job_id === jobId)
      .map((a) => {
        const sp = db.students_profile.find((s) => s.id === a.student_id);
        const u = sp ? db.users.find((usr) => usr.id === sp.user_id) : null;
        if (!sp || !u) return null;
        return {
          applicationId: a.id,
          studentName: u.name,
          enrollmentNumber: sp.enrollment_no,
          branch: sp.department,
          semester: sp.semester,
          cgpa: sp.cgpa,
          applicationStatus: a.status,
          appliedAt: a.applied_at,
        };
      })
      .filter(Boolean)
      .sort((a, b) => parseFloat(b.cgpa) - parseFloat(a.cgpa));

    const schedules = db.interview_schedules
      .filter((s) => s.job_id === jobId)
      .sort((a, b) => new Date(a.interview_date) - new Date(b.interview_date));

    return jsonResponse({ success: true, data: students, schedules });
  }

  const appStatusMatch = path.match(/^\/api\/applications\/admin\/(\d+)\/status$/);
  if (appStatusMatch && method === "PUT") {
    const appId = parseInt(appStatusMatch[1], 10);
    const normalizedStatus = String(body.status || "").toLowerCase();
    const app = db.applications.find((a) => a.id === appId);
    if (!app) return jsonResponse({ success: false, error: "Application not found" }, 404);
    app.status = normalizedStatus;

    if (normalizedStatus === "selected") {
      const exists = db.placement_history.some(
        (ph) => ph.student_id === app.student_id && ph.job_id === app.job_id
      );
      if (!exists) {
        const job = db.jobs.find((j) => j.id === app.job_id);
        if (job) {
          db.placement_history.push({
            id: db.nextIds.placement++,
            student_id: app.student_id,
            job_id: app.job_id,
            company_name: getResolvedCompanyName(db, job),
            job_title: job.job_title,
            ctc_offered: job.ctc_package,
            offer_letter_url: null,
            placement_date: new Date().toISOString().split("T")[0],
            created_at: new Date().toISOString(),
          });
        }
      }
    }

    saveDemoDb(db);
    demoEventBus.emit("REFRESH_APPLICATIONS");
    demoEventBus.emit("REFRESH_STATS");
    return jsonResponse({
      success: true,
      message: `Status updated to ${normalizedStatus} and synced to history if selected.`,
    });
  }

  if (path === "/api/admin/interviews" && method === "GET") {
    const data = db.jobs
      .filter((j) => j.status === "approved" || j.status === "closed")
      .map((j) => ({
        id: j.id,
        name: getResolvedCompanyName(db, j),
        role: j.job_title,
        salary: j.ctc_package,
        location: j.location,
        process: j.selection_process,
        driveDate: j.drive_date,
        jobStatus: j.status,
        status: j.status === "approved" ? "Scheduled Interview (Pending)" : "Scheduled Interview (Complete)",
        schedules: db.interview_schedules
          .filter((s) => s.job_id === j.id)
          .sort((a, b) => new Date(a.interview_date) - new Date(b.interview_date)),
      }));
    return jsonResponse({ success: true, data });
  }

  if (path === "/api/admin/interviews" && method === "POST") {
    const { job_id, round_name, interview_date, interview_time, mode, venue_or_link } = body;
    if (!job_id || !round_name || !interview_date || !interview_time) {
      return jsonResponse({ success: false, error: "job_id, round_name, interview_date and interview_time are required." }, 400);
    }
    const created = {
      id: db.nextIds.schedule++,
      job_id: Number(job_id),
      round_name,
      interview_date,
      interview_time: interview_time.length === 5 ? `${interview_time}:00` : interview_time,
      mode: mode || null,
      venue_or_link: venue_or_link || null,
    };
    db.interview_schedules.push(created);
    saveDemoDb(db);
    demoEventBus.emit("REFRESH_INTERVIEWS");
    return jsonResponse({ success: true, message: "Interview schedule created.", data: created }, 201);
  }

  const schedMatch = path.match(/^\/api\/admin\/interviews\/(\d+)$/);
  if (schedMatch && method === "PUT") {
    const scheduleId = parseInt(schedMatch[1], 10);
    const { round_name, interview_date, interview_time, mode, venue_or_link } = body;
    const sched = db.interview_schedules.find((s) => s.id === scheduleId);
    if (!sched) return jsonResponse({ success: false, error: "Interview schedule not found." }, 404);
    sched.round_name = round_name;
    sched.interview_date = interview_date;
    sched.interview_time = interview_time.length === 5 ? `${interview_time}:00` : interview_time;
    sched.mode = mode || null;
    sched.venue_or_link = venue_or_link || null;
    saveDemoDb(db);
    demoEventBus.emit("REFRESH_INTERVIEWS");
    return jsonResponse({ success: true, message: "Interview schedule updated.", data: sched });
  }

  if (schedMatch && method === "DELETE") {
    const scheduleId = parseInt(schedMatch[1], 10);
    db.interview_schedules = db.interview_schedules.filter((s) => s.id !== scheduleId);
    saveDemoDb(db);
    demoEventBus.emit("REFRESH_INTERVIEWS");
    return jsonResponse({ success: true, message: "Interview schedule deleted." });
  }

  if (path === "/api/admin/placements" && method === "GET") {
    const rows = db.placement_history.map((ph) => {
      const sp = db.students_profile.find((s) => s.id === ph.student_id);
      const u = sp ? db.users.find((usr) => usr.id === sp.user_id) : null;
      return {
        id: ph.id,
        company: ph.company_name,
        role: ph.job_title,
        package: ph.ctc_offered,
        offerLetterUrl: ph.offer_letter_url,
        placementDate: ph.placement_date
          ? new Date(ph.placement_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
          : "—",
        createdAt: new Date(ph.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
        studentName: u?.name || "Student",
        enrollmentNo: sp?.enrollment_no || "",
        department: sp?.department || "",
      };
    });
    return jsonResponse({ success: true, data: rows });
  }

  if (path === "/api/admin/placements/summary" && method === "GET") {
    const STATUS_MAP = { approved: "In Progress", pending: "Pending", rejected: "Rejected" };
    const formatDate = (d) => {
      if (!d) return "—";
      const parsed = new Date(d);
      return Number.isNaN(parsed.getTime())
        ? "—"
        : parsed.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    };
    const rows = db.jobs.map((j) => ({
      id: j.id,
      company: getResolvedCompanyName(db, j),
      role: j.job_title,
      package: j.ctc_package,
      status: j.status,
      statusLabel: STATUS_MAP[j.status] || "Unknown",
      driveDate: formatDate(j.drive_date),
      joiningDate: formatDate(j.joining_date),
      placedCount: db.applications.filter((a) => a.job_id === j.id && a.status === "selected").length,
    }));
    return jsonResponse({ success: true, data: rows });
  }

  if (path === "/api/admin/placements" && method === "POST") {
    const { student_id, job_id, company_name, job_title, ctc_offered, offer_letter_url, placement_date } = body;
    if (!student_id || !company_name || !job_title) {
      return jsonResponse({ success: false, error: "student_id, company_name and job_title are required." }, 400);
    }
    const created = {
      id: db.nextIds.placement++,
      student_id: Number(student_id),
      job_id: job_id ? Number(job_id) : null,
      company_name,
      job_title,
      ctc_offered: ctc_offered || null,
      offer_letter_url: offer_letter_url || null,
      placement_date: placement_date || null,
      created_at: new Date().toISOString(),
    };
    db.placement_history.push(created);
    saveDemoDb(db);
    return jsonResponse({ success: true, message: "Placement record added.", data: created }, 201);
  }
  }

  // ── 3. STUDENT ROUTES ─────────────────────────────────────────────────────
  if (path.startsWith("/api/student/")) {
    const user = getCurrentDemoUser(db, options);
    if (!user) return jsonResponse({ success: false, error: "Unauthorized" }, 401);
    if (user.role !== "student" || !user.is_approved) {
      return jsonResponse({ success: false, error: "Forbidden: Approved student access required." }, 403);
    }
    const sp = db.students_profile.find((s) => s.user_id === user.id);
    if (!sp) return jsonResponse({ success: false, error: "Student profile not found" }, 404);

    if (path === "/api/student/dashboard-stats" && method === "GET") {
      const myApps = db.applications.filter((a) => a.student_id === sp.id);
      const isPlaced = db.placement_history.some((ph) => ph.student_id === sp.id);
      return jsonResponse({
        success: true,
        data: {
          studentName: user.name,
          enrollment: sp.enrollment_no,
          isPaid: sp.is_paid,
          counts: {
            applied: myApps.length,
            shortlisted: myApps.filter((a) => a.status === "shortlisted").length,
            interviews: myApps.filter((a) => a.status === "interview").length,
            isPlaced,
          },
        },
      });
    }

    if (path === "/api/student/profile" && method === "GET") {
      return jsonResponse({
        success: true,
        data: {
          name: user.name,
          email: user.email,
          ...sp,
        },
      });
    }

    if (path === "/api/student/profile" && method === "PUT") {
      user.name = body.name ?? user.name;
      Object.assign(sp, {
        enrollment_no: body.enrollment_no ?? sp.enrollment_no,
        department: body.department ?? sp.department,
        current_year: body.current_year ?? sp.current_year,
        semester: body.semester ?? sp.semester,
        cgpa: body.cgpa ?? sp.cgpa,
        contact_number: body.contact_number ?? sp.contact_number,
        personal_email: body.personal_email ?? sp.personal_email,
        tenth_percentage: body.tenth_percentage ?? sp.tenth_percentage,
        twelfth_percentage: body.twelfth_percentage ?? sp.twelfth_percentage,
        backlogs: body.backlogs ?? sp.backlogs,
        parent_name: body.parent_name ?? sp.parent_name,
        current_address: body.current_address ?? sp.current_address,
        permanent_address: body.permanent_address ?? sp.permanent_address,
        city: body.city ?? sp.city,
        state: body.state ?? sp.state,
        pincode: body.pincode ?? sp.pincode,
        resume_url: body.resume_url ?? sp.resume_url,
      });
      saveDemoDb(db);
      demoEventBus.emit("REFRESH_STUDENTS");
      demoEventBus.emit("REFRESH_STATS");
      return jsonResponse({ success: true, message: "Profile updated successfully" });
    }

    if (path === "/api/student/change-password" && method === "PUT") {
      const { currentPassword, newPassword } = body;
      if (!currentPassword || !newPassword) {
        return jsonResponse({ success: false, error: "Please provide both current and new passwords." }, 400);
      }
      const strengthErr = validatePasswordStrength(newPassword);
      if (strengthErr) {
        return jsonResponse({ success: false, error: strengthErr }, 400);
      }
      if (user.password !== currentPassword) {
        return jsonResponse({ success: false, error: "Invalid current password" }, 401);
      }
      user.password = newPassword;
      saveDemoDb(db);
      return jsonResponse({ success: true, message: "Password updated successfully" });
    }

    if (path === "/api/student/jobs" && method === "GET") {
      const isPlacedGlobally = db.placement_history.some((ph) => ph.student_id === sp.id);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const formattedJobs = db.jobs
        .filter((j) => j.status === "approved")
        .map((j) => {
          const app = db.applications.find((a) => a.job_id === j.id && a.student_id === sp.id);
          const deadline = j.application_deadline ? new Date(j.application_deadline) : null;
          const deadlinePassed = deadline ? deadline < today : false;
          const daysLeft = deadline ? Math.ceil((deadline - today) / (1000 * 60 * 60 * 24)) : null;

          return {
            id: j.id,
            company: getResolvedCompanyName(db, j),
            role: j.job_title,
            salary: j.ctc_package,
            location: j.location,
            deadlineRaw: j.application_deadline,
            driveDateRaw: j.drive_date,
            description: j.description,
            requiredSkills: j.required_skills,
            eligibilityCriteria: j.eligibility_criteria,
            selectionProcess: j.selection_process,
            stipend: j.stipend,
            bond: j.bond,
            internshipDuration: j.internship_duration,
            eligibleBatches: j.eligible_batches,
            eligibleCourses: j.eligible_courses,
            minCgpa: j.min_cgpa,
            companyWebsite: getResolvedCompanyWebsite(db, j),
            applicationStatus: app?.status || null,
            applicationId: app?.id || null,
            deadline: deadline
              ? deadline.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
              : "—",
            driveDate: j.drive_date ? new Date(j.drive_date).toLocaleDateString("en-IN") : "—",
            daysLeft,
            deadlinePassed,
            isApplied: Boolean(app),
          };
        });

      return jsonResponse({ success: true, data: formattedJobs, isPlaced: isPlacedGlobally });
    }

    const applyMatch = path.match(/^\/api\/student\/apply\/(\d+)$/);
    if (applyMatch && method === "POST") {
      const jobId = parseInt(applyMatch[1], 10);
      if (db.placement_history.some((ph) => ph.student_id === sp.id)) {
        return jsonResponse(
          {
            success: false,
            error:
              "You have already been selected for a position. Per our placement policy, you are no longer eligible for further job drives.",
          },
          403
        );
      }
      const job = db.jobs.find((j) => j.id === jobId);
      if (!job) return jsonResponse({ success: false, error: "Job not found." }, 404);
      if (job.status !== "approved") {
        return jsonResponse({ success: false, error: "This job is no longer accepting applications." }, 400);
      }
      if (job.application_deadline) {
        const dl = new Date(job.application_deadline);
        dl.setHours(23, 59, 59, 999);
        if (new Date() > dl) {
          return jsonResponse({ success: false, error: "Application deadline has passed." }, 400);
        }
      }
      if (db.applications.some((a) => a.student_id === sp.id && a.job_id === jobId)) {
        return jsonResponse({ success: false, error: "You have already applied for this position." }, 409);
      }

      db.applications.push({
        id: db.nextIds.application++,
        student_id: sp.id,
        job_id: jobId,
        status: "applied",
        applied_at: new Date().toISOString(),
      });

      saveDemoDb(db);
      demoEventBus.emit("REFRESH_APPLICATIONS");
      demoEventBus.emit("REFRESH_STATS");
      return jsonResponse({ success: true, message: "Application submitted successfully!" }, 201);
    }

    if (path === "/api/student/applications" && method === "GET") {
      const STATUS_LABELS = {
        applied: "Pending Review",
        shortlisted: "Shortlisted",
        interview: "In Interview",
        selected: "Selected 🎉",
        rejected: "Not Selected",
      };
      const isPlaced = db.placement_history.some((ph) => ph.student_id === sp.id);
      const data = db.applications
        .filter((a) => a.student_id === sp.id)
        .sort((a, b) => new Date(b.applied_at) - new Date(a.applied_at))
        .map((a) => {
          const j = db.jobs.find((job) => job.id === a.job_id);
          if (!j) return null;
          return {
            applicationId: a.id,
            id: j.id,
            company: getResolvedCompanyName(db, j),
            role: j.job_title,
            salary: j.ctc_package,
            location: j.location,
            driveDate: j.drive_date ? new Date(j.drive_date).toLocaleDateString("en-IN") : "—",
            deadline: j.application_deadline ? new Date(j.application_deadline).toLocaleDateString("en-IN") : "—",
            description: j.description,
            requiredSkills: j.required_skills,
            selectionProcess: j.selection_process,
            bond: j.bond,
            internshipDuration: j.internship_duration,
            stipend: j.stipend,
            companyWebsite: getResolvedCompanyWebsite(db, j),
            eligibleCourses: j.eligible_courses,
            eligibilityCriteria: j.eligibility_criteria,
            eligibleBatches: j.eligible_batches,
            status: a.status,
            appliedAt: new Date(a.applied_at).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
            statusLabel: STATUS_LABELS[a.status] || a.status,
            isApplied: true,
            applicationStatus: a.status,
          };
        })
        .filter(Boolean);

      return jsonResponse({ success: true, data, isPlaced });
    }

    if (path === "/api/student/interviews" && method === "GET") {
      const validApps = db.applications.filter(
        (a) => a.student_id === sp.id && ["applied", "shortlisted", "interview", "selected"].includes(a.status)
      );
      const rows = [];
      validApps.forEach((app) => {
        const j = db.jobs.find((job) => job.id === app.job_id);
        if (!j) return;
        const rounds = db.interview_schedules.filter((s) => s.job_id === j.id);
        rounds.forEach((r) => {
          rows.push({
            id: r.id,
            company: getResolvedCompanyName(db, j),
            role: j.job_title,
            round: r.round_name,
            date: new Date(r.interview_date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
            time: String(r.interview_time || "").slice(0, 5),
            mode: r.mode,
            venue: r.venue_or_link,
            applicationStatus: app.status,
            status: app.status === "selected" ? "Completed" : "Pending",
            statusColor: app.status === "selected" ? "green" : "red",
          });
        });
      });
      return jsonResponse({ success: true, data: rows });
    }

    if (path === "/api/student/placements" && method === "GET") {
      const data = db.applications
        .filter((a) => a.student_id === sp.id)
        .sort((a, b) => new Date(b.applied_at) - new Date(a.applied_at))
        .map((a) => {
          const j = db.jobs.find((job) => job.id === a.job_id);
          if (!j) return null;
          const ph = db.placement_history.find((p) => p.student_id === sp.id && p.job_id === j.id);
          return {
            company: getResolvedCompanyName(db, j),
            role: j.job_title,
            salary: j.ctc_package,
            date: a.applied_at
              ? new Date(a.applied_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
              : "—",
            status: a.status,
            offerLetterUrl: ph?.offer_letter_url || null,
          };
        })
        .filter(Boolean);
      return jsonResponse({ success: true, data });
    }
  }

  // ── 4. COMPANY ROUTES ─────────────────────────────────────────────────────
  if (path.startsWith("/api/company/")) {
    const user = getCurrentDemoUser(db, options);
    if (!user) return jsonResponse({ success: false, error: "Unauthorized" }, 401);
    if (user.role !== "company" || !user.is_approved) {
      return jsonResponse({ success: false, error: "Forbidden: Approved company access required." }, 403);
    }
    const comp =
      db.companies_profile.find((c) => c.user_id === user.id) ||
      db.companies_profile.find((c) => c.id === user.company_id);
    if (!comp) return jsonResponse({ success: false, error: "Company profile not found" }, 404);

    const companyJobs = db.jobs.filter((j) => j.company_id === comp.id);
    const companyJobIds = new Set(companyJobs.map((j) => j.id));
    const companyApps = db.applications.filter((a) => companyJobIds.has(a.job_id));

    if (path === "/api/company/dashboard/stats" && method === "GET") {
      return jsonResponse({
        success: true,
        data: {
          totalJobs: companyJobs.length,
          totalApplicants: companyApps.length,
          totalHired: companyApps.filter((a) => a.status === "selected").length,
        },
      });
    }

    if (path === "/api/company/jobs" && method === "GET") {
      return jsonResponse({ success: true, data: companyJobs });
    }

    if (path === "/api/company/applicants" && method === "GET") {
      const rows = companyApps
        .map((a) => {
          const j = db.jobs.find((job) => job.id === a.job_id);
          const sp = db.students_profile.find((s) => s.id === a.student_id);
          const u = sp ? db.users.find((usr) => usr.id === sp.user_id) : null;
          if (!j || !sp || !u) return null;
          return {
            applicationId: a.id,
            jobTitle: j.job_title,
            studentName: u.name,
            studentEmail: u.email,
            enrollmentNo: sp.enrollment_no,
            cgpa: sp.cgpa,
            department: sp.department,
            applicationStatus: a.status,
            appliedAt: a.applied_at,
          };
        })
        .filter(Boolean);
      return jsonResponse({ success: true, data: rows });
    }
  }

  return jsonResponse({ success: false, error: `Demo route not found: ${method} ${path}` }, 404);
}

let installed = false;
export function installDemoFetch() {
  if (installed || typeof window === "undefined") return;
  installed = true;

  const originalFetch = window.fetch.bind(window);
  window.fetch = async (input, init) => {
    const urlStr = typeof input === "string" ? input : input?.url || "";
    const resolved = new URL(urlStr, window.location.origin);
    if (resolved.pathname.startsWith("/api/")) {
      return handleDemoRequest(resolved.toString(), init);
    }
    return originalFetch(input, init);
  };
}
