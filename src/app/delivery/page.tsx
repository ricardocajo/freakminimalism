"use client";
import { useTranslation } from "react-i18next";
import { Truck, Clock, Package, Plane, Palette } from "lucide-react";

interface DeliveryTranslations {
  title: string;
  description: string;
  shippingOptions: {
    title: string;
    standard: { title: string; duration: string; price: string };
    personalize: { title: string; duration: string };
    processing: { title: string; duration: string };
    islands: { title: string; duration: string; price: string };
    intercontinental: { title: string; duration: string; price: string };
  };
  tracking: { title: string; description: string };
}

export default function DeliveryPage() {
  const { t } = useTranslation();
  const translations = t("deliveryPage", { returnObjects: true }) as DeliveryTranslations;

  const options = [
    {
      icon: Palette,
      title: translations.shippingOptions.personalize.title,
      duration: translations.shippingOptions.personalize.duration,
      price: null,
    },
    {
      icon: Clock,
      title: translations.shippingOptions.processing.title,
      duration: translations.shippingOptions.processing.duration,
      price: null,
    },
    {
      icon: Truck,
      title: translations.shippingOptions.standard.title,
      duration: translations.shippingOptions.standard.duration,
      price: translations.shippingOptions.standard.price,
    },
    {
      icon: Package,
      title: translations.shippingOptions.islands.title,
      duration: translations.shippingOptions.islands.duration,
      price: translations.shippingOptions.islands.price,
    },
    {
      icon: Plane,
      title: translations.shippingOptions.intercontinental.title,
      duration: translations.shippingOptions.intercontinental.duration,
      price: translations.shippingOptions.intercontinental.price,
    },
  ];

  return (
    <main className="flex flex-col gap-12 max-w-5xl mx-auto px-4 py-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">{translations.title}</h1>
        <p className="text-lg text-[#A1A1A1] max-w-2xl">{translations.description}</p>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-5">{translations.shippingOptions.title}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {options.map(({ icon: Icon, title, duration, price }) => (
            <div
              key={title}
              className="flex gap-4 p-5 rounded-lg border border-solid border-border-primary bg-background-secondary transition-colors hover:border-[#3a3a3a]"
            >
              <div className="flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-[#0C0C0C] border border-border-primary">
                <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-[#A1A1A1]">{duration}</p>
                {price ? <p className="text-sm text-[#A1A1A1]">{price}</p> : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="p-6 border border-solid border-border-primary rounded-lg bg-background-secondary">
        <h2 className="text-xl font-semibold mb-3">{translations.tracking.title}</h2>
        <p className="text-[#A1A1A1]">{translations.tracking.description}</p>
      </section>
    </main>
  );
}
