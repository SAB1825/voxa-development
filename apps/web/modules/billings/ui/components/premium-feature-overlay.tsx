"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  BookOpenIcon,
  BotIcon,
  GemIcon,
  LucideIcon,
  MicIcon,
  PaletteIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Feature {
  icon: LucideIcon;
  label: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: BotIcon,
    label: "AI Customer Support",
    description:
      "Use AI to provide instant and accurate responses to customer inquiries.",
  },
  {
    icon: MicIcon,
    label: "AI Voice Assistant",
    description:
      "Integrate voice assistant capabilities into your application.",
  },
  {
    icon: BookOpenIcon,
    label: "AI Knowledge Base",
    description: "Train AI on your documentations",
  },
  {
    icon: PaletteIcon,
    label: "Widget Customization",
    description: "Customize your chat widget appearance",
  },
];
interface PremiumFeatureOverlayProps {
  children: React.ReactNode;
}

export const PremiumFeatureOverlay = ({
  children,
}: PremiumFeatureOverlayProps) => {
    const router = useRouter()
  return (
    <div className="relative min-h-screen ">
      <div className="pointer-events-none select-non blur-[2px]">
        {children}
      </div>
      <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-[2px]" />
      <div className="absolute inset-0 z-40 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center">
              <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full border bg-muted">
                <GemIcon className="size-6 text-muted-foreground" />
              </div>
            </div>
            <CardTitle className="text-xl">Premium Feature</CardTitle>
            <CardDescription>
              This feature requires a premium subscription.
            </CardDescription>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                {features.map((feature) => (
                  <div key={feature.label} className="flex items-start gap-3 mt-4">
                    <div className="flex size-8 items-center justify-center rounded-lg border bg-muted">
                      <feature.icon className="size-4 text-muted-foreground" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">{feature.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                className="w-full"
                onClick={() => router.push("/billing")}
              >
                View Plans
              </Button>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
