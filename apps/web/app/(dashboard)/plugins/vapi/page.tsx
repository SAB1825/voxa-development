import { PremiumFeatureOverlay } from "@/modules/billings/ui/components/premium-feature-overlay";
import { VapiView } from "@/modules/plugins/ui/view/vapi-view";
import { Protect } from "@clerk/nextjs";
import React from "react";

const VapiPage = () => {
  return (
    <Protect
      condition={(has) => has({ plan: "pro" }) || has({ plan: "free_trial" })}
      fallback={
        <PremiumFeatureOverlay>
          <VapiView />
        </PremiumFeatureOverlay>
      }
    >
      <VapiView />
    </Protect>
  );
};

export default VapiPage;
