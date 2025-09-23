"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export const Footer = () => {
  const { t } = useTranslation();
  const linkStyles = "text-sm transition duration-150 ease hover:text-white";
  const liStyles = "text-[#A1A1A1] my-1.5";

  const socialLinks = [
    {
      href: "https://www.instagram.com/freakminimalism/",
      title: "Instagram",
      image: "/images/social/instagram.svg"
    },
    {
      href: "https://api.whatsapp.com/send?phone=351927771505",
      title: "WhatsApp",
      image: "/images/social/whatsapp.svg"
    },
    {
      href: "mailto:freakminimalism@gmail.com",
      title: "Email",
      image: "/images/social/mail.svg"
    }
  ];

  return (
    <footer className="px-6 py-14 border-t border-solid pointer-events-auto bg-[#0A0A0A] border-[#242424]">
      <nav className="flex flex-wrap justify-center gap-5 mx-auto max-w-screen-2xl">
        <div className="flex flex-col items-center justify-center w-full max-w-xs gap-5 order-2 md:order-1">
          <div className="flex flex-wrap gap-3.5 justify-center">
            {socialLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                target={link.href.startsWith('mailto:') ? '' : '_blank'}
                title={link.title}
                className="text-[#A1A1A1] hover:text-white transition-colors duration-200"
              >
                <Image
                  src={link.image}
                  alt={link.title}
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </Link>
            ))}
            <span className="flex items-center text-sm text-[#A1A1A1]">
              &copy; 2025
            </span>
            <span className="flex items-center text-sm text-[#A1A1A1] mt-2">
              {t('footer.trademark')}: 716875®
            </span>
          </div>
        </div>

        <div className="w-full max-w-xs order-1 md:order-2">
          <h2 className="my-3 text-sm font-medium">{t('footer.assistance')}</h2>
          <ul className="grid grid-cols-2">
            <li className={liStyles}>
              <Link href="/customize" className={linkStyles}>
                {t('footer.customize')}
              </Link>
            </li>
            <li className={liStyles}>
              <Link href="/size-guide" className={linkStyles}>
                {t('footer.sizeGuide')}
              </Link>
            </li>
            <li className={liStyles}>
              <Link href="/delivery" className={linkStyles}>
                {t('footer.delivery')}
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full max-w-xs order-1 md:order-2">
          <h2 className="my-3 text-sm font-medium">{t('navbar.partnerships')}</h2>
          <ul className="grid grid-cols-2">
            <li className={liStyles}>
              <Link
                href="https://www.facebook.com/dora.isabel.batista"
                target="_blank"
                className={linkStyles}
              >
                Decorações Dorita
              </Link>
            </li>
            <li className={liStyles}>
              <Link
                href="https://www.instagram.com/mandalakaos/"
                target="_blank"
                className={linkStyles}
              >
                MandalaKaos
              </Link>
            </li>
            <li className={liStyles}>
              <Link
                href="https://www.instagram.com/alphared.airsoft"
                target="_blank"
                className={linkStyles}
              >
                AlphaRed
              </Link>
            </li>
            <li className={liStyles}>
              <Link
                href="https://www.instagram.com/cultureisnotdead_/"
                target="_blank"
                className={linkStyles}
              >
                For The Culture
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </footer>
  );
};
