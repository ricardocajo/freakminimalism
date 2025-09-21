"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { LinksDesktop } from "./LinksDesktop";
import SearchInput from "./SearchInput";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useCart } from "@/contexts/CartContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation, useSSR } from 'react-i18next';
import { useEffect } from 'react';
import i18n from '@/i18n';
import FMLogo from "./FMLogo";

interface Navbar {
  // totalItemsCart: number;
}

export const Navbar = () => {
  const { t, ready } = useTranslation('common');
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);

  if (!ready) {
    return null; // Wait for translations to be ready
  }

  const toggleHeader = () => {
    document.body.style.overflow = "auto";
    setIsHeaderOpen(!isHeaderOpen);
  };

  const linksData = [
    { path: "/about", name: t('navbar.about') },
    { path: "/new", name: t('navbar.new') },
    { path: "/art", name: t('navbar.art') },
    { path: "/3dworks", name: t('navbar.3dworks') },
    { path: "/hats", name: t('navbar.hats') },
    { path: "/kids", name: t('navbar.kids') },
    { path: "/accessories", name: t('navbar.accessories') },
    { path: "/woman", name: t('navbar.woman') },
    { path: "/man", name: t('navbar.man') },
    { path: "/partnerships", name: t('navbar.partnerships') },
  ];

  const authLinks = () => {
    return null;
  };

  return (
    <header className="pointer-events-auto w-full px-3.5 gap-4 xs:px-6 sm:px-12 py-6 flex items-center justify-between bg-background-secondary border-b border-solid border-border-primary">
      <button
        onClick={() => {
          toggleHeader();
          document.body.style.overflow = "hidden";
        }}
        className="flex px-4 py-2 lg:hidden"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>

      <div
        className={`fixed top-0 left-0 h-screen w-full bg-background-secondary py-6 px-3.5 xs:px-6 transition ease duration-200 z-20 translate-x-0 ${isHeaderOpen ? "translate-x-0" : "translate-x-hide"}`}
      >
        <ul className="flex justify-between text-sm gap-9">
          <li>
            <button
              onClick={() => {
                toggleHeader();
                document.body.style.overflow = "auto";
              }}
              className="px-4 py-2"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </li>

          <li className="flex items-center">
            <LanguageSwitcher />
          </li>

          {authLinks()}
        </ul>

        <div className="flex items-center justify-center h-full max-h-[90%]">
          <ul className="flex flex-col justify-between text-sm gap-9">
            <li className="flex items-center justify-center">
              <Link href={linksData[0].path} onClick={toggleHeader}>
                {linksData[0].name}
              </Link>
            </li>
            <li className="flex items-center justify-center">
              <Link href="/" onClick={toggleHeader}>
                {t('cartPage.viewAll')}
              </Link>
            </li>
            {linksData.slice(1).map((link, index) => (
              <li key={index} className="flex items-center justify-center">
                <Link href={link.path} onClick={toggleHeader}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="justify-between hidden gap-2 text-sm lg:flex items-center">
        <li>
          <Link
            href="/about"
            className="text-sm px-4 py-2 transition-all lg:text-[#A1A1A1] hover:text-[#EDEDED] font-medium flex items-center"
          >
            <FMLogo className="h-6 w-auto transform origin-left scale-150" width={72} height={24} />
          </Link>
        </li>
        <li>
          <LinksDesktop />
        </li>
      </ul>

      <SearchInput />

      <ul className="flex gap-2">
        <li>
          <LanguageSwitcher />
        </li>
        <li className="flex items-center justify-center">
          <Link
            href="/cart"
            aria-label="Products saved in the shopping cart"
            className="relative flex items-center justify-center w-10 h-10 rounded-full transition-all hover:bg-[#1F1F1F]"
          >
            <div className="relative w-full h-full">
              <Image
                src="/carrinho.png"
                alt="Shopping cart"
                className="w-full h-full object-cover"
                width={40}
                height={40}
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src = '/icon.png'; // Fallback to default icon if image fails to load
                }}
              />
              <div className="absolute inset-0 bg-white/10 rounded-full"></div>
            </div>
            <span className="flex items-center bg-[#0072F5] font-medium text-[#EDEDED] justify-center absolute w-[20px] rounded-full top-[-3px] right-[-3px]">
              {totalItems}
            </span>
          </Link>
        </li>
      </ul>
    </header>
  );
};
