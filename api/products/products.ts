// Description: Products data for the e-commerce website.
// Product interface
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
  featured?: boolean;
  colors?: string[];
  nicotineStrength?: number;
  volume?: number;
  flavors?: string[];
}

// Products data
export const Products: Product[] = [
  // PODS Category (keeping the featured one)
  {
    id: 1,
    name: "Nic-Salt BLVK Unicorn - Berry Peach",
    description: "Iced Berry Peach da BLVK Pink Salt Series, desfrute de uma dupla deliciosamente refrescante de frutas vermelhas e pêssegos para criar um sabor deliciosamente crescente.",
    price: 149.90,
    category: "Salt",
    image: "/salt/berrypeach.jpeg",
    inStock: true,
    featured: true,
    flavors: ["Frutas", "Pêssego", "Morango"],
    nicotineStrength: 50,
    volume: 2
  },
  
  // SALT (Nic Salts) Category (keeping the featured one)
  {
    id: 7,
    name: "Nic-Salt BLVK Unicorn - Pinapple Ice",
    description: "Pineapple Ice por BLVK Salt Plus Series, um paraíso tropical repleto de sabores de abacaxi e uma brisa gelada.",
    price: 129.90,
    category: "Salt",
    image: "/salt/pineapple.jpeg",
    inStock: true,
    featured: true,
    nicotineStrength: 50,
    volume: 30,
    flavors: ["Manga", "Cítrico"]
  },
  
  // VAPES (Disposables) Category (keeping the featured one)
  {
    id: 11,
    name: "Nic-Salt BLVK Unicorn - Spearmint",
    description: "Spearmint por BLVK Unicorn Nic Salt, vem com sorvete de menta e refrescante mentol para criar uma obrigação de teste para os amantes de sabores mentolados frescos. A deliciosa combinação de sabores oferecidos pelo BLVK Nic Salt.",
    price: 119.90,
    category: "Salt",
    image: "/salt/spearmint.jpeg",
    inStock: true,
    featured: true,
    nicotineStrength: 50,
    volume: 13,
    flavors: ["Menta", "Fresco", "Ice"]
  },
  
  // JUICES (E-liquids) Category (keeping the featured one)
  {
    id: 17,
    name: "Nic-Salt BLVK Unicorn - Lychee Menthol",
    description: "BLVK Unicorn Nic Salt Lychee, líquido vape de lichia doce com um toque de mentol fresco cria uma explosão de sabor frutado e frio como você nunca experimentou antes.",
    price: 119.90,
    category: "Salt",
    image: "/salt/lychie.jpeg",
    inStock: true,
    featured: true,
    nicotineStrength: 6,
    volume: 120,
    flavors: ["Lychee", "Menta", "Frutas"]
  },
  {
    id: 6,
    name: "Nic-Salt BLVK Unicorn - Strawberry Cream",
    description: "BLVK Unicorn Nic Salt Strawberry Cream, uma deliciosa fatia de bolo de morango coberto com creme doce e pedaços de biscoito de Graham.",
    price: 89.90,
    category: "Salt",
    image: "/salt/strabewrry-cream.jpeg",
    inStock: true,
    nicotineStrength: 35,
    volume: 30,
    flavors: ["Strawberry", "Baunilha", "Morango"]
  },
  {
    id: 2,
    name: "Nic-Salt BLVK Unicorn - Apple Ice",
    description: "Sour Apple Ice por BLVK Salt Plus Series, uma mistura de maçã verde azeda equilibrada por uma sensação doce e calmante de gelo.",
    price: 120.90,
    category: "Salt",
    image: "/salt/appleice.jpeg",
    inStock: true,
    volume: 30,
    flavors: ["Ice", "Maça-Verde", "Menta"],
    nicotineStrength: 50
  },
  
  /* Commented Products Below */
  
  // Additional PODS Products
  /*
  {
    id: 3,
    name: "Uwell Caliburn G",
    description: "O Caliburn G da Uwell é um sistema de pod compacto com bateria de 690mAh e carregamento tipo-C. Seu design de preenchimento superior e bobinas substituíveis de 0.8ohm mesh garantem excelente sabor e produção de vapor. Sistema dual de ativação por botão e auto-draw para versatilidade de uso.",
    price: 189.90,
    category: "Pods",
    image: "/images/products/pods/caliburn-g.png",
    inStock: true,
    colors: ["Preto", "Vermelho", "Azul", "Rosa"],
    volume: 2
  },
  {
    id: 4,
    name: "SMOK Nord 4",
    description: "O SMOK Nord 4 é um sistema de pod com bateria integrada de 2000mAh e potência máxima de 80W. Compatível com bobinas RPM e RPM 2, possui um tanque de 4.5ml e ajuste de potência variável. Seu design ergonômico com painel lateral de couro e tela TFT de 0.69 polegadas oferece estilo e funcionalidade.",
    price: 279.90,
    category: "Pods",
    image: "/images/products/pods/smok-nord-4.png",
    inStock: true,
    colors: ["Preto", "Azul Cobalto", "Vermelho", "Arco-íris"],
    volume: 4.5
  },
  {
    id: 5,
    name: "Lost Vape Orion Q",
    description: "O Lost Vape Orion Q é um pod system premium com chassi de liga de alumínio e painel de fibra de carbono. Sua bateria interna de 950mAh e chip avançado garantem performance consistente, enquanto seus pods de 2ml utilizam resistências de 1.0ohm para MTL perfeito. Ideal para vapers que buscam qualidade e discrição.",
    price: 359.90,
    category: "Pods",
    image: "/images/products/pods/orion-q.png",
    inStock: true,
    featured: true,
    colors: ["Fibra de Carbono", "Carbono Azul", "Prateado"],
    volume: 2
  },
  */

  // Additional SALT Products
  /*
  {
    id: 8,
    name: "NicSalt Juice Head - Blueberry Lemon",
    description: "O NicSalt Juice Head Blueberry Lemon combina mirtilo suculento com limão ácido para criar um perfil de sabor equilibrado e refrescante. A doçura natural dos mirtilos complementa perfeitamente a acidez cítrica do limão, criando uma experiência de vape revigorante. Formulação de sal de nicotina para satisfação rápida.",
    price: 94.90,
    category: "Salt",
    image: "/images/products/salt/juicehead-blueberry.png",
    inStock: true,
    nicotineStrength: 50,
    volume: 30,
    flavors: ["Mirtilo", "Limão"]
  },
  {
    id: 9,
    name: "NicSalt Dinner Lady - Lemon Tart",
    description: "O NicSalt Dinner Lady Lemon Tart reproduz fielmente a sobremesa britânica clássica. Combina uma base de torta de merengue de limão cremosa com notas de merengue doce e massa folhada. Uma experiência de vape premium que equilibra perfeitamente acidez e doçura com a suavidade dos sais de nicotina.",
    price: 109.90,
    category: "Salt",
    image: "/images/products/salt/dinnerlady-lemon.png",
    inStock: true,
    featured: true,
    nicotineStrength: 30,
    volume: 30,
    flavors: ["Limão", "Torta", "Creme"]
  },
  {
    id: 10,
    name: "NicSalt Glas - BSX Butterscotch",
    description: "O NicSalt Glas BSX Butterscotch oferece uma experiência rica de caramelo de manteiga cremoso. Sua formulação equilibrada reproduz perfeitamente o doce clássico, combinando notas de manteiga, açúcar mascavo e baunilha. Um e-liquid premium para vapers que apreciam sabores doces e complexos.",
    price: 99.90,
    category: "Salt",
    image: "/images/products/salt/glas-butterscotch.png",
    inStock: true,
    nicotineStrength: 50,
    volume: 30,
    flavors: ["Caramelo", "Manteiga", "Baunilha"]
  },
  */

  // Additional VAPES Products
  /*
  {
    id: 12,
    name: "Lost Mary OS5000",
    description: "O Lost Mary OS5000 oferece até 5000 puffs com sistema de fluxo de ar ajustável e design compacto. Sua bateria de 600mAh e 13ml de e-líquido proporcionam uma experiência de vape prolongada com sabores consistentes e intensos. A mesh coil integrada garante excelente produção de vapor e pureza de sabor.",
    price: 109.90,
    category: "Vapes",
    image: "/images/products/vapes/lostmary-5000.png",
    inStock: true,
    nicotineStrength: 30,
    volume: 13,
    flavors: ["Melancia", "Mirtilo", "Triple Mango"]
  },
  {
    id: 13,
    name: "Fume Extra",
    description: "O Fume Extra é um dispositivo descartável compacto com aproximadamente 1500 puffs. Seu design slim com bateria de 850mAh e 5ml de e-líquido oferece conveniência sem comprometer a qualidade. A bobina integrada de 1.4ohm proporciona um MTL perfeito, ideal para ex-fumantes que buscam uma transição fácil.",
    price: 69.90,
    category: "Vapes",
    image: "/images/products/vapes/fume-extra.png",
    inStock: true,
    nicotineStrength: 50,
    volume: 5,
    flavors: ["Manga", "Menta", "Banana Ice"]
  },
  {
    id: 14,
    name: "Geek Bar Pulse",
    description: "O Geek Bar Pulse é um vape descartável premium com até 15000 puffs. Sua bateria recarregável de 650mAh e 18ml de e-líquido oferecem uma experiência de longa duração. O sistema de airflow ajustável e indicador LED de bateria proporcionam controle preciso, enquanto a ampla gama de sabores satisfaz todos os paladares.",
    price: 149.90,
    category: "Vapes",
    image: "/images/products/vapes/geekbar-pulse.png",
    inStock: true,
    featured: true,
    nicotineStrength: 30,
    volume: 18,
    flavors: ["Morango Ice", "Blue Razz", "Maracujá"]
  },
  {
    id: 15,
    name: "Smok Novo Bar",
    description: "O Smok Novo Bar combina a qualidade da Smok com a conveniência de um descartável. Oferece até 2000 puffs com bateria de 600mAh e 6.5ml de e-líquido. Seu design compacto e elegante com acabamento metálico premium e LED indicativo proporciona uma experiência superior aos descartáveis convencionais.",
    price: 89.90,
    category: "Vapes",
    image: "/images/products/vapes/smok-novobar.png",
    inStock: true,
    nicotineStrength: 50,
    volume: 6.5,
    flavors: ["Maçã Verde", "Uva", "Menta"]
  },
  */

  // Additional JUICES Products
  /*
  {
    id: 16,
    name: "Juice Nasty - Double Kiwi",
    description: "O e-líquido Nasty Double Kiwi combina kiwis maduros com um toque de gelo para uma experiência refrescante. A intensidade do kiwi é perfeitamente balanceada, criando um all-day vape ideal para os dias quentes. Produzido com ingredientes premium para máxima pureza de sabor e consistência vapor após vapor.",
    price: 129.90,
    category: "Juices",
    image: "/images/products/juices/nasty-kiwi.png",
    inStock: true,
    nicotineStrength: 3,
    volume: 60,
    flavors: ["Kiwi", "Gelo"]
  },
  {
    id: 18,
    name: "Juice Coastal Clouds - Apple Peach Strawberry",
    description: "O Coastal Clouds Apple Peach Strawberry combina maçã crocante, pêssego suculento e morangos doces para criar um perfil frutado harmonioso e refrescante. Este blend premium é envelhecido para permitir a perfeita fusão dos sabores, resultando em uma experiência de vape complexa e satisfatória do início ao fim.",
    price: 139.90,
    category: "Juices",
    image: "/images/products/juices/coastal-apple.png",
    inStock: true,
    nicotineStrength: 3,
    volume: 60,
    flavors: ["Maçã", "Pêssego", "Morango"]
  },
  {
    id: 19,
    name: "Juice Pachamama - Fuji",
    description: "O Pachamama Fuji combina suculentas maçãs Fuji com morangos maduros e nectarinas doces. Esta mistura tropical complexa oferece um perfil frutado perfeitamente equilibrado sem ser excessivamente doce. Produzido pela Charlie's Chalk Dust, utiliza apenas aromas naturais e é engarrafado em instalações laboratoriais de nível 100.",
    price: 149.90,
    category: "Juices",
    image: "/images/products/juices/pachamama-fuji.png",
    inStock: true,
    featured: true,
    nicotineStrength: 0,
    volume: 60,
    flavors: ["Maçã Fuji", "Morango", "Nectarina"]
  },
  {
    id: 20,
    name: "Juice Jam Monster - Blueberry",
    description: "O Jam Monster Blueberry recria perfeitamente uma torrada quentinha com manteiga coberta por geleia de mirtilo artesanal. Suas notas de pão torrado, manteiga cremosa e mirtilos doces se combinam para uma experiência de vape indulgente e satisfatória. A formulação Max VG proporciona nuvens densas e sabor intenso.",
    price: 159.90,
    category: "Juices",
    image: "/images/products/juices/jammonster-blueberry.png",
    inStock: true,
    nicotineStrength: 3,
    volume: 100,
    flavors: ["Mirtilo", "Manteiga", "Torrada"]
  }
  */
];