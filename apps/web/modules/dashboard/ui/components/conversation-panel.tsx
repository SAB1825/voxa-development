"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  CornerUpLeftIcon,
  ListIcon,
} from "lucide-react";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { UseInfiniteScroll } from "@workspace/ui/hooks/use-inifite-scroll";
import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger";
import { DicebearAvatar } from "@workspace/ui/components/dicebear-avatar";
import { usePaginatedQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { getCountryFlagUrl, getCountryFromTimezone } from "@/lib/country-utils";
import Link from "next/link";
import { cn } from "@workspace/ui/lib/utils";
import { usePathname } from "next/dist/client/components/navigation";
import { formatDistanceToNow } from "date-fns";
import { ConversationStatusIcon } from "@workspace/ui/components/converation-status-icon";
import { useAtomValue, useSetAtom } from "jotai/react";
import { statusFilterAtom } from "../../atoms";
import { Skeleton } from "@workspace/ui/components/skeleton";
export const ConversationPanel = () => {
  const pathname = usePathname();
  const statusFilter = useAtomValue(statusFilterAtom);
  const setStatusFilter = useSetAtom(statusFilterAtom);

  const conversation = usePaginatedQuery(
    api.private.conversations.getMany,
    {
      status: statusFilter === "all" ? undefined : statusFilter,
    },
    {
      initialNumItems: 10,
    }
  );

  const {
    topElementRef,
    handleLoadMore,
    canLoadMore,
    isLoadingMore,
    isLoadingFirstPage,
  } = UseInfiniteScroll({
    status: conversation.status,
    loadMore: conversation.loadMore,
    loadSize: 10,
  });
  return (
    <div className="flex h-full w-full flex-col bg-background text-sidebar-foreground">
      <div className="flex flex-col gap-3.5 border-b p-2">
        <Select
          defaultValue="all"
          onValueChange={(value) =>
            setStatusFilter(
              value as "unresolved" | "escalated" | "resolved" | "all"
            )
          }
          value={statusFilter}
        >
          <SelectTrigger className="h-8 border-none px-1.5  shadow-none hover:bg-accent">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              <ListIcon className="size-4" />
              <span>All</span>
            </SelectItem>
            <SelectItem value="unresolved">
              <ArrowRightIcon className="size-4" />
              <span>Unresolved</span>
            </SelectItem>
            <SelectItem value="escalated">
              <ArrowLeftIcon className="size-4" />
              <span>Escalated</span>
            </SelectItem>
            <SelectItem value="resolved">
              <CheckIcon className="size-4" />
              <span>Resolved</span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      {isLoadingFirstPage ? (
        <SkeletonConversations />
      ) : (
        <ScrollArea className="max-h-[calc(100vh-53px)]">
          <div className="flex w-full flex-1 flex-col text-sm">
            {conversation.results.map((conv) => {
              const isLastMessageFromOperator =
                conv.lastMessage?.message?.role !== "user";
              const country = getCountryFromTimezone(
                conv.contactSession.metadata?.timezone
              );
              const countryFlagUrl = country?.code
                ? getCountryFlagUrl(country.code)
                : undefined;
              return (
                <Link
                  key={conv._id}
                  href={`/conversations/${conv._id}`}
                  className={cn(
                    "relative flex cursor-pointer items-start gap-3 border-b p-4 py-5 text-sm leading-tight hover:bg-accent hover:text-accent-foreground",
                    pathname === `/conversations/${conv._id}` &&
                      "bg-accent text-accent-foreground"
                  )}
                >
                  <div
                    className={cn(
                      "-translate-y-1/2 absolute top-1/2 left-0 h-[64%] w-1 rounded-r-full bg-neutral-300 opacity-0 transition-opacity",
                      pathname === `/conversations/${conv._id}` && "opacity-100"
                    )}
                  ></div>
                  <DicebearAvatar
                    seed={conv.contactSession._id}
                    badgeImageUrl={countryFlagUrl}
                    size={40}
                    className="shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex w-full items-center gap-2">
                      <span className="truncate font-bold">
                        {conv.contactSession.name}
                      </span>
                      <span className="ml-auto shrik-0 text-muted-foreground text-xs">
                        {formatDistanceToNow(conv._creationTime)}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between gap-2">
                      <div className="flex w-0 grow items-center gap-1">
                        {isLastMessageFromOperator && (
                          <CornerUpLeftIcon className="size-3 shrink-0 text-muted-foreground" />
                        )}
                        <span
                          className={cn(
                            "line-clamp-1 text-muted-foreground text-xs",
                            !isLastMessageFromOperator && "font-bold text-black"
                          )}
                        >
                          {conv.lastMessage?.text}
                        </span>
                      </div>
                      <ConversationStatusIcon status={conv.status} />
                    </div>
                  </div>
                </Link>
              );
            })}
            <InfiniteScrollTrigger
              canLoadMore={canLoadMore}
              isLoadingMore={isLoadingMore}
              onLoadMore={handleLoadMore}
              ref={topElementRef}
            />
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export const SkeletonConversations = () => {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto">
      <div className="relative flex w-full min-w-0 flex-col p-2">
        <div className="w-full space-y-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              className="flex items-start gap-3 rounded-lg p-4 border-b"
              key={index}
            >
              {/* Avatar skeleton */}
              <Skeleton className="h-10 w-10 rounded-full shrink-0" />
              
              <div className="flex-1 space-y-2">
                {/* Name and timestamp row */}
                <div className="flex items-center justify-between gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-12 shrink-0" />
                </div>
                
                {/* Message preview and status row */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 flex-1">
                    {/* Optional reply icon skeleton */}
                    {index % 3 === 0 && (
                      <Skeleton className="h-3 w-3 shrink-0" />
                    )}
                    <Skeleton className="h-3 w-full max-w-[200px]" />
                  </div>
                  {/* Status icon skeleton */}
                  <Skeleton className="h-4 w-4 rounded-full shrink-0" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
