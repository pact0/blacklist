"use client";

import clsx from "clsx";
import { useParams } from "next/navigation";
import { ReactNode, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { Locale } from "@/i18n/LOCALES";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import { useTranslations } from "next-intl";

type Props = {
  children: ReactNode;
  defaultValue: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations("LocaleSwitcher");

  function onSelectChange(nextLocale: Locale) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      );
    });
  }

  return (
    <Select
      defaultValue={defaultValue}
      disabled={isPending}
      onValueChange={onSelectChange}
    >
      <SelectTrigger>
        <Label
          className={clsx(
            "relative text-gray-400",
            isPending && "transition-opacity [&:disabled]:opacity-30",
          )}
        >
          {t("locale", { locale: defaultValue })}
        </Label>
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </Select>
  );
}
