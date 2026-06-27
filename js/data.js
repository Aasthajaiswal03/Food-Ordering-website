// ================================================
// FreshBite — App Data & State (data.js)
// ================================================

// ---- Food Data (Real Unsplash Images) ----
const FOODS = [
  // ===== VEG =====
  {
    id: 1, name: "Margherita Pizza", category: "pizza", type: "veg",
    desc: "Thin crust base, fresh tomato sauce, mozzarella & basil leaves",
    price: 249, originalPrice: 299, rating: 4.8, reviews: 1240,
    img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&q=80",
    badge: "best", time: "25 min"
  },
  {
    id: 2, name: "Paneer Tikka Wrap", category: "wraps", type: "veg",
    desc: "Grilled paneer, mint chutney, onions & capsicum in wheat tortilla",
    price: 179, originalPrice: null, rating: 4.6, reviews: 870,
    img: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80",
    badge: null, time: "20 min"
  },
  {
    id: 3, name: "Garden Veggie Burger", category: "burgers", type: "veg",
    desc: "Crispy veggie patty, fresh lettuce, tomato, cheese & chipotle mayo",
    price: 159, originalPrice: null, rating: 4.5, reviews: 640,
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
    badge: "new", time: "18 min"
  },
  {
    id: 4, name: "Veg Hakka Noodles", category: "noodles", type: "veg",
    desc: "Wok-tossed noodles with fresh veggies, soya sauce & sesame oil",
    price: 149, originalPrice: null, rating: 4.4, reviews: 510,
    img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&q=80",
    badge: null, time: "22 min"
  },
  {
    id: 5, name: "Choco Lava Cake", category: "desserts", type: "veg",
    desc: "Warm dark chocolate cake with molten lava center & vanilla ice cream",
    price: 149, originalPrice: 179, rating: 4.9, reviews: 2100,
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80",
    badge: "best", time: "15 min"
  },
  {
    id: 6, name: "Mango Lassi", category: "drinks", type: "veg",
    desc: "Thick & creamy blended mango yoghurt drink with a hint of cardamom",
    price: 99, originalPrice: null, rating: 4.7, reviews: 1830,
    img: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80",
    badge: null, time: "5 min"
  },
  {
    id: 7, name: "Paneer Butter Masala", category: "main", type: "veg",
    desc: "Rich tomato-based curry with soft paneer cubes & aromatic spices",
    price: 219, originalPrice: 259, rating: 4.8, reviews: 1560,
    img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80",
    badge: "best", time: "30 min"
  },
  {
    id: 8, name: "Caesar Salad", category: "salads", type: "veg",
    desc: "Romaine lettuce, parmesan, croutons & classic caesar dressing",
    price: 189, originalPrice: null, rating: 4.3, reviews: 390,
    img: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80",
    badge: null, time: "10 min"
  },

  // ===== NON-VEG =====
  {
    id: 9, name: "Chicken Biryani", category: "biryani", type: "nonveg",
    desc: "Dum-cooked basmati rice with juicy chicken, fried onions & saffron",
    price: 289, originalPrice: 329, rating: 4.9, reviews: 3240,
    img: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400&q=80",
    badge: "best", time: "35 min"
  },
  {
    id: 10, name: "Crispy Chicken Burger", category: "burgers", type: "nonveg",
    desc: "Double-fried chicken thigh, coleslaw, pickles & sriracha mayo",
    price: 199, originalPrice: null, rating: 4.8, reviews: 1870,
    img: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400&q=80",
    badge: null, time: "20 min"
  },
  {
    id: 11, name: "Pepperoni Pizza", category: "pizza", type: "nonveg",
    desc: "Classic hand-tossed pizza loaded with pepperoni & extra cheese",
    price: 299, originalPrice: 349, rating: 4.7, reviews: 1420,
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
    badge: null, time: "28 min"
  },
  {
    id: 12, name: "Chicken Tikka Wrap", category: "wraps", type: "nonveg",
    desc: "Tandoor-smoked chicken tikka, green chutney & pickled onions",
    price: 199, originalPrice: null, rating: 4.6, reviews: 920,
    img: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=400&q=80",
    badge: "new", time: "22 min"
  },
  {
    id: 13, name: "Chicken Noodles", category: "noodles", type: "nonveg",
    desc: "Wok-tossed Hakka noodles with chicken strips, egg & Asian sauces",
    price: 169, originalPrice: null, rating: 4.5, reviews: 760,
    img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80",
    badge: null, time: "20 min"
  },
  {
    id: 14, name: "Butter Chicken", category: "main", type: "nonveg",
    desc: "Slow-cooked chicken in rich tomato-butter-cream gravy",
    price: 259, originalPrice: 299, rating: 4.9, reviews: 2780,
    img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80",
    badge: "best", time: "30 min"
  },
  {
    id: 15, name: "BBQ Chicken Wings", category: "snacks", type: "nonveg",
    desc: "Crispy oven-baked wings tossed in smoky BBQ glaze",
    price: 229, originalPrice: 269, rating: 4.7, reviews: 1340,
    img: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&q=80",
    badge: null, time: "25 min"
  },
  {
    id: 16, name: "Prawn Fried Rice", category: "rice", type: "nonveg",
    desc: "Jasmine rice stir-fried with jumbo prawns, egg & spring onions",
    price: 279, originalPrice: null, rating: 4.6, reviews: 890,
    img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80",
    badge: "new", time: "28 min"
  }
];

