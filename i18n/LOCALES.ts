export const LOCALES = [
  "en",
  "es",
  "fr",
  "de",
  "it",
  "pt",
  "zh",
  "jp",
  "ru",
  "ar",
  "pl",
] as const;
export type Locale = (typeof LOCALES)[number];
