'use client'

import * as React from 'react'
import { Send } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
interface Message {
  id: number
  content: string
  sender: string
  color: string
}

const COLORS = ['#FF4500', '#D2691E', '#FF8C00', '#9ACD32', '#20B2AA', '#1E90FF', '#C71585', '#FF69B4']

export function TwitchChat() {
  const [messages, setMessages] = React.useState<Message[]>([])
  const [inputValue, setInputValue] = React.useState('')
  const scrollAreaRef = React.useRef<HTMLDivElement>(null)

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

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="flex flex-col h-full">
        <ScrollArea className="flex-1" ref={scrollAreaRef}>
            <div className="p-4 space-y-4 mb-8">
            {messages.map((message) => (
                <div key={message.id} className="flex items-start items-center gap-2 text-sm">
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
            </div>
        </ScrollArea>

        <div className="sticky bottom-0 bg-background">
          <Separator/>
            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-2 justify-center mt-4 mb-4">
            <Input
                placeholder="Send a message"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="placeholder-gray-400"
            />
            <Button type="submit" size="icon" className="bg-[#9147ff] hover:bg-[#772ce8]">
                <Send className="h-4 w-4" />
            </Button>
            </form>
        </div>
    </div>
  )
}