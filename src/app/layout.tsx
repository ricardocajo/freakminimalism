import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { Suspense } from "react";
import "@/styles/globals.css";
import { I18nProvider } from "@/components/common/I18nProvider";
import { CartProvider } from "@/contexts/CartContext";
import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "./Providers";
import { Toaster } from "sonner";

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
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
      <body className={quicksand.className} style={{ minHeight: "100vh" }}>
        <I18nProvider>
          <CartProvider>
            <Providers>
              {/* Navbar reads useSearchParams() — Next 14.2+ requires a
                * Suspense boundary so static prerender can bail out cleanly. */}
              <Suspense fallback={null}>
                <Navbar />
              </Suspense>
              <main className="pointer-events-auto">{children}</main>
              <Toaster position="top-right" />
              <Analytics />
              <SpeedInsights />
              <Footer />
            </Providers>
          </CartProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
