'use client';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface CategoryTranslations {
  en: string;
  pt: string;
}

const categoryTranslations: Record<'man' | 'woman' | 'kid', CategoryTranslations> = {
  man: {
    en: 'Man',
    pt: 'Homem'
  },
  woman: {
    en: 'Woman',
    pt: 'Mulher'
  },
  kid: {
    en: 'Kid',
    pt: 'Criança'
  }
};

interface SizeGuideTranslations {
  title: string;
  description: string;
  howToMeasure: {
    title: string;
    steps: string[];
  };
}

interface MeasurementImage {
  src: string;
  alt: string;
}

interface MeasurementImages {
  man: MeasurementImage[];
  woman: MeasurementImage[];
  kid: MeasurementImage[];
}

// Configuration for measurement images by category
const measurementConfig = {
  man: [
    { type: 'hood', alt: 'How to measure inseam' },
    { type: 'longsleeve', alt: 'How to measure shoulder width' },
    { type: 'polo', alt: 'How to measure shoulder width' },
    { type: 'sweat', alt: 'How to measure shoulder width' },
    { type: 'tshirt', alt: 'How to measure shoulder width' },
    { type: 'zipp', alt: 'How to measure shoulder width' },
    { type: 'baseball', alt: 'How to measure chest' },
    { type: 'cavas', alt: 'How to measure waist' }
  ] as const,

  woman: [
    { type: 'hood', alt: 'How to measure bust' },
    { type: 'polo', alt: 'How to measure waist' },
    { type: 'tshirt', alt: 'How to measure hips' },
    { type: 'sweat', alt: 'How to measure inseam' },
    { type: 'zipp', alt: 'How to measure inseam' },
    { type: 'longsleeve', alt: 'How to measure inseam' }
  ] as const,

  kid: [
    { type: 'tshirt', alt: 'How to measure chest' },
    { type: 'zipp', alt: 'How to measure waist' },
    { type: 'sweat', alt: 'How to measure inseam' },
    { type: 'hood', alt: 'How to measure shoulder width' },
    { type: 'baseball', alt: 'How to measure shoulder width' }
  ] as const
} as const;

// Base path for all measurement images
const IMAGES_BASE_PATH = '/images/measurements';

// Main measurement images configuration
const measurementImages: MeasurementImages = {
  man: measurementConfig.man.map(({ type, alt }) => ({
    src: `${IMAGES_BASE_PATH}/man-${type}.png`,
    alt
  })),

  woman: measurementConfig.woman.map(({ type, alt }) => ({
    src: `${IMAGES_BASE_PATH}/woman-${type}.png`,
    alt
  })),

  kid: measurementConfig.kid.map(({ type, alt }) => ({
    src: `${IMAGES_BASE_PATH}/kid-${type}.png`,
    alt
  }))
};

export default function SizeGuidePage() {
  const { t, ready, i18n } = useTranslation();
  const translations = t('sizeGuidePage', { returnObjects: true }) as SizeGuideTranslations;
  const [selectedCategory, setSelectedCategory] = useState<'man' | 'woman' | 'kid'>('man');

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (!translations) {
    return <div>Error loading translations</div>;
  }

  return (
    <main className="flex flex-col gap-12">
      <h1 className="text-2xl font-bold">{translations.title}</h1>
      <div className="max-w-2xl">
        <p className="text-lg mb-6">
          {translations.description}
        </p>
        <div className="grid gap-6">

          {/* Measurement tabs section */}
          <div className="p-6 border border-solid border-border-primary rounded-lg">
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setSelectedCategory('man')}
                className={`px-4 py-2 rounded-lg ${
                  selectedCategory === 'man'
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {categoryTranslations.man[i18n.language as keyof CategoryTranslations] || 'Man'}
              </button>
              <button
                onClick={() => setSelectedCategory('woman')}
                className={`px-4 py-2 rounded-lg ${
                  selectedCategory === 'woman'
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {categoryTranslations.woman[i18n.language as keyof CategoryTranslations] || 'Woman'}
              </button>
              <button
                onClick={() => setSelectedCategory('kid')}
                className={`px-4 py-2 rounded-lg ${
                  selectedCategory === 'kid'
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {categoryTranslations.kid[i18n.language as keyof CategoryTranslations] || 'Kid'}
              </button>
            </div>

            <div className="grid gap-0">
              {measurementImages[selectedCategory].map((image, index) => (
                <img
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-contain"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
