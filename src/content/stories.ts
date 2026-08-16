export type Story = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  paragraphs: string[];
};

export const stories: Story[] = [
  {
    slug: "comunicar-no-es-solamente-hablar",
    category: "Derechos",
    title: "Comunicar no es solamente hablar",
    excerpt:
      "Cuando una institución acepta una sola forma de expresión, convierte una diferencia humana en una barrera.",
    date: "16 de agosto de 2026",
    readTime: "4 min",
    image: "/images/experiencia-cboard-presentacion.webp",
    imageAlt:
      "Presentación de herramientas de comunicación aumentativa ante una audiencia",
    paragraphs: [
      "La comunicación no pertenece únicamente a quienes pueden producir palabras con la voz. También comunicamos cuando escribimos, señalamos una imagen, movemos los ojos, usamos gestos o hacemos hablar a un dispositivo. El mensaje cambia de soporte, pero no pierde valor.",
      "Muchas formas de exclusión comienzan cuando una escuela, un hospital o una oficina pública espera una respuesta inmediata y oral. La persona sabe qué quiere decir, pero el entorno no le ofrece tiempo ni acepta el método que necesita. La barrera no es su cuerpo: es una práctica diseñada para una sola manera de comunicarse.",
      "La accesibilidad comunicacional exige una relación de dos partes. No alcanza con entregar una herramienta. También hay que formar a quien escucha, revisar procedimientos y reconocer que comprender y ser comprendido es un derecho.",
      "DESAFÍA Federal nace para llevar esta discusión a cada territorio y transformar situaciones cotidianas concretas. Queremos que ninguna persona vuelva a quedar afuera porque el mundo decidió escuchar de una sola manera.",
    ],
  },
  {
    slug: "la-exclusion-tambien-se-construye-con-silencio",
    category: "Opinión",
    title: "La exclusión también se construye con silencio",
    excerpt:
      "No toda exclusión necesita una prohibición. A veces alcanza con no preguntar, no esperar y decidir por otra persona.",
    date: "16 de agosto de 2026",
    readTime: "5 min",
    image: "/images/experiencia-cboard-comunidad.webp",
    imageAlt:
      "Personas reunidas alrededor de una demostración de tecnología de apoyo",
    paragraphs: [
      "Hay exclusiones visibles: una escalera, una puerta angosta, un trámite imposible. Otras son más difíciles de fotografiar. Suceden cuando alguien dirige todas las preguntas al acompañante, termina una frase ajena o interpreta el silencio como ausencia de pensamiento.",
      "La prisa también excluye. Un turno médico de pocos minutos, una clase sin pausas o una audiencia sin apoyos pueden dejar afuera a quien necesita más tiempo para construir un mensaje. El problema no es la velocidad de esa persona, sino la rigidez del sistema.",
      "Transformar esta realidad requiere algo más profundo que la buena voluntad. Hace falta reconocer derechos, cambiar protocolos, capacitar equipos y medir si las personas realmente pueden participar.",
      "Nuestro punto de partida será escuchar. No queremos hablar por las personas con discapacidad: queremos construir las condiciones para que cada una pueda hablar, escribir, señalar o expresarse como elija y sea tomada en serio.",
    ],
  },
  {
    slug: "por-que-una-mirada-federal",
    category: "Territorio",
    title: "Por qué necesitamos una mirada federal",
    excerpt:
      "Una respuesta que funciona en una capital puede fracasar a cientos de kilómetros si ignora las redes, los recursos y las distancias.",
    date: "16 de agosto de 2026",
    readTime: "4 min",
    image: "/images/experiencia-cboard-equipo.webp",
    imageAlt:
      "Equipo de c board en un espacio de intercambio sobre tecnología asistiva",
    paragraphs: [
      "En Argentina, el acceso a apoyos, información y organizaciones cambia de manera drástica según el lugar donde una persona viva. Las distancias son mayores, los especialistas pueden estar lejos y muchas decisiones se concentran en Buenos Aires.",
      "Una organización federal no puede limitarse a enviar materiales desde una oficina central. Tiene que conocer las redes locales, formar referentes y permitir que cada provincia defina prioridades desde su propia realidad.",
      "Córdoba será nuestro punto de partida, no nuestro límite. Queremos conectar experiencias del interior, visibilizar soluciones que ya existen y construir herramientas abiertas que puedan adaptarse sin pedir permiso a una sede lejana.",
      "Ser federal implica distribuir poder. Por eso los futuros nodos territoriales deberán participar en la definición de la agenda, en la evaluación del trabajo y en la conducción de la asociación.",
    ],
  },
];

export function getStory(slug: string) {
  return stories.find((story) => story.slug === slug);
}
