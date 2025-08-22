"use client";

import { useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { WidgetHeader } from "../components/widget-header";
import { Loader } from "lucide-react";
import {
    contactSessionIdAtomFamily,
  errorMessageAtom,
  loadingMessageAtom,
  organizationIdAtom,
  screenAtom,
} from "@/modules/atoms/widge-atoms";
import { useAction, useMutation } from "convex/react";
import { api } from "../../../../../packages/backend/convex/_generated/api";
import { set } from "zod/v4-mini";

type InitStep = "org" | "session" | "setting" | "vapi" | "done";

export const WidgetLoadingScreen = ({ orgId }: { orgId: string | null }) => {
  const [step, setStep] = useState<InitStep>("org");
  const [sessionValid, setSessionValid] = useState<boolean>(false);

  const loadingMessage = useAtomValue(loadingMessageAtom);
  const setErrorMessage = useSetAtom(errorMessageAtom);
  const setScreen = useSetAtom(screenAtom);
  const setLoadingMessage = useSetAtom(loadingMessageAtom);
  const setOrganizationId = useSetAtom(organizationIdAtom);

  const contactSessionId = useAtomValue(contactSessionIdAtomFamily(orgId || ""));

  const validateOrganization = useAction(api.public.organizations.validate);

  useEffect(() => {
    if (step !== "org") {
      return;
    }
    setLoadingMessage("Loading organization...");
    if (!orgId) {
      setErrorMessage("Organization ID is required!");
      setScreen("error");
      return;
    }
    setLoadingMessage("Verifying Organizations...");
    validateOrganization({ organizationId: orgId })
      .then((res) => {
        if (res.valid) {
          setOrganizationId(orgId);
          setStep("session");
        } else {
          setErrorMessage(res.reason || "Invalid Configurations!");
          setScreen("error");
        }
      })
      .catch((err) => {
        setErrorMessage(
          err.message || "An error occurred while validating organization."
        );
        setScreen("error");
      });
  }, [
    orgId,
    step,
    setErrorMessage,
    setScreen,
    setOrganizationId,
    setStep,
    validateOrganization,
    setLoadingMessage
  ]);

  const validateSession = useMutation(api.public.contactSessions.validate);
  useEffect(() => {
    if (step !== "session") {
      return;
    }

    setLoadingMessage("Loading session...");
    if(!contactSessionId) {
        setSessionValid(false);
        setStep("done");
        return;
    }
    setLoadingMessage("Validating session...");
    validateSession({
        //IF ERROR OCCURS GET INTO 6.12.44 TIMESTAMPS
        contactSessionId : contactSessionId
    })
      .then((res) => {
        
          setSessionValid(res.valid);
          setStep("done");
        
      })
      .catch((err) => {
        setSessionValid(false);
        setStep("done")
      });
  }, [
    step,
    setErrorMessage,
    setScreen,
    setSessionValid,
    setStep,
    validateSession,
    setLoadingMessage
  ]);

  useEffect(() => {
    if (step !== "done") {
      return;
    }
    const hasValidSession = sessionValid && contactSessionId;
    setScreen(hasValidSession ? "selection" : "auth");
  }, [step, setLoadingMessage]);

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-3 px-4 py-8">
          <p className="font-bold text-4xl tracking-tight text-primary-foreground">
            Hi there! 👋🏼
          </p>
          <p className="text-xl text-primary-foreground/90 font-medium">
            Let&apos;s get you started.
          </p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4">
        <Loader className="animate-spin" />
        <p>{loadingMessage || "Loading..."}</p>
      </div>
    </>
  );
};
