export type StoryMedia =
  | {
      type: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
      caption?: string;
      wide?: boolean;
    }
  | {
      type: "video";
      src: string;
      poster?: string;
      caption?: string;
      label: string;
    };

export type Story = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  dateISO: string;
  readTime: string;
  image: string;
  imageAlt: string;
  paragraphs: string[];
  media?: StoryMedia[];
  sourceNote?: string | false;
};

export const stories: Story[] = [
  {
    slug: "la-noche-en-que-desafia-dio-su-primer-paso",
    category: "Comunidad",
    title: "La noche en que DESAFÍA dio su primer paso",
    excerpt:
      "Una mesa compartida, una idea que dejó de ser solamente una idea y un grupo de personas que decidió acompañarla desde el comienzo.",
    date: "27 de agosto de 2026",
    dateISO: "2026-08-27",
    readTime: "5 min",
    image: "/images/cena-fundacion-relato.webp",
    imageAlt:
      "Personas reunidas alrededor de las mesas durante la primera cena a beneficio de DESAFÍA Federal en Córdoba.",
    paragraphs: [
      "El jueves 27 de agosto de 2026 no hubo un acto solemne ni un corte de cinta. Hubo algo mucho mejor: una mesa compartida. En Bodegón Don Núñez, en Córdoba, amigos, familias y personas que decidieron creer desde el comienzo se reunieron en la primera cena a beneficio de DESAFÍA Federal.",
      "Fue la noche en que una idea dejó de ser solamente una conversación y empezó a convertirse en una organización. Los fondos de la cena fueron destinados a dar los primeros pasos para constituir formalmente la asociación civil en Córdoba, convocar a su junta fundadora y comenzar a poner en marcha sus primeros proyectos.",
      "DESAFÍA nace para enfrentar una forma de exclusión que muchas veces no se ve. No hablamos solamente de una escalera, una puerta o una vereda inaccesible. Hablamos también de ese momento en el que una persona siente que el mundo sigue funcionando perfectamente sin ella: cuando queda afuera de una conversación, de una oportunidad, de un viaje, de una decisión o simplemente de la vida de los demás. Queremos desafiar esas situaciones y construir respuestas desde Córdoba, con una mirada verdaderamente federal.",
      "La noche tuvo también todo lo que una fundación hecha entre amigos debía tener: brindis, torta, emoción y bastante humor cordobés. Federico Ferraro compartió un cuento de su autoría y nos regaló un momento para escuchar y pensar juntos. Willy Magia hizo un show que reunió a todos alrededor de la sorpresa y la risa. Si vamos a intentar cambiar la realidad, empezar con un poco de magia no parece una mala estrategia.",
      "Queremos agradecer especialmente a Bodegón Don Núñez por abrirnos las puertas, recibirnos con enorme calidez y ser la casa de esta primera noche. Gracias a Willy Magia por sumarse a la celebración, a Federico Ferraro por compartir su cuento y a Crelech por donar los souvenirs que cada asistente pudo llevarse como recuerdo del comienzo de esta historia.",
      "Pero el agradecimiento más importante es para cada una y cada uno de los fundadores benefactores que estuvieron ahí. Su presencia no fue solamente una reserva en una cena: fue el primer acto concreto de confianza en DESAFÍA. Cada persona que ocupó una silla esa noche ayudó a hacer posible que la asociación empiece a existir y pasó a formar parte de su día uno.",
      "No sabemos todavía hasta dónde va a llegar DESAFÍA. Sí sabemos desde dónde empezó. No nació en una oficina ni detrás de un escritorio. Nació alrededor de una mesa en Córdoba, entre personas que decidieron acompañarse, celebrar y transformar una idea en compromiso. Y viendo cómo arrancamos, hay motivos de sobra para animarnos a todo lo que viene.",
    ],
    media: [
      {
        type: "image",
        src: "/images/cena-fundacion-familia.webp",
        alt: "Una persona usuaria de silla de ruedas acompañada por tres familiares durante la cena de fundación.",
        width: 846,
        height: 711,
        caption:
          "Una noche compartida con afectos y con la comunidad que acompañó el nacimiento de DESAFÍA.",
      },
      {
        type: "image",
        src: "/images/cena-fundacion-torta.webp",
        alt: "Una persona frente a tres tortas y copas preparadas para el brindis durante la celebración.",
        width: 1467,
        height: 2048,
        caption:
          "El brindis y la torta también fueron parte de una noche que mezcló celebración y comienzo.",
      },
      {
        type: "image",
        src: "/images/cena-fundacion-fundadores.webp",
        alt: "Grupo de asistentes posando juntos durante la primera cena a beneficio de DESAFÍA Federal.",
        width: 2048,
        height: 837,
        caption:
          "Parte de los fundadores benefactores que acompañaron la primera cena a beneficio.",
        wide: true,
      },
      {
        type: "video",
        src: "/videos/cena-fundacion-willy-magia-1.mp4",
        poster: "/images/cena-fundacion-willy-magia-1-poster.jpg",
        label: "Video del show de magia durante la cena de fundación",
        caption: "Willy Magia durante su show en la cena de fundación.",
      },
      {
        type: "video",
        src: "/videos/cena-fundacion-willy-magia-2.mp4",
        poster: "/images/cena-fundacion-willy-magia-2-poster.jpg",
        label: "Segundo video del show de magia durante la cena de fundación",
        caption: "Otro momento del show de Willy Magia.",
      },
    ],
    sourceNote: false,
  },
  {
    slug: "comunicar-no-es-solamente-hablar",
    category: "Derechos",
    title: "Comunicar no es solamente hablar",
    excerpt:
      "Cuando una institución acepta una sola forma de expresión, convierte una diferencia humana en una barrera.",
    date: "16 de agosto de 2026",
    dateISO: "2026-08-16",
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
    dateISO: "2026-08-16",
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
    dateISO: "2026-08-16",
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
