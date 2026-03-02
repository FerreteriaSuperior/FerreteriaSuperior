// Central product catalog used by catalog and product detail pages
// Products are based on images in img/IMG_PRODUCT.

const WHATSAPP_NUMBER = "62428239"; // Replace with your WhatsApp number (country code + number, no + or spaces)

const products = [
  {
    id: "bloque",
    name: "BLOQUE",
    category: "BLOQUE",
    shortDescription: "Consulta disponibilidad y entrega por WhatsApp.",
    description:
      "BLOQUE. Para cotización, existencia y especificaciones, consulta por WhatsApp.",
    price: "Consultar",
    specs: ["Disponibilidad: consultar", "Entrega: consultar", "Uso: construcción"],
    image: "img/IMG_PRODUCT/BLOQUE.jpg",
  },
  {
    id: "carriola",
    name: "CARRIOLA",
    category: "ACERO",
    shortDescription: "Consulta disponibilidad y entrega por WhatsApp.",
    description:
      "CARRIOLA. Para cotización, existencia y especificaciones, consulta por WhatsApp.",
    price: "Consultar",
    specs: ["Disponibilidad: consultar", "Entrega: consultar", "Uso: construcción"],
    image: "img/IMG_PRODUCT/CARRIOLA.jpeg",
  },
  {
    id: "cemento-argo",
    name: "CEMENTO ARGO",
    category: "CEMENTOS",
    shortDescription: "Consulta disponibilidad y entrega por WhatsApp.",
    description:
      "CEMENTO ARGO. Para cotización, existencia y especificaciones, consulta por WhatsApp.",
    price: "Consultar",
    specs: ["Disponibilidad: consultar", "Entrega: consultar", "Uso: construcción"],
    image: "img/IMG_PRODUCT/CEMENTO_ARGO.webp",
  },
  {
    id: "malla-espandida",
    name: "MALLA ESPANDIDA",
    category: "ACERO",
    shortDescription: "Consulta disponibilidad y entrega por WhatsApp.",
    description:
      "MALLA ESPANDIDA. Para cotización, existencia y especificaciones, consulta por WhatsApp.",
    price: "Consultar",
    specs: ["Disponibilidad: consultar", "Entrega: consultar", "Uso: construcción"],
    image: "img/IMG_PRODUCT/MALLA_ESPANDIDA.jpeg",
  },
  {
    id: "saco-de-arena",
    name: "SACO DE ARENA",
    category: "SACOS",
    shortDescription: "Consulta disponibilidad y entrega por WhatsApp.",
    description:
      "SACO DE ARENA. Para cotización, existencia y especificaciones, consulta por WhatsApp.",
    price: "Consultar",
    specs: ["Disponibilidad: consultar", "Entrega: consultar", "Uso: construcción"],
    image: "img/IMG_PRODUCT/SACO_DE_ARENA.jpg",
  },
  {
    id: "saco-de-capabase",
    name: "SACO DE CAPABASE",
    category: "SACOS",
    shortDescription: "Consulta disponibilidad y entrega por WhatsApp.",
    description:
      "SACO DE CAPABASE. Para cotización, existencia y especificaciones, consulta por WhatsApp.",
    price: "Consultar",
    specs: ["Disponibilidad: consultar", "Entrega: consultar", "Uso: construcción"],
    image: "img/IMG_PRODUCT/SACO_DE_CAPABASE.png",
  },
  {
    id: "saco-de-piedra",
    name: "SACO DE PIEDRA",
    category: "SACOS",
    shortDescription: "Consulta disponibilidad y entrega por WhatsApp.",
    description:
      "SACO DE PIEDRA. Para cotización, existencia y especificaciones, consulta por WhatsApp.",
    price: "Consultar",
    specs: ["Disponibilidad: consultar", "Entrega: consultar", "Uso: construcción"],
    image: "img/IMG_PRODUCT/SACO_DE_PIEDRA.jpeg",
  },
  {
    id: "tubo-metal",
    name: "TUBO METAL",
    category: "TUBERIAS",
    shortDescription: "Consulta disponibilidad y entrega por WhatsApp.",
    description:
      "TUBO METAL. Para cotización, existencia y especificaciones, consulta por WhatsApp.",
    price: "Consultar",
    specs: ["Disponibilidad: consultar", "Entrega: consultar", "Uso: construcción"],
    image: "img/IMG_PRODUCT/TUBO_METAL.jpeg",
  },
  {
    id: "tubo-pvc",
    name: "TUBO PVC",
    category: "TUBERIAS",
    shortDescription: "Consulta disponibilidad y entrega por WhatsApp.",
    description:
      "TUBO PVC. Para cotización, existencia y especificaciones, consulta por WhatsApp.",
    price: "Consultar",
    specs: ["Disponibilidad: consultar", "Entrega: consultar", "Uso: construcción"],
    image: "img/IMG_PRODUCT/TUBO_PVC.avif",
  },
  {
    id: "varilla",
    name: "VARILLA",
    category: "ACERO",
    shortDescription: "Consulta disponibilidad y entrega por WhatsApp.",
    description:
      "VARILLA. Para cotización, existencia y especificaciones, consulta por WhatsApp.",
    price: "Consultar",
    specs: ["Disponibilidad: consultar", "Entrega: consultar", "Uso: construcción"],
    image: "img/IMG_PRODUCT/VARILLA.jpeg",
  },
  {
    id: "vigas-h",
    name: "VIGAS H",
    category: "ACERO",
    shortDescription: "Consulta disponibilidad y entrega por WhatsApp.",
    description:
      "VIGAS H. Para cotización, existencia y especificaciones, consulta por WhatsApp.",
    price: "Consultar",
    specs: ["Disponibilidad: consultar", "Entrega: consultar", "Uso: construcción"],
    image: "img/IMG_PRODUCT/VIGAS_H.jpeg",
  },
  {
    id: "zinc-ondulado",
    name: "ZINC ONDULADO",
    category: "ZINC",
    shortDescription: "Consulta disponibilidad y entrega por WhatsApp.",
    description:
      "ZINC ONDULADO. Para cotización, existencia y especificaciones, consulta por WhatsApp.",
    price: "Consultar",
    specs: ["Disponibilidad: consultar", "Entrega: consultar", "Uso: construcción"],
    image: "img/IMG_PRODUCT/ZINC_ONDULADO.jpg",
  },
];

function buildWhatsAppUrl(message) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  const encoded = encodeURIComponent(message);
  return `${base}?text=${encoded}`;
}

// Expose globally
window.FerreteriaSuperiorCatalog = {
  products,
  buildWhatsAppUrl,
  WHATSAPP_NUMBER,
};

