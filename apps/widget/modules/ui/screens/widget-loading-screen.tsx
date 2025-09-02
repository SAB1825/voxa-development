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
  vapiSecretAtom,
  widgetSettingsAtom,
} from "@/modules/atoms/widge-atoms";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../../../../../packages/backend/convex/_generated/api";

type InitStep = "org" | "session" | "setting" | "vapi" | "done";

export const WidgetLoadingScreen = ({
  organizationId,
}: {
  organizationId: string | null;
}) => {
  const [step, setStep] = useState<InitStep>("org");
  const [sessionValid, setSessionValid] = useState<boolean>(false);

  const loadingMessage = useAtomValue(loadingMessageAtom);
  const setErrorMessage = useSetAtom(errorMessageAtom);
  const setScreen = useSetAtom(screenAtom);
  const setLoadingMessage = useSetAtom(loadingMessageAtom);
  const setOrganizationId = useSetAtom(organizationIdAtom);
  const setWidgetSetting = useSetAtom(widgetSettingsAtom);
  const setVapiSecretsAtom = useSetAtom(vapiSecretAtom)

  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  );


//STEP : 1
  const validateOrganization = useAction(api.public.organizations.validate);

  useEffect(() => {
    if (step !== "org") {
      return;
    }
    setLoadingMessage("Loading organization...");
    if (!organizationId) {
      setErrorMessage("Organization ID is required!");
      setScreen("error");
      return;
    }
    setLoadingMessage("Verifying Organizations...");
    validateOrganization({ organizationId: organizationId })
      .then((res) => {
        if (res.valid) {
          setOrganizationId(organizationId);
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
    organizationId,
    step,
    setErrorMessage,
    setScreen,
    setOrganizationId,
    setStep,
    validateOrganization,
    setLoadingMessage,
  ]);
  

//STEP : 2 
  const validateSession = useMutation(api.public.contactSessions.validate);
  useEffect(() => {
    if (step !== "session") {
      return;
    }

    setLoadingMessage("Loading session...");
    if (!contactSessionId) {
      setSessionValid(false);
      setStep("setting");
      return;
    }
    setLoadingMessage("Validating session...");
    validateSession({
      //IF ERROR OCCURS GET INTO 6.12.44 TIMESTAMPS
      contactSessionId: contactSessionId,
    })
      .then((res) => {
        setSessionValid(res.valid);
        setStep("setting");
      })
      .catch((err) => {
        setSessionValid(false);
        setStep("setting");
      });
  }, [
    step,
    setErrorMessage,
    setScreen,
    setSessionValid,
    setStep,
    validateSession,
    setLoadingMessage,
  ]);


// STEP : 3
  const widgetSettings = useQuery(
    api.public.widgetSettings.getByOrganizationId,
    organizationId
      ? {
          organizationId,
        }
      : "skip"
  );
  useEffect(() => {
    if (step !== "setting") {
      return;
    }
    setLoadingMessage("Loading widget settings...");
    if (widgetSettings !== undefined) {
      setWidgetSetting(widgetSettings);
      setStep("vapi");
    }
  }, [step, widgetSettings, setWidgetSetting, setLoadingMessage]);


  //STEP : 4
  const getVapiSecret = useAction(api.public.secrets.getVapiSecrets);
  useEffect(() => {
    if(step !== "vapi" ) {
      return ;
    }
    if(!organizationId) {
      setErrorMessage("Organization ID is required!");
      setScreen("error");
      return;
    }
    setLoadingMessage("Loading Voice Features...")
    getVapiSecret({
      organizationId: organizationId
    })
    .then((secrets) => {
      setVapiSecretsAtom(secrets)
      setStep("done")
    })
    .catch(() => {
      setVapiSecretsAtom(null)
      setStep("done")
    })
  },[
    step,
    organizationId,
    getVapiSecret,
    setVapiSecretsAtom,
    setStep
  ])




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
