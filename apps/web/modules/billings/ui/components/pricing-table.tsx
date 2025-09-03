"use client";
import { PricingTable as ClerkPricingTable } from "@clerk/nextjs";

export const PricingTable = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-8 p-6">
      {/* Header Section */}
      <div className="text-center max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tight mb-4">
          Choose Your Perfect Plan
        </h2>
        <p className="text-lg text-muted-foreground">
          Scale your business with our flexible pricing options. Upgrade or downgrade at any time.
        </p>
      </div>

      <ClerkPricingTable
        forOrganizations
        newSubscriptionRedirectUrl="/subscription/success"
        appearance={{
          elements: {
            // Container styling
            pricingTableContainer: "flex flex-row",
            
            // Card styling - make them more attractive
            pricingTableCard: `
              shadow-lg! 
              border-2! 
              rounded-xl! 
              transition-all! 
              duration-300! 
              hover:shadow-xl! 
              hover:scale-105! 
              hover:border-primary/50!
              bg-gradient-to-br! 
              from-background! 
              to-muted/20!
              relative!
              overflow-hidden!
            `,
            
            // Popular/recommended card highlighting
            pricingTableCardRecommended: `
              border-primary! 
              shadow-xl! 
              ring-2! 
              ring-primary/20! 
              transform! 
              scale-105!
              bg-gradient-to-br! 
              from-primary/5! 
              to-primary/10!
            `,
            
            // Header styling
            pricingTableCardHeader: `
              bg-transparent! 
              pb-6! 
              border-b! 
              border-border/50!
              relative!
            `,
            
            // Plan name styling
            pricingTableCardTitle: `
              text-xl! 
              font-bold! 
              text-foreground!
              mb-2!
            `,
            
            // Price styling
            pricingTableCardPrice: `
              text-4xl! 
              font-extrabold! 
              text-primary! 
              mb-1!
            `,
            
            // Price period styling
            pricingTableCardPeriod: `
              text-muted-foreground! 
              text-sm!
            `,
            
            // Description styling
            pricingTableCardDescription: `
              text-muted-foreground! 
              text-sm! 
              mt-2! 
              leading-relaxed!
            `,
            
            // Body styling
            pricingTableCardBody: `
              bg-transparent! 
              py-6! 
              flex-grow!
            `,
            
            // Features list styling
            pricingTableCardFeatureList: `
              space-y-3!
            `,
            
            pricingTableCardFeatureItem: `
              flex! 
              items-center! 
              text-sm! 
              text-foreground!
            `,
            
            pricingTableCardFeatureItemIcon: `
              text-primary! 
              mr-3! 
              flex-shrink-0!
            `,
            
            // Footer styling
            pricingTableCardFooter: `
              bg-transparent! 
              pt-6! 
              border-t! 
              border-border/50!
            `,
            
            // Main CTA button styling - this is the key part!
            pricingTableCardFooterButton: `
              w-full! 
              bg-primary! 
              hover:bg-primary/90! 
              text-primary-foreground! 
              font-semibold! 
              py-3! 
              px-6! 
              rounded-lg! 
              transition-all! 
              duration-200! 
              hover:shadow-lg! 
              hover:scale-105! 
              focus:ring-2! 
              focus:ring-primary/20! 
              focus:ring-offset-2!
              transform!
              active:scale-95!
              border-none!
              cursor-pointer!
              text-center!
              inline-flex!
              items-center!
              justify-center!
              gap-2!
            `,
            
            // Recommended button gets special treatment
            pricingTableCardFooterButtonRecommended: `
              bg-gradient-to-r! 
              from-primary! 
              to-primary/80! 
              hover:from-primary/90! 
              hover:to-primary/70! 
              shadow-lg!
              ring-2!
              ring-primary/30!
            `,
            
            // Badge for recommended plan
            pricingTableCardBadge: `
              bg-primary! 
              text-primary-foreground! 
              text-xs! 
              font-bold! 
              px-3! 
              py-1! 
              rounded-full! 
              absolute! 
              -top-2! 
              left-1/2! 
              transform! 
              -translate-x-1/2!
              shadow-md!
            `,
          },
          
          // Custom CSS for additional styling
          
        }}
      />
      
      {/* Additional trust signals */}
      
    </div>
  );
};