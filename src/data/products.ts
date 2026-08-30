import type { Product } from "@/types/types";

// Source of truth for the catalogue. Every `_id` must be the Stripe Price ID
// for that product — it is passed straight to Stripe Checkout as the line item.
export const products: Product[] = [
  {
    _id: "price_1UA9cKCTQhRcTCnZEgjfaYAM",
    translations: {
      en: { name: "3D Leaf Ashtray", description: "", composition: "", care: "" },
      pt: { name: "Cinzeiro Folha 3D", description: "", composition: "", care: "" },
    },
    price: 10,
    categories: ["3dworks", "new"],
    images: [
      "/images/products/ashtray-set-1/1.webp",
      "/images/products/ashtray-set-1/2.webp",
    ],
    colors: ["Black"],
    sizes: ["Tamanho Único"],
  },
  {
    _id: "price_1UA9cKCTQhRcTCnZbIwpmV1u",
    translations: {
      en: { name: "3D Pentagram Ashtray", description: "", composition: "", care: "" },
      pt: { name: "Cinzeiro Pentagrama 3D", description: "", composition: "", care: "" },
    },
    price: 13,
    categories: ["3dworks", "new"],
    images: [
      "/images/products/ashtray-set-2/1.webp",
      "/images/products/ashtray-set-2/2.webp",
    ],
    colors: ["Black"],
    sizes: ["Tamanho Único"],
  },
  {
    _id: "price_1RcpQdCTQhRcTCnZnYk8yxli",
    translations: {
      en: { name: "3D Hex Case", description: "", composition: "", care: "" },
      pt: { name: "Caixa Hexagonal 3D", description: "", composition: "", care: "" },
    },
    price: 15,
    categories: ["3dworks", "new"],
    images: [
      "/images/products/box-set-1/1.webp",
      "/images/products/box-set-1/2.webp",
    ],
    colors: ["Grey"],
    sizes: ["Tamanho Único"],
  },
  {
    _id: "price_1UA9cLCTQhRcTCnZGag54zzs",
    translations: {
      en: { name: "3D Amp Pick Holder", description: "", composition: "", care: "" },
      pt: { name: "Suporte de Palhetas 3D", description: "", composition: "", care: "" },
    },
    price: 10,
    categories: ["3dworks", "new"],
    images: [
      "/images/products/guitar-picks/1.webp",
      "/images/products/guitar-picks/2.webp",
    ],
    colors: ["Orange"],
    sizes: ["Tamanho Único"],
  },
  {
    _id: "price_1UA9cMCTQhRcTCnZrsyUGosz",
    translations: {
      en: { name: "3D Frog Reco-Reco", description: "", composition: "", care: "" },
      pt: { name: "Reco-Reco Sapo 3D", description: "", composition: "", care: "" },
    },
    price: 10,
    categories: ["3dworks", "new"],
    images: [
      "/images/products/reco-reco/1.webp",
      "/images/products/reco-reco/2.webp",
    ],
    colors: ["Green"],
    sizes: ["Tamanho Único"],
  },
  {
    _id: "price_1UA9cNCTQhRcTCnZutnrWr17",
    translations: {
      en: { name: "Montijo Apron", description: "", composition: "", care: "" },
      pt: { name: "Avental Montijo", description: "", composition: "", care: "" },
    },
    price: 13,
    categories: ["accessories", "new"],
    images: [
      "/images/products/montijo-apron/1.webp",
      "/images/products/montijo-apron/2.webp",
    ],
    colors: ["Black"],
    sizes: ["Tamanho Único"],
  },
  {
    _id: "price_1RgOpkCTQhRcTCnZTlXbDTe8",
    translations: {
      en: { name: "Butterfly Cap", description: "", composition: "", care: "" },
      pt: { name: "Boné Borboleta", description: "", composition: "", care: "" },
    },
    price: 20,
    categories: ["hats", "new"],
    images: [
      "/images/products/butterfly-hat/1.webp",
      "/images/products/butterfly-hat/2.webp",
    ],
    colors: ["Black"],
    sizes: ["Tamanho Único"],
  },
  {
    _id: "price_1RgOxCCTQhRcTCnZBUQuVBzN",
    translations: {
      en: { name: "FM Cap", description: "", composition: "", care: "" },
      pt: { name: "Boné FM", description: "", composition: "", care: "" },
    },
    price: 17,
    categories: ["hats", "new"],
    images: [
      "/images/products/fm-hat/1.webp",
      "/images/products/fm-hat/2.webp",
    ],
    colors: ["Black"],
    sizes: ["Tamanho Único"],
  },
  {
    _id: "price_1T3fFPCTQhRcTCnZ3aaI3igs",
    translations: {
      en: { name: "MandalaKaos Baseline Hat", description: "", composition: "", care: "" },
      pt: { name: "Chapéu MandalaKaos Baseline", description: "", composition: "", care: "" },
    },
    price: 18,
    categories: ["hats", "parcerias", "new"],
    images: [
      "/images/products/mandalakaos-baseline-hat/1.webp",
      "/images/products/mandalakaos-baseline-hat/2.webp",
    ],
    colors: ["Black"],
    sizes: ["Tamanho Único"],
  },
  {
    _id: "price_1UA9cOCTQhRcTCnZE80dbic3",
    translations: {
      en: { name: "MandalaKaos Bucket Hat", description: "", composition: "", care: "" },
      pt: { name: "Chapéu MandalaKaos", description: "", composition: "", care: "" },
    },
    price: 18,
    categories: ["hats", "parcerias", "new"],
    images: [
      "/images/products/mandalakaos-hat-set-1/1.webp",
      "/images/products/mandalakaos-hat-set-1/2.webp",
    ],
    colors: ["Black"],
    sizes: ["Tamanho Único"],
  },
  {
    _id: "price_1T3f5kCTQhRcTCnZzgLMsVcW",
    translations: {
      en: { name: "Pokemon Bucket Hat", description: "", composition: "", care: "" },
      pt: { name: "Chapéu Pokemon", description: "", composition: "", care: "" },
    },
    price: 17,
    categories: ["hats", "new"],
    images: [
      "/images/products/pokemon-hat/1.webp",
      "/images/products/pokemon-hat/2.webp",
    ],
    colors: ["Black"],
    sizes: ["Tamanho Único"],
  },
  {
    _id: "price_1UA9cQCTQhRcTCnZoOFtm1SB",
    translations: {
      en: { name: "Unicorn Cap", description: "", composition: "", care: "" },
      pt: { name: "Boné Unicórnio", description: "", composition: "", care: "" },
    },
    price: 10,
    categories: ["hats", "new"],
    images: [
      "/images/products/unicorn-hat/1.webp",
      "/images/products/unicorn-hat/2.webp",
    ],
    colors: ["Pink"],
    sizes: ["Tamanho Único"],
  },
  {
    _id: "price_1UA9cRCTQhRcTCnZqo7Rs5kc",
    translations: {
      en: { name: "Wings Cap", description: "", composition: "", care: "" },
      pt: { name: "Boné Asas", description: "", composition: "", care: "" },
    },
    price: 16,
    categories: ["hats", "new"],
    images: [
      "/images/products/wings-hat/1.webp",
      "/images/products/wings-hat/2.webp",
      "/images/products/wings-hat/3.webp",
      "/images/products/wings-hat/4.webp",
    ],
    colors: ["Black"],
    sizes: ["Tamanho Único"],
  },
  {
    _id: "price_1UA9cSCTQhRcTCnZVjwDl8cf",
    translations: {
      en: { name: "FREAK Beanie", description: "", composition: "", care: "" },
      pt: { name: "Gorro FREAK", description: "", composition: "", care: "" },
    },
    price: 10,
    categories: ["hats", "new"],
    images: [
      "/images/products/freak-beanie/1.webp",
      "/images/products/freak-beanie/2.webp",
    ],
    colors: ["Black"],
    sizes: ["Tamanho Único"],
  },
  {
    _id: "price_1UA9cSCTQhRcTCnZCtBPrhm5",
    translations: {
      en: { name: "FREAK Goggles Beanie", description: "", composition: "", care: "" },
      pt: { name: "Gorro FREAK Goggles", description: "", composition: "", care: "" },
    },
    price: 10,
    categories: ["hats", "new"],
    images: [
      "/images/products/freak-beanie-set-1/1.webp",
      "/images/products/freak-beanie-set-1/2.webp",
    ],
    colors: ["Black"],
    sizes: ["Tamanho Único"],
  },
  {
    _id: "price_1UA9cTCTQhRcTCnZIjUQ6TD7",
    translations: {
      en: { name: "Courage Dog Hoodie", description: "", composition: "", care: "" },
      pt: { name: "Hoodie Courage Dog", description: "", composition: "", care: "" },
    },
    price: 36,
    categories: ["woman", "new"],
    images: [
      "/images/products/courage-dog-hoodie/1.webp",
      "/images/products/courage-dog-hoodie/2.webp",
    ],
    colors: ["Magenta"],
    sizes: ["M"],
  },
  {
    _id: "price_1UA9cUCTQhRcTCnZEfqP16OD",
    translations: {
      en: { name: "Fading Smile Hoodie", description: "", composition: "", care: "" },
      pt: { name: "Hoodie Fading Smile", description: "", composition: "", care: "" },
    },
    price: 36,
    categories: ["man", "new"],
    images: [
      "/images/products/fading-smile-hoodie/1.webp",
      "/images/products/fading-smile-hoodie/2.webp",
    ],
    colors: ["Grey"],
    sizes: ["M"],
  },
  {
    _id: "price_1UA9cVCTQhRcTCnZwUEPhkTk",
    translations: {
      en: { name: "Nami Hoodie", description: "", composition: "", care: "" },
      pt: { name: "Hoodie Nami", description: "", composition: "", care: "" },
    },
    price: 36,
    categories: ["woman", "new"],
    images: [
      "/images/products/nami-hoodie/1.webp",
      "/images/products/nami-hoodie/2.webp",
    ],
    colors: ["Dark Grey"],
    sizes: ["M"],
  },
  {
    _id: "price_1UA9cWCTQhRcTCnZH9ldnB14",
    translations: {
      en: { name: "Sun & Moon Hoodie", description: "", composition: "", care: "" },
      pt: { name: "Hoodie Sol e Lua", description: "", composition: "", care: "" },
    },
    price: 36,
    categories: ["man", "new"],
    images: [
      "/images/products/sun-moon-hoodie/1.webp",
      "/images/products/sun-moon-hoodie/2.webp",
    ],
    colors: ["Dark Grey"],
    sizes: ["M"],
  },
  {
    _id: "price_1UA9cXCTQhRcTCnZmCgzM7C7",
    translations: {
      en: { name: "MandalaKaos Keychain", description: "", composition: "", care: "" },
      pt: { name: "Porta-Chaves MandalaKaos", description: "", composition: "", care: "" },
    },
    price: 7.5,
    categories: ["accessories", "parcerias", "new"],
    images: [
      "/images/products/mandalakaos-keychain/1.webp",
      "/images/products/mandalakaos-keychain/2.webp",
    ],
    colors: ["Green"],
    sizes: ["Tamanho Único"],
  },
  {
    _id: "price_1UA9cYCTQhRcTCnZR6BYtDcJ",
    translations: {
      en: { name: "Courage Dog Tracksuit Set 1", description: "", composition: "", care: "" },
      pt: { name: "Conjunto Courage Dog 1", description: "", composition: "", care: "" },
    },
    price: 45,
    categories: ["man", "new"],
    images: [
      "/images/products/courage-dog-set-1/1.webp",
      "/images/products/courage-dog-set-1/2.webp",
    ],
    colors: ["Black"],
    sizes: ["M"],
  },
  {
    _id: "price_1UA9cZCTQhRcTCnZETSOCvlK",
    translations: {
      en: { name: "Courage Dog Tracksuit Set 2", description: "", composition: "", care: "" },
      pt: { name: "Conjunto Courage Dog 2", description: "", composition: "", care: "" },
    },
    price: 45,
    categories: ["man", "new"],
    images: [
      "/images/products/courage-dog-set-2/1.webp",
      "/images/products/courage-dog-set-2/2.webp",
    ],
    colors: ["Black"],
    sizes: ["M"],
  },
  {
    _id: "price_1RcpI3CTQhRcTCnZFQ6MZ9hX",
    translations: {
      en: { name: "Naruto Team 7 Sweatshirt", description: "", composition: "", care: "" },
      pt: { name: "Sweat Naruto Equipa 7", description: "", composition: "", care: "" },
    },
    price: 27.75,
    categories: ["man", "new"],
    images: [
      "/images/products/konoha-sweatshirt/1.webp",
      "/images/products/konoha-sweatshirt/2.webp",
    ],
    colors: ["Black"],
    sizes: ["M"],
  },
  {
    _id: "price_1UA9caCTQhRcTCnZBAcIq67E",
    translations: {
      en: { name: "Wonder Woman Hoodie", description: "", composition: "", care: "" },
      pt: { name: "Hoodie Wonder Woman", description: "", composition: "", care: "" },
    },
    price: 36,
    categories: ["woman", "new"],
    images: [
      "/images/products/wonder-woman-sweatshirt/1.webp",
      "/images/products/wonder-woman-sweatshirt/2.webp",
    ],
    colors: ["Black"],
    sizes: ["M"],
  },
  {
    _id: "price_1UA9cbCTQhRcTCnZMibfPIke",
    translations: {
      en: { name: "MandalaKaos Towel", description: "", composition: "", care: "" },
      pt: { name: "Toalha MandalaKaos", description: "", composition: "", care: "" },
    },
    price: 37,
    categories: ["accessories", "parcerias", "new"],
    images: [
      "/images/products/mandalakaos-towel/1.webp",
      "/images/products/mandalakaos-towel/2.webp",
      "/images/products/mandalakaos-towel/3.webp",
      "/images/products/mandalakaos-towel/4.webp",
    ],
    colors: ["Grey"],
    sizes: ["Tamanho Único"],
  },
  {
    _id: "price_1UA9ccCTQhRcTCnZdDqQi6qD",
    translations: {
      en: { name: "Freedom T-Shirt", description: "", composition: "", care: "" },
      pt: { name: "T-Shirt Freedom", description: "", composition: "", care: "" },
    },
    price: 17,
    categories: ["woman", "new"],
    images: [
      "/images/products/freedom-tshirt/1.webp",
      "/images/products/freedom-tshirt/2.webp",
    ],
    colors: ["White"],
    sizes: ["M"],
  },
  {
    _id: "price_1UA9cdCTQhRcTCnZ28vj3v8U",
    translations: {
      en: { name: "F.T.C. T-Shirt", description: "", composition: "", care: "" },
      pt: { name: "T-Shirt F.T.C.", description: "", composition: "", care: "" },
    },
    price: 17,
    categories: ["man", "new"],
    images: [
      "/images/products/ftc-tshirt/1.webp",
      "/images/products/ftc-tshirt/2.webp",
    ],
    colors: ["Black"],
    sizes: ["M"],
  },
  {
    _id: "price_1UA9ceCTQhRcTCnZ9T6KYVZx",
    translations: {
      en: { name: "Japan Mask T-Shirt", description: "", composition: "", care: "" },
      pt: { name: "T-Shirt Máscara Japonesa", description: "", composition: "", care: "" },
    },
    price: 17,
    categories: ["woman", "new"],
    images: [
      "/images/products/japan-mask-tshirt/1.webp",
      "/images/products/japan-mask-tshirt/2.webp",
    ],
    colors: ["White"],
    sizes: ["M"],
  },
  {
    _id: "price_1UA9cfCTQhRcTCnZx8GPMNeV",
    translations: {
      en: { name: "Minnie T-Shirt", description: "", composition: "", care: "" },
      pt: { name: "T-Shirt Minnie", description: "", composition: "", care: "" },
    },
    price: 17,
    categories: ["woman", "new"],
    images: [
      "/images/products/minnie-tshirt/1.webp",
      "/images/products/minnie-tshirt/2.webp",
    ],
    colors: ["Black"],
    sizes: ["M"],
  },
  {
    _id: "price_1UA9cgCTQhRcTCnZLmmTunvo",
    translations: {
      en: { name: "Montijo T-Shirt", description: "", composition: "", care: "" },
      pt: { name: "T-Shirt Montijo", description: "", composition: "", care: "" },
    },
    price: 17,
    categories: ["man", "new"],
    images: [
      "/images/products/montijo-tshirt/1.webp",
      "/images/products/montijo-tshirt/2.webp",
      "/images/products/montijo-tshirt/3.webp",
      "/images/products/montijo-tshirt/4.webp",
    ],
    colors: ["White"],
    sizes: ["M"],
  },
  {
    _id: "price_1UA9chCTQhRcTCnZx5boo6ol",
    translations: {
      en: { name: "Nezuko T-Shirt", description: "", composition: "", care: "" },
      pt: { name: "T-Shirt Nezuko", description: "", composition: "", care: "" },
    },
    price: 17,
    categories: ["woman", "new"],
    images: [
      "/images/products/nezuko-tshirt/1.webp",
      "/images/products/nezuko-tshirt/2.webp",
    ],
    colors: ["White"],
    sizes: ["M"],
  },
  {
    _id: "price_1UA9chCTQhRcTCnZy8A3QWyX",
    translations: {
      en: { name: "Solo Leveling T-Shirt", description: "", composition: "", care: "" },
      pt: { name: "T-Shirt Solo Leveling", description: "", composition: "", care: "" },
    },
    price: 17,
    categories: ["man", "new"],
    images: [
      "/images/products/solo-leveling-tshirt/1.webp",
      "/images/products/solo-leveling-tshirt/2.webp",
    ],
    colors: ["White"],
    sizes: ["M"],
  },
  {
    _id: "price_1UA9ciCTQhRcTCnZ4MyQ9c92",
    translations: {
      en: { name: "Substance Abuser T-Shirt", description: "", composition: "", care: "" },
      pt: { name: "T-Shirt Substance Abuser", description: "", composition: "", care: "" },
    },
    price: 17,
    categories: ["man", "new"],
    images: [
      "/images/products/substance-abuser-tshirt/1.webp",
      "/images/products/substance-abuser-tshirt/2.webp",
    ],
    colors: ["Black"],
    sizes: ["M"],
  },
  {
    _id: "price_1UA9cjCTQhRcTCnZXAlqZZLt",
    translations: {
      en: { name: "Sunflower T-Shirt", description: "", composition: "", care: "" },
      pt: { name: "T-Shirt Girassol", description: "", composition: "", care: "" },
    },
    price: 17,
    categories: ["woman", "new"],
    images: [
      "/images/products/sunflower-tshirt/1.webp",
      "/images/products/sunflower-tshirt/2.webp",
    ],
    colors: ["Black"],
    sizes: ["M"],
  },
  {
    // ---------------------------------------------------------------------
    // END-TO-END TEST PRODUCT
    // Not shown on the home page or in search (see storefrontProducts below),
    // but reachable directly at /test/<_id> so a real Stripe checkout can be
    // run against it. €0.50 is Stripe's minimum chargeable amount in EUR.
    // ---------------------------------------------------------------------
    _id: "price_1UA8kNCTQhRcTCnZTD3lJs5Y",
    translations: {
      en: { name: "E2E Test Product", description: "Internal test product. Do not order.", composition: "", care: "" },
      pt: { name: "Produto de Teste E2E", description: "Produto de teste interno. Não encomendar.", composition: "", care: "" },
    },
    price: 0.5,
    categories: ["test"],
    images: [
      "/images/products/fm-hat/1.webp",
    ],
    colors: ["Black"],
    sizes: ["Tamanho Único"],
  },
];

// Everything except internal test products. Use this for any customer-facing
// listing (home page, search); `products` stays complete so direct product
// URLs and generateStaticParams still resolve the test product.
export const storefrontProducts: Product[] = products.filter(
  (product) => !product.categories.includes("test"),
);
