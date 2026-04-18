export type Subcategory = {
  name: string;
  path: string;
  image?: string;
};

export type Category = {
  name: string;
  subcategories: Subcategory[];
};

// Map color/file codes (e.g., "00" from "00.png") to human-readable labels.
export const COLOR_CODE_MAP: Record<string, string> = {
  "00": "Branco",
  "11": "Preto Escuro",
  "1L": "Azul Claro / Light Blue",
  "24": "Vermelho / Red",
  "2C": "Amarelo Solar",
  "32": "Laranja",
  "33": "Verde Escuro / Dark Green",
  "37": "Castanho",
  "3E": "Verde Garrafa / Bottle Green",
  "42": "Verde",
  "44": "Verde Escuro",
  "48": "Laranja / Orange",
  "4F": "Verde Orquidia",
  "4K": "Bege / Beige",
  "4L": "Castanho Urbano",
  "52": "Vermelho",
  "54": "Bordeaux",
  "55": "Magenta / Magenta",
  "5J": "Coral / Coral",
  "5N": "Roxo Radiante",
  "5P": "Pêssego / Peach",
  "5R": "Cereja / Cherry",
  "62": "Azul Milenio",
  "63": "Cinza Escuro / Dark Gray",
  "64": "Cinza Claro / Light Gray",
  "6D": "Carvão / Charcoal",
  "6K": "Grafite / Graphite",
  "6M": "Antracite / Anthracite",
  "6N": "Prata / Silver",
  "6P": "Chumbo / Lead",
  "6T": "Petróleo / Teal",
  "6W": "Azul Petróleo / Petrol Blue",
  "6X": "Azul Escuro / Dark Blue",
  "6Y": "Azul Noite / Midnight Blue",
  "80": "Verde Lima / Lime",
  "81": "Bege",
  "92": "Cinzento Claro",
  "93": "Cinzento Escuro",
  "96": "Preto Claro",
  B5: "Vermelho e Branco",
  B6: "Azul e Branco",
};

export const CATEGORIES: Category[] = [
  { name: "Patches", subcategories: [] },
  { name: "Pedido Especial", subcategories: [] },
  {
    name: "King",
    subcategories: [
      { name: "T-Shirt", path: "/personalizar/KING/T-SHIRT", image: "/images/personalizar/KING/T-SHIRT/150/Luanda_Black_Front.jpg" },
      { name: "Hood", path: "/personalizar/KING/HOOD", image: "/images/personalizar/KING/HOOD/00.png" },
      { name: "Sweat", path: "/personalizar/KING/SWEAT", image: "/images/personalizar/KING/SWEAT/00.png" },
      { name: "Polo", path: "/personalizar/KING/POLO", image: "/images/personalizar/KING/POLO/00.png" },
      { name: "Manga Comprida", path: "/personalizar/KING/M.COMPRIDA" },
      { name: "Zipp", path: "/personalizar/KING/ZIPP", image: "/images/personalizar/KING/ZIPP/95.png" },
    ],
  },
  {
    name: "Queen",
    subcategories: [
      { name: "T-Shirt", path: "/personalizar/QUEEN/T-SHIRT", image: "/images/personalizar/QUEEN/T-SHIRT/150/Luanda_Black_Front.jpg" },
      { name: "Hood", path: "/personalizar/QUEEN/HOOD", image: "/images/personalizar/QUEEN/HOOD/00.png" },
      { name: "Sweat", path: "/personalizar/QUEEN/SWEAT", image: "/images/personalizar/QUEEN/SWEAT/00.png" },
      { name: "Polo", path: "/personalizar/QUEEN/POLO", image: "/images/personalizar/QUEEN/POLO/00.png" },
      {
        name: "Manga Comprida",
        path: "/personalizar/QUEEN/MANGA CUMPRIDA",
        image: "/images/personalizar/QUEEN/MANGA CUMPRIDA/Bucharest Women/Bucharest Women/Bucharest Women_Black_Front.jpg",
      },
      { name: "Zipp", path: "/personalizar/QUEEN/ZIPP", image: "/images/personalizar/QUEEN/ZIPP/95.png" },
      {
        name: "Polar Gama Women",
        path: "/personalizar/QUEEN/POLAR",
        image: "/images/personalizar/QUEEN/POLAR GAMA WOMEN/300/preto_f.jpg",
      },
    ],
  },
  {
    name: "Kid",
    subcategories: [
      { name: "T-Shirt", path: "/personalizar/KID/T-SHIRT", image: "/images/personalizar/KID/T-SHIRT/Ankara Kids_Black_Front.jpg" },
      { name: "Calças", path: "/personalizar/KID/CALCAS", image: "/images/personalizar/KID/CALCAS/preto_f.jpg" },
      { name: "Polos", path: "/personalizar/KID/POLOS", image: "/images/personalizar/KID/POLOS/Adam kids_Black_Front.jpg" },
      { name: "Hooded Kids", path: "/personalizar/KID/HOODEDKIDS", image: "/images/personalizar/KID/HOODEDKIDS/bc560103.jpg" },
      { name: "Sweat", path: "/personalizar/KID/SWEAT", image: "/images/personalizar/KID/SWEAT/11.png" },
      { name: "Snapback", path: "/personalizar/KID/SNAPBACK", image: "/images/personalizar/KID/SNAPBACK/11.png" },
      { name: "Zipp Kids", path: "/personalizar/KID/ZIPPKIDS", image: "/images/personalizar/KID/ZIPPKIDS/11.png" },
      { name: "Fraser", path: "/personalizar/KID/FRASER", image: "/images/personalizar/KID/FRASER/11.png" },
      { name: "Panama", path: "/personalizar/KID/PANAMA", image: "/images/personalizar/KID/PANAMA/11.png" },
    ],
  },
  {
    name: "Unisex",
    subcategories: [
      { name: "Cavas", path: "/personalizar/UNISEX/CAVAS" },
      { name: "Oversize", path: "/personalizar/UNISEX/OVERSIZE", image: "/images/personalizar/UNISEX/OVERSIZE/fjord_preto_f.jpg" },
      { name: "Sweat Scarda", path: "/personalizar/UNISEX/SWEAT SCARDA" },
    ],
  },
  {
    name: "Chapéus",
    subcategories: [
      { name: "Basebol", path: "/personalizar/CHAPEUS/BASEBOL", image: "/images/personalizar/CHAPEUS/BASEBOL/00.png" },
      { name: "Boina", path: "/personalizar/CHAPEUS/BOINA", image: "/images/personalizar/CHAPEUS/BOINA/11.png" },
      { name: "Clássico", path: "/personalizar/CHAPEUS/CLASSICO", image: "/images/personalizar/CHAPEUS/CLASSICO/00.png" },
      { name: "Gola", path: "/personalizar/CHAPEUS/GOLA", image: "/images/personalizar/CHAPEUS/GOLA/11.png" },
      { name: "Gorro", path: "/personalizar/CHAPEUS/GORRO", image: "/images/personalizar/CHAPEUS/GORRO/11.png" },
      { name: "Panamá", path: "/personalizar/CHAPEUS/PANAMA", image: "/images/personalizar/CHAPEUS/PANAMA/00.png" },
      { name: "Panamá Curto", path: "/personalizar/CHAPEUS/PANAMACURTO", image: "/images/personalizar/CHAPEUS/PANAMACURTO/00.png" },
      { name: "Recy", path: "/personalizar/CHAPEUS/RECY", image: "/images/personalizar/CHAPEUS/RECY/00.png" },
      { name: "Snap Five", path: "/personalizar/CHAPEUS/SNAPFIVE", image: "/images/personalizar/CHAPEUS/SNAPFIVE/00.png" },
      { name: "Tradicional", path: "/personalizar/CHAPEUS/TRADICIONAL", image: "/images/personalizar/CHAPEUS/TRADICIONAL/00.png" },
      { name: "Whippy", path: "/personalizar/CHAPEUS/WHIPPY", image: "/images/personalizar/CHAPEUS/WHIPPY/52.png" },
      { name: "Zion", path: "/personalizar/CHAPEUS/ZION", image: "/images/personalizar/CHAPEUS/ZION/00.png" },
    ],
  },
];

