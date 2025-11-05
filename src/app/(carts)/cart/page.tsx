"use client";

import { useCart } from "@/contexts/CartContext";
import { CartItem } from "@/contexts/CartContext";
import { ProductCartInfo } from "@/components/cart/ProductCartInfo";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const ButtonCheckout = dynamic(
  () => import("@/components/cart/ButtonCheckout"),
  {
    ssr: false,
    loading: () => (
      <p className="flex items-center justify-center w-full h-full text-sm">
        Continue
      </p>
    ),
  }
);

export default function CartPage() {
  const { cart, removeFromCart, decrementQuantity, addToCart, total } = useCart();
  const { t, i18n } = useTranslation();
  const [promoCode, setPromoCode] = useState<string>("");

  return (
    <div className="pt-12">
      <h2 className="mb-5 text-xl font-bold sm:text-2xl text-center">{t('cartPage.title')}</h2>
      <div className="grid gap-x-3.5 gap-y-6 sm:gap-y-9 grid-cols-1 sm:grid-cols-auto-fill-250 max-w-2xl mx-auto">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-500px)] gap-4 max-w-2xl mx-auto px-4">
            <h1 className="mb-6 text-4xl font-bold">{t('cartPage.empty.title')}</h1>
            <p className="mb-4 text-lg">{t('cartPage.empty.description')}</p>
            <Link
              href="/"
              className="flex font-medium items-center bg-[#0C0C0C] justify-center text-sm min-w-[160px] max-w-[160px] h-[40px] px-[10px] rounded-md border border-solid border-[#2E2E2E] transition-all hover:bg-[#1F1F1F] hover:border-[#454545]"
            >
              {t('cartPage.empty.button')}
            </Link>
          </div>
        ) : (
          cart.map((item: CartItem) => (
            <div
              key={item._id}
              className="flex justify-between border border-solid border-border-primary rounded-md overflow-hidden flex-row sm:flex-col"
            >
              <Link
                href={`/products/${item._id}`}
                className="w-6/12 sm:w-full hover:scale-105 transition-all"
              >
                <div className="relative w-full h-32 sm:h-48">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="object-cover brightness-90"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </Link>
              <div className="w-6/12 sm:w-full flex justify-between flex-col gap-2.5 p-3.5 bg-background-secondary z-10">
                <div className="flex justify-between w-full">
                  <Link href={`/products/${item._id}`} className="w-10/12">
                    <h2 className="text-sm font-semibold truncate">{item.name}</h2>
                  </Link>
                  <button
                    aria-label="Delete item"
                    onClick={() => removeFromCart(item)}
                    className="transition-all hover:text-white"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-[#A1A1A1]"
                    >
                      <path
                        d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                {item.discountPrice && (
                  <span className="flex items-center justify-center px-2 py-1 text-xs font-semibold text-white bg-[#E53E3E] rounded-full">
                    {Math.round(((item.price - item.discountPrice) / item.price) * 100)}% OFF
                  </span>
                )}
                {item.discountPrice ? (
                  <div className="flex items-center gap-1">
                    <span className="text-sm line-through text-[#A1A1A1]">{(item.price * item.quantity).toFixed(2)}€</span>
                    <span className="text-sm font-semibold">{(item.discountPrice * item.quantity).toFixed(2)}€</span>
                  </div>
                ) : (
                  <div className="text-sm">{(item.price * item.quantity).toFixed(2)}€</div>
                )}
                <div className="flex sm:hidden">
                  <div className="text-sm pr-2.5 border-r">{item.size}</div>
                  <div className="text-sm pl-2.5">{item.color}</div>
                </div>
                <div className="flex items-center justify-between sm:hidden">
                  <div className="flex bg-black w-min">
                    <button
                      onClick={() => decrementQuantity(item._id)}
                      className="flex items-center justify-center w-8 h-8 p-2 border border-solid rounded-l text-[#A1A1A1] transition-all hover:text-white border-border-primary"
                    >
                      -
                    </button>
                    <span className="flex items-center justify-center w-8 h-8 p-2 text-sm border-solid border-y border-border-primary">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      className="flex items-center justify-center w-8 h-8 p-2 border border-solid rounded-r text-[#A1A1A1] transition-all hover:text-white border-border-primary"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-sm">{(item.price * item.quantity).toFixed(2)}€</div>
                </div>
                <div className="items-center justify-between hidden sm:flex">
                  <div className="flex bg-black w-min">
                    <button
                      onClick={() => decrementQuantity(item._id)}
                      className="flex items-center justify-center w-8 h-8 p-2 border border-solid rounded-l text-[#A1A1A1] transition-all hover:text-white border-border-primary"
                    >
                      -
                    </button>
                    <span className="flex items-center justify-center w-8 h-8 p-2 text-sm border-solid border-y border-border-primary">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      className="flex items-center justify-center w-8 h-8 p-2 border border-solid rounded-r text-[#A1A1A1] transition-all hover:text-white border-border-primary"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex">
                    <div className="text-sm pr-2.5 border-r">{item.size}</div>
                    <div className="text-sm pl-2.5">{item.color}</div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        <div className="fixed left-[50%] translate-x-[-50%] bottom-4 w-[90%] z-10 sm:w-[420px] rounded-xl overflow-hidden flex flex-col bg-black border border-solid border-border-primary h-min">
          <div className="flex items-center gap-2 p-2.5 border-b border-border-primary bg-background-secondary">
            <span className="text-sm whitespace-nowrap px-1">
              {(t('cartPage.promo.label') !== 'cartPage.promo.label')
                ? t('cartPage.promo.label')
                : (i18n.language === 'pt' ? 'Tem um código promocional?' : 'Have a promo code?')}
            </span>
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.trim())}
              placeholder={(t('cartPage.promo.placeholder') !== 'cartPage.promo.placeholder')
                ? t('cartPage.promo.placeholder')
                : (i18n.language === 'pt' ? 'Insira o código promocional' : 'Enter promo code')}
              className="flex-1 bg-transparent border border-border-primary rounded px-3 py-2 text-sm placeholder:text-[#777] focus:outline-none focus:border-border-secondary"
              aria-label={(i18n.language === 'pt' ? 'Código promocional' : 'Promo code')}
            />
          </div>
          <div className="flex">
            <div className="flex flex-col p-2.5 justify-center w-1/2 gap-2 text-center">
              <div className="flex gap-2.5 justify-center text-sm">
                <span>{t('cartPage.total.label')}</span>
                <span>{total.toFixed(2)}€</span>
              </div>
              <span className="text-xs">{t('cartPage.total.tax')}</span>
            </div>
            <div className="w-1/2 border-l border-solid bg-background-secondary border-border-primary">
              <ButtonCheckout cartItems={cart} promoCode={promoCode || undefined} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
