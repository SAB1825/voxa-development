import { OrganizationList } from "@clerk/nextjs";

export const OrgSelectView = () => {
  return (
    <OrganizationList
      afterCreateOrganizationUrl="/"
      afterSelectOrganizationUrl="/"
      hidePersonal
      skipInvitationScreen
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
  );
};
