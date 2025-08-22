"use client";
import { useAtomValue } from "jotai";
import { WidgetAuthScreen } from "../screens/widget-auth-screen";
import { screenAtom } from "@/modules/atoms/widge-atoms";
import { WidgetErrorScreen } from "../screens/widget-error-screent";
import { WidgetLoadingScreen } from "../screens/widget-loading-screen";

interface WidgetViewProps {
  organizationId: string | null;
}

export const WidgetView = ({ organizationId }: WidgetViewProps) => {
  const screen = useAtomValue(screenAtom);
  const screenComponent ={
    loading: <WidgetLoadingScreen orgId={organizationId} />,
    error: <WidgetErrorScreen />,
    auth: <WidgetAuthScreen />,
    voice: <p>TODO : voice</p>,
    inbox: <p>TODO : inbox</p>,
    selection: <p>TODO : selection</p>,
    chat: <p>TODO : chat</p>,
    contact: <p>TODO : contact</p>,
  }
  return (
    <main className="min-h-screen min-w-screen flex h-full w-full flex-col overflow-hidden rounded-xl border border-border/50 bg-background shadow-lg">
      {screenComponent[screen]}
    </main>
  );
};