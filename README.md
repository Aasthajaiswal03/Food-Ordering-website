# FreshBite 🍴

Food ordering website — HTML, CSS, JS (no backend needed).

## Folder Structure

```
freshbite/
├── index.html          ← Homepage
├── css/
│   ├── style.css
│   ├── navbar.css
│   ├── home.css
│   └── pages.css
├── js/
│   ├── data.js
│   ├── navbar.js
│   ├── home.js
│   ├── cart.js
│   └── auth.js
└── pages/
    ├── login.html
    ├── cart.html
    ├── checkout.html
    ├── orders.html
    └── profile.html
```

## Bugs Fixed
1. Navbar paths — work correctly from both root and pages/ folder
2. Logout conflict — single logout() function in navbar.js
3. Order success page — lastOrder null race condition fixed
4. Profile nav — showSection() event.target bug fixed
