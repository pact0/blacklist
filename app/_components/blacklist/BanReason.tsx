"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React, { useState } from "react";
import { ShieldQuestion } from "lucide-react";

interface Props {
  reason: string;
}

export const BanReason = ({ reason }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleTooltip = async () => {
    setIsOpen(true);
  };

  return (
    <TooltipProvider>
      <Tooltip open={isOpen} onOpenChange={setIsOpen}>
        <TooltipTrigger
          asChild
          className={"text-green-600 hover:text-green-400"}
        >
          <Button onClick={toggleTooltip} variant={"ghost"} size={"icon"}>
            <ShieldQuestion className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="z-50">{reason}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
