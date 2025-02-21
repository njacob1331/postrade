'use client';
import React from "react";
import { Card } from "@/components/ui/card";
import { CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ArrowUpIcon, ArrowDownIcon, MessageCircle, ShareIcon, Info, Copy, Plus } from "lucide-react";

import { BarChart2, Lightbulb } from "lucide-react"


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const posts = [
  {
    id: 1,
    title: "BUY AAPL at Limit $150",
    author: "investor123",

    upvotes: 1,
    comments: 45,
    timePosted: "2h ago",
    verified: true,
    performance: 1.2
  },
  {
    id: 2, 
    title: "New investment opportunity in tech sector",
    author: "techanalyst",
    content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    upvotes: 182,
    comments: 23,
    timePosted: "5h ago",
    verified: false,
    performance: -1.2
  },
  {
    id: 3,
    title: "My analysis of the current market trends",
    author: "investor123",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    upvotes: 245,
    comments: 45,
    timePosted: "2h ago",
    verified: true,
    performance: 1.2
  },
  {
    id: 4, 
    title: "New investment opportunity in tech sector",
    author: "techanalyst",
    content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    upvotes: 182,
    comments: 23,
    timePosted: "5h ago",
    verified: true,
    performance: 1.2
  },
  {
    id: 5,
    title: "My analysis of the current market trends",
    author: "investor123",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    upvotes: 245,
    comments: 45,
    timePosted: "2h ago",
    verified: true,
    performance: 1.2
  },
  {
    id: 6, 
    title: "New investment opportunity in tech sector",
    author: "techanalyst",
    content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    upvotes: 182,
    comments: 23,
    timePosted: "5h ago",
    verified: true,
    performance: 1.2
  },
  {
    id: 7,
    title: "My analysis of the current market trends",
    author: "investor123",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    upvotes: 245,
    comments: 45,
    timePosted: "2h ago",
    verified: true,
    performance: 1.2
  },
  {
    id: 8, 
    title: "New investment opportunity in tech sector",
    author: "techanalyst",
    content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    upvotes: 182,
    comments: 23,
    timePosted: "5h ago",
    verified: true,
    performance: 1.2
  },
  {
    id: 9,
    title: "My analysis of the current market trends",
    author: "investor123",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    upvotes: 245,
    comments: 45,
    timePosted: "2h ago",
    verified: true,
    performance: 1.2
  },
  {
    id: 10, 
    title: "New investment opportunity in tech sector",
    author: "techanalyst",
    content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    upvotes: 182,
    comments: 23,
    timePosted: "5h ago",
    verified: true,
    performance: 1.2
  }
];

const stocks = [
  {
    ticker: "AAPL",
    name: "Apple Inc."
  },
  {
    ticker: "GOOGL",
    name: "Google Inc."
  },
  {
    ticker: "AMZN",
    name: "Amazon.com Inc."
  },
  {
    ticker: "MSFT",
    name: "Microsoft Corporation"
  }
]



const Toolbar = () => (
  <div className="flex justify-between items-center">
    <div className="flex gap-4">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" defaultValue="newest"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="popular">Popular</SelectItem>
            <SelectItem value="controversial">Controversial</SelectItem>
            <SelectItem value="top-performing">Top Performing</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Assets" defaultValue="stocks"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="stocks">Stocks</SelectItem>
            <SelectItem value="options">Options</SelectItem>
            <SelectItem value="crypto">Crypto</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <Button size='lg'>
      <Plus className="h-5 w-5" />
      Post Trade
    </Button>
  </div>
)

const VoteButtons = ({ upvotes }: { upvotes: number }) => (
  <div className="flex flex-col items-center px-2">
    <Button variant="ghost" size="sm">
      <ArrowUpIcon className="h-5 w-5" />
    </Button>
    <span className="font-bold">{upvotes}</span>
    <Button variant="ghost" size="sm">
      <ArrowDownIcon className="h-5 w-5" />
    </Button>
  </div>
);

const PostHeader = ({ author, timePosted, performance }: {
  author: string;
  timePosted: string;
  performance: number;
}) => (
  <div className="flex items-center gap-2 justify-between">
    <div className="flex items-center gap-2 py-2">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Link href={`/user/${author}`}>
        <span className="hover:text-blue-500 hover:underline text-small text-default-500">
          {author}
        </span>
      </Link>
      <span className="text-small text-default-400">• {timePosted}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className={`text-xl font-semibold ${performance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {performance >= 0 ? '+' : ''}{performance.toFixed(1)}%
      </span>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Info className="h-4 w-4 text-default-400" />
        </TooltipTrigger>
        <TooltipContent>
          Performance since posted
        </TooltipContent>
      </Tooltip>
      </TooltipProvider>
    </div>
  </div>
);

const PostActions = ({ comments }: { comments: number }) => (
  <div className="flex gap-4 w-full justify-between">
    <div className="flex gap-4">
      <Button variant="ghost" size="sm">
        <MessageCircle className="h-5 w-5 mr-1" />
        {comments} Comments
      </Button>
      <Button variant="ghost" size="sm">
        <ShareIcon className="h-5 w-5 mr-1" />
        Share
      </Button>
    </div>
    <Button variant="outline" size="sm">
      <Copy className="h-5 w-5 mr-1" />
      Copy Trade
    </Button>
  </div>
);

const PostCard = ({ post }: { post: typeof posts[0] }) => (
  <div>
    <Separator className="my-2" />
    <Card className="hover:bg-gray-50 dark:hover:bg-gray-950 hover:cursor-pointer">
      <CardHeader>
        <div className="flex gap-3">
          <VoteButtons upvotes={post.upvotes} />
          <div className="flex flex-col gap-1 flex-grow">
            <PostHeader
              author={post.author}
              timePosted={post.timePosted}
              performance={post.performance}
            />
            <h3 className="text-lg font-bold">{post.title}</h3>
            <p className="text-default-500">{post.content}</p>
          </div>
        </div>
      </CardHeader>
      <CardFooter>
        <PostActions comments={post.comments} />
      </CardFooter>
    </Card>
  </div>
);




export default function PostFeed() {
  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <Toolbar/>
      </div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
