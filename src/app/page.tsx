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
      {/* Intro section - occupies top half of the screen (taller on mobile)
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
      </section>*/}
      {/* Montra section */}
      <section className="min-h-[60vh] sm:min-h-[50vh] flex flex-col items-center justify-center px-4 py-8 space-y-6">
        <div className="w-full max-w-md">
          <img 
            src="/montra.jpg" 
            alt="Flyer da nossa coleção" 
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="text-center">
          <a 
            href="https://www.google.com/maps/place/FREAK+MINIMALISM/@38.705919,-8.9758421,897m/data=!3m2!1e3!4b1!4m6!3m5!1s0xd19394e41250b15:0x7c512b28289c73b5!8m2!3d38.7059148!4d-8.9732618!16s%2Fg%2F11yqtvgslz?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-lg hover:underline flex items-center justify-center gap-2"
          >
            📍 R. Alm. Cândido dos Reis 57, 2870-150 Montijo
          </a>
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
