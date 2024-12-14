import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { locales } from "@/i18n";
import { NextIntlClientProvider } from "next-intl";

// Note: How to prevent "Error: Page "/[locale]/page" is missing param "/favicon.ico" in "generateStaticParams()", which is required with "output: export" config." error?
// -> put favicon.ico in public folder

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
