"use client";
import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export const SignUpView = () => {
  return (
    <div className="w-full">
      <SignUp
        appearance={{
          elements: {
            footer: { display: "none" },
            card: {
              backgroundColor: "transparent",
              boxShadow: "none",
              border: "none",
            },
            rootBox: {
              width: "100%",
            },
          },
        }}
        routing="hash"
      />

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-primary hover:text-primary/80 font-medium underline-offset-4 hover:underline"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};