// ---- Categories ----
const CATEGORIES = [
  { id: "all",      label: "All",        img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=60&q=80" },
  { id: "pizza",    label: "Pizza",      img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=60&q=80" },
  { id: "burgers",  label: "Burgers",    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=60&q=80" },
  { id: "biryani",  label: "Biryani",    img: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=60&q=80" },
  { id: "noodles",  label: "Noodles",    img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=60&q=80" },
  { id: "wraps",    label: "Wraps",      img: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=60&q=80" },
  { id: "main",     label: "Main Course",img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=60&q=80" },
  { id: "desserts", label: "Desserts",   img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=60&q=80" },
  { id: "drinks",   label: "Drinks",     img: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=60&q=80" },
  { id: "salads",   label: "Salads",     img: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=60&q=80" },
  { id: "snacks",   label: "Snacks",     img: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=60&q=80" },
];

// ---- App State ----
const STATE = {
  cart: JSON.parse(localStorage.getItem("fb_cart") || "[]"),
  user: JSON.parse(localStorage.getItem("fb_user") || "null"),
  wishlist: JSON.parse(localStorage.getItem("fb_wishlist") || "[]"),
  currentFilter: "all",
  currentTab: "all",          // "all" | "veg" | "nonveg"
  lastOrder: JSON.parse(localStorage.getItem("fb_last_order") || "null"),
};

// ---- State Helpers ----
function saveCart()     { localStorage.setItem("fb_cart", JSON.stringify(STATE.cart)); }
function saveWishlist() { localStorage.setItem("fb_wishlist", JSON.stringify(STATE.wishlist)); }

function addToCart(foodId, qty = 1) {
  const existing = STATE.cart.find(i => i.id === foodId);
  if (existing) { existing.qty += qty; }
  else {
    const food = FOODS.find(f => f.id === foodId);
    if (food) STATE.cart.push({ id: food.id, name: food.name, price: food.price, img: food.img, qty });
  }
  saveCart();
  updateCartBadge();
  showToast(`Added to cart!`, "success");
}

function removeFromCart(foodId) {
  STATE.cart = STATE.cart.filter(i => i.id !== foodId);
  saveCart();
  updateCartBadge();
}

function updateQty(foodId, delta) {
  const item = STATE.cart.find(i => i.id === foodId);
  if (!item) return;
  item.qty = Math.max(0, item.qty + delta);
  if (item.qty === 0) removeFromCart(foodId);
  saveCart();
  updateCartBadge();
}

function cartTotal() {
  return STATE.cart.reduce((s, i) => s + i.price * i.qty, 0);
}
function cartCount() {
  return STATE.cart.reduce((s, i) => s + i.qty, 0);
}

function toggleWishlist(foodId) {
  const idx = STATE.wishlist.indexOf(foodId);
  if (idx === -1) { STATE.wishlist.push(foodId); showToast("Added to wishlist ❤️", "info"); }
  else            { STATE.wishlist.splice(idx, 1); showToast("Removed from wishlist", "info"); }
  saveWishlist();
}

// ---- Validation ----
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.endsWith("@gmail.com");
}
function validatePassword(pwd) {
  // Min 8 chars, 1 uppercase, 1 number, 1 special char
  return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(pwd);
}
function validatePhone(phone) {
  return /^[6-9]\d{9}$/.test(phone.replace(/\s/g,""));
}
function validatePIN(pin) {
  return /^\d{6}$/.test(pin);
}

// ---- Toast ----
function showToast(msg, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"}</span>
    <span>${msg}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ---- Cart Badge ----
function updateCartBadge() {
  const badges = document.querySelectorAll(".cart-count");
  const count = cartCount();
  badges.forEach(b => {
    b.textContent = count;
    b.classList.add("bump");
    setTimeout(() => b.classList.remove("bump"), 200);
  });
}

// ---- Page Router (SPA) ----
const pages = {
  home:     "index.html",
  login:    "pages/login.html",
  signup:   "pages/signup.html",
  cart:     "pages/cart.html",
  checkout: "pages/checkout.html",
  orders:   "pages/orders.html",
  profile:  "pages/profile.html",
};

function navigate(page) {
  if (pages[page]) window.location.href = pages[page];
}