// Format raw color labels from filenames into pretty labels.
export const prettyColorLabel = (raw: string) => {
  let s = raw.replace(/_/g, " ").replace(/\s+/g, " ").trim();
  const small = new Set(["de", "da", "do", "das", "dos", "e"]);
  s = s
    .split(" ")
    .map((w, i) => {
      const lw = w.toLowerCase();
      if (i > 0 && small.has(lw)) return lw;
      return lw.charAt(0).toUpperCase() + lw.slice(1);
    })
    .join(" ");
  return s
    .replace(/Medio/gi, "Médio")
    .replace(/Preto/gi, "Preto")
    .replace(/Cinza/gi, "Cinza")
    .replace(/Floresta/gi, "Floresta")
    .replace(/Marinho/gi, "Marinho");
};

export const WHATSAPP_PHONE = "351963601750";

export const VIEW_ORDER = ["Front", "Side", "Back"] as const;
export type View = (typeof VIEW_ORDER)[number];

export const VIEW_LABEL_PT: Record<View, string> = {
  Front: "Frente",
  Side: "Lado",
  Back: "Costas",
};

export const isModelWithDensity = (cat?: string, model?: string) =>
  (model === "T-SHIRT" || model === "POLO") && (cat === "KING" || cat === "QUEEN");

export const isQueenPolarWithGama = (cat?: string, model?: string) =>
  cat === "QUEEN" && model === "POLAR";

// Parse filename like "Luanda_Apple Green_Front.jpg" or "Ankara_Alperce_F.jpg"
export const parseTeeName = (name: string) => {
  const m = name.match(/^([^_]+)_(.+)_(Front|Side|Back|F|L|C)\.[^.]+$/i);
  if (!m) return null;
  const raw = m[3].toLowerCase();
  const view: View =
    raw === "f" ? "Front" : raw === "l" ? "Side" : raw === "c" ? "Back" : (m[3] as View);
  return { brand: m[1], color: m[2], view };
};

// Parse filename like "preto_f.jpg" (POLAR GAMA WOMEN set)
export const parsePolarGWName = (name: string) => {
  const m = name.match(/^([a-zA-Z_]+)_(f|l|c)\.[^.]+$/);
  if (!m) return null;
  const view: View = m[2] === "f" ? "Front" : m[2] === "l" ? "Side" : "Back";
  const color = m[1].replace(/_/g, " ");
  return { color, view };
};
