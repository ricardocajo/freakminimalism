export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  colors: string[];
  sizes: string[];
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
};
