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

// Mock images are using Unsplash to avoid any copyright issues
export const images = {
  routes: [
    "https://images.unsplash.com/photo-1543872084-c7bd3822856f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300",
    "https://images.unsplash.com/photo-1507124484497-b7f446e65519?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300",
    "https://images.unsplash.com/photo-1631212216921-56570e4c5402?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300",
    "https://images.unsplash.com/photo-1697376237512-7fda02e2949a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300",
    "https://images.unsplash.com/photo-1683009427500-71a01fa6ea6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300",
    "https://images.unsplash.com/photo-1553830295-4ba85ce82171?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300",
  ],
  busTypes: [
    "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300",
    "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300",
    "/images/bus3.svg",
  ],
  specialOffers: [
    "/images/special1.svg",
    "/images/special2.svg",
    "/images/special3.svg",
  ],
  travel: [
    "https://images.unsplash.com/photo-1512428813834-c702c7702b78?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600",
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
  },
  {
    id: 3,
    title: "Programa de Fidelidade",
    description: "Cadastre-se grátis e ganhe pontos em cada viagem para trocar por descontos e benefícios exclusivos.",
    image: images.specialOffers[2],
    label: "Sempre Disponível",
    ctaText: "Cadastre-se",
    ctaLink: "#"
  }
];
