"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

export default function Page() {
  const addUser = useMutation(api.users.addUser);
  const users = useQuery(api.users.getMany);
  return (
    <>
        <div className="flex flex-col items-center justify-center min-h-svh">
          <p>app/web</p>
          <Button onClick={() => addUser()}>Add User</Button>
          <OrganizationSwitcher
            hidePersonal
          />
          {JSON.stringify(users, null, 2)}
          <UserButton />
        </div>
    </>
  );
}
