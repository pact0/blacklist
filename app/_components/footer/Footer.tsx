import getConfig from "next/config";
import { getTranslations } from "next-intl/server";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { publicRuntimeConfig } = getConfig();

interface Props {
  params: {
    locale: string;
  };
}

export default async function Footer({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: "Footer" });

  return (
    <footer className="flex flex-col items-center justify-between gap-2 border-t bg-background px-4 py-4 sm:gap-0 md:flex-row">
      <div className="flex w-1/3 flex-wrap items-center justify-center gap-4 sm:justify-start">
        {/* eslint-disable-next-line  @typescript-eslint/no-unsafe-member-access */}
        <small className="text-gray-400">v{publicRuntimeConfig?.version}</small>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; 2024 poe-hub.com All rights reserved.
        </p>
      </div>

      <div className="flex w-1/3 flex-wrap items-center justify-center gap-4">
        <a
          href="https://feedback.poe-hub.com"
          className="text-center text-sm hover:underline dark:text-gray-400"
        >
          {t("feedback")}
        </a>
        <a
          href="https://support.poe-hub.com"
          className="text-center text-sm hover:underline dark:text-gray-400"
        >
          {t("support")}
        </a>
        <a
          href="https://www.termsandconditionsgenerator.com/live.php?token=UsaYcZtQuRbWQOydkVDKvZw4RJn04tMM"
          className="text-center text-sm hover:underline dark:text-gray-400"
        >
          {t("terms_and_conditions")}
        </a>
        <a
          href="https://www.termsfeed.com/live/2e80520d-0b69-4506-87b0-f8cb6f643b78"
          className="text-center text-sm hover:underline dark:text-gray-400"
        >
          {t("privacy_policy")}
        </a>
      </div>

      <div className="flex w-1/3 flex-wrap items-center justify-center gap-4 sm:justify-end">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          {t("ggg")}
        </p>
      </div>
    </footer>
  );
}
