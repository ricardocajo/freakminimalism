"use client";

import { SingleProduct } from "@/components/products/SingleProduct";
import { Products } from "@/components/products/Products";
import { getProduct, getRandomProducts } from "@/app/actions";
import { ProductDocument } from "@/types/types";
import { Suspense } from "react";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import SingleProductSkeleton from "@/components/skeletons/SingleProductSkeleton";
import { useTranslation } from "react-i18next";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = ({ params }: ProductPageProps) => {
  const { t } = useTranslation();
  const product = getProduct(params.id);
  const randomProducts = getRandomProducts(params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <section className="pt-14">
      <Suspense
        fallback={
          <div>
            <SingleProductSkeleton />
            <h2 className="mt-24 mb-5 text-xl font-bold sm:text-2xl">
              {t('productDetails.youMightAlsoLike')}
            </h2>
            <ProductSkeleton
              extraClassname={"colums-mobile"}
              numberProducts={6}
            />
          </div>
        }
      >
        <AllProducts id={params.id} />
      </Suspense>
    </section>
  );
};

interface AllProductsProps {
  id: string;
}

const AllProducts = ({ id }: AllProductsProps) => {
  const { t } = useTranslation();
  const product = getProduct(id);
  const randomProducts = getRandomProducts(id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <SingleProduct product={product} />
      <h2 className="mt-24 mb-5 text-xl font-bold sm:text-2xl">
        {t('productDetails.youMightAlsoLike')}
      </h2>
      <Products products={randomProducts} />
    </div>
  );
}

export default ProductPage;
