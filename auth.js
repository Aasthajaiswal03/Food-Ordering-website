// ================================================
// FreshBite — Auth Logic (auth.js)
// ================================================

document.addEventListener("DOMContentLoaded", () => {
  setupAuthTabs();
  setupLoginForm();
  setupSignupForm();
  setupPasswordStrength();
  checkAlreadyLoggedIn();
});

function checkAlreadyLoggedIn() {
  if (STATE.user) window.location.href = "../index.html";
}

// ---- Tab Switching ----
function setupAuthTabs() {
  const tabs  = document.querySelectorAll(".auth-tab");
  const forms = document.querySelectorAll(".auth-form");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      forms.forEach(f => f.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(tab.dataset.form).classList.add("active");
    });
  });
}

// ---- Login Form ----
function setupLoginForm() {
  const form = document.getElementById("login-form");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    clearErrors(form);

    const email = form.querySelector("#login-email").value.trim();
    const pwd   = form.querySelector("#login-pwd").value;
    let valid   = true;

    // Email validation — only Gmail
    if (!validateEmail(email)) {
      showFieldError("login-email-err", "Please enter a valid Gmail address (@gmail.com)");
      form.querySelector("#login-email").classList.add("error");
      valid = false;
    }

    // Password — min 8 chars, 1 uppercase, 1 number, 1 special
    if (!validatePassword(pwd)) {
      showFieldError("login-pwd-err", "Min 8 chars with 1 uppercase, 1 number & 1 special character");
      form.querySelector("#login-pwd").classList.add("error");
      valid = false;
    }

    if (!valid) return;

    // Check stored user
    const users = JSON.parse(localStorage.getItem("fb_users") || "[]");
    const found = users.find(u => u.email === email && u.password === pwd);

    if (!found) {
      showFieldError("login-pwd-err", "Email or password is incorrect");
      form.querySelector("#login-pwd").classList.add("error");
      return;
    }

    // Login success
    STATE.user = { name: found.name, email: found.email };
    localStorage.setItem("fb_user", JSON.stringify(STATE.user));
    showToast(`Welcome back, ${found.name}! 🎉`, "success");
    setTimeout(() => window.location.href = "../index.html", 900);
  });
}

// ---- Signup Form ----
function setupSignupForm() {
  const form = document.getElementById("signup-form");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    clearErrors(form);

    const name    = form.querySelector("#signup-name").value.trim();
    const email   = form.querySelector("#signup-email").value.trim();
    const phone   = form.querySelector("#signup-phone").value.trim();
    const pwd     = form.querySelector("#signup-pwd").value;
    const cpwd    = form.querySelector("#signup-cpwd").value;
    const agree   = form.querySelector("#signup-agree").checked;
    let valid     = true;

    if (name.length < 3) {
      showFieldError("signup-name-err", "Name must be at least 3 characters");
      form.querySelector("#signup-name").classList.add("error");
      valid = false;
    }

    if (!validateEmail(email)) {
      showFieldError("signup-email-err", "Please enter a valid Gmail address (@gmail.com)");
      form.querySelector("#signup-email").classList.add("error");
      valid = false;
    }

    if (!validatePhone(phone)) {
      showFieldError("signup-phone-err", "Enter a valid 10-digit Indian mobile number");
      form.querySelector("#signup-phone").classList.add("error");
      valid = false;
    }

    if (!validatePassword(pwd)) {
      showFieldError("signup-pwd-err", "Min 8 chars with 1 uppercase, 1 number & 1 special character (!@#$%^&*)");
      form.querySelector("#signup-pwd").classList.add("error");
      valid = false;
    }

    if (pwd !== cpwd) {
      showFieldError("signup-cpwd-err", "Passwords do not match");
      form.querySelector("#signup-cpwd").classList.add("error");
      valid = false;
    }

    if (!agree) {
      showFieldError("signup-agree-err", "Please accept the terms & conditions");
      valid = false;
    }

    if (!valid) return;

    // Check duplicate email
    const users = JSON.parse(localStorage.getItem("fb_users") || "[]");
    if (users.find(u => u.email === email)) {
      showFieldError("signup-email-err", "This email is already registered. Please login.");
      form.querySelector("#signup-email").classList.add("error");
      return;
    }

    // Save user
    users.push({ name, email, phone, password: pwd });
    localStorage.setItem("fb_users", JSON.stringify(users));

    STATE.user = { name, email };
    localStorage.setItem("fb_user", JSON.stringify(STATE.user));
    showToast(`Welcome to FreshBite, ${name}! 🎉`, "success");
    setTimeout(() => window.location.href = "../index.html", 900);
  });
}

// ---- Password Strength Meter ----
function setupPasswordStrength() {
  const pwdInput = document.getElementById("signup-pwd");
  const bars     = document.querySelectorAll(".pwd-bar");
  const label    = document.querySelector(".pwd-label");
  if (!pwdInput || !bars.length) return;

  pwdInput.addEventListener("input", () => {
    const val = pwdInput.value;
    const strength = getPasswordStrength(val);
    bars.forEach((b, i) => {
      b.className = "pwd-bar";
      if (i < strength.score) b.classList.add(strength.level);
    });
    if (label) {
      label.className = `pwd-label ${strength.level}`;
      label.textContent = strength.label;
    }
  });
}

function getPasswordStrength(pwd) {
  let score = 0;
  if (pwd.length >= 8)             score++;
  if (/[A-Z]/.test(pwd))          score++;
  if (/\d/.test(pwd))             score++;
  if (/[!@#$%^&*]/.test(pwd))     score++;

  if (score <= 1) return { score: 1, level: "weak",   label: "Weak" };
  if (score === 2) return { score: 2, level: "medium", label: "Medium" };
  if (score === 3) return { score: 3, level: "medium", label: "Good" };
  return              { score: 4, level: "strong", label: "Strong" };
}

// ---- Helpers ----
function showFieldError(id, msg) {
  const el = document.getElementById(id);
  if (el) { el.textContent = msg; el.classList.add("show"); }
}

function clearErrors(form) {
  form.querySelectorAll(".form-error").forEach(e => { e.textContent = ""; e.classList.remove("show"); });
  form.querySelectorAll(".form-input").forEach(i => i.classList.remove("error"));
}

// ---- Password Toggle ----
function togglePwd(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === "password") { input.type = "text";     btn.textContent = "🙈"; }
  else                           { input.type = "password"; btn.textContent = "👁️"; }
}