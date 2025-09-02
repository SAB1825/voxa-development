import { useEffect, useState } from "react";
import Vapi from "@vapi-ai/web";
import { useAtomValue } from "jotai";
import { vapiSecretAtom, widgetSettingsAtom } from "../atoms/widge-atoms";

interface TranscriptMessage {
  role: "user" | "assistant";
  text: string;
}

export const useVapi = () => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
  const vapiSecrets = useAtomValue(vapiSecretAtom);
  const widgetSettings = useAtomValue(widgetSettingsAtom);

  useEffect(() => {
    //ONLY FOR TESTING API, OTHERWISE CUSTOMER WILL PROVIDE THEIR OWN API KEYS
    if(!vapiSecrets) {
      return;
    }
    const vapiInstance = new Vapi(vapiSecrets.publicApiKey);
    setVapi(vapiInstance);
    vapiInstance.on("call-start", () => {
      setIsConnected(true);
      setIsConnecting(false);
      setTranscript([]);
    });
    vapiInstance.on("call-end", () => {
      setIsConnected(false);
      setIsConnecting(false);
      setIsSpeaking(false);
    });
    vapiInstance.on("speech-start", () => {
      setIsSpeaking(true);
    });
    vapiInstance.on("speech-end", () => {
      setIsSpeaking(false);
    });
    vapiInstance.on("error", (error) => {
      console.error("VAPI Error:", error);
      setIsConnected(false);
    });
    vapiInstance.on("message", (message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setTranscript((prev) => [
          ...prev,
          {
            role: message.role === "user" ? "user" : "assistant",
            text: message.transcript,
          },
        ]);
      }
    });

    return () => {
        vapiInstance?.stop();
    }
  }, []);

  const startCall = ()=> {
    if(!vapiSecrets || !widgetSettings?.vapiSettings?.assistantId) {
      return;
    }
    setIsConnecting(true);

    if(vapi) {
        vapi.start(widgetSettings.vapiSettings.assistantId)
    }
  };
  const endCall = () => {
    if(vapi) {
        vapi.stop();
    }
  }

  return {
    isSpeaking,
    isConnected,
    isConnecting,
    transcript,
    startCall,
    endCall
  }
};
