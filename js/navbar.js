// ================================================
// FreshBite — Navbar Component (navbar.js)
// BUG FIX: Dynamic path detection so navbar works
// correctly from both root (index.html) and pages/
// ================================================

// Detect if we are inside pages/ subfolder
const IS_SUBPAGE = window.location.pathname.includes("/pages/");
const ROOT       = IS_SUBPAGE ? "../" : "./";
const PAGES      = IS_SUBPAGE ? "./"  : "./pages/";

function renderNavbar() {
  const isLoggedIn  = !!STATE.user;
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  const navHTML = `
  <nav class="navbar">
    <div class="container">
      <a class="navbar-logo" href="${ROOT}index.html">
        Fresh<span>Bite</span> 🍴
      </a>

      <ul class="navbar-links hide-mobile">
        <li><a href="${ROOT}index.html"       class="${currentPage === 'index.html' ? 'active' : ''}">Home</a></li>
        <li><a href="${ROOT}index.html#menu"  >Menu</a></li>
        <li><a href="${PAGES}orders.html"     class="${currentPage === 'orders.html' ? 'active' : ''}">My Orders</a></li>
        <li><a href="${ROOT}index.html#about" >About</a></li>
      </ul>

      <div class="navbar-search hide-mobile">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input type="text" placeholder="Search food..." id="nav-search-input" autocomplete="off" />
      </div>

      <div class="navbar-actions">
        <button class="cart-btn" onclick="window.location.href='${isLoggedIn ? PAGES + 'cart.html' : PAGES + 'login.html'}'">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          Cart
          <span class="cart-count">${cartCount()}</span>
        </button>

        ${isLoggedIn ? `
          <div class="user-dropdown">
            <div class="user-avatar" onclick="toggleDropdown()">
              ${STATE.user.name.charAt(0).toUpperCase()}
            </div>
            <div class="dropdown-menu" id="user-dropdown">
              <a href="${PAGES}profile.html">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                </svg>
                My Profile
              </a>
              <a href="${PAGES}orders.html">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 13h4"/>
                </svg>
                My Orders
              </a>
              <a href="#" onclick="logout(); return false;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Logout
              </a>
            </div>
          </div>
        ` : `
          <button class="btn-login"  onclick="window.location.href='${PAGES}login.html'">Login</button>
          <button class="btn-signup" onclick="window.location.href='${PAGES}login.html'">Sign Up</button>
        `}

        <div class="hamburger" onclick="toggleMobileNav()" aria-label="Menu">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>

    <div class="mobile-nav" id="mobile-nav">
      <a href="${ROOT}index.html">🏠 Home</a>
      <a href="${ROOT}index.html#menu">🍽️ Menu</a>
      <a href="${PAGES}orders.html">📦 My Orders</a>
      <a href="${PAGES}cart.html">🛒 Cart (${cartCount()})</a>
      ${isLoggedIn
        ? `<a href="#" onclick="logout(); return false;">🚪 Logout</a>`
        : `<a href="${PAGES}login.html">🔐 Login / Sign Up</a>`}
    </div>
  </nav>`;

  const container = document.getElementById("navbar-container");
  if (container) container.innerHTML = navHTML;

  // Search input listener
  const searchInput = document.getElementById("nav-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", e => {
      const query = e.target.value.trim().toLowerCase();
      if (window.filterFoodsBySearch) window.filterFoodsBySearch(query);
    });
  }
}

function toggleMobileNav() {
  document.getElementById("mobile-nav")?.classList.toggle("open");
}

function toggleDropdown() {
  document.getElementById("user-dropdown")?.classList.toggle("open");
}

// BUG FIX: Single logout function — no more conflict with profile.html
function logout() {
  STATE.user = null;
  localStorage.removeItem("fb_user");
  showToast("Logged out successfully", "info");
  setTimeout(() => window.location.href = ROOT + "index.html", 800);
}

// Close dropdown on outside click
document.addEventListener("click", e => {
  const dd = document.getElementById("user-dropdown");
  if (dd && !e.target.closest(".user-dropdown")) dd.classList.remove("open");
});

document.addEventListener("DOMContentLoaded", renderNavbar);
