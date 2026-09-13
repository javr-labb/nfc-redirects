/**
 * CONFIGURACIÓN DE LA TIENDA — YAN FRAGANCE
 * ------------------------------------------------------------
 * Edita únicamente este archivo para actualizar los datos del
 * negocio (WhatsApp, banco, redes sociales, envíos). No necesitas
 * tocar el resto del código para estos cambios.
 * ------------------------------------------------------------
 */

const BRAND_CONFIG = {
  // Nombre público de la marca
  brandName: "YAN Fragance",

  // Número de WhatsApp donde llegarán los pedidos.
  // Formato: código de país (52 para México) + número a 10 dígitos, sin espacios ni signos.
  whatsappNumber: "525535123355",

  // Redes sociales (se muestran en el pie de página)
  social: {
    instagram: "https://www.instagram.com/yan_fragance/",
    tiktok: "",
    facebook: "",
  },

  // Datos bancarios para pagos por transferencia.
  // EDITA ESTOS DATOS con la cuenta real del cliente antes de publicar la tienda.
  bankTransfer: {
    enabled: true,
    bankName: "PENDIENTE — Nombre del banco",
    accountHolder: "PENDIENTE — Nombre del titular",
    clabe: "PENDIENTE — 18 dígitos CLABE",
    accountNumber: "PENDIENTE — Número de cuenta (opcional)",
    concept: "Escribe tu nombre como concepto de pago",
  },

  // Pago con tarjeta — desactivado hasta conectar una pasarela (ver README).
  cardPayment: {
    enabled: false,
    provider: "", // "mercadopago" | "stripe" | "conekta"
    checkoutUrl: "", // liga de pago, cuando exista
  },

  // Envíos
  shipping: {
    freeShippingMinimum: 899, // MXN — pedidos iguales o mayores no pagan envío
    flatRate: 99, // MXN — costo de envío estándar
    processingNote:
      "Los envíos se generan de 1 a 2 días hábiles después de confirmar tu pago.",
  },

  currency: "MXN",
  currencySymbol: "$",
};
