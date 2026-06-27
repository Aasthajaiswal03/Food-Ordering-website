# FreshBite 🍴 — Food Ordering Website

A modern food ordering website built with HTML, CSS, and JavaScript.

🌐 **Live Site:** [https://aasthajaiswal03.github.io/Food-Ordering-website/](https://aasthajaiswal03.github.io/Food-Ordering-website/)

---

## 📸 Preview

![FreshBite Homepage](https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80)

---

## ✨ Features

- **Browse Menu** — Filter by category (Pizza, Biryani, Burgers, etc.) and Veg / Non-Veg tabs
- **Search** — Search food items by name or category from the navbar
- **Cart** — Add, remove, update quantity of items
- **Checkout** — Delivery address form with validation + payment method selection
- **Order History** — View past orders and reorder with one click
- **User Profile** — Edit name, phone, view wishlist and order stats
- **Wishlist** — Save favourite items with heart button
- **Login / Signup** — Email & password auth stored in localStorage
- **Coupon Codes** — Apply discount codes at checkout
- **Responsive Design** — Works on mobile, tablet, and desktop

---

## 🗂️ Project Structure

```
Food-Ordering-website/
│
├── index.html              # Homepage
│
├── css/
│   ├── style.css           # Global styles, buttons, forms, toasts
│   ├── navbar.css          # Navbar & dropdown styles
│   ├── home.css            # Hero, food grid, category chips
│   └── pages.css           # Auth, cart, checkout, orders pages
│
├── js/
│   ├── data.js             # Food data, app state, helper functions
│   ├── navbar.js           # Navbar render, search, logout
│   ├── home.js             # Homepage logic, food cards, filters
│   ├── cart.js             # Cart page, place order, order success
│   └── auth.js             # Login, signup, password strength
│
└── pages/
    ├── login.html          # Login & Signup page
    ├── cart.html           # Cart page
    ├── checkout.html       # Order success page
    ├── orders.html         # Order history page
    └── profile.html        # User profile page
```

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| HTML5      | Page structure |
| CSS3       | Styling, animations, responsive layout |
| JavaScript | App logic, state management |
| localStorage | User data, cart, orders (no backend needed) |
| Unsplash   | Food images |
| GitHub Pages | Free hosting |

---

## 🚀 How to Run Locally

1. Download or clone this repository
2. Open `index.html` in any browser
3. No server or installation needed — runs directly in browser


## 💳 Test Coupon Codes

| Code | Discount |
|------|----------|
| `FRESH10` | 10% off |
| `WELCOME20` | 20% off |
| `BITE15` | 15% off |

---

## 📱 Pages

| Page | URL |
|------|-----|
| Home | `/index.html` |
| Login / Signup | `/pages/login.html` |
| Cart | `/pages/cart.html` |
| Order Success | `/pages/checkout.html` |
| My Orders | `/pages/orders.html` |
| My Profile | `/pages/profile.html` |

---

## 📄 License

This project is open source and free to use for learning and personal projects.
