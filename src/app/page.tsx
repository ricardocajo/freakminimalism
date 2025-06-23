import { Suspense } from "react";
import { products } from '@/data/products';
import { Products } from "../components/products/Products";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";

const Home = async () => {
  return (
    <section className="">
      <Suspense
        fallback={<ProductSkeleton extraClassname="" numberProducts={18} />}
      >
        <AllProducts />
      </Suspense>
    </section>
  );
};

const AllProducts = () => {
  const productsData = products;

  return <Products products={productsData} extraClassname="" />;
};

export default Home;
