"use client";
import { WidgetFooter } from "../components/widget-footer";
import { WidgetHeader } from "../components/widget-header";

interface WidgetViewProps {
  organizationId: string;
}

export const WidgetView = ({ organizationId }: WidgetViewProps) => {
  return (
    <main className="min-h-screen min-w-screen flex h-full w-full flex-col overflow-hidden rounded-xl border border-border/50 bg-background shadow-lg">
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-3 px-4 py-8">
          <p className="font-bold text-4xl tracking-tight text-primary-foreground">
            Hi there! 👋🏼
          </p>
          <p className="text-xl text-primary-foreground/90 font-medium">
            How can I assist you today?
          </p>
        </div>
      </WidgetHeader>
      
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-b from-muted/30 to-muted/10">
        <div className="text-center space-y-2">
          <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Organization ID
          </div>
          <div className="font-mono text-lg text-foreground bg-muted px-4 py-2 rounded-md border">
            {organizationId}
          </div>
        </div>
      </div>
      
      <WidgetFooter />
    </main>
  );
};