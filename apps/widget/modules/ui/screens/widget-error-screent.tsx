"use client";

import { errorMessageAtom } from "@/modules/atoms/widge-atoms";
import { useAtomValue } from "jotai";
import React from "react";
import { WidgetHeader } from "../components/widget-header";
import { AlertTriangleIcon } from "lucide-react";

export const WidgetErrorScreen = () => {
  const errorMessage = useAtomValue(errorMessageAtom);
  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-3 px-4 py-8">
          <p className="font-bold text-4xl tracking-tight text-primary-foreground">
            Hi there! 👋🏼
          </p>
          <p className="text-xl text-primary-foreground/90 font-medium">
            Let&apos;s get you started.
          </p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4">
        <AlertTriangleIcon />
        <p>{errorMessage || "Invalid configuration"}</p>
      </div>
    </>
  );
};
