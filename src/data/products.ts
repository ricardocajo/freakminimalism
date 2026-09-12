import type { Product } from "@/types/types";
import { mixProducts } from "@/data/mixProducts";

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
    categories: ["3dworks"],
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
    categories: ["3dworks"],
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
    categories: ["3dworks"],
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
    categories: ["3dworks"],
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
    categories: ["3dworks"],
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
    categories: ["accessories"],
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
    categories: ["hats"],
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
    categories: ["hats"],
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
      en: { name: "MandalaKaos Baseline Panama Hat", description: "", composition: "", care: "" },
      pt: { name: "Panamá MandalaKaos Baseline", description: "", composition: "", care: "" },
    },
    price: 18,
    categories: ["hats", "parcerias"],
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
      en: { name: "MandalaKaos Panama Hat", description: "", composition: "", care: "" },
      pt: { name: "Panamá MandalaKaos", description: "", composition: "", care: "" },
    },
    price: 18,
    categories: ["hats", "parcerias"],
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
      en: { name: "Pokemon Panama Hat", description: "", composition: "", care: "" },
      pt: { name: "Panamá Pokemon", description: "", composition: "", care: "" },
    },
    price: 17,
    categories: ["hats"],
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
    categories: ["hats", "kids"],
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
    categories: ["hats"],
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
    categories: ["hats"],
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
    categories: ["hats"],
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
      en: { name: "Velhote Hoodie", description: "", composition: "", care: "" },
      pt: { name: "Hoodie Velhote", description: "", composition: "", care: "" },
    },
    price: 36,
    categories: ["man"],
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
    categories: ["man"],
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
    categories: ["woman"],
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
    categories: ["woman"],
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
    categories: ["accessories", "parcerias"],
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
    categories: ["man"],
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
    categories: ["man"],
    images: [
      "/images/products/courage-dog-set-2/1.webp",
      "/images/products/courage-dog-set-2/2.webp",
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
    categories: ["woman"],
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
    categories: ["accessories", "parcerias"],
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
    categories: ["woman"],
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
    categories: ["man"],
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
    categories: ["woman"],
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
    categories: ["kids"],
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
    categories: ["man"],
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
    categories: ["woman"],
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
    categories: ["man"],
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
    categories: ["man"],
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
    categories: ["woman"],
    images: [
      "/images/products/sunflower-tshirt/1.webp",
      "/images/products/sunflower-tshirt/2.webp",
    ],
    colors: ["Black"],
    sizes: ["M"],
  },
  {
    _id: "price_1UEpN8CTQhRcTCnZRFdNcLLf",
    translations: {
      en: { name: "Montijo Tote Bag", description: "", composition: "", care: "" },
      pt: { name: "Tote Bag Montijo", description: "", composition: "", care: "" },
    },
    price: 10,
    categories: ["accessories"],
    images: [
      "/images/products/montijo-totebag/1.webp",
      "/images/products/montijo-totebag/2.webp",
    ],
    colors: ["Black"],
    sizes: ["Tamanho Único"],
  },
  {
    _id: "price_1UEpN9CTQhRcTCnZ5dLMtRT0",
    translations: {
      en: { name: "Feather Earring", description: "", composition: "", care: "" },
      pt: { name: "Brinco Pena", description: "", composition: "", care: "" },
    },
    price: 5,
    categories: ["artesanato"],
    images: [
      "/images/products/feather-earring/1.webp",
      "/images/products/feather-earring/2.webp",
    ],
    colors: ["Pink"],
    sizes: ["Tamanho Único"],
  },
  {
    _id: "price_1UEpNACTQhRcTCnZggfFb7bX",
    translations: {
      en: { name: "Medium Dreamcatcher", description: "", composition: "", care: "" },
      pt: { name: "Espanta-Espíritos Médio", description: "", composition: "", care: "" },
    },
    price: 10,
    categories: ["artesanato"],
    images: [
      "/images/products/dreamcatcher-medium/1.webp",
      "/images/products/dreamcatcher-medium/2.webp",
    ],
    colors: ["Purple"],
    sizes: ["Tamanho Único"],
  },
  {
    _id: "price_1UEpNBCTQhRcTCnZZX0dcdRD",
    translations: {
      en: { name: "Beaded Bracelet", description: "", composition: "", care: "" },
      pt: { name: "Pulseira de Contas", description: "", composition: "", care: "" },
    },
    price: 2.5,
    categories: ["artesanato"],
    images: [
      "/images/products/beaded-bracelet/1.webp",
      "/images/products/beaded-bracelet/2.webp",
    ],
    colors: ["Purple"],
    sizes: ["Tamanho Único"],
  },
  {
    _id: "price_1UEpNCCTQhRcTCnZ18VuBgyN",
    translations: {
      en: { name: "Painting “04.44”", description: "", composition: "", care: "" },
      pt: { name: "Pintura «04.44»", description: "", composition: "", care: "" },
    },
    price: 77,
    categories: ["art"],
    images: [
      "/images/products/painting-0444/1.webp",
      "/images/products/painting-0444/2.webp",
    ],
    colors: ["Teal"],
    sizes: ["Tamanho Único"],
  },
  {
    _id: "price_1UEpNDCTQhRcTCnZVzw3sfYC",
    translations: {
      en: { name: "Painting “-”", description: "", composition: "", care: "" },
      pt: { name: "Pintura «-»", description: "", composition: "", care: "" },
    },
    price: 90,
    categories: ["art"],
    images: [
      "/images/products/painting-dash/1.webp",
      "/images/products/painting-dash/2.webp",
    ],
    colors: ["Green"],
    sizes: ["Tamanho Único"],
  },
];

// Ordered for display rather than for maintenance: mixProducts interleaves the
// categories so the grid never shows one solid block per family. Use this for
// any customer-facing listing (home page, search); `products` stays complete and
// in source order so direct product URLs and generateStaticParams keep working.
//
// Anything tagged `test` is excluded: add such an entry to run a real checkout
// against a cheap product without exposing it to customers. It stays reachable
// at /test/<price-id>, is left out of "you might also like", renders
// noindex/nofollow, and is exempt from the shipping rate.
export const storefrontProducts: Product[] = mixProducts(
  products.filter((product) => !product.categories.includes("test")),
);
