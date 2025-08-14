"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

/**
 * Page component for the app/web surface.
 *
 * Renders a center-aligned UI containing:
 * - an "Add User" button that invokes the `addUser` mutation when clicked,
 * - an OrganizationSwitcher (with personal organizations hidden),
 * - a JSON dump of the `users` query result,
 * - and a Clerk UserButton.
 *
 * The component subscribes to `api.users.getMany` via `useQuery` and calls
 * `api.users.addUser` via `useMutation`. No explicit loading or error UI is provided.
 *
 * @returns The page's JSX element.
 */
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
