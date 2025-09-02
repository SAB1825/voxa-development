"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@workspace/ui/components/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { BotIcon, PhoneIcon, SettingsIcon, UnplugIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { VapiPhoneNumbersTab } from "./vapi-phone-numbers-tab";
import { VapiAssistantsTab } from "./vapi-connected-assistance-tab";

interface VapiConnectedViewProps {
  onDisconnect: () => void;
}

export const VapiConnectedView = ({ onDisconnect }: VapiConnectedViewProps) => {
  const [activeTab, setActiveTab] = useState(
    "phone-numbers"
  );
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                alt="VAPI Logo"
                className="rounded-lg object-contain"
                height={48}
                width={48}
                src="/vapi.jpg"
              />
              <div>
                <CardTitle>Vapi Integerations</CardTitle>
                <CardDescription>
                  Manage your phone numbers and assistants.
                </CardDescription>
              </div>
            </div>
            <div>
              <Button onClick={onDisconnect} size="sm" variant="destructive">
                <UnplugIcon />
                Disconnect
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              
              <div className="flex size-12 items-center justify-center rounded-lg border bg-muted ">
                <SettingsIcon className="size-6 text-muted-foreground" />
                
              </div>
              <div>
              <CardTitle>Widget Configuration</CardTitle>
                <CardDescription>
                  Set up voice calls for you chat widget
                </CardDescription>
              </div>
            </div>
            <Button asChild>
              <Link 
                href="/customization"
              >
                <SettingsIcon />
                Configure
              </Link>
            </Button>
          </div>
        </CardHeader>
      </Card>
      <div className="overflow-hidden rounded-lg border bg-background">
        <Tabs
          className="gap-0"
          defaultValue="phone-numbers"
          onValueChange={setActiveTab}
          value={activeTab}
        >
          <TabsList
            className="grid h-12 w-full grid-cols-2 p-0"
          >
            <TabsTrigger value="phone-numbers" className="h-full rounded-none">
              <PhoneIcon />
              Phone Numbers
            </TabsTrigger>
            <TabsTrigger value="assistants" className="h-full rounded-none">
              <BotIcon />
              AI Assistant
            </TabsTrigger>
          </TabsList>
          <TabsContent value="phone-numbers">
            <VapiPhoneNumbersTab />
          </TabsContent>
          <TabsContent value="assistants">
            <VapiAssistantsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
