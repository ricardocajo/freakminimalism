import { Products } from "@/components/products/Products";
import { getCategoryProducts } from "../actions";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import { Suspense } from "react";

type Props = {
  params: {
    category: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const capitalizedCategory = capitalizeFirstLetter(params.category);

  return {
    title: `${capitalizedCategory}`,
    description: `${capitalizedCategory} — Descobre peças minimalistas e personalizáveis da Freak Minimalism.`,
  };
}

const CategoryPage = async ({ params }: Props) => {
  return (
    <section className="">
      <Suspense
        fallback={<ProductSkeleton extraClassname="" numberProducts={6} />}
      >
        <CategoryProducts category={params.category} />
      </Suspense>
    </section>
  );
};

const CategoryProducts = async ({ category }: { category: string }) => {
  const products = await getCategoryProducts(category);

  return <Products products={products} extraClassname={`category-${category.toLowerCase()}`} />;
};

export default CategoryPage;
