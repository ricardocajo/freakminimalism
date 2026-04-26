import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SingleProduct } from "@/components/products/SingleProduct";
import { Products } from "@/components/products/Products";
import { getProduct, getRandomProducts, products } from "@/app/actions";
import { YouMightAlsoLikeHeading } from "./YouMightAlsoLike";

interface ProductPageProps {
  params: Promise<{ category: string; id: string }>;
}

export function generateStaticParams() {
  // Pre-render every product page at build time. The category segment is
  // cosmetic for product lookups (id is unique), so we use the first
  // category tag the product carries to produce a sensible URL.
  return products.map((p) => ({
    category: (p.categories[0] || "new").toLowerCase(),
    id: p._id,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) {
    return { title: "Product not found" };
  }
  // Default metadata to English; the rendered UI hydrates with the user's
  // language client-side.
  const { name, description } = product.translations.en;
  return { title: name, description: description || undefined };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) {
    notFound();
  }
  const randomProducts = getRandomProducts(id);

  return (
    <section className="pt-14">
      <SingleProduct product={product} />
      <YouMightAlsoLikeHeading />
      <Products products={randomProducts} />
    </section>
  );
}
