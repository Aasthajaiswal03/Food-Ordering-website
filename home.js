// ================================================
// FreshBite — Home Page Logic (home.js)
// ================================================

document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  renderMenuTabs();
  renderFoods("all", "all");
  renderHeroImages();
  renderPromos();
  setupSearchFilter();
});

// ---- Hero Images ----
function renderHeroImages() {
  const featured = [9, 14, 10, 1]; // IDs to feature
  const items    = featured.map(id => FOODS.find(f => f.id === id)).filter(Boolean);
  const wrap = document.getElementById("hero-img-grid");
  if (!wrap) return;
  wrap.innerHTML = items.map((f, i) => `
    <div class="hero-img-card" onclick="document.getElementById('menu').scrollIntoView({behavior:'smooth'})">
      <img src="${f.img}" alt="${f.name}" loading="${i===0?'eager':'lazy'}" />
      <div class="img-label">
        ${f.name}<br>
        <span class="img-price">₹${f.price}</span>
      </div>
    </div>`).join("");
}

// ---- Categories ----
function renderCategories() {
  const scroll = document.getElementById("cats-scroll");
  if (!scroll) return;
  scroll.innerHTML = CATEGORIES.map(c => `
    <div class="cat-chip ${c.id==='all'?'active':''}" data-cat="${c.id}" onclick="selectCategory('${c.id}')">
      <img src="${c.img}" alt="${c.label}" loading="lazy" />
      ${c.label}
    </div>`).join("");
}

