/**
 * Smart Attendance Predictor - Complete Application Engine
 * Strict Prototype Fidelity Implementation
 */

// Application State Store with LocalStorage Persistence
const DEFAULT_STATE = {
  auth: {
    isAuthenticated: true,
    studentId: 'CS-2023-8941',
    name: 'Alex Morgan',
    degree: 'B.S. Computer Science',
    degreeShort: 'BS CS',
    semester: 5,
    year: 'Year 3',
    email: 'alex.morgan@university.edu',
    contact: '+1 (555) 234-5678',
    advisor: 'Dr. Alan Kay',
    gpa: '3.82 / 4.0'
  },
  settings: {
    minimumAttendance: 75.0,
    warningBuffer: 3.0,
    emailAlerts: true,
    lastSync: 'Today, 06:00 AM'
  },
  predictor: {
    currentAttended: 156,
    totalConducted: 200,
    upcomingRemaining: 30,
    classesIntend: 25
  },
  subjects: [
    {
      id: 'sub1',
      name: 'Database Management Systems',
      shortName: 'Database Management Systems',
      code: 'CS301',
      professor: 'Prof. Alan Turing',
      professorEmail: 'alan.turing@university.edu',
      attended: 32,
      total: 40,
      syllabusProgress: 75
    },
    {
      id: 'sub2',
      name: 'Data Structures & Algorithms',
      shortName: 'Data Structures & Algorithms',
      code: 'CS302',
      professor: 'Prof. Grace Hopper',
      professorEmail: 'grace.hopper@university.edu',
      attended: 28,
      total: 40,
      syllabusProgress: 85
    },
    {
      id: 'sub3',
      name: 'Java Programming',
      shortName: 'Java Programming',
      code: 'CS303',
      professor: 'Prof. James Gosling',
      professorEmail: 'james.gosling@university.edu',
      attended: 35,
      total: 40,
      syllabusProgress: 60
    },
    {
      id: 'sub4',
      name: 'Mathematics III',
      shortName: 'Mathematics III',
      code: 'MATH301',
      professor: 'Prof. Carl Gauss',
      professorEmail: 'carl.gauss@university.edu',
      attended: 38,
      total: 40,
      syllabusProgress: 90
    }
  ],
  attendanceLogs: [
    {
      id: 'log-1',
      date: 'Oct 07, 2026',
      timeSlot: '09:00–10:00 AM',
      subject: 'Data Structures & Algorithms',
      instructor: 'Prof. Grace Hopper',
      status: 'PRESENT'
    },
    {
      id: 'log-2',
      date: 'Oct 07, 2026',
      timeSlot: '11:00–12:00 PM',
      subject: 'Mathematics III',
      instructor: 'Prof. Carl Gauss',
      status: 'PRESENT'
    },
    {
      id: 'log-3',
      date: 'Oct 07, 2026',
      timeSlot: '02:00–04:00 PM',
      subject: 'DBMS Laboratory',
      instructor: 'Prof. Alan Turing',
      status: 'PRESENT'
    },
    {
      id: 'log-4',
      date: 'Oct 06, 2026',
      timeSlot: '09:00–10:00 AM',
      subject: 'Data Structures & Algorithms',
      instructor: 'Prof. Grace Hopper',
      status: 'ABSENT',
      hasDiscrepancy: false,
      discrepancyNote: ''
    },
    {
      id: 'log-5',
      date: 'Oct 06, 2026',
      timeSlot: '10:00–11:00 AM',
      subject: 'Java Programming',
      instructor: 'Prof. James Gosling',
      status: 'PRESENT'
    },
    {
      id: 'log-6',
      date: 'Oct 05, 2026',
      timeSlot: '01:00–02:00 PM',
      subject: 'Database Management Systems',
      instructor: 'Prof. Alan Turing',
      status: 'PRESENT'
    },
    {
      id: 'log-7',
      date: 'Oct 02, 2026',
      timeSlot: '11:00–12:00 PM',
      subject: 'Mathematics III',
      instructor: 'Prof. Carl Gauss',
      status: 'PRESENT'
    }
  ],
  reports: [
    {
      id: 'rep-1',
      name: 'Mid-Term Official Summary',
      term: 'Fall 2026',
      overallPct: 78.0,
      status: 'ELIGIBLE',
      action: 'Download PDF',
      format: 'pdf'
    },
    {
      id: 'rep-2',
      name: 'Monthly Log (September)',
      term: 'Fall 2026',
      overallPct: 81.2,
      status: 'VERIFIED',
      action: 'Download CSV',
      format: 'csv'
    },
    {
      id: 'rep-3',
      name: 'Monthly Log (August)',
      term: 'Fall 2026',
      overallPct: 84.0,
      status: 'VERIFIED',
      action: 'Download CSV',
      format: 'csv'
    },
    {
      id: 'rep-4',
      name: 'Semester 4 Final Statement',
      term: 'Spring 2026',
      overallPct: 82.5,
      status: 'ARCHIVED',
      action: 'Download PDF',
      format: 'pdf'
    }
  ],
  discrepancies: []
};

