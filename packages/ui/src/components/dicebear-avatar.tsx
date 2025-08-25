

import { glass } from "@dicebear/collection"
import { createAvatar } from "@dicebear/core"
import { useMemo } from "react";
import { Avatar, AvatarImage } from "@workspace/ui/components/avatar";
import { cn } from "@workspace/ui/lib/utils";


interface DicebearAvatarProps {
  seed: string;
  size: number;
  className?: string;
  badgeClassName?: string;
  imageUrl?: string;
  badgeImageUrl?: string;
}

export const DicebearAvatar = ({
  seed,
  size,
  className,
  badgeClassName,
  imageUrl,
  badgeImageUrl,
}: DicebearAvatarProps) => {
  const avatarSrc = useMemo(() => {
    if(imageUrl) {
        return imageUrl;
    }

    const avatar = createAvatar(glass, {
        seed : seed.toLowerCase().trim(),
        size,
    })

    return avatar.toDataUri()
  }, [ seed, size])

  const badgeSize = Math.round(size * 0.5);

  return (
    <div
        className="relative inline-block"
        style={{ width: size, height: size }}
    >
      <Avatar 
        className={cn("border", className)}
        style={{ width: size, height: size }}
      >
        <AvatarImage alt="image" src={avatarSrc} />
    </Avatar>
    {badgeImageUrl && (
        <div
            className={cn("absolute bottom-0 right-0 rounded-full border-2 overflow-hidden bg-background border-background", badgeClassName)}
            style={{ width: badgeSize, height: badgeSize, transform: "translate(15%, 15%)" }}
        >
            <img 
                alt="badge"
                src={badgeImageUrl}
                width={badgeSize}
                height={badgeSize}
                className="object-cover w-full h-full"
            />
        </div>
    )}
    </div>
  );
};
