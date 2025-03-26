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
  {
    id: 143,
    name: "Nic-Salt BLVK Unicorn - Berry Peach",
    description: "Iced Berry Peach da BLVK Pink Salt Series, desfrute de uma dupla deliciosamente refrescante de frutas vermelhas e pêssegos para criar um sabor deliciosamente crescente.",
    price: 149.90,
    category: "Salt",
    image: "/salt/berrypeach.jpeg",
    inStock: true,
    featured: true,
    flavors: ["Frutas", "Pêssego", "Morango"],
    nicotineStrength: 50,
    volume: 30
  },
  {
    id: 275,
    name: "Nic-Salt BLVK Unicorn - Pinapple Ice",
    description: "Pineapple Ice por BLVK Salt Plus Series, um paraíso tropical repleto de sabores de abacaxi e uma brisa gelada.",
    price: 149.90,
    category: "Salt",
    image: "/salt/pineapple.jpeg",
    inStock: true,
    featured: true,
    nicotineStrength: 50,
    volume: 30,
    flavors: ["Manga", "Cítrico"]
  },
  {
    id: 319,
    name: "Nic-Salt BLVK Unicorn - Spearmint",
    description: "Spearmint por BLVK Unicorn Nic Salt, vem com sorvete de menta e refrescante mentol para criar uma obrigação de teste para os amantes de sabores mentolados frescos. A deliciosa combinação de sabores oferecidos pelo BLVK Nic Salt.",
    price: 139.90,
    category: "Salt",
    image: "/salt/spearmint.jpeg",
    inStock: true,
    featured: true,
    nicotineStrength: 50,
    volume: 30,
    flavors: ["Menta", "Fresco", "Ice"]
  },
  {
    id: 468,
    name: "Nic-Salt BLVK Unicorn - Lychee Menthol",
    description: "BLVK Unicorn Nic Salt Lychee, líquido vape de lichia doce com um toque de mentol fresco cria uma explosão de sabor frutado e frio como você nunca experimentou antes.",
    price: 149.90,
    category: "Salt",
    image: "/salt/lychie.jpeg",
    inStock: true,
    featured: true,
    nicotineStrength: 50,
    volume: 30,
    flavors: ["Lychee", "Menta", "Frutas"]
  },
  {
    id: 527,
    name: "Nic-Salt BLVK Unicorn - Strawberry Cream",
    description: "BLVK Unicorn Nic Salt Strawberry Cream, uma deliciosa fatia de bolo de morango coberto com creme doce e pedaços de biscoito de Graham.",
    price: 119.90,
    category: "Salt",
    image: "/salt/strabewrry-cream.jpeg",
    inStock: true,
    nicotineStrength: 35,
    volume: 30,
    flavors: ["Strawberry", "Baunilha", "Morango"]
  },
  {
    id: 632,
    name: "Nic-Salt BLVK Unicorn - Apple Ice",
    description: "Sour Apple Ice por BLVK Salt Plus Series, uma mistura de maçã verde azeda equilibrada por uma sensação doce e calmante de gelo.",
    price: 149.90,
    category: "Salt",
    image: "/salt/appleice.jpeg",
    inStock: true,
    nicotineStrength: 50,
    volume: 30,
    flavors: ["Ice", "Maça-Verde", "Menta"]
  },
  {
    id: 741,
    name: "Nic-Salt BLVK Unicorn - Banana Ice",
    description: "Banana Ice por BLVK para sua Serie Salt Plus, desfrute de um sabor doce de banana gelada com perfeição.",
    price: 119.90,
    category: "Salt",
    image: "/salt/bananaice.jpeg",
    inStock: true,
    nicotineStrength: 35,
    volume: 30,
    flavors: ["Gelada", "Banana"]
  },
  {
    id: 856,
    name: "Nic-Salt BLVK Unicorn - Watermelon Ice",
    description: "Watermelon Ice por BLVK Salt Plus Series, as fatias de melancia suculentas e refrescantes que você adora, geladas na perfeição.",
    price: 149.90,
    category: "Salt",
    image: "/salt/watermelonice.jpeg",
    inStock: true,
    nicotineStrength: 50,
    volume: 30,
    flavors: ["Melancia", "Gelo"]
  },
  {
    id: 915,
    name: "Nic-Salt BLVK Unicorn - Mango Ice",
    description: "Mango Passion Ice por BLVK N'Yellow Nic Salt a combinação perfeita e refrescante de Manga com Maracujá.",
    price: 149.90,
    category: "Salt",
    image: "/salt/mangopassion.jpeg",
    inStock: true,
    nicotineStrength: 50,
    volume: 30,
    flavors: ["Manga", "Maracujá", "Gelada"]
  },
  {
    id: 104,
    name: "Nic-Salt BLVK Unicorn - Vanilla",
    description: "BLVK Unicorn Nic Salt Vanilla Custard, reviva os dias de glória dos sabores ousados de sobremesas com o VANILLA Custard, a perfeita harmonia de tons doces de baunilha combinados com o sabor cremoso de creme.",
    price: 119.90,
    category: "Salt",
    image: "/salt/vanillacustard.jpeg",
    inStock: true,
    featured: true,
    nicotineStrength: 35,
    volume: 30,
    flavors: ["Baunilha", "Creme", "Bolo"]
  },
  {
    id: 285,
    name: "Nic-Salt BLVK Unicorn - Lemon Tangerine",
    description: "BLVK Unicorn Nic Salt Lemon Tangerine, uma mistura cítrica de limão e tangerina que cria uma explosão de sabor frutado.",
    price: 149.90,
    category: "Salt",
    image: "/salt/lemontangerine.jpeg",
    inStock: true,
    nicotineStrength: 50,
    volume: 30,
    flavors: ["Limão", "Tangerina", "Cítrico"]
  },
  {
    id: 376,
    name: "Nic-Salt BLVK Unicorn - Tobacco Caramel",
    description: "BLVK Unicorn Nic Salt Tobacco Caramel, um sabor clássico de tabaco com um toque de caramelo doce.",
    price: 149.90,
    category: "Salt",
    image: "/salt/tobacco.jpeg",
    inStock: true,
    nicotineStrength: 50,
    volume: 30,
    flavors: ["Tabaco", "Caramelo", "Doce"]
  },
  {
    id: 429,
    name: "Nic-Salt BLVK Unicorn - Cucumber",
    description: "BLVK Unicorn Nic Salt Cucumber, uma mistura refrescante de pepino com um toque de mentol.",
    price: 149.90,
    category: "Salt",
    image: "/salt/cucumber.jpeg",
    inStock: true,
    nicotineStrength: 50,
    volume: 30,
    flavors: ["Pepino", "Mentol", "Fresco"]
  },
  {
    id: 538,
    name: "Nic-Salt BLVK Unicorn - Tobacco Strawberry",
    description: "BLVK Unicorn Nic Salt Tobacco Strawberry, um sabor clássico de tabaco com um toque de morango doce.",
    price: 149.90,  
    category: "Salt",
    image: "/salt/tobaccostrawberry.jpeg",
    inStock: true,
    nicotineStrength: 50,
    volume: 30,
    flavors: ["Tabaco", "Morango", "Doce"]
  },
  {
    id: 647,
    name: "Nic-Salt BLVK Unicorn - Orange Ice",
    description: "BLVK Unicorn Nic Salt Orange Ice, uma mistura cítrica de laranja com um toque de mentol.",
    price: 149.90,
    category: "Salt",
    image: "/salt/orangeice.jpeg",
    inStock: true,
    nicotineStrength: 50,
    volume: 30,
    flavors: ["Laranja", "Mentol", "Fresco"]
  },
  {
    id: 753,
    name: "Nic-Salt BLVK Unicorn - Citrus Strawberry",
    description: "BLVK Unicorn Nic Salt Citrus Strawberry, uma mistura cítrica de morango com um toque de limão.",
    price: 149.90,
    category: "Salt",
    image: "/salt/citrus.jpeg",
    inStock: true,
    nicotineStrength: 50,
    volume: 30,
    flavors: ["Morango", "Limão", "Cítrico"]
  },
  {
    id: 863,
    name: "Nic-Salt BLVK Unicorn - Iced Berry Banana",
    description: "BLVK Unicorn Nic Salt Iced Berry Banana, uma mistura de frutas vermelhas e banana com um toque de mentol.",
    price: 119.90,
    category: "Salt",
    image: "/salt/icedberrybanana.jpeg",
    inStock: true,
    nicotineStrength: 35,
    volume: 30,
    flavors: ["Frutas", "Banana", "Gelada"]
  },
  // pods
  {
    id: 924,
    name: "Pod - Kit Zomo Play POD Black",
    description: "Play combina perfeitamente uma cápsula recarregável substituível e bateria recarregável em um design minimalista. Ele vem com acabamentos de plástico lisos e acabamentos de borracha macia. Encha a cápsula com a sua BLVK Unicorn Nicsalt favorita e experimente.",
    price: 149.99,
    category: "Pods",
    image: "/pods/kitzomo.jpeg",
    inStock: true,
    featured: true,
    colors: ["Preto", "Vermelho"],
    volume: 10
  },
  {
    id: 135,
    name: "Pod - Kit Vapelustion Hannya Airtok POD Mask Girl Pink",
    description: "Airtok é um produto de nova geração da mais recente linha de produção da Hannya. Embora tenham herdado as vantagens da série Nano, eles realizaram o novo e cuidadoso projeto. Inspirado no isqueiro recarregável e na cor única de animação estilo Hannya, você pode sempre manter o frescor da Hannya. Encha a cápsula com a sua BLVK Unicorn Nicsalt favorita e experimente.",
    price: 119.90,
    category: "Pods",
    image: "/pods/podgirl.jpeg",
    inStock: true,
    featured: true,
    colors: ["Rosa"],
    volume: 10
  },
  {
    id: 267,
    name: "Pod - Kit Desire Pro Black",
    description: "Desire Design Pro Pod alimentado por bateria interna de 1000mAh, adota tempo de vaping de longa duração, suportando um vape de um dia inteiro para os usuários. O Desire Design Pro Pod vem com capacidade de suco de 2ml e resistência de bobina de 1,2ohm. Ideal para sais de nic. O More Pro Kit tem um chipset projetado pela Desire, trazendo várias proteções e garantindo um vape seguro também.",
    price: 170.90,
    category: "Pods",
    image: "/pods/desire.jpeg",
    inStock: true,
    colors: ["Preto"],
    volume: 10
  },
  {
    id: 381,
    name: "Pod - Kit Smoking Mi-Pod Royal LM",
    description: "Mi-POD é um kit de partida de vapor eletrônico inovador e super compacto com capacidade de 2 ml de ejuice e uma bateria integrada de 950mAh feita sob medida. Com um sistema OAS (Oil and Air Separated) patenteado, com fluxo de ar superior e sem vazamentos, o Mi-Pod oferece uma experiência de vaporização totalmente nova. Suporta cartuchos descartáveis e cartuchos recarregáveis.Além disso, o Mi-pod vem com auto-desenho manual, indicadores de energia de 3 cores e uma porta micro-USB, o que o torna muito prático de usar e carregar.",
    price: 249.90,
    category: "Pods",
    image: "/pods/smoking.jpeg",
    inStock: true,
    featured: true,
    colors: ["Royal Limited Edition", "Carbon Fiber"],
    volume: 10
  },
  {
    id: 492,
    name: "Pod - Kit Hannya Nano",
    description: "Como líder na indústria do tabaco, o VAPELUSTION definitivamente deixará uma marca na lista e o NANO conquistou a reputação dos usuários. A VAPELUSTION continuará a criar impulso e redesenhar o NANO PRO, um avanço e um tributo. Mais uma vez, as infinitas possibilidades foram estimuladas e atualizações foram feitas sob a condição de manter os genes inalterados.",
    price: 239.90,
    category: "Pods",
    image: "/pods/smoking.jpeg",
    inStock: true,
    featured: true,
    colors: ["Black"],
    volume: 10
  },
  {
    id: 583,
    name: "Pod - Kit Lost Vape Lyra Pod Blue Leather",
    description: "Lost Vape Lyra Pod Kit é um novo pod com várias proteções e carregamento por USB. Alimentado por uma bateria interna de 1000 mAh com um cartucho de substituição de 2 ml. É fácil de preencher. Com dois tipos de bobina Lyra, é adequado para sais de nicotina e e-líquido clássico. ",
    price: 249.90,
    category: "Pods",
    image: "/pods/lyra.jpeg",
    inStock: true,
    featured: true,
    colors: ["Black"],
    volume: 10
  },
  {
    id: 654,
    name: "Pod - Kit Lost Orion",
    description: "Lost Vape Lyra Pod Kit é um novo pod com várias proteções e carregamento por USB. Alimentado por uma bateria interna de 1000 mAh com um cartucho de substituição de 2 ml. É fácil de preencher. Com dois tipos de bobina Lyra, é adequado para sais de nicotina e e-líquido clássico. ",
    price: 249.90,
    category: "Pods",
    image: "/pods/lost.jpeg",
    inStock: true,
    featured: true,
    colors: ["Lava"],
    volume: 10
  },
  {
    id: 767,
    name: "Pod - Kit Lost Orion",
    description: "Lost Vape Lyra Pod Kit é um novo pod com várias proteções e carregamento por USB. Alimentado por uma bateria interna de 1000 mAh com um cartucho de substituição de 2 ml. É fácil de preencher. Com dois tipos de bobina Lyra, é adequado para sais de nicotina e e-líquido clássico. ",
    price: 249.90,
    category: "Pods",
    image: "/pods/lost.jpeg",
    inStock: true,
    featured: true,
    colors: ["Lava"],
    volume: 10
  },
  {
    id: 879,
    name: "Pod - Kit Vaporesso XROSS PRO",
    description: "O XROS PRO é o primeiro a apresentar um pod de 0,4 ohm e potência ajustável de até 30 W na série XROS, oferecendo uma experiência de pod RDL. Ultrapassando os limites de uma experiência profissional de excelente sabor, ele apresenta o modo AXON Super Pulse e a tecnologia de aquecimento COREX. Ultrapassando os limites da experiência profissional de operação refinada, ele apresenta uma tela e um botão práticos.",
    price: 249.90,
    category: "Pods",
    image: "/pods/xros.jpeg",
    inStock: true,
    featured: true,
    colors: ["Blue", "Black", "Red", "Rainbow", "Silver", "Gold"],
    volume: 10
  },
  {
    id: 1293,
    name: "Pod - Kit Auga Black",
    description:"Augvape com a colaboração de Flawless apresenta o sistema Lyfe Pod, um sistema tudo em um que possui um design ativado por tração capaz de trazer um sabor imenso durante todo o dia. O Lyfe tem uma potência máxima de 7.6W e uma tensão de trabalho de 3.3 a 4.2V. Alimentando o Lyfe é uma bateria de 300 mAh que pode durar quase um dia inteiro. Um recipiente substituível de 2 ml fica magneticamente no topo do Lyfe.",
    price: 149.90,
    category: "Pods",
    image: "/pods/auga.jpeg",
    inStock: true,
    featured: true,
    colors: ["Black"],
    volume: 10
  },
  {
    id: 3333,
    name: "Pod - Kit OXVA Origin X",
    description: "O Kit OXVA Origin X foi projetado por Justin Lai. O Origin X é alimentado por 18650 (não incluída), um kit inovador com cartucho em forma de L para alcançar a perfeição de absorção e suporta construções de bobina dupla. O comprovado Unicoil em 0.2? dispara até 60w para liberar um sabor incrível. É também a versão de atualização para o KIT OXVA Origin POD 40W. Uma virada de jogo definitiva para usuários de bobinas pré-fabricadas e vapers DIY.",
    price: 249.90,
    category: "Pods",
    image: "/pods/oxva.jpeg",
    inStock: true,
    featured: true,
    colors: ["Green"],
  },
  {
    id: 4930,
    name: "Pod - Kit Suorin Black",
    description: "Suorin Drop Starter Kit, um kit inicial ultra compacto projetado para e-smoking em movimento ou simplesmente procurando um dispositivo fácil de usar. ",
    price: 149.90,
    category: "Pods",
    image: "/pods/suorin.jpeg",
    inStock: true,
    featured: true,
    colors: ["Black"],
  },
  {
    id: 9938,
    name: "Pod - Kit Caliburn Prime",
    description: "A UWELL lançou o novo KOKO PRIME, o design dos painêis magnéticos decorativos substituíveis aumentou a diversâo do produto. Diferentes combinações de cores de decorações exteriores podem ser substituidas a vontade, com mais seletividade e creatividade trocando painêis decorativos com amigos, criando uma cultura fashion de vapor.",
    price: 149.90,
    category: "Pods",
    image: "/pods/caliburn.jpeg",
    inStock: true,
    featured: true,
    colors: ["Black"],
  }
];