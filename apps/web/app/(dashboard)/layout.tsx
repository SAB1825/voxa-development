import { AuthGuard } from '@/modules/auth/components/auth-gaurd'
import { OrganizationGuard } from '@/modules/auth/components/organization-gaurd'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGuard>
      <OrganizationGuard>
        {children}
      </OrganizationGuard>
    </AuthGuard>
  )
}

export default layout
