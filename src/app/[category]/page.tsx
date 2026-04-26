import { Products } from "@/components/products/Products";
import { getCategoryProducts } from "../actions";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import { Suspense } from "react";

type Props = {
  params: Promise<{ category: string }>;
};

const capitalizeFirstLetter = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const capitalized = capitalizeFirstLetter(category);

  return {
    title: capitalized,
    description: `${capitalized} — Descobre peças minimalistas e personalizáveis da Freak Minimalism.`,
  };
}

const CategoryProducts = ({ category }: { category: string }) => {
  const products = getCategoryProducts(category);
  return <Products products={products} extraClassname={`category-${category.toLowerCase()}`} />;
};

const CategoryPage = async ({ params }: Props) => {
  const { category } = await params;
  return (
    <section>
      <Suspense fallback={<ProductSkeleton extraClassname="" numberProducts={6} />}>
        <CategoryProducts category={category} />
      </Suspense>
    </section>
  );
};

export default CategoryPage;
