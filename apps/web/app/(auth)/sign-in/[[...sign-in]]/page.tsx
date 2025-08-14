"use client";
import { SignIn } from "@clerk/nextjs";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="">

      <SignIn
        appearance={{
          elements: {
            footer: { display: "none" },
            card: {
              backgroundColor: "transparent",
              boxShadow: "none",
              border: "none",
            },
          },
        }}
      />

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="/sign-up"
            className="text-primary hover:text-primary/80 font-medium underline-offset-4 hover:underline"
          >
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page