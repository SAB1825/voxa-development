import { screenAtom, widgetSettingsAtom } from "@/modules/atoms/widge-atoms";
import { useVapi } from "@/modules/hooks/use-vapi";
import { useAtomValue, useSetAtom } from "jotai";
import { WidgetHeader } from "../components/widget-header";
import { Button } from "@workspace/ui/components/button";
import { ArrowLeft, ArrowLeftIcon, CheckIcon, CopyIcon, MessageSquareIcon, MicIcon, MicOff, PhoneIcon } from "lucide-react";

import { useState } from "react";
import Link from "next/link";


export const WidgetContactScreen = () => {
  const setScreen = useSetAtom(screenAtom);
  const widgetSettings = useAtomValue(widgetSettingsAtom)

  const phoneNumber= widgetSettings?.vapiSettings?.phoneNumber;
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    if(!phoneNumber) {
      return;
    }

    try {
      await navigator.clipboard.writeText(phoneNumber)
      setCopied(true);
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const onBack = () => {
    setScreen("selection");
  }
  return (
    <>
      <WidgetHeader className="px-4 py-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-x-2">
            <Button size="icon" variant="transparent" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <PhoneIcon />
            <h1 className="text-2xl font-semibold">Contact Us</h1>
          </div>
          
        </div>
      </WidgetHeader>
      <div className="flex h-full flex-col items-center justify-center gap-y-4">
        <div className="flex items-center justify-center rounded-full border bg-white p-3">
          <PhoneIcon className="size-6 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">
          Available 24/7
        </p>
        <p className="font-bold text-2xl">{phoneNumber}</p>
      </div>
      <div className="flex flex-col items-center gap-y-2">
        <Button
          className="w-full"
          onClick={handleCopy}
          size="lg"
          variant="outline"
        >
          {copied ? (
            <>
              <CheckIcon className="mr-2 size-4"/>
              copied
            </>
          ) : (
            <>
             <CopyIcon className="mr-2 size-4" />
              copy
            </>
          )}
        </Button>
        <Button asChild className="w-full size-lg" >
          <Link href={`tel:${phoneNumber}`}>
            <PhoneIcon />
            Call Now
          </Link>
        </Button>
      </div>
    </>
  );
};
