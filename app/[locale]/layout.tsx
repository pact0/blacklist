import localFont from "next/font/local";
import { getMessages, setRequestLocale } from "next-intl/server";
import { LOCALES } from "@i18n/LOCALES";
import { NextIntlClientProvider } from "next-intl";
import Providers from "../providers/Providers";

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

const fontinSmallcaps = localFont({
  src: "../public/fonts/Fontin-SmallCaps.ttf",
  display: "swap",
  variable: "--font-fontin-small-caps",
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <html
      suppressHydrationWarning
      className={fontinSmallcaps.className}
      lang={locale}
    >
      <body className={"min-h-screen bg-background/85 font-sans antialiased"}>
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
