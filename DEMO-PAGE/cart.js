/**
 * CARRITO DE COMPRAS
 * Se guarda en localStorage del navegador del cliente (no requiere backend).
 */
const Cart = {
  KEY: "yan_cart_v1",

  get() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY)) || [];
    } catch (e) {
      return [];
    }
  },

  save(items) {
    localStorage.setItem(this.KEY, JSON.stringify(items));
    this.updateBadge();
  },

  add(productId, qty = 1) {
    const items = this.get();
    const existing = items.find((i) => i.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({ id: productId, qty });
    }
    this.save(items);
  },

  updateQty(productId, qty) {
    let items = this.get();
    if (qty <= 0) {
      items = items.filter((i) => i.id !== productId);
    } else {
      const existing = items.find((i) => i.id === productId);
      if (existing) existing.qty = qty;
    }
    this.save(items);
  },

  remove(productId) {
    const items = this.get().filter((i) => i.id !== productId);
    this.save(items);
  },

  clear() {
    this.save([]);
  },

  count() {
    return this.get().reduce((sum, i) => sum + i.qty, 0);
  },

  /** Devuelve los items del carrito ya combinados con su info de producto */
  detailedItems() {
    const items = this.get();
    return items
      .map((i) => {
        const product = PRODUCTS.find((p) => p.id === i.id);
        if (!product) return null;
        return { ...product, qty: i.qty };
      })
      .filter(Boolean);
  },

  subtotal() {
    return this.detailedItems().reduce((sum, i) => sum + i.price * i.qty, 0);
  },

  shippingCost() {
    const sub = this.subtotal();
    if (sub === 0) return 0;
    return sub >= BRAND_CONFIG.shipping.freeShippingMinimum
      ? 0
      : BRAND_CONFIG.shipping.flatRate;
  },

  total() {
    return this.subtotal() + this.shippingCost();
  },

  updateBadge() {
    document.querySelectorAll("[data-cart-count]").forEach((el) => {
      const n = this.count();
      el.textContent = n;
      el.style.display = n > 0 ? "inline-flex" : "none";
    });
  },
};

document.addEventListener("DOMContentLoaded", () => Cart.updateBadge());

function formatPrice(n) {
  return (
    BRAND_CONFIG.currencySymbol +
    n.toLocaleString("es-MX", { minimumFractionDigits: 0 })
  );
}
