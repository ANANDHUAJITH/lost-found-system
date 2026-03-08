// ===============================
// 🔐 DASHBOARD PAGE PROTECTION
// ===============================

const studentName = localStorage.getItem("studentName");
const studentClass = localStorage.getItem("studentClass");
const role = localStorage.getItem("role"); // "admin" or "student"

// If not logged in → redirect
if (!studentName || !role) {
  window.location.href = "index.html";
}

// ===============================
// 👋 WELCOME MESSAGE
// ===============================

const welcomeText = document.getElementById("welcomeText");

if (welcomeText) {
  if (role === "admin") {
    welcomeText.innerText = "Welcome Admin 👑";
  } else {
    welcomeText.innerText =
      `Welcome ${studentName} (${studentClass}) 👋`;
  }
}

// ===============================
// 👑 ROLE-BASED UI CONTROL
// ===============================

// These IDs MUST exist in dashboard.html
const reportLostBtn = document.getElementById("reportLostBtn");
const reportFoundBtn = document.getElementById("reportFoundBtn");

// Admin should NOT report items
if (role === "admin") {
  if (reportLostBtn) reportLostBtn.style.display = "none";
  if (reportFoundBtn) reportFoundBtn.style.display = "none";
}

// ===============================
// 🧭 NAVIGATION FUNCTIONS
// ===============================

function goToLost() {
  window.location.href = "lost.html";
}

function goToFound() {
  window.location.href = "found.html";
}

function viewLost() {
  window.location.href = "view-lost.html";
}

function viewFound() {
  window.location.href = "view-found.html";
}

// ===============================
// 🚪 LOGOUT FUNCTION
// ===============================

function logout() {
  // Clear session data
  localStorage.removeItem("studentName");
  localStorage.removeItem("studentClass");
  localStorage.removeItem("role");

  window.location.href = "index.html";
}

