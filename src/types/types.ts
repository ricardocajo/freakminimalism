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
  translations: ProductTranslations;
  price: number;
  discountPrice?: number;
  images: string[];
  colors: string[];
  sizes: string[];
  categories: string[];
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
  stripePriceId?: string;
}
