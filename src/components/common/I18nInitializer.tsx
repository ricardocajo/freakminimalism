"use client";

import { useEffect } from "react";
import i18n from '@/i18n';

export function I18nInitializer() {
  useEffect(() => {
    // Force load translations when the app mounts
    i18n.loadNamespaces(['common']);
  }, []);

  return null;
}
