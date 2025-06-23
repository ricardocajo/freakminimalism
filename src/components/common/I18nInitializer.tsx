import i18n from '@/i18n';

export function I18nInitializer() {
  // Initialize translations on server
  i18n.loadNamespaces(['common']);
  return null;
}