// Initialize State from LocalStorage
let appState = (() => {
  try {
    const saved = localStorage.getItem('smart_attendance_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      return Object.assign({}, DEFAULT_STATE, parsed);
    }
  } catch (e) {
    console.error('Failed to load state from localStorage', e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
})();

function saveState() {
  try {
    localStorage.setItem('smart_attendance_state', JSON.stringify(appState));
  } catch (e) {
    console.error('Failed to save state to localStorage', e);
  }
}

function resetToDefaults() {
  appState = JSON.parse(JSON.stringify(DEFAULT_STATE));
  saveState();
  showToast('Restored prototype default state', 'info');
  navigateTo(currentRoute);
}

// Current Route
let currentRoute = 'dashboard';

// Screen metadata matching prototype
const SCREEN_META = {
  login: {
    pageNumber: 1,
    pageBadge: 'PAGE 1 • LOGIN PORTAL',
    appTitle: 'Smart Attendance Predictor',
    purpose: 'Authentication Gateway — Secure login portal for students to access real-time attendance analytics and predictive tools.'
  },
  dashboard: {
    pageNumber: 2,
    pageBadge: 'PAGE 2 • MAIN DASHBOARD & OPTIONS HUB',
    appTitle: 'Smart Attendance',
    purpose: 'Post-Login Navigation Hub — Gives immediate access to key app functions (Subjects, My Attendance, Predictor, Reports, Profile, Settings) along with top-level stats.'
  },
  attendance: {
    pageNumber: 3,
    pageBadge: 'PAGE 3 • MY ATTENDANCE OPTION',
    appTitle: 'Smart Attendance',
    purpose: 'Option 1 - "My Attendance" Screen — Displays individual day-by-day attendance history, timestamps, and absence logs for each subject.'
  },
  predictor: {
    pageNumber: 4,
    pageBadge: 'PAGE 4 • PREDICTOR CALCULATOR OPTION',
    appTitle: 'Smart Attendance',
    purpose: 'Option 2 - "What-If Attendance Predictor" — Allows interactive simulation to determine how many future classes must be attended to maintain safe eligibility.'
  },
  subjects: {
    pageNumber: 5,
    pageBadge: 'PAGE 5 • ENROLLED SUBJECTS OPTION',
    appTitle: 'Smart Attendance',
    purpose: 'Option 3 - "Enrolled Subjects & Faculty" — Displays course details, individual course percentage, syllabus completion, and contact links for professors.'
  },
  reports: {
    pageNumber: 6,
    pageBadge: 'PAGE 6 • REPORTS & CLEARANCE OPTION',
    appTitle: 'Smart Attendance',
    purpose: 'Option 4 - "Reports & Exam Clearance" — Generates official PDF statements and verifies hall ticket clearance status for university examinations.'
  },
  profile: {
    pageNumber: 7,
    pageBadge: 'PAGE 7 • STUDENT PROFILE OPTION',
    appTitle: 'Smart Attendance',
    purpose: 'Option 5 - "Student Profile" — Displays personal academic information, university enrollment records, and advisor contact details.'
  },
  settings: {
    pageNumber: 8,
    pageBadge: 'PAGE 8 • SETTINGS OPTION',
    appTitle: 'Smart Attendance',
    purpose: 'Option 6 - "Application Settings" — Configure custom target attendance percentages, warning buffers, and automated email alerts.'
  }
};

// Calculation Utilities
function calculateSubjectPercentage(attended, total) {
  if (!total || total === 0) return 0;
  return Number(((attended / total) * 100).toFixed(1));
}

function getAggregateAttendance() {
  const p = appState.predictor;
  if (p && p.totalConducted > 0) {
    return Number(((p.currentAttended / p.totalConducted) * 100).toFixed(1));
  }
  return 78.0;
}

function evaluateStatus(percentage) {
  const minThreshold = appState.settings.minimumAttendance;
  const warningMargin = appState.settings.warningBuffer;

  if (percentage < minThreshold) {
    return {
      label: 'AT RISK',
      badgeClass: 'badge-at-risk',
      progressClass: 'progress-fill-risk',
      textClass: 'text-rose-600',
      isRisk: true,
      isWarning: false,
      isSafe: false
    };
  } else if (percentage < minThreshold + warningMargin) {
    return {
      label: 'WARNING',
      badgeClass: 'badge-warning',
      progressClass: 'progress-fill-warning',
      textClass: 'text-amber-600',
      isRisk: false,
      isWarning: true,
      isSafe: false
    };
  } else {
    return {
      label: 'SAFE',
      badgeClass: 'badge-safe',
      progressClass: 'progress-fill-safe',
      textClass: 'text-emerald-600',
      isRisk: false,
      isWarning: false,
      isSafe: true
    };
  }
}

// Navigation Handler
function navigateTo(route) {
  if (!SCREEN_META[route]) return;

  // Enforce authentication for protected screens
  if (!appState.auth.isAuthenticated && route !== 'login') {
    showToast('Please sign in to access portal features', 'warning');
    route = 'login';
  }

  currentRoute = route;
  const meta = SCREEN_META[route];

  // Update Prototype Sheet Chrome
  document.getElementById('proto-app-title').textContent = meta.appTitle;
  document.getElementById('proto-page-badge').textContent = meta.pageBadge;
  document.getElementById('proto-purpose-text').textContent = meta.purpose;
  document.getElementById('proto-page-number').textContent = `Page ${meta.pageNumber} of 8`;

  // Update Tab Styling
  document.querySelectorAll('.page-tab').forEach(tab => tab.classList.remove('active'));
  const activeTab = document.getElementById(`tab-${route}`);
  if (activeTab) activeTab.classList.add('active');

  // Update Mobile Selector
  const mobileSelect = document.getElementById('mobile-page-select');
  if (mobileSelect) mobileSelect.value = route;

  // Update User Pill & Auth Button
  const userPill = document.getElementById('user-pill');
  const authBtn = document.getElementById('auth-btn');
  if (appState.auth.isAuthenticated) {
    userPill.classList.remove('hidden');
    authBtn.textContent = 'Sign Out';
  } else {
    userPill.classList.add('hidden');
    authBtn.textContent = 'Sign In';
  }

  // Render Screen Content
  const mount = document.getElementById('screen-mount');
  switch (route) {
    case 'login':
      mount.innerHTML = renderPage1Login();
      attachLoginEvents();
      break;
    case 'dashboard':
      mount.innerHTML = renderPage2Dashboard();
      break;
    case 'attendance':
      mount.innerHTML = renderPage3Attendance();
      attachAttendanceEvents();
      break;
    case 'predictor':
      mount.innerHTML = renderPage4Predictor();
      attachPredictorEvents();
      break;
    case 'subjects':
      mount.innerHTML = renderPage5Subjects();
      break;
    case 'reports':
      mount.innerHTML = renderPage6Reports();
      attachReportsEvents();
      break;
    case 'profile':
      mount.innerHTML = renderPage7Profile();
      break;
    case 'settings':
      mount.innerHTML = renderPage8Settings();
      attachSettingsEvents();
      break;
  }

  // Scroll smoothly to top of prototype sheet
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleAuth() {
  if (appState.auth.isAuthenticated) {
    appState.auth.isAuthenticated = false;
    saveState();
    showToast('Signed out successfully', 'info');
    navigateTo('login');
  } else {
    navigateTo('login');
  }
}

// Toast Notifications
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `p-3 rounded-lg text-xs font-semibold shadow-lg text-white pointer-events-auto flex items-center gap-2 transition transform translate-y-2 opacity-0 duration-200 ${
    type === 'success' ? 'bg-emerald-600' :
    type === 'error' ? 'bg-rose-600' :
    type === 'warning' ? 'bg-amber-600' : 'bg-indigo-600'
  }`;

  const icon = type === 'success' ? '✔' : type === 'error' ? '✖' : type === 'warning' ? '⚠' : 'ℹ';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;

  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  }, 10);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}

