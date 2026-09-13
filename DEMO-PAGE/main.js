/* ----------------------------- Utilidades UI ----------------------------- */

function productCardHTML(product) {
  return `
    <a class="card" href="producto.html?id=${product.id}">
      <div class="card-media">${renderProductMedia(product)}</div>
      <div class="card-body">
        <p class="card-eyebrow">${FAMILY_LABELS[product.family]} · ${
    product.size
  }</p>
        <h3 class="card-title">${product.name}</h3>
        <p class="card-price">${formatPrice(product.price)}</p>
      </div>
    </a>`;
}

function renderGrid(containerId, products) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (products.length === 0) {
    el.innerHTML = `<p class="empty-note">No hay productos con ese filtro por ahora.</p>`;
    return;
  }
  el.innerHTML = products.map(productCardHTML).join("");
}

/* --------------------------------- Header -------------------------------- */

function initNav() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-nav-menu]");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }
}

/* ------------------------------- Home page -------------------------------- */

function initHomePage() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 4);
  renderGrid("featured-grid", featured);
}

/* ------------------------------ Catalog page ------------------------------ */

function initCatalogPage() {
  const params = new URLSearchParams(window.location.search);
  const state = {
    gender: params.get("genero") || "todos",
    family: params.get("familia") || "todas",
  };

  function apply() {
    let list = PRODUCTS;
    if (state.gender === "unisex") {
      list = list.filter((p) => p.gender === "unisex");
    } else if (state.gender !== "todos") {
      list = list.filter((p) => p.gender === state.gender || p.gender === "unisex");
    }
    if (state.family !== "todas") {
      list = list.filter((p) => p.family === state.family);
    }
    renderGrid("catalog-grid", list);
    document
      .querySelectorAll("[data-filter-gender]")
      .forEach((btn) =>
        btn.classList.toggle(
          "is-active",
          btn.dataset.filterGender === state.gender
        )
      );
    document
      .querySelectorAll("[data-filter-family]")
      .forEach((btn) =>
        btn.classList.toggle(
          "is-active",
          btn.dataset.filterFamily === state.family
        )
      );
  }

  document.querySelectorAll("[data-filter-gender]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.gender = btn.dataset.filterGender;
      apply();
    });
  });
  document.querySelectorAll("[data-filter-family]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.family = btn.dataset.filterFamily;
      apply();
    });
  });

  apply();
}

/* ----------------------------- Product detail ------------------------------ */

function initProductPage() {
  const params = new URLSearchParams(window.location.search);
  const product = PRODUCTS.find((p) => p.id === params.get("id"));
  const container = document.getElementById("product-detail");
  if (!product || !container) {
    if (container)
      container.innerHTML = `<p>No encontramos ese producto. <a href="catalogo.html">Volver al catálogo</a></p>`;
    return;
  }

  document.title = `${product.name} — ${BRAND_CONFIG.brandName}`;

  container.innerHTML = `
    <div class="product-media">${renderProductMedia(product)}</div>
    <div class="product-info">
      <p class="card-eyebrow">${FAMILY_LABELS[product.family]} · ${
    product.gender === "hombre" ? "Para él" : product.gender === "mujer" ? "Para ella" : "Unisex"
  }</p>
      <h1>${product.name}</h1>
      <p class="product-price">${formatPrice(product.price)} · ${product.size}</p>
      <p class="product-desc">${product.description}</p>
      <div class="notes-table">
        <div><span>Salida</span><p>${product.notes.salida}</p></div>
        <div><span>Corazón</span><p>${product.notes.corazon}</p></div>
        <div><span>Fondo</span><p>${product.notes.fondo}</p></div>
      </div>
      <div class="qty-row">
        <label for="qty">Cantidad</label>
        <div class="qty-control">
          <button type="button" data-qty-minus aria-label="Restar">–</button>
          <input type="number" id="qty" value="1" min="1" max="10">
          <button type="button" data-qty-plus aria-label="Sumar">+</button>
        </div>
      </div>
      <button class="btn btn-primary btn-full" data-add-to-cart>Agregar al carrito</button>
      <p class="add-confirm" data-add-confirm hidden>Se agregó a tu carrito.</p>
    </div>
  `;

  const qtyInput = container.querySelector("#qty");
  container.querySelector("[data-qty-minus]").addEventListener("click", () => {
    qtyInput.value = Math.max(1, parseInt(qtyInput.value || "1", 10) - 1);
  });
  container.querySelector("[data-qty-plus]").addEventListener("click", () => {
    qtyInput.value = Math.min(10, parseInt(qtyInput.value || "1", 10) + 1);
  });
  container.querySelector("[data-add-to-cart]").addEventListener("click", () => {
    Cart.add(product.id, parseInt(qtyInput.value || "1", 10));
    const confirm = container.querySelector("[data-add-confirm]");
    confirm.hidden = false;
    setTimeout(() => (confirm.hidden = true), 2500);
  });

  // Sugeridos: misma familia, distinto producto
  const suggested = PRODUCTS.filter(
    (p) => p.family === product.family && p.id !== product.id
  ).slice(0, 3);
  renderGrid("suggested-grid", suggested);
}

