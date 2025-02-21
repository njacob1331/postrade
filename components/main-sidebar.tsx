'use client'
import { Menu, PanelLeftClose, PanelLeftOpen, Home, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, createContext, useContext, ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

interface MainSidebarContextType {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const MainSidebarContext = createContext<MainSidebarContextType | undefined>(undefined);

export const MainSidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <MainSidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      <div className={`transition-[margin] ease-in-out duration-300 ${
        !isCollapsed ? "ml-0 lg:ml-[384px]" : "ml-[60px]"
      }`}>
        {children}
      </div>
    </MainSidebarContext.Provider>
  );
};

export const useMainSidebar = () => {
  const context = useContext(MainSidebarContext);
  if (context === undefined) {
    throw new Error('useMainSidebar must be used within a MainSidebarProvider');
  }
  return context;
};

const MainSidebarTrigger = ({ isCollapsed, onToggle }: { isCollapsed: boolean; onToggle: () => void }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}>
              {isCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{isCollapsed ? "Open Sidebar" : "Close Sidebar"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const Sidebar = ({ isCollapsed }: { isCollapsed: boolean }) => {
  return (
    <section className={`fixed top-0 left-0 h-screen flex flex-col border-r bg-sidebar border-border max-sm:hidden transition-[width] ease-in-out duration-300 ${
      isCollapsed ? "w-[60px]" : "w-fit lg:w-[384px]"
    }`}>
      {/* Fixed Header */}
      <div className="sticky top-0 bg-sidebar z-10 pt-28 px-4 pb-2 border-b border-border">
        <div className="flex items-center gap-2">
          <Menu className="h-5 w-5" />
          <p className={`text-xl font-semibold transition-opacity duration-300 ${
            isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
          }`}>Navigation</p>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <ScrollArea className="flex-1 px-4 py-4">
        <nav className="flex flex-col gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link 
                  href="/"
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent transition-colors"
                >
                  <Home className="h-4 w-4" />
                  <span className={`transition-opacity duration-300 ${
                    isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                  }`}>Home</span>
                </Link>
              </TooltipTrigger>
              {isCollapsed && <TooltipContent side="right">Home</TooltipContent>}
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link 
                  href="/communities"
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent transition-colors"
                >
                  <Users className="h-4 w-4" />
                  <span className={`transition-opacity duration-300 ${
                    isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                  }`}>Communities</span>
                </Link>
              </TooltipTrigger>
              {isCollapsed && <TooltipContent side="right">Communities</TooltipContent>}
            </Tooltip>
          </TooltipProvider>
        </nav>
      </ScrollArea>
    </section>
  );
};

const MainSidebar = () => {
  const { isCollapsed, setIsCollapsed } = useMainSidebar();
  
  return (
    <>
      <div className="fixed top-20 left-0 z-50">
        <MainSidebarTrigger isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      </div>
      <Sidebar isCollapsed={isCollapsed} />
    </>
  );
};

export { MainSidebar, MainSidebarTrigger };
