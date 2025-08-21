// WidgetHeader Component
import { cn } from "@workspace/ui/lib/utils";

interface Props {
    children : React.ReactNode;
    className? : string
}

export const WidgetHeader = ({ children, className }: Props) => {
    return (
        <header
            className={cn(
                "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-sm",
                className
            )}
        >
            {children}
        </header>
    )
}