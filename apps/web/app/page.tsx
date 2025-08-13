"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api"
import { Button } from "@workspace/ui/components/button";



export default function Page() {
  const addUser = useMutation(api.users.addUser)
  const users = useQuery(api.users.getMany);
  return (
    <div className="flex items-center justify-center min-h-svh">
      <p>
        app/web
      </p>
      <Button
        onClick={() => addUser()}
      >
        Add User
      </Button>
      {JSON.stringify(users, null, 2)}
    </div>
  )
}
