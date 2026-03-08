function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const studentClass = document.getElementById("class").value.trim();

  if (!username || !password) {
    alert("Please enter username and password");
    return;
  }

  // 👑 ADMIN LOGIN — MUST BE FIRST
  if (username === "admin" && password === "admin123") {

    localStorage.setItem("role", "admin");
    localStorage.setItem("studentName", "Admin");
    localStorage.setItem("studentClass", "ALL");

    window.location.href = "intro.html";
    return;
  }

  // 👨‍🎓 STUDENT LOGIN
  if (!studentClass) {
    alert("Students must enter class/section");
    return;
  }

  localStorage.setItem("role", "student");
  localStorage.setItem("studentName", username);
  localStorage.setItem("studentClass", studentClass);

  window.location.href = "intro.html";
}