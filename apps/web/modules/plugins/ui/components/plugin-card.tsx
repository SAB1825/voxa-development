import { Button } from "@workspace/ui/components/button";
import { ArrowLeftIcon, ArrowLeftRightIcon, BluetoothConnectedIcon, type LucideIcon } from "lucide-react";
import Image from "next/image";

export interface Feature {
  icon: LucideIcon;
  label: string;
  description: string;
}

interface PluginCardProps {
  isDisabled?: boolean;
  features: Feature[];
  serviceName: string;
  serviceImage: string;
  onSubmit: () => void;
}

export const PluginCard = ({
  isDisabled,
  features,
  serviceName,
  serviceImage,
  onSubmit,
}: PluginCardProps) => {
  return (
    <div className="h-fit w-full rounded-lg border bg-background p-8">
      <div className="mb-6 flex items-center justify-center gap-6">
        <div className="flex flex-col items-center">
          <Image
            alt={serviceName}
            src={serviceImage}
            className="rounded object-contain"
            width={40}
            height={40}
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <ArrowLeftRightIcon />
        </div>
        <div className="flex flex-col items-center">
          <Image
            alt="Voxa"
            src="/logo.png"
            className="rounded object-contain"
            width={40}
            height={40}
          />
        </div>
      </div>
      <div className="mb-6 text-center">
        <p className="text-lg">
            <span> Connect your {serviceName} to Voxa</span>
        </p>
      </div>
      <div className="mb-6">
        <div className="space-y-4">
            {features.map((feature) => (
                <div className="flex items-center gap-3" key={feature.label}>
                    <div className="flex size-8 items-center justify-center rounded-lg border bg-muted">
                        <feature.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                        <div className="font-medium text-sm">
                            {feature.label}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            {feature.description}
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
      <div className="text-center">
        <Button
            className="size-full"
            disabled={isDisabled}
            onClick={onSubmit}
            variant="default"
        >
            Connect

        </Button>
      </div>
    </div>
  );
};
