import { Product } from "@/types/types";
import { products as productData } from "@/data/products";

export const products: Product[] = productData.map(product => ({
  ...product,
  id: product._id,
  name: product.translations.en.name,
  featured: false,
  new: product.categories.includes('new'),
  categories: product.categories
}));

export const getAllProducts = () => {
  return products;
};

export const getRandomProducts = (productId: string) => {
  const filteredProducts = products.filter((product) => product._id !== productId);
  return filteredProducts.slice(0, 6);
};

type CategoryMap = {
  [key: string]: string;
};

export const getCategoryProducts = (category: string) => {
  const mappedCategory = category.replace('category-', '');
  return products.filter((product) => product.categories.some(cat => cat.toLowerCase() === mappedCategory.toLowerCase()));
};

export const getProduct = (productId: string) => {
  return products.find((product) => product._id === productId);
};
