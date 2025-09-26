import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import '@/styles/globals.css';
import "@/styles/globals.css";
import { I18nProvider } from "@/components/common/I18nProvider";
import { CartProvider } from "@/contexts/CartContext";
import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "./Providers";
import { I18nInitializer } from "@/components/common/I18nInitializer";
import { Toaster } from "sonner";

// Client components wrapper
const ClientComponents = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Toaster position="top-right" />
      <Analytics />
      <SpeedInsights />
      <Footer />
    </>
  );
};

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  weight: ['300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: {
    default: "Freak Minimalism",
    template: "%s | Freak Minimalism",
  },
  description:
    "Freak Minimalism — minimalist apparel and custom designs. Descobre a nossa coleção e envia-nos a tua ideia para criarmos algo só teu.",
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
              <ClientComponents>
                <main className="pointer-events-auto">
                  {children}
                </main>
              </ClientComponents>
            </Providers>
          </CartProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
