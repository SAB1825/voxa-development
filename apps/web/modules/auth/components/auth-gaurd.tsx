"use client";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import React from "react";
import { AuthLayout } from "../layout/auth-layout";
import { SingInView } from "../views/sign-in-view";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthLoading>
        <AuthLayout>
          <p>Loading...</p>
        </AuthLayout>
      </AuthLoading>
      <Authenticated>{children}</Authenticated>
      <Unauthenticated>
        <AuthLayout>
          <SingInView />
        </AuthLayout>
      </Unauthenticated>
    </>
  );
};
