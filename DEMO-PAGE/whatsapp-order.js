/**
 * Arma el mensaje de WhatsApp con todo lo necesario para generar el envío:
 * productos, cantidades, total, y los datos de contacto/dirección del cliente.
 */
function buildWhatsAppMessage(formData) {
  const items = Cart.detailedItems();
  const subtotal = Cart.subtotal();
  const shipping = Cart.shippingCost();
  const total = Cart.total();

  const lines = [];
  lines.push(`¡Hola! Quiero hacer un pedido en ${BRAND_CONFIG.brandName} 🛍️`);
  lines.push("");
  lines.push("*Productos:*");
  items.forEach((item) => {
    lines.push(
      `• ${item.qty} x ${item.name} (${item.size}) — ${formatPrice(
        item.price * item.qty
      )}`
    );
  });
  lines.push("");
  lines.push(`Subtotal: ${formatPrice(subtotal)}`);
  lines.push(
    shipping === 0 ? "Envío: Gratis" : `Envío: ${formatPrice(shipping)}`
  );
  lines.push(`*Total: ${formatPrice(total)}*`);
  lines.push("");
  lines.push("*Datos para el envío:*");
  lines.push(`Nombre: ${formData.nombre}`);
  lines.push(`Teléfono: ${formData.telefono}`);
  lines.push(
    `Dirección: ${formData.calle}, ${formData.colonia}, ${formData.ciudad}, ${formData.estado}, CP ${formData.cp}`
  );
  if (formData.referencias) {
    lines.push(`Referencias: ${formData.referencias}`);
  }
  lines.push("");
  lines.push(
    `Método de pago: ${
      formData.metodoPago === "transferencia"
        ? "Transferencia bancaria"
        : "Tarjeta"
    }`
  );
  if (formData.metodoPago === "transferencia") {
    lines.push("(Enviaré mi comprobante de pago en este chat)");
  }
  if (formData.notas) {
    lines.push("");
    lines.push(`Notas adicionales: ${formData.notas}`);
  }

  return lines.join("\n");
}

function sendOrderToWhatsApp(formData) {
  const message = buildWhatsAppMessage(formData);
  const url = `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
  window.open(url, "_blank");
}
