/**
 * Genera un frasco ilustrado en SVG cuando un producto no tiene foto todavía.
 * Esto es temporal: en cuanto subas fotos reales a /assets/img/products/
 * y las asignes en products-data.js, esta ilustración deja de usarse.
 */
function bottleArtSVG(hexColor) {
  return `
  <svg viewBox="0 0 240 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Frasco ilustrado">
    <defs>
      <linearGradient id="glass-${hexColor.replace('#', '')}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${hexColor}" stop-opacity="0.85"/>
        <stop offset="100%" stop-color="${hexColor}" stop-opacity="0.55"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="240" height="300" fill="none"/>
    <rect x="100" y="30" width="40" height="26" rx="3" fill="#171310"/>
    <rect x="112" y="16" width="16" height="18" rx="2" fill="#171310"/>
    <path d="M78 60 L162 60 L172 260 Q172 276 156 276 L84 276 Q68 276 68 260 Z"
          fill="url(#glass-${hexColor.replace('#', '')})" stroke="#171310" stroke-width="2"/>
    <rect x="86" y="150" width="68" height="46" fill="#F1EADF" opacity="0.9" stroke="#171310" stroke-width="1.2"/>
    <line x1="96" y1="164" x2="144" y2="164" stroke="#171310" stroke-width="1"/>
    <line x1="96" y1="174" x2="134" y2="174" stroke="#171310" stroke-width="1"/>
    <line x1="96" y1="184" x2="120" y2="184" stroke="#171310" stroke-width="1"/>
  </svg>`;
}

/** Inserta la ilustración o la foto real de un producto dentro de un contenedor */
function renderProductMedia(product) {
  if (product.image) {
    return `<img src="assets/img/products/${product.image}" alt="${product.name}" loading="lazy">`;
  }
  const color = FAMILY_COLORS[product.family] || "#4a5a3a";
  return `<div class="bottle-art" style="--bottle-tint:${color}">${bottleArtSVG(color)}</div>`;
}
