import { screenAtom } from "@/modules/atoms/widge-atoms";
import { useVapi } from "@/modules/hooks/use-vapi";
import { useSetAtom } from "jotai";
import { WidgetHeader } from "../components/widget-header";
import { Button } from "@workspace/ui/components/button";
import { ArrowLeft, ArrowLeftIcon, MicIcon, MicOff } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import {
  AIConversation,
  AIConversationContent,
} from "@workspace/ui/components/ai/conversation";
import {
  AIMessage,
  AIMessageContent,
} from "@workspace/ui/components/ai/message";
import { ms } from "zod/v4/locales";
import { set } from "date-fns";

export const WidgetVoiceScreen = () => {
  const setScreen = useSetAtom(screenAtom);
  const {
    isSpeaking,
    isConnected,
    transcript,
    startCall,
    isConnecting,
    endCall,
  } = useVapi();
  const onBack = () => {
    setScreen("selection");
  }
  return (
    <>
      <WidgetHeader className="px-4 py-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-x-2">
            <Button size="icon" variant="transparent" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <MicIcon />
            <h1 className="text-2xl font-semibold">Voice Call</h1>
          </div>
          
        </div>
      </WidgetHeader>
      {transcript.length > 0 ? (
        <AIConversation className="h-full">
          <AIConversationContent>
            {transcript.map((msg, index) => (
              <AIMessage
                from={msg.role}
                key={`${msg.role}-${index}-${msg.text}`}
              >
                <AIMessageContent>{msg.text}</AIMessageContent>
              </AIMessage>
            ))}
          </AIConversationContent>
        </AIConversation>
      ) : (
        <div className="flex flex-1 h-full flex-col items-center justify-center gap-y-4 ">
          <div className="flex items-center justify-center rounded-full border bg-white p-3">
            <MicIcon className="size-6 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Transcripts will appear here</p>
        </div>
      )}
      <div className="border-t bg-background p-4">
        {isConnected && (
          <div className="flex flex-col items-center gap-x-2">
            <div
              className={cn(
                "size-4 rounded-full",
                isSpeaking ? "animate-pulse bg-red-500" : "bg-green-500"
              )}
            />
            <span className="text-muted-foreground text-sm">
              {isSpeaking ? "Assistant Speaking..." : "Listening..."}
            </span>
          </div>
        )}
        <div className="flex w-full justify-center">
          {isConnected ? (
            <Button
              className="w-full"
              variant="destructive"
              onClick={() => endCall()}
              disabled={isConnecting}
            >
              <MicOff />
              End Call
            </Button>
          ) : (
            <Button
              className="w-full"
              onClick={() => startCall()}
              disabled={isConnecting}
            >
              <MicIcon />
              Start Call
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
