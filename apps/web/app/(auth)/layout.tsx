import { AuthLayout } from '@/modules/auth/layout/auth-layout';
import React from 'react'

const Layout = ({children} : {children : React.ReactNode}) => {
  return (
    <AuthLayout>
      {children}
    </AuthLayout>
  )
}
export default Layout;