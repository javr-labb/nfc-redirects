/**
 * CATÁLOGO DE PRODUCTOS
 * ------------------------------------------------------------
 * Estos son productos DE EJEMPLO para que la tienda se vea completa
 * mientras se cargan los productos reales de YAN Fragance.
 *
 * Para reemplazarlos:
 *  1. Copia una foto del perfume a /assets/img/products/ (cuadrada, 1000x1000px ideal)
 *  2. Cambia el campo "image" al nombre de ese archivo, ej: "mi-perfume.jpg"
 *  3. Si no tienes foto todavía, deja "image": "" y se mostrará un frasco
 *     ilustrado con el color de su familia olfativa.
 *
 * "family" controla el color del frasco ilustrado y el filtro de la tienda.
 * Usa uno de: floral | amaderada | citrica | amber | gourmand
 */

const PRODUCTS = [
  {
    id: "yan-01",
    slug: "noir-de-cedro",
    name: "Noir de Cedro",
    gender: "hombre",
    family: "amaderada",
    size: "50 ml",
    price: 780,
    notes: {
      salida: "Bergamota, pimienta rosa",
      corazon: "Cedro, salvia",
      fondo: "Vetiver, ámbar gris",
    },
    description:
      "Una madera seca y ahumada que abre con un toque especiado y se asienta en vetiver profundo. Pensado para quien prefiere presencia antes que ruido.",
    image: "",
    featured: true,
  },
  {
    id: "yan-02",
    slug: "flor-nocturna",
    name: "Flor Nocturna",
    gender: "mujer",
    family: "floral",
    size: "50 ml",
    price: 820,
    notes: {
      salida: "Mandarina, casis",
      corazon: "Jazmín, tuberosa",
      fondo: "Almizcle blanco, sándalo",
    },
    description:
      "Blanco floral denso, de los que se notan al entrar a un cuarto. Jazmín y tuberosa sobre una base cremosa de almizcle.",
    image: "",
    featured: true,
  },
  {
    id: "yan-03",
    slug: "sal-y-limon",
    name: "Sal y Limón",
    gender: "unisex",
    family: "citrica",
    size: "50 ml",
    price: 690,
    notes: {
      salida: "Limón siciliano, toronja",
      corazon: "Sal marina, romero",
      fondo: "Almizcle, cedro claro",
    },
    description:
      "Cítrico salino, directo, sin dulzor. La opción para todos los días y climas cálidos.",
    image: "",
    featured: true,
  },
  {
    id: "yan-04",
    slug: "ambar-1979",
    name: "Ámbar 1979",
    gender: "unisex",
    family: "amber",
    size: "50 ml",
    price: 890,
    notes: {
      salida: "Azafrán, canela",
      corazon: "Ládano, rosa turca",
      fondo: "Ámbar, cuero",
    },
    description:
      "Oriental ambarado con carácter de tarde de invierno. Especiado al inicio, cálido y envolvente al final.",
    image: "",
    featured: true,
  },
  {
    id: "yan-05",
    slug: "vainilla-de-tabaco",
    name: "Vainilla de Tabaco",
    gender: "unisex",
    family: "gourmand",
    size: "50 ml",
    price: 850,
    notes: {
      salida: "Ron, ciruela",
      corazon: "Tabaco, cacao",
      fondo: "Vainilla, haba tonka",
    },
    description:
      "Gourmand sin ser dulzón: tabaco y cacao equilibran la vainilla. Ideal para otoño.",
    image: "",
    featured: false,
  },
  {
    id: "yan-06",
    slug: "jardin-blanco",
    name: "Jardín Blanco",
    gender: "mujer",
    family: "floral",
    size: "50 ml",
    price: 780,
    notes: {
      salida: "Pera, neroli",
      corazon: "Flor de azahar, peonía",
      fondo: "Almizcle, madera de haya",
    },
    description: "Floral luminoso y limpio, para uso diario en la oficina o el día a día.",
    image: "",
    featured: false,
  },
  {
    id: "yan-07",
    slug: "roble-atlantico",
    name: "Roble Atlántico",
    gender: "hombre",
    family: "amaderada",
    size: "50 ml",
    price: 760,
    notes: {
      salida: "Toronja, hojas verdes",
      corazon: "Roble, geranio",
      fondo: "Musgo de roble, almizcle",
    },
    description: "Amaderado verde con salida fresca. Versátil, de oficina a fin de semana.",
    image: "",
    featured: false,
  },
  {
    id: "yan-08",
    slug: "cactus-y-lima",
    name: "Cactus y Lima",
    gender: "unisex",
    family: "citrica",
    size: "50 ml",
    price: 650,
    notes: {
      salida: "Lima, pepino",
      corazon: "Higuera, pimienta verde",
      fondo: "Almizcle blanco",
    },
    description: "Verde y jugoso, poca duración pero muy fácil de llevar en climas calurosos.",
    image: "",
    featured: false,
  },
  {
    id: "yan-09",
    slug: "caramelo-negro",
    name: "Caramelo Negro",
    gender: "mujer",
    family: "gourmand",
    size: "50 ml",
    price: 830,
    notes: {
      salida: "Almendra, azúcar morena",
      corazon: "Café, orquídea",
      fondo: "Vainilla, benjuí",
    },
    description: "Gourmand oscuro, tipo postre de noche. Notable y duradero, para eventos.",
    image: "",
    featured: true,
  },
];

// Familias olfativas → color de acento para frascos ilustrados (ver css/styles.css)
const FAMILY_COLORS = {
  floral: "#8a4a6b",
  amaderada: "#4a5a3a",
  citrica: "#a3862b",
  amber: "#8a5a2b",
  gourmand: "#5a3a2b",
};

const FAMILY_LABELS = {
  floral: "Floral",
  amaderada: "Amaderada",
  citrica: "Cítrica",
  amber: "Ambarada",
  gourmand: "Gourmand",
};