function selectCategory(catId) {
  STATE.currentFilter = catId;
  document.querySelectorAll(".cat-chip").forEach(c => c.classList.toggle("active", c.dataset.cat === catId));
  renderFoods(catId, STATE.currentTab);
  document.getElementById("menu")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ---- Veg / Non-Veg Tabs ----
function renderMenuTabs() {
  const tabs = document.getElementById("menu-tabs");
  if (!tabs) return;
  tabs.innerHTML = `
    <div class="menu-tab active" data-tab="all"     onclick="selectTab('all')">🍽️ All</div>
    <div class="menu-tab"        data-tab="veg"     onclick="selectTab('veg')">🥦 Veg Only</div>
    <div class="menu-tab"        data-tab="nonveg"  onclick="selectTab('nonveg')">🍗 Non-Veg Only</div>`;
}

function selectTab(tab) {
  STATE.currentTab = tab;
  document.querySelectorAll(".menu-tab").forEach(t => t.classList.toggle("active", t.dataset.tab === tab));
  renderFoods(STATE.currentFilter, tab);
}

// ---- Search Filter ----
function setupSearchFilter() {
  window.filterFoodsBySearch = query => {
    const filtered = FOODS.filter(f =>
      f.name.toLowerCase().includes(query) ||
      f.desc.toLowerCase().includes(query) ||
      f.category.toLowerCase().includes(query)
    );
    renderFoodsWithData(filtered);
  };
}

// ---- Render Foods ----
function renderFoods(catId, tab) {
  let list = FOODS;
  if (catId && catId !== "all") list = list.filter(f => f.category === catId);
  if (tab === "veg")            list = list.filter(f => f.type === "veg");
  if (tab === "nonveg")         list = list.filter(f => f.type === "nonveg");
  renderFoodsWithData(list);
}

function renderFoodsWithData(list) {
  const vegGrid    = document.getElementById("veg-food-grid");
  const nonvegGrid = document.getElementById("nonveg-food-grid");
  const vegSection    = document.getElementById("veg-section");
  const nonvegSection = document.getElementById("nonveg-section");

  const vegItems    = list.filter(f => f.type === "veg");
  const nonvegItems = list.filter(f => f.type === "nonveg");

  // Veg section
  if (vegGrid) {
    if (vegItems.length === 0) {
      vegSection && (vegSection.style.display = "none");
    } else {
      vegSection && (vegSection.style.display = "block");
      vegGrid.innerHTML = vegItems.map(foodCard).join("");
    }
  }

  // Non-Veg section
  if (nonvegGrid) {
    if (nonvegItems.length === 0) {
      nonvegSection && (nonvegSection.style.display = "none");
    } else {
      nonvegSection && (nonvegSection.style.display = "block");
      nonvegGrid.innerHTML = nonvegItems.map(foodCard).join("");
    }
  }

  if (!list.length) {
    vegGrid    && (vegGrid.innerHTML    = `<p style="color:var(--muted);grid-column:1/-1;padding:40px 0;text-align:center">No items found</p>`);
    nonvegGrid && (nonvegGrid.innerHTML = "");
  }
}

// ---- Food Card HTML ----
function foodCard(f) {
  const inCart    = STATE.cart.find(i => i.id === f.id);
  const inWish    = STATE.wishlist.includes(f.id);
  const badgeHTML = f.badge ? `<span class="badge badge-${f.badge}">${f.badge==='best'?'🔥 Best Seller':f.badge==='new'?'✨ New':'⭐ Top'}</span>` : `<span></span>`;

  return `
  <div class="food-card" id="food-${f.id}">
    <div class="food-card-img-wrap">
      <img class="food-card-img" src="${f.img}" alt="${f.name}" loading="lazy" />
      <div class="food-card-tags">
        <div style="display:flex;flex-direction:column;gap:5px">
          <span class="badge badge-${f.type}">${f.type==='veg'?'🟢 Veg':'🔴 Non-Veg'}</span>
          ${badgeHTML}
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:5px">
          <span class="food-rating">⭐ ${f.rating}</span>
          <button class="food-fav ${inWish?'active':''}" onclick="favToggle(${f.id},this)" title="Add to wishlist">
            ${inWish ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
    <div class="food-card-body">
      <div class="food-name">${f.name}</div>
      <div class="food-desc">${f.desc}</div>
      <div class="food-card-footer">
        <div class="food-price">
          ₹${f.price}
          ${f.originalPrice ? `<span class="original">₹${f.originalPrice}</span>` : ''}
        </div>
        ${inCart
          ? `<div class="qty-control" id="qc-${f.id}">
               <button class="qty-btn" onclick="homeUpdateQty(${f.id},-1)">−</button>
               <span class="qty-num" id="qn-${f.id}">${inCart.qty}</span>
               <button class="qty-btn" onclick="homeUpdateQty(${f.id},+1)">+</button>
             </div>`
          : `<button class="add-to-cart-btn" id="addbtn-${f.id}" onclick="homeAddCart(${f.id})">+ Add</button>`
        }
      </div>
    </div>
  </div>`;
}

// ---- Home Page Cart Interactions ----
function homeAddCart(foodId) {
  addToCart(foodId, 1);
  const card = document.getElementById(`food-${foodId}`);
  const footer = card?.querySelector(".food-card-footer");
  if (!footer) return;
  const btn = footer.querySelector(".add-to-cart-btn");
  if (btn) {
    btn.outerHTML = `
      <div class="qty-control" id="qc-${foodId}">
        <button class="qty-btn" onclick="homeUpdateQty(${foodId},-1)">−</button>
        <span class="qty-num" id="qn-${foodId}">1</span>
        <button class="qty-btn" onclick="homeUpdateQty(${foodId},+1)">+</button>
      </div>`;
  }
}

function homeUpdateQty(foodId, delta) {
  updateQty(foodId, delta);
  const item = STATE.cart.find(i => i.id === foodId);
  const numEl = document.getElementById(`qn-${foodId}`);
  if (item && numEl) {
    numEl.textContent = item.qty;
  } else {
    // Remove qty control, show Add button again
    const qc = document.getElementById(`qc-${foodId}`);
    if (qc) {
      qc.outerHTML = `<button class="add-to-cart-btn" id="addbtn-${foodId}" onclick="homeAddCart(${foodId})">+ Add</button>`;
    }
  }
}

function favToggle(foodId, btn) {
  toggleWishlist(foodId);
  const inWish = STATE.wishlist.includes(foodId);
  btn.textContent = inWish ? "❤️" : "🤍";
  btn.classList.toggle("active", inWish);
}

// ---- Promo Banners ----
function renderPromos() {
  const wrap = document.getElementById("promo-grid");
  if (!wrap) return;
  const promos = [
    {
      img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80",
      tag: "Limited Offer",
      title: "50% OFF on First Order",
      desc: "Use code FRESH10 at checkout"
    },
    {
      img: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80",
      tag: "Free Delivery",
      title: "Orders above ₹299",
      desc: "No delivery charges, guaranteed!"
    }
  ];
  wrap.innerHTML = promos.map(p => `
    <div class="promo-card">
      <img src="${p.img}" alt="${p.title}" loading="lazy" />
      <div class="promo-overlay">
        <div class="promo-tag">${p.tag}</div>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
      </div>
    </div>`).join("");
}