"use client";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="flex flex-col items-center justify-between gap-2 border-t bg-background px-4 py-4 sm:gap-0 md:flex-row">
      {/* <div className="flex w-1/3 flex-wrap items-center justify-center gap-4 sm:justify-end"> */}
      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        {t("ggg")}
      </p>
      {/* </div> */}
    </footer>
  );
}
