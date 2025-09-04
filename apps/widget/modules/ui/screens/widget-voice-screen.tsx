import { screenAtom } from "@/modules/atoms/widge-atoms";
import { useVapi } from "@/modules/hooks/use-vapi";
import { useSetAtom } from "jotai";
import { WidgetHeader } from "../components/widget-header";
import { Button } from "@workspace/ui/components/button";
import { ArrowLeft, ArrowLeftIcon, MicIcon, MicOff, AlertTriangle, X } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import { useEffect, useState } from "react";
import {
  AIConversation,
  AIConversationContent,
} from "@workspace/ui/components/ai/conversation";
import {
  AIMessage,
  AIMessageContent,
} from "@workspace/ui/components/ai/message";

// Error Alert Component
const ErrorAlert = ({ 
  message, 
  onDismiss 
}: { 
  message: string; 
  onDismiss: () => void; 
}) => (
  <div className="mx-4 mb-4 rounded-lg border border-red-200 bg-red-50 p-4">
    <div className="flex items-start">
      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
      <div className="ml-3 flex-1">
        <h3 className="text-sm font-medium text-red-800">
          Voice Call Error
        </h3>
        <p className="mt-1 text-sm text-red-700">{message}</p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onDismiss}
        className="ml-auto h-6 w-6 p-0 text-red-500 hover:text-red-700"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

// Connection Status Component
const ConnectionStatus = ({ 
  isConnected, 
  isConnecting, 
  isSpeaking 
}: { 
  isConnected: boolean; 
  isConnecting: boolean; 
  isSpeaking: boolean; 
}) => {
  if (isConnecting) {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="size-4 rounded-full bg-yellow-500 animate-pulse" />
          <span className="text-muted-foreground text-sm">Connecting...</span>
        </div>
      </div>
    );
  }

  if (isConnected) {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
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
      </div>
    );
  }

  return null;
};

export const WidgetVoiceScreen = () => {
  const setScreen = useSetAtom(screenAtom);
  const [showError, setShowError] = useState(true);
  
  const {
    isSpeaking,
    isConnected,
    isError,
    errorMessage,
    transcript,
    startCall,
    isConnecting,
    endCall,
  } = useVapi();

  const onBack = () => {
    setScreen("selection");
  };

  const dismissError = () => {
    setShowError(false);
  };

  // Reset error visibility when error changes
  useEffect(() => {
    if (isError && errorMessage) {
      setShowError(true);
    }
  }, [isError, errorMessage]);

  const getCallButtonText = () => {
    if (isConnecting) return "Connecting...";
    if (isConnected) return "End Call";
    return "Start Call";
  };

  const getCallButtonIcon = () => {
    if (isConnecting) return <MicIcon className="animate-pulse" />;
    if (isConnected) return <MicOff />;
    return <MicIcon />;
  };

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

      {/* Error Display */}
      {isError && errorMessage && showError && (
        <ErrorAlert 
          message={errorMessage} 
          onDismiss={dismissError}
        />
      )}

      {/* Main Content Area */}
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
        <div className="flex flex-1 h-full flex-col items-center justify-center gap-y-4">
          <div className="flex items-center justify-center rounded-full border bg-white p-3">
            <MicIcon className="size-6 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-center px-4">
            {isError 
              ? "Please resolve the error above and try again" 
              : "Transcripts will appear here"}
          </p>
        </div>
      )}

      {/* Bottom Controls */}
      <div className="border-t bg-background p-4">
        <ConnectionStatus 
          isConnected={isConnected}
          isConnecting={isConnecting}
          isSpeaking={isSpeaking}
        />
        
        <div className="flex w-full justify-center mt-4">
          {isConnected ? (
            <Button
              className="w-full"
              variant="destructive"
              onClick={endCall}
              disabled={isConnecting}
            >
              {getCallButtonIcon()}
              {getCallButtonText()}
            </Button>
          ) : (
            <Button
              className="w-full"
              onClick={startCall}
              disabled={isConnecting || isError}
            >
              {getCallButtonIcon()}
              {getCallButtonText()}
            </Button>
          )}
        </div>

        {/* Additional Error Context */}
        {isError && !isConnected && (
          <p className="text-center text-sm text-muted-foreground mt-2">
            Voice call functionality is currently unavailable
          </p>
        )}
      </div>
    </>
  );
};