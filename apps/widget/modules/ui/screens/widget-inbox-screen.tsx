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
import { WidgetFooter } from "../components/widget-footer";
import { Button } from "@workspace/ui/components/button";
import { ArrowLeftIcon, MessageCircle, Clock, Inbox } from "lucide-react";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../../../../packages/backend/convex/_generated/api";
import { formatDistanceToNow } from "date-fns";
import { ConversationStatusIcon } from "@workspace/ui/components/converation-status-icon";
import { UseInfiniteScroll } from "@workspace/ui/hooks/use-inifite-scroll";
import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger";

export const WidgetInboxScreen = () => {
  const errorMessage = useAtomValue(errorMessageAtom);
  const setScreen = useSetAtom(screenAtom);
  const setConversationId = useSetAtom(conversationIdAtom);
  const organizationId = useAtomValue(organizationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  );

  const conversations = usePaginatedQuery(
    api.public.conversations.getMany,
    contactSessionId
      ? {
          contactSessionId,
        }
      : "skip",
    {
      initialNumItems: 10,
    }
  );
  const { topElementRef, handleLoadMore, canLoadMore, isLoadingMore } =
    UseInfiniteScroll({
      status: conversations.status,
      loadMore: conversations.loadMore,
      loadSize: 10,
    });
  return (
    <>
      <WidgetHeader>
        <div className="flex items-center gap-x-3 py-3">
          <Button
            variant="transparent"
            size="icon"
            onClick={() => setScreen("selection")}
            className=" transition-colors duration-200"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-x-2">
            <Inbox className="h-6 w-6" />
            <h1 className="text-2xl font-semibold">Inbox</h1>
          </div>
        </div>
      </WidgetHeader>

      <div className="flex flex-1 flex-col px-4 pt-2 pb-4 overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-2">
          {conversations?.results && conversations.results.length > 0 ? (
            conversations.results.map((conversation) => (
              <Button
                key={conversation._id}
                className="h-auto min-h-[80px] w-full p-4 justify-start hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-gray-300"
                onClick={() => {
                  setConversationId(conversation._id);
                  setScreen("chat");
                }}
                variant="outline"
              >
                <div className="flex w-full flex-col gap-3 text-left">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-x-2">
                      <MessageCircle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm font-medium">Chat</span>
                      <div className="ml-2">
                        <ConversationStatusIcon status={conversation.status} />
                      </div>
                    </div>
                    <div className="flex items-center gap-x-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>
                        {formatDistanceToNow(conversation._creationTime, {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>

                  {conversation.lastMessage?.text && (
                    <div className="w-full">
                      <p className="text-sm text-muted-foreground truncate leading-relaxed">
                        {conversation.lastMessage.text}
                      </p>
                    </div>
                  )}
                </div>
              </Button>
            ))
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
              <MessageCircle className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                No conversations yet
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Your chat history will appear here once you start a conversation
              </p>
            </div>
          )}

          {conversations?.isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-gray-600"></div>
            </div>
          )}
        </div>
        {conversations?.results &&
          conversations.results.length > 0 &&
          conversations.status === "CanLoadMore" && (
            <div className="pt-4 border-t border-gray-100">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => conversations.loadMore(5)}
                disabled={conversations.isLoading}
              >
                {conversations.isLoading ? "Loading..." : "Load More"}
              </Button>
            </div>
          )}
          <InfiniteScrollTrigger 
            canLoadMore={canLoadMore}
            isLoadingMore={isLoadingMore}
            onLoadMore={handleLoadMore}
            ref={topElementRef}
          />
      </div>


      <WidgetFooter />
    </>
  );
};
