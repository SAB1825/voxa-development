"use client";
import { PricingTable as ClerkPricingTable } from "@clerk/nextjs";

export const PricingTable = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-8 p-6">
      {/* Header Section */}
      <div className="text-center max-w-3xl">
        <p className="text-lg text-muted-foreground">
          Scale your business with our flexible pricing options. Upgrade or downgrade at any time.
        </p>
      </div>

      {/* Custom Pricing Container */}
      <div className="w-full">
        <ClerkPricingTable
          forOrganizations
          newSubscriptionRedirectUrl="/subscriptions/success"
          appearance={{
            elements: {
              // Container styling - force specific grid layout
              pricingTableContainer: `
                !grid
                !grid-cols-1
                lg:!grid-cols-[1fr_1.5fr_1fr]
                !gap-6
                !w-full
                !max-w-none
              `,

              // Base card styling
              pricingTableCard: `
                !relative
                !shadow-lg 
                !border-2 
                !rounded-xl 
                !transition-all 
                !duration-300 
                hover:!shadow-xl 
                hover:!scale-105 
                hover:!border-primary/50
                !overflow-hidden
                !flex
                !flex-col
                !h-auto
                !min-h-[500px]
              `,
              
              // Recommended card (Pro plan) - this will be larger due to grid
              pricingTableCardRecommended: `
                !border-primary 
                !shadow-xl 
                !ring-2 
                !ring-primary/20 
                !bg-gradient-to-br 
                !from-primary/5 
                !to-primary/10
                !transform
                !scale-105
                !min-h-[600px]
              `,
              
              // Header styling
              pricingTableCardHeader: `
                !bg-transparent 
                !pb-6 
                !border-b 
                !border-border/50
                !relative
                !px-6
                !pt-6
              `,
              
              // Plan name styling
              pricingTableCardTitle: `
                !text-xl 
                !font-bold 
                !text-foreground
                !mb-2
              `,
              
              // Price styling
              pricingTableCardPrice: `
                !text-4xl 
                !font-extrabold 
                !text-primary 
                !mb-1
              `,
              
              // Price period styling
              pricingTableCardPeriod: `
                !text-muted-foreground 
                !text-sm
              `,
              
              // Description styling
              pricingTableCardDescription: `
                !text-muted-foreground 
                !text-sm 
                !mt-2 
                !leading-relaxed
              `,
              
              // Body styling
              pricingTableCardBody: `
                !bg-transparent 
                !py-6 
                !flex-grow
                !px-6
              `,
              
              // Features list styling
              pricingTableCardFeatureList: `
                !space-y-3
              `,
              
              pricingTableCardFeatureItem: `
                !flex 
                !items-center 
                !text-sm 
                !text-foreground
              `,
              
              pricingTableCardFeatureItemIcon: `
                !text-primary 
                !mr-3 
                !flex-shrink-0
              `,
              
              // Footer styling
              pricingTableCardFooter: `
                !bg-transparent 
                !pt-6 
                !border-t 
                !border-border/50
                !px-6
                !pb-6
                !mt-auto
              `,
              
              // Main CTA button styling
              pricingTableCardFooterButton: `
                !w-full 
                !bg-primary 
                hover:!bg-primary/90 
                !text-primary-foreground 
                !font-semibold 
                !py-3 
                !px-6 
                !rounded-lg 
                !transition-all 
                !duration-200 
                hover:!shadow-lg 
                hover:!scale-105 
                focus:!ring-2 
                focus:!ring-primary/20 
                focus:!ring-offset-2
                !transform
                active:!scale-95
                !border-none
                !cursor-pointer
                !text-center
                !inline-flex
                !items-center
                !justify-center
                !gap-2
              `,
              
              // Recommended button gets special treatment
              pricingTableCardFooterButtonRecommended: `
                !bg-gradient-to-r 
                !from-primary 
                !to-primary/80 
                hover:!from-primary/90 
                hover:!to-primary/70 
                !shadow-lg
                !ring-2
                !ring-primary/30
              `,
              
              // Badge for recommended plan
              pricingTableCardBadge: `
                !bg-primary 
                !text-primary-foreground 
                !text-xs 
                !font-bold 
                !px-3 
                !py-1 
                !rounded-full 
                !absolute 
                !-top-2 
                !left-1/2 
                !transform 
                !-translate-x-1/2
                !shadow-md
                !z-10
              `,
            },
          }}
        />
      </div>

      {/* Custom CSS to override Clerk's internal styles */}
      <style jsx global>{`
        /* Target the Clerk pricing table container specifically */
        [data-clerk-element="pricing-table"] > div {
          display: grid !important;
          grid-template-columns: 1fr !important;
          gap: 1.5rem !important;
        }
        
        @media (min-width: 1024px) {
          [data-clerk-element="pricing-table"] > div {
            grid-template-columns: 1fr 1.5fr 1fr !important;
          }
          
          /* Make sure the middle card (Pro) is larger */
          [data-clerk-element="pricing-table"] > div > div:nth-child(2) {
            transform: scale(1.05) !important;
            min-height: 600px !important;
          }
          
          /* Keep outer cards smaller */
          [data-clerk-element="pricing-table"] > div > div:nth-child(1),
          [data-clerk-element="pricing-table"] > div > div:nth-child(3) {
            min-height: 500px !important;
          }
        }
        
        /* Ensure mobile stacking */
        @media (max-width: 1023px) {
          [data-clerk-element="pricing-table"] > div > div {
            transform: none !important;
            min-height: 500px !important;
          }
        }
        
        /* Force proper flex behavior on cards */
        [data-clerk-element="pricing-table"] [data-clerk-element="pricing-card"] {
          display: flex !important;
          flex-direction: column !important;
          height: auto !important;
        }
        
        /* Ensure the card body grows to fill space */
        [data-clerk-element="pricing-table"] [data-clerk-element="pricing-card-body"] {
          flex-grow: 1 !important;
        }
      `}</style>
    </div>
  );
};