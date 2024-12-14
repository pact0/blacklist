// import { notFound } from "next/navigation";
// import { getRequestConfig } from "next-intl/server";
// import { LOCALES } from "./LOCALES";
//
// // Can be imported from a shared config
// export default getRequestConfig(async ({ locale }) => {
//   // Validate that the incoming `locale` parameter is valid
//   if (!LOCALES.includes(locale as any)) notFound();
//
//   return {
//     messages: (await import(`./messages/${locale}.json`)).default,
//   };
// });

import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
