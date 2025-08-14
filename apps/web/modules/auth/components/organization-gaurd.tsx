'use client';
import { useOrganization } from "@clerk/nextjs";
import { OrgSelectView } from "../views/org-select-view";

export const OrganizationGuard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { organization } = useOrganization();
  if (!organization) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <OrgSelectView />
      </div>
    );
  }
  return <div>{children}</div>;
};
