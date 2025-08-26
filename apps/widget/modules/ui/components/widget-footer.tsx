import { screenAtom } from "@/modules/atoms/widge-atoms";
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { useAtomValue, useSetAtom } from "jotai";
import { HomeIcon, InboxIcon } from "lucide-react"

export const WidgetFooter = () => {
    const screen = useAtomValue(screenAtom);
    const setScreen = useSetAtom(screenAtom)
    return (
        <footer className="flex items-center justify-between border-t border-border/50 bg-background/95 backdrop-blur-sm">
            <Button
                variant="ghost"
                className="h-16 flex-1 rounded-none hover:bg-muted/50 transition-colors duration-200 flex flex-col gap-1"
                onClick={() => setScreen("selection")}
            >
                <HomeIcon
                    className={cn("size-6", screen === "selection" ? "text-primary" : "text-muted-foreground")}
                />
                <span className={cn("text-xs font-medium", screen === "selection" ? "text-primary" : "text-muted-foreground")}>
                    Home
                </span>
            </Button>
            <div className="w-px h-8 bg-border/50" />
            <Button
                variant="ghost"
                className="h-16 flex-1 rounded-none hover:bg-muted/50 transition-colors duration-200 flex flex-col gap-1"
                onClick={() => setScreen("inbox")}
            >
                <InboxIcon
                    className={cn("size-6", screen === "inbox" ? "text-primary" : "text-muted-foreground")}
                />
                <span className={cn("text-xs font-medium", screen === "inbox" ? "text-primary" : "text-muted-foreground")}>
                    Inbox
                </span>
            </Button>
        </footer>
    )
}