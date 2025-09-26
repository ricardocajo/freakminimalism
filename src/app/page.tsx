import { Suspense } from "react";
import { products } from '@/data/products';
import { Products } from "../components/products/Products";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";

const Home = async () => {
  return (
    <main>
      {/* Top tagline bar */}
      <section className="py-2 text-center">
        <span className="text-sm text-[#A1A1A1]">◐ 𝔇𝔦𝔣𝔣𝔢𝔯𝔢𝔫𝔱 𝔳𝔦𝔰𝔦𝔬𝔫, 𝔡𝔦𝔣𝔣𝔢𝔯𝔢𝔫𝔱 𝔰𝔱𝔶𝔩𝔢 ◑</span>
      </section>
      {/* Intro section - occupies top half of the screen (taller on mobile) */}
      <section className="min-h-[60vh] sm:min-h-[50vh] flex items-center justify-center px-4">
        <div className="max-w-3xl text-center space-y-4 about-contrast">
          <p className="text-lg leading-relaxed">
            Bem-vindo ao nosso website
          </p>
          <p className="text-lg leading-relaxed">
            Descobre a nossa coleção ou envia-nos a tua própria ideia 
            para criarmos algo só teu.
          </p>
        </div>
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
  const productsData = products;

  return <Products products={productsData} extraClassname="" />;
};

export default Home;
