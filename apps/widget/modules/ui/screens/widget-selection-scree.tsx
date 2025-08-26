"use client";

import { useAtomValue, useSetAtom } from "jotai";
import React, { useState } from "react";
import { WidgetHeader } from "../components/widget-header";
import { ChevronLeft, Loader, MessageSquare, MessageSquareIcon } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import {
  contactSessionIdAtomFamily,
  conversationIdAtom,
  errorMessageAtom,
  organizationIdAtom,
  screenAtom,
} from "@/modules/atoms/widge-atoms";
import { useMutation } from "convex/react";
import { api } from "../../../../../packages/backend/convex/_generated/api";
import { WidgetFooter } from "../components/widget-footer";

export const WidgetSelectionScreen = () => {
  const [isPending, setIsPending] = useState(false);
  const setScreen = useSetAtom(screenAtom);
  const setConversationId = useSetAtom(conversationIdAtom);
  const setErrorMessage = useSetAtom(errorMessageAtom);
  const organizationId = useAtomValue(organizationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  );
  const createConversation = useMutation(api.public.conversations.create);
  const handleNewConversation = async () => {
    setIsPending(true);
    if (!organizationId) {
      setScreen("error");
      setErrorMessage("Organization ID is missing");
      return;
    }
    if (!contactSessionId) {
      setScreen("auth");
      return;
    }

    try {
      const conversationId = await createConversation({
        organizationId,
        contactSessionId,
      });
      setConversationId(conversationId);
      setScreen("chat");
    } catch {
      setScreen("auth");
    } finally {
      setIsPending(false);
    }
  };

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
      <div className="flex flex-1 flex-col  gap-y-4 p-4 overflow-y-auto">
        <Button
          className="h-16 w-full justify-between pointer-cursor"
          variant="outline"
          onClick={handleNewConversation}
          disabled={isPending}
        >
          {isPending ? (
            <div className="flex items-center">
              <Loader className="animate-spin" />
            </div>
          ) : (
            <div className="flex items-center gap-x-2">
              <MessageSquareIcon className="size-4" />
              <span>Start Chat</span>
            </div>
          )}
          <ChevronLeft />
        </Button>
      </div>
      <WidgetFooter />
    </>
  );
};
