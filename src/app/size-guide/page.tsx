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
  const [openCategory, setOpenCategory] = useState<null | 'man' | 'woman' | 'kid'>(null);

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
        <div className="grid gap-4">
          {/* Accordion items for each category */}
          {(['man','woman','kid'] as Array<'man'|'woman'|'kid'>).map((cat) => {
            const isOpen = openCategory === cat;
            const label = categoryTranslations[cat][i18n.language as keyof CategoryTranslations] || cat;
            return (
              <div key={cat} className="border border-solid border-border-primary rounded-lg overflow-hidden">
                <button
                  className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${isOpen ? 'bg-[#111] text-white' : 'bg-background-secondary hover:bg-[#1a1a1a]'}`}
                  onClick={() => setOpenCategory(isOpen ? null : cat)}
                  aria-expanded={isOpen}
                  aria-controls={`panel-${cat}`}
                >
                  <span className="font-medium">{label}</span>
                  <span className="ml-3 text-sm opacity-80">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div id={`panel-${cat}`} className="p-4 border-t border-solid border-border-primary">
                    <div className="grid gap-0">
                      {measurementImages[cat].map((image, index) => (
                        <img
                          key={index}
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-contain"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
