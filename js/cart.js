// ================================================
// FreshBite — Cart & Checkout Logic (cart.js)
// BUG FIX: lastOrder null race condition fixed
// BUG FIX: placeOrder now waits before redirect
// ================================================

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("cart-items-wrap"))  renderCartPage();
  if (document.getElementById("checkout-success")) renderOrderSuccess();
});

// ---- Render Cart Page ----
function renderCartPage() {
  const wrap     = document.getElementById("cart-items-wrap");
  const summWrap = document.getElementById("cart-summary-wrap");

  if (!STATE.cart.length) {
    wrap.innerHTML = `
      <div class="empty-cart">
        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&q=60" alt="Empty cart" />
        <h3>Your cart is empty!</h3>
        <p>Looks like you haven't added anything yet.<br>Explore our delicious menu!</p>
        <button class="btn btn-primary btn-full" onclick="window.location.href='../index.html'">Browse Menu</button>
      </div>`;
    if (summWrap) summWrap.innerHTML = "";
    return;
  }

  wrap.innerHTML = `
    <div class="cart-items-card">
      <div class="cart-items-header">
        <h2>Your Items (${cartCount()})</h2>
        <button class="clear-cart-btn" onclick="clearCart()">Clear All</button>
      </div>
      ${STATE.cart.map(item => `
        <div class="cart-item" id="cart-item-${item.id}">
          <img class="cart-item-img" src="${item.img}" alt="${item.name}" loading="lazy" />
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-meta">₹${item.price} per item</div>
          </div>
          <div class="cart-item-qty">
            <button class="cqty-btn" onclick="changeCartQty(${item.id}, -1)">−</button>
            <span class="cqty-num" id="qty-${item.id}">${item.qty}</span>
            <button class="cqty-btn" onclick="changeCartQty(${item.id}, +1)">+</button>
          </div>
          <div class="cart-item-price" id="price-${item.id}">₹${item.price * item.qty}</div>
          <button class="remove-item-btn" onclick="removeItem(${item.id})" title="Remove">✕</button>
        </div>
      `).join("")}
    </div>`;

  const sub      = cartTotal();
  const delivery = sub >= 299 ? 0 : 49;
  const gst      = Math.round(sub * 0.05);
  const total    = sub + delivery + gst;

  summWrap.innerHTML = `
    <div class="cart-summary">
      <h2>Order Summary</h2>

      <div class="coupon-row">
        <input class="form-input" id="coupon-input" placeholder="Enter coupon code" />
        <button class="apply-coupon" onclick="applyCoupon()">Apply</button>
      </div>

      <div class="summary-row"><span>Subtotal</span><span>₹${sub}</span></div>
      <div class="summary-row">
        <span>Delivery Fee</span>
        <span class="${delivery === 0 ? 'free-delivery' : ''}">
          ${delivery === 0 ? 'FREE 🎉' : '₹' + delivery}
        </span>
      </div>
      ${delivery > 0 ? `<div style="font-size:12px;color:var(--muted);margin:-6px 0 8px;text-align:right">Add ₹${299 - sub} more for free delivery</div>` : ''}
      <div class="summary-row"><span>GST (5%)</span><span>₹${gst}</span></div>
      <div class="summary-row total"><span>Total</span><span class="sum-val">₹${total}</span></div>

      <div class="address-form-section">
        <h3>📍 Delivery Address</h3>
        <div id="address-form">
          <div class="address-grid">
            <div class="form-group">
              <input class="form-input" id="addr-name" placeholder="Full Name" required />
              <div class="form-error" id="err-addr-name"></div>
            </div>
            <div class="form-group">
              <input class="form-input" id="addr-phone" placeholder="Phone Number" maxlength="10" required />
              <div class="form-error" id="err-addr-phone"></div>
            </div>
            <div class="form-group span-2">
              <input class="form-input" id="addr-flat" placeholder="House / Flat No., Street, Locality" required />
              <div class="form-error" id="err-addr-flat"></div>
            </div>
            <div class="form-group">
              <input class="form-input" id="addr-city" placeholder="City" required />
              <div class="form-error" id="err-addr-city"></div>
            </div>
            <div class="form-group">
              <input class="form-input" id="addr-pin" placeholder="PIN Code" maxlength="6" required />
              <div class="form-error" id="err-addr-pin"></div>
            </div>
            <div class="form-group span-2">
              <select class="form-input" id="addr-type">
                <option value="home">🏠 Home</option>
                <option value="work">💼 Work</option>
                <option value="other">📍 Other</option>
              </select>
            </div>
          </div>

          <h3 style="margin-top:16px">💳 Payment Method</h3>
          <div class="payment-opts">
            <label class="pay-opt"><input type="radio" name="payment" value="cod" checked /><span>💵</span> Cash on Delivery</label>
            <label class="pay-opt"><input type="radio" name="payment" value="upi" /><span>📲</span> UPI / PhonePe / GPay</label>
            <label class="pay-opt"><input type="radio" name="payment" value="card" /><span>💳</span> Credit / Debit Card</label>
            <label class="pay-opt"><input type="radio" name="payment" value="netbanking" /><span>🏦</span> Net Banking</label>
          </div>
        </div>
      </div>

      <button class="btn-green" style="margin-top:18px" onclick="placeOrder(${total})">
        Place Order · ₹${total}
      </button>
    </div>`;
}

