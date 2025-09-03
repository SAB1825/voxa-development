import { PremiumFeatureOverlay } from '@/modules/billings/ui/components/premium-feature-overlay'
import { CustomizationView } from '@/modules/customization/ui/views/customization-view'
import { Protect } from '@clerk/nextjs'
import React from 'react'

const CustomizatonPage = () => {
  return (
    <Protect
      condition={(has) =>has({ plan: "pro" }) || has({ plan: "free_trial" })}
      fallback = {
        <PremiumFeatureOverlay>
          <CustomizationView />
        </PremiumFeatureOverlay>
      }
    >

      <CustomizationView />
    </Protect>
  )
}

export default CustomizatonPage