/* --------------------------------- Cart page -------------------------------- */

function cartRowHTML(item) {
  return `
    <div class="cart-row" data-cart-row="${item.id}">
      <div class="cart-row-media">${renderProductMedia(item)}</div>
      <div class="cart-row-info">
        <p class="cart-row-name">${item.name}</p>
        <p class="cart-row-size">${item.size}</p>
        <button class="link-btn" data-remove="${item.id}">Quitar</button>
      </div>
      <div class="qty-control qty-control--small">
        <button type="button" data-row-minus="${item.id}" aria-label="Restar">–</button>
        <span>${item.qty}</span>
        <button type="button" data-row-plus="${item.id}" aria-label="Sumar">+</button>
      </div>
      <p class="cart-row-price">${formatPrice(item.price * item.qty)}</p>
    </div>`;
}

function initCartPage() {
  const listEl = document.getElementById("cart-list");
  const emptyEl = document.getElementById("cart-empty");
  const summaryEl = document.getElementById("cart-summary");

  function render() {
    const items = Cart.detailedItems();
    if (items.length === 0) {
      listEl.innerHTML = "";
      emptyEl.hidden = false;
      summaryEl.hidden = true;
      return;
    }
    emptyEl.hidden = true;
    summaryEl.hidden = false;
    listEl.innerHTML = items.map(cartRowHTML).join("");

    listEl.querySelectorAll("[data-remove]").forEach((btn) =>
      btn.addEventListener("click", () => {
        Cart.remove(btn.dataset.remove);
        render();
      })
    );
    listEl.querySelectorAll("[data-row-minus]").forEach((btn) =>
      btn.addEventListener("click", () => {
        const item = items.find((i) => i.id === btn.dataset.rowMinus);
        Cart.updateQty(item.id, item.qty - 1);
        render();
      })
    );
    listEl.querySelectorAll("[data-row-plus]").forEach((btn) =>
      btn.addEventListener("click", () => {
        const item = items.find((i) => i.id === btn.dataset.rowPlus);
        Cart.updateQty(item.id, item.qty + 1);
        render();
      })
    );

    document.getElementById("cart-subtotal").textContent = formatPrice(
      Cart.subtotal()
    );
    const shipping = Cart.shippingCost();
    document.getElementById("cart-shipping").textContent =
      shipping === 0 ? "Gratis" : formatPrice(shipping);
    document.getElementById("cart-total").textContent = formatPrice(Cart.total());
  }

  render();
}

/* ------------------------------- Checkout page ------------------------------ */

function initCheckoutPage() {
  const items = Cart.detailedItems();
  const summaryEl = document.getElementById("checkout-summary");
  const form = document.getElementById("checkout-form");
  const emptyNotice = document.getElementById("checkout-empty");

  if (items.length === 0) {
    if (form) form.hidden = true;
    if (summaryEl) summaryEl.hidden = true;
    if (emptyNotice) emptyNotice.hidden = false;
    return;
  }

  if (summaryEl) {
    summaryEl.innerHTML = `
      ${items
        .map(
          (i) =>
            `<div class="checkout-line"><span>${i.qty} x ${i.name}</span><span>${formatPrice(
              i.price * i.qty
            )}</span></div>`
        )
        .join("")}
      <div class="checkout-line"><span>Envío</span><span>${
        Cart.shippingCost() === 0 ? "Gratis" : formatPrice(Cart.shippingCost())
      }</span></div>
      <div class="checkout-line checkout-total"><span>Total</span><span>${formatPrice(
        Cart.total()
      )}</span></div>
    `;
  }

  // Mostrar/ocultar datos bancarios según método de pago elegido
  const radios = document.querySelectorAll('input[name="metodoPago"]');
  const bankBox = document.getElementById("bank-details");
  function syncBankBox() {
    const selected = document.querySelector('input[name="metodoPago"]:checked');
    bankBox.hidden = !selected || selected.value !== "transferencia";
  }
  radios.forEach((r) => r.addEventListener("change", syncBankBox));
  syncBankBox();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    sendOrderToWhatsApp(data);
    Cart.clear();
    window.location.href = "gracias.html";
  });
}

document.addEventListener("DOMContentLoaded", initNav);
