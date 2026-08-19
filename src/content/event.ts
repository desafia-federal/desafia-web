export const benefitDinner = {
  title: "Primera cena a beneficio de DESAFÍA Federal",
  tagline: "El puntapié inicial de la asociación",
  date: "2026-08-27",
  dateLabel: "Jueves 27 de agosto de 2026",
  time: "21:00",
  timeLabel: "21:00 h",
  venue: "IT Italy",
  venueDetail: "Sucursal de la ciudad de Córdoba",
  city: "Córdoba, Argentina",
  menu: "Menú fijo de tres pasos",
  price: 150000,
  currency: "ARS",
  purpose:
    "Los fondos se destinan a constituir la asociación civil en Córdoba y a convocar a la junta de fundadores e integrantes iniciales.",
} as const;

export const priceLabel = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: benefitDinner.currency,
  maximumFractionDigits: 0,
}).format(benefitDinner.price);
