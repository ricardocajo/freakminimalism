import { Product } from "@/types/types";
import { products as productData } from "@/data/products";

export const products: Product[] = productData;

export const getRandomProducts = (productId: string) =>
  products.filter((product) => product._id !== productId).slice(0, 6);

// Map URL slugs to the category tags used in products.ts, so we don't have to
// rename the source data when the route name differs (e.g. /partnerships → parcerias).
const categorySlugAlias: Record<string, string> = {
  partnerships: "parcerias",
};

export const getCategoryProducts = (category: string) => {
  const slug = category.replace("category-", "").toLowerCase();
  const resolved = categorySlugAlias[slug] ?? slug;
  return products.filter((product) =>
    product.categories.some((cat) => cat.toLowerCase() === resolved),
  );
};

export const getProduct = (productId: string) =>
  products.find((product) => product._id === productId);

// Canonical URL for a product detail page. The route is /[category]/[id],
// so we need to pick a category for the path. Falls back to "new" if the
// product is unknown or has no categories.
export const productHref = (productId: string): string => {
  const product = getProduct(productId);
  const category = product?.categories?.[0] || "new";
  return `/${category}/${productId}`;
};
