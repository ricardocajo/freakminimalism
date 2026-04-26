"use client";

import { useTranslation } from "react-i18next";

export const YouMightAlsoLikeHeading = () => {
  const { t } = useTranslation();
  return (
    <h2 className="mt-24 mb-5 text-xl font-bold sm:text-2xl">
      {t("productDetails.youMightAlsoLike")}
    </h2>
  );
};
