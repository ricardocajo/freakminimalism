'use client';
import { useTranslation } from 'react-i18next';

interface DeliveryTranslations {
  title: string;
  description: string;
  shippingOptions: {
    title: string;
    standard: {
      title: string;
      duration: string;
      price: string;
    };
    personalize: {
      title: string;
      duration: string;
    };
    processing: {
      title: string;
      duration: string;
    };
    islands: {
      title: string;
      duration: string;
      price: string;
    };
    intercontinental: {
      title: string;
      duration: string;
      price: string;
    };
  };
  tracking: {
    title: string;
    description: string;
  };
}

export default function DeliveryPage() {
  const { t } = useTranslation();
  const translations = t('deliveryPage', { returnObjects: true }) as DeliveryTranslations;

  return (
    <main className="flex flex-col gap-12">
      <h1 className="text-2xl font-bold">{translations.title}</h1>
      <div className="max-w-2xl">
        <p className="text-lg mb-6">
          {translations.description}
        </p>
        <div className="grid gap-6">
          <div className="p-6 border border-solid border-border-primary rounded-lg">
            <h2 className="text-xl font-semibold mb-4">{translations.shippingOptions.title}</h2>
            <div className="grid gap-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">1</span>
                <div>
                  <h3 className="font-semibold">{translations.shippingOptions.personalize.title}</h3>
                  <p className="text-gray-400">{translations.shippingOptions.personalize.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">2</span>
                <div>
                  <h3 className="font-semibold">{translations.shippingOptions.processing.title}</h3>
                  <p className="text-gray-400">{translations.shippingOptions.processing.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">3</span>
                <div>
                  <h3 className="font-semibold">{translations.shippingOptions.standard.title}</h3>
                  <p className="text-gray-400">{translations.shippingOptions.standard.duration}</p>
                  <p className="text-gray-400">{translations.shippingOptions.standard.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">4</span>
                <div>
                  <h3 className="font-semibold">{translations.shippingOptions.islands.title}</h3>
                  <p className="text-gray-400">{translations.shippingOptions.islands.duration}</p>
                  <p className="text-gray-400">{translations.shippingOptions.islands.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">5</span>
                <div>
                  <h3 className="font-semibold">{translations.shippingOptions.intercontinental.title}</h3>
                  <p className="text-gray-400">{translations.shippingOptions.intercontinental.duration}</p>
                  <p className="text-gray-400">{translations.shippingOptions.intercontinental.price}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border border-solid border-border-primary rounded-lg">
            <h2 className="text-xl font-semibold mb-4">{translations.tracking.title}</h2>
            <p className="text-gray-400">
              {translations.tracking.description}
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
