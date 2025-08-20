"use client";

import { useVapi } from "@/modules/hooks/use-vapi";
import { Button } from "@workspace/ui/components/button";

export default function Page() {
  const { isSpeaking, isConnected, isConnecting, transcript, startCall, endCall } = useVapi();
  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-svh">
      <Button onClick={() => startCall()}>
        Start Call
      </Button>
      <Button onClick={() => endCall()}>
        End Call
      </Button>
      <p>isConnected: {isConnected ? "Yes" : "No"}</p>
      <p>isSpeaking: {isSpeaking ? "Yes" : "No"}</p>
      <p>isConnecting: {isConnecting ? "Yes" : "No"}</p>
      <div>
        {JSON.stringify(transcript, null, 2)}
      </div>
    </div>
  )
}
