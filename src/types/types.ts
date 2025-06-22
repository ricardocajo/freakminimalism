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

export interface Product {
  _id: string;
  name: string;
  translations: ProductTranslations;
  price: number;
  discountPrice?: number;
  images: string[];
  colors: string[];
  sizes: string[];
  categories: string[];
  featured?: boolean;
  new?: boolean;
}

export type ProductDocument = Product;

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  color: string;
  size: string;
  image: string;
  quantity: number;
  featured?: boolean;
  new?: boolean;
  stripePriceId: string;
}
