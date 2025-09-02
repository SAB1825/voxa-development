"use client";

import { useVapiPhoneNumbers } from "../../plugins/use-vapi-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { CheckCircleIcon, PhoneIcon, XCircleIcon } from "lucide-react";
import { Badge } from "@workspace/ui/components/badge";

export const VapiPhoneNumbersTab = () => {
  const { data: phoneNumbers, isLoading } = useVapiPhoneNumbers();
 
  return (
    <div className="border-t bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-6 py-4">Phone Number</TableHead>
            <TableHead className="px-6 py-4">Status</TableHead>
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
                    Loading phone numbers...
                  </TableCell>
                </TableRow>
              );
            }
            if (phoneNumbers.length === 0) {
              return (
                <TableRow>
                  <TableCell
                    className="px-6 py-8 text-center text-muted-foreground"
                    colSpan={3}
                  >
                    No phone numbers found.
                  </TableCell>
                </TableRow>
              );
            }
            return phoneNumbers.map((phoneNumber) => (
              <TableRow key={phoneNumber.id} className="hover:bg-muted/50">
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <PhoneIcon className="size-4" />
                    {phoneNumber.number || "NOT CONFIGURED"}
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  {phoneNumber.name || "UNNAMED"}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Badge
                    className="capitalize"
                    variant={
                      phoneNumber.status === "active"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {phoneNumber.status === "active" && (
                      <CheckCircleIcon className="mr-1 size-3" />
                    )}
                    {phoneNumber.status !== "active" && (
                      <XCircleIcon className="mr-1 size-3" />
                    )}
                    {phoneNumber.status || "UNKNOWN"}
                  </Badge>
                </TableCell>
              </TableRow>
            ));
          })()}
        </TableBody>
      </Table>
    </div>
  );
};
