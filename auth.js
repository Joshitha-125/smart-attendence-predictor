const authForm = document.getElementById('auth-form');
const authError = document.getElementById('auth-error');
const signInTab = document.getElementById('signin-tab');
const signUpTab = document.getElementById('signup-tab');
let authMode = 'signin';

try {
  const savedState = JSON.parse(localStorage.getItem('smart_attendance_state') || '{}');
  if (!savedState.auth || !savedState.auth.isAuthenticated) {
    document.querySelector('.auth-back').hidden = true;
  }
} catch (error) {
  document.querySelector('.auth-back').hidden = true;
}

function readAccounts() {
  try {
    return JSON.parse(localStorage.getItem('smart_attendance_users') || '[]');
  } catch (error) {
    return [];
  }
}

function showAuthError(message) {
  authError.textContent = message;
  authError.hidden = false;
}

function setAuthMode(mode) {
  authMode = mode;
  const signingUp = mode === 'signup';
  document.getElementById('auth-heading').textContent = signingUp ? 'Create your account' : 'Welcome back';
  document.getElementById('auth-subtitle').textContent = signingUp
    ? 'Set up your student profile to get started.'
    : 'Sign in to continue to your attendance dashboard.';
  document.getElementById('name-field').hidden = !signingUp;
  document.getElementById('student-id-field').hidden = !signingUp;
  document.getElementById('auth-name').required = signingUp;
  document.getElementById('auth-student-id').required = signingUp;
  document.getElementById('auth-password').autocomplete = signingUp ? 'new-password' : 'current-password';
  document.getElementById('auth-submit').textContent = signingUp ? 'Create account' : 'Sign in to dashboard';
  document.getElementById('auth-demo').hidden = signingUp;
  signInTab.setAttribute('aria-selected', String(!signingUp));
  signUpTab.setAttribute('aria-selected', String(signingUp));
  authError.hidden = true;
}

function saveAuthenticatedUser(user) {
  let state = {};
  try {
    state = JSON.parse(localStorage.getItem('smart_attendance_state') || '{}');
  } catch (error) {
    state = {};
  }
  const previousAuth = state.auth || {};
  state.auth = {
    ...previousAuth,
    isAuthenticated: true,
    name: user.name,
    studentId: user.studentId,
    email: user.email
  };
  localStorage.setItem('smart_attendance_state', JSON.stringify(state));
  window.location.href = 'index.html';
}

signInTab.addEventListener('click', () => setAuthMode('signin'));
signUpTab.addEventListener('click', () => setAuthMode('signup'));

document.getElementById('fill-demo').addEventListener('click', () => {
  setAuthMode('signin');
  document.getElementById('auth-email').value = 'alex.morgan@university.edu';
  document.getElementById('auth-password').value = 'student123';
});

authForm.addEventListener('submit', (event) => {
  event.preventDefault();
  authError.hidden = true;
  const email = document.getElementById('auth-email').value.trim().toLowerCase();
  const password = document.getElementById('auth-password').value;
  const accounts = readAccounts();

  if (authMode === 'signup') {
    const name = document.getElementById('auth-name').value.trim();
    const studentId = document.getElementById('auth-student-id').value.trim();
    if (!name || !studentId || !email || password.length < 6) {
      showAuthError('Enter your name, student ID, valid email, and a password of at least 6 characters.');
      return;
    }
    if (!document.getElementById('auth-email').validity.valid) {
      showAuthError('Enter a valid university email address.');
      return;
    }
    if (accounts.some((account) => account.email === email || (account.studentId || '').toLowerCase() === studentId.toLowerCase())) {
      showAuthError('An account with that email or student ID already exists.');
      return;
    }
    const user = { name, studentId, email, password };
    accounts.push(user);
    localStorage.setItem('smart_attendance_users', JSON.stringify(accounts));
    saveAuthenticatedUser(user);
    return;
  }

  const registeredUser = accounts.find((account) => account.email === email && account.password === password);
  const demoUser = ['alex.morgan@university.edu', 'cs-2023-8941'].includes(email) && password === 'student123'
    ? { name: 'Alex Morgan', studentId: 'CS-2023-8941', email: 'alex.morgan@university.edu' }
    : null;
  if (!registeredUser && !demoUser) {
    showAuthError('We could not match those details. Check your email and password, or create an account.');
    return;
  }
  const user = registeredUser || demoUser;
  saveAuthenticatedUser(user);
});