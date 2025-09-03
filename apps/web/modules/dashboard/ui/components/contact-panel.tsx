"use client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@workspace/ui/components/accordion";
import Bowser from "bowser";
import { getCountryFlagUrl, getCountryFromTimezone } from "@/lib/country-utils";
import { api } from "@workspace/backend/_generated/api";
import { Id } from "@workspace/backend/_generated/dataModel";
import { Button } from "@workspace/ui/components/button";
import { DicebearAvatar } from "@workspace/ui/components/dicebear-avatar";
import { useQuery } from "convex/react";
import { 
  Mail, 
  Globe, 
  Monitor, 
  Smartphone, 
  Clock, 
  MapPin,
  Phone,
  Calendar,
  Activity,
  Wifi,
  Languages
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export const ContactPanel = () => {
  const params = useParams();
  const conversationId = params.conversationId as Id<"conversations">;
  const contactSession = useQuery(
    api.private.contactSessions.getOneByConversationId,
    conversationId
      ? {
          conversationId,
        }
      : "skip"
  );

  const parseUserAgent = useMemo(() => {
    return (userAgent?: string) => {
      if (!userAgent) {
        return {
          browser: "unknown",
          os: "unknown",
          device: "unknown",
        };
      }
      const browser = Bowser.getParser(userAgent);
      const result = browser.getResult();
      return {
        browser: result.browser.name || "unknown",
        browserVersion: result.browser.version || "",
        os: result.os.name || "unknown",
        osVersion: result.os.version || "",
        device: result.platform.type || "desktop",
        deviceVendor: result.platform.vendor || "",
        deviceModel: result.platform.model || "",
      };
    };
  }, []);

  const userAgentInfo = useMemo(
    () => parseUserAgent(contactSession?.metadata?.userAgent),
    [contactSession?.metadata?.userAgent, parseUserAgent]
  );

  const countryInfo = useMemo(() => {
    return getCountryFromTimezone(contactSession?.metadata?.timezone);
  }, [contactSession?.metadata?.timezone]);

  const formatDate = (timestamp?: string | number) => {
    if (!timestamp) return "Unknown";
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return "Unknown";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType.toLowerCase()) {
      case 'mobile':
        return <Smartphone className="h-4 w-4" />;
      case 'tablet':
        return <Smartphone className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  if (contactSession === undefined || contactSession === null) {
    return null;
  }

  const metadata = contactSession.metadata || {};

  return (
    <div className="flex h-full w-full flex-col bg-background text-foreground">
      <div className="flex flex-col gap-y-4 p-4">
        <div className="flex items-center gap-x-2">
          <DicebearAvatar
            badgeImageUrl={
              countryInfo?.code
                ? getCountryFlagUrl(countryInfo.code)
                : undefined
            }
            seed={contactSession._id}
            size={42}
          />
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center gap-x-2">
              <h4 className="line-clamp-1">{contactSession.name}</h4>
            </div>
            <p className="line-clamp-1 text-muted-foreground text-sm">
              {contactSession.email}
            </p>
          </div>
        </div>
        <Button asChild size="lg" className="w-full">
          <Link href={`mailto:${contactSession.email}`}>
            <Mail />
            <span>Send Email</span>
          </Link>
        </Button>
      </div>

      <div className="flex-1 overflow-auto px-4 pb-4">
        <Accordion type="multiple" className="w-full">
          {/* Device & Browser Information */}
          <AccordionItem value="device-info">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-x-2">
                {getDeviceIcon(userAgentInfo.device)}
                <span>Device & Browser</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Browser</p>
                    <p className="text-sm">
                      {userAgentInfo.browser}
                      {userAgentInfo.browserVersion && ` ${userAgentInfo.browserVersion}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Device</p>
                    <p className="text-sm capitalize">{userAgentInfo.device}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Operating System</p>
                    <p className="text-sm">
                      {userAgentInfo.os}
                      {userAgentInfo.osVersion && ` ${userAgentInfo.osVersion}`}
                    </p>
                  </div>
                  {userAgentInfo.deviceVendor && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Vendor</p>
                      <p className="text-sm">{userAgentInfo.deviceVendor}</p>
                    </div>
                  )}
                </div>
                {metadata.userAgent && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">User Agent</p>
                    <p className="text-xs text-muted-foreground break-all">
                      {metadata.userAgent}
                    </p>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Location & Network */}
          <AccordionItem value="location-info">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-x-2">
                <MapPin className="h-4 w-4" />
                <span>Location</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  {countryInfo && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Country</p>
                      <div className="flex items-center gap-x-1">
                        <img 
                          src={getCountryFlagUrl(countryInfo.code as string)} 
                          alt={countryInfo.name}
                          className="h-4 w-6 object-cover rounded-sm"
                        />
                        <p className="text-sm">{countryInfo.name}</p>
                      </div>
                    </div>
                  )}
                  {metadata.timezone && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Timezone</p>
                      <p className="text-sm">{metadata.timezone}</p>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {metadata.language && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Language</p>
                      <p className="text-sm">{metadata.language}</p>
                    </div>
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Session Information */}
          <AccordionItem value="session-info">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-x-2">
                <Activity className="h-4 w-4" />
                <span>Session Details</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-4">
                  {contactSession && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Session Started</p>
                      <p className="text-sm">{formatDate(contactSession._creationTime)}</p>
                    </div>
                  )}
                  {contactSession && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Duration (24h after start)</p>
                      <p className="text-sm">
                        {formatDate(Number(contactSession._creationTime) + 24 * 60 * 60 * 1000)}
                      </p>
                    </div>
                  )}
                      
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          

          

          {/* Raw Metadata (for debugging) */}
          <AccordionItem value="raw-metadata">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-x-2">
                <Calendar className="h-4 w-4" />
                <span>Raw Metadata</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <pre className="text-xs bg-muted p-3 rounded overflow-auto max-h-60">
                {JSON.stringify(metadata, null, 2)}
              </pre>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};