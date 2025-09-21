"use client";

import { useTranslation } from 'react-i18next';

import Link from 'next/link';

export default function AboutPage() {
  const { t } = useTranslation('common');
  const content = t('about.content');
  const paragraphs = content.split('\n\n');

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="prose prose-lg max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center glow-title">{t('about.title')}</h1>
        <div className="space-y-8">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-lg leading-relaxed text-center">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="flex items-center justify-center mt-8">
          <div className="flex flex-col items-center text-center">
            <span className="text-sm text-[#A1A1A1]">{t('products.customizeMessage')}</span>
            <Link
              href="/customize"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-gradient-to-r from-[#00B4DB] to-[#0083B0] text-white rounded-full hover:from-[#00A1CE] hover:to-[#007195] transition-all"
            >
              {t('products.customizeButton')}
              <svg
                className="w-2.5 h-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
