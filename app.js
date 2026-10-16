/**
 * Smart Attendance Predictor - Complete Application Engine
 * Strict Prototype Fidelity + Integrated Timetable, Planner & Academic Calendar
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
  discrepancies: [],
  timetable: [
    // Monday
    {
      id: 'tt-1',
      day: 'Monday',
      subjectId: 'sub4',
      subject: 'Mathematics III',
      code: 'MATH301',
      faculty: 'Prof. Carl Gauss',
      startTime: '09:00 AM',
      endTime: '10:00 AM',
      room: 'Auditorium West',
      type: 'Lecture'
    },
    {
      id: 'tt-2',
      day: 'Monday',
      subjectId: 'sub2',
      subject: 'Data Structures & Algorithms',
      code: 'CS302',
      faculty: 'Prof. Grace Hopper',
      startTime: '10:00 AM',
      endTime: '11:00 AM',
      room: 'Hall B - Room 108',
      type: 'Lecture'
    },
    {
      id: 'tt-3',
      day: 'Monday',
      subjectId: 'sub1',
      subject: 'Database Management Systems',
      code: 'CS301',
      faculty: 'Prof. Alan Turing',
      startTime: '11:15 AM',
      endTime: '12:15 PM',
      room: 'Hall A - Room 204',
      type: 'Lecture'
    },
    {
      id: 'tt-4',
      day: 'Monday',
      subjectId: 'sub3',
      subject: 'Java Programming Lab',
      code: 'CS303L',
      faculty: 'Prof. James Gosling',
      startTime: '02:00 PM',
      endTime: '04:00 PM',
      room: 'Computer Lab 3',
      type: 'Lab'
    },
    // Tuesday
    {
      id: 'tt-5',
      day: 'Tuesday',
      subjectId: 'sub3',
      subject: 'Java Programming',
      code: 'CS303',
      faculty: 'Prof. James Gosling',
      startTime: '09:00 AM',
      endTime: '10:00 AM',
      room: 'Hall A - Room 206',
      type: 'Lecture'
    },
    {
      id: 'tt-6',
      day: 'Tuesday',
      subjectId: 'sub1',
      subject: 'Database Management Systems',
      code: 'CS301',
      faculty: 'Prof. Alan Turing',
      startTime: '10:00 AM',
      endTime: '11:00 AM',
      room: 'Hall A - Room 204',
      type: 'Lecture'
    },
    {
      id: 'tt-7',
      day: 'Tuesday',
      subjectId: 'sub4',
      subject: 'Mathematics III',
      code: 'MATH301',
      faculty: 'Prof. Carl Gauss',
      startTime: '11:15 AM',
      endTime: '12:15 PM',
      room: 'Auditorium West',
      type: 'Tutorial'
    },
    // Wednesday
    {
      id: 'tt-8',
      day: 'Wednesday',
      subjectId: 'sub2',
      subject: 'Data Structures & Algorithms',
      code: 'CS302',
      faculty: 'Prof. Grace Hopper',
      startTime: '09:00 AM',
      endTime: '10:00 AM',
      room: 'Hall B - Room 108',
      type: 'Lecture'
    },
    {
      id: 'tt-9',
      day: 'Wednesday',
      subjectId: 'sub1',
      subject: 'Database Management Systems',
      code: 'CS301',
      faculty: 'Prof. Alan Turing',
      startTime: '10:00 AM',
      endTime: '11:00 AM',
      room: 'Hall A - Room 204',
      type: 'Lecture'
    },
    {
      id: 'tt-10',
      day: 'Wednesday',
      subjectId: 'sub1',
      subject: 'DBMS Laboratory',
      code: 'CS301L',
      faculty: 'Prof. Alan Turing',
      startTime: '02:00 PM',
      endTime: '04:00 PM',
      room: 'Database Lab 1',
      type: 'Lab'
    },
    // Thursday
    {
      id: 'tt-11',
      day: 'Thursday',
      subjectId: 'sub4',
      subject: 'Mathematics III',
      code: 'MATH301',
      faculty: 'Prof. Carl Gauss',
      startTime: '09:00 AM',
      endTime: '10:00 AM',
      room: 'Auditorium West',
      type: 'Lecture'
    },
    {
      id: 'tt-12',
      day: 'Thursday',
      subjectId: 'sub3',
      subject: 'Java Programming',
      code: 'CS303',
      faculty: 'Prof. James Gosling',
      startTime: '10:00 AM',
      endTime: '11:00 AM',
      room: 'Hall A - Room 206',
      type: 'Lecture'
    },
    {
      id: 'tt-13',
      day: 'Thursday',
      subjectId: 'sub2',
      subject: 'Data Structures & Algorithms',
      code: 'CS302',
      faculty: 'Prof. Grace Hopper',
      startTime: '11:15 AM',
      endTime: '12:15 PM',
      room: 'Hall B - Room 108',
      type: 'Tutorial'
    },
    // Friday
    {
      id: 'tt-14',
      day: 'Friday',
      subjectId: 'sub1',
      subject: 'Database Management Systems',
      code: 'CS301',
      faculty: 'Prof. Alan Turing',
      startTime: '09:00 AM',
      endTime: '10:00 AM',
      room: 'Hall A - Room 204',
      type: 'Lecture'
    },
    {
      id: 'tt-15',
      day: 'Friday',
      subjectId: 'sub2',
      subject: 'Data Structures & Algorithms',
      code: 'CS302',
      faculty: 'Prof. Grace Hopper',
      startTime: '10:00 AM',
      endTime: '11:00 AM',
      room: 'Hall B - Room 108',
      type: 'Lecture'
    },
    {
      id: 'tt-16',
      day: 'Friday',
      subjectId: 'sub4',
      subject: 'Mathematics III',
      code: 'MATH301',
      faculty: 'Prof. Carl Gauss',
      startTime: '11:15 AM',
      endTime: '12:15 PM',
      room: 'Auditorium West',
      type: 'Lecture'
    },
    {
      id: 'tt-17',
      day: 'Friday',
      subjectId: 'sub2',
      subject: 'DSA Laboratory',
      code: 'CS302L',
      faculty: 'Prof. Grace Hopper',
      startTime: '02:00 PM',
      endTime: '04:00 PM',
      room: 'Algorithms Lab 2',
      type: 'Lab'
    },
    // Saturday
    {
      id: 'tt-18',
      day: 'Saturday',
      subjectId: 'sub3',
      subject: 'Java Programming Tutorial',
      code: 'CS303T',
      faculty: 'Prof. James Gosling',
      startTime: '09:30 AM',
      endTime: '11:30 AM',
      room: 'Hall A - Room 206',
      type: 'Tutorial'
    }
  ],
  calendarEvents: [
    {
      id: 'evt-1',
      title: 'DBMS Internal Exam',
      type: 'Exam',
      subject: 'Database Management Systems',
      subjectCode: 'CS301',
      date: '2026-10-19',
      startTime: '10:00 AM',
      endTime: '11:30 AM',
      room: 'Hall A - Room 204',
      description: 'Internal Assessment on Relational Algebra, SQL DDL/DML, and Normalization (1NF - BCNF).',
      priority: 'High',
      status: 'Pending'
    },
    {
      id: 'evt-2',
      title: 'Java Assignment: Concurrency',
      type: 'Assignment',
      subject: 'Java Programming',
      subjectCode: 'CS303',
      date: '2026-10-20',
      startTime: '11:59 PM',
      endTime: '11:59 PM',
      room: 'Online Portal',
      description: 'Implement multi-threaded producer-consumer model using BlockingQueue and ExecutorService.',
      priority: 'Medium',
      status: 'Pending'
    },
    {
      id: 'evt-3',
      title: 'DSA Project Review Phase 1',
      type: 'Project',
      subject: 'Data Structures & Algorithms',
      subjectCode: 'CS302',
      date: '2026-10-22',
      startTime: '02:00 PM',
      endTime: '03:30 PM',
      room: 'Algorithms Lab 2',
      description: 'Review of Trie & Graph shortest-path implementation with Prof. Grace Hopper.',
      priority: 'High',
      status: 'Pending'
    },
    {
      id: 'evt-4',
      title: 'Autumn Mid-Semester Holiday',
      type: 'Holiday',
      subject: 'All Subjects',
      subjectCode: 'UNIV',
      date: '2026-10-25',
      startTime: 'All Day',
      endTime: 'All Day',
      room: 'Campus Wide',
      description: 'Official University Holiday. No classes conducted.',
      priority: 'Low',
      status: 'Completed'
    },
    {
      id: 'evt-5',
      title: 'Mathematics III Internal Exam',
      type: 'Exam',
      subject: 'Mathematics III',
      subjectCode: 'MATH301',
      date: '2026-10-28',
      startTime: '09:00 AM',
      endTime: '10:30 AM',
      room: 'Auditorium West',
      description: 'Mid-term evaluation covering Fourier Transforms and Complex Variables.',
      priority: 'High',
      status: 'Pending'
    },
    {
      id: 'evt-6',
      title: 'Annual Tech Symposium 2026',
      type: 'College Event',
      subject: 'University',
      subjectCode: 'ENG',
      date: '2026-10-30',
      startTime: '10:00 AM',
      endTime: '05:00 PM',
      room: 'Main Auditorium',
      description: 'Keynotes on Quantum Computing and AI Safety by guest researchers.',
      priority: 'Medium',
      status: 'Pending'
    },
    {
      id: 'evt-7',
      title: 'Attendance Shortage Alert - DSA',
      type: 'Attendance Reminder',
      subject: 'Data Structures & Algorithms',
      subjectCode: 'CS302',
      date: '2026-10-16',
      startTime: '08:30 AM',
      endTime: '09:00 AM',
      room: 'Portal Alert',
      description: 'Attendance currently at 70.0% (below 75.0% threshold). All upcoming DSA lectures must be attended.',
      priority: 'High',
      status: 'Pending'
    }
  ],
  calMonth: 9, // October (0-indexed: 0 = Jan, 9 = Oct)
  calYear: 2026,
  calFilterType: 'All',
  calFilterSubject: 'All',
  selectedCalDate: '2026-10-16',
  activeTimetableDay: 'Monday',
  activeTimetableView: 'calendar', // 'calendar' or 'planner'
  plannerPlan: {} // map of classId -> 'attend' | 'skip'
};

// Initialize State from LocalStorage
let appState = (() => {
  try {
    const saved = localStorage.getItem('smart_attendance_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure timetable & calendar exist if user had older state
      if (!parsed.timetable || parsed.timetable.length === 0) {
        parsed.timetable = DEFAULT_STATE.timetable;
      }
      if (!parsed.calendarEvents || parsed.calendarEvents.length === 0) {
        parsed.calendarEvents = DEFAULT_STATE.calendarEvents;
      }
      if (typeof parsed.calMonth === 'undefined') parsed.calMonth = 9;
      if (typeof parsed.calYear === 'undefined') parsed.calYear = 2026;
      if (!parsed.calFilterType) parsed.calFilterType = 'All';
      if (!parsed.calFilterSubject) parsed.calFilterSubject = 'All';
      if (!parsed.plannerPlan) parsed.plannerPlan = {};
      if (!parsed.activeTimetableDay) parsed.activeTimetableDay = 'Monday';
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
  showToast('Restored prototype default state and timetable', 'info');
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
    purpose: 'Post-Login Navigation Hub — Gives immediate access to key app functions (Today\'s Schedule, Timetable, Calendar, Predictor, Reports, Profile, Settings) along with top-level stats.'
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
    purpose: 'Option 3 - "Enrolled Subjects & Faculty" — Displays course details, individual course percentage, syllabus completion, weekly timetable slots, and faculty contacts.'
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
  },
  timetable: {
    pageNumber: '📅',
    pageBadge: 'TIMETABLE & ATTENDANCE PLANNER',
    appTitle: 'Smart Attendance',
    purpose: 'Weekly Timetable & Schedule Management — Manage class schedules from Monday to Saturday, plan weekly attendance, and simulate class skip impacts.'
  },
  calendar: {
    pageNumber: '🗓️',
    pageBadge: 'ACADEMIC CALENDAR & DEADLINES',
    appTitle: 'Smart Attendance',
    purpose: 'Academic Calendar — Monthly schedule view, exam timetables, assignment submission deadlines, academic events, and date-specific attendance alerts.'
  }
};

// -------------------------------------------------------------
// Time & Schedule Calculation Utilities
// -------------------------------------------------------------
function timeToMinutes(timeStr) {
  if (!timeStr) return 0;
  const m = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (!m) return 0;
  let hours = parseInt(m[1], 10);
  const minutes = parseInt(m[2], 10);
  const modifier = m[3] ? m[3].toUpperCase() : null;
  if (modifier === 'PM' && hours < 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

function getDayName(dateObj = new Date()) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dateObj.getDay()];
}

function findTimeConflict(day, startTime, endTime, excludeId = null) {
  const startMin = timeToMinutes(startTime);
  const endMin = timeToMinutes(endTime);
  if (startMin >= endMin) {
    return { isInvalidTime: true };
  }
  const dayClasses = appState.timetable.filter(c => c.day === day && c.id !== excludeId);
  for (const c of dayClasses) {
    const cStart = timeToMinutes(c.startTime);
    const cEnd = timeToMinutes(c.endTime);
    if (startMin < cEnd && endMin > cStart) {
      return { conflict: c };
    }
  }
  return null;
}

function getSubjectForClass(classOrSubject) {
  if (!classOrSubject) return appState.subjects[0];
  const name = classOrSubject.subject || classOrSubject.name || '';
  const code = classOrSubject.code || classOrSubject.subjectCode || '';
  const sub = appState.subjects.find(s => 
    s.code === code || 
    s.name.toLowerCase() === name.toLowerCase() ||
    name.toLowerCase().includes(s.name.toLowerCase()) ||
    s.name.toLowerCase().includes(name.toLowerCase())
  );
  return sub || appState.subjects[0];
}

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

// -------------------------------------------------------------
// "Can I Skip This Class?" Simulation Engine
// -------------------------------------------------------------
function calculateCanSkipImpact(classEntry) {
  const subject = getSubjectForClass(classEntry);
  const minThreshold = appState.settings.minimumAttendance;
  const warningMargin = appState.settings.warningBuffer;

  const currentAttended = subject.attended;
  const currentTotal = subject.total;
  const currentPct = calculateSubjectPercentage(currentAttended, currentTotal);

  // If student attends:
  const attendAttended = currentAttended + 1;
  const attendTotal = currentTotal + 1;
  const attendPct = Number(((attendAttended / attendTotal) * 100).toFixed(1));

  // If student skips:
  const skipAttended = currentAttended;
  const skipTotal = currentTotal + 1;
  const skipPct = Number(((skipAttended / skipTotal) * 100).toFixed(1));

  // Overall aggregate impact:
  const aggAttended = appState.predictor.currentAttended;
  const aggTotal = appState.predictor.totalConducted;
  const currentAggPct = Number(((aggAttended / aggTotal) * 100).toFixed(1));
  const skipAggPct = Number(((aggAttended / (aggTotal + 1)) * 100).toFixed(1));
  const attendAggPct = Number((((aggAttended + 1) / (aggTotal + 1)) * 100).toFixed(1));

  let status = 'safe';
  let badge = '🟢 Safe';
  let title = 'Safe to Skip';
  let advice = '';

  if (skipPct >= minThreshold + warningMargin) {
    status = 'safe';
    badge = '🟢 Safe to Skip';
    title = 'Safe to Skip';
    advice = `Your current ${subject.name} attendance is ${currentPct.toFixed(1)}%. Skipping this class drops it to ${skipPct.toFixed(1)}%, which remains safely above your ${minThreshold.toFixed(1)}% requirement.`;
  } else if (skipPct >= minThreshold) {
    status = 'warning';
    badge = '🟡 Caution';
    title = 'Caution: Near Target Margin';
    advice = `Skipping this class drops your ${subject.name} attendance to ${skipPct.toFixed(1)}%, entering your +${warningMargin.toFixed(1)}% warning buffer. Skipping is not recommended if further absences are expected.`;
  } else {
    status = 'risk';
    badge = '🔴 Risk: Debarment Danger';
    title = 'Not Recommended to Skip';
    advice = `Skipping this lecture drops attendance to ${skipPct.toFixed(1)}%, falling below your mandatory ${minThreshold.toFixed(1)}% target! You must attend this class to maintain examination clearance.`;
  }

  return {
    subject,
    currentPct,
    attendPct,
    skipPct,
    currentAggPct,
    attendAggPct,
    skipAggPct,
    status,
    badge,
    title,
    advice,
    minThreshold
  };
}

function openCanSkipModal(classIdOrObj) {
  let classEntry = null;
  if (typeof classIdOrObj === 'string') {
    classEntry = appState.timetable.find(c => c.id === classIdOrObj);
  } else {
    classEntry = classIdOrObj;
  }
  if (!classEntry) return;

  const impact = calculateCanSkipImpact(classEntry);
  const modalContainer = document.getElementById('modal-container');
  modalContainer.className = 'modal-overlay';
  modalContainer.innerHTML = `
    <div class="modal-content max-w-lg p-6">
      <div class="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
        <div class="flex items-center gap-2">
          <span class="text-xl">🔮</span>
          <h3 class="text-sm font-bold text-slate-900">"Can I Skip This Class?" Simulation</h3>
        </div>
        <button onclick="closeModal()" class="text-slate-400 hover:text-slate-600 text-lg font-bold">&times;</button>
      </div>

      <!-- Class Header Box -->
      <div class="bg-slate-50 border border-slate-200 rounded-lg p-3.5 mb-4 text-xs">
        <div class="flex items-center justify-between mb-1">
          <span class="font-bold text-slate-900 text-sm">${classEntry.subject}</span>
          <span class="badge-lecture">${classEntry.code || ''} • ${classEntry.type || 'Lecture'}</span>
        </div>
        <div class="text-slate-600">
          <span>⏰ ${classEntry.startTime} - ${classEntry.endTime}</span> • 
          <span>📍 ${classEntry.room}</span> • 
          <span>👤 ${classEntry.faculty}</span>
        </div>
      </div>

      <!-- Result Banner -->
      <div class="p-4 rounded-xl border mb-5 flex items-center justify-between ${
        impact.status === 'safe' ? 'bg-emerald-50 border-emerald-300 text-emerald-900' :
        impact.status === 'warning' ? 'bg-amber-50 border-amber-300 text-amber-900' :
        'bg-rose-50 border-rose-300 text-rose-900'
      }">
        <div>
          <div class="text-xs uppercase tracking-wider font-bold opacity-80">Recommendation Result</div>
          <div class="text-lg font-extrabold mt-0.5">${impact.title}</div>
        </div>
        <span class="px-3 py-1 rounded-full text-xs font-bold ${
          impact.status === 'safe' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
          impact.status === 'warning' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
          'bg-rose-100 text-rose-800 border border-rose-300'
        }">${impact.badge}</span>
      </div>

      <!-- Simulation Comparison Cards -->
      <div class="grid grid-cols-3 gap-3 mb-5 text-center">
        <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <div class="text-[10px] font-bold text-slate-500 uppercase">Current</div>
          <div class="text-xl font-bold text-slate-900 mt-1">${impact.currentPct.toFixed(1)}%</div>
          <div class="text-[10px] text-slate-400 mt-0.5">${impact.subject.attended}/${impact.subject.total} classes</div>
        </div>

        <div class="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
          <div class="text-[10px] font-bold text-emerald-700 uppercase">If You Attend</div>
          <div class="text-xl font-bold text-emerald-700 mt-1">${impact.attendPct.toFixed(1)}%</div>
          <div class="text-[10px] text-emerald-600 mt-0.5">+0.7% boost</div>
        </div>

        <div class="p-3 ${impact.status === 'safe' ? 'bg-teal-50 border-teal-200' : 'bg-rose-50 border-rose-200'} rounded-lg">
          <div class="text-[10px] font-bold ${impact.status === 'safe' ? 'text-teal-700' : 'text-rose-700'} uppercase">If You Skip</div>
          <div class="text-xl font-bold ${impact.status === 'safe' ? 'text-teal-700' : 'text-rose-700'} mt-1">${impact.skipPct.toFixed(1)}%</div>
          <div class="text-[10px] ${impact.status === 'safe' ? 'text-teal-600' : 'text-rose-600'} mt-0.5">impact on total</div>
        </div>
      </div>

      <!-- Detailed Advice -->
      <div class="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed mb-5">
        <div class="font-bold text-slate-900 mb-1">Impact Analysis:</div>
        <p>${impact.advice}</p>
        <div class="mt-2 text-[11px] text-slate-500 pt-2 border-t border-slate-200">
          Overall aggregate attendance drops from <span class="font-semibold text-slate-800">${impact.currentAggPct}%</span> to <span class="font-semibold text-slate-800">${impact.skipAggPct}%</span> if skipped.
        </div>
      </div>

      <div class="flex items-center justify-end gap-2">
        <button onclick="closeModal()" class="proto-btn-primary text-xs py-2 px-4">Got It</button>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// Navigation Handler
// -------------------------------------------------------------
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
  document.getElementById('proto-page-number').textContent = typeof meta.pageNumber === 'number' 
    ? `Page ${meta.pageNumber} of 8` 
    : meta.pageBadge;

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
      attachDashboardEvents();
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
    case 'timetable':
      mount.innerHTML = renderPageTimetable();
      attachTimetableEvents();
      break;
    case 'calendar':
      mount.innerHTML = renderPageCalendar();
      attachCalendarEvents();
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
    type === 'warning' ? 'bg-amber-600' : 'bg-teal-600'
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
        <p class="text-xs text-slate-500 mt-1">Access your real-time attendance predictions, timetable schedule & academic calendar</p>
      </div>

      <!-- Main Login Container Card -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs mb-6">
        <!-- Left Column: Welcome & Highlights -->
        <div class="bg-teal-50 border border-teal-100 rounded-lg p-5 flex flex-col justify-between">
          <div>
            <h2 class="text-base font-bold text-teal-900 mb-2">Welcome Back, Student</h2>
            <p class="text-xs text-slate-600 leading-relaxed mb-4">
              Log in with your university credentials to calculate attendance thresholds, track class schedules, and review AI recommendations.
            </p>
            <div class="flex flex-col gap-2.5 text-xs text-slate-700 font-medium">
              <div class="flex items-center gap-2">
                <span class="text-teal-600 font-bold">✔</span>
                <span>Instant risk detection for low attendance</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-teal-600 font-bold">✔</span>
                <span>Real-time "What-If" semester simulation</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-teal-600 font-bold">✔</span>
                <span>Automated subject-wise safety warnings</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-teal-600 font-bold">✔</span>
                <span>Weekly timetable & smart "Can I Skip?" planner</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-teal-600 font-bold">✔</span>
                <span>Academic calendar with exams & deadline tracking</span>
              </div>
            </div>
          </div>
          <div class="mt-4 pt-3 border-t border-teal-200/60 text-[11px] text-teal-800">
            <span class="font-bold">Official Demo Credentials:</span><br>
            Student ID: <code class="font-mono font-bold text-teal-950">CS-2023-8941</code><br>
            Password: <code class="font-mono font-bold text-teal-950">student123</code>
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

            <button type="submit" class="proto-btn-primary w-full mt-2 py-2.5 bg-teal-600 hover:bg-teal-700 font-semibold text-sm rounded-md transition shadow-sm flex items-center justify-center gap-2">
              <span>Sign In to Dashboard</span>
              <span>→</span>
            </button>

            <button type="button" id="btn-fill-demo" class="text-xs text-teal-600 hover:text-teal-800 hover:underline text-center font-medium">
              Fill Alex Morgan Demo Credentials
            </button>
          </form>
        </div>
      </div>

      <!-- Active Demo Session Banner -->
      <div class="bg-teal-50 border-l-4 border-teal-600 rounded-r-lg p-4 text-xs text-slate-700">
        <div class="font-bold text-slate-900 mb-0.5">Active Demo Session</div>
        <div>Currently authenticated as: <span class="font-semibold text-slate-900">Alex Morgan (BS CS - Semester 5, ID: CS-2023-8941)</span>. Mandatory Target Threshold: <span class="font-semibold text-teal-700">${currentThreshold}%</span>.</div>
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
  const minThreshold = appState.settings.minimumAttendance;

  // Timetable statistics
  const currentDay = appState.activeTimetableDay || 'Monday';
  const todayClasses = appState.timetable.filter(c => c.day === currentDay);
  const totalClassesThisWeek = appState.timetable.length;
  const labsThisWeek = appState.timetable.filter(c => c.type === 'Lab').length;
  const freePeriods = Math.max(0, 6 - todayClasses.length);
  const atRiskSubjects = appState.subjects.filter(s => calculateSubjectPercentage(s.attended, s.total) < minThreshold);

  // Next class calculation
  const nextClass = todayClasses.length > 0 ? todayClasses[0] : null;

  // Today's classes list HTML
  let todayClassesHtml = '';
  if (todayClasses.length === 0) {
    todayClassesHtml = `
      <div class="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-lg border border-slate-200">
        No more classes scheduled for today (${currentDay}). Enjoy your free time!
      </div>
    `;
  } else {
    todayClassesHtml = todayClasses.map((c, index) => {
      const sub = getSubjectForClass(c);
      const pct = calculateSubjectPercentage(sub.attended, sub.total);
      const stat = evaluateStatus(pct);
      const isOngoing = index === 0; // First class simulated as ongoing for demo
      const isNext = index === 1;

      return `
        <div class="class-slot-card ${isOngoing ? 'ongoing-card' : (isNext ? 'next-card' : '')} mb-3">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="font-bold text-slate-900 text-sm">${c.subject}</span>
              <span class="${c.type === 'Lab' ? 'badge-lab' : (c.type === 'Tutorial' ? 'badge-tutorial' : 'badge-lecture')}">${c.code || ''} • ${c.type}</span>
              ${isOngoing ? '<span class="badge-ongoing">● Ongoing Now</span>' : ''}
              ${isNext ? '<span class="badge-next">Next Class</span>' : ''}
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-semibold ${stat.textClass}">Attendance: ${pct.toFixed(1)}%</span>
              <span class="${stat.badgeClass} text-[10px]">${stat.label}</span>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500 gap-2 pt-2 border-t border-slate-100">
            <div>
              <span>⏰ <strong class="text-slate-700">${c.startTime} – ${c.endTime}</strong></span> • 
              <span>📍 ${c.room}</span> • 
              <span>👤 ${c.faculty}</span>
            </div>
            <div>
              <button onclick="openCanSkipModal('${c.id}')" class="px-2.5 py-1 rounded bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 text-xs font-semibold transition flex items-center gap-1">
                <span>🔮 Can I Skip This Class?</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Today's Calendar Events
  const todayDateStr = appState.selectedCalDate || '2026-10-16';
  const todayCalEvents = appState.calendarEvents.filter(e => e.date === todayDateStr);
  const todayEventsHtml = todayCalEvents.length > 0 ? todayCalEvents.map(e => `
    <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs mb-2">
      <div class="flex items-center gap-2">
        <span class="font-bold text-slate-900">${e.startTime !== 'All Day' ? e.startTime + ' — ' : ''}${e.title}</span>
        <span class="text-[10px] px-2 py-0.5 rounded font-bold ${
          e.type === 'Exam' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
          e.type === 'Assignment' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
          'bg-teal-100 text-teal-800 border border-teal-200'
        }">${e.type}</span>
      </div>
      <span class="text-slate-500">${e.room || e.subject}</span>
    </div>
  `).join('') : `
    <div class="p-3 text-center text-xs text-slate-500 bg-slate-50 rounded-lg border border-slate-200">
      No events scheduled for today.
    </div>
  `;

  // Upcoming Calendar Deadlines & Events (next 4)
  const upcomingEvents = [...appState.calendarEvents]
    .filter(e => e.type === 'Exam' || e.type === 'Assignment' || e.type === 'Project')
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 4);

  const upcomingEventsHtml = upcomingEvents.map(e => {
    return `
      <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs mb-2">
        <div>
          <div class="font-semibold text-slate-900">${e.title}</div>
          <div class="text-[11px] text-slate-500">${e.date} • ${e.startTime} • ${e.subject}</div>
        </div>
        <div class="text-right">
          <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
            e.priority === 'High' ? 'bg-rose-100 text-rose-800 border border-rose-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
          }">${e.priority} Priority</span>
          ${e.status === 'Completed' ? '<span class="block text-[10px] text-emerald-600 font-bold mt-0.5">✔ Done</span>' : ''}
        </div>
      </div>
    `;
  }).join('');

  // Quick subject summary rows
  const subjectRows = appState.subjects.map(sub => {
    const pct = calculateSubjectPercentage(sub.attended, sub.total);
    const stat = evaluateStatus(pct);
    const weeklyCount = appState.timetable.filter(c => getSubjectForClass(c).id === sub.id).length;

    return `
      <tr>
        <td class="font-medium text-slate-900">
          <div>${sub.name}</div>
          <div class="text-[11px] text-slate-400 font-normal">${sub.code} • ${weeklyCount} classes/wk</div>
        </td>
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
      <div class="bg-teal-700 rounded-xl p-5 sm:p-6 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 shadow-xs">
        <div>
          <h1 class="text-xl sm:text-2xl font-bold tracking-tight">Welcome, Alex Morgan 👋</h1>
          <p class="text-xs sm:text-sm text-teal-100 mt-1">Select an option below or review your current ${aggPct.toFixed(1)}% aggregate attendance.</p>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="navigateTo('timetable')" class="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold border border-teal-400 transition">
            📅 View Timetable
          </button>
          <span class="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold ${
            aggStatus.isSafe ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
            aggStatus.isWarning ? 'bg-amber-100 text-amber-800 border border-amber-300' :
            'bg-rose-100 text-rose-800 border border-rose-300'
          }">
            OVERALL: ${aggStatus.label}
          </span>
        </div>
      </div>

      <!-- 9. Timetable Quick Statistics Bar -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6">
        <div class="p-3 bg-white border border-slate-200 rounded-xl text-center shadow-xs">
          <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Classes Today</div>
          <div class="text-xl font-bold text-slate-900 mt-0.5">${todayClasses.length}</div>
          <div class="text-[10px] text-teal-600 font-medium">${currentDay}</div>
        </div>

        <div class="p-3 bg-white border border-slate-200 rounded-xl text-center shadow-xs">
          <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Classes This Week</div>
          <div class="text-xl font-bold text-slate-900 mt-0.5">${totalClassesThisWeek}</div>
          <div class="text-[10px] text-slate-400">Mon - Sat</div>
        </div>

        <div class="p-3 bg-white border border-slate-200 rounded-xl text-center shadow-xs">
          <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Labs This Week</div>
          <div class="text-xl font-bold text-purple-700 mt-0.5">${labsThisWeek}</div>
          <div class="text-[10px] text-slate-400">Practical Sessions</div>
        </div>

        <div class="p-3 bg-white border border-slate-200 rounded-xl text-center shadow-xs">
          <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Free Periods</div>
          <div class="text-xl font-bold text-emerald-700 mt-0.5">${freePeriods}</div>
          <div class="text-[10px] text-slate-400">Available Slots</div>
        </div>

        <div class="p-3 bg-white border border-slate-200 rounded-xl text-center shadow-xs">
          <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Next Class</div>
          <div class="text-xs font-bold text-slate-900 truncate mt-1">${nextClass ? nextClass.startTime : 'None'}</div>
          <div class="text-[10px] text-teal-600 font-medium truncate">${nextClass ? nextClass.code : 'Free'}</div>
        </div>

        <div class="p-3 bg-white border border-slate-200 rounded-xl text-center shadow-xs">
          <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">At Risk Subjects</div>
          <div class="text-xl font-bold ${atRiskSubjects.length > 0 ? 'text-rose-600' : 'text-emerald-600'} mt-0.5">${atRiskSubjects.length}</div>
          <div class="text-[10px] text-rose-600 font-medium">${atRiskSubjects.length > 0 ? atRiskSubjects[0].code : 'All Safe'}</div>
        </div>
      </div>

      <!-- 10. Smart Attendance Alerts Banner -->
      <div class="bg-teal-50/70 border border-teal-200 rounded-xl p-4 mb-6 shadow-xs">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-base">🔔</span>
          <h2 class="text-xs font-bold text-teal-950 uppercase tracking-wider">Smart Attendance & Schedule Alerts</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div class="bg-white p-3 rounded-lg border border-amber-200 text-amber-900">
            <span class="font-bold text-amber-700">⚠️ Attendance Warning:</span> Your Data Structures & Algorithms attendance is <strong>70.0%</strong>. You have DSA lectures scheduled. Attending will elevate you toward your 75.0% target.
          </div>
          <div class="bg-white p-3 rounded-lg border border-emerald-200 text-emerald-900">
            <span class="font-bold text-emerald-700">✔ Safe Attendance:</span> Your Mathematics III attendance is <strong>95.0%</strong>, comfortably above your required threshold.
          </div>
          <div class="bg-white p-3 rounded-lg border border-teal-200 text-teal-900">
            <span class="font-bold text-teal-700">📅 Upcoming Lab:</span> DBMS Laboratory session is scheduled for Wednesday at 02:00 PM in Database Lab 1.
          </div>
        </div>
      </div>

      <!-- 2. Today's Schedule Card -->
      <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-xs mb-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-lg">🕒</span>
              <h2 class="text-sm font-bold text-slate-900">Today's Schedule</h2>
              <span class="text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-bold">${currentDay}</span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">Classes scheduled for today with real-time class status & skip simulation</p>
          </div>

          <!-- Day Switcher Pills -->
          <div class="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            ${['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => `
              <button onclick="changeActiveDay('${day}')" class="day-tab ${day === currentDay ? 'active-day' : ''}">
                ${day.slice(0, 3)}
              </button>
            `).join('')}
          </div>
        </div>

        <div>
          ${todayClassesHtml}
        </div>
      </div>

      <!-- Dashboard Grid: Today's Events & Upcoming Deadlines -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <!-- 6. Today's Events -->
        <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <span class="text-base">📌</span>
              <h2 class="text-sm font-bold text-slate-900">Today's Events</h2>
            </div>
            <button onclick="navigateTo('calendar')" class="text-xs text-blue-600 hover:underline font-semibold">Calendar →</button>
          </div>
          <div>
            ${todayEventsHtml}
          </div>
        </div>

        <!-- 7. Upcoming Events & Deadlines -->
        <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <span class="text-base">⏳</span>
              <h2 class="text-sm font-bold text-slate-900">Upcoming Events & Deadlines</h2>
            </div>
            <button onclick="navigateTo('calendar')" class="text-xs text-blue-600 hover:underline font-semibold">View All →</button>
          </div>
          <div>
            ${upcomingEventsHtml}
          </div>
        </div>
      </div>

      <!-- Post-Login Application Options Heading -->
      <div class="mb-3">
        <h2 class="text-sm font-bold text-slate-800">Application Navigation & Tools</h2>
      </div>

      <!-- Navigation Grid: 8 Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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

        <!-- 7. Timetable & Planner -->
        <div class="dash-card border-teal-200 bg-teal-50/30" onclick="navigateTo('timetable')">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-lg">📅</span>
            <span class="font-bold text-teal-900 text-sm">7. Timetable & Planner</span>
          </div>
          <p class="text-xs text-slate-500 leading-normal">Weekly timetable, class slots and skip planner.</p>
          <span class="text-[11px] text-teal-600 mt-2 font-medium">Full Schedule</span>
        </div>

        <!-- 8. Academic Calendar -->
        <div class="dash-card border-teal-200 bg-teal-50/30" onclick="navigateTo('calendar')">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-lg">🗓️</span>
            <span class="font-bold text-teal-900 text-sm">8. Academic Calendar</span>
          </div>
          <p class="text-xs text-slate-500 leading-normal">Monthly calendar, exams, assignments & deadlines.</p>
          <span class="text-[11px] text-teal-600 mt-2 font-medium">Calendar Grid</span>
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

function attachDashboardEvents() {}

function changeActiveDay(day) {
  appState.activeTimetableDay = day;
  saveState();
  const mount = document.getElementById('screen-mount');
  mount.innerHTML = renderPage2Dashboard();
  attachDashboardEvents();
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
  const minRequiredTotalAttended = Math.ceil(projectedTotal * (minThreshold / 100));
  const mustAttendRemaining = Math.max(0, minRequiredTotalAttended - p.currentAttended);
  const maxSafeMissesPossible = Math.max(0, p.upcomingRemaining - mustAttendRemaining);
  const maxPossibleAttended = p.currentAttended + p.upcomingRemaining;
  const maxPossiblePct = projectedTotal > 0 ? ((maxPossibleAttended / projectedTotal) * 100).toFixed(1) : 0;
  const plannedMisses = Math.max(0, p.upcomingRemaining - p.classesIntend);

  // Dynamic recommendation message
  let recHtml = '';
  if (projectedPct >= minThreshold) {
    recHtml = `You can safely miss up to <span class="font-bold text-slate-900">${plannedMisses} remaining lectures</span> without dropping below the <span class="font-semibold text-slate-900">${minThreshold.toFixed(1)}%</span> threshold. Attending all ${p.upcomingRemaining} remaining lectures elevates your final score to <span class="font-bold text-emerald-700">${maxPossiblePct}%</span>.`;
  } else if (mustAttendRemaining <= p.upcomingRemaining) {
    recHtml = `⚠️ <strong class="text-rose-700">Attendance Risk Alert:</strong> Intending to attend only ${p.classesIntend} classes drops your projected attendance to ${projectedPct.toFixed(1)}%, which is below the ${minThreshold.toFixed(1)}% threshold. You must attend at least <span class="font-bold text-slate-900">${mustAttendRemaining} of the ${p.upcomingRemaining} remaining classes</span> (safely missing at most ${maxSafeMissesPossible}) to stay eligible. Attending all remaining lectures reaches <span class="font-bold text-emerald-700">${maxPossiblePct}%</span>.`;
  } else {
    recHtml = `🚨 <strong class="text-rose-700">Attendance Shortage Warning:</strong> Even if you attend all ${p.upcomingRemaining} remaining lectures, your maximum attendance will only reach <span class="font-bold text-rose-700">${maxPossiblePct}%</span>, which is below the mandatory ${minThreshold.toFixed(1)}% threshold. Please consult your academic advisor (Dr. Alan Kay) regarding condonation.`;
  }

  // 4 & 5. Subject-Wise Timetable Predictions Section
  const subjectPredictionCards = appState.subjects.map(sub => {
    const weeklyCount = appState.timetable.filter(c => getSubjectForClass(c).id === sub.id).length;
    const estimatedUpcoming = Math.round((p.upcomingRemaining / appState.timetable.length) * weeklyCount * 1.5) || 8;
    const currentPct = calculateSubjectPercentage(sub.attended, sub.total);
    const missed = sub.total - sub.attended;
    const targetAttended = Math.ceil((sub.total + estimatedUpcoming) * (minThreshold / 100));
    const mustAttend = Math.max(0, targetAttended - sub.attended);
    const canSafelyMiss = Math.max(0, estimatedUpcoming - mustAttend);
    const isBelow = currentPct < minThreshold;

    return `
      <div class="p-4 bg-white border border-slate-200 rounded-xl shadow-xs flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <span class="font-bold text-slate-900 text-sm">${sub.name}</span>
            <span class="text-xs font-bold ${isBelow ? 'text-rose-600' : 'text-emerald-600'}">${currentPct.toFixed(1)}%</span>
          </div>
          <div class="text-[11px] text-slate-500 mb-3">${sub.code} • ${weeklyCount} classes/week scheduled</div>

          <div class="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg mb-3">
            <div>Attended: <strong class="text-slate-900">${sub.attended}</strong> / ${sub.total}</div>
            <div>Missed: <strong class="text-slate-900">${missed}</strong></div>
            <div>Upcoming Classes: <strong class="text-teal-700">${estimatedUpcoming}</strong></div>
            <div>Target: <strong class="text-slate-900">${minThreshold.toFixed(1)}%</strong></div>
          </div>

          <div class="text-xs ${isBelow ? 'text-rose-700 font-semibold' : 'text-slate-700'} mb-3">
            ${isBelow 
              ? `⚠️ <strong>Attendance Below Target:</strong> Attend the next <span class="font-bold underline">${mustAttend} classes</span> to reach approximately ${minThreshold.toFixed(1)}% target.` 
              : `✔ <strong>Safe Standing:</strong> You can safely miss up to <span class="font-bold">${canSafelyMiss} upcoming classes</span> without breaching target.`}
          </div>
        </div>

        <div>
          <button onclick="openCanSkipModal('${sub.code}')" class="w-full py-1.5 px-3 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 text-xs font-semibold transition flex items-center justify-center gap-1.5">
            <span>🔮 Simulate Skipping Next Class</span>
          </button>
        </div>
      </div>
    `;
  }).join('');

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
              <input type="number" id="pred-intend" class="proto-input border-teal-300 bg-teal-50" value="${p.classesIntend}" min="0">
            </div>
          </div>
        </div>

        <!-- Right: Projected End Attendance Card -->
        <div class="bg-teal-50 border border-teal-100 rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-xs">
          <span class="text-xs font-bold text-teal-700 uppercase tracking-wider mb-3">PROJECTED END ATTENDANCE</span>

          <div class="text-5xl font-extrabold ${projectedPct >= minThreshold ? 'text-emerald-600' : 'text-rose-600'} mb-3 tracking-tight">
            ${projectedPct.toFixed(1)}%
          </div>

          <div class="mb-4">
            ${statusBadgeHtml}
          </div>

          <p class="text-xs text-teal-900 leading-relaxed max-w-xs font-medium">
            Attending <span class="font-bold">${p.classesIntend}</span> out of <span class="font-bold">${p.upcomingRemaining}</span> remaining classes results in <span class="font-bold">${projectedAttended} / ${projectedTotal}</span> total classes.
          </p>
        </div>
      </div>

      <!-- Smart Recommendation Engine Card -->
      <div class="bg-white border-l-4 ${projectedPct >= minThreshold ? 'border-emerald-500' : 'border-rose-500'} border-t border-r border-b border-slate-200 rounded-r-xl p-5 shadow-xs mb-8">
        <h2 class="text-xs font-bold ${projectedPct >= minThreshold ? 'text-emerald-700' : 'text-rose-700'} mb-1.5 flex items-center gap-1.5">
          <span>Smart Recommendation Engine</span>
        </h2>
        <p class="text-xs text-slate-700 leading-relaxed font-normal">
          💡 ${recHtml}
        </p>
      </div>

      <!-- Subject-Wise Timetable Predictions -->
      <div class="mb-3">
        <h2 class="text-sm font-bold text-slate-800">Subject-Wise Timetable Predictions & Skip Impact</h2>
        <p class="text-xs text-slate-500">Upcoming classes derived dynamically from your weekly timetable</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${subjectPredictionCards}
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
    const barColor = stat.isRisk ? '#f43f5e' : (stat.isWarning ? '#f59e0b' : '#4f46e5');

    // 8. Subject-Wise Timetable Information
    const subjectClasses = appState.timetable.filter(c => getSubjectForClass(c).id === sub.id);
    const weeklySlots = subjectClasses.map(c => `${c.day.slice(0, 3)} ${c.startTime}`).join(' • ');
    const nextSlot = subjectClasses.length > 0 ? `${subjectClasses[0].day}, ${subjectClasses[0].startTime} (${subjectClasses[0].room})` : 'TBA';

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
          <p class="text-xs text-slate-500 mb-3">${sub.code} • ${sub.professor}</p>

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

          <!-- 8. Weekly Timetable Info Box -->
          <div class="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 mb-4">
            <div class="flex items-center justify-between font-semibold text-slate-800 mb-1">
              <span>Weekly Schedule:</span>
              <span class="text-[10px] px-2 py-0.5 rounded bg-teal-50 text-teal-700 font-bold border border-teal-200">${subjectClasses.length} classes / week</span>
            </div>
            <div class="text-[11px] text-slate-600 mb-2">${weeklySlots || 'No slots configured'}</div>
            <div class="text-[11px] text-slate-500 pt-1.5 border-t border-slate-200">
              Upcoming class: <strong class="text-teal-900">${nextSlot}</strong>
            </div>
          </div>
        </div>

        <div>
          <button onclick="openCanSkipModal('${sub.code}')" class="w-full mb-3 py-1.5 px-3 rounded bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 text-xs font-semibold transition flex items-center justify-center gap-1.5">
            <span>🔮 Can I Skip Next Class?</span>
          </button>

          <!-- Email Link -->
          <div class="pt-3 border-t border-slate-100 text-xs text-slate-500">
            Email: <a href="mailto:${sub.professorEmail}" class="text-blue-600 hover:underline font-medium">${sub.professorEmail}</a>
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="py-2">
      <!-- Title -->
      <div class="mb-5 flex items-center justify-between">
        <div>
          <h1 class="text-xl font-bold text-slate-900 tracking-tight">Enrolled Subjects & Faculty Contacts</h1>
          <p class="text-xs text-slate-500 mt-0.5">Subject attendance metrics, syllabus completion, and weekly timetable slots</p>
        </div>
        <button onclick="navigateTo('timetable')" class="proto-btn-primary text-xs py-1.5 px-3">
          📅 Weekly Timetable
        </button>
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
          <button onclick="downloadReport('${rep.id}')" class="text-blue-600 hover:text-teal-800 font-semibold text-xs transition flex items-center gap-1">
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
      <div class="bg-teal-50 border border-teal-100 rounded-xl p-5 shadow-xs">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <h2 class="text-xs font-bold text-teal-900">Examination Clearance Status</h2>
            <span class="px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
              isCleared ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-300'
            }">
              ${isCleared ? 'ELIGIBLE / CLEARED' : 'NOT ELIGIBLE / ATTENDANCE SHORTAGE'}
            </span>
          </div>
          <button onclick="viewHallTicket()" class="text-xs px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md shadow-xs transition">
            View Hall Ticket
          </button>
        </div>
        <p class="text-xs text-slate-700 leading-relaxed">
          Students with an aggregate attendance equal to or greater than <span class="font-semibold text-slate-900">${minThreshold.toFixed(1)}%</span> are automatically cleared for end-semester examinations. Your aggregate of <span class="font-bold text-teal-900">${aggPct.toFixed(1)}%</span> ${
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
    openPrintableStatement(rep);
  }
}

function openPrintableStatement(rep) {
  const modalContainer = document.getElementById('modal-container');
  modalContainer.className = 'modal-overlay';
  modalContainer.innerHTML = `
    <div class="modal-content max-w-2xl p-8" id="printable-document">
      <div class="flex justify-between items-start border-b-2 border-teal-900 pb-4 mb-6">
        <div>
          <div class="text-xs font-bold text-teal-700 uppercase tracking-widest">Office of the Registrar</div>
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
          <div><span class="font-semibold text-slate-900">Aggregate Attendance:</span> <span class="font-bold text-teal-900">${rep.overallPct.toFixed(1)}%</span></div>
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
      <div class="flex justify-between items-center border-b-2 border-teal-900 pb-4 mb-6">
        <div>
          <div class="text-[11px] font-bold text-teal-700 uppercase tracking-wider">Apex State University</div>
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
          <div><span class="font-semibold text-slate-900">Aggregate Attendance:</span> <span class="font-bold text-teal-900">${aggPct.toFixed(1)}%</span></div>
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
      <div class="bg-white border-t-2 border-teal-600 border border-slate-200 rounded-b-xl rounded-t-sm p-6 shadow-xs">
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
              <input type="number" id="setting-threshold" class="proto-input w-24 text-right font-bold text-teal-700 bg-teal-50 border-teal-200" value="${s.minimumAttendance.toFixed(1)}" step="0.5" min="50" max="100">
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
          <div class="text-[11px] text-slate-500">Reset simulator inputs, thresholds, discrepancy requests, timetable, and calendar events back to prototype defaults.</div>
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

// -------------------------------------------------------------
// NEW PAGE: TIMETABLE & ATTENDANCE PLANNER
// -------------------------------------------------------------
function renderPageTimetable() {
  const activeDay = appState.activeTimetableDay || 'Monday';
  const activeView = appState.activeTimetableView || 'calendar'; // 'calendar' or 'planner'
  const minThreshold = appState.settings.minimumAttendance;

  // Filter classes by day or show all if selected
  const isAllDays = activeDay === 'All';
  const displayedClasses = isAllDays 
    ? [...appState.timetable].sort((a, b) => a.day.localeCompare(b.day) || timeToMinutes(a.startTime) - timeToMinutes(b.startTime))
    : appState.timetable.filter(c => c.day === activeDay).sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

  // Calendar View Content
  let calendarViewHtml = '';
  if (displayedClasses.length === 0) {
    calendarViewHtml = `
      <div class="p-8 text-center text-xs text-slate-500 bg-white rounded-xl border border-slate-200">
        <span class="text-3xl block mb-2">📅</span>
        <span class="font-bold text-slate-800 text-sm">No classes scheduled for ${activeDay}</span>
        <p class="text-slate-400 mt-1">Click "+ Add Class" to configure lecture or lab slots for this day.</p>
      </div>
    `;
  } else {
    calendarViewHtml = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${displayedClasses.map(c => {
          const sub = getSubjectForClass(c);
          const pct = calculateSubjectPercentage(sub.attended, sub.total);
          const stat = evaluateStatus(pct);

          return `
            <div class="class-slot-card bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-2">
                    <span class="${c.type === 'Lab' ? 'badge-lab' : (c.type === 'Tutorial' ? 'badge-tutorial' : 'badge-lecture')}">${c.type}</span>
                    <span class="text-xs font-bold text-slate-500">${c.day}</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="${stat.badgeClass} text-[10px]">${pct.toFixed(1)}% • ${stat.label}</span>
                  </div>
                </div>

                <h3 class="text-sm font-bold text-slate-900 mb-0.5">${c.subject}</h3>
                <div class="text-xs text-slate-500 mb-3">${c.code || ''} • ${c.faculty}</div>

                <div class="p-2.5 bg-slate-50 rounded-lg text-xs text-slate-700 mb-3 flex items-center justify-between">
                  <span>⏰ <strong class="text-slate-900">${c.startTime} – ${c.endTime}</strong></span>
                  <span>📍 <strong class="text-slate-900">${c.room}</strong></span>
                </div>
              </div>

              <div class="flex items-center justify-between pt-2.5 border-t border-slate-100">
                <button onclick="openCanSkipModal('${c.id}')" class="px-2.5 py-1 rounded bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 text-xs font-semibold transition flex items-center gap-1">
                  <span>🔮 Can I Skip?</span>
                </button>

                <div class="flex items-center gap-2">
                  <button onclick="openClassModal('${c.id}')" class="text-xs px-2.5 py-1 text-slate-600 hover:text-teal-600 hover:bg-slate-100 rounded transition font-medium">
                    ✏️ Edit
                  </button>
                  <button onclick="deleteClass('${c.id}')" class="text-xs px-2.5 py-1 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded transition font-medium">
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  // 7. Weekly Attendance Planner View Content
  let plannerViewHtml = '';
  const allWeekClasses = [...appState.timetable].sort((a, b) => {
    const dayOrder = { Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 };
    return (dayOrder[a.day] || 7) - (dayOrder[b.day] || 7) || timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
  });

  let plannedAttendCount = 0;
  let plannedSkipCount = 0;
  allWeekClasses.forEach(c => {
    const plan = appState.plannerPlan[c.id] || 'attend';
    if (plan === 'attend') plannedAttendCount++;
    else plannedSkipCount++;
  });

  const projectedWeekAgg = Number((((appState.predictor.currentAttended + plannedAttendCount) / (appState.predictor.totalConducted + allWeekClasses.length)) * 100).toFixed(1));
  const isWeekSafe = projectedWeekAgg >= minThreshold;

  const plannerRows = allWeekClasses.map(c => {
    const sub = getSubjectForClass(c);
    const plan = appState.plannerPlan[c.id] || 'attend';
    const isAttending = plan === 'attend';

    // Projected if attending vs skipping
    const skipPct = Number(((sub.attended / (sub.total + 1)) * 100).toFixed(1));
    const attendPct = Number((((sub.attended + 1) / (sub.total + 1)) * 100).toFixed(1));
    const currentPct = calculateSubjectPercentage(sub.attended, sub.total);
    const riskBadge = currentPct < minThreshold 
      ? '<span class="badge-at-risk text-[10px]">High Risk</span>' 
      : (currentPct < minThreshold + appState.settings.warningBuffer ? '<span class="badge-warning text-[10px]">Caution</span>' : '<span class="badge-safe text-[10px]">Safe</span>');

    return `
      <tr class="${!isAttending ? 'bg-rose-50/40' : ''}">
        <td class="font-medium text-slate-900">
          <div>${c.subject}</div>
          <div class="text-[11px] text-slate-500 font-normal">${c.code} • ${c.type}</div>
        </td>
        <td class="text-slate-700 font-semibold text-xs">${c.day}</td>
        <td class="text-slate-600 text-xs">${c.startTime}</td>
        <td class="font-semibold text-slate-800 text-xs">${currentPct.toFixed(1)}%</td>
        <td>
          <div class="text-xs">
            <span class="${isAttending ? 'text-emerald-700 font-bold' : 'text-slate-400'}">${attendPct.toFixed(1)}%</span> / 
            <span class="${!isAttending ? 'text-rose-700 font-bold' : 'text-slate-400'}">${skipPct.toFixed(1)}%</span>
          </div>
          <div class="text-[10px] text-slate-400">${isAttending ? 'Projected (Attend)' : 'Projected (Skip)'}</div>
        </td>
        <td>
          ${riskBadge}
        </td>
        <td>
          <button onclick="togglePlannerAction('${c.id}')" class="px-3 py-1 rounded-md text-xs font-bold transition ${
            isAttending 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100' 
              : 'bg-rose-100 text-rose-800 border border-rose-300 hover:bg-rose-200'
          }">
            ${isAttending ? '✔ Plan to Attend' : '✖ Planned Skip'}
          </button>
        </td>
      </tr>
    `;
  }).join('');

  plannerViewHtml = `
    <div>
      <!-- Weekly Simulation Summary Banner -->
      <div class="p-5 rounded-xl border mb-6 ${
        isWeekSafe ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-rose-50 border-rose-200 text-rose-950'
      }">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div class="text-xs font-bold uppercase tracking-wider opacity-75">Weekly Attendance Simulation Plan</div>
            <h3 class="text-lg font-bold mt-0.5">Projected End-of-Week Attendance: ${projectedWeekAgg}%</h3>
            <p class="text-xs mt-1">
              Planning to attend <strong>${plannedAttendCount}</strong> classes and skip <strong>${plannedSkipCount}</strong> classes out of ${allWeekClasses.length} scheduled lectures.
            </p>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="resetPlannerPlan()" class="px-3 py-1.5 bg-white text-slate-700 hover:bg-slate-100 border border-slate-300 rounded-md text-xs font-semibold shadow-xs transition">
              Reset Plan (Attend All)
            </button>
            <span class="px-3 py-1.5 rounded-full text-xs font-bold ${
              isWeekSafe ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-300'
            }">
              ${isWeekSafe ? 'STATUS: SAFE ELIGIBILITY' : 'STATUS: SHORTAGE RISK'}
            </span>
          </div>
        </div>
      </div>

      <!-- Weekly Planner Table -->
      <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <table class="proto-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Day</th>
              <th>Time</th>
              <th>Current %</th>
              <th>Attend / Skip Impact</th>
              <th>Risk</th>
              <th>Action Plan</th>
            </tr>
          </thead>
          <tbody>
            ${plannerRows}
          </tbody>
        </table>
      </div>
    </div>
  `;

  return `
    <div class="py-2">
      <!-- Title & Header Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div>
          <h1 class="text-xl font-bold text-slate-900 tracking-tight">Weekly Timetable & Schedule Planner</h1>
          <p class="text-xs text-slate-500 mt-0.5">Manage Monday–Saturday lecture slots, class rooms, and simulate weekly attendance impact</p>
        </div>
        <div class="flex items-center gap-2">
          <!-- View switcher -->
          <div class="bg-slate-100 p-1 rounded-lg border border-slate-200 flex items-center text-xs font-semibold">
            <button onclick="setTimetableView('calendar')" class="px-3 py-1 rounded-md transition ${activeView === 'calendar' ? 'bg-teal-600 text-white' : 'text-slate-600 hover:text-slate-900'}">
              Weekly Schedule
            </button>
            <button onclick="setTimetableView('planner')" class="px-3 py-1 rounded-md transition ${activeView === 'planner' ? 'bg-teal-600 text-white' : 'text-slate-600 hover:text-slate-900'}">
              Weekly Planner
            </button>
          </div>

          <button onclick="openClassModal()" class="proto-btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5 shadow-sm">
            <span>+</span>
            <span>Add Class</span>
          </button>
        </div>
      </div>

      <!-- Day selector tabs (for calendar view) -->
      ${activeView === 'calendar' ? `
        <div class="flex items-center gap-1.5 overflow-x-auto pb-2 mb-5">
          ${['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'All'].map(day => `
            <button onclick="setTimetableDay('${day}')" class="day-tab ${day === activeDay ? 'active-day' : ''}">
              ${day === 'All' ? 'Full Week (All Days)' : day}
            </button>
          `).join('')}
        </div>
      ` : ''}

      <!-- Main View Content -->
      ${activeView === 'calendar' ? calendarViewHtml : plannerViewHtml}
    </div>
  `;
}

function attachTimetableEvents() {}

function setTimetableDay(day) {
  appState.activeTimetableDay = day;
  saveState();
  const mount = document.getElementById('screen-mount');
  mount.innerHTML = renderPageTimetable();
  attachTimetableEvents();
}

function setTimetableView(view) {
  appState.activeTimetableView = view;
  saveState();
  const mount = document.getElementById('screen-mount');
  mount.innerHTML = renderPageTimetable();
  attachTimetableEvents();
}

function togglePlannerAction(classId) {
  const current = appState.plannerPlan[classId] || 'attend';
  appState.plannerPlan[classId] = current === 'attend' ? 'skip' : 'attend';
  saveState();
  const mount = document.getElementById('screen-mount');
  mount.innerHTML = renderPageTimetable();
  attachTimetableEvents();
  showToast('Weekly attendance plan updated!', 'info');
}

function resetPlannerPlan() {
  appState.plannerPlan = {};
  saveState();
  const mount = document.getElementById('screen-mount');
  mount.innerHTML = renderPageTimetable();
  attachTimetableEvents();
  showToast('Reset plan: Attending all scheduled classes this week', 'success');
}

// -------------------------------------------------------------
// ADD / EDIT / DELETE CLASS MODALS
// -------------------------------------------------------------
function openClassModal(classId = null) {
  const isEditing = !!classId;
  const existing = isEditing ? appState.timetable.find(c => c.id === classId) : null;

  const initialDay = existing ? existing.day : (appState.activeTimetableDay !== 'All' ? appState.activeTimetableDay : 'Monday');
  const initialSubject = existing ? existing.subject : 'Database Management Systems';
  const initialCode = existing ? existing.code : 'CS301';
  const initialFaculty = existing ? existing.faculty : 'Prof. Alan Turing';
  const initialStartTime = existing ? existing.startTime : '09:00 AM';
  const initialEndTime = existing ? existing.endTime : '10:00 AM';
  const initialRoom = existing ? existing.room : 'Hall A - Room 204';
  const initialType = existing ? existing.type : 'Lecture';

  const modalContainer = document.getElementById('modal-container');
  modalContainer.className = 'modal-overlay';
  modalContainer.innerHTML = `
    <div class="modal-content max-w-lg p-6">
      <div class="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
        <h3 class="text-sm font-bold text-slate-900">${isEditing ? 'Edit Timetable Entry' : 'Add Class to Timetable'}</h3>
        <button onclick="closeModal()" class="text-slate-400 hover:text-slate-600 text-lg font-bold">&times;</button>
      </div>

      <div id="class-modal-error" class="hidden p-3 rounded-lg bg-rose-50 border border-rose-300 text-xs text-rose-700 font-medium mb-3">
      </div>

      <form id="class-form" class="flex flex-col gap-3">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Day of Week</label>
            <select id="class-day" class="proto-input" required>
              ${['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(d => `
                <option value="${d}" ${d === initialDay ? 'selected' : ''}>${d}</option>
              `).join('')}
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Class Type</label>
            <select id="class-type" class="proto-input" required>
              <option value="Lecture" ${initialType === 'Lecture' ? 'selected' : ''}>Lecture</option>
              <option value="Lab" ${initialType === 'Lab' ? 'selected' : ''}>Lab (Practical)</option>
              <option value="Tutorial" ${initialType === 'Tutorial' ? 'selected' : ''}>Tutorial</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Subject</label>
          <select id="class-subject-select" class="proto-input" onchange="handleClassSubjectSelect(this.value)">
            ${appState.subjects.map(s => `
              <option value="${s.id}" ${s.name === initialSubject ? 'selected' : ''}>${s.name} (${s.code})</option>
            `).join('')}
            <option value="custom">Other / Custom Course...</option>
          </select>
        </div>

        <div id="custom-subject-box" class="hidden flex flex-col gap-2">
          <input type="text" id="class-subject-name" class="proto-input" placeholder="Subject Name e.g. Operating Systems" value="${initialSubject}">
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Subject Code</label>
            <input type="text" id="class-code" class="proto-input" value="${initialCode}" required placeholder="e.g. CS301">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Faculty Name</label>
            <input type="text" id="class-faculty" class="proto-input" value="${initialFaculty}" required placeholder="e.g. Prof. Alan Turing">
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Start Time</label>
            <input type="text" id="class-start-time" class="proto-input" value="${initialStartTime}" required placeholder="e.g. 09:00 AM">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">End Time</label>
            <input type="text" id="class-end-time" class="proto-input" value="${initialEndTime}" required placeholder="e.g. 10:00 AM">
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Room / Classroom</label>
          <input type="text" id="class-room" class="proto-input" value="${initialRoom}" required placeholder="e.g. Hall A - Room 204">
        </div>

        <div class="flex items-center justify-end gap-2 mt-3 pt-3 border-t border-slate-200">
          <button type="button" onclick="closeModal()" class="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-md transition">Cancel</button>
          <button type="submit" class="proto-btn-primary text-xs py-2 px-4">
            ${isEditing ? 'Save Changes' : 'Save Class'}
          </button>
        </div>
      </form>
    </div>
  `;

  document.getElementById('class-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const day = document.getElementById('class-day').value;
    const type = document.getElementById('class-type').value;
    const subjectSelect = document.getElementById('class-subject-select').value;
    let subjectName = '';
    let code = document.getElementById('class-code').value.trim();
    let faculty = document.getElementById('class-faculty').value.trim();

    if (subjectSelect === 'custom') {
      subjectName = document.getElementById('class-subject-name').value.trim();
    } else {
      const selectedSub = appState.subjects.find(s => s.id === subjectSelect);
      subjectName = selectedSub ? selectedSub.name : document.getElementById('class-code').value;
    }

    const startTime = document.getElementById('class-start-time').value.trim();
    const endTime = document.getElementById('class-end-time').value.trim();
    const room = document.getElementById('class-room').value.trim();
    const errBox = document.getElementById('class-modal-error');

    // Validation
    if (!subjectName || !code || !faculty || !startTime || !endTime || !room) {
      errBox.textContent = 'All fields are required. Please fill in missing details.';
      errBox.classList.remove('hidden');
      return;
    }

    // Overlap prevention
    const conflictResult = findTimeConflict(day, startTime, endTime, classId);
    if (conflictResult) {
      if (conflictResult.isInvalidTime) {
        errBox.textContent = 'Invalid Timing: Start time must be earlier than End time.';
      } else {
        errBox.innerHTML = `<strong>Scheduling Conflict:</strong> Overlaps with <strong>${conflictResult.conflict.subject}</strong> (${conflictResult.conflict.startTime} – ${conflictResult.conflict.endTime}) in ${conflictResult.conflict.room} on ${day}.`;
      }
      errBox.classList.remove('hidden');
      return;
    }

    if (isEditing) {
      const idx = appState.timetable.findIndex(c => c.id === classId);
      if (idx !== -1) {
        appState.timetable[idx] = {
          ...appState.timetable[idx],
          day,
          subject: subjectName,
          code,
          faculty,
          startTime,
          endTime,
          room,
          type
        };
      }
      showToast('Timetable entry updated successfully!', 'success');
    } else {
      const newEntry = {
        id: 'tt-' + Date.now(),
        day,
        subject: subjectName,
        code,
        faculty,
        startTime,
        endTime,
        room,
        type
      };
      appState.timetable.push(newEntry);
      showToast(`Added ${subjectName} to ${day} timetable!`, 'success');
    }

    saveState();
    closeModal();
    if (currentRoute === 'timetable') {
      const mount = document.getElementById('screen-mount');
      mount.innerHTML = renderPageTimetable();
      attachTimetableEvents();
    } else if (currentRoute === 'dashboard') {
      const mount = document.getElementById('screen-mount');
      mount.innerHTML = renderPage2Dashboard();
      attachDashboardEvents();
    }
  });
}

function handleClassSubjectSelect(val) {
  const customBox = document.getElementById('custom-subject-box');
  const codeInput = document.getElementById('class-code');
  const facultyInput = document.getElementById('class-faculty');

  if (val === 'custom') {
    customBox.classList.remove('hidden');
  } else {
    customBox.classList.add('hidden');
    const sub = appState.subjects.find(s => s.id === val);
    if (sub) {
      if (codeInput) codeInput.value = sub.code;
      if (facultyInput) facultyInput.value = sub.professor;
    }
  }
}

function deleteClass(classId) {
  const c = appState.timetable.find(item => item.id === classId);
  if (!c) return;

  if (confirm(`Are you sure you want to delete "${c.subject}" (${c.day} ${c.startTime}) from your timetable?`)) {
    appState.timetable = appState.timetable.filter(item => item.id !== classId);
    saveState();
    showToast(`Deleted ${c.subject} from timetable`, 'info');
    if (currentRoute === 'timetable') {
      const mount = document.getElementById('screen-mount');
      mount.innerHTML = renderPageTimetable();
      attachTimetableEvents();
    } else if (currentRoute === 'dashboard') {
      const mount = document.getElementById('screen-mount');
      mount.innerHTML = renderPage2Dashboard();
      attachDashboardEvents();
    }
  }
}

// -------------------------------------------------------------
// NEW PAGE: ACADEMIC CALENDAR & DEADLINES
// -------------------------------------------------------------
function renderPageCalendar() {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const year = appState.calYear || 2026;
  const month = appState.calMonth || 9; // Oct
  const monthName = monthNames[month];

  const filterType = appState.calFilterType || 'All';
  const filterSubject = appState.calFilterSubject || 'All';
  const selectedDate = appState.selectedCalDate || '2026-10-16';

  // Calculate calendar days
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Combine static events and timetable classes for the month
  const calendarCells = [];

  // Previous month trailing days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    const prevMonthIdx = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const dateStr = `${prevYear}-${String(prevMonthIdx + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    calendarCells.push({
      dayNumber: d,
      dateStr,
      isCurrentMonth: false,
      isToday: false
    });
  }

  // Current month days
  const todayStr = '2026-10-16'; // Demo today date
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    calendarCells.push({
      dayNumber: d,
      dateStr,
      isCurrentMonth: true,
      isToday: dateStr === todayStr
    });
  }

  // Next month leading days to complete grid (42 cells: 6 rows * 7 cols)
  const remainingCells = 42 - calendarCells.length;
  for (let d = 1; d <= remainingCells; d++) {
    const nextMonthIdx = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    const dateStr = `${nextYear}-${String(nextMonthIdx + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    calendarCells.push({
      dayNumber: d,
      dateStr,
      isCurrentMonth: false,
      isToday: false
    });
  }

  // Filter events
  const getEventsForDate = (dateStr) => {
    // 1. Explicit calendar events
    let events = appState.calendarEvents.filter(e => e.date === dateStr);

    // 2. Timetable classes mapped to this weekday
    const dayName = getDayName(new Date(dateStr + 'T12:00:00'));
    const ttClasses = appState.timetable.filter(c => c.day === dayName).map(c => ({
      id: `tt-evt-${dateStr}-${c.id}`,
      title: `${c.code}: ${c.subject}`,
      type: 'Class',
      subject: c.subject,
      subjectCode: c.code,
      date: dateStr,
      startTime: c.startTime,
      endTime: c.endTime,
      room: c.room,
      description: `Regular scheduled ${c.type} with ${c.faculty} in ${c.room}.`,
      priority: 'Medium',
      status: 'Scheduled',
      isTimetableClass: true
    }));

    events = [...events, ...ttClasses];

    // Apply Filter Type
    if (filterType !== 'All') {
      if (filterType === 'Classes') events = events.filter(e => e.type === 'Class');
      else if (filterType === 'Exams') events = events.filter(e => e.type === 'Exam');
      else if (filterType === 'Assignments') events = events.filter(e => e.type === 'Assignment');
      else if (filterType === 'Holidays') events = events.filter(e => e.type === 'Holiday');
      else if (filterType === 'Reminders') events = events.filter(e => e.type === 'Attendance Reminder');
      else if (filterType === 'Projects') events = events.filter(e => e.type === 'Project');
    }

    // Apply Filter Subject
    if (filterSubject !== 'All') {
      events = events.filter(e => e.subject === filterSubject || e.subjectCode === filterSubject);
    }

    return events;
  };

  // Render Grid Cells HTML
  const gridCellsHtml = calendarCells.map(cell => {
    const events = getEventsForDate(cell.dateStr);
    const isSelected = cell.dateStr === selectedDate;
    const maxVisible = 2;
    const visibleEvents = events.slice(0, maxVisible);
    const extraCount = events.length - maxVisible;

    // Check attendance risk for classes on this date
    const hasRisk = events.some(e => {
      const sub = getSubjectForClass(e);
      return sub && calculateSubjectPercentage(sub.attended, sub.total) < appState.settings.minimumAttendance;
    });

    return `
      <div class="calendar-date-cell ${cell.isCurrentMonth ? '' : 'other-month'} ${cell.isToday ? 'is-today' : ''} ${isSelected ? 'selected-date' : ''}" 
           onclick="selectCalendarDate('${cell.dateStr}')">
        <div class="flex items-center justify-between mb-1">
          <span class="date-number ${cell.isToday ? 'today-badge' : ''}">${cell.dayNumber}</span>
          ${hasRisk ? '<span class="text-[9px] font-bold text-rose-600 bg-rose-50 px-1 rounded border border-rose-200" title="Attendance Risk">🔴 Risk</span>' : ''}
        </div>

        <div class="flex-1 flex flex-col justify-start overflow-hidden">
          ${visibleEvents.map(e => {
            const pillClass = 
              e.type === 'Exam' ? 'event-pill-exam' :
              e.type === 'Assignment' ? 'event-pill-assignment' :
              e.type === 'Class' ? 'event-pill-class' :
              e.type === 'Holiday' ? 'event-pill-holiday' :
              e.type === 'Project' ? 'event-pill-project' :
              e.type === 'Attendance Reminder' ? 'event-pill-reminder' :
              'event-pill-other';

            return `
              <div class="calendar-event-pill ${pillClass}" onclick="event.stopPropagation(); openEventDetailsModal('${e.id}')" title="${e.title} (${e.startTime})">
                <span class="truncate">${e.startTime !== 'All Day' ? e.startTime.replace(':00', '') : ''} ${e.title}</span>
              </div>
            `;
          }).join('')}

          ${extraCount > 0 ? `
            <div class="text-[9px] text-slate-500 font-bold px-1 mt-0.5">
              +${extraCount} more
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');

  // 13. Upcoming Deadlines Calculation
  const todayMs = new Date('2026-10-16T00:00:00').getTime();
  const deadlineEvents = appState.calendarEvents
    .filter(e => e.type === 'Assignment' || e.type === 'Project' || e.type === 'Exam')
    .map(e => {
      const eventMs = new Date(e.date + 'T00:00:00').getTime();
      const diffDays = Math.ceil((eventMs - todayMs) / (1000 * 60 * 60 * 24));
      return { ...e, diffDays };
    })
    .sort((a, b) => a.diffDays - b.diffDays);

  const deadlinesHtml = deadlineEvents.map(d => {
    let countdownBadge = '';
    if (d.diffDays < 0) countdownBadge = '<span class="text-[10px] text-slate-400 font-semibold">Passed</span>';
    else if (d.diffDays === 0) countdownBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">Due Today</span>';
    else if (d.diffDays === 1) countdownBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">1 day remaining</span>';
    else countdownBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">${d.diffDays} days remaining</span>`;

    return `
      <div class="deadline-card mb-2.5">
        <div>
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-900 text-xs">${d.title}</span>
            <span class="text-[10px] px-1.5 py-0.5 rounded font-bold ${
              d.type === 'Exam' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
            }">${d.type}</span>
          </div>
          <div class="text-[11px] text-slate-500 mt-0.5">
            ${d.subject} • Due: <strong class="text-slate-700">${d.date}</strong>
          </div>
        </div>
        <div class="flex items-center gap-3">
          ${countdownBadge}
          ${d.type === 'Assignment' ? `
            <button onclick="toggleAssignmentStatus('${d.id}')" class="text-xs px-2 py-1 rounded border font-semibold transition ${
              d.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-300'
            }">
              ${d.status === 'Completed' ? '✔ Completed' : 'Pending'}
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');

  // Selected Date Agenda List (for mobile / detailed inspection)
  const selectedDateEvents = getEventsForDate(selectedDate);
  const selectedDateAgendaHtml = selectedDateEvents.length > 0 ? selectedDateEvents.map(e => `
    <div class="p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between text-xs mb-2 shadow-xs" onclick="openEventDetailsModal('${e.id}')">
      <div>
        <div class="flex items-center gap-2">
          <span class="font-bold text-slate-900">${e.title}</span>
          <span class="text-[10px] px-2 py-0.5 rounded font-bold ${
            e.type === 'Exam' ? 'bg-rose-100 text-rose-800' :
            e.type === 'Assignment' ? 'bg-amber-100 text-amber-800' :
            'bg-teal-100 text-teal-800'
          }">${e.type}</span>
        </div>
        <div class="text-slate-500 mt-0.5">
          ⏰ ${e.startTime} - ${e.endTime} • 📍 ${e.room} • ${e.subject}
        </div>
      </div>
      <button class="text-teal-600 font-bold hover:underline">Details →</button>
    </div>
  `).join('') : `
    <div class="p-4 text-center text-xs text-slate-400 bg-white rounded-lg border border-slate-200">
      No events recorded for ${selectedDate}. Click "+ Add Event" to schedule.
    </div>
  `;

  return `
    <div class="py-2">
      <!-- Calendar Header & Navigation Controls -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
        <div>
          <h1 class="text-xl font-bold text-slate-900 tracking-tight">Academic Calendar</h1>
          <p class="text-xs text-slate-500 mt-0.5">Monthly schedule, examinations, assignment deadlines, and timetable integration</p>
        </div>

        <div class="flex items-center gap-2 flex-wrap">
          <!-- Month Switcher: < October 2026 > -->
          <div class="flex items-center bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
            <button onclick="changeCalMonth(-1)" class="px-3 py-1.5 text-slate-600 hover:bg-slate-100 font-bold text-sm transition" title="Previous Month">&lt;</button>
            <span class="px-4 py-1.5 font-bold text-slate-900 text-xs tracking-wide">${monthName} ${year}</span>
            <button onclick="changeCalMonth(1)" class="px-3 py-1.5 text-slate-600 hover:bg-slate-100 font-bold text-sm transition" title="Next Month">&gt;</button>
          </div>

          <button onclick="jumpCalToday()" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs border border-slate-300 shadow-xs transition">
            Today
          </button>

          <button onclick="openAddEventModal('${selectedDate}')" class="proto-btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5 shadow-sm">
            <span>+</span>
            <span>Add Event</span>
          </button>
        </div>
      </div>

      <!-- Filters Bar: All | Classes | Exams | Assignments | Holidays | Reminders -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          ${['All', 'Classes', 'Exams', 'Assignments', 'Holidays', 'Reminders', 'Projects'].map(type => `
            <button onclick="setCalFilterType('${type}')" class="cal-filter-btn ${filterType === type ? 'active-filter' : ''}">
              ${type}
            </button>
          `).join('')}
        </div>

        <div class="flex items-center gap-2">
          <span class="text-xs text-slate-500 font-medium">Subject:</span>
          <select id="cal-subject-filter" onchange="setCalFilterSubject(this.value)" class="proto-input py-1 text-xs w-44">
            <option value="All">All Subjects</option>
            ${appState.subjects.map(s => `
              <option value="${s.name}" ${filterSubject === s.name ? 'selected' : ''}>${s.name}</option>
            `).join('')}
          </select>
        </div>
      </div>

      <!-- 19. Monthly Calendar Grid -->
      <div class="bg-white rounded-xl shadow-xs border border-slate-200 p-3 sm:p-4 mb-6">
        <div class="calendar-grid">
          <!-- 7 Day Headers -->
          <div class="calendar-header-cell">SUN</div>
          <div class="calendar-header-cell">MON</div>
          <div class="calendar-header-cell">TUE</div>
          <div class="calendar-header-cell">WED</div>
          <div class="calendar-header-cell">THU</div>
          <div class="calendar-header-cell">FRI</div>
          <div class="calendar-header-cell">SAT</div>

          <!-- 42 Date Cells -->
          ${gridCellsHtml}
        </div>
      </div>

      <!-- Selected Date Agenda & Upcoming Deadlines Two-Column Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Selected Date Agenda Details -->
        <div>
          <div class="flex items-center justify-between mb-2.5">
            <h2 class="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>📅 Schedule for ${selectedDate}</span>
            </h2>
            <button onclick="openAddEventModal('${selectedDate}')" class="text-xs text-teal-600 font-semibold hover:underline">
              + Add to this day
            </button>
          </div>
          <div>
            ${selectedDateAgendaHtml}
          </div>
        </div>

        <!-- 13. Upcoming Deadlines Section -->
        <div>
          <div class="flex items-center justify-between mb-2.5">
            <h2 class="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>⏳ Upcoming Deadlines & Examination Milestones</span>
            </h2>
            <span class="text-[11px] text-slate-400">Automatic Countdown</span>
          </div>
          <div>
            ${deadlinesHtml}
          </div>
        </div>
      </div>
    </div>
  `;
}

function attachCalendarEvents() {}

function changeCalMonth(delta) {
  let m = (appState.calMonth || 9) + delta;
  let y = appState.calYear || 2026;
  if (m < 0) {
    m = 11;
    y -= 1;
  } else if (m > 11) {
    m = 0;
    y += 1;
  }
  appState.calMonth = m;
  appState.calYear = y;
  saveState();
  const mount = document.getElementById('screen-mount');
  mount.innerHTML = renderPageCalendar();
  attachCalendarEvents();
}

function jumpCalToday() {
  appState.calMonth = 9; // October 2026 demo
  appState.calYear = 2026;
  appState.selectedCalDate = '2026-10-16';
  saveState();
  const mount = document.getElementById('screen-mount');
  mount.innerHTML = renderPageCalendar();
  attachCalendarEvents();
  showToast('Jumped to Today: Oct 16, 2026', 'info');
}

function selectCalendarDate(dateStr) {
  appState.selectedCalDate = dateStr;
  saveState();
  const mount = document.getElementById('screen-mount');
  mount.innerHTML = renderPageCalendar();
  attachCalendarEvents();
}

function setCalFilterType(type) {
  appState.calFilterType = type;
  saveState();
  const mount = document.getElementById('screen-mount');
  mount.innerHTML = renderPageCalendar();
  attachCalendarEvents();
}

function setCalFilterSubject(subj) {
  appState.calFilterSubject = subj;
  saveState();
  const mount = document.getElementById('screen-mount');
  mount.innerHTML = renderPageCalendar();
  attachCalendarEvents();
}

function toggleAssignmentStatus(eventId) {
  const evt = appState.calendarEvents.find(e => e.id === eventId);
  if (!evt) return;
  evt.status = evt.status === 'Completed' ? 'Pending' : 'Completed';
  saveState();
  showToast(`Marked "${evt.title}" as ${evt.status}`, 'success');
  const mount = document.getElementById('screen-mount');
  mount.innerHTML = renderPageCalendar();
  attachCalendarEvents();
}

// -------------------------------------------------------------
// ADD / EDIT / DETAILS EVENT MODALS
// -------------------------------------------------------------
function openAddEventModal(defaultDate = null) {
  const dateVal = defaultDate || appState.selectedCalDate || '2026-10-16';
  const modalContainer = document.getElementById('modal-container');
  modalContainer.className = 'modal-overlay';
  modalContainer.innerHTML = `
    <div class="modal-content max-w-lg p-6">
      <div class="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
        <h3 class="text-sm font-bold text-slate-900">Add Academic Event</h3>
        <button onclick="closeModal()" class="text-slate-400 hover:text-slate-600 text-lg font-bold">&times;</button>
      </div>

      <div id="event-modal-error" class="hidden p-3 rounded-lg bg-rose-50 border border-rose-300 text-xs text-rose-700 font-medium mb-3">
      </div>

      <form id="event-form" class="flex flex-col gap-3">
        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Event Title</label>
          <input type="text" id="evt-title" class="proto-input" required placeholder="e.g. DBMS Internal Assessment or Project Submission">
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Event Type</label>
            <select id="evt-type" class="proto-input" required>
              <option value="Exam">Exam</option>
              <option value="Assignment">Assignment</option>
              <option value="Project">Project</option>
              <option value="Class">Class</option>
              <option value="Holiday">Holiday</option>
              <option value="Attendance Reminder">Attendance Reminder</option>
              <option value="College Event">College Event</option>
              <option value="Personal Study Reminder">Personal Study Reminder</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Subject</label>
            <select id="evt-subject" class="proto-input" required>
              ${appState.subjects.map(s => `
                <option value="${s.name}">${s.name} (${s.code})</option>
              `).join('')}
              <option value="All Subjects">All Subjects</option>
              <option value="University Event">University Event</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-3">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Date</label>
            <input type="date" id="evt-date" class="proto-input" value="${dateVal}" required>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Start Time</label>
            <input type="text" id="evt-start-time" class="proto-input" value="10:00 AM" required placeholder="10:00 AM">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">End Time</label>
            <input type="text" id="evt-end-time" class="proto-input" value="11:30 AM" required placeholder="11:30 AM">
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Room / Venue</label>
            <input type="text" id="evt-room" class="proto-input" placeholder="e.g. Hall A - Room 204 or Online" value="Hall A - Room 204">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Priority</label>
            <select id="evt-priority" class="proto-input">
              <option value="High">High Priority</option>
              <option value="Medium" selected>Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Description / Notes</label>
          <textarea id="evt-desc" class="proto-input" rows="3" placeholder="Syllabus units, submission instructions, or study references..."></textarea>
        </div>

        <div class="flex items-center justify-end gap-2 mt-3 pt-3 border-t border-slate-200">
          <button type="button" onclick="closeModal()" class="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-md transition">Cancel</button>
          <button type="submit" class="proto-btn-primary text-xs py-2 px-4">Save Event</button>
        </div>
      </form>
    </div>
  `;

  document.getElementById('event-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('evt-title').value.trim();
    const type = document.getElementById('evt-type').value;
    const subject = document.getElementById('evt-subject').value;
    const date = document.getElementById('evt-date').value;
    const startTime = document.getElementById('evt-start-time').value.trim();
    const endTime = document.getElementById('evt-end-time').value.trim();
    const room = document.getElementById('evt-room').value.trim();
    const priority = document.getElementById('evt-priority').value;
    const desc = document.getElementById('evt-desc').value.trim();
    const errBox = document.getElementById('event-modal-error');

    if (!title || !date || !startTime) {
      errBox.textContent = 'Please fill in the required event title, date, and time.';
      errBox.classList.remove('hidden');
      return;
    }

    const newEvt = {
      id: 'evt-' + Date.now(),
      title,
      type,
      subject,
      subjectCode: (appState.subjects.find(s => s.name === subject) || {}).code || 'GEN',
      date,
      startTime,
      endTime: endTime || startTime,
      room: room || 'Classroom',
      description: desc,
      priority,
      status: 'Pending'
    };

    appState.calendarEvents.push(newEvt);
    saveState();
    closeModal();
    showToast(`Added event: ${title}`, 'success');

    if (currentRoute === 'calendar') {
      const mount = document.getElementById('screen-mount');
      mount.innerHTML = renderPageCalendar();
      attachCalendarEvents();
    } else if (currentRoute === 'dashboard') {
      const mount = document.getElementById('screen-mount');
      mount.innerHTML = renderPage2Dashboard();
      attachDashboardEvents();
    }
  });
}

function openEventDetailsModal(eventId) {
  // Check if it's a timetable class
  let evt = appState.calendarEvents.find(e => e.id === eventId);
  let isTimetable = false;

  if (!evt && eventId.startsWith('tt-evt-')) {
    // Generated timetable instance
    const parts = eventId.split('-'); // tt, evt, date, tt, id
    const ttId = eventId.split('-').slice(4).join('-');
    const classObj = appState.timetable.find(c => c.id === ttId);
    if (classObj) {
      evt = {
        id: eventId,
        title: `${classObj.code}: ${classObj.subject}`,
        type: 'Class',
        subject: classObj.subject,
        subjectCode: classObj.code,
        date: parts[2],
        startTime: classObj.startTime,
        endTime: classObj.endTime,
        room: classObj.room,
        description: `Regular scheduled ${classObj.type} lecture with ${classObj.faculty}.`,
        priority: 'Medium',
        status: 'Scheduled',
        isTimetableClass: true
      };
      isTimetable = true;
    }
  }

  if (!evt) return;

  const modalContainer = document.getElementById('modal-container');
  modalContainer.className = 'modal-overlay';
  modalContainer.innerHTML = `
    <div class="modal-content max-w-lg p-6">
      <div class="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
        <div class="flex items-center gap-2">
          <span class="text-xl">🗓️</span>
          <h3 class="text-sm font-bold text-slate-900">Academic Event Details</h3>
        </div>
        <button onclick="closeModal()" class="text-slate-400 hover:text-slate-600 text-lg font-bold">&times;</button>
      </div>

      <div class="mb-4">
        <div class="flex items-center justify-between mb-2">
          <span class="px-2.5 py-0.5 rounded text-xs font-bold ${
            evt.type === 'Exam' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
            evt.type === 'Assignment' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
            'bg-teal-100 text-teal-800 border border-teal-300'
          }">${evt.type}</span>

          <span class="px-2.5 py-0.5 rounded text-[11px] font-bold ${
            evt.priority === 'High' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-slate-100 text-slate-600'
          }">${evt.priority} Priority</span>
        </div>

        <h2 class="text-base font-bold text-slate-900">${evt.title}</h2>
        <div class="text-xs text-slate-500 mt-0.5">${evt.subject}</div>
      </div>

      <div class="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-lg border border-slate-200 mb-4">
        <div>
          <span class="text-slate-500">Date:</span>
          <div class="font-bold text-slate-800">${evt.date}</div>
        </div>
        <div>
          <span class="text-slate-500">Time:</span>
          <div class="font-bold text-slate-800">${evt.startTime} – ${evt.endTime}</div>
        </div>
        <div>
          <span class="text-slate-500">Room / Location:</span>
          <div class="font-semibold text-slate-800">${evt.room}</div>
        </div>
        <div>
          <span class="text-slate-500">Status:</span>
          <div class="font-semibold ${evt.status === 'Completed' ? 'text-emerald-700' : 'text-slate-700'}">
            ${evt.status || 'Scheduled'}
          </div>
        </div>
      </div>

      <div class="text-xs text-slate-700 leading-relaxed bg-white border border-slate-200 p-3 rounded-lg mb-5">
        <span class="font-bold text-slate-900 block mb-1">Notes / Description:</span>
        <p>${evt.description || 'No additional notes provided.'}</p>
      </div>

      <div class="flex items-center justify-between pt-3 border-t border-slate-200">
        <div>
          ${!isTimetable ? `
            <button onclick="deleteCalendarEvent('${evt.id}')" class="text-xs text-rose-600 hover:text-rose-800 font-semibold transition">
              🗑️ Delete Event
            </button>
          ` : `
            <button onclick="openCanSkipModal('${evt.subjectCode}')" class="text-xs text-teal-700 hover:underline font-semibold transition">
              🔮 Can I Skip This Class?
            </button>
          `}
        </div>

        <div class="flex items-center gap-2">
          ${evt.type === 'Assignment' && !isTimetable ? `
            <button onclick="toggleAssignmentStatus('${evt.id}'); closeModal();" class="px-3 py-1.5 text-xs font-semibold rounded-md border ${
              evt.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-slate-100 text-slate-700 border-slate-300'
            }">
              ${evt.status === 'Completed' ? '✔ Completed' : 'Mark as Done'}
            </button>
          ` : ''}

          ${!isTimetable ? `
            <button onclick="openEditEventModal('${evt.id}')" class="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md border border-slate-300 transition">
              ✏️ Edit
            </button>
          ` : ''}

          <button onclick="closeModal()" class="proto-btn-primary text-xs py-1.5 px-4">Close</button>
        </div>
      </div>
    </div>
  `;
}

function openEditEventModal(eventId) {
  const evt = appState.calendarEvents.find(e => e.id === eventId);
  if (!evt) return;

  const modalContainer = document.getElementById('modal-container');
  modalContainer.className = 'modal-overlay';
  modalContainer.innerHTML = `
    <div class="modal-content max-w-lg p-6">
      <div class="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
        <h3 class="text-sm font-bold text-slate-900">Edit Academic Event</h3>
        <button onclick="closeModal()" class="text-slate-400 hover:text-slate-600 text-lg font-bold">&times;</button>
      </div>

      <form id="edit-event-form" class="flex flex-col gap-3">
        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Event Title</label>
          <input type="text" id="edit-evt-title" class="proto-input" required value="${evt.title}">
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Event Type</label>
            <select id="edit-evt-type" class="proto-input" required>
              ${['Exam', 'Assignment', 'Project', 'Class', 'Holiday', 'Attendance Reminder', 'College Event', 'Personal Study Reminder', 'Other'].map(t => `
                <option value="${t}" ${evt.type === t ? 'selected' : ''}>${t}</option>
              `).join('')}
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Subject</label>
            <select id="edit-evt-subject" class="proto-input" required>
              ${appState.subjects.map(s => `
                <option value="${s.name}" ${evt.subject === s.name ? 'selected' : ''}>${s.name} (${s.code})</option>
              `).join('')}
              <option value="All Subjects" ${evt.subject === 'All Subjects' ? 'selected' : ''}>All Subjects</option>
              <option value="University Event" ${evt.subject === 'University Event' ? 'selected' : ''}>University Event</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-3">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Date</label>
            <input type="date" id="edit-evt-date" class="proto-input" value="${evt.date}" required>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Start Time</label>
            <input type="text" id="edit-evt-start-time" class="proto-input" value="${evt.startTime}" required>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">End Time</label>
            <input type="text" id="edit-evt-end-time" class="proto-input" value="${evt.endTime}" required>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Room / Venue</label>
            <input type="text" id="edit-evt-room" class="proto-input" value="${evt.room || ''}">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Priority</label>
            <select id="edit-evt-priority" class="proto-input">
              <option value="High" ${evt.priority === 'High' ? 'selected' : ''}>High Priority</option>
              <option value="Medium" ${evt.priority === 'Medium' ? 'selected' : ''}>Medium Priority</option>
              <option value="Low" ${evt.priority === 'Low' ? 'selected' : ''}>Low Priority</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Description / Notes</label>
          <textarea id="edit-evt-desc" class="proto-input" rows="3">${evt.description || ''}</textarea>
        </div>

        <div class="flex items-center justify-end gap-2 mt-3 pt-3 border-t border-slate-200">
          <button type="button" onclick="closeModal()" class="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-md transition">Cancel</button>
          <button type="submit" class="proto-btn-primary text-xs py-2 px-4">Update Event</button>
        </div>
      </form>
    </div>
  `;

  document.getElementById('edit-event-form').addEventListener('submit', (e) => {
    e.preventDefault();
    evt.title = document.getElementById('edit-evt-title').value.trim();
    evt.type = document.getElementById('edit-evt-type').value;
    evt.subject = document.getElementById('edit-evt-subject').value;
    evt.date = document.getElementById('edit-evt-date').value;
    evt.startTime = document.getElementById('edit-evt-start-time').value.trim();
    evt.endTime = document.getElementById('edit-evt-end-time').value.trim();
    evt.room = document.getElementById('edit-evt-room').value.trim();
    evt.priority = document.getElementById('edit-evt-priority').value;
    evt.description = document.getElementById('edit-evt-desc').value.trim();

    saveState();
    closeModal();
    showToast(`Updated event: ${evt.title}`, 'success');

    if (currentRoute === 'calendar') {
      const mount = document.getElementById('screen-mount');
      mount.innerHTML = renderPageCalendar();
      attachCalendarEvents();
    } else if (currentRoute === 'dashboard') {
      const mount = document.getElementById('screen-mount');
      mount.innerHTML = renderPage2Dashboard();
      attachDashboardEvents();
    }
  });
}

function deleteCalendarEvent(eventId) {
  const evt = appState.calendarEvents.find(e => e.id === eventId);
  if (!evt) return;

  if (confirm(`Are you sure you want to delete event "${evt.title}" on ${evt.date}?`)) {
    appState.calendarEvents = appState.calendarEvents.filter(e => e.id !== eventId);
    saveState();
    closeModal();
    showToast(`Deleted event "${evt.title}"`, 'info');

    if (currentRoute === 'calendar') {
      const mount = document.getElementById('screen-mount');
      mount.innerHTML = renderPageCalendar();
      attachCalendarEvents();
    } else if (currentRoute === 'dashboard') {
      const mount = document.getElementById('screen-mount');
      mount.innerHTML = renderPage2Dashboard();
      attachDashboardEvents();
    }
  }
}

// Global bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  navigateTo('dashboard');
});
