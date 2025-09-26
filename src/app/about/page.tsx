"use client";

import { useTranslation } from 'react-i18next';

import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  const { t } = useTranslation('common');
  const content = t('about.content');
  const paragraphs = content.split('\n\n');

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="prose prose-lg max-w-3xl mx-auto about-contrast">
        <h1 className="text-4xl font-bold mb-12 text-center glow-title">{t('about.title')}</h1>
        <div className="space-y-8">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-lg leading-relaxed text-center">
              {paragraph}
            </p>
          ))}
        </div>
        {/* Buttons row: Ver Loja + Customize side by side */}
        <div className="flex items-center justify-center mt-10">
          <div className="flex flex-col items-center text-center">
            <div className="flex flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-full border border-[#2a2a2a] bg-[#111] text-white hover:bg-[#1a1a1a] hover:border-[#3a3a3a] transition-colors"
                aria-label="Ver Loja"
              >
                Ver Loja
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
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
            <span className="text-sm text-[#A1A1A1] mt-3">{t('products.customizeMessage')}</span>
          </div>
        </div>

        {/* Partnerships section */}
        <section className="mt-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center justify-items-center">
            <Link href="https://www.facebook.com/dora.isabel.batista" target="_blank" rel="noopener noreferrer" aria-label="Decorações do Rita">
              <Image
                src="/parcerias/decoracoesdorita.jpg"
                alt="Decorações do Rita"
                width={200}
                height={120}
                className="h-16 w-auto object-contain rounded-md grayscale hover:grayscale-0 transition duration-300 ease-in-out"
              />
            </Link>
            <Link href="https://www.instagram.com/mandalakaos/" target="_blank" rel="noopener noreferrer" aria-label="Mandalakaos">
              <Image
                src="/parcerias/mandalakaos.jpg"
                alt="Mandalakaos"
                width={200}
                height={120}
                className="h-16 w-auto object-contain rounded-md grayscale hover:grayscale-0 transition duration-300 ease-in-out"
              />
            </Link>
            <Link href="https://www.instagram.com/alphared.airsoft" target="_blank" rel="noopener noreferrer" aria-label="Alpha Red Airsoft">
              <Image
                src="/parcerias/alphared.jpg"
                alt="Alpha Red Airsoft"
                width={200}
                height={120}
                className="h-16 w-auto object-contain rounded-md grayscale hover:grayscale-0 transition duration-300 ease-in-out"
              />
            </Link>
            <Link href="https://www.instagram.com/cultureisnotdead_/" target="_blank" rel="noopener noreferrer" aria-label="For The Culture">
              <Image
                src="/parcerias/fortheculture.jpg"
                alt="For The Culture"
                width={200}
                height={120}
                className="h-16 w-auto object-contain rounded-md grayscale hover:grayscale-0 transition duration-300 ease-in-out"
              />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
