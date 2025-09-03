import { Button } from '@workspace/ui/components/button';
import Link from 'next/link';
import React from 'react';

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.05),transparent_70%)]"></div>
      
      <div className="relative z-10 w-full max-w-md">
        {/* Main Success Card */}
        <div className="bg-card border border-border rounded-3xl p-12 shadow-lg text-center space-y-8">
          
          {/* Success Icon */}
          <div className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center animate-pulse">
            <svg 
              className="w-10 h-10 text-primary-foreground" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2.5} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>

          {/* Success Message */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              Success!
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Your action has been completed successfully. You're all set to continue.
            </p>
          </div>

          {/* Dashboard Button */}
          <Button
            asChild
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
          >
            <Link href="/">
                Go to Dashboard
            </Link>
          </Button
          
          >

          {/* Simple footer text */}
          <p className="text-sm text-muted-foreground">
            Need help? Contact our support team
          </p>
        </div>

        {/* Floating elements for visual interest */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full animate-bounce"></div>
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 -right-8 w-4 h-4 bg-primary/25 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};

export default SuccessPage;