// -------------------------------------------------------------
// PAGE 1: STUDENT PORTAL LOGIN
// -------------------------------------------------------------
function renderPage1Login() {
  const currentThreshold = appState.settings.minimumAttendance.toFixed(1);
  return `
    <div class="py-2">
      <!-- Title & Subtitle -->
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Student Portal Login</h1>
        <p class="text-xs text-slate-500 mt-1">Access your real-time attendance predictions & academic safety status</p>
      </div>

      <!-- Main Login Container Card -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs mb-6">
        <!-- Left Column: Welcome & Highlights -->
        <div class="bg-indigo-50 border border-indigo-100 rounded-lg p-5 flex flex-col justify-between">
          <div>
            <h2 class="text-base font-bold text-indigo-900 mb-2">Welcome Back, Student</h2>
            <p class="text-xs text-slate-600 leading-relaxed mb-4">
              Log in with your university credentials to calculate attendance thresholds, track class schedules, and review AI recommendations.
            </p>
            <div class="flex flex-col gap-2.5 text-xs text-slate-700 font-medium">
              <div class="flex items-center gap-2">
                <span class="text-indigo-600 font-bold">✔</span>
                <span>Instant risk detection for low attendance</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-indigo-600 font-bold">✔</span>
                <span>Real-time "What-If" semester simulation</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-indigo-600 font-bold">✔</span>
                <span>Automated subject-wise safety warnings</span>
              </div>
            </div>
          </div>
          <div class="mt-4 pt-3 border-t border-indigo-200/60 text-[11px] text-indigo-800">
            <span class="font-bold">Official Demo Credentials:</span><br>
            Student ID: <code class="font-mono font-bold text-indigo-950">CS-2023-8941</code><br>
            Password: <code class="font-mono font-bold text-indigo-950">student123</code>
          </div>
        </div>

        <!-- Right Column: Login Form -->
        <div class="flex flex-col justify-center">
          <form id="login-form" class="flex flex-col gap-4">
            <div id="login-error-box" class="hidden p-3 rounded-lg bg-rose-50 border border-rose-300 text-xs text-rose-700 font-medium">
              <!-- Inline error will appear here -->
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5" for="login-email">STUDENT ID / EMAIL</label>
              <input type="text" id="login-email" class="proto-input" value="alex.morgan@university.edu" placeholder="e.g. CS-2023-8941 or alex.morgan@university.edu" required autocomplete="username">
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5" for="login-password">PASSWORD</label>
              <input type="password" id="login-password" class="proto-input" value="student123" placeholder="••••••••••••" required autocomplete="current-password">
            </div>

            <button type="submit" class="proto-btn-primary w-full mt-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 font-semibold text-sm rounded-md transition shadow-sm flex items-center justify-center gap-2">
              <span>Sign In to Dashboard</span>
              <span>→</span>
            </button>

            <button type="button" id="btn-fill-demo" class="text-xs text-indigo-600 hover:text-indigo-800 hover:underline text-center font-medium">
              Fill Alex Morgan Demo Credentials
            </button>
          </form>
        </div>
      </div>

      <!-- Active Demo Session Banner -->
      <div class="bg-indigo-50 border-l-4 border-indigo-600 rounded-r-lg p-4 text-xs text-slate-700">
        <div class="font-bold text-slate-900 mb-0.5">Active Demo Session</div>
        <div>Currently authenticated as: <span class="font-semibold text-slate-900">Alex Morgan (BS CS - Semester 5, ID: CS-2023-8941)</span>. Mandatory Target Threshold: <span class="font-semibold text-indigo-700">${currentThreshold}%</span>.</div>
      </div>
    </div>
  `;
}

function attachLoginEvents() {
  const form = document.getElementById('login-form');
  const fillBtn = document.getElementById('btn-fill-demo');
  const errorBox = document.getElementById('login-error-box');

  if (fillBtn) {
    fillBtn.addEventListener('click', () => {
      document.getElementById('login-email').value = 'alex.morgan@university.edu';
      document.getElementById('login-password').value = 'student123';
      if (errorBox) errorBox.classList.add('hidden');
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const pass = document.getElementById('login-password').value.trim();

      if (!email || !pass) {
        if (errorBox) {
          errorBox.textContent = 'Please enter both Student ID/Email and Password.';
          errorBox.classList.remove('hidden');
        }
        showToast('Please enter both student credentials', 'error');
        return;
      }

      // Check credentials against prototype demo account
      const normalizedEmail = email.toLowerCase();
      const validIdentifiers = ['alex.morgan@university.edu', 'cs-2023-8941', 'alex'];
      const isValidUser = validIdentifiers.includes(normalizedEmail);
      const isValidPass = pass === 'student123' || pass === 'alex123';

      if (!isValidUser || !isValidPass) {
        if (errorBox) {
          errorBox.innerHTML = '<strong>Invalid credentials.</strong> Please use the demo account:<br>ID: <code class="font-mono">CS-2023-8941</code> or <code class="font-mono">alex.morgan@university.edu</code> | Password: <code class="font-mono">student123</code>';
          errorBox.classList.remove('hidden');
        }
        showToast('Invalid Student ID or Password', 'error');
        return;
      }

      if (errorBox) errorBox.classList.add('hidden');
      appState.auth.isAuthenticated = true;
      saveState();
      showToast('Signed in successfully! Welcome, Alex Morgan', 'success');
      navigateTo('dashboard');
    });
  }
}

