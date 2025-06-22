"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from 'next/image';
interface Language {
  code: string;
}

const languages: Language[] = [
  {
    code: "pt",
  },
  {
    code: "en",
  },
];

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const [open, setOpen] = useState(false);

  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="flex items-center px-3 py-1.5 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
        <div className="w-6 h-6">
          <Image
            src={`/images/flags/${currentLocale === 'pt' ? 'pt' : 'uk'}.svg`}
            alt={`${currentLocale === 'pt' ? 'Portugal' : 'United Kingdom'} flag`}
            width={24}
            height={24}
            className="object-contain"
            sizes="24px"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-8" align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className="p-0.5"
          >
            <div className="w-6 h-6 mx-auto">
              <Image
                src={`/images/flags/${language.code === 'pt' ? 'pt' : 'uk'}.svg`}
                alt={`${language.code === 'pt' ? 'Portugal' : 'United Kingdom'} flag`}
                width={24}
                height={24}
                className="object-contain"
                sizes="24px"
              />
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
