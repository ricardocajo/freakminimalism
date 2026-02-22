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
    _id: "price_1T3f4wCTQhRcTCnZNDQh84Rk",
    translations: {
      en: {
        name: "Mushroom Hat",
        description: "Mushroom Panama Hat",
        composition: "",
        care: "",
      },
      pt: {
        name: "Panamá Cogumelo",
        description: "Panamá Cogumelo",
        composition: "",
        care: "",

      }
    },
    price: 17.00,
    categories: ["hats"],
    images: [
      "/images/hats/mushroompanama1.png",
      "/images/hats/mushroompanama2.png"
    ],
    colors: ["Beige"],
    sizes: ["Tamanho Único"]
  },
  {
    _id: "price_1T3f2ECTQhRcTCnZOi6BdSAb",
    translations: {
      en: {
        name: "Montijo Clay Vase",
        description: "A classic freak-minimalism t-shirt, do you Lick?",
        composition: "Clay",
        care: "-"
      },
      pt: {
        name: "Jarro Montijo",
        description: "Vaso de Barro Montijo",
        composition: "Barro",
        care: "-"
      }
    },
    price: 7,
    categories: ["art"],
    images: [
      "/images/art/vasomontijo1.png",
      "/images/art/vasomontijo2.png"
    ],
    colors: ["White"],
    sizes: ["Tamanho Único"]
  },
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
    _id: "price_1RgOpkCTQhRcTCnZTlXbDTe8",
    translations: {
      en: {
        name: "Butterfly Hat",
        description: "",
        composition: "",
        care: "",
      },
      pt: {
        name: "Chapéu Borboleta",
        description: "",
        composition: "",
        care: "",

      }
    },
    price: 20.00,
    categories: ["hats"],
    images: [
      "/images/hats/borboleta1.png",
      "/images/hats/borboleta2.png"
    ],
    colors: ["Black"],
    sizes: ["Tamanho Único"]
  },
  {
    _id: "price_1T3fFPCTQhRcTCnZ3aaI3igs",
    translations: {
      en: {
        name: "MandalaKaos Baseline Hat",
        description: "Hat from MandalaKaos Baseline",
        composition: "",
        care: "",
      },
      pt: {
        name: "Chapéu MandalaKaos Baseline",
        description: "Chapéu da MandalaKaos Baseline",
        composition: "",
        care: "",

      }
    },
    price: 20.00,
    categories: ["hats", "parcerias"],
    images: [
      "/images/parcerias/mandalabaselinehat1.png",
      "/images/parcerias/mandalabaselinehat2.png"
    ],
    colors: ["Black"],
    sizes: ["Tamanho Único"]
  },
  {
    _id: "price_1RcpR7CTQhRcTCnZ89F6D3KZ",
    translations: {
      en: {
        name: "FM Keychain",
        description: "",
        composition: "",
        care: "",
      },
      pt: {
        name: "Porta-Chaves FM",
        description: "",
        composition: "",
        care: "",

      }
    },
    price: 7.50,
    categories: ["accessories"],
    images: [
      "/images/acessorios/portachaves_fm1.png",
      "/images/acessorios/portachaves_fm2.png"
    ],
    colors: ["Black"],
    sizes: ["9x3cm"]
  },
  {
    _id: "price_1T3f3SCTQhRcTCnZnh2pvwAS",
    translations: {
      en: {
        name: "Montijo Clay Mug",
        description: "Montijo Clay Mug",
        composition: "Clay",
        care: "-",
      },
      pt: {
        name: "Caneca Montijo",
        description: "Caneca de Barro Montijo",
        composition: "Barro",
        care: "-",

      }
    },
    price: 6,
    categories: ["art"],
    images: [
      "/images/art/canecamontijo1.png",
      "/images/art/canecamontijo2.png"
    ],
    colors: ["White"],
    sizes: ["Tamanho Único"]
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
    colors: ["bisque"],
    sizes: ["Tamanho Único"],
    discountPrice: 369.00
  },
  {
    _id: "price_1T3f5kCTQhRcTCnZzgLMsVcW",
    translations: {
      en: {
        name: "Pokemon Hat",
        description: "Pokemon Panama Hat",
        composition: "",
        care: "",
      },
      pt: {
        name: "Chapéu Pokemon",
        description: "Panamá Pokemon",
        composition: "",
        care: "",

      }
    },
    price: 17.00,
    categories: ["hats"],
    images: [
      "/images/hats/pokemonpanama1.png",
      "/images/hats/pokemonpanama2.png"
    ],
    colors: ["Beige"],
    sizes: ["Tamanho Único"]
  },
  {
    _id: "price_1T3f7JCTQhRcTCnZ0ZWtiRF1",
    translations: {
      en: {
        name: "Montijo Clay Base",
        description: "Montijo Clay Base",
        composition: "Clay",
        care: "-",
      },
      pt: {
        name: "Base Montijo",
        description: "Base de Barro Montijo",
        composition: "Barro",
        care: "-",

      }
    },
    price: 8,
    categories: ["art"],
    images: [
      "/images/art/basemontijo1.png",
      "/images/art/basemontijo2.png"
    ],
    colors: ["White"],
    sizes: ["Tamanho Único"]
  }
];