// -------------------------------------------------------------
// PAGE 2: MAIN DASHBOARD & OPTIONS HUB
// -------------------------------------------------------------
function renderPage2Dashboard() {
  const aggPct = getAggregateAttendance();
  const aggStatus = evaluateStatus(aggPct);

  // Quick subject summary rows
  const subjectRows = appState.subjects.map(sub => {
    const pct = calculateSubjectPercentage(sub.attended, sub.total);
    const stat = evaluateStatus(pct);
    return `
      <tr>
        <td class="font-medium text-slate-900">${sub.name}</td>
        <td class="text-slate-600">${sub.attended} / ${sub.total}</td>
        <td class="font-semibold ${stat.textClass}">${pct.toFixed(1)}%</td>
        <td class="w-32">
          <div class="progress-track">
            <div class="${stat.progressClass}" style="width: ${Math.min(100, pct)}%"></div>
          </div>
        </td>
        <td>
          <span class="${stat.badgeClass}">${stat.label}</span>
        </td>
      </tr>
    `;
  }).join('');

  return `
    <div class="py-2">
      <!-- Welcome Hero Banner -->
      <div class="bg-indigo-700 rounded-xl p-5 sm:p-6 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 shadow-xs">
        <div>
          <h1 class="text-xl sm:text-2xl font-bold tracking-tight">Welcome, Alex Morgan 👋</h1>
          <p class="text-xs sm:text-sm text-indigo-100 mt-1">Select an option below or review your current ${aggPct.toFixed(1)}% aggregate attendance.</p>
        </div>
        <div>
          <span class="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold ${
            aggStatus.isSafe ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
            aggStatus.isWarning ? 'bg-amber-100 text-amber-800 border border-amber-300' :
            'bg-rose-100 text-rose-800 border border-rose-300'
          }">
            OVERALL: ${aggStatus.label}
          </span>
        </div>
      </div>

      <!-- Post-Login Application Options Heading -->
      <div class="mb-3">
        <h2 class="text-sm font-bold text-slate-800">Post-Login Application Options</h2>
      </div>

      <!-- 6 Grid Options -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <!-- 1. My Attendance -->
        <div class="dash-card" onclick="navigateTo('attendance')">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-lg">📊</span>
            <span class="font-bold text-slate-900 text-sm">1. My Attendance</span>
          </div>
          <p class="text-xs text-slate-500 leading-normal">View daily logs and attendance history.</p>
          <span class="text-[11px] text-slate-400 mt-2 font-medium">(Page 3)</span>
        </div>

        <!-- 2. What-If Predictor -->
        <div class="dash-card" onclick="navigateTo('predictor')">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-lg">🔮</span>
            <span class="font-bold text-slate-900 text-sm">2. What-If Predictor</span>
          </div>
          <p class="text-xs text-slate-500 leading-normal">Simulate upcoming classes and target attendance.</p>
          <span class="text-[11px] text-slate-400 mt-2 font-medium">(Page 4)</span>
        </div>

        <!-- 3. Enrolled Subjects -->
        <div class="dash-card" onclick="navigateTo('subjects')">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-lg">📚</span>
            <span class="font-bold text-slate-900 text-sm">3. Enrolled Subjects</span>
          </div>
          <p class="text-xs text-slate-500 leading-normal">View subjects, syllabus progress and faculty contacts.</p>
          <span class="text-[11px] text-slate-400 mt-2 font-medium">(Page 5)</span>
        </div>

        <!-- 4. Reports & Clearance -->
        <div class="dash-card" onclick="navigateTo('reports')">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-lg">📄</span>
            <span class="font-bold text-slate-900 text-sm">4. Reports & Clearance</span>
          </div>
          <p class="text-xs text-slate-500 leading-normal">Download attendance reports and view hall-ticket eligibility.</p>
          <span class="text-[11px] text-slate-400 mt-2 font-medium">(Page 6)</span>
        </div>

        <!-- 5. Student Profile -->
        <div class="dash-card" onclick="navigateTo('profile')">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-lg">👤</span>
            <span class="font-bold text-slate-900 text-sm">5. Student Profile</span>
          </div>
          <p class="text-xs text-slate-500 leading-normal">View academic and semester information.</p>
          <span class="text-[11px] text-slate-400 mt-2 font-medium">(Page 7)</span>
        </div>

        <!-- 6. System Settings -->
        <div class="dash-card" onclick="navigateTo('settings')">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-lg">⚙️</span>
            <span class="font-bold text-slate-900 text-sm">6. System Settings</span>
          </div>
          <p class="text-xs text-slate-500 leading-normal">Configure attendance thresholds, warnings and alerts.</p>
          <span class="text-[11px] text-slate-400 mt-2 font-medium">(Page 8)</span>
        </div>
      </div>

      <!-- Quick Subject Summary Heading -->
      <div class="mb-3 flex items-center justify-between">
        <h2 class="text-sm font-bold text-slate-800">Quick Subject Summary</h2>
        <span class="text-xs text-slate-400">Current Semester 5</span>
      </div>

      <!-- Summary Table -->
      <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <table class="proto-table">
          <thead>
            <tr>
              <th>Subject Name</th>
              <th>Attended / Total</th>
              <th>Current %</th>
              <th>Progress</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${subjectRows}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// PAGE 3: MY ATTENDANCE OPTION
// -------------------------------------------------------------
function renderPage3Attendance() {
  const rows = appState.attendanceLogs.map((log) => {
    const isAbsent = log.status === 'ABSENT';
    const badgeHtml = isAbsent
      ? `<span class="badge-absent">ABSENT</span>`
      : `<span class="badge-present">PRESENT</span>`;

    const discrepancyPill = log.hasDiscrepancy 
      ? `<span class="ml-2 text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-bold">Correction Pending</span>` 
      : (isAbsent ? `<button class="ml-2 text-[10px] px-2 py-0.5 rounded bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 font-semibold btn-report-disc">Request Correction ✎</button>` : '');

    return `
      <tr class="${isAbsent ? 'cursor-pointer hover:bg-rose-50/50' : ''}" data-log-id="${log.id}">
        <td class="font-medium text-slate-900">${log.date}</td>
        <td class="text-slate-600">${log.timeSlot}</td>
        <td class="font-medium text-slate-800">${log.subject}</td>
        <td class="text-slate-600">${log.instructor}</td>
        <td>
          <div class="flex items-center">
            ${badgeHtml}
            ${discrepancyPill}
          </div>
        </td>
      </tr>
    `;
  }).join('');

  // Submitted discrepancy requests list
  const discListHtml = appState.discrepancies.length > 0 ? `
    <div class="mt-4 pt-3 border-t border-slate-100">
      <div class="text-xs font-bold text-slate-800 mb-2">Submitted Correction Requests (${appState.discrepancies.length})</div>
      <div class="flex flex-col gap-2">
        ${appState.discrepancies.map(d => `
          <div class="bg-slate-50 border border-slate-200 rounded p-2.5 text-xs flex items-center justify-between">
            <div>
              <span class="font-semibold text-slate-900">${d.subject}</span> (${d.date}) — 
              <span class="text-slate-600">${d.reason}</span>
            </div>
            <span class="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded text-[10px] font-bold">Under Faculty Review</span>
          </div>
        `).join('')}
      </div>
    </div>
  ` : '';

  return `
    <div class="py-2">
      <!-- Title -->
      <div class="mb-4">
        <h1 class="text-xl font-bold text-slate-900 tracking-tight">Daily Attendance & History Logs</h1>
      </div>

      <!-- Table Container -->
      <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs mb-6">
        <table class="proto-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time Slot</th>
              <th>Subject</th>
              <th>Instructor</th>
              <th>Log Status</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>

      <!-- Discrepancy Correction Request Card -->
      <div class="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 class="text-xs font-bold text-slate-900 mb-1">Discrepancy Correction Request</h2>
            <p class="text-xs text-slate-500 leading-relaxed">
              When an ABSENT attendance row is selected, you can submit an official correction request to your faculty advisor within 48 hours.
            </p>
          </div>
          <div>
            <button id="btn-open-absent-disc" class="proto-btn-primary text-xs py-2 px-3 whitespace-nowrap">
              Submit Correction for Oct 06 Class
            </button>
          </div>
        </div>
        ${discListHtml}
      </div>
    </div>
  `;
}

function attachAttendanceEvents() {
  document.querySelectorAll('tr[data-log-id]').forEach(row => {
    row.addEventListener('click', () => {
      const logId = row.getAttribute('data-log-id');
      const log = appState.attendanceLogs.find(l => l.id === logId);
      if (log && log.status === 'ABSENT') {
        openDiscrepancyModal(log);
      }
    });
  });

  const absentBtn = document.getElementById('btn-open-absent-disc');
  if (absentBtn) {
    absentBtn.addEventListener('click', () => {
      const absentLog = appState.attendanceLogs.find(l => l.status === 'ABSENT');
      if (absentLog) {
        openDiscrepancyModal(absentLog);
      }
    });
  }
}

function openDiscrepancyModal(log) {
  const modalContainer = document.getElementById('modal-container');
  modalContainer.className = 'modal-overlay';
  modalContainer.innerHTML = `
    <div class="modal-content p-6">
      <div class="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
        <h3 class="text-sm font-bold text-slate-900">Submit Attendance Discrepancy</h3>
        <button onclick="closeModal()" class="text-slate-400 hover:text-slate-600 text-lg font-bold">&times;</button>
      </div>

      <div class="mb-4 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
        <div class="font-semibold text-slate-900 text-sm">${log.subject}</div>
        <div class="mt-1">Date: <span class="font-medium text-slate-800">${log.date}</span> • Slot: <span class="font-medium text-slate-800">${log.timeSlot}</span></div>
        <div>Instructor: <span class="font-medium text-slate-800">${log.instructor}</span></div>
        <div class="mt-1">Recorded Status: <span class="badge-absent text-[10px]">ABSENT</span></div>
      </div>

      <form id="discrepancy-form" class="flex flex-col gap-3">
        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Reason for Correction</label>
          <select id="disc-reason" class="proto-input" required>
            <option value="Present in class (Scanner/system error)">Present in class (Scanner/system error)</option>
            <option value="Medical Certificate / Doctor's Note">Medical Certificate / Doctor's Note</option>
            <option value="Official University Representation">Official University Representation</option>
            <option value="Other Approved Leave">Other Approved Leave</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Optional Comments</label>
          <textarea id="disc-comments" class="proto-input" rows="3" placeholder="Provide seat location, lab partner details, or medical reference number..."></textarea>
        </div>

        <div class="flex items-center justify-end gap-2 mt-3 pt-3 border-t border-slate-200">
          <button type="button" onclick="closeModal()" class="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-md transition">Cancel</button>
          <button type="submit" class="proto-btn-primary text-xs py-2 px-4">Submit Request</button>
        </div>
      </form>
    </div>
  `;

  document.getElementById('discrepancy-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const reason = document.getElementById('disc-reason').value;
    const comments = document.getElementById('disc-comments').value;

    log.hasDiscrepancy = true;
    log.discrepancyNote = `${reason}: ${comments}`;
    appState.discrepancies.unshift({
      id: 'disc-' + Date.now(),
      attendanceRecordId: log.id,
      subject: log.subject,
      date: log.date,
      reason,
      comments,
      status: 'PENDING',
      submittedAt: new Date().toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
    });

    saveState();
    closeModal();
    showToast(`Correction request submitted for ${log.subject}!`, 'success');
    navigateTo('attendance');
  });
}

function closeModal() {
  const modalContainer = document.getElementById('modal-container');
  modalContainer.className = 'hidden';
  modalContainer.innerHTML = '';
}

// -------------------------------------------------------------
// PAGE 4: "WHAT-IF" PREDICTIVE CALCULATOR
// -------------------------------------------------------------
function renderPage4Predictor() {
  const p = appState.predictor;
  const projectedAttended = p.currentAttended + p.classesIntend;
  const projectedTotal = p.totalConducted + p.upcomingRemaining;
  const projectedPct = projectedTotal > 0 ? (projectedAttended / projectedTotal) * 100 : 0;

  const minThreshold = appState.settings.minimumAttendance;
  const warningMargin = appState.settings.warningBuffer;

  // Status calculation
  let statusBadgeHtml = '';
  if (projectedPct >= minThreshold + warningMargin) {
    statusBadgeHtml = `<span class="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">STATUS: SAFE THRESHOLD</span>`;
  } else if (projectedPct >= minThreshold) {
    statusBadgeHtml = `<span class="px-3.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">STATUS: WARNING THRESHOLD</span>`;
  } else {
    statusBadgeHtml = `<span class="px-3.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">STATUS: AT RISK THRESHOLD</span>`;
  }

  // Dynamic recommendation calculations:
  // 1. Minimum total attended classes required to reach threshold
  const minRequiredTotalAttended = Math.ceil(projectedTotal * (minThreshold / 100));
  // 2. Minimum of remaining upcoming classes student MUST attend
  const mustAttendRemaining = Math.max(0, minRequiredTotalAttended - p.currentAttended);
  // 3. Maximum remaining classes student could miss across remaining period without dropping below threshold
  const maxSafeMissesPossible = Math.max(0, p.upcomingRemaining - mustAttendRemaining);
  // 4. Projected percentage if ALL remaining classes are attended
  const maxPossibleAttended = p.currentAttended + p.upcomingRemaining;
  const maxPossiblePct = projectedTotal > 0 ? ((maxPossibleAttended / projectedTotal) * 100).toFixed(1) : 0;
  // 5. Misses planned in the user's current intended attendance
  const plannedMisses = Math.max(0, p.upcomingRemaining - p.classesIntend);

  // Dynamic recommendation message
  let recHtml = '';
  if (projectedPct >= minThreshold) {
    // If student is currently safe with intended attendance
    recHtml = `You can safely miss up to <span class="font-bold text-slate-900">${plannedMisses} remaining lectures</span> without dropping below the <span class="font-semibold text-slate-900">${minThreshold.toFixed(1)}%</span> threshold. Attending all ${p.upcomingRemaining} remaining lectures elevates your final score to <span class="font-bold text-emerald-700">${maxPossiblePct}%</span>.`;
  } else if (mustAttendRemaining <= p.upcomingRemaining) {
    // If student is at risk with current intention, but could become safe if they attend enough
    recHtml = `⚠️ <strong class="text-rose-700">Attendance Risk Alert:</strong> Intending to attend only ${p.classesIntend} classes drops your projected attendance to ${projectedPct.toFixed(1)}%, which is below the ${minThreshold.toFixed(1)}% threshold. You must attend at least <span class="font-bold text-slate-900">${mustAttendRemaining} of the ${p.upcomingRemaining} remaining classes</span> (safely missing at most ${maxSafeMissesPossible}) to stay eligible. Attending all remaining lectures reaches <span class="font-bold text-emerald-700">${maxPossiblePct}%</span>.`;
  } else {
    // Impossible to reach threshold even if attending 100% of remaining
    recHtml = `🚨 <strong class="text-rose-700">Attendance Shortage Warning:</strong> Even if you attend all ${p.upcomingRemaining} remaining lectures, your maximum attendance will only reach <span class="font-bold text-rose-700">${maxPossiblePct}%</span>, which is below the mandatory ${minThreshold.toFixed(1)}% threshold. Please consult your academic advisor (Dr. Alan Kay) regarding condonation.`;
  }

  return `
    <div class="py-2">
      <!-- Title -->
      <div class="mb-5">
        <h1 class="text-xl font-bold text-slate-900 tracking-tight">"What-If" Predictive Calculator</h1>
      </div>

      <!-- Two Column Layout matching Prototype -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <!-- Left: Simulation Inputs Card -->
        <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <h2 class="text-sm font-bold text-slate-800 mb-4">Simulation Inputs</h2>

          <div class="flex flex-col gap-4">
            <div>
              <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1" for="pred-attended">CURRENT ATTENDED CLASSES</label>
              <input type="number" id="pred-attended" class="proto-input" value="${p.currentAttended}" min="0">
            </div>

            <div>
              <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1" for="pred-conducted">TOTAL CONDUCTED CLASSES</label>
              <input type="number" id="pred-conducted" class="proto-input" value="${p.totalConducted}" min="1">
            </div>

            <div>
              <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1" for="pred-upcoming">UPCOMING CLASSES REMAINING</label>
              <input type="number" id="pred-upcoming" class="proto-input" value="${p.upcomingRemaining}" min="0">
            </div>

            <div>
              <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1" for="pred-intend">CLASSES YOU INTEND TO ATTEND</label>
              <input type="number" id="pred-intend" class="proto-input border-indigo-300 bg-indigo-50" value="${p.classesIntend}" min="0">
            </div>
          </div>
        </div>

        <!-- Right: Projected End Attendance Card -->
        <div class="bg-indigo-50 border border-indigo-100 rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-xs">
          <span class="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-3">PROJECTED END ATTENDANCE</span>

          <div class="text-5xl font-extrabold ${projectedPct >= minThreshold ? 'text-emerald-600' : 'text-rose-600'} mb-3 tracking-tight">
            ${projectedPct.toFixed(1)}%
          </div>

          <div class="mb-4">
            ${statusBadgeHtml}
          </div>

          <p class="text-xs text-indigo-900 leading-relaxed max-w-xs font-medium">
            Attending <span class="font-bold">${p.classesIntend}</span> out of <span class="font-bold">${p.upcomingRemaining}</span> remaining classes results in <span class="font-bold">${projectedAttended} / ${projectedTotal}</span> total classes.
          </p>
        </div>
      </div>

      <!-- Bottom: Smart Recommendation Engine Card -->
      <div class="bg-white border-l-4 ${projectedPct >= minThreshold ? 'border-emerald-500' : 'border-rose-500'} border-t border-r border-b border-slate-200 rounded-r-xl p-5 shadow-xs">
        <h2 class="text-xs font-bold ${projectedPct >= minThreshold ? 'text-emerald-700' : 'text-rose-700'} mb-1.5 flex items-center gap-1.5">
          <span>Smart Recommendation Engine</span>
        </h2>
        <p class="text-xs text-slate-700 leading-relaxed font-normal">
          💡 ${recHtml}
        </p>
      </div>
    </div>
  `;
}

function attachPredictorEvents() {
  const inputs = ['pred-attended', 'pred-conducted', 'pred-upcoming', 'pred-intend'];
  inputs.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const updateHandler = () => {
      appState.predictor.currentAttended = parseInt(document.getElementById('pred-attended').value) || 0;
      appState.predictor.totalConducted = parseInt(document.getElementById('pred-conducted').value) || 1;
      appState.predictor.upcomingRemaining = parseInt(document.getElementById('pred-upcoming').value) || 0;
      appState.predictor.classesIntend = parseInt(document.getElementById('pred-intend').value) || 0;
      saveState();

      // Re-render and keep focus
      const activeId = document.activeElement ? document.activeElement.id : null;
      const mount = document.getElementById('screen-mount');
      mount.innerHTML = renderPage4Predictor();
      attachPredictorEvents();
      if (activeId) {
        const activeEl = document.getElementById(activeId);
        if (activeEl) {
          activeEl.focus();
        }
      }
    };

    el.addEventListener('input', updateHandler);
    el.addEventListener('change', updateHandler);
  });
}

// -------------------------------------------------------------
// PAGE 5: ENROLLED SUBJECTS & FACULTY
// -------------------------------------------------------------
function renderPage5Subjects() {
  const cards = appState.subjects.map(sub => {
    const pct = calculateSubjectPercentage(sub.attended, sub.total);
    const stat = evaluateStatus(pct);

    // Color progress bar depending on subject
    const barColor = stat.isRisk ? '#f43f5e' : (stat.isWarning ? '#f59e0b' : '#4f46e5');

    return `
      <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
        <div>
          <!-- Card Header: Badge on left, Percentage on right -->
          <div class="flex items-center justify-between mb-3">
            <span class="${stat.badgeClass}">${stat.label}</span>
            <span class="text-xl font-bold ${stat.textClass}">${pct.toFixed(1)}%</span>
          </div>

          <!-- Subject Title & Professor -->
          <h2 class="text-sm font-bold text-slate-900 mb-0.5">${sub.shortName || sub.name}</h2>
          <p class="text-xs text-slate-500 mb-4">${sub.code} • ${sub.professor}</p>

          <!-- Attendance Stats -->
          <div class="flex items-center justify-between text-xs text-slate-600 mb-2 font-medium">
            <span>Attended: <strong class="text-slate-900">${sub.attended}</strong> / ${sub.total} classes</span>
            <span class="${stat.textClass} font-bold">${pct.toFixed(1)}%</span>
          </div>

          <!-- Syllabus Progress -->
          <div class="mb-4">
            <div class="flex items-center justify-between text-xs text-slate-600 mb-1.5 font-medium">
              <span>Syllabus Progress: ${sub.syllabusProgress}% Completed</span>
            </div>
            <div class="progress-track">
              <div style="width: ${sub.syllabusProgress}%; background-color: ${barColor};" class="h-full rounded-full"></div>
            </div>
          </div>
        </div>

        <!-- Email Link -->
        <div class="pt-3 border-t border-slate-100 text-xs text-slate-500">
          Email: <a href="mailto:${sub.professorEmail}" class="text-blue-600 hover:underline font-medium">${sub.professorEmail}</a>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="py-2">
      <!-- Title -->
      <div class="mb-5">
        <h1 class="text-xl font-bold text-slate-900 tracking-tight">Enrolled Subjects & Faculty Contacts</h1>
      </div>

      <!-- 2x2 Subject Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        ${cards}
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// PAGE 6: REPORTS & EXAM CLEARANCE
// -------------------------------------------------------------
function renderPage6Reports() {
  const aggPct = getAggregateAttendance();
  const minThreshold = appState.settings.minimumAttendance;
  const isCleared = aggPct >= minThreshold;

  const rows = appState.reports.map(rep => {
    return `
      <tr>
        <td class="font-medium text-slate-900">${rep.name}</td>
        <td class="text-slate-600">${rep.term}</td>
        <td class="font-semibold text-slate-800">${rep.overallPct.toFixed(1)}%</td>
        <td>
          <span class="${
            rep.status === 'ELIGIBLE' || rep.status === 'VERIFIED' ? 'badge-verified' : 'badge-archived'
          }">${rep.status}</span>
        </td>
        <td>
          <button onclick="downloadReport('${rep.id}')" class="text-blue-600 hover:text-blue-800 font-semibold text-xs transition flex items-center gap-1">
            <span>${rep.action}</span>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  return `
    <div class="py-2">
      <!-- Title -->
      <div class="mb-4">
        <h1 class="text-xl font-bold text-slate-900 tracking-tight">Official Reports & Hall Ticket Status</h1>
      </div>

      <!-- Reports Table -->
      <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs mb-6">
        <table class="proto-table">
          <thead>
            <tr>
              <th>Report Name</th>
              <th>Academic Term</th>
              <th>Overall %</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>

      <!-- Examination Clearance Status Card -->
      <div class="bg-indigo-50 border border-indigo-100 rounded-xl p-5 shadow-xs">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <h2 class="text-xs font-bold text-indigo-900">Examination Clearance Status</h2>
            <span class="px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
              isCleared ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-300'
            }">
              ${isCleared ? 'ELIGIBLE / CLEARED' : 'NOT ELIGIBLE / ATTENDANCE SHORTAGE'}
            </span>
          </div>
          <button onclick="viewHallTicket()" class="text-xs px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-xs transition">
            View Hall Ticket
          </button>
        </div>
        <p class="text-xs text-slate-700 leading-relaxed">
          Students with an aggregate attendance equal to or greater than <span class="font-semibold text-slate-900">${minThreshold.toFixed(1)}%</span> are automatically cleared for end-semester examinations. Your aggregate of <span class="font-bold text-indigo-900">${aggPct.toFixed(1)}%</span> ${
            isCleared ? 'grants provisional hall ticket clearance.' : 'is below requirement. Attendance shortage appeal required.'
          }
        </p>
      </div>
    </div>
  `;
}

function attachReportsEvents() {}

function downloadReport(reportId) {
  const rep = appState.reports.find(r => r.id === reportId);
  if (!rep) return;

  if (rep.format === 'csv') {
    // Generate real CSV download
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Date,Time Slot,Subject,Instructor,Status\n" +
      appState.attendanceLogs.map(l => `"${l.date}","${l.timeSlot}","${l.subject}","${l.instructor}","${l.status}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${rep.name.replace(/[^a-zA-Z0-9]/g, '_')}_${appState.auth.studentId}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast(`Downloaded CSV: ${rep.name}`, 'success');
  } else {
    // Generate Printable PDF / Transcript Modal
    openPrintableStatement(rep);
  }
}

function openPrintableStatement(rep) {
  const modalContainer = document.getElementById('modal-container');
  modalContainer.className = 'modal-overlay';
  modalContainer.innerHTML = `
    <div class="modal-content max-w-2xl p-8" id="printable-document">
      <div class="flex justify-between items-start border-b-2 border-indigo-900 pb-4 mb-6">
        <div>
          <div class="text-xs font-bold text-indigo-700 uppercase tracking-widest">Office of the Registrar</div>
          <h2 class="text-xl font-bold text-slate-900">Official Attendance Statement</h2>
          <div class="text-xs text-slate-500 mt-1">${rep.name} • ${rep.term}</div>
        </div>
        <div class="text-right">
          <div class="text-xs font-mono text-slate-400">DOC-REF: #APX-894102</div>
          <div class="inline-block mt-2 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-300 rounded font-bold text-xs uppercase">
            ${rep.status}
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 text-xs text-slate-700 mb-6 bg-slate-50 p-4 rounded-lg">
        <div>
          <div><span class="font-semibold text-slate-900">Student Name:</span> ${appState.auth.name}</div>
          <div><span class="font-semibold text-slate-900">Student ID:</span> ${appState.auth.studentId}</div>
          <div><span class="font-semibold text-slate-900">Degree:</span> ${appState.auth.degree}</div>
        </div>
        <div>
          <div><span class="font-semibold text-slate-900">Semester:</span> ${appState.auth.semester} (${appState.auth.year})</div>
          <div><span class="font-semibold text-slate-900">Faculty Advisor:</span> ${appState.auth.advisor}</div>
          <div><span class="font-semibold text-slate-900">Aggregate Attendance:</span> <span class="font-bold text-indigo-900">${rep.overallPct.toFixed(1)}%</span></div>
        </div>
      </div>

      <table class="w-full text-xs text-left mb-6 border border-slate-200">
        <thead class="bg-slate-100 text-slate-700">
          <tr>
            <th class="p-2 border-b">Subject</th>
            <th class="p-2 border-b">Faculty</th>
            <th class="p-2 border-b">Attended / Total</th>
            <th class="p-2 border-b">Percentage</th>
          </tr>
        </thead>
        <tbody>
          ${appState.subjects.map(s => `
            <tr>
              <td class="p-2 border-b font-medium">${s.name} (${s.code})</td>
              <td class="p-2 border-b">${s.professor}</td>
              <td class="p-2 border-b">${s.attended} / ${s.total}</td>
              <td class="p-2 border-b font-semibold">${calculateSubjectPercentage(s.attended, s.total).toFixed(1)}%</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="text-[11px] text-slate-500 mb-6 italic">
        This document serves as an institutional certification of recorded student attendance logs in accordance with Academic Regulation Section 4.2.
      </div>

      <div class="flex items-center justify-between pt-4 border-t border-slate-200">
        <div class="text-center">
          <div class="text-xs font-bold text-slate-800">Dr. Alan Kay</div>
          <div class="text-[10px] text-slate-400">Head of Department</div>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="closeModal()" class="px-4 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-md transition">Close</button>
          <button onclick="window.print()" class="proto-btn-primary text-xs py-1.5 px-4">Print Statement / Save PDF</button>
        </div>
      </div>
    </div>
  `;
}

function viewHallTicket() {
  const aggPct = getAggregateAttendance();
  const minThreshold = appState.settings.minimumAttendance;
  const isCleared = aggPct >= minThreshold;

  const modalContainer = document.getElementById('modal-container');
  modalContainer.className = 'modal-overlay';
  modalContainer.innerHTML = `
    <div class="modal-content max-w-xl p-8" id="printable-document">
      <div class="flex justify-between items-center border-b-2 border-indigo-900 pb-4 mb-6">
        <div>
          <div class="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">Apex State University</div>
          <h2 class="text-lg font-bold text-slate-900">End-Semester Examination Admit Card</h2>
          <div class="text-xs text-slate-500">Academic Term: Fall 2026</div>
        </div>
        <div class="text-right">
          <span class="px-3 py-1 text-xs font-bold rounded-full ${
            isCleared ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-300'
          }">
            ${isCleared ? 'HALL TICKET: CLEARED' : 'HALL TICKET: SHORTAGE'}
          </span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 text-xs text-slate-700 mb-6 bg-slate-50 p-4 rounded-lg">
        <div>
          <div><span class="font-semibold text-slate-900">Student:</span> ${appState.auth.name}</div>
          <div><span class="font-semibold text-slate-900">Roll/ID:</span> ${appState.auth.studentId}</div>
          <div><span class="font-semibold text-slate-900">Program:</span> ${appState.auth.degree}</div>
        </div>
        <div>
          <div><span class="font-semibold text-slate-900">Term:</span> Semester 5</div>
          <div><span class="font-semibold text-slate-900">Aggregate Attendance:</span> <span class="font-bold text-indigo-900">${aggPct.toFixed(1)}%</span></div>
          <div><span class="font-semibold text-slate-900">Required Threshold:</span> ${minThreshold.toFixed(1)}%</div>
        </div>
      </div>

      <div class="text-xs font-bold text-slate-900 mb-2">Scheduled Examinations</div>
      <table class="w-full text-xs text-left mb-6 border border-slate-200">
        <thead class="bg-slate-100 text-slate-700">
          <tr>
            <th class="p-2 border-b">Course Code</th>
            <th class="p-2 border-b">Subject</th>
            <th class="p-2 border-b">Exam Date</th>
            <th class="p-2 border-b">Hall / Room</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-2 border-b font-mono">CS301</td>
            <td class="p-2 border-b">Database Management Systems</td>
            <td class="p-2 border-b">Nov 12, 2026</td>
            <td class="p-2 border-b">Hall A - Room 204</td>
          </tr>
          <tr>
            <td class="p-2 border-b font-mono">CS302</td>
            <td class="p-2 border-b">Data Structures & Algorithms</td>
            <td class="p-2 border-b">Nov 15, 2026</td>
            <td class="p-2 border-b">Hall B - Room 108</td>
          </tr>
          <tr>
            <td class="p-2 border-b font-mono">CS303</td>
            <td class="p-2 border-b">Java Programming</td>
            <td class="p-2 border-b">Nov 18, 2026</td>
            <td class="p-2 border-b">Hall A - Room 206</td>
          </tr>
          <tr>
            <td class="p-2 border-b font-mono">MATH301</td>
            <td class="p-2 border-b">Mathematics III</td>
            <td class="p-2 border-b">Nov 22, 2026</td>
            <td class="p-2 border-b">Auditorium West</td>
          </tr>
        </tbody>
      </table>

      <div class="flex items-center justify-between pt-4 border-t border-slate-200">
        <span class="text-[11px] text-slate-400">Valid only with university student ID card.</span>
        <div class="flex items-center gap-2">
          <button onclick="closeModal()" class="px-4 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-md transition">Close</button>
          <button onclick="window.print()" class="proto-btn-primary text-xs py-1.5 px-4">Print Hall Ticket</button>
        </div>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// PAGE 7: STUDENT PROFILE OPTION
// -------------------------------------------------------------
function renderPage7Profile() {
  const u = appState.auth;
  return `
    <div class="py-2">
      <!-- Title -->
      <div class="mb-5">
        <h1 class="text-xl font-bold text-slate-900 tracking-tight">Student Profile Information</h1>
      </div>

      <!-- Two Column Details Card matching Prototype -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border border-slate-200 rounded-xl p-6 shadow-xs mb-6">
        <!-- Left: Personal Details -->
        <div>
          <h2 class="text-sm font-bold text-slate-900 mb-3">Personal Details</h2>
          <div class="flex flex-col gap-2.5 text-xs text-slate-600">
            <div><span class="font-medium text-slate-500">Full Name:</span> <span class="font-semibold text-slate-900">${u.name}</span></div>
            <div><span class="font-medium text-slate-500">Student ID:</span> <span class="font-semibold text-slate-900">${u.studentId}</span></div>
            <div><span class="font-medium text-slate-500">Email:</span> <span class="font-semibold text-slate-900">${u.email}</span></div>
            <div><span class="font-medium text-slate-500">Contact:</span> <span class="font-semibold text-slate-900">${u.contact}</span></div>
          </div>
        </div>

        <!-- Right: Academic Record -->
        <div>
          <h2 class="text-sm font-bold text-slate-900 mb-3">Academic Record</h2>
          <div class="flex flex-col gap-2.5 text-xs text-slate-600">
            <div><span class="font-medium text-slate-500">Degree:</span> <span class="font-semibold text-slate-900">${u.degree}</span></div>
            <div><span class="font-medium text-slate-500">Current Term:</span> <span class="font-semibold text-slate-900">Semester ${u.semester} (${u.year})</span></div>
            <div><span class="font-medium text-slate-500">Advisor:</span> <span class="font-semibold text-slate-900">${u.advisor}</span></div>
            <div><span class="font-medium text-slate-500">Cumulative GPA:</span> <span class="font-semibold text-slate-900">${u.gpa}</span></div>
          </div>
        </div>
      </div>

      <!-- Enrolled Electives & Laboratory Courses Card -->
      <div class="bg-white border-t-2 border-indigo-600 border border-slate-200 rounded-b-xl rounded-t-sm p-6 shadow-xs">
        <h2 class="text-xs font-bold text-slate-900 mb-3">Enrolled Electives & Laboratory Courses</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
          <div>• CS301 — Database Management Systems</div>
          <div>• CS302 — Data Structures & Algorithms</div>
          <div>• CS303 — Java Programming</div>
          <div>• MATH301 — Mathematics III</div>
        </div>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// PAGE 8: SETTINGS OPTION
// -------------------------------------------------------------
function renderPage8Settings() {
  const s = appState.settings;
  return `
    <div class="py-2">
      <!-- Title -->
      <div class="mb-5">
        <h1 class="text-xl font-bold text-slate-900 tracking-tight">Application Settings & Thresholds</h1>
      </div>

      <!-- Threshold & Warning Preferences Card -->
      <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-xs mb-6">
        <h2 class="text-sm font-bold text-slate-900 mb-5">Threshold & Warning Preferences</h2>

        <div class="flex flex-col divide-y divide-slate-100">
          <!-- Row 1: Minimum Required Target -->
          <div class="py-3 flex items-center justify-between">
            <div>
              <div class="text-xs font-bold text-slate-900">Minimum Required Target (%)</div>
              <div class="text-[11px] text-slate-500">Default university attendance floor requirement</div>
            </div>
            <div>
              <input type="number" id="setting-threshold" class="proto-input w-24 text-right font-bold text-indigo-700 bg-indigo-50 border-indigo-200" value="${s.minimumAttendance.toFixed(1)}" step="0.5" min="50" max="100">
            </div>
          </div>

          <!-- Row 2: Early Risk Warning Buffer -->
          <div class="py-3 flex items-center justify-between">
            <div>
              <div class="text-xs font-bold text-slate-900">Early Risk Warning Buffer</div>
              <div class="text-[11px] text-slate-500">Trigger warning when attendance comes within this margin</div>
            </div>
            <div>
              <input type="number" id="setting-buffer" class="proto-input w-24 text-right font-bold text-amber-600 bg-amber-50 border-amber-200" value="${s.warningBuffer.toFixed(1)}" step="0.5" min="0" max="15">
            </div>
          </div>

          <!-- Row 3: Email Alerts on Absence Logs -->
          <div class="py-3 flex items-center justify-between">
            <div>
              <div class="text-xs font-bold text-slate-900">Email Alerts on Absence Logs</div>
              <div class="text-[11px] text-slate-500">Receive instant notification when an absence is recorded</div>
            </div>
            <div>
              <button id="toggle-email-alerts" class="px-3 py-1.5 rounded-md text-xs font-bold transition flex items-center gap-1.5 ${
                s.emailAlerts ? 'bg-emerald-50 text-emerald-700 border border-emerald-300' : 'bg-slate-100 text-slate-500 border border-slate-300'
              }">
                <span>${s.emailAlerts ? 'Enabled ✔' : 'Disabled ✖'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Database Synchronization Card -->
      <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 class="text-xs font-bold text-slate-900 mb-1">Database Synchronization</h2>
          <p class="text-xs text-slate-500 leading-relaxed">
            Attendance logs sync automatically with University Registrar Servers every 6 hours. Last synchronization: <span id="sync-timestamp" class="font-semibold text-slate-700">${s.lastSync}</span>.
          </p>
        </div>
        <div>
          <button id="btn-sync-now" class="proto-btn-primary text-xs py-2 px-4 shadow-sm flex items-center gap-2 whitespace-nowrap">
            <span id="sync-spinner">🔄</span>
            <span>Sync Now</span>
          </button>
        </div>
      </div>

      <!-- Reset Demo Defaults -->
      <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
        <div>
          <div class="text-xs font-bold text-slate-800">Restore Prototype Defaults</div>
          <div class="text-[11px] text-slate-500">Reset all simulator inputs, thresholds, and correction requests back to prototype defaults.</div>
        </div>
        <button onclick="resetToDefaults()" class="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-md border border-slate-300 text-xs shadow-xs transition">
          Reset Data
        </button>
      </div>
    </div>
  `;
}

function attachSettingsEvents() {
  const thresholdInput = document.getElementById('setting-threshold');
  const bufferInput = document.getElementById('setting-buffer');
  const toggleAlertsBtn = document.getElementById('toggle-email-alerts');
  const syncBtn = document.getElementById('btn-sync-now');

  if (thresholdInput) {
    const handleThresholdChange = () => {
      const val = parseFloat(thresholdInput.value);
      if (!isNaN(val) && val >= 50 && val <= 100) {
        appState.settings.minimumAttendance = val;
        saveState();
        showToast(`Minimum required threshold updated to ${val.toFixed(1)}%`, 'success');
      }
    };
    thresholdInput.addEventListener('change', handleThresholdChange);
  }

  if (bufferInput) {
    const handleBufferChange = () => {
      const val = parseFloat(bufferInput.value);
      if (!isNaN(val) && val >= 0 && val <= 25) {
        appState.settings.warningBuffer = val;
        saveState();
        showToast(`Warning buffer updated to +${val.toFixed(1)}%`, 'success');
      }
    };
    bufferInput.addEventListener('change', handleBufferChange);
  }

  if (toggleAlertsBtn) {
    toggleAlertsBtn.addEventListener('click', () => {
      appState.settings.emailAlerts = !appState.settings.emailAlerts;
      saveState();
      showToast(`Email alerts ${appState.settings.emailAlerts ? 'Enabled' : 'Disabled'}`, 'info');
      navigateTo('settings');
    });
  }

  if (syncBtn) {
    syncBtn.addEventListener('click', () => {
      const spinner = document.getElementById('sync-spinner');
      spinner.classList.add('animate-spin');
      syncBtn.disabled = true;
      syncBtn.classList.add('opacity-75');

      setTimeout(() => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        appState.settings.lastSync = `Today, ${timeStr}`;
        saveState();
        spinner.classList.remove('animate-spin');
        syncBtn.disabled = false;
        syncBtn.classList.remove('opacity-75');
        const ts = document.getElementById('sync-timestamp');
        if (ts) ts.textContent = appState.settings.lastSync;
        showToast('Attendance logs synchronized with University Registrar', 'success');
      }, 700);
    });
  }
}

// Global bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  navigateTo('dashboard');
});
