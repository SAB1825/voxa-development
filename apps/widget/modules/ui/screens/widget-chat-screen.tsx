"use client";

import {
  contactSessionIdAtomFamily,
  conversationIdAtom,
  errorMessageAtom,
  organizationIdAtom,
  screenAtom,
} from "@/modules/atoms/widge-atoms";
import { useAtomValue, useSetAtom } from "jotai";
import React from "react";
import { WidgetHeader } from "../components/widget-header";
import { AlertTriangleIcon, ArrowLeft, Menu, MenuIcon } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { useQuery } from "convex/react";
import { api } from "../../../../../packages/backend/convex/_generated/api";

export const WidgetChatScreen = () => {
  const setScreen = useSetAtom(screenAtom);
  const setConversationId = useSetAtom(conversationIdAtom);
  const conversationId = useAtomValue(conversationIdAtom);
  const organizationId = useAtomValue(organizationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  );
  const conversation = useQuery(
    api.public.conversations.getOne,
    conversationId && contactSessionId
      ? {
          conversationId,
          contactSessionId,
        }
      : "skip"
  );
  const onBack = () => {
    setConversationId(null);
    setScreen("selection");
  };
  return (
    <>
      <WidgetHeader className="px-4 py-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-x-2">
            <Button
              size="icon"
              variant="transparent"
              onClick={onBack}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-medium">Chat</h1>
          </div>
          <Button size="icon" variant="transparent">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4">
        {JSON.stringify(conversation)}
      </div>
    </>
  );
};
