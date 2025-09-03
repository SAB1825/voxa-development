"use client";

import { useOrganization } from "@clerk/nextjs";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Separator } from "@workspace/ui/components/separator";
import { CopyIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { IntegrationId, INTEGRATIONS } from "../../constants";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { createScript } from "../../utils";

export const IntegrationsView = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState("");

  const handleIntegrationClick = (integrationId: IntegrationId) => {
    if(!organization) {
      toast.error("Organization not found");
      return;
    }

    const snippet = createScript(integrationId, organization.id);

    setSelectedSnippet(snippet);
    setDialogOpen(true);
  }

  const { organization } = useOrganization();
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(organization?.id ?? "");
      toast.success("Organization ID copied to clipboard");
    } catch (error) {
      console.log(error);
      toast.error("Failed to copy Organization ID");
    }
  };
  return (
    <>
    <IntegrationDialog 
      open={dialogOpen}
      onOpenChange={setDialogOpen}
      snippet={selectedSnippet}
    />
    <div className="flex min-h-screen flex-col bg-muted p-8">
      <div className="mx-auto w-full max-w-screen-md">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-4xl">Setup & Integrations</h1>
          <p>Integrate the chatbot to the various platform.</p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="flex items-center gap-4">
            <Label className="w-34" htmlFor="organization-id">
              Organization ID
            </Label>
            <Input
              disabled
              readOnly
              id="organization-id"
              value={organization?.id ?? ""}
            />
            <Button
              className="gap-2 cursor-pointer"
              onClick={handleCopy}
              size="sm"
            >
              <CopyIcon />
            </Button>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="space-y-6">
          <div className="space-y-1">
            <Label className="text-lg">Integrations</Label>
            <p className="text-muted-foreground">
              Add the following code to your website to enable the chatbot
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {INTEGRATIONS.map((integration) => (
              <button
                onClick={() => handleIntegrationClick(integration.id)}
                key={integration.id}
                className="flex items-center gap-4 rounded-lg border bg-background p-4 hover:bg-accent"
              >
                <Image
                  alt={integration.title}
                  height={32}
                  src={integration.icon}
                  width={32}
                />
                <p>{integration.title}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export const IntegrationDialog = ({
  open,
  onOpenChange,
  snippet,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  snippet: string;
}) => {

   const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet ?? "");
      toast.success("Snippet copied to clipboard");
    } catch (error) {
      console.log(error);
      toast.error("Failed to copy snippet");
    }
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Integrate with your website</DialogTitle>
          <DialogDescription>
            Follow these steps to add the chatbot to your website
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="rounded-md bg-accent p-2 text-sm">
              1. Copy the following snippet
            </div>
            <div className="group">
              <pre className="max-h-[300px] overflow-x-auto overflow-y-auto whitespace-pre-wrap break-all rounded-md bg-foreground p-2 font-mono text-secondary text-sm">
                {snippet}
              </pre>
              <Button
                className="absolute top-4 right-6 size-6 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={handleCopy}
                size="icon"
                variant="secondary"
              >
                <CopyIcon className="size-3" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="rounded-md bg-accent p-2 text-sm">
              2. Add the code in your page
            </div>
            <p className="text-sm text-muted-foreground">
              Paste the chatBot code above in your page. You can add it in the HTML head section  
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
