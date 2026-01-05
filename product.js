/* ================= CONFIG ================= */
const USD_RATE = 0.012;
let currency = "INR";

/* ================= PRODUCTS ================= */
const products = [
  { id: 1, title: "Sleeping Bag (Down)", desc: "-5°C to -20°C", price: 150, unit: "day", category: "sleeping", image: "https://images.unsplash.com/photo-1601933470928-c7c0b64c7e6a" },
  { id: 2, title: "Sleeping Bag (Down)", desc: "-30°C to -40°C", price: 200, unit: "day", category: "sleeping", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" },
  { id: 3, title: "Down Jacket (Standard)", desc: "Cold protection jacket", price: 150, unit: "day", category: "clothing", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba" },
  { id: 4, title: "Tent", desc: "3+ days usage", price: 500, unit: "day", category: "camping", image: "https://images.unsplash.com/photo-1504280390368-3971f0e7f87b" },
  { id: 5, title: "Trekking Shoes (Normal)", desc: "Daily trekking shoes", price: 200, unit: "day", category: "footwear", image: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6" },
  { id: 6, title: "Scarpa / La Sportiva", desc: "Premium mountaineering shoes", price: 4000, unit: "trip", category: "footwear", image: "https://images.unsplash.com/photo-1611095973515-7f6a76e2cfe3" },
  { id: 7, title: "Backpack 50–60L", desc: "High altitude backpack", price: 250, unit: "day", category: "backpack", image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429" },
  { id: 8, title: "Trekking Pole", desc: "10–12 days trip", price: 500, unit: "trip", category: "accessories", image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887" },
  { id: 9, title: "Climbing Shoes", desc: "Whole trip (10–12 days)", price: 10000, unit: "trip", category: "climbing", image: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6" }
];

/* ================= STATE ================= */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ================= ELEMENTS ================= */
const grid = document.getElementById("productGrid");
const cartDrawer = document.querySelector(".cart-drawer");
const cartToggle = document.querySelector(".cart-toggle");
const closeCartBtn = document.querySelector(".close-cart");
const overlay = document.querySelector(".overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.querySelector(".cart-count");
const whatsappBtn = document.getElementById("whatsappBtn");
const checkoutBtn = document.querySelector(".checkout-btn");
const enquiryModal = document.querySelector(".enquiry-modal");
const closeEnquiryBtn = document.querySelector(".close-enquiry");
const cartDetailsInput = document.getElementById("cartDetails");

/* ================= UTIL ================= */
const formatPrice = v =>
  currency === "INR" ? `₹${v}` : `$${(v * USD_RATE).toFixed(2)}`;

/* ================= RENDER PRODUCTS ================= */
function renderProducts(list) {
  grid.innerHTML = "";
  list.forEach(p => {
    grid.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.title}">
        <div class="info">
          <h4>${p.title}</h4>
          <p>${p.desc}</p>
          <strong>${formatPrice(p.price)} / ${p.unit}</strong>

          ${p.unit === "day"
            ? `<select class="day-select">
                ${[1,2,3,5,7,10,14].map(d => `<option value="${d}">${d} days</option>`).join("")}
              </select>`
            : ""}

          <button data-id="${p.id}">Add to Cart</button>
        </div>
      </div>
    `;
  });
}

/* ================= CART LOGIC ================= */
function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  cartItems.innerHTML = "";

  let total = 0;
  let waText = "Trekking Gear Enquiry:%0A";

  cart.forEach(i => {
    const days = i.days || 1;
    total += i.price * i.qty * days;
    waText += `• ${i.title} (${days} ${i.unit}) x${i.qty}%0A`;

    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${i.title}</span>
        <button onclick="removeItem(${i.id})">✕</button>
      </div>
    `;
  });

  cartTotal.textContent = formatPrice(total);
  cartCount.textContent = cart.reduce((a,b) => a + b.qty, 0);
  whatsappBtn.href = `https://wa.me/9779742381257?text=${waText}`;
}

function addToCart(id, days = 1) {
  const p = products.find(x => x.id === id);
  const existing = cart.find(i => i.id === id && i.days === days);

  if (existing) existing.qty++;
  else cart.push({ ...p, qty: 1, days });

  updateCart();
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  updateCart();
}

/* ================= EVENTS ================= */
grid.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    const card = e.target.closest(".product-card");
    const days = card.querySelector(".day-select")?.value || 1;
    addToCart(+e.target.dataset.id, +days);
  }
});

/* Cart open / close */
cartToggle.addEventListener("click", () => {
  cartDrawer.classList.add("active");
  overlay.classList.add("active");
});

function closeAll() {
  cartDrawer.classList.remove("active");
  overlay.classList.remove("active");
  enquiryModal.classList.remove("active");
}

closeCartBtn.addEventListener("click", closeAll);
overlay.addEventListener("click", closeAll);
closeEnquiryBtn.addEventListener("click", closeAll);

/* Enquiry (Formspree) */
checkoutBtn.addEventListener("click", () => {
  if (!cart.length) {
    alert("Your cart is empty");
    return;
  }

  const message = cart.map(i =>
    `${i.title} - ${i.days || 1} ${i.unit} × ${i.qty} (₹${i.price})`
  ).join("\n");

  cartDetailsInput.value = message;
  enquiryModal.classList.add("active");
});

/* Filters */
document.getElementById("currencyToggle").onclick = () => {
  currency = currency === "INR" ? "USD" : "INR";
  document.getElementById("currencyToggle").textContent =
    currency === "INR" ? "₹ INR" : "$ USD";
  renderProducts(products);
  updateCart();
};

document.getElementById("searchInput").oninput = e => {
  const q = e.target.value.toLowerCase();
  renderProducts(products.filter(p => p.title.toLowerCase().includes(q)));
};

document.getElementById("categoryFilter").onchange = e => {
  const v = e.target.value;
  renderProducts(v === "all" ? products : products.filter(p => p.category === v));
};

/* ================= INIT ================= */
(function init() {
  const cats = ["all", ...new Set(products.map(p => p.category))];
  document.getElementById("categoryFilter").innerHTML =
    cats.map(c => `<option value="${c}">${c}</option>`).join("");

  renderProducts(products);
  updateCart();
})();
