"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CircleAlert, History } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

const BASE_URL = "https://www.pathofexile.com/account/view-profile";

interface Props {
  accountName: string;
}

export const PoeAccountLink = ({ accountName }: Props) => {
  const t = useTranslations("BlacklistPage");
  const [isOpen, setIsOpen] = useState(false);

  const toggleTooltip = () => setIsOpen(true);

  const name = accountName.replace("#", "-");
  const isOutdated = !accountName.includes("#");

  return (
    <Button asChild variant={"link"}>
      <div>
        <a href={`${BASE_URL}/${name}`} target="_blank" rel="noreferrer">
          {accountName}
        </a>

        {isOutdated && (
          <TooltipProvider>
            <Tooltip open={isOpen} onOpenChange={setIsOpen}>
              <TooltipTrigger
                asChild
                className={cn("text-red-600 hover:text-red-400")}
              >
                <Button onClick={toggleTooltip} variant={"ghost"} size={"icon"}>
                  <CircleAlert className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="z-50">
                {t("profile_outdated")}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </Button>
  );
};
