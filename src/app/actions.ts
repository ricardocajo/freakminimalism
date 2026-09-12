import { Product } from "@/types/types";
import { products as productData, storefrontProducts } from "@/data/products";
import { mixProducts, mixProductsRotated } from "@/data/mixProducts";

export const products: Product[] = productData;

// Drawn from storefrontProducts, so test products follow the same visibility
// switch as every other listing. Rotated by the current product's ID so
// different product pages suggest different pieces instead of every page
// showing the same first six.
export const getRandomProducts = (productId: string) =>
  mixProductsRotated(
    storefrontProducts.filter((product) => product._id !== productId),
    productId,
  ).slice(0, 6);

// Map URL slugs to the category tags used in products.ts, so we don't have to
// rename the source data when the route name differs (e.g. /partnerships → parcerias).
const categorySlugAlias: Record<string, string> = {
  partnerships: "parcerias",
  handcraft: "artesanato",
};

export const getCategoryProducts = (category: string) => {
  const slug = category.replace("category-", "").toLowerCase();
  const resolved = categorySlugAlias[slug] ?? slug;
  // Mixed as well: even a single family reads better with its sub-groups
  // spread out.
  return mixProducts(
    products.filter((product) =>
      product.categories.some((cat) => cat.toLowerCase() === resolved),
    ),
  );
};

export const getProduct = (productId: string) =>
  products.find((product) => product._id === productId);

// Canonical URL for a product detail page. The route is /[category]/[id],
// so we need to pick a category for the path. Falls back to "shop" if the
// product is unknown or has no categories — the segment is cosmetic, so the
// page still renders.
export const productHref = (productId: string): string => {
  const product = getProduct(productId);
  const category = product?.categories?.[0] || "shop";
  return `/${category}/${productId}`;
};
