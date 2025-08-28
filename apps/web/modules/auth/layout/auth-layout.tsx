import React from 'react'

export const AuthLayout = ({children} : {children : React.ReactNode}) => {
  return (
    <div className='min-h-screen flex justify-center items-center'>
        <div className='w-full max-w-sm mx-auto'>
          {children}
        </div>
    </div>
  )
}