"use client";

import { useVapiAssistants } from "../../plugins/use-vapi-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { BotIcon } from "lucide-react";

export const VapiAssistantsTab = () => {
  const { data: assistants, isLoading, error } = useVapiAssistants();
  return (
    <div className="border-t bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-6 py-4">Assistant</TableHead>
            <TableHead className="px-6 py-4">Model</TableHead>
            <TableHead className="px-6 py-4">FIrst Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(() => {
            if (isLoading) {
              return (
                <TableRow>
                  <TableCell
                    className="px-6 py-8 text-center text-muted-foreground"
                    colSpan={3}
                  >
                    Loading assistants...
                  </TableCell>
                </TableRow>
              );
            }
            if (assistants.length === 0) {
              return (
                <TableRow>
                  <TableCell
                    className="px-6 py-8 text-center text-muted-foreground"
                    colSpan={3}
                  >
                    No assistants found.
                  </TableCell>
                </TableRow>
              );
            }
            return assistants.map((assistant) => (
              <TableRow key={assistant.id} className="hover:bg-muted/50">
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <BotIcon className="size-4" />
                    {assistant.name || "UNNAMED"}
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span className="text-sm">
                    {assistant.model?.model || "NOT CONFIGURED"}
                  </span>
                </TableCell>
                <TableCell className="max-w-xs px-6 py-4">
                  <p className="truncate text-muted-foreground text-sm">
                    {assistant.firstMessage || "NO GREETING CONFIGURED"}
                  </p>
                </TableCell>
              </TableRow>
            ));
          })()}
        </TableBody>
      </Table>
    </div>
  );
};
