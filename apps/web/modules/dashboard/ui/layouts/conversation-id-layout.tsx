import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@workspace/ui/components/resizable";
import { ContactPanel } from "../components/contact-panel";

export const ConversationIdLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
     <ResizablePanelGroup className="h-full flex-1" direction="horizontal">
        <ResizablePanel className="h-full" defaultSize={60}>
            <div className="flex flex-1 w-full h-full flex-col">
                {children}
            </div>
        </ResizablePanel>
        <ResizableHandle className="hidden lg:block"/>
        <ResizablePanel
            defaultSize={40}
            maxSize={40}
            minSize={20}
            className="hidden lg:block"
        >
            <div>
                <ContactPanel />
            </div>
        </ResizablePanel>
     </ResizablePanelGroup>
  );
};