// ---- Cart Actions ----
function changeCartQty(foodId, delta) {
  updateQty(foodId, delta);
  const item = STATE.cart.find(i => i.id === foodId);
  if (!item) {
    document.getElementById(`cart-item-${foodId}`)?.remove();
    if (!STATE.cart.length) renderCartPage();
    return;
  }
  document.getElementById(`qty-${foodId}`).textContent   = item.qty;
  document.getElementById(`price-${foodId}`).textContent = `₹${item.price * item.qty}`;
  refreshSummary();
}

function removeItem(foodId) {
  removeFromCart(foodId);
  document.getElementById(`cart-item-${foodId}`)?.remove();
  if (!STATE.cart.length) renderCartPage();
  else refreshSummary();
  showToast("Item removed", "info");
}

function clearCart() {
  if (!confirm("Remove all items from cart?")) return;
  STATE.cart = [];
  saveCart();
  updateCartBadge();
  renderCartPage();
  showToast("Cart cleared", "info");
}

function refreshSummary() {
  const sub      = cartTotal();
  const delivery = sub >= 299 ? 0 : 49;
  const gst      = Math.round(sub * 0.05);
  const total    = sub + delivery + gst;
  const btn = document.querySelector(".btn-green");
  if (btn) {
    btn.textContent = `Place Order · ₹${total}`;
    btn.setAttribute("onclick", `placeOrder(${total})`);
  }
}

// ---- Coupon ----
function applyCoupon() {
  const code    = document.getElementById("coupon-input")?.value.trim().toUpperCase();
  const coupons = { "FRESH10": 10, "WELCOME20": 20, "BITE15": 15 };
  if (coupons[code]) showToast(`Coupon applied! ${coupons[code]}% off 🎉`, "success");
  else showToast("Invalid coupon code", "error");
}

// ---- Place Order ----
function placeOrder(total) {
  if (!STATE.user) {
    showToast("Please login to place order", "error");
    setTimeout(() => window.location.href = "login.html", 800);
    return;
  }

  const fields = [
    { id: "addr-name",  err: "err-addr-name",  msg: "Full name is required",              validate: v => v.length >= 3 },
    { id: "addr-phone", err: "err-addr-phone", msg: "Valid 10-digit phone required",       validate: v => validatePhone(v) },
    { id: "addr-flat",  err: "err-addr-flat",  msg: "Address is required",                validate: v => v.length >= 5 },
    { id: "addr-city",  err: "err-addr-city",  msg: "City is required",                   validate: v => v.length >= 2 },
    { id: "addr-pin",   err: "err-addr-pin",   msg: "Valid 6-digit PIN code required",     validate: v => validatePIN(v) },
  ];

  let valid = true;
  fields.forEach(f => {
    const el  = document.getElementById(f.id);
    const err = document.getElementById(f.err);
    el.classList.remove("error");
    err.classList.remove("show");
    if (!f.validate(el.value.trim())) {
      el.classList.add("error");
      err.textContent = f.msg;
      err.classList.add("show");
      valid = false;
    }
  });

  if (!valid) { showToast("Please fill all address details correctly", "error"); return; }

  const payment = document.querySelector('input[name="payment"]:checked')?.value || "cod";

  const order = {
    id: "FB-" + Date.now(),
    items: [...STATE.cart],
    total,
    payment,
    address: {
      name:  document.getElementById("addr-name").value,
      phone: document.getElementById("addr-phone").value,
      flat:  document.getElementById("addr-flat").value,
      city:  document.getElementById("addr-city").value,
      pin:   document.getElementById("addr-pin").value,
      type:  document.getElementById("addr-type").value,
    },
    status: "confirmed",
    placedAt: new Date().toISOString(),
  };

  const orders = JSON.parse(localStorage.getItem("fb_orders") || "[]");
  orders.unshift(order);

  // BUG FIX: Write both keys before clearing cart & redirecting
  localStorage.setItem("fb_orders", JSON.stringify(orders));
  localStorage.setItem("fb_last_order", JSON.stringify(order));
  STATE.lastOrder = order;

  // Clear cart AFTER saving order
  STATE.cart = [];
  saveCart();
  updateCartBadge();

  showToast("Order placed! Redirecting...", "success");
  setTimeout(() => window.location.href = "checkout.html", 900);
}

// ---- Order Success Page ----
function renderOrderSuccess() {
  // BUG FIX: Read from localStorage as fallback if STATE.lastOrder is null
  const order = STATE.lastOrder || JSON.parse(localStorage.getItem("fb_last_order") || "null");
  if (!order) { window.location.href = "../index.html"; return; }

  const now     = new Date();
  const eta     = new Date(now.getTime() + 30 * 60000);
  const fmtTime = d => d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  document.getElementById("order-id-display").textContent    = order.id;
  document.getElementById("order-total-display").textContent = `₹${order.total}`;
  document.getElementById("delivery-eta").textContent        = fmtTime(eta);
  document.getElementById("addr-display").innerHTML = `
    <strong>${order.address.name}</strong><br>
    ${order.address.flat},<br>
    ${order.address.city} — ${order.address.pin}<br>
    📞 ${order.address.phone}`;
  document.getElementById("items-display").innerHTML = order.items.map(i => `
    <div style="display:flex;justify-content:space-between;font-size:13px;padding:5px 0;border-bottom:1px solid var(--border)">
      <span>${i.name} × ${i.qty}</span>
      <span style="color:var(--orange);font-weight:700">₹${i.price * i.qty}</span>
    </div>`).join("");
}
