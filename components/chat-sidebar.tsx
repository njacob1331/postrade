'use client'
import { User, LogOut, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect, createContext, useContext, ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: number
  content: string
  sender: string
  color: string
}

const COLORS = ['#FF4500', '#D2691E', '#FF8C00', '#9ACD32', '#20B2AA', '#1E90FF', '#C71585', '#FF69B4']

interface SidebarContextType {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const ChatSidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      <div className={`transition-[margin] ease-in-out duration-300 ${
        !isCollapsed ? "mr-0 lg:mr-[384px]" : "mr-0"
      }`}>
        {children}
      </div>
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

const ChatSidebarTrigger = ({ isCollapsed, onToggle }: { isCollapsed: boolean; onToggle: () => void }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}>
              {isCollapsed ? <LogIn className="h-4 w-4" /> : <LogOut className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>{isCollapsed ? "Open Chat" : "Close Chat"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const Chat = ({ isCollapsed, setIsCollapsed }: { isCollapsed: boolean; setIsCollapsed: (value: boolean) => void }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)]

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        content: inputValue,
        sender: 'User',
        color: getRandomColor()
      }
      setMessages([...messages, newMessage])
      setInputValue('')
    }
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  return (
    <section className={`fixed top-0 right-0 h-screen flex flex-col border-l bg-sidebar border-border max-sm:hidden transition-[width,transform] ease-in-out duration-300 ${
      isCollapsed ? "w-0 translate-x-full" : "w-fit lg:w-[384px]"
    }`}>
      {/* Fixed Header */}
      <div className="sticky top-0 bg-sidebar z-10 pt-28 px-4 pb-2 border-b border-border">
        <div className="flex items-center gap-2">
          <p className="text-xl font-semibold">Chat</p>
        </div>
      </div>

      {/* Scrollable Messages Area */}
      <ScrollArea className="flex-1 px-4 py-4">
        {messages.map((message) => (
          <div key={message.id} className="flex items-center gap-2 text-sm mb-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png"/>
              <AvatarFallback>{message.sender[0]}</AvatarFallback>
            </Avatar>
            <div className="text-wrap break-words">
              <span className="font-semibold" style={{ color: message.color }}>{message.sender}: </span>
              <span>{message.content}</span>
            </div>
          </div>
        ))}
      </ScrollArea>

      {/* Fixed Footer */}
      <div className="sticky bottom-0 bg-sidebar border-t border-border p-4">
        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
          <Input
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <Button size="sm" type="submit" onClick={handleSendMessage}>
            Send
          </Button>
        </form>
      </div>
    </section>
  );
};

const ChatSidebar = () => {
  const { isCollapsed, setIsCollapsed } = useSidebar();
  
  return (
    <>
      <div className="fixed top-20 right-0 z-50">
        <ChatSidebarTrigger isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      </div>
      <Chat isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
    </>
  );
};

export { ChatSidebar, ChatSidebarTrigger, Chat }; 