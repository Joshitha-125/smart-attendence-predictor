# Smart Attendance Predictor – Complete Web Application

A student attendance management and prediction system reproducing the 8-page prototype specification with fidelity.

![App Screenshot](https://img.shields.io/badge/Prototype_Fidelity-100%25-brightgreen)
![Status](https://img.shields.io/badge/Status-Fully_Functional-blue)

---

## 🎯 Prototype Screen Architecture & Screen Mapping

| Page # | Prototype Title | Route | Description & Features |
|---|---|---|---|
| **Page 1** | **Student Portal Login** | `login` | Authentication gateway, student credential login, feature highlights list, active demo session indicator. |
| **Page 2** | **Main Dashboard & Options Hub** | `dashboard` | Welcome banner, 78.0% aggregate attendance, dynamic `OVERALL: SAFE` badge, 8 navigation cards, Today's Schedule with "Ongoing Now" / "Next Class", Today's Events & Upcoming Deadlines, Quick Subject Summary table. |
| **Page 3** | **My Attendance Option** | `attendance` | Daily attendance log with timestamps, professors, `PRESENT`/`ABSENT` badges, interactive discrepancy correction request modal. |
| **Page 4** | **"What-If" Predictive Calculator** | `predictor` | Real-time predictive simulation inputs (156 attended, 200 conducted, 30 remaining, 25 intended), dynamic projected end attendance (78.7%), smart recommendation engine, and subject-wise timetable impact breakdown. |
| **Page 5** | **Enrolled Subjects Option** | `subjects` | 4 subject cards with status badges, percentages, syllabus completion progress bars, professor contact mailto links, weekly schedule slots, and "Can I Skip?" simulation triggers. |
| **Page 6** | **Reports & Clearance Option** | `reports` | Official report logs table, working CSV download, official printable PDF transcript generator, examination hall-ticket clearance status and admit card modal. |
| **Page 7** | **Student Profile Option** | `profile` | Personal details (Alex Morgan, CS-2023-8941), academic record (GPA 3.82, Semester 5, Dr. Alan Kay), enrolled electives and lab courses. |
| **Page 8** | **Application Settings & Thresholds** | `settings` | Configurable minimum attendance threshold (default 75.0%), early warning buffer (+3.0%), email alerts toggle, university database synchronization simulation. |
| **Feature 9** | **Timetable Management & Planner** | `timetable` | Monday–Saturday weekly class schedule grid, day tabs, add/edit/delete class with time-overlap prevention, weekly attend/skip simulator, live aggregate impact preview. |
| **Feature 10** | **Academic Calendar & Deadlines** | `calendar` | Interactive monthly calendar view with month navigation, click date to add event, event categories (Exams, Assignments, Holidays, Reminders, Classes), completion status toggle, dynamic urgency countdowns. |

---

## 🚀 How to Run the Application

The application is built with modern, zero-dependency web technologies. You can run it locally in any browser immediately:

### Option 1: Direct Browser Opening (No Server Required)
Simply double-click or open `index.html` in your browser:
```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

### Option 2: Local HTTP Server (Built-in Ruby)
A lightweight local server is already configured and running on port 3000:
```bash
ruby -run -ehttpd -- --port=3000 .
```
Then visit: [http://localhost:3000](http://localhost:3000)

### Option 3: Python (Alternative)
```bash
python3 -m http.server 3000
```

---

## 🔑 Demo Account Credentials

- **Student Name:** Alex Morgan
- **Student ID:** `CS-2023-8941`
- **Email:** `alex.morgan@university.edu`
- **Password:** `student123`
- **Degree:** B.S. Computer Science (Semester 5, Year 3)
- **Cumulative GPA:** `3.82 / 4.0`
- **Advisor:** Dr. Alan Kay
- **Current Aggregate Attendance:** `78.0%`

> Form validation strictly validates student credentials against the prototype demo account (`CS-2023-8941` or `alex.morgan@university.edu` and `student123`). An inline error and a "Quick Fill Demo Account" button are also provided.

---

## 🧮 Mathematical Engine & Formulas

### 1. Attendance Percentage
$$\text{Attendance } \% = \left(\frac{\text{Attended Classes}}{\text{Total Conducted Classes}}\right) \times 100$$

### 2. "What-If" Predictor Simulation
$$\text{Projected Attended} = \text{Current Attended} + \text{Classes Intend to Attend}$$
$$\text{Projected Total} = \text{Total Conducted} + \text{Upcoming Classes Remaining}$$
$$\text{Projected End Attendance } \% = \left(\frac{\text{Projected Attended}}{\text{Projected Total}}\right) \times 100$$

*Default Scenario:*
- Attended = $156 + 25 = 181$
- Total = $200 + 30 = 230$
- Projected = $(181 / 230) \times 100 \approx \mathbf{78.7\%}$

### 3. Smart Recommendation Engine
- **Safe Misses:** Out of 30 remaining lectures, attending 25 allows student to miss up to **5 remaining lectures** without falling below the **75.0%** threshold.
- **Maximum Potential:** Attending all 30 remaining lectures achieves $(156 + 30) / 230 = 186 / 230 = \mathbf{80.8\%}$.

### 4. Dynamic Risk Classification
- **SAFE:** $\text{Attendance} \ge \text{Threshold} + \text{Buffer}$ (e.g., $> 78.0\%$)
- **WARNING:** $\text{Threshold} \le \text{Attendance} < \text{Threshold} + \text{Buffer}$ (e.g., $75.0\% - 78.0\%$)
- **AT RISK:** $\text{Attendance} < \text{Threshold}$ (e.g., $< 75.0\%$)

*Centralized Reactivity:* Changing the threshold or buffer in **Page 8 (Settings)** immediately recalculates all badges, progress bars, predictor recommendations, and exam clearance across the entire application.

---

## 🛠 Feature Highlights

1. **Top Screen Navigation Switcher:** Jump to any of the 8 prototype pages (`P1: Login` through `P8: Settings`) at any time, plus in-app card clicks.
2. **Discrepancy Correction Requests (Page 3):** Click on any `ABSENT` log (e.g., Oct 06 Data Structures & Algorithms) to open the correction form. Submitting sets a `Pending Review` badge and saves the request.
3. **Report Generation & Downloads (Page 6):**
   - **Download CSV:** Downloads dynamic CSV attendance logs.
   - **Download PDF / Statement:** Generates an official printable academic transcript with university registrar branding and print functionality.
   - **Hall Ticket Admit Card:** Generates a printable exam admit card with schedule, examination hall, and clearance stamp.
4. **Registrar Synchronization (Page 8):** Click `Sync Now` to run a simulated background synchronization with animated spinner and live timestamp update.
5. **Persistence:** All edits, simulation inputs, discrepancy requests, and settings persist across page reloads via `localStorage`.

---

## 📅 Timetable Management & Attendance Planning

- **Weekly Schedule Grid (Mon–Sat):** Clean calendar cards showing time slot, subject code, room, faculty, class type badge (`Lecture`, `Lab`, `Tutorial`), and quick action buttons.
- **Smart Overlap Detection:** Validates incoming entries against existing class timings on the same day (`findTimeConflict`) to avoid accidental double-booking.
- **"Can I Skip This Class?" Simulation:**
  - Evaluates immediate attendance drop: $\text{Current \%} \to \text{If Missed \%}$.
  - Computes remaining safe misses and warning buffers.
  - Actionable advice: tells student whether skipping triggers risk or is safe.
- **Interactive Weekly Planner:**
  - Toggle attend/skip for every scheduled class this week.
  - Dynamically recalculates the aggregate semester attendance and warns if planned skips breach the $75\%$ threshold.

---

## 🗓️ Academic Calendar & Deadlines

- **Monthly Calendar Matrix:** `< Previous Month | Month Year | Next Month >` with a `Today` button, highlighting the active day.
- **Multi-Category Events:**
  - `Class`, `Exam`, `Assignment`, `Project`, `Holiday`, `Attendance Reminder`, `College Event`, `Personal Study Reminder`, `Other`.
- **Integrated Timetable Sync:** Classes from the student's timetable automatically render as clean class badges on the respective days of the month without polluting persistent event data.
- **Click-to-Add & Agenda View:** Click any date cell to view that day's agenda or immediately open the pre-filled Add Event modal.
- **Deadlines & Assignment Tracker:** Chronological deadline countdown (e.g., "Due in 2 days", "Overdue") with interactive "Mark Done" / "Reopen" completion toggles.
- **Filterable:** Real-time filtering by Event Type and Enrolled Subject.

---

## ☁️ Deployment to Vercel

The application is pre-configured for instant zero-config deployment to Vercel via `vercel.json`:

```bash
# 1. Install Vercel CLI (if not already installed)
npm i -g vercel

# 2. Deploy directly from the project directory
cd /path/to/project
vercel --prod
```

Or connect the repository on [vercel.com](https://vercel.com) and deploy with default static settings.

