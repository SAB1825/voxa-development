

import {
    ResizablePanelGroup,
    ResizableHandle,
    ResizablePanel
} from "@workspace/ui/components/resizable"
import { ConversationPanel } from "../components/conversation-panel"
export const ConversationLayout = ({children} : { children: React.ReactNode }) => {
    return (
        <ResizablePanelGroup className="h-full flex-1" direction="horizontal">
            <ResizablePanel defaultSize={300} maxSize={30} minSize={20}>
               <ConversationPanel />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel className="h-full" defaultSize={30}>
                {children}
            </ResizablePanel>
        </ResizablePanelGroup>
    )

}