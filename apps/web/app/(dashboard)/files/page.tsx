import { FilesView } from '@/modules/files/ui/views/files-view'
import React from 'react'
import { Protect } from '@clerk/nextjs'
import { PremiumFeatureOverlay } from '@/modules/billings/ui/components/premium-feature-overlay'

const FilesPage = () => {
  return (
    <Protect
      condition={(has) => has({ plan: "pro" }) || has({ plan: "free_trial" })}
      fallback={
        <PremiumFeatureOverlay>
          <FilesView />
        </PremiumFeatureOverlay>

      }
    >
      <FilesView />
    </Protect>
  )
}

export default FilesPage