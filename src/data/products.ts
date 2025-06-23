interface ProductTranslations {
  en: {
    name: string;
    description: string;
    composition: string;
    care: string;
  };
  pt: {
    name: string;
    description: string;
    composition: string;
    care: string;
  };
}

interface Product {
  _id: string;
  translations: ProductTranslations;
  price: number;
  categories: string[];
  images: string[];
  colors: string[];
  sizes: string[];
  discountPrice?: number;
}

export const products: Product[] = [
  {
    _id: "price_1RcltPCTQhRcTCnZs743CmYY",
    translations: {
      en: {
        name: "Can I Lick T-Shirt",
        description: "A classic freak-minimalism t-shirt, do you Lick?",
        composition: "100% pre-shrunk cotton | 184g",
        care: "It is recommended to iron the shirt inside out to preserve the embroidery."
      },
      pt: {
        name: "Can I Lick T-Shirt",
        description: "Uma t-shirt clássica freak-minimalism, do you Lick?",
        composition: "100% algodão pré-encolhido | 184g",
        care: "Recomenda-se passar a blusa do avesso para preservar o bordado"
      }
    },
    price: 30.00,
    categories: ["man"],
    images: [
      "/images/tshirts/canilick1.png",
      "/images/tshirts/canilick2.png"
    ],
    colors: ["White"],
    sizes: ["M"],
    discountPrice: 27.75
  },
  {
    _id: "price_1RcpHYCTQhRcTCnZZ2o0wLle",
    translations: {
      en: {
        name: "Demon Slayer Nezuko T-Shirt",
        description: "For Demon Slayer fans - Nezuko style",
        composition: "65% cotton, 35% polyester",
        care: "Machine wash cold. Do not bleach. Iron low heat.",
      },
      pt: {
        name: "Demon Slayer Nezuko T-Shirt",
        description: "Para fãs de Demon Slayer - Estilo Nezuko",
        composition: "65% algodão, 35% poliéster",
        care: "Lavar na máquina em água fria. Não alvejar. Passar a ferro em baixa temperatura.",
        
      }
    },
    price: 25.00,
    categories: ["woman", "new"],
    images: [
      "/images/new/demonslayer1.png",
      "/images/new/demonslayer2.png"
    ],
    colors: ["White"],
    sizes: ["M"],
    discountPrice: 20.00
  },
  {
    _id: "price_1RcpI3CTQhRcTCnZFQ6MZ9hX",
    translations: {
      en: {
        name: "Naruto Team 7 ",
        description: "A Naruto Sasuke Sakura Kakashi",
        composition: "80% cotton, 20% polyester",
        care: "Machine wash cold. Do not bleach. Tumble dry low.",
      },
      pt: {
        name: "Naruto Equipa 7 T-Shirt",
        description: "T-Shirt de Naruto Sasuke Sakura e Kakashi",
        composition: "80% algodão, 20% poliéster",
        care: "Lavar na máquina em água fria. Não alvejar. Secar em baixa temperatura.",
      }
    },
    price: 48.00,
    categories: ["man", "new"],
    images: [
      "/images/new/naruto1.png",
      "/images/new/naruto2.png"
    ],
    colors: ["Black"],
    sizes: ["M"],
    discountPrice: 40.00
  },
  {
    _id: "price_1RcpJECTQhRcTCnZ7eNVJb01",
    translations: {
      en: {
        name: "Mandala Kaos Patch Fibonacci",
        description: "-",
        composition: "-",
        care: "-",
      },
      pt: {
        name: "Mandala Kaos Patch Fibonacci",
        description: "-",
        composition: "-",
        care: "-",
        
      }
    },
    price: 10.00,
    categories: ["partnerships", "accessories"],
    images: [
      "/images/parcerias/mandalakaos_fibonacci1.png",
      "/images/parcerias/mandalakaos_fibonacci2.png"
    ],
    colors: ["White"],
    sizes: ["M"]
  },
  {
    _id: "price_1RcpgqCTQhRcTCnZ7ktNsoWz",
    translations: {
      en: {
        name: "GIЯLS Art",
        description: "Artist: Andre Daniel",
        composition: "Dimentions: 80x48 cm",
        care: "-",
      },
      pt: {
        name: "GIЯLS Arte",
        description: "Artista: Andre Daniel",
        composition: "Dimensoes: 80x48 cm",
        care: "-",
        
      }
    },
    price: 777.00,
    categories: ["art"],
    images: [
      "/images/art/girls1.png",
      "/images/art/girls2.png"
    ],
    colors: ["White"],
    sizes: ["M"],
    discountPrice: 369.00
  }
];
