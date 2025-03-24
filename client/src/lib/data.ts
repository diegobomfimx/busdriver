export interface City {
  id: number;
  name: string;
  state: string;
}

export interface Route {
  id: number;
  originId: number;
  destinationId: number;
  origin?: City;
  destination?: City;
  price: string;
  duration: string;
  frequency: string;
  distance?: string;
  amenities: string[];
  departureDate?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  route: string;
  rating: number;
  comment: string;
  avatarId: string;
}

export interface BusType {
  id: number;
  name: string;
  features: string[];
  basePrice: string;
  image: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface SpecialOffer {
  id: number;
  title: string;
  description: string;
  image: string;
  label: string;
  ctaText: string;
  ctaLink: string;
}

// Local SVG images for routes, bus types, and special offers
export const images = {
  routes: [
    "/images/route1.svg",
    "/images/route2.svg",
    "/images/route3.svg",
    "/images/route1.svg",
    "/images/route2.svg",
    "/images/route3.svg",
  ],
  busTypes: [
    "/images/bus1.svg",
    "/images/bus2.svg",
    "/images/bus3.svg",
    "/images/bus1.svg",
  ],
  specialOffers: [
    "/images/special1.svg",
    "/images/special2.svg",
    "/images/special3.svg",
  ],
  travel: [
    "/images/travel.svg",
  ]
};

export const busTypes: BusType[] = [
  {
    id: 1,
    name: "Executivo",
    features: [
      "Poltronas reclináveis até 140°",
      "Ar-condicionado",
      "Wi-Fi e tomadas USB",
      "Sanitário a bordo"
    ],
    basePrice: "79.90",
    image: images.busTypes[0]
  },
  {
    id: 2,
    name: "Leito",
    features: [
      "Poltronas reclináveis até 160°",
      "Ar-condicionado e aquecedor",
      "Wi-Fi e tomadas individuais",
      "Kit lanche e água mineral",
      "Maior espaço entre poltronas"
    ],
    basePrice: "129.90",
    image: images.busTypes[1]
  },
  {
    id: 3,
    name: "Leito Premium",
    features: [
      "Poltronas reclináveis até 180°",
      "Travesseiro e manta",
      "Sistema de entretenimento individual",
      "Serviço de bordo premium",
      "Poltronas com maior largura",
      "Menor número de passageiros"
    ],
    basePrice: "179.90",
    image: images.busTypes[2]
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Carolina Silva",
    route: "São Paulo → Rio de Janeiro",
    rating: 5,
    comment: "Excelente experiência! Ônibus confortável, pontual e com ótimo atendimento. O Wi-Fi funcionou durante toda a viagem, o que foi ótimo para trabalhar.",
    avatarId: "women/45"
  },
  {
    id: 2,
    name: "Marcelo Santos",
    route: "São Paulo → Curitiba",
    rating: 4.5,
    comment: "Viajei no ônibus leito e valeu muito a pena! As poltronas são super confortáveis, consegui dormir bem e cheguei descansado ao meu destino.",
    avatarId: "men/32"
  },
  {
    id: 3,
    name: "Fernanda Lima",
    route: "Rio de Janeiro → Belo Horizonte",
    rating: 5,
    comment: "Viajo frequentemente a trabalho e sempre escolho a BusViagens. O preço é justo, o aplicativo é fácil de usar e nunca tive problemas. Recomendo!",
    avatarId: "women/68"
  }
];

export const faqs: FAQ[] = [
  {
    id: 1,
    question: "Como faço para comprar uma passagem?",
    answer: "Você pode comprar sua passagem através do nosso site, aplicativo ou em qualquer uma das nossas lojas físicas. No site ou aplicativo, basta informar origem, destino, data da viagem e selecionar a opção desejada. Aceitamos diversos meios de pagamento como cartão de crédito, débito, boleto bancário e PIX."
  },
  {
    id: 2,
    question: "Posso remarcar minha viagem?",
    answer: "Sim, você pode remarcar sua viagem até 3 horas antes do horário de partida. A remarcação pode ser feita pelo site, aplicativo ou em uma de nossas lojas. Dependendo do tipo de passagem adquirida, pode haver taxas de remarcação. Consulte nossos termos e condições para mais detalhes."
  },
  {
    id: 3,
    question: "Qual é a política de bagagens?",
    answer: "Cada passageiro tem direito a transportar gratuitamente até 30kg de bagagem no bagageiro e um volume de mão de até 5kg no interior do ônibus. Itens frágeis, valiosos ou perecíveis devem ser transportados como bagagem de mão. Não transportamos armas, materiais inflamáveis ou outros itens proibidos por lei."
  },
  {
    id: 4,
    question: "Como funciona o programa de fidelidade?",
    answer: "Nosso programa de fidelidade é gratuito e você acumula 1 ponto a cada R$ 10 gastos em passagens. Os pontos podem ser trocados por descontos em novas passagens, upgrades de categoria ou outros benefícios. Além disso, membros têm acesso a promoções exclusivas e prioridade no embarque. Cadastre-se em nosso site ou aplicativo."
  },
  {
    id: 5,
    question: "O que fazer em caso de atrasos ou cancelamentos?",
    answer: "Em caso de atrasos ou cancelamentos causados pela empresa, oferecemos remarcação sem custos ou reembolso integral do valor pago. Para atrasos significativos, fornecemos alimentação e, se necessário, hospedagem. Mantenha seus contatos atualizados em nosso sistema para receber notificações sobre qualquer alteração em sua viagem."
  }
];

export const specialOffers: SpecialOffer[] = [
  {
    id: 1,
    title: "Viaje Junto e Economize",
    description: "Na compra de 2 ou mais passagens, ganhe 15% de desconto no valor total.",
    image: images.specialOffers[0],
    label: "Oferta Limitada",
    ctaText: "Saiba Mais",
    ctaLink: "#"
  },
  {
    id: 2,
    title: "Viagens Noturnas com 20% OFF",
    description: "Economize nas viagens entre 22h e 6h. Desconto válido para todas as classes.",
    image: images.specialOffers[1],
    label: "Promoção Relâmpago",
    ctaText: "Reserve Agora",
    ctaLink: "#"
  }
];
