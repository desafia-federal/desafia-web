export const benefitDinner = {
  title: "Primera cena a beneficio de DESAFÍA Federal",
  tagline: "El puntapié inicial de la asociación",
  date: "2026-08-27",
  dateLabel: "Jueves 27 de agosto de 2026",
  time: "21:00",
  timeLabel: "21:00 h",
  venue: "Bodegón Don Núñez",
  venueDetail: "Rafael Núñez 5568 — Córdoba",
  address: "Rafael Núñez 5568, Córdoba",
  instagramUrl: "https://www.instagram.com/bodegondonnunez",
  instagramLabel: "@bodegondonnunez",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Bodeg%C3%B3n+Don+N%C3%BA%C3%B1ez+Rafael+N%C3%BA%C3%B1ez+5568+C%C3%B3rdoba",
  venueImage: "/images/bodegon-don-nunez.png",
  venueImageAlt: "Frente del Bodegón Don Núñez iluminado de noche.",
  city: "Córdoba, Argentina",
  menu: "Menú de tres pasos",
  menuSections: [
    {
      title: "Entrada",
      items: [
        "Empanada de carne cortada a cuchillo",
        "Bruschetta clásica",
      ],
    },
    {
      title: "Plato principal",
      items: [
        "Pechuga Cordon Blue: pechuga rellena con jamón y queso, grillada, con salsa de hongos y puerro",
        "Guarnición: papas cuña con crema",
      ],
    },
    {
      title: "Postre",
      items: ["Bombón helado con baño de salsa de chocolate"],
    },
  ],
  price: 150000,
  minPrice: 1000,
  currency: "ARS",
  purpose:
    "Los fondos se destinan a constituir la asociación civil en Córdoba y a convocar a la junta de fundadores e integrantes iniciales.",
} as const;

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: benefitDinner.currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export const priceLabel = formatPrice(benefitDinner.price);
export const minPriceLabel = formatPrice(benefitDinner.minPrice);

export const suggestedAmounts = [benefitDinner.minPrice, 50000, 100000, benefitDinner.price] as const;
