let cart = [];
let currency = "INR";
let days = 1;

const cartList = document.getElementById("cartItems");
const totalEl = document.getElementById("total");
const cartData = document.getElementById("cartData");
const daysCount = document.getElementById("daysCount");

/* ================= DATE CALCULATION ================= */
startDate.onchange = endDate.onchange = () => {
  const s = new Date(startDate.value);
  const e = new Date(endDate.value);
  if (s && e && e >= s) {
    days = Math.ceil((e - s) / (1000 * 60 * 60 * 24)) || 1;
    daysCount.textContent = days;
    renderCart();
  }
};

/* ================= CURRENCY ================= */
inrBtn.onclick = () => switchCurrency("INR");
usdBtn.onclick = () => switchCurrency("USD");

function switchCurrency(c) {
  currency = c;
  inrBtn.classList.toggle("active", c === "INR");
  usdBtn.classList.toggle("active", c === "USD");
  renderCart();
}

/* ================= PRODUCTS ================= */
document.querySelectorAll(".product").forEach(p => {
  let qty = 1;

  const minus = p.querySelector(".minus");
  const plus = p.querySelector(".plus");
  const span = p.querySelector(".qty span");
  const addBtn = p.querySelector(".add");

  minus.onclick = () => {
    if (qty > 1) qty--;
    span.textContent = qty;
  };

  plus.onclick = () => {
    qty++;
    span.textContent = qty;
  };

  /* ✅ SMART ADD TO CART */
  addBtn.onclick = () => {
    const existing = cart.find(i => i.name === p.dataset.name);

    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        name: p.dataset.name,
        inr: Number(p.dataset.priceInr),
        usd: Number(p.dataset.priceUsd),
        qty
      });
    }

    qty = 1;
    span.textContent = qty;
    renderCart();
  };
});

/* ================= CART ================= */
function renderCart() {
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const price = currency === "INR" ? item.inr : item.usd;
    const itemTotal = price * item.qty * days;
    total += itemTotal;

    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";
    li.style.gap = "10px";

    li.innerHTML = `
      <span>${item.name} × ${item.qty} × ${days} day(s)</span>
      <button class="remove-btn" data-index="${index}">✕</button>
    `;

    cartList.appendChild(li);
  });

  totalEl.textContent =
    (currency === "INR" ? "₹" : "$") + total.toFixed(2);

  cartData.value = JSON.stringify({
    currency,
    days,
    items: cart,
    total
  });

  /* ✅ REMOVE BUTTON */
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.onclick = () => {
      const index = btn.dataset.index;
      cart.splice(index, 1);
      renderCart();
    };
  });
}
