import { type Locale as i18nLocales } from "@/i18n/LOCALES";
import { format, isValid, type Locale } from "date-fns";
import { enUS, pl } from "date-fns/locale";
import { useTranslations, useLocale } from "next-intl";

import React from "react";

const LOCALE_MAP = {
  en: enUS,
  pl: pl,
} satisfies Record<i18nLocales, Locale>;

interface Props {
  date: Date;
}

export const LocalizedDate = ({ date }: Props) => {
  const t = useTranslations("Date");
  const locale = useLocale() as i18nLocales;

  const isValidDate = isValid(date);

  if (!isValidDate) return <div>{t("unknown")}</div>;

  return <div>{format(date, "PPP", { locale: LOCALE_MAP[locale] })}</div>;
};
