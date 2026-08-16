export const navigation = [
  { href: "/nosotros", label: "Quiénes somos" },
  { href: "/recursos", label: "Recursos" },
  { href: "/historias", label: "Historias" },
  { href: "/transparencia", label: "Transparencia" },
] as const;

export const pillars = [
  {
    number: "01",
    title: "Defender derechos",
    text: "Impulsar políticas y prácticas que reconozcan la comunicación como una condición para ejercer todos los demás derechos.",
    link: "/nosotros#derechos",
  },
  {
    number: "02",
    title: "Transformar servicios",
    text: "Trabajar con instituciones para remover barreras en salud, educación, justicia, trabajo y atención pública.",
    link: "/recursos",
  },
  {
    number: "03",
    title: "Construir desde el territorio",
    text: "Crear una red federal liderada por personas con discapacidad y conectada con las realidades del interior del país.",
    link: "/participar",
  },
] as const;

export const foundingMetrics = [
  {
    value: "0",
    target: "500",
    label: "personas acompañadas",
    detail: "Meta verificable para el primer año",
    progress: 0,
  },
  {
    value: "0",
    target: "24",
    label: "jurisdicciones articuladas",
    detail: "23 provincias y CABA",
    progress: 0,
  },
  {
    value: "0",
    target: "30",
    label: "instituciones capacitadas",
    detail: "Salud, educación, justicia y servicios",
    progress: 0,
  },
  {
    value: "0",
    target: "12",
    label: "recursos abiertos",
    detail: "Guías y herramientas de acceso gratuito",
    progress: 0,
  },
] as const;

export const contexts = [
  "Salud",
  "Educación",
  "Justicia",
  "Trabajo",
  "Servicios públicos",
  "Cultura y comunidad",
] as const;

export const principles = [
  {
    title: "Nada sobre nosotros sin nosotros",
    text: "Las personas con discapacidad deben ocupar un lugar central en las decisiones, la dirección y la evaluación del trabajo.",
  },
  {
    title: "Toda forma de comunicación es válida",
    text: "Hablar, escribir, señalar, mirar, usar símbolos, gestos o dispositivos son formas igualmente legítimas de expresarse.",
  },
  {
    title: "La accesibilidad es una responsabilidad compartida",
    text: "La barrera no está en la persona. Aparece cuando una institución no ofrece tiempo, apoyos, escucha o alternativas.",
  },
  {
    title: "Federal no significa replicar Buenos Aires",
    text: "Cada territorio tiene recursos, distancias y redes distintas. Las respuestas deben construirse con las comunidades locales.",
  },
] as const;

export const involvementOptions = [
  {
    title: "Sumate como persona",
    text: "Aportá tu experiencia, participá de consultas o ayudanos a detectar barreras en tu comunidad.",
    subject: "Quiero sumarme como persona",
  },
  {
    title: "Impulsá un nodo local",
    text: "Conectá a personas y organizaciones de tu provincia para construir una agenda verdaderamente federal.",
    subject: "Quiero impulsar un nodo local",
  },
  {
    title: "Transformá tu institución",
    text: "Revisemos juntos la accesibilidad comunicacional de un hospital, escuela, municipio, empresa o espacio cultural.",
    subject: "Quiero transformar una institución",
  },
] as const;

export const provinces = [
  "Ciudad Autónoma de Buenos Aires",
  "Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
  "Fuera de Argentina",
] as const;

export const publicDocuments = [
  {
    title: "Estatuto social",
    status: "En elaboración",
    detail: "Se publicará la versión aprobada por la autoridad competente.",
  },
  {
    title: "Autoridades y gobierno",
    status: "En conformación",
    detail: "Publicaremos cargos, mandatos y criterios de participación.",
  },
  {
    title: "Reporte de actividades",
    status: "Primer cierre anual",
    detail: "Incluirá resultados, aprendizajes y metodología de medición.",
  },
  {
    title: "Estados contables",
    status: "Sin movimientos",
    detail: "No existen ingresos ni gastos institucionales informados.",
  },
] as const;

export const resources = [
  {
    tag: "Guía inicial",
    title: "La comunicación también es accesibilidad",
    text: "Una introducción breve para reconocer barreras y entender por qué la accesibilidad no termina en una rampa.",
    status: "En preparación",
  },
  {
    tag: "Servicios públicos",
    title: "Cómo recibir a una persona con discapacidad comunicacional",
    text: "Pautas para escuchar, ofrecer tiempo y respetar el método de comunicación elegido por cada persona.",
    status: "En preparación",
  },
  {
    tag: "Derechos",
    title: "Qué hacer cuando no respetan tu forma de comunicarte",
    text: "Un recorrido federal para registrar la barrera, pedir ajustes y encontrar organismos de orientación.",
    status: "En investigación",
  },
  {
    tag: "Instituciones",
    title: "Lista de verificación de acceso comunicacional",
    text: "Una herramienta práctica para revisar atención presencial, teléfono, formularios, reuniones y canales digitales.",
    status: "En preparación",
  },
] as const;
