"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { cn } from "@/libs/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

// The collections panel is grouped rather than listed flat: everything you
// wear on one side, everything we make on the other. Order inside each group
// goes from the biggest family to the smallest.
const CATEGORY_GROUPS = [
  {
    titleKey: "navbar.groupWear",
    items: [
      { href: "/woman", key: "woman" },
      { href: "/man", key: "man" },
      { href: "/kids", key: "kids" },
      { href: "/hats", key: "hats" },
      { href: "/accessories", key: "accessories" },
    ],
  },
  {
    titleKey: "navbar.groupCreations",
    items: [
      { href: "/art", key: "art" },
      { href: "/handcraft", key: "handcraft" },
      { href: "/3dworks", key: "3dworks" },
      { href: "/partnerships", key: "partnerships" },
    ],
  },
];

export function LinksDesktop() {
  const { t } = useTranslation('common');
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="https://cliente.freak-minimalism.com/"
              target="_blank"
              className={navigationMenuTriggerStyle()}
            >
              FreakCard
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/game" className={navigationMenuTriggerStyle()}>
              {t('navbar.game')}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t('navbar.collections')}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-4 md:w-[520px] lg:w-[620px] lg:grid-cols-[.85fr_1fr]">
              {/* Two calls to action sharing the space the single "view all"
                  tile used to take up on its own. */}
              <div className="grid grid-rows-[1fr_auto] gap-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="relative flex flex-col justify-end w-full min-h-[150px] p-6 overflow-hidden no-underline rounded-md outline-none select-none focus:shadow-md bg-center bg-cover bg-[url('/main-image.webp')]"
                    href="/"
                  >
                    {/* The photo is busy — a scrim keeps the label readable. */}
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10"
                    />
                    <div className="relative mb-1 text-sm font-medium">
                      {t('navbar.viewAll')}
                    </div>
                    <p className="relative text-sm leading-tight text-[#D4D4D4]">
                      {t('navbar.discoverWardrobe')}
                    </p>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    className="flex flex-col justify-end w-full p-4 no-underline rounded-md outline-none select-none border border-solid border-[#2E2E2E] bg-[#161616] transition-colors hover:bg-[#1F1F1F] focus:shadow-md"
                    href="/customize"
                  >
                    <div className="mb-1 text-sm font-medium uppercase">
                      {t('navbar.customize')}
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground text-[#A1A1A1]">
                      {t('navbar.customizeDescription')}
                    </p>
                  </Link>
                </NavigationMenuLink>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {CATEGORY_GROUPS.map((group) => (
                  <div key={group.titleKey}>
                    <p className="px-3 pb-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[#7A7A7A]">
                      {t(group.titleKey)}
                    </p>
                    <ul>
                      {group.items.map((item) => (
                        <ListItem key={item.href} href={item.href} title={t(`navbar.${item.key}`)} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, title, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none rounded-md px-3 py-2 text-sm font-medium leading-none no-underline outline-none transition-colors hover:bg-[#1F1F1F] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          {title}
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
