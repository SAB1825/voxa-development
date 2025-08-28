"use client";

import React from "react";

import  {
 TooltipProvider,
 Tooltip,
 TooltipTrigger,
 TooltipContent
} from "@workspace/ui/components/tooltip"


interface hintProps {
  children: React.ReactNode;
  text: string;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
}

export const Hint = ({
  children,
  text,
  side = "top",
  align = "center",
}: hintProps) => {
  return (
   <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent>
            {text}
          </TooltipContent>
        </Tooltip>
   </TooltipProvider>
  );
};
