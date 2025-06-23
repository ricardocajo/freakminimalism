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
    express: {
      title: string;
      duration: string;
      price: string;
    };
  };
  shippingAreas: {
    title: string;
    europe: {
      title: string;
      standard: string;
      express: string;
    };
    world: {
      title: string;
      standard: string;
      express: string;
    };
  };
  tracking: {
    title: string;
    description: string;
  };
  times: {
    title: string;
    processing: string;
    standard: string;
    express: string;
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
                  <h3 className="font-semibold">{translations.shippingOptions.standard.title}</h3>
                  <p className="text-gray-400">{translations.shippingOptions.standard.duration}</p>
                  <p className="text-gray-400">{translations.shippingOptions.standard.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">2</span>
                <div>
                  <h3 className="font-semibold">{translations.shippingOptions.express.title}</h3>
                  <p className="text-gray-400">{translations.shippingOptions.express.duration}</p>
                  <p className="text-gray-400">{translations.shippingOptions.express.price}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border border-solid border-border-primary rounded-lg">
            <h2 className="text-xl font-semibold mb-4">{translations.shippingAreas.title}</h2>
            <div className="grid gap-4">
              <div>
                <h3 className="font-semibold">{translations.shippingAreas.europe.title}</h3>
                <p className="text-gray-400">{translations.shippingAreas.europe.standard}</p>
                <p className="text-gray-400">{translations.shippingAreas.europe.express}</p>
              </div>
              <div>
                <h3 className="font-semibold">{translations.shippingAreas.world.title}</h3>
                <p className="text-gray-400">{translations.shippingAreas.world.standard}</p>
                <p className="text-gray-400">{translations.shippingAreas.world.express}</p>
              </div>
            </div>
          </div>

          <div className="p-6 border border-solid border-border-primary rounded-lg">
            <h2 className="text-xl font-semibold mb-4">{translations.tracking.title}</h2>
            <p className="text-gray-400">
              {translations.tracking.description}
            </p>
          </div>

          <div className="p-6 border border-solid border-border-primary rounded-lg">
            <h2 className="text-xl font-semibold mb-4">{translations.times.title}</h2>
            <p className="text-gray-400">
              {translations.times.processing}<br />
              {translations.times.standard}<br />
              {translations.times.express}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
