'use client';
import { useTranslation } from 'react-i18next';

interface CustomizePageTranslations {
  title: string;
  description: string;
  personalization: {
    title: string;
    options: string[];
  };
  howTo: {
    title: string;
    steps: string[];
  };
  leadTime: {
    title: string;
    description: string;
  };
}

export default function CustomizePage() {
  const { t } = useTranslation();

  const translations = t('customizePage', { returnObjects: true }) as CustomizePageTranslations;

  return (
    <main className="flex flex-col gap-12">
      <h1 className="text-2xl font-bold">{translations.title}</h1>
      <div className="max-w-2xl">
        <p className="text-lg mb-6">
          {translations.description}
        </p>
        <div className="grid gap-6">
          <div className="p-6 border border-solid border-border-primary rounded-lg">
            <h2 className="text-xl font-semibold mb-4">{translations.personalization.title}</h2>
            <ul className="list-disc list-inside text-gray-400">
              {translations.personalization.options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </div>
          <div className="p-6 border border-solid border-border-primary rounded-lg">
            <h2 className="text-xl font-semibold mb-4">{translations.howTo.title}</h2>
            <ol className="list-decimal list-inside text-gray-400">
              {translations.howTo.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
          <div className="p-6 border border-solid border-border-primary rounded-lg">
            <h2 className="text-xl font-semibold mb-4">{translations.leadTime.title}</h2>
            <p className="text-gray-400">
              {translations.leadTime.description}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
