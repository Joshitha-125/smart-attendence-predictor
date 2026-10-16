function hasSavedAuthSession() {
  try {
    const state = JSON.parse(localStorage.getItem('smart_attendance_state') || '{}');
    return Boolean(state.auth && state.auth.isAuthenticated);
  } catch (error) {
    return false;
  }
}

appState.auth = Object.assign({}, DEFAULT_STATE.auth, appState.auth || {});

const renderAppRoute = window.navigateTo;
window.navigateTo = function (route) {
  if (route === 'login' || !hasSavedAuthSession()) {
    window.location.href = 'auth.html';
    return;
  }
  renderAppRoute(route);
  const name = document.getElementById('user-pill-name');
  const studentId = document.getElementById('user-pill-id');
  if (name) name.textContent = appState.auth.name;
  if (studentId) studentId.textContent = appState.auth.studentId;
  if (route === 'dashboard') {
    const greeting = document.querySelector('#screen-mount h1');
    if (greeting) greeting.textContent = `Welcome, ${appState.auth.name} 👋`;
  }
};

window.toggleAuth = function () {
  appState.auth.isAuthenticated = false;
  saveState();
  window.location.href = 'auth.html';
};

document.addEventListener('DOMContentLoaded', () => {
  if (!hasSavedAuthSession()) window.location.href = 'auth.html';
});