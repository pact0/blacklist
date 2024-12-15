import { useState } from "react";
import { History } from "lucide-react";

import { Button } from "./button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { cn } from "@/lib/utils";

interface Props {
  tooltipContent: string | React.ReactNode;
  size?: number;
  className?: string;
}

const DataAge = ({ tooltipContent, size = 24, className }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleTooltip = () => setIsOpen(true);

  return (
    <TooltipProvider>
      <Tooltip open={isOpen} onOpenChange={setIsOpen}>
        <TooltipTrigger asChild className={cn(className)}>
          <Button onClick={toggleTooltip} variant={"ghost"} size={"icon"}>
            <History className="h-4 w-4" size={size} />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="z-50">{tooltipContent}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

DataAge.displayName = "DataAge";

export { DataAge };
