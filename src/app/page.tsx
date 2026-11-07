import { Suspense } from "react";
import { storefrontProducts } from '@/data/products';
import { Products } from "../components/products/Products";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";

const Home = async () => {
  return (
    <main>
      {/* Top tagline bar */}
      <section className="py-2 text-center">
        <span className="text-sm text-[#A1A1A1]">◐ 𝔇𝔦𝔣𝔣𝔢𝔯𝔢𝔫𝔱 𝔳𝔦𝔰𝔦𝔬𝔫, 𝔡𝔦𝔣𝔣𝔢𝔯𝔢𝔫𝔱 𝔰𝔱𝔶𝔩𝔢 ◑</span>
      </section>
      {/* Mid-screen content: Products (original CTA remains within Products component) */}
      <section className="container mx-auto px-4">
        <Suspense fallback={<ProductSkeleton extraClassname="" numberProducts={18} />}>
          <AllProducts />
        </Suspense>
      </section>
    </main>
  );
};

const AllProducts = () => {
  const productsData = storefrontProducts;

  return <Products products={productsData} extraClassname="" />;
};

export default Home;
