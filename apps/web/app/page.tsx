"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";

export default function Page() {
  const addUser = useMutation(api.users.addUser);
  const users = useQuery(api.users.getMany);
  return (
    <>
      <Authenticated>
        <div className="flex flex-col items-center justify-center min-h-svh">
          <p>app/web</p>
          <Button onClick={() => addUser()}>Add User</Button>
          {JSON.stringify(users, null, 2)}
          <UserButton />
        </div>
      </Authenticated>
      <Unauthenticated>
        <div className="flex items-center justify-center min-h-svh">
          <p>Please log in to see the content.</p>
          <SignInButton>Sign-IN</SignInButton>
        </div>
      </Unauthenticated>
    </>
  );
}
