import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import '@/styles/globals.css';
import "@/styles/globals.css";
import { I18nProvider } from "@/components/common/I18nProvider";
import { CartProvider } from "@/contexts/CartContext";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "./Providers";
import { I18nInitializer } from "@/components/common/I18nInitializer";

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  weight: ['300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: "Freak Minimalism",
  description: "Minimalist clothing store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt">
      <body className={`${quicksand.className} bg-[url('/fundo.jpeg')] bg-cover bg-center bg-fixed`} style={{ minHeight: '100vh' }}>
        <I18nProvider>
          <CartProvider>
            <Providers>
              <Navbar />
              <main className="pointer-events-auto">
                {children}
                <Toaster position="top-right" />
                <Analytics />
                <SpeedInsights />
              </main>
              <Footer />
            </Providers>
          </CartProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
