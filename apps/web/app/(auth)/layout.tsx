import React from 'react'

const Layout = ({children} : {children : React.ReactNode}) => {
  return (
    <div className='min-h-screen flex'>
      {/* Left side - Welcome section */}
      <div className='hidden lg:flex lg:flex-1 bg-muted/30 flex-col justify-center px-12 py-24'>
        <div className='max-w-md'>
          <h1 className='text-4xl font-bold text-foreground mb-6 leading-tight'>
            Welcome to <br />
            <span className='text-primary'>YourApp</span>
          </h1>
          <p className='text-lg text-muted-foreground leading-relaxed mb-8'>
            Join thousands of users who trust us with their projects. Get started today and experience the difference.
          </p>
          <div className='space-y-4'>
            <div className='flex items-center gap-3'>
              <div className='w-2 h-2 bg-primary rounded-full'></div>
              <span className='text-muted-foreground'>Fast and secure authentication</span>
            </div>
            <div className='flex items-center gap-3'>
              <div className='w-2 h-2 bg-primary rounded-full'></div>
              <span className='text-muted-foreground'>Access from anywhere</span>
            </div>
            <div className='flex items-center gap-3'>
              <div className='w-2 h-2 bg-primary rounded-full'></div>
              <span className='text-muted-foreground'>24/7 customer support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth forms */}
      <div className='flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16'>
        <div className='w-full max-w-sm mx-auto'>
          {children}
        </div>
      </div>
    </div>
  )
}
export default Layout;